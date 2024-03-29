import { CommandClient, Msg } from '@pikostudio/command.ts'
import Dokdo from 'dokdo'
import { Manager } from 'erela.js'
import { TextChannel, VoiceChannel } from 'discord.js'
import 'prisma'//DB할수없다.. 망할
import { MessageEmbed } from 'discord.js'










const config = require('../config.json')
//const { Manager } = require("erela.js");
declare module 'discord.js' {
  interface Client {
    config: any
    music: Manager
  }
}


const client = new CommandClient({
  watch: true,
  owners: config.owner,
  commandHandler: {
    prefix: config.prefix,
  },
  currentDir: __dirname,
})

process.send =
  process.send ||
  function () {
    return false
  }

client.config = config
client.loadExtensions('extensions/general')
client.loadExtensions('extensions/music')
client.loadExtensions('extensions/manage')
client.loadExtensions('extensions/dev')
client.loadExtensions('extensions/info')
client.music = new Manager({
  // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
  nodes: [
    // If you pass a object like so the "host" property is required
    {
      host: "localhost",
      port: 2333,
      password: 'youshallnotpass'
    }],
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
})
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    const moment = require("moment")
    require("moment-duration-format");
      const duration = moment.duration(track.duration).format("`D[일] H[시간] m[분] s[초]`");
        
    (client.channels.cache.get(player.textChannel!) as TextChannel)?.send(new MessageEmbed().setTitle("<a:yes:753994796363939881> 노래를 재생을 시작합니다").setDescription(`**제목:** \`${track.title}\`\n**시간:** \`${duration}\``).setThumbnail(track.displayThumbnail("default")).setURL(track.uri));
  })
  .on("queueEnd", (player) => {
    (client.channels.cache.get(player.textChannel!) as TextChannel)?.send(new MessageEmbed().setTitle("음악이 종료되었습니다").setDescription("종료되어 채널을 나갔어요"));

    player.destroy();
  });

client.on('raw', payload => client.music.updateVoiceState(payload))
const a = 0;
client.once("error", err=> (client.channels?.cache.get("826704542208098334") as TextChannel).send(new MessageEmbed().setTitle("에러").setDescription(err).setColor("RED")))
client.once('ready', () => {
  const dokdo = new Dokdo(client, {
    noPerm: (msg) => msg.reply('권한 없으므로 돌아가세요..'),
    prefix: config.prefix,
    owners: [...config.dev, config.owner]
  })
 //update(client.guilds?.cache.size)
  console.log("ONLINE!")
client.user?.setActivity("n! | 놀욘봇은 유저분들을 사랑한답니다")


  client.on('message', (msg) => {
    dokdo.run(msg)
    process.env.SHELL = '/bin/bash'
  })


})

client.login(config.token)
