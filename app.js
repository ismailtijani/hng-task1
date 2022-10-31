const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// res.setHeader("Content-Type", "application/json");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  const data = JSON.stringify({
    slackUsername: "Ismail Tijani",
    backend: true,
    age: 28,
    bio: "My name is Ismail Tijani, i am a software developer",
  });

  res.send(data);
});

app.listen(port, () => console.log("Server is running on " + port));
