const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

var list_id = "ee07741e6d";

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const member_data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          ADDRESS: "Madurai",
        },
      },
    ],
  };

  const jsonData = JSON.stringify(member_data);

  console.log(jsonData);

  option = {
    method: "POST",
    auth: "Website-Name:46e0947b914ccb0b994ae6268bfc9a22-us21",
  };

  const url = `https://us21.api.mailchimp.com/3.0/lists/${list_id}`;

  const request = https.request(url, option, function (response) {
    response.on("data", function (data) {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
      console.log(JSON.parse(data));
      console.log(response.statusCode);
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

var port = 3000;

app.listen(port, function () {
  console.log("Server is running on Port " + port);
});

///api key = 46e0947b914ccb0b994ae6268bfc9a22-us21

/// list id = ee07741e6d
