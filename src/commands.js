const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const token = require('../token.json');
const base64 = require('base-64')

const firebase = require('firebase');
require('firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyCZJ4YvN3XjBcVASihv0FFx8A9LtODCawM",
    authDomain: "auan-bot.firebaseapp.com",
    projectId: "auan-bot",
    storageBucket: "auan-bot.appspot.com",
    messagingSenderId: "368624053903",
    appId: "1:368624053903:web:e5413eee57e141c5750afa",
    measurementId: "G-NX8TJJPS94"
};
firebase.initializeApp(firebaseConfig)
const store = firebase.firestore();

// Make ID fro lemoncat registeration
function makeid(length) {
    var result = [];
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

function ping(message) {

    // return client and API ping.
    console.log("\x1b[35m", `[${message.author.id}] [ping]:`, "\x1b[0m", `${message.content}`);

    var result = '```';
    result += `📡 Latency is ${Date.now() * 1000 - message.createdTimestamp}ms.`;
    result += '```';
    console.log(Date.now() - message.createdTimestamp);
    return message.channel.send(result);

}

function code(message, args) {

    // Format the code
    console.log("\x1b[35m", `[${message.author.id}] [code]:`, "\x1b[0m", `${message.content}`);

    message.delete();

    var header = '```';
    header += `Formatted code from ${message.author.username}`;
    header += '```';
    message.channel.send(header);

    const syntax = args[0];
    args.shift();
    var content = '```';
    content += `${syntax}\n`;
    for (var i = 0; i < args.length; i++) {
        content += args[i];
        content += ' ';
    }
    content += '```';
    return message.channel.send(content);

}

function embed(message, args) { // FRANKY

    console.log("\x1b[35m", `[${message.author.id}] [embed]:`, "\x1b[0m", `${message.content}`);

    var title = args[0];
    args.shift();
    let content = args;

    const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setAuthor(message.author.username)
        .setColor(0x1EFCEE)
        .setDescription(content)

    return message.channel.send(embed);

}

function spam(message, args) {

    console.log("\x1b[35m", `[${message.author.id}] [spam]:`, "\x1b[0m", `${message.content}`);

    if (!args)
        return embed("Please enter number and text after !spam");
    if (isNaN(args))
        return embed("Please enter REAL number!");
    if (!args.shift()) // **************** ลองดูให้หน่อยว่าบรรทัดนี้ได้ไหม 
        return embed("Please enter your word want to spaming")

    var number_of_time = content[1];
    if (number_of_time > 20) {
        return message.channel.send("That's too much. Please less than 20");
    }
    args.shift()
    var content_for_spam = '';
    for (var i = 0; i < args.length; i++)
        content_for_spam += args[i] + ' ';
    for (var i = 0; i < time; i++)
        message.channel.send(text);
    return;

}

function signup(message, args) {

    // Return sign up status , true of false.
    return notAvaialable();
}
function account(message, args) {

    // Return user's account details. (Embed message)
    return notAvaialable();
}

function api(message, args) {
    console.log("\x1b[35m", `[${message.author.id}] [api]:`, "\x1b[0m", `${message.content}`);

    function sendMessage(status, error, password) {
        if (status === 30) {
            var text = '';
            text += 'Your account has been created with\n'
            text += '```'
            text += `email: ${args[1]}\npassword: ${password}\n`;
            text += '```';
            message.channel.send(text);
            message.channel.send('Thank you for creating an account with Lemoncat\nVisit https://lemoncat.nutchanon.co')
        }
        else if (status === 40) {
            var text = '';
            text += 'An error occur while creating your account.'
            text += '```';
            text += `${error.code}\n${error.message}`;
            text += '```';
            message.channel.send(text);
            message.channel.send("Please try again or contact `edu.nutchanon@gmail.com`");
        }
        else if (status === 50) {
            var text = '';
        }
        else {
            message.channel.send("```Something went wrong at LemoncatAPI (https://api.nutchanon.co)\nServer may takes too much requests or closed for maintainance.```")
        }
    }

    if (args[0] === 'lemoncat-signup') {
        const password = makeid(6);
        message.channel.send('```Create a connection to API: api-lemoncat-signup ...```')
        fetch("https://api-lemoncat.herokuapp.com/signupWithBot", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: args[1],
                password: password,
                token: token.lemoncatapi,
            })
        })
            .then(res => res.json())
            .then(res => {
                sendMessage(res.status, res.error, password);
            });
    }

}

