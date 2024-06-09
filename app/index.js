const $rdf = require("rdflib");
const fs = require("fs");

// const store = $rdf.graph();

// const data = fs.readFileSync("./app/data/rumah_sakit.ttl", "utf-8");

// // const fetcher = new $rdf.Fetcher(store);

// // const resourceUrl = `https://rumahsakit.com/ns/data#`;
// // const resourceUrl = `./data/rumah_sakit.ttl`;

// let doc = $rdf.sym("https://rumahsakit.com/ns/data#");
// const mimeTyoe = "text/turtle";
// $rdf.parse(data, store, doc.uri, mimeTyoe);

// async function fetchData() {
//   const sparqlQuery = `
//         SELECT * WHERE {
//             ?datas
//                         data:nama ?nama;
//                         data:kabupaten ?kabupaten;
//                         data:alamat ?alamat;
//                         data:telepon ?telepon;
//                         data:pemilik ?pemilik;
//                         data:kelas ?kelas.

//         } LIMIT 10
//         `;

//   const query = $rdf.SPARQLToQuery(sparqlQuery, false, store);

//   try {
//     store.query(query, (result) => {
//       const data = Object.entries(result);
//       console.log(data);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

fetchData();

// function search() {
//   const query = document.getElementById("searchInput").value;
//   //   const url = `http://localhost:5000/search?q=${query}`;
//   const url = `http://localhost:3030/rumahsakit`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       displayResults(data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function displayResults(results) {
//   const resultsBody = document.getElementById("resultsBody");
//   resultsBody.innerHTML = "";

//   let index = 1;

//   console.log(results);

//   results.forEach((result) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//             <td>${index++}</td>
//             <td>${result.kode}</td>
//             <td>${result.nama}</td>
//             <td>${result.kabupaten}</td>

//         `;
//     resultsBody.appendChild(row);
//   });
// }

// displayProducts(products);

async function fetchData() {
  const store = $rdf.graph();

  const ID = $rdf.Namespace("https://rumahsakit.com");
  const DATA = $rdf.Namespace("https://rumahsakit.com/ns/data#");

  const turtleData = await fs.readFile("./app/data/rumah_sakit.ttl", "utf8");

  $rdf.parse(turtleData, store, ID, "text/turtle");

  const subjects = store.each(undefined, undefined, undefined);
  let html = "";
  for (let subject of subjects) {
    const name = store.any(subject, DATA("name"));
    const address = store.any(subject, DATA("address"));
    html += `<h2>${name.value}</h2><p>${address.value}</p>`;
  }

  // Display the HTML
  document.body.innerHTML = html;
}

fetchData();
