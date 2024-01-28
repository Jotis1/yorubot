import "dotenv/config";
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import ColoredLogs, { BoldConsoleLog } from "./lib/console"

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

const commands: any[] = [];

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

async function LoadCommands() {

    for (const folder of commandFolders) {

        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

        for (const file of commandFiles) {

            const filePath = path.join(commandsPath, file);
            const command = await import(`${foldersPath}/${folder}/${file}`);

            if ("data" in command && "execute" in command) {

                ColoredLogs(`[INFO] --> Comando "${command.data.name}" cargado desde:`, "33m");
                BoldConsoleLog(filePath + "\n");

                commands.push(command.data.toJSON());

            } else {

                ColoredLogs(`[WARNING] El comando en ${filePath} no tiene las propiedades requeridas "data" o "execute".`, "33m");

            }

        }

    }

    return commands;
};

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN as string);

export default async function DeployCommands() {

    try {

        await LoadCommands();
        await rest.put(
            Routes.applicationGuildCommands(DISCORD_CLIENT_ID as string, DISCORD_GUILD_ID as string),
            { body: commands },
        );

        ColoredLogs(`[INFO] --> Todos los comandos cargados`, "35m");

    } catch (error) {

        console.error(error);

    }

};