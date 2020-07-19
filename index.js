const { REFUSED } = require("dns");
const express = require("express");
const fs = require("fs");

const StreamFromArray = require("./lib/StreamFromArray.js");
const app = express();
const port = 3000;
const myVideFile = "./video/1.mp4";
const arrayQ = ["hamid", "some", "do it", "somethingElse"];

app.get("/video", (req, res) => {
  //   fs.readFile(myVideFile, function (err, data) {
  //     if (err) return console.error(err);
  //     res.writeHeader(200, { "Content-Type": "video/mp4" });
  //     res.end(data);
  //   });

  fs.createReadStream(myVideFile).pipe(res).on("error", console.error);
});

app.get("/array", (req, res) => {
  const peakStream = new StreamFromArray(arrayQ);

  let variable;

  peakStream.on("data", (data) => {
    if (data) {
      if (!variable) {
        variable = JSON.stringify(data);
      } else {
        variable += JSON.stringify(data);
      }
    }
  });

  peakStream.on("end", () => {
    res.send(variable);
  });
});

app.listen(port, () => console.log(`app listening on ${port} port!`));
