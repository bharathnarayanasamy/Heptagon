const Telegraf=require('telegraf')
const bot=new Telegraf('')
var Owlbot = require('owlbot-js')
var client = Owlbot('') 
const fetch = require('node-fetch');
const {quiz}=require("./js/quiz.js")
const {CquizP}=require("./js/CquizP.js")
const {CquizMacro}=require("./js/CquizMacro.js")
const {Collectionquiz}=require("./js/Collectionquiz.js")
const session=require("telegraf/session");
const {data}=require('./js/getData.js')
const {textHandler}=require("./js/textHandler.js")
const {actionHandler}=require("./js/actionHandler.js")
const rp = require('request-promise');
const request = require('request');
const Markup=require('telegraf/markup')
const Extra=require('telegraf/extra');
const { oneTime } = require('telegraf/markup');
bot.use(session());
var chld="L"
var chof=".png"
var chs="150x150"
var cht="qr"
var icqrb="ffffff00"
var icqrf="000000"
var today=new Date()
//start
bot.start(ctx =>{
    ctx.reply(`Hello ${ctx.from.first_name} 👋\n\n<b>Want to know more about me 👉 Refer</b> /help`,Extra.HTML())
    ctx.reply(`Please!!!, Choose the task 👁️‍🗨️ that I want to do for You`,Markup.keyboard(
        [
            ['API➿','QrCode🔍'],
            ['PostOffice📪','CovidTracker😷'],
            ['Dictionary📖','NumberFacts🔢'],
            ['Quiz👀']
        ]
    ).resize().extra())
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
    ctx.session.chl=""
})

//help
bot.help(ctx=>ctx.reply(`Here is the complete <b>walk-through</b> about Me 😇\
<b><u>\n\n<b>Commands 👀:</b></u></b>\n\n\
/start\n  Welcome to hepta!!!\n\n\
/help\n  Discover how to use hepta\n\n\
/apicategories\n  List of free API Categories\n\n\
/api\n  List of free API for particular Category\n\n\
/qrcode\n  Create Customized QrCode\n\n\
/postoffice\n  PostOffice detail for given PinCode\n\n\
/dictionary\n  Type,Description,Example for a Word\n\n\
/total\n  Display live count of COVID19\n\n\
/statewise\n  Statewise COVID19 report\n\n\
/numberfacts\n  Interesting fact for a number\n\n\
/todaysfact\n  Fact for Today's Date\n\n\
/randommathfact\n  Random mathematical Fact\n\n\
/quiz\n  Technical Quiz\n\n\
/about\n  About heptaBot\n\n\
/exit\n  Exit from bot operation\n\n\
/developer\n  Developer information\n\n\
/update\n  Future update's\n\n\
/feedback\n  Feedback about  hepta`,Extra.HTML()))

bot.command('about',ctx=>{
    var p=`Hi ,I am heptagon🤖 my boss call me as <b>hepta</b> , I don't know 🤔 why he named me as <b>heptagon</b>\n\nI think, I can do 7 tasks,\n
   <b> . Offering free api's
    . COVID19 tracking
    . Qrcode Generation
    . PostOffice details
    . Giving details for a word(Dictionary)
    . Interesting fact's on number's
    . Conduting Quiz</b>\n\n
    So that he named me as <b>heptagon 😁 (shape which has 7 side's)</b>\n\n<u>Version</u>: v1.0`
    ctx.reply(`${p}`,Extra.HTML())
})

bot.command('developer',ctx=>{
    var p=`Created by 😎 <a href="https://t.me/Bharath27071999">Bharath N</a>\nStudent at <a href="www.sece.sc.in">Sri Eshwar College Of Engineering.</a>`
    ctx.reply(`${p}`,Extra.HTML())
})

bot.command('update',ctx=>{
    var p=`In upcoimg bot update feature's like

	<b>.Plagarism checker
	.PNR status identifier
	.More topic's on Technical quiz</b>

     Are going to be add 🙃!!!`
     ctx.reply(`${p}`,Extra.HTML())
})

