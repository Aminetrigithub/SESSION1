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

const mysql = require("mysql2");
const query = mysql.createConnection({
  host: "localhost",
  database: "session3_node",
  user: "root",
  password: "",
});

app.get("/", (req, res) => {
  // query.execute('insert into users (name,email,password) values ("maha","maha@gmail.com","1slfp")')
  // query.execute('update users set name="ali" where id = 6 ')
  query.execute("select * from users ", (err, data) => {
    if (err) res.send(err);
    else res.send(data);
  });

  // console.log(__dirname);
  // res.sendFile(__dirname+"/index.html");
});

app.post("/adduser", (req, res) => {
  const { name, email, password } = req.body;
  // let isExist = users.find((ele) => ele.email == email);

  // if (express.json.toString(isExist)) {
  //   res.send("user is exist");
  // } else {
  query.execute(
    `insert into users (name,email,password) values ('${name}','${email}',${password})`
  );
  // console.log(isExist);
  // users.push(req.body);
  res.json({ message: "User success to add" });
  // }
});

app.put("/", (req, res) => {
  const { name, id } = req.body;
  query.execute(
    `update users set name = '${name}' where id = ${id}`,
    (err, data) => {
      if (err) res.send(err);
      else res.send(data);
      // res.json({ message: "user updated" });
    }
  );
});

app.patch("/updateuser", (req, res) => {
  let userIndex = users.findIndex((ele) => ele.email == req.body.email);
  if (userIndex > -1) {
    users[userIndex].name = req.body.name;
    res.send("user updated");
  } else res.send("user not found to update");
});

app.delete("/deleteuser", (req, res) => {
  const { id } = req.body;
  query.execute(`delete from users where id =${id} `, (err, data) => {
    res.json("user deleted");
  });

  // console.log(__dirname);
  // res.sendFile(__dirname+"/index.html");
});

app.listen(4300, () => {
  console.log("server running .........");
});
