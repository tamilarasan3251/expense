var state = {
  balance: 0,
  income: 0,
  expense: 0,
  transactions: [
    // { id: uniqueid(), name: "salary", amount: 500, type: "income" },
    // { id: uniqueid(), name: "buy grocery", amount: 100, type: "expense" },
    // { id: uniqueid(), name: "buy guitor", amount: 200, type: "expense" },
  ],
};
//console.log(state);
let balance = document.querySelector("#balance");
let income = document.querySelector("#income");
let expense = document.querySelector("#expense");
let transEl = document.querySelector("#transaction");
let incomebtnEl = document.querySelector("#incomebtn");
let expensebtnEl = document.querySelector("#expensebtn");
let inputname = document.querySelector("#name");
let inputamount = document.querySelector("#amount");

function init() {
  updatestate();
  addnewlisteners();
}
function uniqueid() {
  return Math.round(Math.random() * 10000);
}

function addnewlisteners() {
  incomebtnEl.addEventListener("click", onAddIncomeClick);
  expensebtnEl.addEventListener("click", onAddExpenseClick);
}
function onAddIncomeClick() {
  addtransaction(inputname.value, inputamount.value, "income");
}

function addtransaction(name, amount, type) {
  if (name !== "" && amount !== "") {
    var transaction = {
      id: uniqueid(),
      name: name,
      amount: parseInt(amount),
      type: type,
    };
    state.transactions.push(transaction);
    //console.log(state);
    updatestate();
  } else {
    alert("enter data");
  }
  inputname.value = "";
  inputamount.value = "";
}
//console.log("income", inputname.value, inputamount.value);

function onAddExpenseClick() {
  addtransaction(inputname.value, inputamount.value, "expense");
  // var name = inputname.value;
  // var amount = inputamount.value;
  // if (name !== "" && amount !== "") {
  //   var transaction = {
  //     name: inputname.value,
  //     amount: parseInt(inputamount.value),
  //     type: "income",
  //   };
  //   state.transactions.push(transaction);
  //   //console.log(state);
  //   updatestate();
  // } else {
  //   alert("enter data");
  // }
  // console.log("expense");
}

function onDeleteclick(event) {
  var id = parseInt(event.target.getAttribute("data-id"));
  var deleteindex;
  for (var i = 0; i < state.transactions.length; i++) {
    if (state.transactions[i].id === id) {
      deleteindex = i;
      break;
    }
  }
  state.transactions.splice(deleteindex, 1);
  updatestate();
}

//updatestate fun
function updatestate() {
  var balance = 0, //200
    income = 0, //500
    expense = 0, //300
    item;

  for (var i = 0; i < state.transactions.length; i++) {
    item = state.transactions[i];
    if (item.type === "income") {
      income += item.amount;
    } else if (item.type === "expense") {
      expense += item.amount;
    }
  }

  balance = income - expense;
  //console.log(balance, income, expense);
  state.balance = balance;
  state.income = income;
  state.expense = expense;
  //console.log(state);
  render();
}
function render() {
  balance.innerHTML = `$${state.balance}`;
  income.innerHTML = `$${state.income}`;
  expense.innerHTML = `$${state.expense}`;
  var trans, containerEl, amountEl, item, btnEl;
  transEl.innerHTML = "";
  for (var i = 0; i < state.transactions.length; i++) {
    item = state.transactions[i];
    //console.log(item);
    trans = document.createElement("li");
    trans.append(item.name);
    transEl.appendChild(trans);

    containerEl = document.createElement("div");
    amountEl = document.createElement("span");
    if (item.type === "income") {
      amountEl.classList.add("income-amt");
    } else if (item.type === "expense") {
      amountEl.classList.add("expense-amt");
    }

    amountEl.innerHTML = `$${item.amount}`;
    containerEl.appendChild(amountEl);
    btnEl = document.createElement("button");

    btnEl.setAttribute("data-id", item.id);

    btnEl.innerHTML = "x";

    btnEl.addEventListener("click", onDeleteclick);

    containerEl.appendChild(btnEl);
    transEl.appendChild(containerEl);
  }
}
init();
