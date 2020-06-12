const {actions}=require("./quiz.js");
const {actions1}=require("./CquizP.js");
const {actions2}=require("./CquizMacro.js");
const {actions3}=require("./Collectionquiz.js");
module.exports.actionHandler =bot => {
    bot.action([/answer[0-3]/,/next/,/quit/,/SOLUTION/],ctx =>{
         actions(ctx,ctx.match[0]);
    })
    bot.action([/answercp[0-3]/,/next./,/quit./,/SOLUTION/],ctx =>{
        actions1(ctx,ctx.match[0]);
     })
     bot.action([/answercm[0-3]/,/next../,/quit../,/SOLUTION/],ctx =>{
     actions2(ctx,ctx.match[0]);
     })
     bot.action([/answerjc[0-3]/,/next.../,/quit.../,/SOLUTION/],ctx =>{
          actions3(ctx,ctx.match[0]);
       })
}
