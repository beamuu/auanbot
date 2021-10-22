/* 
Author: 
    Nutchanon,
    Napasin,

*/


// discord.js initialize

const Discord = require('discord.js');
const client = new Discord.Client();

// express initialize

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;



const prefix = '$';
const Bot = require('./src/bot.js');

const TOKEN = require('./token.json');




// discord client start here.

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Client start at timestamp ${Date.now()}`)
});

client.on('message', message => {

    const array_of_content = message.content.split(' ');
    const author_id = message.author.id;
    const command_body = array_of_content[0].slice(1, array_of_content.size);
    const getPrefix = array_of_content[0][0];
    const args = array_of_content.shift();

    if (getPrefix != prefix) {
        return console.log("\x1b[32m", `[${author_id}]:`, "\x1b[0m", `${message.content}`);
    }

    Bot.handleCommand(message, command_body, array_of_content);



});


// setTimeout(() => {
//     const cryptoChannel = client.channels.cache.get("845500505794936872");
//     cryptoChannel.send("```sys: Starting Crypto report at 1hr intervals.```")
//     Bot.setCryptoReminder(client);
// }, 5000);

// client.channels.cache.get("845500505794936872").send("");
// console.log(client.channels)
client.login(TOKEN.discord);




// API Initialize

app.use(express.json());

// Root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/index.html');
});




app.listen(port, () => {
    console.log("API is running on port: ", port);
});







