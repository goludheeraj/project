const express = require("express");

const bodyParser = require("body-parser");
const app = express();
let items = ["Buy food","Cook food","Eat food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/", function(req,res){
let today = new Date();
let options = {
     weekday: "long",
     year: "numeric",
     month : "long"
  };
   let day = today.toLocaleTimeString("en-us",options);

      res.render("list",{ListTitle: day,newListItems: items});

  });

 app.post("/",function(req,res){

 let item = req.body.newItem ;

 if(req.body.List === "Work"){

  workItems.push(item);
  req.redirect("/work");
 }
 else {
   items.push(item);
     res.redirect("/");
 }

 });

 app.get("Work",function(req,res) {
    res.render("list",{ListTitle: "Work List",newListItems:workItems});
 });
 app.post("/Work",function(req,res){
 let item = req.body.newItem ;
  workItems.push(item);
     res.redirect("/Work");
});

app.get("/about",function(req,res) {
  res.render("about");
});

  app.listen(process.env.PORT || 3000,function() {
  console.log("server is running on the port 3000");

});
