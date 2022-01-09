const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const request = require("request");
const logs = require('discord-logs');
logs(client);
const cfg = require("./src/configs/config.json");
const moment = require("moment");
const mongo = require("mongoose");
require("moment-duration-format")
client.commands = global.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei

require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/events/functions.js")(client, cfg, moment, Discord, request); 

client.login(cfg.Bot.Token).catch(err => console.error("Bota giriş yapılırken başarısız olundu!"));
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
// Coded by kei
