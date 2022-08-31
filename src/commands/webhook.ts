import { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } from "discord.js";
import axios from "axios";
import FormData from "form-data";
import {webhook} from "../config.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("웹훅을 보냄")
        .addUserOption(option => option.setName("user")
            .setDescription("웹훅 프사 And 웹훅 닉네임")
            .setRequired(true))
        .addStringOption(option => option.setName("content")
            .setDescription("내용")
            .setRequired(true)),
    async execute(interaction : CommandInteraction, client : Client) {
        const user : any = interaction.options.get('user')?.user;
        const content : any = interaction.options.get('content')?.value;
        const sendWebhook = async(url : string, data : any) => {
            const form = new FormData();

            form.append('payload_json', JSON.stringify(data));

            await axios.post(url, data);
        };

        sendWebhook(webhook, {
            username: user?.username,
            avatar_url: user?.avatarURL(),
            content: content
        });

        await interaction.reply({ephemeral: true, embeds: [new EmbedBuilder().setTitle("웹훅을 보냈습니다.").setColor("Green").setTimestamp()]});
    }
};