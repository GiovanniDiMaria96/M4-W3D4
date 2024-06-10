
// ARRAY VUOTO PER GESTIRE IL DISPLAY
let allUsers = [];
// CATEGORIA DI DEFAULT PER GESTIRE LE CATEGORIE
let selectedCategory = 'name';

// FUNZIONE ASINCRONA PER IL RECUPERO DEI DATI
async function z() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
        allUsers = data;
        displayUsers(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// FUNZIONE PER IL DISPLAY DEI DATI RICHIESTI
function displayUsers(usersList) {
    // DEFINIZIONE DI UN PRIMO CONTENITORE PER LA GESTIONE DELLO SVUOTAMENTO AUTOMATICO
    let container = document.querySelector('#b');
    container.innerHTML = ""; 

    // DEFINIZIONE DELL'HEADER DELLA TABELLA
    let table = document.createElement('table');
    table.className = "table z";
    table.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    // CONCATENAZIONE DEL BODY DELLA TABELLA DEFINITA PRIMA

    let tbody = table.querySelector('tbody');

    usersList.forEach((user) => {
        let row = document.createElement('tr');

        // DISPLAY DINAMICO
        row.innerHTML = `
            <td class = "tdd">${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
        `;

        tbody.appendChild(row);
    });

    container.appendChild(table);
}

// FUNZIONE PER LA SELEZIONE DINAMICA DELLA CATEGORIA
function selectCategory(category) {
    selectedCategory = category;
    // DISPLAY DINAMICO DI CATEGORIA
    document.querySelector('.dropdown-toggle').textContent = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    filterUsers(); 
}

// FUNZIONE PER IL DISPLAY DINAMICO DELLA TABELLA PER LA CATEGORIA SCELTA
function filterUsers() {
    const searchTerm = document.querySelector('#search').value.toLowerCase();
    // DISPLAY DINAMICO DI CATEGORIA
    document.querySelector('#search-term').textContent = `${searchTerm}Searching by: '${selectedCategory}'`;

    // DISPLAY DINAMICO DELLA TABELLA PER CATEGORIA
    const filteredUsers = allUsers.filter(user =>
        user[selectedCategory].toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}

z();
