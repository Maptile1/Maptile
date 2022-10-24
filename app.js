// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan =  require('morgan');
const cors = require('cors');
require('dotenv').config();
// app
const app = express();
app.use(express.json({limit: '10mb'}));

const session = require('express-session')
const MongoStore = require('connect-mongo');
app.use(session({secret: 'dfgdfgdfgdfgsdf', saveUninitialized: false,
  resave: false, sameSite: 'lax', store: MongoStore.create({ mongoUrl: process.env.MONGO_URI+ '/sessions'})}));
// db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log("DB CONNECTION ERROR", err));


// middleware
app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));


// user routes
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

// tileset routes
const tilesetRoutes = require("./routes/tilesetRoutes");
app.use("/", tilesetRoutes);

// map routes 
const mapRoutes = require("./routes/mapRoutes");
app.use("/", mapRoutes);

// comment routes
const commentRoutes = require("./routes/commentRoutes");
app.use("/", commentRoutes);

// port
const port = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("../build"));
}

// listener
const server = app.listen(port, () => 
console.log(`Server is running on port ${port}`)
);