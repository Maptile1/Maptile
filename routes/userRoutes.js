const express = require("express");
const User = require("../schema/user-schema");
const userRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const Tileset = require("../schema/tileset-schema");
const Map = require("../schema/map-schema");
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
const { BlockBlobClient } = require("@azure/storage-blob");
const getStream = require("into-stream");
require("dotenv").config();

// NODE MAILER SETUP
const nodeMailer = require("nodemailer");
let mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
const sendEmail = (details) => {
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("ERROR SENDING EMAIL", err);
    } else {
      console.log("email has sent.");
    }
  });
};

// REGISTER USER ROUTE
userRouter.route("/user/register").post(async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    var user = new User({
      _id: new ObjectId(),
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      tilesets: [],
      shared_tilesets: [],
      maps: [],
      shared_maps: [],
      likes: 0,
      dislikes: 0,
      bio: "Empty Bio",
      featured: [],
      accountCreated: Date.now(),
      liked_tilesets: [],
      liked_maps: [],
    });
    user = await user
      .save()
      .then((user) => {
        req.session._id = user._id;
        res.json({ user: user });
      })
      .catch((err) => {
        res.json({ errorMessage: err.message });
      });
  });
});

// LOGIN ROUTE
userRouter.route("/user/login").post(async (req, res) => {
  var user = await User.findOne({ userName: req.body.userName });
  if (user == null) {
    res
      .status(400)
      .json({ errorMessage: "Username password combination not found" });
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        req.session._id = user._id.toString();
        res.json({ user: user });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Username password combination not found" });
      }
    });
  }
});

// LOGOUT ROUTE
userRouter.route("/user/logout").post(async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
  } else {
    req.session.destroy();
    res.json({ message: "success" });
  }
});

// CHECK IF USER IS LOGGED IN ROUTE
userRouter.route("/user/loggedin").get(async (req, res) => {
  if (req.session._id == undefined) {
    res.json({ loggedIn: false });
  } else {
    var user = await User.findById(req.session._id);
    if (user != null) {
      res.json({ user: user, loggedIn: true });
    } else {
      req.session.destroy();
      res.status(400).json({ errorMessage: "Couldnt find user" });
    }
  }
});

// GETS A USER BASED ON ID
userRouter.route("/user/get/:id").get(async (req, res) => {
  if (req.session._id == undefined) {
    res.json({ loggedIn: false });
  }
  else{
    var user = await User.findById(req.params.id);
    if (user != null) {
      res.json({ user: user });
    } else {
      res.status(400).json({ errorMessage: "Couldnt find user" });
    }
  }
});

// Retrieves user data based on email
userRouter.route("/user/email/:email").get(async (req, res) => {
  var user = await User.find({
    email: req.params.email,
  });
  console.log(user);
  if (user != null) {
    res.json({ user: user });
  } else {
    res.status(400).json({ errorMessage: "Couldnt find user" });
  }
});

// Route to generate and send email to user to recover their password
userRouter.route("/user/recover/:email").post(async (req, res) => {
  // GENERATE CODE AND SAVE TO DB
  let code = Math.floor(Math.random() * 90000) + 10000;
  let updates = {
    recoveryCode: code,
  };
  var user = await User.findOneAndUpdate(
    { email: req.params.email }, //temp
    { $set: updates },
    { new: true }
  );
  if (user != null) {
    res.json({ user: user });
  } else {
    res.status(400).json({ errorMessage: "User doesn't exist" });
  }
  let details = {
    from: process.env.EMAIL,
    to: req.params.email,
    subject: "Maptile Password Recovery Code",
    text: code.toString(),
  };
  sendEmail(details);
});

// UPDATE USER INFORMATION ROUTE
userRouter.post("/user/update", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var updates = {};
  updates.userName = req.body.userName;
  updates.email = req.body.email;
  updates.bio = req.body.bio;
  if (req.body.password != undefined) {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      updates.password = hash;
      User.findOneAndUpdate(
        { _id: req.session._id },
        { $set: updates },
        { new: true }
      )
        .then((user) => {
          if (user != null) {
            res.json({ user: user });
          } else {
            res.status(400).json({ errorMessage: "User doesn't exist" });
          }
        })
        .catch((err) => {
          res.status(400).json({ errorMessage: err });
        });
    });
  } else {
    User.findOneAndUpdate(
      { _id: req.session._id },
      { $set: updates },
      { new: true }
    )
      .then((user) => {
        if (user != null) {
          res.json({ user: user });
        } else {
          res.status(400).json({ errorMessage: "User doesn't exist" });
        }
      })
      .catch((err) => {
        res.status(400).json({ errorMessage: err });
      });
  }
});

