const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000

app.use(cors({optionSuccessStatus: 200}))

 

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/timestamp/:dateString?", (req, res) => {
  let date;
//   console.log("isi param datestring adalah " + req.params.dateString);

  const checkInt = (reqDate) => {
    let data = parseInt(reqDate, 10);
    if (reqDate == data) {
      return true;
    } else {
      return false;
    }
  };

  const getDate = (reqDate) => {
    if (reqDate) {
      if (checkInt(reqDate) === true) {
        date = new Date(parseInt(reqDate, 10));
        // console.log("isi variabel " + date);
      } else {
        date = new Date(reqDate);
      }
    } else {
      date = new Date();
    }
    // console.log(date);
    return date;
  };

  if (getDate(req.params.dateString) == "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

/**
 * Referensi :
 * https://github.com/msiadak/fcc-timestamp-microservice/blob/master/server.js
 */