bot.command('feedback',ctx=>{
    var p=`“Feedback is the breakfast of champions.”\n\nPlease!!! give us a <a href="https://forms.gle/Z7SWpcNexsZ9Rcyd9">feedback</a>`
    ctx.reply(`${p}`,Extra.HTML())
})
//quiz
bot.command('quiz',ctx=>{
    ctx.reply(`Choose any one of the language`,Extra.HTML().markup(m=>inline1(m)))
})
bot.hears('Quiz👀',ctx=>{
    ctx.reply(`Choose any one of the language`,Extra.HTML().markup(m=>inline1(m)))
})
const inline1= (m)=>m.inlineKeyboard(
    [
        [m.callbackButton('Java','Java')],
        [m.callbackButton('C','C')]
    ]
)
//java quiz
bot.action('Java',async ctx=>
            {
  ctx.editMessageText(
     `Choose any one of the topic for test!`,Extra.HTML().markup(m=>inline2(m)));
})

//c quiz
bot.action('C',async ctx=>
            {
  ctx.editMessageText(
     `Choose any one of the topic for test!`,Extra.HTML().markup(m=>inline3(m)));
})
const inline2= (m)=>m.inlineKeyboard(
    [
    [m.callbackButton('String','String'),m.callbackButton('Collections','Collections')]
    ]) 

const inline3= (m)=>m.inlineKeyboard(
    [
    [m.callbackButton('Pointer','Pointer'),m.callbackButton('Macro&Preprocessor ','Macro')]
    ]) 

    //java
bot.action('String',async ctx=>{
    await quiz(ctx);
})

bot.action('Collections',async ctx=>{
    await Collectionquiz(ctx);
})


//c
bot.action('Pointer',async ctx=>{
    await CquizP(ctx);
})

bot.action('Macro',async ctx=>{
    await CquizMacro(ctx);
})

//owl
bot.hears(['Dictionary📖','/dictionary'],ctx=>{
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=true
    ctx.session.flag4=false
    ctx.session.chl=""
    ctx.reply('Enter the word ☺️')
   
})
//number fact
bot.hears(['NumberFacts🔢','/numberfacts'],ctx=>{
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=true
    ctx.session.chl=""
    ctx.reply("Please!! Enter the input as number only...\n(Eg: 27)")
})
bot.hears(["Today's-Fact","/todaysfact"],ctx=>{
    var data=request({url: `http://numbersapi.com/${today.getMonth()}/${today.getDate()}/date`, json: false}, function(err, res, json) {
            if (err) {
              throw err;
            }
            ctx.reply(`<u>The fact for Today's date:</u>\n\n${json}`,Extra.HTML())
            })
})
bot.hears(["RandomMathFact","/randommathfact"],ctx=>{
    var data=request({url: `http://numbersapi.com/random/math`, json: false}, function(err, res, json) {
            if (err) {
              throw err;
            }
            ctx.reply(`<u>Random Math Fact:</u>\n\n${json}`,Extra.HTML())
            })
})
//Qrcode command
bot.command('qrcode',ctx=>{
    ctx.session.flag1=true
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
    ctx.session.chl=""
    // ctx.reply(`Enter the data (or) URL that  you want to make as <b>QR-Code</b>`,Extra.HTML())
    // var input=ctx.message.text
    // for(i=0;i<input.length;i++){
    //     if(input.charAt(i)==' ')
    //     chl+="%20"
    //     else
    //     chl+=input.charAt(i)
    // }
    // ctx.reply('!Please,Select the size of QR-Code',Markup.keyboard(
    //     ['Small.','Medium.','Large.']
    // ).resize().extra())


})

//post office command
bot.command('postoffice',ctx=>{
    ctx.reply(`Enter the valid ☺️ Pincode that you need to know!\n(<b>Note</b>: You can enter any valid pincode available in India)`,Extra.HTML())
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=true
    ctx.session.chl=""
})

//QrCode
bot.hears('QrCode🔍',ctx=>{
    ctx.session.flag1=true
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
    ctx.session.chl=""
    ctx.reply(`Enter the data (or) URL that  you want to make as <b>QR-Code</b>`,Extra.HTML())
    // bot.on('text',ctx=>{
    //     var input=ctx.message.text
    // for(i=0;i<input.length;i++){
    //     if(input.charAt(i)==' ')
    //     chl+="%20"
    //     else
    //     chl+=input.charAt(i)
    // }
    // ctx.reply('Please,Select the size of QR-Code',Markup.keyboard(
    //     ['Small.','Medium.','Large.']
    // ).resize().extra())
    // })

})

//size of QR-Code
bot.hears('Small.',ctx=>{
    chs="100x100"
    ctx.reply('Please,Select the color of the QR-Code?',Markup.keyboard(
        [['Black!','White!!','Orange!!!'],
        ['MediumPurple!'],
        ['Aqua!!','AquaMarine!!!']]
        ).resize().extra())
})

