const products = [
  { name: 'Rumah Sakit 1', description: 'Deskripsi Rumah Sakit 1' },
  { name: 'Rumah Sakit 2', description: 'Deskripsi Rumah Sakit 2' },
  { name: 'Rumah Sakit 3', description: 'Deskripsi Rumah Sakit 3' },
];

document.getElementById('searchButton').addEventListener('click', function() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'bg-white p-4 rounded shadow';
    productItem.innerHTML = `
      <h2 class="text-xl font-bold">${product.name}</h2>
      <p>${product.description}</p>
    `;
    productList.appendChild(productItem);
  });
}

displayProducts(products);

