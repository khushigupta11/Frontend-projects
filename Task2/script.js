var state={
    income: 400,
    savings: 200,
    expense: 100,
    paid: 50,
    transactions:[
        { id:uniqueId(), name:'Salary',price: 5000, quantity: 1, amount:5000, type:'income'},
        { id:uniqueId(), name:'Savings',price: 1000, quantity: 1, amount:1000,type:'savings'},
        { id:uniqueId(), name:'Buy Chair',price: 100, quantity: 4, amount:400,type:'expense'},
        { id:uniqueId(), name:'Buy Table',price: 500, quantity:2, amount:1000,type:'expense'}
    ]

}
var incomeEl = document.querySelector('#income');
var savingsEl = document.querySelector('#savings');
var expenseEl = document.querySelector('#expense');
var paidEl = document.querySelector('#paid');
var transactionsEl = document.querySelector('#transaction');
var incomeBtnEl = document.querySelector('#incomeBtn');
var savingsBtnEl = document.querySelector('#savingsBtn');
var expenseBtnEl = document.querySelector('#expenseBtn');
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');
var quantityInputEl = document.querySelector('#quantity');
var totalInputEl = document.querySelector('#total');

function init(){
    updateState();
    initListeners();
    render();
}
function uniqueId(){
    return Math.round(Math.random() * 1000000);
}

function initListeners(){
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    savingsBtnEl.addEventListener('click', onAddSavingsClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}

function onAddIncomeClick() {
    var transaction = {
        id: uniqueId(),
        name: nameInputEl.value,
        price: parseInt(amountInputEl.value),
        quantity: parseInt(quantityInputEl.value),
        amount: parseInt(totalInputEl.value), type: 'income'
    };
    state.transactions.push(transaction);
    updateState();

    nameInputEl.value = '';
    amountInputEl.value = '';
    quantityInputEl.value = '';
    totalInputEl.value = '';
}

function onAddSavingsClick(){
    var transaction = {
        id: uniqueId(),
        name: nameInputEl.value,
        price: parseInt(amountInputEl.value),
        quantity: parseInt(quantityInputEl.value),
        amount: parseInt(totalInputEl.value), type: 'savings'
    };
    state.transactions.push(transaction);
    updateState();

    nameInputEl.value = '';
    amountInputEl.value = '';
    quantityInputEl.value = '';
    totalInputEl.value = '';
}

function onAddExpenseClick(){
    var transaction = {
        id: uniqueId(),
        name: nameInputEl.value,
        price: parseInt(amountInputEl.value),
        quantity: parseInt(quantityInputEl.value),
        amount: parseInt(totalInputEl.value), type: 'expense'
    };
    state.transactions.push(transaction);
    updateState();

    nameInputEl.value = '';
    amountInputEl.value = '';
    quantityInputEl.value = '';
    totalInputEl.value = '';
}

function onDeleteClick(event){
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;
    for ( var i = 0; i < state.transactions.length; i++){
        if (state.transactions[i].id === id){
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex, 1);

    updateState();
}

function updateState() {
    var paid = 0,
    income = 0,
    savings = 0,
    expense = 0,
    item;

    for (var i = 0; i < state.transactions.length; i++){
        item = state.transactions[i];

        if (item.type === 'income'){
            income += item.amount;
        } else if (item.type === 'savings'){
            savings += item.amount;
        } else if (item.type === 'expense'){
            expense += item.amount;
        }
    }
    
    paid = income - expense; 
    state.paid = paid;
    state.income = income;
    state.savings = savings;
    state.expense = expense;

    render();
}

function render(){
    incomeEl.innerHTML = `Rs ${state.income}`;
    savingsEl.innerHTML = `Rs ${state.savings}`;
    expenseEl.innerHTML = `Rs ${state.expense}`;
    paidEl.innerHTML = `Rs ${state.paid}`;

    var transactionEl, containerEl, moneyEl, item , rupeesEl, paiseEl, btnEl, btn1El, btn2El;

    transactionsEl.innerHTML = '';

    for (var i=0; i < state.transactions.length; i++){
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name);

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');

        rupeesEl = document.createElement('span');
        if (item.type === 'income'){
            rupeesEl.classList.add('income-price');
        } else if (item.type === 'savings'){
            rupeesEl.classList.add('savings-price');
        } else if (item.type === 'expense'){
            rupeesEl.classList.add('expense-price');
        }
        rupeesEl.innerHTML = `Rs ${item.price}`;

        containerEl.appendChild(rupeesEl);
        transactionEl.appendChild(containerEl);

        paiseEl = document.createElement('span');
        if (item.type === 'income'){
            paiseEl.classList.add('income-qnty');
        } else if (item.type === 'savings'){
            paiseEl.classList.add('savings-qnty');
        } else if (item.type === 'expense'){
            paiseEl.classList.add('expense-qnty');
        }
        paiseEl.innerHTML = `${item.quantity}`;

        containerEl.appendChild(paiseEl);
        transactionEl.appendChild(containerEl);

        moneyEl = document.createElement('span');
        if (item.type === 'income'){
            moneyEl.classList.add('income-amt');
        } else if (item.type === 'savings'){
            moneyEl.classList.add('saving-amt');
        } else if (item.type === 'expense'){
            moneyEl.classList.add('expense-amt');
        }
        moneyEl.innerHTML = `Rs ${item.amount}`;
       
        containerEl.appendChild(moneyEl);

        btn1El = document.createElement('button');
        btn1El.innerHTML = 'Pay';

        containerEl.appendChild(btn1El);

        btnEl = document.createElement('button');
        btnEl.innerHTML = 'Edit';

        containerEl.appendChild(btnEl);

        btn2El = document.createElement('button');
        btn2El.setAttribute('data-id', item.id);
        btn2El.innerHTML = 'Delete';

        btn2El.addEventListener('click', onDeleteClick);

        containerEl.appendChild(btn2El);
        
        transactionEl.appendChild(containerEl);
    }
}

init();