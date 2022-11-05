const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const OperationType = Object.freeze({
  ADD: "add",
  SUBTRACT: "subtract",
  MULTIPLY: "multiply",
  PLUS: "plus",
  MINUS: "minus",
  TIMES: "times",
});

app.post("/", (req, res) => {
  const { operation_type } = req.body;

  if (!operation_type) {
    return res.status(400).json({
      error: "Operation type is required",
    });
  }

  let result = 0;

  const extractDigits = operation_type.match(/\d+/g);

  const x = parseInt(extractDigits[0]);
  const y = parseInt(extractDigits[1]);

  if (!x || !y) {
    return res.status(400).json({
      error: "Missing required parameter",
    });
  }

  const extractOperationType = operation_type.match(
    /add|subtract|multiply|plus|minus|times/i
  );
  const convertedType = extractOperationType[0].toLowerCase();

  if (!Object.values(OperationType).includes(convertedType)) {
    return res.status(400).json({
      error: "Invalid operation type",
    });
  }

  switch (convertedType) {
    case OperationType.ADD:
    case OperationType.PLUS:
      result = x + y;
      break;
    case OperationType.SUBTRACT:
    case OperationType.MINUS:
      result = x - y;
      break;
    case OperationType.MULTIPLY:
    case OperationType.TIMES:
      result = x * y;
      break;
    default:
      break;
  }

  res.status(200).json({
    slackUserName: "Ismail Tijani",
    operation_type: convertedType,
    result,
  });
});

app.listen(port, () => console.log("Server is running on " + port));
