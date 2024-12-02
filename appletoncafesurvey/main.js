const app = new App()

app.addQuestion(
    'seating',
    new Question(
        'Rate the quality of seating (1-5)',
        './assets/gifs/seating.gif',
        11,
        app.navigate
    )
)

app.addQuestion(
    'tables',
    new Question(
        'Rate the quality of the tables (1-5)',
        './assets/gifs/tables.gif',
        22,
        app.navigate
    )
)

app.addQuestion(
    'plugs',
    new Question(
        'Rate the charging space availability (1-5)',
        './assets/gifs/plugs.gif',
        33,
        app.navigate
    )
)

app.addQuestion(
    'flooring',
    new Question(
        'Rate the flooring (1-5)',
        './assets/gifs/flooring.gif',
        44,
        app.navigate
    )
)

app.addQuestion(
    'decoration',
    new Question(
        'Rate the decoration of the space (1-5)',
        './assets/gifs/decoration.gif',
        55,
        app.navigate
    )
)

app.addQuestion(
    'food',
    new Question(
        'Rate the food: quality and choice (1-5)',
        './assets/gifs/food.gif',
        66,
        app.navigate
    )
)

app.addQuestion(
    'drinks',
    new Question(
        'Rate the drinks: quality and choice (1-5)',
        './assets/gifs/drinks.gif',
        77,
        app.navigate
    )
)

app.addQuestion(
    'price',
    new Question(
        'Rate the overall affordability of the cafe (1-5)',
        './assets/gifs/affordability.gif',
        88,
        app.navigate
    )
)

app.setCharacters([
    {
        lo: 8, 
        hi: 10,
        character: 'Darth Vader',
        img: './assets/characters/vader-min.png',
        persona: "You wanted sandwhich. But sandwhich wasn't there. Now you wreak havoc, seeking the vengence of your lost sandwhich. Anger is beneath you, you are seething in a fire of desire. You wish to bring to ruins that which so devastatingly hurt you. There is no pain like the loss of a sandwhich."
    },
    {
        lo: 11,
        hi: 15,
        character: 'Asajj Ventress',
        img: './assets/characters/asajj-min.png',
        persona: "An old witch of Dathomir, now a saber user. You've seen the state of the cafe, before, now you can't even get your daily fix of coffee from the dreaded place. You recite incantations and cast spells secretly, trying to bring to life a dead corpse. Will you succeed? How many sacrifices must you make to the Force to have your spell complete..."
    },
    {
        lo: 16,
        hi: 19,
        character: 'Mother Aniseya',
        img: './assets/characters/aniseya-min.png',
        persona: "You try not to mind. But it keeps pushing your buttons, grinding on your nerves. You wish for better, you will not settle for best. You do this not just for yourself, but for those you lead. There are some that may despise your choice, but you do you. You will no longer accept having to leave the building to get some tea. Your coven join you in this mission, you band as one. The tea is coming, one way or another..."
    },
    {
        lo: 20,
        hi: 24,
        character: 'Ahsoka Tano',
        img: './assets/characters/ahsoka-min.png',
        persona: "Modesty and balance. But able to critisize. You have seen both aspects of the place, the good and the bad. But honestly, you don't mind. The cafe is not your life, you may see it often, but you don't think twice about it. You have some droids to slash, villages to save and tv shows to cameo in. You have no time to stop and think deep about the situation, as there are always more pressing concerns. But if you did stop to think, you'd maybe wonder... if your sabers need a little sharpening."
    },
    {
        lo: 25,
        hi: 30,
        character: 'Bo-Katan Kryze',
        img: './assets/characters/bokatan-min.png',
        persona: "You've seen a lot of shit over your (suspiciously long) lifetime, but nothing stops you. You have a goal, you're gonna achieve it. Who needs food anyway? Mandalore is yet for the claiming."
    },
    {
        lo: 31,
        hi: 34,
        character: 'Representative Binks',
        img: './assets/characters/jarjar-min.png',
        persona: "You occasionally stumble into the place. Sucks it does. But you find a way to see beauty in it. It doesn't matter what it looks like, it's the feeling it gives that counts. A space that brings friends together. But it doesn't affect you anyway, you rarely enter the scene and when you do you leave as quickly as you came."
    },
    {
        lo: 35,
        hi: 40,
        character: 'Master Yoda',
        img: './assets/characters/yoda-min.png',
        persona: "Enough time, there is not. Dwell on the broken, you must not. Lived many lives, I have. Need coffee, you do not. More things meaning to life, there are. Enjoy the present, you must. The state of it, matter not. Many challenges, you can overcome. One, this is."
    },
])

app.start()