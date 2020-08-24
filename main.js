var url = require('url')
document.body.innerHTML = JSON.stringify(url.parse(window.location.href))

const express = require("express");
const app = express();

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

app.listen(3000, () => console.log("listening on 3000"));
