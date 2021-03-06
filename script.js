'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const acc = [account1, account2, account3, account4];
//Making username an object

const acc2 = acc.map(function (value, index) {
  let str = acc[index].owner
    .split(' ')
    .map(function (v) {
      return v[0];
    })
    .join('')
    .toLowerCase();
  acc[index].username = str;
});

/////////////////////////////////////////////////

//functions

//list of withdrawal and deposits
const f1 = function (acc) {
  containerMovements.innerHTML = '';
  acc.forEach(function (i, j) {
    const w = i > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${w}">${j + 1} ${w}</div>
  <div class="movements__date"></div>
  <div class="movements__value">${Math.abs(Number(i))}???</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  labelBalance.textContent = acc.reduce((acc, val) => acc + val, 0) + `???`;
  labelSumIn.textContent =
    acc.filter(value => value > 0).reduce((acc, val) => acc + val, 0) + `???`;
  labelSumOut.textContent =
    Math.abs(
      acc.filter(value => value < 0).reduce((acc, val) => acc + val, 0)
    ) + `???`;
  labelSumInterest.textContent =
    acc
      .filter(value => value > 0)
      .map(value => {
        let x3 = Number((value * 1.2) / 100).toFixed(2);
        return Number(x3);
      })
      .reduce((acc, val) => acc + val, 0)
      .toFixed(2) + `???`;
};
const f2 = function (acc) {
  acc.movements.reduce((ac, val) => {
    return val + ac;
  }, 0);
};
const f3 = function (from) {
  let cur = from.movements.reduce((acc, val) => acc + val);
  const accountr = accounts.find(function (val) {
    if (val.username === inputTransferTo.value) return val;
  });
  let x = inputTransferAmount.value;
  if (cur - inputTransferAmount.value >= 0) {
    if (accountr) {
      accountr.movements.push(x * 1);
      from.movements.push(x * -1);
    }
  } else alert('Transfer money is more than Current Money');
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
};

const f4 = function (from) {
  if (inputLoanAmount.value > 0) from.movements.push(inputLoanAmount.value * 1);
  inputLoanAmount.value = '';
};

const f5 = function (from) {
  if (
    inputCloseUsername.value === from.username &&
    Number(inputClosePin.value) === from.pin
  ) {
    let ind = accounts.findIndex(val => val === from);
    accounts.splice(ind, 1);
    containerApp.style.opacity = '0';
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
  inputClosePin.blur();
};

const f6 = function () {
  let m = 4;
  let s = 59;
  const time = setInterval(function () {
    s--;
    if (s === -1) {
      s = 59;
      m--;
    }
    if (m === 0 && s === 0) {
      clearInterval(time);
      labelWelcome.textContent = `Session TimeOut.`;
      containerApp.style.opacity = '0';
    }
    labelTimer.textContent = `${String(m).padStart(2, 0)}.${String(s).padStart(
      2,
      0
    )}`;
  }, 200);
};

//callbacks and events
//login
let accountr;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  accountr = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  if (accountr?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Welcome back,${accountr.owner}`;
    f1(accountr.movements);
  }
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  inputLoginPin.blur();
  f6();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  f3(accountr);
  console.log(accountr);
  f1(accountr.movements);
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  f4(accountr);
  console.log(accountr);
  f1(accountr.movements);
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(accountr);
  f5(accountr);
});

console.log(
  Array.from({ length: 100 }, (_, i) => Math.trunc(Math.random() * 6) + 1)
);
