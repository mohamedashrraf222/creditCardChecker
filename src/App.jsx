import { useState } from "react";
import "./App.css";

const americanExpress =
  "https://cdn.freebiesupply.com/logos/large/2x/american-express-card-2-logo-svg-vector.svg";
const masterCard =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png";
const visa =
  "https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-1976.png";

const unknown = "/5a3813d34861c6.6832170315136245312965.png";

const discover = "https://www.cardrates.com/wp-content/uploads/2014/08/discover-retina-1.jpg";

// this component for the card type will be shown
function Visa(props) {
  console.log(props.type);
  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${props.type})` }}
    ></div>
  );
}

// this function used in changing class states
function changing(newValue, myfunc) {
  myfunc(newValue);
}

// this function to determine the type of the credit card
function determine(number) {
  const identifer = number.slice(0, 2);
  let myType;

  switch (identifer) {
    case "51":
    case "52":
    case "53":
    case "54":
    case "55":
    case "22":
      myType = masterCard;
      break;
    case "34":
    case "37":
      myType = americanExpress;
      break;
    case "60":
      myType = discover;
      break;

    default:
      myType = unknown;
      break;
  }

  if (number[0] == 4) {
    myType = visa;
  }
  return myType;
}

// this function return boolen to check if credi card number is valid
function testCredit(num) {
  let sum = 0;
  let sumTwo = 0;
  let number;

  for (let i = num.length - 1; i >= 0; i--) {
    if ((num.length - 1 - i) % 2 == 0) {
      sumTwo += Number(num[i]);
    } else {
      number = (Number(num[i]) * 2).toString();

      for (let j = 0; j < number.length; j++) {
        sum += Number(number[j]);
      }
    }
  }

  return (sum + sumTwo) % 10 == 0;
}

// this is out main component
function App() {
  // this state is for the first container class
  const [containerOne, setOne] = useState(
    "containerOne containerOne-transformed"
  );

  // this state is for the seconed container class
  const [containerTwo, setTwo] = useState(
    "containerTwo-visable containerTwo-hidden"
  );

  // defining a state to make an error changable
  const [error, setError] = useState(americanExpress);

  // defining a state that defines the card type
  const [type, setType] = useState("");

  return (
    <div className="mainPage">
      <div id="title">
        <h1>Welcome to credit card validiator !</h1>
      </div>
      <div className={containerOne}>
        <h1>Enter the credit card number here :</h1>

        <div
          className="warning containerTwo-hidden"
          id="warning"
          msg={error}
        ></div>

        <input
          type="text"
          name="cardNum"
          id="cardNum"
          placeholder="EX : 4003600000000014"
        />

        <div
          className="myBtn"
          onClick={() => {
            // this is the input value
            const creditNumber = document.getElementById("cardNum").value;

            // check if the input value is numbers only
            if (isNaN(creditNumber) || creditNumber.match(/^ *$/) !== null) {
              // this state is to change the error that appear
              setError(
                "please enter numbers only without letters or whitespces."
              );

              // this is to make the error appear
              document
                .getElementById("warning")
                .classList.remove("containerTwo-hidden");
            } else if (!isNaN(creditNumber)) {
              // test the credit validation in testCredit function
              const validation = testCredit(creditNumber);

              if (validation) {
                // the next code if for the transition in the page to make the logo apear by changing class
                document
                  .getElementById("warning")
                  .classList.add("containerTwo-hidden");
                document.getElementById("title").classList.add("margined");
                changing("containerOne", setOne);
                changing("containerTwo-visable", setTwo);

                // using function to identify type of credit
                let theType = determine(creditNumber);
                setType(theType);
              } else {
                // this is to make the error appear
                document
                  .getElementById("warning")
                  .classList.remove("containerTwo-hidden");
                setError("INVALID");
              }
            }
          }}
        >
          TEST
        </div>
      </div>
      <div className={containerTwo}>
        <Visa type={type} />
      </div>
    </div>
  );
}

export default App;
