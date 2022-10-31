const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const data = JSON.stringify({
    slackUsername: "Ismail Tijani",
    backend: true,
    age: 28,
    bio: "My name is Ismail Tijani, i am a software developer",
  });

  res.send(data);
});

app.listen(port, () => console.log("Server is running on " + port));
