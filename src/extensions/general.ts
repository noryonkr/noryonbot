import { Command, Extension, Msg, Arg } from '@pikostudio/command.ts'
import { MessageEmbed } from 'discord.js'
import { Message } from 'discord.js'

export default class General extends Extension {
  @Command({ name: '도움말', aliases: ['help'] })
  help(@Msg() msg: Message) {
    const modules = this.client.extensions
    const categories = modules.map((r) => ({
      commands: r.commands,
      name: r.constructor.name,
    }))
    const embed = new MessageEmbed()
    embed.setTitle('도움말')
    for (const category of categories) {
      embed.addField(
        category.name,
        category.commands
          .map((i) => i.name)
          .map((r) => `\`${r}\``)
          .join(', ') || '명령어 없음',
      )
    }
    return msg.reply(embed)
  }
    
    @Command({name: '핑', aliases:['ping'] })
    ping(@Msg() msg: Message) {
      const dt = new Date(msg.createdTimestamp);
       //const m = this.client.channels.cache.get('733958435091251254')?.send("ping up!")
        const embed = new MessageEmbed()
        .setTitle("핑")
        .setDescription(`**🏓웹소켓:** \`${this.client.ws.ping}ms\``)
        .setThumbnail("https://cdn.discordapp.com/attachments/692682565353734174/777507000233754644/ping.png")
 
      msg.channel.send(embed)
       }
    
    @Command({name: '초대', aliases: ['invite'] })
    invite(@Msg() msg: Message) {
        const embed = new MessageEmbed()
        .setTitle("초대")
        .setDescription("하트를 누르고 초대해주세요(선택)\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n[**여기를 클릭하여 초대하세요[KOREANBOTS]**](https://koreanbots.dev/bots/692294930416140308)\n[**여기를 클릭해 초대하셈[UNIQUEBOTS]**](https://uniquebots.kr/bots/edit/692294930416140308)")
        msg.reply(embed)
    }
    
    @Command({name: '개발자', aliases: ['dev'] })
    dev(@Msg() msg: Message) {
     
    
        const embed = new MessageEmbed()
        .setTitle("개발자 정보")
        .addField("운영자", this.client.users.cache.get("616570697875193866")?.tag)
        .addField("개발자", `\`${this.client.users.cache.get('340373909339635725')?.tag}\`, \`${this.client.users.cache.get('627292715956043785')?.tag}\`, \`${this.client.users.cache.get('674877162557407242')?.tag}\`, \`${this.client.users.cache.get('628595345798201355')?.tag}\``)
        msg.reply(embed)
        
    }

    @Command({name: '서포트', aliases: ['support']})
    support(@Msg() msg: Message) {
        const embed = new MessageEmbed()
        .setTitle("서포트")
        .setDescription("[클릭/터치](https://alphakr.xyz/discord)")
        .setFooter(msg.author.tag,msg.author.displayAvatarURL())
        .setThumbnail("https://alphakr.xyz/public/static/img/logo.png")
        msg.channel.send(embed)
    }

    @Command({name: '말', aliases: ['say']})
    async say(@Msg() msg: Message, @Arg({rest: true}) query: string){
const config = require("../../config.json")
      const args = msg.content.split(" ").slice(1)
      msg.channel.send(args.join(" "))
    }


}
