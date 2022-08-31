import { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } from "discord.js";
import axios from "axios";
import FormData from "form-data";
import {webhook} from "../config.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("me")
        .setDescription("웹훅을 보냄")
        .addStringOption(option => option.setName("content")
            .setDescription("내용")
            .setRequired(true)),
    async execute(interaction : CommandInteraction, client : Client) {
        const content : any = interaction.options.get('content')?.value;
        const sendWebhook = async(url : string, data : any) => {
            const form = new FormData();

            form.append('payload_json', JSON.stringify(data));

            await axios.post(url, data);
        };

        sendWebhook(webhook, {
            username: interaction?.user?.username,
            avatar_url: interaction?.user?.avatarURL(),
            content: content
        });

        await interaction.reply({ephemeral: true, embeds: [new EmbedBuilder().setTitle("웹훅을 보냈습니다.").setColor("Green").setTimestamp()]});
    }
};