const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription('¿Por qué sólo tengo un comando?'),
    async execute(interaction) {
        const embed =
            new EmbedBuilder().setAuthor({ name: "Yoru", iconURL: "https://cdn.discordapp.com/app-icons/1003062293904498769/c5ee90247492a8a6e3119b6dc5354da5.png" })
                .setDescription("Soy un bot de prueba, por eso sólo tengo un comando. Si quieres ver mi código, puedes ir a [mi repositorio](https://github.com/Jotis1/yorubot)")
                .setColor("Random")
        await interaction.reply({ embeds: [embed] });

    },
};
