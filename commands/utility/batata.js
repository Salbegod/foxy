const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('venus')
		.setDescription('Who is Venus?'),
	async execute(interaction) {
		await interaction.reply('Venus Batata Coxinha!');
	},
};