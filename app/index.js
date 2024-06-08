function search() {
    const query = document.getElementById("searchInput").value;
    const url = `http://localhost:5000/search?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayResults(results) {
    const resultsBody = document.getElementById("resultsBody");
    resultsBody.innerHTML = "";

    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.type}</td>
            <td>${result.number}</td>
            <td>${result.rank}</td>
        `;
        resultsBody.appendChild(row);
    });
}

displayProducts(products);

