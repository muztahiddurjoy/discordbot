const { default: axios } = require('axios');
const { Client, Intents, MessageAttachment } = require('discord.js');
const client = new Client({intents: 4609});
const fetch = require('node-fetch')
require('dotenv').config()

//main gali array
let galis = []
//refresh function
const reloadgali = async () =>{
  await axios.get(`${process.env.FIREBASE_LINK}.json`).then((res)=>{
    galis = Object.values(res.data)
  }).catch((e)=>{
    console.log(e)
  })
}
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  reloadgali()
});

client.on('messageCreate', async message => {
    const t = message.content;

    //gali command
  if(t.includes('%gali')){
    let target = t.substr(5,t.length)
    if(target.toLowerCase().includes("durjoy") || target.toLowerCase().includes("botjoy") || target.toLowerCase().includes('<@!917045708203380766>') || target.toLowerCase().includes('<@!544406696563572739>')){
        message.reply(`Hopp beda\n<@!${message.author.id}> ${galis[Math.floor(Math.random() * (galis.length - 0))].gali}`) 
    }
    else{
        message.reply(`${target} ${galis[Math.floor(Math.random() * (galis.length - 0))].gali}`)
    }
  }


  //welcome command
  else if(t.includes('%welcome')){
    message.reply(`গালির রাজ্যে আপনাকে স্বাগতম${t.substr(8,t.length)}`)
  }


  //tornado command
  else if(t.includes('%tornado')){
    if(message.author.id == '544406696563572739'){
      galis.map((v,i)=>{
        message.reply(`${t.substr(8,t.length)} ${v.gali}`)
      })
    }
    else if(message.author.discriminator = '5291'){
      galis.map((v,i)=>{
        message.reply(`${t.substr(8,t.length)} ${v.gali}`)
      })
    }
    else{
      message.reply('shob command shobar jonno na baba')
    }
  }

  //addgali command
  else if(t.includes('%addgali')){ 
    await axios.put(`${process.env.FIREBASE_LINK}/${new Date().getTime()}.json`,{gali:t.substr(8,t.length),author: message.author.username}).then(()=>{
      reloadgali().then(()=>{
        message.reply(`The gali ${t.substr(8,t.length)} has been added to the dictionary`)
      }).catch((e)=>{
        console.log(e)
      })
    }).catch((e)=>{
      message.reply(e)
    })
  }
  //meme send command
  // else if(t.includes('%meme')){
  // axios.get('https://meme-api.herokuapp.com/gimme').then(res =>{
  //   const attach = new MessageAttachment(res.data.url);
  //   message.reply('hi',{files : ['https://i.redd.it/x313u10ie4581.gif']})
  //  }).catch(e =>{
  //     console.log(e)
  //  })
  // }

  
  //gaali amount command
  else if(t.includes('%amount')){
    message.reply(`total: ${galis.length} gali(s)`)
  } 
});

client.login(process.env.BOT_TOKEN);
