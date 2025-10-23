const express = require("express");
const MBTiles = require("@mapbox/mbtiles");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Adjust the path to your .mbtiles file
const mbtilesPath = path.join(process.cwd(), "public", "linden_map.mbtiles");

// Open the .mbtiles file
new MBTiles(mbtilesPath, (err, mbtiles) => {
  if (err) {
    console.error("Failed to load MBTiles:", err);
    process.exit(1);
  }

  console.log("MBTiles loaded:", mbtilesPath);

  // Serve PNG tiles
  app.get("/tiles/:z/:x/:y.png", (req, res) => {
    const { z, x, y } = req.params;

    mbtiles.getTile(+z, +x, +y, (err, tile, headers) => {
      if (err) {
        res.status(404).send("Tile not found");
      } else {
        res.set(headers);
        res.send(tile);
      }
    });
  });

  // Start the server
  const port = 3001;
  app.listen(port, () => {
    console.log(`Tile server running at http://localhost:${port}`);
  });
});
