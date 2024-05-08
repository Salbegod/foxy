const { SlashCommandBuilder } = require("discord.js")
const { fetchJSON, getPlayerList } = require("../../serverHandler.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("list")
        .setDescription("Lista os jogadores online"),
	async execute(interaction) {
        let body = await fetchJSON();
        if (body.debug.ping == false || body.players.online == 0) {
            return interaction.reply("Ninguém está jogando no momento... :(");
        }
        if (body.players.list) {
            if(body.players.online == 1){
                return interaction.reply(`No momento, ${body.players.list[0].name} está jogando.`);
            }
            return interaction.reply(`${getPlayerList(body)} estão jogando.`);

        }
        return interaction.reply(`${body.players.online} jogadores estão jogando`);
	},
};