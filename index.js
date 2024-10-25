const app = require("./app");

const args = process.argv.slice(2);
const command = args[0];

// Switch case untuk menjalankan perintah sesuai dengan input
switch (command) {
  case "make-folder":
    app.makeFolder(args[1]); // Nama folder bisa diambil dari args[1]
    break;

  case "make-file":
    app.makeFile(args[1], args[2]); // Nama file dan konten bisa diambil dari args[1] dan args[2]
    break;

  case "ext-sorter":
    app.extSorter();
    break;

  case "read-folder":
    app.readFolder(args[1]); // Nama folder yang akan dibaca bisa diambil dari args[1]
    break;

  case "read-file":
    app.readFile(args[1]); // Nama file yang akan dibaca diambil dari args[1]
    break;

  default:
    throw Error("Invalid command");
}
