import { BetterClient } from "./Client";

import { token } from "./config.json";

export const client = new BetterClient();

client.once("ready", () => {
    console.log("bot is ready");
});

client.start(token);
