// Array to store clients
let clients = [];

// Array to store transactions
let transactions = [];

// Add Client function
document.getElementById('client-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get client name and email from the form
    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;

    // Create a new client object
    const client = {
        id: Date.now(), // Use timestamp as unique ID
        name: clientName,
        email: clientEmail
    };

    // Add client to the array
    clients.push(client);

    // Update the client list in the dropdown
    updateClientSelect();

    // Clear the form inputs
    document.getElementById('client-form').reset();
});

// Update the client select dropdown
function updateClientSelect() {
    const clientSelect = document.getElementById('client-select');
    clientSelect.innerHTML = '<option value="" disabled selected>Select a client</option>'; // Reset the select

    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        clientSelect.appendChild(option);
    });

    // Update the client list section
    updateClientList();
}

// Update the client list section
function updateClientList() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = ''; // Clear the list

    clients.forEach(client => {
        const listItem = document.createElement('li');
        listItem.textContent = `${client.name} - ${client.email}`;
        clientList.appendChild(listItem);
    });
}

// Add Transaction function
document.getElementById('transaction-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const clientId = document.getElementById('client-select').value;
    const transactionType = document.getElementById('transaction-type').value;
    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;

    // Validate if client is selected and transaction type is selected
    if (!clientId || !transactionType) {
        alert("Please select a client and transaction type.");
        return;
    }

    // Find the selected client by ID
    const client = clients.find(c => c.id == clientId);

    // Format the amount with commas
    const formattedAmount = formatAmount(amount);

    // Create a new transaction object
    const transaction = {
        id: Date.now(), // Unique ID for transaction
        clientName: client.name,
        transactionType: transactionType,
        amount: formattedAmount,
        currency: currency
    };

    // Add the transaction to the transactions array
    transactions.push(transaction);

    // Update the transaction history table
    updateTransactionHistory();

    // Clear the transaction form
    document.getElementById('transaction-form').reset();
});

// Update the transaction history table
function updateTransactionHistory() {
    const transactionHistory = document.getElementById('transaction-history').getElementsByTagName('tbody')[0];
    transactionHistory.innerHTML = ''; // Clear the table

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        // Create table data cells for each transaction property
        const clientNameCell = document.createElement('td');
        clientNameCell.textContent = transaction.clientName;
        
        const transactionTypeCell = document.createElement('td');
        transactionTypeCell.textContent = transaction.transactionType;
        
        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount;

        const currencyCell = document.createElement('td');
        currencyCell.textContent = transaction.currency;

        // Append the cells to the row
        row.appendChild(clientNameCell);
        row.appendChild(transactionTypeCell);
        row.appendChild(amountCell);
        row.appendChild(currencyCell);

        // Append the row to the table body
        transactionHistory.appendChild(row);
    });
}

// Function to format the amount with commas
function formatAmount(amount) {
    return parseInt(amount).toLocaleString();
}

// Export to CSV function
document.getElementById('export-btn').addEventListener('click', function() {
    // Prepare the CSV content
    const header = ['Client Name', 'Transaction Type', 'Amount', 'Currency'];
    const rows = transactions.map(transaction => [
        transaction.clientName,
        transaction.transactionType,
        transaction.amount,
        transaction.currency
    ]);

    // Convert rows to CSV format
    const csvContent = [
        header,
        ...rows
    ].map(row => row.join(',')).join('\n');

    // Create a downloadable link
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.target = '_blank';
    link.download = 'transactions.csv';
    link.click();
});