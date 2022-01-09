const fs = require("fs");// Coded by kei
const client = global.client;// Coded by kei
// Coded by kei
// Coded by kei
fs.readdir("./src/events", (err, files, events = []) => {
	if (err) return console.error(err);
  console.log("--------------------------");
  console.log("Eventler yükleniyor.");
	files
	.filter((file) => file.endsWith(".js"))
	.forEach((file) => {
	let prop = require(`../events/${file}`);
	if (!prop.conf) return;
	client.on(prop.conf.name, prop);
  events.push(prop.conf.name);});
  console.log("[" + events.join(", ") + "] " +  " isimli event(ler) yüklendi.");
  console.log("--------------------------");});