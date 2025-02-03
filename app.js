const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const path = require('path')
const ejsMate = require("ejs-mate");
const app = express();
const port = 3000;
const data = require("./model/model1");
const { platform } = require('os');

mongoose
  .connect("mongodb://127.0.0.1:27017/DSAtasks")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection error: ", err));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/', async(req, res) => {
  try {
    const records = await data.find().sort({ date: -1 });;
    res.render('index.ejs',{records});
  } catch {
    console.log("Error fetching records: ", err);
    res.status(500).send("Error fetching records: " + err);
  }
    
})

app.post("/", (req, res) => {
  const { selection, date_created, numberOfQuestions, Note } = req.body;
  const newData = new data({
    platform: selection,
    date: date_created,
    numOfQuestions: numberOfQuestions,
    note: Note,
  });
  
  newData
    .save()
    .then(() => {
      res.redirect("/");
      console.log("Record added successfully!");
    })
    .catch((err) => {
      console.log("Error saving record: " + err);
    });
});
app.get("/edit/:id", async (req, res) => {
  const record = await data.findById(req.params.id);
  res.render("edit.ejs", { record });
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await data.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting record" });
  }
});


app.listen(port, (req, res) => {
    console.log('listening to ',port)
})