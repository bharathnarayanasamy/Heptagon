const Extra=require('telegraf/extra');
const fs=require("fs");
const rp = require('request-promise');

module.exports.CquizP =async ctx =>{
        ctx.session.count=0;
        ctx.session.score=0;
        ctx.session.questions=await newQuestion(ctx)
        let msg=ctx.session.questions.answers[ctx.session.count].ques
        return ctx.replyWithHTML(msg,
            Extra.markup(m =>m.inlineKeyboard(keyboard(m,1,ctx.session.questions.answers[ctx.session.count].options))))
}

module.exports.actions1 =async(ctx,actionName) =>
{
    let res;
    const re=/answercp[0-3]/g;
    if(actionName.match(re)) {
       var answerNum=actionName[actionName.length-1];
        var t=ctx.session.questions.answers[ctx.session.count].ans
        if( t== answerNum)
        {
            ctx.session.score++;
            res=`Yah 🎉🎉!!! that's Correct Answer..\n\nAnswer is : ${ctx.session.questions.answers[ctx.session.count].options[t]}\n\nYour score 🗒️ is ${ctx.session.score}/${ctx.session.count+1}`;
            
        }
        else{
            res=`No 😩...It's Wrong!\n\nCorrect Answer is : ${ctx.session.questions.answers[ctx.session.count].options[t]}\n\nYour score 🗒️ is ${ctx.session.score}/${ctx.session.count+1}`;
        }
        ctx.editMessageText(res,Extra.markup( m=>m.inlineKeyboard(keyboard(m,2))))
    }
    else if(actionName=='next.'&&ctx.session.count<9)
    {      ctx.session.count+=1
        let msg=ctx.session.questions.answers[ctx.session.count].ques
        ctx.editMessageText(msg,
            Extra.HTML().markup(m =>m.inlineKeyboard(keyboard(m,1,ctx.session.questions.answers[ctx.session.count].options))))
    }
    else if(actionName=='quit.'||ctx.session.count>=9)
    {   console.log(ctx.session.count)
        let msg=`<b>Final ScoreCard 🗒️ : ${ctx.session.score}/10.</b>`;
        console.log(ctx.from.first_name+ctx.session.score);
        ctx.editMessageText(msg,Extra.HTML())
        if(ctx.session.score==10)
        ctx.reply(`${ctx.from.first_name}, you done a great job 👏🏻\n🎉🎉🎉🎉🎉`)
        else if(ctx.session.score==9)
        ctx.reply(`Just miss 😱 ${ctx.from.first_name}, but nice try🤗👏🏻`)
        else
        ctx.reply(`${ctx.from.first_name}, you need to work more... to achieve 😇`)

        ctx.session=null;
    }
}




const keyboard=(m,step,answers)=>{
       if(step===1)
       {
       return [
           [m.callbackButton(answers[0],'answercp0'),m.callbackButton(answers[1],'answercp1')],
           [m.callbackButton(answers[2],'answercp2'),m.callbackButton(answers[3],'answercp3')]
       ]
    }else if(step===2)
    {
    return [
        [m.callbackButton('NEXT ➡️','next.')],
        [m.callbackButton('QUIT ❌','quit.')]
    ]
 }
}

const newQuestion=async ctx => {
    const filepath='./CPointer.json';
    const coins=await readFile(filepath)
    const question={
        answers:[]//array of choice
    }

    question.answers=randomAnswers(coins,10)

    console.log(question)
    //console.log(question.answers[0].ques)
    return question
}

const randomAnswers= (coins,answersQuantity)=>{
    const answer=[];
    const tmpArr=[];

    while(tmpArr.length<answersQuantity){
        let n =Math.floor(Math.random()*coins.length);
        if(tmpArr.indexOf(n)===-1){
            tmpArr.push(n);
            answer.push(coins[n]);
        }
    }
    console.log(tmpArr)
    //console.log(answer)
    return answer;

}
const readFile= filepath =>{
    try{
        let rawData=fs.readFileSync(filepath);
        return JSON.parse(rawData);
    }catch(err){
        console.log(err)
    }
}

 //newQuestion();