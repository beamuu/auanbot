const command = require('./commands.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
function handleCommand(message, command_body, args) {

    switch (command_body) {

        case "ping":
            command.ping(message);
            break;

        case "code":
            command.code(message, args);
            break;

        case "embed":
            command.embed(message, args);
            break;

        case "signup":
            command.signup(message, args);
            break;

        case "account":
            command.account(message, args);
            break;
        case "api":
            command.api(message, args);
            break;
        case "covid":
            command.covid(message);
            break;
        case "btc":
            command.btc(message);
            break;
        case "LINEMSG":
            command.LINEMSG(message, args);
            break;
        case "website":
            command.website(message);
            break;

        // For software en. project (temporary)
        case "view":
            command.view(message , args);
            break;
        case "github":
            command.project_github(message);
            break;
        case "miro":
            command.project_miro(message);
            break;
        case "ls":
            command.ls(message , args);
            break;
        
        default:
            return message.reply("None of the commands are matched. Check the spelling!");

    }
}

function setCryptoReminder(client) {
    remindBTC(client);
    const Intv = setInterval(() => {
        remindBTC(client)
    }, 3600000);
}
async function remindBTC(client) {
    const r = await fetch("https://api.bitkub.com/api/market/ticker?sym=THB_BTC")
        .then(res => res.json())
    const t = await fetch("https://api.bitkub.com/api/servertime")
        .then(res => res.json())
        .then(res => {
            const t = new Date(res*1000);
            return t.toLocaleString();
        })
    const embed = new Discord.MessageEmbed()
    .setAuthor("Auan Crypto")
    .setDescription("BTC is now at " + r.THB_BTC.last + ` THB [ ${r.THB_BTC.percentChange}% ]\nReported at ${t}\nmarket: Bitkub`)
    .setColor(0xfcba03)
    // var text = "```BTC is now at " + r.THB_BTC.last + ` THB [ ${r.THB_BTC.percentChange}% ]\nReported at [ ${t} ]\nmarket: Bitkub` + "```"
    client.channels.cache.get('845500505794936872').send(embed);
}

module.exports = {
    handleCommand,
    setCryptoReminder,
}
