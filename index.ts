import 'dotenv/config';
import { Client, Collection, ActivityType } from 'discord.js';
import fs from 'fs';
import path from 'path';
import DeployCommands from './deploy-commands';
import coloredLogs, { BoldConsoleLog } from './lib/console';

const { DISCORD_TOKEN } = process.env;

const client = new Client({
    intents: ["Guilds"],
}) as Client & { commands: Collection<string, any> };

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

async function LoadCommands() {
    for (const folder of commandFolders) {

        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {

            const filePath = path.join(commandsPath, file);
            const command = await import(`${foldersPath}/${folder}/${file}`);

            if ('data' in command && 'execute' in command) {

                client.commands.set(command.data.name, command);

            } else {

                coloredLogs(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`, '33m');

            }

        }
    }
}

async function DeployApp() {

    coloredLogs('\n[INFO] --> Cargando comandos...\n', '36m');

    await LoadCommands();
    await DeployCommands();

    client.on('ready', (client) => {

        client.user.setActivity('Disfrutando de las vistas 😎', { type: ActivityType.Custom });
        client.user.setStatus('idle');

        BoldConsoleLog(`\nEl bot ${client?.user?.tag} se ha iniciado correctamente 👌\n`);
    });

    client.on("interactionCreate", async interaction => {

        if (!interaction.isChatInputCommand()) return;

        const command = (interaction.client as Client & { commands: Collection<string, any> }).commands.get(interaction.commandName);

        if (!command) {
            console.error(`Ningún comando con el nombre ${interaction.commandName} fue encontrado.`);
            return;
        }

        try {

            await command.execute(interaction);

        } catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Ha ocurrido un error mientras se ejecutaba este comando!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Ha ocurrido un error mientras se ejecutaba este comando!', ephemeral: true });
            }
        }
    });

    client.login(DISCORD_TOKEN);

}

DeployApp();