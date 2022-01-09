module.exports = {
  conf: {
    aliases: ["guard2safe","guard2white","guard2whitelist"],
    name: "guard2güvenli",
    serverowner: true
  },

  run: async ({client, msg, args, guild, Database, uye, cfg, fs, prefix}) => {
    // Coded by kei
    let seçenek = args[0] 
    const data = await Database.findOne({ guildID: guild});
    if(seçenek == "list" || seçenek == "liste"){client.message(client.normalEmbed(`Guard 2 Safe List: ${data && data.Safe ? `${data.Safe.map((x ,i) => `<@!${x}>`).join(',')}`: '**Veritabanında güvenli üye bulunamadı.**'}`, msg), msg.channel.id)}
    if(!(seçenek == "list" || seçenek == "liste")){  
    if (!uye) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}safe {user}`, msg), msg.channel.id, 5000)
    if (!data) {client.message(client.normalEmbed(`${uye} üyesi başarıyla güvenli veritabanına eklendi!`, msg), msg.channel.id);new Database({guildID: msg.guild.id, Safe: uye.id}).save();} else {
    let Safe = data.Safe;
    if(Safe.includes(uye.id)) {client.message(client.normalEmbed(`${uye} üyesi başarıyla güvenli veritabanından çıkarıldı!`, msg), msg.channel.id);Safe.remove(uye.id);data.save();return}client.message(client.normalEmbed(`${uye} üyesi başarıyla güvenli veritabanına eklendi!`, msg), msg.channel.id); Safe.push(uye.id);data.save();}}}}