bot.hears('Medium.',ctx=>{
    chs="150x150"
    ctx.reply('Please,Select the color of the QR-Code?',Markup.keyboard(
        [['Black!','White!!','Orange!!!'],
        ['MediumPurple!'],
        ['Aqua!','AquaMarine!!!']]
        ).resize().extra())
})

bot.hears('Large.',ctx=>{
    chs="250x250"
    ctx.reply('Please,Select the color of the QR-Code?',Markup.keyboard(
        [['Black!','White!!','Orange!!!'],
        ['MediumPurple!'],
        ['Aqua!!','AquaMarine!!!']]
        ).resize().extra())
})
//Qrcode Color
bot.hears('Black!',ctx=>{
        icqrf="000000"
        ctx.reply('Do you want transparent Background?',Markup.keyboard(['Yes✅','No❌']).resize().extra())
})
bot.hears('White!!',ctx=>{
    icqrf="ffffff"
    ctx.reply('Do you want transparent Background?',Markup.keyboard(['Yes✅','No❌']).resize().extra())
})
bot.hears('Orange!!!',ctx=>{
    icqrf="ffa500"
    ctx.reply('Do you want transparent Background?',Markup.keyboard(['Yes✅','No❌']).resize().extra())
})
bot.hears('MediumPurple!',ctx=>{
    icqrf="9370d8"
    ctx.reply('Do you want transparent Background?',Markup.keyboard(['Yes✅','No❌']).resize().extra())
})
bot.hears('Aqua!!',ctx=>{
    icqrf="00ffff"
    ctx.reply('Do you want transparent Background?',Markup.keyboard(['Yes✅','No❌']).resize().extra())
})
bot.hears('AquaMarine!!!',ctx=>{
    icqrf="7fffd4"
    ctx.reply('Do you want transparent Background?',Markup.keyboard(['Yes✅','No❌']).resize().extra())
})

