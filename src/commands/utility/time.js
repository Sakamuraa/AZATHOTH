const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { MESSAGES, EMBED_COLORS } = require("@root/config.js");
const { getJson } = require("@helpers/HttpUtils");
const timestampToDate = require("timestamp-to-date");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "time",
  description: "time in Asia/Jakarta",
  cooldown: 5,
  category: "UTILITY",
  userPermission: ["SendMessages"],
  command: {
    enabled: true,
    usage: "",
    minArgsCount: 0,
  },
  slashCommand: {
    enabled: true,
  },

  async messageRun(message, args) {
    const dates = new Date();
  	const datess = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(dates);
    await message.safeReply(`${datess} WIB`);
  },

  async interactionRun(interaction) {
    const dates = new Date();
  	const datess = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(dates);
      
      interaction.followUp(`${datess} WIB`)
  },
};