// RESET PASSWORD ROUTE
userRouter.post("/user/reset", async (req, res) => {
  var updates = {};
  if (req.body.password == undefined) {
    res.status(400).json({ errorMessage: "No password given" });
  }
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    updates.password = hash;
    User.findOneAndUpdate(
      { email: req.body.email, recoveryCode: req.body.recoveryCode },
      { $set: updates },
      { new: true }
    )
      .then((user) => {
        if (user != null) {
          res.json({ user: user });
        } else {
          res.status(400).json({ errorMessage: "Wrong code" });
        }
      })
      .catch((err) => {
        res.status(400).json({ errorMessage: err });
      });
  });
});

// UPDATES USER PROFILE PICTURE ROUTE
userRouter.post("/user/image", uploadStrategy, async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  const blobName = req.session._id;
  const blobService = new BlockBlobClient(
    process.env.AZURE_STORAGE_CONNECTION_STRING,
    "maptile-profile-images",
    blobName
  );
  stream = getStream(req.file.buffer);
  streamLength = req.file.buffer.length;
  const options = { blobHTTPHeaders: { blobContentType: req.file.mimetype } };
  blobService
    .uploadStream(stream, streamLength, undefined, options)
    .then(() => {
      res.json({ message: "successful upload" });
    })
    .catch((err) => {
      res.status(400).json({ errorMessage: err });
    });
});

userRouter.get("/user/getRecent/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  if (user == null) {
    res.status(400).json({ errorMessage: "User not found" });
    return;
  }
  var ids = user.tilesets.concat(user.shared_tilesets);
  if (ids.length == 0) {
    res.json({ tilesets: [] });
    return;
  }
  ids = ids.map((id) => {
    return { _id: id };
  });
  var tilesets = await Tileset.find({ $or: ids }, "_id name owner description")
    .sort({ timeEdited: -1, _id: 1 })
    .limit(10);
  res.json({ recent: tilesets });
});

// SHARING TILESETS/MAPS ROUTE
userRouter.post("/user/share", async (req, res) => {
  var sharedUserEmail = req.body.email;
  var sharedAssetID = req.body.id;
  var type = req.body.type;
  if (type == "tileset") {
    var user = await User.findOneAndUpdate(
      { email: sharedUserEmail },
      { $addToSet: { shared_tilesets: sharedAssetID } },
      { new: true }
    )
    if (user != null) {
      await Tileset.findOneAndUpdate(
        { _id: req.body.id },
        { $addToSet: { shared_users: user._id } }
      );
      res.json({ user: user });
    } else {
      res.status(400).json({ errorMessage: "User doesn't exist" });
    }
  } 
  else {
    var user = await User.findOneAndUpdate(
      { email: sharedUserEmail },
      { $addToSet: { shared_maps: sharedAssetID } },
      { new: true }
    )
    if (user != null) {
      await Map.findOneAndUpdate(
        { _id: req.body.id },
        { $addToSet: { shared_users: user._id } }
      );
      res.json({ user: user });
    } else {
      res.status(400).json({ errorMessage: "User doesn't exist" });
    }
  }
});

// REMOVING FROM SHARED TILESETS/MAPS
userRouter.post("/user/deleteshared", async (req, res) => {
  var userID = req.body._id;
  var assetID = req.body.asset_id;
  var type = req.body.type;
  if (type == "tileset") {
    User.findOneAndUpdate(
      { _id: userID },
      { $pull: { shared_tilesets: assetID } },
      { new: true }
    )
      .then((user) => {
        Tileset.findOneAndUpdate(
          { _id: req.body.id },
          { $pull: { shared_users: sharedUserEmail } }
        );
        if (user != null) {
          res.json({ user: user });
        } else {
          res.status(400).json({ errorMessage: "User doesn't exists" });
        }
      })
      .catch((err) => {
        res.status(400).json({ errorMessage: err });
      });
  } else {
    await User.findOneAndUpdate(
      { _id: userID },
      { $pull: { shared_maps: assetID } },
      { new: true }
    )
      .then((user) => {
        Map.findOneAndUpdate(
          { _id: req.body.id },
          { $pull: { shared_users: sharedUserEmail } }
        );
        if (user != null) {
          res.json({ user: user });
        } else {
          res.status(400).json({ errorMessage: "User doesn't exists" });
        }
      })
      .catch((err) => {
        res.status(400).json({ errorMessage: err });
      });
  }
});

// USED TO GET NAMES OF USERS BASED ON A SET OF IDs
// USED FOR EFFICIENTLY RETRIEVING COMMENT DATA
userRouter.post("/user/getNames", async (req, res) => {
  if (req.body.ids == undefined) {
    res.json({ names: {} });
    return;
  }
  var ids = req.body.ids.map((id) => {
    return { _id: id };
  });
  if (ids == undefined || ids.length == 0) {
    res.json({ names: {} });
    return;
  }
  var users = await User.find({ $or: ids }, "_id userName")
  console.log(users)
  names = {}
  for (var i = 0; i < users.length; i++){
    var user = users[i]
    names[user._id] = user.userName;
  }
  res.json({ names: names });
});

module.exports = userRouter;