//transparent option
bot.hears('Yes✅',ctx=>{
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    //ctx.reply(`${ctx.session.chl}`)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})
bot.hears('No❌',ctx=>{
    ctx.reply('Please,Select the background color of QR-Code',Markup.keyboard(
        [
            ['BLACK.','WHITE..','ORANGE...'],
            ['MEDIUMPURPLE.'],
            ['AQUA..','AQUAMARINE...']
        ]
    ).resize().extra())
})

//Background Color
bot.hears('BLACK.',ctx=>{
    icqrb="000000"
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})
bot.hears('WHITE..',ctx=>{
    icqrb="ffffff"
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})
bot.hears('ORANGE...',ctx=>{
    icqrb="ffa500"
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})

bot.hears('MEDIUMPURPLE.',ctx=>{
    icqrb="9370d8"
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})

bot.hears('AQUA..',ctx=>{
    icqrb="00ffff"
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})

bot.hears('AQUAMARINE...',ctx=>{
    icqrb="7fffd4"
    var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${ctx.session.chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
    ctx.replyWithPhoto(data)
    ctx.session.chl=""
    chs="150x150"
    icqrb="ffffff00"
    icqrf="000000"
    ctx.reply('Want to generate another QrCode (or) Not?',Markup.keyboard(
        ['QrCode🔍','Exit']
    ).resize().extra())
})

//exit condition
bot.hears(['Exit','exit','EXIT','/exit'],ctx=>{
    //ctx.reply(`Thankyou!!! 😇 for your valueable time ⏳`,Extra.HTML())
    ctx.reply(`Please!!!, Choose the task 👁️‍🗨️ that I want to do for You`,Markup.keyboard(
        [
            ['API➿','QrCode🔍'],
            ['PostOffice📪','CovidTracker😷'],
            ['Dictionary📖','NumberFacts🔢'],
            ['Quiz👀']
        ]
    ).resize().extra())
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
    ctx.session.chl=""
})


//Post office
bot.hears('PostOffice📪',ctx=>{
    ctx.reply(`Enter the valid ☺️ Pincode that you want to know more !!\n\n( <b><u>Not</u>e</b>: You can enter any valid pincode available in India )`,Extra.HTML())
    ctx.session.flag1=false
    ctx.session.flag2=true
})
//Public Api
bot.command('apicategories',ctx=>{
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
    const len=data.response.body.length
    var p='Here is the List of Categories of Public Api'+'\n\n'
    for(i=0;i<len;i++){
        p+=(i+1)+'. '
        p+=data.response.body[i]+'\n'
    }
    ctx.reply(`${p}`)
})
//public Api markup list
bot.command('api',ctx=>{
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
        ctx.reply(`Please! choose any one of the Category that you want to know more...`,Markup.keyboard(
            [
                ['Animals🐒','Anime🐲','Anti-Malware☣️'],
                ['Art&Design🎨','Books📖','Business👔'],
                ['Calendar🗓️','Cloud Storage☁️'],
                ['ContinuousIntegration🔄'],
                ['Cryptocurrency💵','Currency Exchange💱'],
                ['Data Validation📡','Development🤝🏻','Dictionaries📚'],
                ['Documents📄','Environment🌲','Events🏁'],
                ['Finance💰','Food🍛','Games🎯'],
                ['Geocoding🛰️','Government🌐','Health👨🏻‍⚕️'],
                ['Jobs👨‍💻','Machine Learning⚙️','Music🎶'],
                ['News📰','Open Data📈','Projects👀'],
                ['Patent👁️','Personality👣','Photography📷'],
                ['Science&Math📐','Security🔐','Shopping🛍️'],
                ['Social🗣️','Sports&Fitness🏆','Test Data🔬'],
                ['Text Analysis📌','Tracking📍','Transportation🚌'],
                ['URL Shortener➰','Vehicle🚗','Video📹'],
                ['Weather🌤️']

            ]
        ).resize().extra())

}
)
bot.hears('API➿',ctx=>{
    ctx.session.flag1=false
    ctx.session.flag2=false
    ctx.session.flag3=false
    ctx.session.flag4=false
    ctx.reply(`Please! choose any one of the Category that you want to know more...`,Markup.keyboard(
        [
            ['Animals🐒','Anime🐲','Anti-Malware☣️'],
            ['Art&Design🎨','Books📖','Business👔'],
            ['Calendar🗓️','Cloud Storage☁️'],
            ['ContinuousIntegration🔄'],
            ['Cryptocurrency💵','Currency Exchange💱'],
            ['Data Validation📡','Development🤝🏻','Dictionaries📚'],
            ['Documents📄','Environment🌲','Events🏁'],
            ['Finance💰','Food🍛','Games🎯'],
            ['Geocoding🛰️','Government🌐','Health👨🏻‍⚕️'],
            ['Jobs👨‍💻','Machine Learning⚙️','Music🎶'],
            ['News📰','Open Data📈','Projects👀'],
            ['Patent👁️','Personality👣','Photography📷'],
            ['Science&Math📐','Security🔐','Shopping🛍️'],
            ['Social🗣️','Sports&Fitness🏆','Test Data🔬'],
            ['Text Analysis📌','Tracking📍','Transportation🚌'],
            ['URL Shortener➰','Vehicle🚗','Video📹'],
            ['Weather🌤️']

        ]
    ).resize().extra())

}
)

bot.hears('Animals🐒',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Animals', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
       var c=json.count
       ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Anime🐲',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Anime', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Anti-Malware☣️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Anti-Malware', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Art&Design🎨',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Art', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Books📖',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Books', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Business👔',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Business', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Calendar🗓️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Calendar', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Cloud Storage☁️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Cloud', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('ContinuousIntegration🔄',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=ContinuousIntegration', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Cryptocurrency💵',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Cryptocurrency', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Currency Exchange💱',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Currency Exchange', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Data Validation📡',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Data Validation', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Development🤝🏻',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Development', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Dictionaries📚',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Dictionaries', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Documents📄',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Documents', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Environment🌲',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Environment', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Events🏁',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Events', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Finance💰',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Finance', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
   // ctx.reply(`${r}`,Extra.HTML())
}
)
})
bot.hears('Food🍛',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Food', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Games🎯',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Games', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Geocoding🛰️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Geocoding', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Government🌐',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Government', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Health👨🏻‍⚕️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Health', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Jobs👨‍💻',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Jobs', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Machine Learning⚙️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Machine Learning', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Music🎶',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Music', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('News📰',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=News', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Open Data📈',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Open Data', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Projects👀',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Source', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Patent👁️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Patent', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Personality👣',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Personality', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Photography📷',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Photography', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Science&Math📐',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Science', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Security🔐',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Security', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Shopping🛍️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Shopping', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Social🗣️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Social', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Sports&Fitness🏆',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Sports', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Test Data🔬',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Test', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Text Analysis📌',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Text', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Tracking📍',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Tracking', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Transportation🚌',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Transportation', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('URL Shortener➰',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=URL', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Vehicle🚗',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Vehicle', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Video📹',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Video', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('Weather🌤️',ctx=>{
    var dat=request({url: 'https://api.publicapis.org/entries?category=Weather', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
    //    var c=json.count
    //    ctx.reply(`${c}`)
       for(i=0;i<json.count;i++){
        var r=""
           r+='<b>API Provider➿</b> : '+json.entries[i].API
           r+='\n\n'
           r+='<b>Description 📖</b> : '+json.entries[i].Description
           r+='\n\n'
           if(json.entries[i].Auth=="")
           r+='<b>Authentication 🔑</b>'+' : '+'NO'+'\n\n'
           else
           r+='<b>Authentication 🔑</b>'+' : '+json.entries[i].Auth+'\n\n'
           r+='<b>Link 🔗: </b>'+json.entries[i].Link
           r+='\n\n'
           
           ctx.reply(`${r}\n`,Extra.HTML().webPreview(false))
       }
}
)
})
bot.hears('CovidTracker😷',ctx=>ctx.reply('Please choose the option to track📌',Markup.keyboard(
    [['Total','Statewise']]
).resize().extra()))
//covid
bot.hears(['Total','/total'],ctx=>{
  
    var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
       var tc=json.cases_time_series[json.cases_time_series.length-1].totalconfirmed;
       var tr=json.cases_time_series[json.cases_time_series.length-1].totalrecovered;
       var dc=json.cases_time_series[json.cases_time_series.length-1].dailyconfirmed;
       var dr=json.cases_time_series[json.cases_time_series.length-1].dailyrecovered;
       var dt=json.cases_time_series[json.cases_time_series.length-1].dailydeceased;
       var td=json.cases_time_series[json.cases_time_series.length-1].totaldeceased;
       ctx.session.date=json.cases_time_series[json.cases_time_series.length-1].date;
       ctx.reply(
        `COVID-19 INDIA updates as on <b>${ctx.session.date}</b>\n<code>Total Cases : <b>${tc}</b> ↗️\nTotal Recovered : <b>${tr}</b> ↗️\nToday Confirmed : <b>${dc}</b> ↗️\nToday Recovered : <b>${dr}</b> ↙️\nToday's Death : <b>${dt}</b> ⏺\nTotal Death : <b>${td}</b> 🔴</code>\n`,Extra.HTML()
      )

}
)
})

