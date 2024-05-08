const { SlashCommandBuilder } = require('discord.js');
const { serverEmitter } = require("../../serverHandler.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Fecha o servidor, caso esteja online'),
	async execute(interaction) {
		serverEmitter.emit('stop');
		await interaction.reply("Fechando o server...Adeus...");
	},
};