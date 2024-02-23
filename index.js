console.log("salam");

let users= [
  {name:"Katherine Woods" , age:35},
  {name:"Alexander Tran" , age:35},
  {name:"Mayme Price" , age:35},
  {name:"Mathilda Harper" , age:35},
  {name:"Troy White" , age:35}]
  

const httpServer = require("http");
const fs = require("fs");
// fs.readFileSync()

const server = httpServer.createServer(function (req, res) {
  if (req.url == "/" && req.method == "GET") {
    res.end(JSON.stringify(users) );
  } else if (req.url == "/about" && req.method == "GET") {
    res.end("this is ABOUT");
  } else if (req.url == "/contact" && req.method == "GET") {
    res.end("this is CONTACT");
  } else if (req.url == "/adduser" && req.method == "POST") {
    req.on('data',function(chunk){
      users.push(JSON.parse(chunk))
      console.log(JSON.parse(chunk))
    res.end(chunk)});
  } else {
    res.end("404");
  }
});
server.listen(4000, function () {
  console.log("server is running .......");
});
