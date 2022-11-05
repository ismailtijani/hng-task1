const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.set("Content-Type", "application/json");
//   const data = JSON.stringify({
//     slackUsername: "Ismail Tijani",
//     backend: true,
//     age: 28,
//     bio: "My name is Ismail Tijani, i am a software developer",
//   });

//   res.send(data);
// });

const OperationType = Object.freeze({
  ADD: "addition",
  SUBTRACT: "subtraction",
  MULTIPLY: "multiplication",
  //   PLUS: "plus",
  //   MINUS: "minus",
  //   TIMES: "times",
});

app.post("/", (req, res) => {
  var { x, y, operation_type } = req.body;

  if (!operation_type) {
    return res.status(400).json({
      error: "Operation type is required",
    });
  }

  let result = 0;

  const extractDigits = operation_type.match(/\d+/g);

  if (!x && !y) {
    if (extractDigits.length === 2) {
      x = parseInt(extractDigits[0]);
      y = parseInt(extractDigits[1]);
    } else {
      return res.status(400).json({
        error: "x and y are required",
      });
    }
  }

  const extractOperationType = operation_type.match(
    /addition|subtraction|multiplication|plus|minus|times/i
  );

  const convertedType = extractOperationType[0].toLowerCase();

  if (!Object.values(OperationType).includes(convertedType)) {
    return res.status(400).json({
      error: "Invalid operation type",
    });
  }

  switch (convertedType) {
    case OperationType.ADD:
      // case OperationType.PLUS:
      result = x + y;
      break;
    case OperationType.SUBTRACT:
      // case OperationType.MINUS:
      result = x - y;
      break;
    case OperationType.MULTIPLY:
      // case OperationType.TIMES:
      result = x * y;
      break;
    default:
      break;
  }

  res.status(200).json({
    slackUsername: "Ismail Tijani",
    result,
    operation_type: convertedType,
  });
});

app.listen(port, () => console.log("Server is running on " + port));