function covid(message) {
    return message.channel.send("Checkout our new COVID-19 stats, lets go!\nhttps://auancovid.web.app")
}

function btc(message) {
    fetch("https://api.bitkub.com/api/market/ticker?sym=THB_BTC")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.error) {
                return message.channel.send("Some error occurs.")
            }
            else return message.channel.send("```BTC is now at " + res.THB_BTC.last + ` THB [${res.THB_BTC.percentChange}] ..market:( @Bitkub )` + "```")
        })
}



async function LINEMSG(message, args) {
    const senderid = message.author.id;
    const sender = message.author.username;
    var content = "";
    console.log(args);
    const a = await store.collection("LINEMSG").doc(senderid).get()
        .then(doc => doc.exists)
    if (!a) {
        return message.reply(`Looks like your account aren't connected to LINE account. Connect now https://api-auan.herokuapp.com/cpm/add/line/${senderid}`, { files: ["https://qr-official.line.me/sid/L/033aegtr.png"] })
    }
    var reciever = "";
    if (args[0] && args[1]) {
        // console.log(args[0][2])
        if (args[0][2] == '!') {
            reciever = args[0].slice(3, args[0].length - 1);
        }
        else {
            reciever = args[0].slice(2, args[0].length - 1);
        }
        for (var i=1 ; i<args.length ; i++) {
            content += args[i] + " ";
        }
    }
    else {
        return message.reply('Some parameters in missing.')
    }
    const g = await fetch("https://api-auan.herokuapp.com/cpm/line/push", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sender: sender,
            content: content,
            uid: reciever
        })
    })
        .then(res => res.json())
    if (!g.status) {
        message.channel.send(`Error: ${g.msg}`)
    }
    else {
        message.reply('Message sent. 😃')
    }
}

function website(message) {
    return message.channel.send("https://auan.nutchanon.co")
}


function view(message , args) {
    console.log(args);
    fetch(`https://api.github.com/repos/nutpedteam/katrade/contents/${args[0] ? args[0] : ""}`)
        .then(res => res.json())
        .then(res => {
            if (!res.content) {
                return message.channel.send("Invalid response: This will be caused when\n>> Your file doesn't have any contents inside\n>> Your input path is a directory(folder)\n>> Invalid parameters\n");
            }
            var aa = res.content.replace("\n" , "");
            var splited = res.name.split(".");
            const decoded = base64.decode(aa);
            const completed_message = "```"+`${splited[splited.length-1]}\n` + decoded + "```";
            // message.channel.send(`view code on github.com at ${res.html_url}`);
            message.channel.send(completed_message);
        })   
}
function ls(message , args) {
    console.log(args);
    fetch(`https://api.github.com/repos/nutpedteam/katrade/contents/${args[0] ? args[0] : ""}`)
        .then(res => res.json())
        .then(res => {
            if (!res.length) {
                return message.reply("Can't show files in this directory.");
            }
            var t = "```Lists at "+"/"+`${args[0] ? args[0] : ""}`+"\n";
            for (var i=0 ; i<res.length ; i++) {
                if (res[i].type === 'file') {
                    t += `- 📄 ${res[i].name}\n`;
                }
                else if (res[i].type === 'dir') {
                    t += `- 📂 ${res[i].name}\n`;
                }
            }
            t += "```";
            return message.channel.send(t)
        })
}

function project_github(message) {
    return message.channel.send("Github => https://github.com/NUTPEDTeam/katrade");
}
function project_miro(message) {
    return message.channel.send("Miro => https://miro.com/welcomeonboard/RzRzbUQ1ZnBzODZmRFBza0pDaFozTVlLR3VoTWlZWEs3VTBnZ3FhVlJTbmVPZ3l0d1d6OGFPNGUxQWJhREpEanwzMDc0NDU3MzYwNzA2ODkyNjEz");
}
function project_figma(message) {
    return message.channel.send("Figma => https://www.figma.com/team_invite/redeem/afahuKqq4aEivIGZfmWcJZ");
}






//  not available

function notAvaialable(message) {
    return message.send("This command will be available soon.");
}







module.exports = {
    ping,
    code,
    embed,
    signup,
    spam,
    account,
    api,
    covid,
    btc,
    LINEMSG,
    website,
    view,
    project_github,
    project_miro,
    ls,
    project_figma,
}


