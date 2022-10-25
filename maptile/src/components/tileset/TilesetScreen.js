import Box from "@mui/material/Box";
const TilesetScreen = (props) => {
  return (
    <div>
      <div class="pt-5 text-center text-4xl font-bold text-white">Tileset</div>
      <Box
        sx={{
          ml: 20,
          mt: 4,
          width: "80%",
          height: 450,
          backgroundColor: "#575D69",
        }}
      />
    </div>
  );
};

export default TilesetScreen;
