const {
    ApplicationCommandOptionType,
    ChannelType,
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
  } = require("discord.js");
  const { isValidColor, isHex } = require("@helpers/Utils");

  const matiga = ["ON", "OFF"];
  
  /**
   * @type {import("@structures/Command")}
   */
  
  module.exports = {
    name: "announce",
    description: "create a announcement",
    category: "ADMIN",
    userPermission: ["ManageMessages"],
    command: {
      enabled: false,
      usage: "<#channel> [image link] [mention] <message>",
      minArgsCount: 1,
      aliases: ["sdev"],
    },
    slashCommand: {
      enabled: true,
      ephemeral: false,
      options: [
        {
          name: "message",
          description: "input text",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "channel",
          description: "channel to send embed",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
        {
          name: "mention",
          description: "role/user to mention",
          type: ApplicationCommandOptionType.Mentionable,
          required: false,
        },
        {
        name: "image",
        description: "put an attachment",
        type: ApplicationCommandOptionType.Attachment,
        required: false,
        },
        {
        name: "footer-icon",
        description: "on/off",
        type: ApplicationCommandOptionType.String,
        required: false,
        choices: matiga.map((ficon) => ({ name: ficon, value: ficon })),
        },
        {
          name: "timestamp",
          description: "set timestamp to on/off",
          type: ApplicationCommandOptionType.String,
          required: false,
          choices: matiga.map((ts) => ({ name: ts, value: ts })),
        },
      ],
    },
    
   async messageRun(message, args) {
       const messages = args[5].join(" ");
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
      if (!channel) return message.reply("Please provide a valid channel");
      if (channel.type !== ChannelType.GuildText) return message.reply("Please provide a valid channel");
       
      const image = args[1] || 'https://images-ext-1.discordapp.net/external/4lMPbpxT4Lj3wgrl4-7Lg-H0KfgPGl9ygkPlae-VX5M/https/photos.app.goo.gl/9kFkZUiQXnvLDhkD9';
        const mention = message.mentions.roles.first() || '@here';
        const color = args[3];
      const dev = args[4] || 'Unknown';
       
       channel.send({ content: `${mention}`, embeds: [new EmbedBuilder()
          .setTitle(`ANNOUNCEMENT`)
          .setDescription(messages)
          .setImage(image)
          .setColor(color || '#21DBBA')
          .setFooter(`Official Announce from ${dev}`)
        ]
      });
   },   
      
    async interactionRun(interaction) {
      const messages = interaction.options.getString('message');
      const channel = interaction.options.getChannel('channel');
        const mention = interaction.options.getMentionable('mention');
        const images = interaction.options.getAttachment('image') || 'files/none.png';
        /* const image = interaction.options.getString('image') || 'https://images-ext-1.discordapp.net/external/4lMPbpxT4Lj3wgrl4-7Lg-H0KfgPGl9ygkPlae-VX5M/https/photos.app.goo.gl/9kFkZUiQXnvLDhkD9'; */
        const fIcon = interaction.options.getString('footer-icon') || 'ON';
        const tst = interaction.options.getString('timestamp') || 'OFF';
  
        const embud = new EmbedBuilder()
        	.setTitle(`📢 | ANNOUNCEMENT`)
          	.setDescription(messages)
          	.setImage(images.url)
          	.setColor("#21DBBA")
        
        if (fIcon === 'ON') {
        embud.setFooter({ text: `From ${interaction.user.username}`, iconURL: interaction.guild.iconURL() })
    	}
    	if (fIcon === 'OFF') {
        embud.setFooter({ text: `From ${interaction.user.username}`, iconURL: null })
    	}
        
        if (tst === 'ON') {
            embud.setTimestamp()
        }
        
      if (!mention) {
          channel.send({ embeds: [embud] });
      } else {
          channel.send({ content: `<@&${mention.id}>`, embeds: [embud] });
      };
        
        interaction.followUp({ embeds: [new EmbedBuilder()
        .setDescription(`Announcement has been sent successfully!`)
        .addFields([
            {
                name: `📘 ┆ Channel`,
                value: `${channel} (${channel.name})`
            }
        ])
      ],
	ephemeral: true
    });
        
    },
  };