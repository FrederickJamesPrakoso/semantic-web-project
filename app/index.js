// Mendapatkan elemen tombol dan input pencarian
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const limitInput = document.getElementById("limitInput");

console.log(limitInput);

// Menambahkan event listener ke tombol pencarian
searchButton.addEventListener("click", function () {
  // Mendapatkan nilai dari input pencarian
  const searchValue = searchInput.value;
  const limitValue = limitInput.value;

  // Memanggil fungsi fetchData dengan nilai pencarian
  fetchData(searchValue, limitValue);
});

async function fetchData(search, limit) {
  const endpointUrl = "http://localhost:3030/rumahsakit/";
  let sparqlQuery = "";

  // Menentukan query berdasarkan apakah ada input pencarian atau tidak
  if (search) {
    sparqlQuery = `
      PREFIX id: <https://rumahsakit.com/> 
      PREFIX data: <https://rumahsakit.com/ns/data#> 
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 

      SELECT * WHERE {
          ?datas			
          data:kode ?kode;
          data:nama ?nama;
          data:kabupaten ?kabupaten;
          data:alamat ?alamat;
          data:telepon ?telepon;
          data:pemilik ?pemilik;
          data:kelas ?kelas.
          FILTER 
          (regex (?kode, '${search}', 'i') 
          || regex (?nama, '${search}', 'i')
          || regex (?kabupaten, '${search}', 'i') 
          || regex (?alamat, '${search}', 'i')
          || regex (?telepon, '${search}', 'i')
          || regex (?pemilik, '${search}', 'i')
          )
      } LIMIT ${limit ? limit : "20"} `;
  } else {
    sparqlQuery = `
      PREFIX id: <https://rumahsakit.com/> 
      PREFIX data: <https://rumahsakit.com/ns/data#> 
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 

      SELECT * WHERE {
          ?datas			
          data:kode ?kode;
          data:nama ?nama;
          data:kabupaten ?kabupaten;
          data:alamat ?alamat;
          data:telepon ?telepon;
          data:pemilik ?pemilik;
          data:kelas ?kelas.
      } LIMIT ${limit ? limit : "20"} `;
  }

  // Melakukan fetch data dari endpoint SPARQL
  fetch(
    endpointUrl + "?query=" + encodeURIComponent(sparqlQuery) + "&format=json"
  )
    .then((response) => response.json())
    .then((data) => {
      displayResults(data.results.bindings);
    })
    .catch((err) => console.error(err));
}

function displayResults(results) {
  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  let index = 1;

  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index++}</td>
      <td>${result.kode.value}</td>
      <td>${result.nama.value}</td>
      <td>${result.kabupaten.value}</td>
      <td>${result.alamat.value}</td>
      <td>${result.pemilik.value}</td>
      <td>${result.kelas.value}</td>
    `;
    resultsBody.appendChild(row);
  });
}

// Memanggil fungsi fetchData saat halaman dimuat
fetchData();
