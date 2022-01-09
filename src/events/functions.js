module.exports = async(client, cfg, moment, Discord, request) => {
  // Coded by kei
// Coded by kei
   client.keiColors = new Array("#6959cd","#1f0524", "#0b0067", "#4a0038", "#07052a", "#FFDF00", "#00FFFF", "#0091CC", "#0047AB", "#384B77", "#ffffff", "#000000", "#04031a", "#f9ffba");
   
  const Log = new Discord.WebhookClient(cfg.Webhook.LogWebhook.ID, cfg.Webhook.LogWebhook.Token);
  const { Permissions } = require("discord.js");
  const channelDatabase = require("../schemas/ChannelBackup.js");
  // Coded by kei

   client.normalEmbed = (message, msj) => {
     return {
       embed: {
         description: message,
         author: { name: msj.guild.member(msj.author).displayName, icon_url: msj.author.avatarURL({dynamic: true}) },
         color: client.keiColors[Math.floor(Math.random() * client.keiColors.length)],}}}
   // Coded by kei
   client.logSend = (content) => {
     const logEmbed = new Discord.MessageEmbed().setThumbnail(client.guilds.cache.get(cfg.Server.GuildID).iconURL({dynamic: true})).setDescription(content).setAuthor(client.guilds.cache.get(cfg.Server.GuildID).name, client.guilds.cache.get(cfg.Server.GuildID).iconURL({dynamic: true})).setColor(client.keiColors[Math.floor(Math.random() * client.keiColors.length)])
     Log.send(logEmbed).catch(() => { })}
  
  client.timemessage = (content, Channel, timeout) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).then((msg) => msg.delete({ timeout: timeout })).catch(() => { });};
  
  client.message = (content, Channel) => {
   const channel = client.channels.cache.get(Channel);
   if (channel) channel.send(content).catch(() => { });};
  
  client.channelBackup = () => {
   let kanalsize = client.guilds.cache.get(cfg.Server.GuildID).channels.cache.filter(chnls => chnls.name !== "@everyone").size
   channelDatabase.deleteMany({});
   client.guilds.cache.get(cfg.Server.GuildID).channels.cache.forEach(async channel => {
   await new channelDatabase({
   Id: channel.id,
   Type: channel.type,
   Permissions: channel.permissionOverwrites.array().map(perms => client.changePermissions(perms)),
   Parent: channel.parent ? channel.parentID : null}).save();});
   console.log(`Başarıyla sunucuda ki ${kanalsize} kanalın yedeği alındı!`)}
  // Coded by kei
// Coded by kei
  client.changePermissions = (perms) => {
    let array = {};
     array.id = perms.id 
     array.type = perms.type
     array.allow = new Permissions(perms.allow.bitfield).toArray()
     array.deny === new Permissions(perms.deny.bitfield).toArray()
    return array;}
      
  client.setChannel = (oldChannel, newChannel) => {
   if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
   if (newChannel.type == "text") {
    newChannel.edit({
     name: oldChannel.name,
     nsfw: oldChannel.nsfw,
     topic: oldChannel.topic,
     rateLimitPerUser: oldChannel.rateLimitPerUser})
   } else if (newChannel.type == "voice") {
    newChannel.edit({
     name: oldChannel.name,
     userLimit: oldChannel.userLimit});
   } else if (newChannel.type == "category") {
    newChannel.edit({
     name: oldChannel.name})}
   oldChannel.permissionOverwrites.forEach(x => {
    let o = {};
     x.allow.toArray().forEach(p => {
       o[p] = true;});
     x.deny.toArray().forEach(p => {
       o[p] = false;});
   newChannel.createOverwrite(x.id, o)})};
  // Coded by kei

  client.createChannel = (channel) => {
   channel.clone({ reason: "Channel Create Guard" }).then(async kanal => {
   if (channel.parentID != null) kanal.setParent(channel.parentID);
   kanal.setPosition(channel.position);
   await kanal.setPosition(channel.position);
   if (channel.type == "category") {
   let x = await channelDatabase.find({ Parent: channel.id }).exec();
   if (x) {
   await x.forEach(async (c) => await client.channels.cache.get(c.Id).setParent(kanal.id))
   channelDatabase.findOneAndUpdate({ Parent: channel.id }, { $set: { Parent: kanal.id } }).exec(async (e, res) => {
   if (e) console.error(e);})}}
    channel.permissionOverwrites.forEach(perm => {
   let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
     thisPermOverwrites[p] = true;})
    perm.deny.toArray().forEach(p => {
     thisPermOverwrites[p] = false;})
    kanal.createOverwrite(perm.id, thisPermOverwrites);})})}
  
  client.deleteChannel = (channel) => {
   channel.delete({reason: "Channel Delete Guard"}).catch(() => { })}
  
  client.punish = (userID, tür) => {
   let useer = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(userID);
   if (!useer) return;
   if (tür == "Suspended") return useer.roles.cache.has(cfg.Roles.Booster) ? useer.roles.set([cfg.Roles.Booster, cfg.Roles.Jail]) : useer.roles.set([cfg.Roles.Jail]).catch(() => { });
   if (tür == "Forbidden") return useer.ban({ reason: "Channel Guard" }).catch(() => { })}}
// Coded by kei
// Coded by kei
