const { SlashCommandBuilder } = require("discord.js")
const { fetchJSON } = require("../../serverHandler.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Diz se o servidor de Minecraft está online"),
	async execute(interaction) {
        let body = await fetchJSON();
        if (body.debug.ping == true) {
            return interaction.reply("O servidor está online! :D");
        }
        return interaction.reply("O servidor está offline :(");
	},
};