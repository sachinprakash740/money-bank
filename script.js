'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
         <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const updateUI = function (acc) {
  displayMovements(acc.movements);

  // display balance
  calcPrintBalance(acc);

  // display summary
  calcDisplaySummery(acc);
};
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, val) => acc + val, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummery = function (acc) {
  const summaryIn = acc.movements
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0);
  console.log(summaryIn);
  labelSumIn.innerHTML = `${summaryIn}€`;

  const summaryOut = acc.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0);
  console.log(summaryOut);
  labelSumOut.innerHTML = `${Math.abs(summaryOut)}€`;

  const summaryIntrest = acc.movements
    .filter(val => val > 0)
    .map(val => (val * 1.2) / 100)
    .filter(val => val >= 1)
    .reduce((acc, val) => acc + val, 0);

  console.log(summaryIntrest);
  labelSumInterest.innerHTML = `${summaryIntrest}€`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);

/// event Handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    val => val.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login');

    // display UI message

    const firstName = currentAccount.owner.split(' ')[0];
    const formatted = firstName[0] + firstName.slice(1);
    console.log(formatted);

    labelWelcome.textContent = `Good day, ${formatted}`;

    containerApp.style.opacity = 100;
    // clear the input
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    // inputLoginPin.blur();
    // display movements

    updateUI(currentAccount);
  }
});

// eventhandler for transfering the money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const recieverAcc = accounts.find(
    val => val.userName === inputTransferTo.value
  );

  console.log(amount, recieverAcc);

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.userName !== currentAccount.userName
  ) {
    recieverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
  }
  console.log(recieverAcc.movements, currentAccount.movements);
  updateUI(currentAccount);
  inputTransferTo.value = inputTransferAmount.value = '';
});

// Loan amount transfer

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    amount >= currentAccount.movements.some(val => val >= amount / 10)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      val => val.userName === inputCloseUsername.value
    );

    console.log(index);

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

    inputClosePin.value = inputCloseUsername.value = '';
  }

  console.log(accounts);
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// const calcDisplaySummery = function (movements) {

//   const totalIn = movements.

// };

// c;
// const newUserName = userName.map(function (user) {
//   return user[0];
// });

// console.log(newUserName.join(''));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(1, -1));

// console.log(arr.slice());
// console.log(arr.splice(-1));
// console.log(arr);

// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());
// console.log(arr2);
// const letters = arr.concat(arr2);
// console.log(letters);
// const letters2 = [...arr, ...arr2];
// console.log(letters2);
// console.log(letters.join('-'));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(` ${i + 1} : You have deposited ${movement}`);
//   } else {
//     console.log(` ${i + 1} : You have withdraw ${Math.abs(movement)}`);
//   }
// }
// console.log('------------');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(` ${i + 1} : You have deposited ${mov}`);
//   } else {
//     console.log(` ${i + 1} : You have withdraw ${Math.abs(mov)}`);
//   }
// });

// const names = ['Jonas', 'Abhi', 'Sachin', 'Kate', 'Bindu', 'Sagar'];
// names.push('Kariya');
// names.forEach(function (name, i) {
//   console.log(` ${i + 1} : ${name}`);
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(` ${key} : ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'EUR', 'INR', 'GBP', 'USD']);

// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key, cur) {
//   console.log(`${key} : ${value}`);
// });

// const dogsJulia = [3, 5, 2, 12, 7];

// dogsJulia.splice(0, 1);
// dogsJulia.splice(-2);

// const dogsKate = [4, 1, 15, 8, 3];

// const allDogs = [...dogsJulia, ...dogsKate];

// console.log(allDogs);

// const allDogs = [...dogsJulia, ...dogsKate];
// const checkDogs = function (dogsJulia, dogsKate) {
//   dogsJulia.splice(0, 1);
//   dogsJulia.splice(-2);
//   console.log(dogsJulia);
//   const allDogs = [...dogsJulia, ...dogsKate];

//   allDogs.forEach(function (val, i) {
//     if (val >= 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and he is ${val} year's old`
//       );
//     } else {
//       console.log(
//         `Dog number ${i + 1} is a puppy, and he is ${val} year's old`
//       );
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [2, 5, 6, 1, 4]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });
// console.log(movements);
// console.log(movementsUSD);

// const movementsUSD2 = movements.map(move => move * euroToUsd);

// console.log(movementsUSD2);

// const movementsDescription = movements.map(
//   (mov, i) =>
//     ` ${i + 1} : You have ${mov > 0 ? 'Deposited' : 'Withdrawn'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementsDescription);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);

// const withdraws = movements.filter(mov => mov < 0);

// console.log(withdraws);

// const balance = movements.reduce((acc, val) => acc + val, 0);
// console.log(balance);

// const maxValue = function (movement) {
//   const max = movement.reduce(function (acc, val, i) {
//     if (acc > val) {
//       return acc;
//     } else {
//       return val;
//     }
//   }, movements[0]);
//   console.log(max);
// };

// maxValue(account1.movements);

// const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
// const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAvrgHumanAge = function (ages) {
//   const humanAge = ages.map(val => (val <= 2 ? 2 * val : 16 + val * 4));

//   const adults = humanAge.filter(val => val >= 18);

//   const avgAdults =
//     adults.reduce((acc, val, i, arr) => acc + val, 0) / adults.length;
//   // const avgAdults = adults.reduce(
//   //   (acc, val, i, arr) => acc + val / arr.length,
//   //   0
//   // );
//   console.log(humanAge);
//   console.log(adults);
//   return Math.round(avgAdults);
// };
// console.log(calcAvrgHumanAge(dogsAge1));
// console.log(calcAvrgHumanAge(dogsAge2));
// const euroToUsd = 1.1;
// const totalDeposits = movements
//   .filter(val => val > 0)
//   .map(val => val * euroToUsd)
//   .reduce((acc, val) => acc + val, 0);

// console.log(totalDeposits);

// const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
// const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];

// const calcaAvrgHuman2 = function (ages) {
//   const age = ages
//     .map(val => (val <= 2 ? val * 2 : 16 + val * 4))
//     .filter(val => val >= 18)
//     .reduce((acc, val, i, arr) => acc + val / arr.length, 0);

//   console.log(age);
// };
// calcaAvrgHuman2(dogsAge1);
// calcaAvrgHuman2(dogsAge2);

// const finedFirdtWithdrawal = movements.find(val => val > 0);
// console.log(movements);
// console.log(finedFirdtWithdrawal);

// const account = accounts.find(val => val.owner === 'Jessica Davis');
// console.log(account);

const arr = [[1, 2], [[3, [4, 5]], 6], 7, 8, 9];

console.log(arr.flat(3));

const accountMovement = accounts
  .map(val => val.movements)
  .flat()
  .filter(val => val > 0)
  .reduce((acc, val) => acc + val, 0);

console.log(accountMovement);

const accountMovement2 = accounts
  .flatMap(val => val.movements)
  .filter(val => val > 0)
  .reduce((acc, val) => acc + val, 0);

console.log(accountMovement2);

console.log(movements);
// const sorted1 = movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
const sorted1 = movements.sort((a, b) => a - b);
console.log(sorted1);

const sorted2 = movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(sorted2);

const x = new Array(8);

x.fill(1, 4);
x.fill(23, 2, 6);
console.log(x);

const z = Array.from({ length: 8 }, (_, i) => i + 1);

console.log(z);

const n = Array.from({ length: 100 }, (_, i) =>
  Math.round(Math.random(i + 1) * 100)
);
console.log(n);
