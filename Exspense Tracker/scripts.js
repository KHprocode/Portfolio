document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('expense-form');
    var list = document.getElementById('expense-list');
    var totalElement = document.getElementById('total');

    function updateTotal() {
        var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        var total = expenses.reduce(function(sum, expense) {
            return sum + expense.amount;
        }, 0);
        totalElement.textContent = total;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var name = form.elements.name.value;
        var category = form.elements.category.value;
        var amount = parseFloat(form.elements.amount.options.value);
        var date = form.elements.date.value;

        var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        expenses.push({
            name: name,
            category: category,
            amount: amount,
            date: date
        });

        localStorage.setItem('expenses', JSON.stringify(expenses));

        var listItem = document.createElement('li');
        listItem.textContent = name + ': ' + category + ', $' + amount + ', ' + date;

        list.appendChild(listItem);

        form.reset();

        updateTotal();
    });

    // On page load, populate list with stored expenses
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(function(expense) {
        var listItem = document.createElement('li');
        listItem.textContent = expense.name + ': ' + expense.category + ', $' + expense.amount + ', ' + expense.date;

        list.appendChild(listItem);
    });

    updateTotal();
});

// Other parts remain the same

form.addEventListener('submit', function(event) {
    // Other parts remain the same

    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>$${amount}</td>
        <td>${date}</td>
        <td><button class="remove">Remove</button></td>
    `;

    list.appendChild(row);

    // Other parts remain the same
});

// On page load, populate list with stored expenses
expenses.forEach(function(expense, index) {
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.name}</td>
        <td>${expense.category}</td>
        <td>$${expense.amount}</td>
        <td>${expense.date}</td>
        <td><button class="remove" data-index="${index}">Remove</button></td>
    `;

    list.appendChild(row);
});

list.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove')) {
        var index = event.target.dataset.index;
        var expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        event.target.parentElement.parentElement.remove();
        updateTotal();
    }
});

// Other parts remain the same