bot.hears(['Statewise','/statewise'],ctx=>ctx.reply('Customized Selection',Markup.keyboard([['All States','North Region','South Region'],['East Region','West Region']]).resize().extra()))



bot.hears('All States',ctx=>{

  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      for (i = 1; i <json.statewise.length; i++) {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+') 🆕'
        r+='\n';
      }
     ctx.reply(
     `States Wise Count of Total Confirmed Case's as on ${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}:\n\n<code>${r}</code>`,Extra.HTML()
    )

    })
})






bot.hears('North Region',ctx=>{
  
  
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
    
      var q=""
      var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(north.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+') 🆕'
        r+='\n';
        }
      }
     ctx.reply(
     `North Region Count of Total Confirmed Case's as on ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}:\n\n<code>${r}</code>`,Extra.HTML())

    })
})


bot.hears('South Region',ctx=>{

  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(south.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+') 🆕'
        r+='\n';
        }
      }
     ctx.reply(
     `South Region Count of Total Confirmed Case's as on ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}:\n\n<code>${r}</code>`,Extra.HTML())
    })
})

bot.hears('East Region',ctx=>{
  
 
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(east.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+') 🆕'
        r+='\n';
        }
      }
     ctx.reply(
     `East Region Count of Total Confirmed Case's as on ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}:\n\n<code>${r}</code>`,Extra.HTML()
    )

    }
    )
})

