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
  
  /**
   * @type {import("@structures/Command")}
   */
  
  module.exports = {
    name: "say",
    description: "make the bot say something",
    category: "FUN",
    botPermission: ["SendMessages"],
    command: {
      enabled: false,
      usage: "<message>",
      minArgsCount: 1,
      aliases: ["s"],
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
      ],
    },
    
   async messageRun(message, args) {
       const isian = args[0].join(" ");
       
       message.reply(isian);
   },   
      
    async interactionRun(interaction) {
      const messages = interaction.options.getString('message');
  
      interaction.editReply(messages);
    },
  };