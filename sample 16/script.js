// LOGIN PAGE
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (username === '') {
      alert('Please enter your name');
    } else {
      localStorage.setItem('username', username);
      localStorage.setItem('transactions', JSON.stringify([]));
      window.location.href = 'dashboard.html';
    }
  });
}

// DASHBOARD PAGE
const userName = document.getElementById('user-name');
if (userName) {
  const username = localStorage.getItem('username');
  if (!username) window.location.href = 'index.html';
  userName.innerText = username;

  // Load transactions
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const balance = document.getElementById('balance');
  const money_plus = document.getElementById('money-plus');
  const money_minus = document.getElementById('money-minus');

  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0).toFixed(2);
  const expense = (
    amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });
}

// TRACKER PAGE
const addBtn = document.getElementById('add-btn');
if (addBtn) {
  const list = document.getElementById('list');
  const text = document.getElementById('text');
  const amount = document.getElementById('amount');
  const balance = document.getElementById('balance');
  const money_plus = document.getElementById('money-plus');
  const money_minus = document.getElementById('money-minus');

  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
      ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
  }

  function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0).toFixed(2);
    const expense = (
      amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
  }

  window.removeTransaction = function (id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
  };

  function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
  }

  init();

  addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
      alert('Please enter text and amount');
    } else {
      const transaction = {
        id: Math.floor(Math.random() * 1000000),
        text: text.value,
        amount: +amount.value,
      };
      transactions.push(transaction);
      addTransactionDOM(transaction);
      updateValues();
      updateLocalStorage();
      text.value = '';
      amount.value = '';
    }
  });
}
