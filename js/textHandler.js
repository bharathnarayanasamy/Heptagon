var request = require('request');
var Owlbot = require('owlbot-js')
var client = Owlbot('d9b62a7f46b06cc87de1c46c3b3b2cc67cd9473a') 
const Markup=require('telegraf/markup')
const Extra=require('telegraf/extra')
const rp = require('request-promise');
module.exports.textHandler=(bot)=>{
    bot.on('text',ctx=>{
        ctx.session.input=ctx.message.text
        var m=[]
        m[0]="Oops!😶 You need to say that again buddy as i couldn't understand waht you meant /help"
        m[1]="Umm...Please say that again..I didn't quite get that☹️ /help"
        if(ctx.session.flag1==true)
        {
                ctx.session.flag1=false
                for(i=0;i<ctx.session.input.length;i++)
                {
                    if(ctx.session.input.charAt(i)==' ')
                    ctx.session.chl+="%20"
                    else
                    ctx.session.chl+=ctx.session.input.charAt(i)
                }
                ctx.reply('Please,Select the size of QR-Code',Markup.keyboard(
                    ['Small.','Medium.','Large.']).resize().extra())
        }
        else if(ctx.session.flag2==true){
            var data=request({url: `https://api.postalpincode.in/pincode/${ctx.session.input}`, json: true}, function(err, res, json) {
            if (err) {
              throw err;
            }
            var status=json[0].Status
            if(status=='Success'){
                var Data=json[0].PostOffice
                for(i=0;i<Data.length;i++){
                    var PRINT=""
                    PRINT+='Name 📮 : '+`<code>${Data[i].Name}</code>`+'\n\n'
                    PRINT+='Branch-Type 🚩: '+`<code>${Data[i].BranchType}</code>`+'\n\n'
                    PRINT+='Delivery-Status 📬 : '+`<code>${Data[i].DeliveryStatus}</code>`+'\n\n'
                    PRINT+='Division 👀: '+`<code>${Data[i].Division}</code>`+'\n\n'
                    PRINT+='District 📍: '+`<code>${Data[i].District}</code>`+'\n\n'
                    PRINT+='State 📌: '+`<code>${Data[i].State}</code>`+'\n\n'
                    ctx.reply(`${PRINT}`,Extra.HTML())
                }
                ctx.session.flag2=false
                ctx.reply('👇🏻',Markup.keyboard([['PostOffice📪','Exit']]).resize().extra())
            }
            else
            ctx.reply('Please!!,Enter the valid pincode 😮')
        })
        }
        else if(ctx.session.flag3==true){
            try{
                var abcf=""
                client.define(`${ctx.session.input}`).then(function(result){
                    abcf+='<b><u>Word</u></b> 👀 : '+`<code>${result.word}</code>`+'\n'
                    abcf+='<b><u>Pronunciation</u></b> 🗣️ : '+`<code>${result.pronunciation}</code>`+'\n\n'
                    const length1=result.definitions.length
                    for(i=0;i<length1;i++){
                        abcf+='<b><u>Type</u></b> 👁️‍🗨️ : '+`<code>${result.definitions[i].type}</code>`+'\n\n'
                        abcf+='<b><u>Definition</u></b> ⚖️ : '+`<code>${result.definitions[i].definition}</code>`+'\n\n'
                        if(`${result.definitions[i].example}`!='null')
                        abcf+='<b><u>Example</u></b> 📖 : '+`<code>${result.definitions[i].example}</code>`+'\n\n'
                        if(`${result.definitions[i].image_url}`!='null')
                        abcf+='<b><u>Image-url</u></b> 🔗 : '+result.definitions[i].image_url+'\n\n'
                        if(`${result.definitions[i].emoji}`!='null')
                        abcf+='<b><u>Emoji</u></b> ⚜️ : '+result.definitions[i].emoji+'\n\n'
                        abcf+='\n\n\n'
                    }
                console.log(result)
                ctx.session.flag3=false
                ctx.reply(`${abcf}`,Extra.HTML().webPreview(false))
                ctx.reply('👇🏻',Markup.keyboard(
                    [
                        ['Dictionary📖','Exit']
                    ]).resize().extra())
                }).catch((err) => {
                console.log('API call error:', err.message);
                ctx.reply("The entered word is mistake (or) the word is not found in our dictionary..Sorry for the inconvinience");
                })
            }
            catch(e)
            {
            console.log("Hello");
            }
        }
        else if(ctx.session.flag4==true){
            ctx.session.temp=""
            for(i=0;i<ctx.session.input;i++){
                if(ctx.session.input.charAt(i)!=" ")
                ctx.session.temp+=ctx.session.input.charAt(i)
            }
            var data=request({url: `http://numbersapi.com/${ctx.session.temp}`, json: false}, function(err, res, json) {
            if (err) {
              throw err;
            }
            console.log(json)
            if(json.includes("<!DOCTYPE html>")==true)
            ctx.reply(`Entered input is not a number...🙄\nPlease check the input once's again`)
            else{
            ctx.reply(json)
            ctx.session.flag4=false
            ctx.reply('👇🏻',Markup.keyboard(
                [
                    ['NumberFacts🔢','Exit']
                ]).resize().extra())
            }
            })
        }  
        else{
            var index=Math.floor(Math.random()*2)
            ctx.reply(`${m[index]}`,Extra.HTML())
        }
    })

}