import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("say")
    .setDescription("Repite lo que digas.")
    .addStringOption(option => option.setName("mensaje").setDescription("El mensaje que quieres que repita.").setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {

    const message = interaction.options.getString("mensaje");
    const channel = interaction.channel;

    await interaction.reply({ content: "Mensaje enviado, solo tú y yo sabemos quién lo ha escrito 😏", ephemeral: true });
    await channel?.send(message!);

}