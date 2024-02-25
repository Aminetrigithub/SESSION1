// console.log("salam");

// let users = [
//   { name: "Katherine Woods", age: 35 },
//   { name: "Alexander Tran", age: 35 },
//   { name: "Mayme Price", age: 35 },
//   { name: "Mathilda Harper", age: 35 },
//   { name: "Troy White", age: 35 },
// ];

// const httpServer = require("http");
// const fs = require("fs");
// // fs.readFileSync()

// const server = httpServer.createServer(function (req, res) {
//   if (req.url == "/" && req.method == "GET") {
//     res.write("bye");
// res.end("")
//   } else if (req.url == "/about" && req.method == "GET") {
//     res.end("this is ABOUT");
//   } else if (req.url == "/contact" && req.method == "GET") {
//     res.end("this is CONTACT");
//   } else if (req.url == "/adduser" && req.method == "POST") {
//     req.on("data", function (chunk) {
//       users.push(JSON.parse(chunk));
//       console.log(JSON.parse(chunk));
//       res.end(chunk);
//     });
//   } else {
//     res.end("404");
//   }
// });
// server.listen(4000, function () {
//   console.log("server is running .......");
// });

// ! en Express.js
let users = [
  { name: "Katherine Woods", email: "kiteb@il.su", age: 35 },
  { name: "Alexander Tran", email: "gaeru@zih.mx", age: 30 },
  { name: "Mayme Price", email: "notha@joucolo.id", age: 31 },
  { name: "Mathilda Harper", email: "ip@bi.bi", age: 35 },
  { name: "Troy White", email: "jinofik@ohowuwun.gb", age: 35 },
];
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(users);
  // console.log(__dirname);
  // res.sendFile(__dirname+"/index.html");
});

app.post("/adduser", (req, res) => {
  let isExist = users.find((ele) => ele.email == req.body.email);
  if (isExist) {
    console.log(isExist);
    res.send("user is exist");
  } else {
    // console.log(isExist);
    users.push(req.body);
    res.send("salam to add user");
  }
});

app.delete("/deleteuser",  (req, res) => {
  let userIndex = users.findIndex((elem) => elem.email == req.body.email);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.send("user deleted with sucess");
  } else res.send("user not found to delete");
});

app.patch("/updateuser", express.json(), (req, res) => {
  let userIndex = users.findIndex((ele) => ele.email == req.body.email);
  if (userIndex > -1) {
    users[userIndex].name = req.body.name;
    res.send("user updated");
  } else res.send("user not found to update");
});

app.listen(4200, () => {
  console.log("server running .........");
});
