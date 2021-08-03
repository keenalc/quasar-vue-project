var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loanList = [
  { id: 1, name: "test", amount: 100000, term: 5, type: "Home Loan" },
];
app.post("/api/addLoan", function (req, res) {
  if (loanList.find((loanObj) => loanObj.name === req.body.name))
    return res.status(400).send();
  else {
    let id = loanList.length + 1;
    loanList.push({ ...req.body, id: id });
    return res.send({ id: id });
  }
});

app.get("/api/getLoanDetails/:id", function (req, res) {

  let loanObj = loanList.find((loan) => loan.id === parseInt(req.params.id));
console.log(loanObj)
  return res.send({
    ...loanObj,
    isDue: true,
    transactionDetails: [
      {
        amountPaid: "10000",
        paidOn: "20-09-2020",
      },
      {
        amountPaid: "10000",
        paidOn: "27-09-2020",
      },
    ],
  });
});

app.listen(8081);
