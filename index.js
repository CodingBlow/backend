const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB Connected");
}

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  model: String,
});

const Form = mongoose.model("Form", formSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Hello World");
})

server.post("/form", async (req, res) => {
  try {
    let formData = new Form();
    formData.name = req.body.name;
    formData.phone = req.body.phone;
    formData.email = req.body.email;
    formData.model = req.body.model;

    const doc = await formData.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(process.env.PORT, () => {
  console.log("Server started on port 5000");
});
