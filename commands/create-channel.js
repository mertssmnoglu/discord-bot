const Discord = require('discord.js');

module.exports.config = {
    name: "create-channel",
    aliases: ["channel-create"],
    usage: "Creates a text / voice channel.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    var options = ["text", "voice"]
    if (!args.length) {
        var embed = new Discord.MessageEmbed()
            .setTitle("Create")
            .setColor("BLUE")
            .setDescription("What do you want to create ?")
            .addField("Options", `${options.join("\n")}`)
        message.channel.send(embed)
    } else {
        if (options.includes(args[0])) {
            switch (args[0]) {
                case "text-channel":
                    message.react("📙")
                    var channelname = args[1] ? args[1].toLowerCase() : "text-channel"
                    message.guild.channels.create(`${channelname}`, {
                        type: "text"
                    })
                    break;
                case "voice-channel":
                    message.react("🔊")
                    var channelname = args[1] ? args[1] : "voice-channel"
                    message.guild.channels.create(`${channelname}`, {
                        type: "voice"
                    })
                    break;
            }
        } else {
            message.channel.send(`\`${args[0]}\` is not an option.`).then(botmessage => botmessage.delete({
                timeout: 5000
            }))
        }
    }
}