const { SlashCommandBuilder } = require('discord.js');
const { serverEmitter } = require("../../serverHandler.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Abre o servidor, caso esteja offline'),
	async execute(interaction) {
		serverEmitter.emit('start');
		await interaction.reply("Abrindo o server!");
	},
};