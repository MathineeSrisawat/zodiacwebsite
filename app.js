const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");		

app.use(express.static(__dirname + "/views"));				

mongoose.connect(		
  "mongodb+srv://mm:May20020412@cluster0.jmrvjmi.mongodb.net/test"
);

const visitorSchema = new mongoose.Schema({		
  name: String,
  count: Number,
});

/* Create the mongoose Model from the Schema */
const Visitor = mongoose.model("Visitor", visitorSchema);		

async function add_count() {		
  let visitors = await Visitor.findOne({ name: "localhost" });		

  if (visitors == null) {		
    const beginCount = new Visitor({
      name: "localhost",
      count: 1,
    });

    beginCount.save();		
  } else {		
    visitors.count += 1;
    visitors.save();		
  }
}

app.get("/", async function (req, res) {
  let visitors = await Visitor.findOne({ name: "localhost" });
  res.render("index", {
    count: visitors.count,
  }); 	
  add_count();		
});

app.get("/index", async function (req, res) {
  let visitors = await Visitor.findOne({ name: "localhost" });
  res.render("index", {
    count: visitors.count,
  }); 	
});

app.get("/page2", async function (req, res) {
  res.render("page2");				
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});