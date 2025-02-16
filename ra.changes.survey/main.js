const app = new App()
// max 36, min 0
app.addChoice(new Choice(
    'You enjoy working as an RA for ResLife',
    stronglies,
    'working'
))
app.addChoice(new Choice(
    'You feel appreciated and valued for your work as an RA',
    stronglies,
    'valued'
))
app.addChoice(new Choice(
    'You feel confident raising issues to your community owner',
    strongliesPlus,
    'confident1'
))
app.addChoice(new Choice(
    'You feel confident raising issues to your community manager',
    strongliesPlus,
    'confident2' 
))
app.addChoice(new Choice(
    'You feel confident raising issues to senior ResLife managers',
    strongliesPlus,
    'confident3'
))
app.addChoice(new Choice(
    'The communication of these new changes were clear',
    stronglies,
    'clarity' 
))
app.addChoice(new Choice(
    'How do you feel about the proposed changes to RA compensation? (A flat stipend instead of 75% off)',
    foriesPlus,
    'compensation' 
))
app.addChoice(new Choice(
    'How do you feel about the proposed changes to RA duties? (More time at central reception as opposed to within a designated hall for Pollock RAs)',
    foriesPlus,
    'duty' 
))
app.addChoice(new Choice(
    'If you are eligible to be an RA next year, have the proposed changes impacted your decision to re-apply as an RA?',
    yessesBasic,
    'affected'
))
app.addChoice(new TextAnswer('Thinking about the last question, why?', 'why'))
app.addChoice(new TextAnswer('Do you have any other feedback about the proposed RA changes?', 'optional'))

app.intervals = [
    {
        lo: 0,
        hi: 5,
        message: "On the <span>Lava Scale</span> You're chilling, the RA life comes naturally to you and ResLife doesn't give you much bother. Future problems are for the future, right now you got some Circuit laundry to do."
    },
    {
        lo: 5,
        hi: 6,
        message: "On the <span>Lava Scale</span> Ok so some things don't feel right to you. But all is well with the world, and only a few months left of this role. You can afford to look away and go about your day."
    },
    {
        lo: 6,
        hi: 7,
        message: "On the <span>Lava Scale</span> You're calling bullshit, you deserve better. It's not common decency the way you're being treated, so you start holding your ground."
    },
    {
        lo: 7,
        hi: 8,
        message: "On the <span>Lava Scale</span> Holy f, there's a good level of bullshit going on. How can an organisation operate like this, you don't feel supported. There's a communication gap going on and you can't stand this."
    },
    {
        lo: 9,
        hi: 10,
        message: "On the <span>Lava Scale</span> You are angry with how you are being treated, with the lack of support you feel. The future is messed up and if you can afford to, you want no part of it with ResLife. You think of going separate ways from this nightmarish organisation."
    }
]

app.start()