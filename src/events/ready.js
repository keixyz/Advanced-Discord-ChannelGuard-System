const client = global.client;
const cfg = require("../configs/config.json");
// Coded by kei
module.exports = async () => {
  // Coded by kei
// Coded by kei
  client.user.setPresence({ activity: { name: cfg.Bot.Durum }, status: cfg.Bot.Status });
  let VoiceChannelID = client.channels.cache.get(cfg.Channels.VoiceChannelID);
  if (VoiceChannelID) VoiceChannelID.join().catch(err => {});
  console.log(`(${client.user.username}) adlı hesapta [${client.guilds.cache.get(cfg.Server.GuildID).name}] adlı sunucuda giriş yapıldı.`)
  client.channelBackup()
  setInterval(() => {
  client.channelBackup()
  }, 900000)}
// Coded by kei
module.exports.conf = {
  name: "ready",
};
