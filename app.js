const fs = require("node:fs");
const path = require("node:path");
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// Membuat folder
app.makeFolder = () => {
  rl.question("Masukkan Nama Folder: ", (folderName) => {
    fs.mkdir(__dirname + `/${folderName}`, { recursive: true }, (err) => {
      if (err) {
        console.log("Error membuat folder:", err.message);
      } else {
        console.log("Folder berhasil dibuat.");
      }
      rl.close();
    });
  });
};

// Membuat file baru
app.makeFile = () => {
  rl.question("Masukkan Nama File (beserta ekstensi): ", (fileName) => {
    rl.question("Masukkan Isi File: ", (content) => {
      fs.writeFile(path.join(__dirname, fileName), content, (err) => {
        if (err) {
          console.log("Error membuat file:", err.message);
        } else {
          console.log(`File '${fileName}' berhasil dibuat.`);
        }
        rl.close();
      });
    });
  });
};

// Merapikan file berdasarkan ekstensi
app.extSorter = () => {
  const sourceFolder = path.join(__dirname, 'unorganize_folder');
  
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.log("Error membaca folder:", err.message);
      rl.close();
      return;
    }

    files.forEach((file) => {
      const ext = path.extname(file).substring(1); // Mengambil ekstensi
      let targetFolder = '';

      // Tentukan target folder berdasarkan ekstensi
      if (ext === 'jpg' || ext === 'png') {
        targetFolder = 'image';
      } else if (ext === 'txt') {
        targetFolder = 'text';
      } else {
        targetFolder = 'others';
      }

      const targetPath = path.join(__dirname, targetFolder);
      
      // Buat folder jika belum ada
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
      }

      // Pindahkan file ke folder yang sesuai
      fs.rename(
        path.join(sourceFolder, file),
        path.join(targetPath, file),
        (err) => {
          if (err) console.log("Error memindahkan file:", err.message);
        }
      );
    });

    console.log("Files berhasil dirapikan berdasarkan ekstensi.");
    rl.close();
  });
};

// Membaca isi folder
app.readFolder = () => {
  rl.question("Masukkan Nama Folder: ", (folderName) => {
    const folderPath = path.join(__dirname, folderName);

    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log("Error membaca folder:", err.message);
        rl.close();
        return;
      }

      const fileDetails = files.map((file) => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        const ext = path.extname(file).substring(1);
        const fileType = ext === 'jpg' || ext === 'png' ? 'gambar' : 'text';

        return {
          namaFile: file,
          extensi: ext,
          jenisFile: fileType,
          tanggalDibuat: stats.birthtime.toISOString().split('T')[0],
          ukuranFile: `${(stats.size / 1024).toFixed(2)} KB`,
        };
      });

      console.log(`Berhasil menampilkan isi dari folder '${folderName}':`);
      console.log(JSON.stringify(fileDetails, null, 2));
      rl.close();
    });
  });
};

// Membaca isi file
app.readFile = () => {
  rl.question("Masukkan Nama File: ", (fileName) => {
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log("Error membaca file:", err.message);
      } else {
        console.log(`Isi dari file '${fileName}':\n`);
        console.log(data);
      }
      rl.close();
    });
  });
};

module.exports = app;