bot.hears('West Region',ctx=>{
  
 
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(west.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+') 🆕'
        r+='\n';
        }
      }
     ctx.reply(
     `West Region Count of Total Confirmed Case's as on ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}:\n\n<code>${r}</code>`,Extra.HTML()
    )

}
)
})
actionHandler(bot)
textHandler(bot)
// bot.on('text',ctx=>{
//     var input=ctx.message.text
//     var m=[]
//     m[0]="Oops! You need to say that again buddy as i couldn't understand waht you meant"
//     m[1]="Umm...Please say that again..I didn't quite get that"
//     if(ctx.session.flag1==true)
//     {
//         ctx.session.flag1=false
//     for(i=0;i<input.length;i++)
//     {
//     if(input.charAt(i)==' ')
//     chl+="%20"
//     else
//     chl+=input.charAt(i)
//     }
//     ctx.reply('Please,Select the size of QR-Code',Markup.keyboard(
//         ['Small.','Medium.','Large.']
//     ).resize().extra())
//     }
//     else if(ctx.session.flag2==true){
//         ctx.session.flag2=false
//         var data=request({url: `https://api.postalpincode.in/pincode/${input}`, json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//         var status=json[0].Status
//         if(status='Success'){
//             ctx.reply('correct')
//         }
//         else
//         ctx.reply('Please,Enter the valid pincode')
//     })
//     }
//     else{
//         var index=Math.floor(Math.random()*2)
//         ctx.reply(`${m[index]}`,Extra.HTML())
//     }
// })



// bot.command('html',ctx=>ctx.reply(
//     `<b>bold</b>
//     <i>italic</i>
//     <code>#include</code>`,Extra.HTML()
// ))
// bot.command('markdown',ctx=>ctx.reply(
//     `*bold*
//     _italic_
//     \`\`\`#include<stdio.h>{}\`\`\``,Extra.markdown()
// ))
// bot.command('QRCode',ctx=>{
//     ctx.reply("Enter the input to Code")
//     bot.on('text',ctx=>{
//         var input=ctx.message.text
//     var i
//     for(i=0;i<input.length;i++){
//         if(input.charAt(i)==' ')
//         chl+="%20"
//         else
//         chl+=input.charAt(i)
//     }
//     var data=`https://image-charts.com/chart?chs=${chs}&cht=${cht}&chl=${chl}&choe=UTF-8&chof=${chof}&icqrb=${icqrb}&icqrf=${icqrf}`
//     ctx.reply(data)
//     ctx.reply(input)
//     ctx.replyWithPhoto(data)
//     })
   
// })
// bot.command('RandomImages',ctx=>{
//     ctx.reply(`Generate HIGH RESOLUTION Random Images☣️\nClick the button to Generate`,Markup.keyboard(
//         ['Generator♾️']
//     ).resize().extra())
// })
// bot.hears('Generator♾️',ctx=>ctx.reply(`<a href="https://source.unsplash.com/user/erondu/420x360">Images</a>`,Extra.HTML()))
// bot.hears('Dog',ctx=>{
//     ctx.reply(`<a href="${random('dog')}">Dog</a>`,Extra.HTML())
// })

// bot.hears('Cat',ctx=>{
//     ctx.reply(`<a href="${random('cat')}">Cat</a>`,Extra.HTML())
// })

// bot.hears('Lion',ctx=>{
//     ctx.reply(`<a href="${random('lion')}">Lion</a>`,Extra.HTML())
// })

// bot.hears('Parrot',ctx=>{
//     ctx.reply(`<a href="${random('parrot')}">Parrot</a>`,Extra.HTML())
// })

// bot.hears('Nature',ctx=>{
//     ctx.reply(`<a href="${random('nature')}">Nature</a>`,Extra.HTML())
// })

// bot.hears('Cartoon',ctx=>{
//     ctx.reply(`<a href="${random('cartoon')}">Cartoon</a>`,Extra.HTML())
// })
// const random=tag=>{
//     let url=`https://loremflickr.com/320/240/${tag}`
//     return url
// }
// bot.hears('small',ctx=>{
//     chs="50x50"
//     ctx.reply(`${print(`${chs}`)}`)
// })
// bot.hears('medium',ctx=>{
//     chs="150x150"
//     ctx.reply(`${print("150x150")}`)
// })
// bot.hears('large',ctx=>{
//     chs="300x300"
//     ctx.reply(`${print("300x300")}`)
// })
// function print(ch){
//     var dat=request({url: `https://api.publicapis.org/entries?category=${ch}`, json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//         var tc=json.count
//     console.log(tc)
// }
// var print=tag=>{
//     var dat=request({url: `https://api.publicapis.org/entries?category=${tag}`, json: true}, function(err, res, json) {
//         if (err) {
//           throw err;
//         }
//     let r=`${json.count}
//     console.log(r)
       
// })
bot.launch()
