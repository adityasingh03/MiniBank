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

const f2 = function (x) {
  account1.movements.push(x);
};
/////////////////////////////////////////////////

//functions

const f1 = function (acc) {
  containerMovements.innerHTML = '';
  acc.forEach(function (i, j) {
    const w = i > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${w}">${j + 1} ${w}</div>
  <div class="movements__date">Just Now</div>
  <div class="movements__value">${Math.abs(Number(i))}€</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  labelBalance.textContent = acc.reduce((acc, val) => acc + val, 0) + `€`;
  labelSumIn.textContent =
    acc.filter(value => value > 0).reduce((acc, val) => acc + val, 0) + `€`;
  labelSumOut.textContent =
    Math.abs(
      acc.filter(value => value < 0).reduce((acc, val) => acc + val, 0)
    ) + `€`;
  labelSumInterest.textContent =
    Math.abs(
      acc
        .filter(value => value > 0)
        .map(value => (value * 1.2) / 100)
        .reduce((acc, val) => acc + val, 0)
    ) + `€`;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const accountr = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
    console.log(1);
  });
  console.log(accountr);
  if (accountr?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '1';
    labelWelcome.textContent = `Welcome back,${accountr.owner}`;
    f1(accountr.movements);
  }
});

/*
const f3 = function (acc, x) {
  return acc.filter(value => value * x > 0).reduce((acc, val) => acc + val, 0);
};
const f4 = function (acc) {
  return acc.reduce((acc, val) => acc + val, 0);
};
*/
//callback
