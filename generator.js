// const Papa = require("papaparse");

const { parse } = require("csv-parse");
const fs = require("fs");

const INPUT_FILE = "./data/rs_nasional.csv";
const OUTPUT_FILE = "./output/rumah_sakit.ttl";
const DAERAH = "Jakarta Timur";

const header = `@prefix id: <https://rumahsakit.com/> .
@prefix data: <https://rumahsakit.com/ns/data#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
`;

// kode, nama, kab, alamat, TELEPON, pemilik, kelas;

const csvToTurtle = () => {
  let index = 1;

  fs.appendFile(OUTPUT_FILE, header, (err) => {
    if (err) throw err;
  });

  fs.createReadStream(INPUT_FILE)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      const output = `
    id:${index++}
        data:kode "${row[0]}";
        data:nama "${row[1]}";
        data:kabupaten "${row[2]}";
        data:alamat "${row[3]}";
        data:telepon "${row[4]}";
        data:pemilik "${row[5]}";
        data:kelas "${row[6]}".
        `;
      //   const output = `${row[1]},${row[2]},${row[3]},${row[4]},${row[5]},${row[6]},${DAERAH}\n`;

      fs.appendFileSync(OUTPUT_FILE, output, (err) => {
        if (err) throw err;
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    })
    .on("end", () => {
      console.log("File read successful");
    });
};

csvToTurtle();
