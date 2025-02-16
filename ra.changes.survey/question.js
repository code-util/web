// max 4 min 0
const yessesBasic = [
    {
        title: 'Not at all',
        value: 'Not at all',
        static: './assets/emojis/notatall.png',
        animated: './assets/emojis/notatall.gif',
        weight: 0
    },
    {
        title: 'No, but crossed my mind',
        value: 'No, but crossed my mind',
        static: './assets/emojis/nothought.png',
        animated: './assets/emojis/nothought.gif',
        weight: 1
    },
    {
        title: 'Yes, a little',
        value: 'Yes, a little',
        static: './assets/emojis/yeslittle.png',
        animated: './assets/emojis/yeslittle.gif',
        weight: 2
    },
    {
        title: 'Yes, a lot',
        value: 'Yes, a lot',
        static: './assets/emojis/yeslot.png',
        animated: './assets/emojis/yeslot.gif',
        weight: 3
    },
]
// max 4 min 0
const stronglies = [
    {
        title: 'Strongly Disagree',
        value: 'Strongly Disagree',
        static: './assets/emojis/stronglydisagree.png',
        animated: './assets/emojis/stronglydisagree.gif',
        weight: 4
    },
    {
        title: 'Disagree',
        value: 'Disagree',
        static: './assets/emojis/disagree.png',
        animated: './assets/emojis/disagree.gif',
        weight: 3
    },
    {
        title: 'Neutral',
        value: 'Neutral',
        static: './assets/emojis/neutral.png',
        animated: './assets/emojis/neutral.gif',
        weight: 2
    },
    {
        title: 'Agree',
        value: 'Agree',
        static: './assets/emojis/agree.png',
        animated: './assets/emojis/agree.gif',
        weight: 1
    },
    {
        title: 'Strongly Agree',
        value: 'Strongly Agree',
        static: './assets/emojis/stronglyagree.png',
        animated: './assets/emojis/stronglyagree.gif',
        weight: 0
    }
]
// max 4 min 0
const strongliesPlus = [
    {
        title: 'Strongly Disagree',
        value: 'Strongly Disagree',
        static: './assets/emojis/stronglydisagree.png',
        animated: './assets/emojis/stronglydisagree.gif',
        weight: 4
    },
    {
        title: 'Disagree',
        value: 'Disagree',
        static: './assets/emojis/disagree.png',
        animated: './assets/emojis/disagree.gif',
        weight: 3
    },
    {
        title: 'Neutral',
        value: 'Neutral',
        static: './assets/emojis/neutral.png',
        animated: './assets/emojis/neutral.gif',
        weight: 2
    },
    {
        title: 'Agree',
        value: 'Agree',
        static: './assets/emojis/agree.png',
        animated: './assets/emojis/agree.gif',
        weight: 1
    },
    {
        title: 'Strongly Agree',
        value: 'Strongly Agree',
        static: './assets/emojis/stronglyagree.png',
        animated: './assets/emojis/stronglyagree.gif',
        weight: 0
    },
    {
        title: 'Unsure',
        value: 'Unsure',
        static: './assets/emojis/unsure.png',
        animated: './assets/emojis/unsure.gif',
        weight: 2
    }
]
// max 4 min 0
const foriesPlus = [
    {
        title: 'Strongly Against',
        value: 'Strongly Againts',
        static: './assets/emojis/stronglyagainst.png',
        animated: './assets/emojis/stronglyagainst.gif',
        weight: 4
    },
    {
        title: 'Slightly Against',
        value: 'Slightly Against',
        static: './assets/emojis/slightlyagainst.png',
        animated: './assets/emojis/slightlyagainst.gif',
        weight: 3
    },
    {
        title: 'Neutral',
        value: 'Neutral',
        static: './assets/emojis/neutral.png',
        animated: './assets/emojis/neutral.gif',
        weight: 2
    },
    {
        title: 'Slightly For',
        value: 'Slightly For',
        static: './assets/emojis/slightlyfor.png',
        animated: './assets/emojis/slightlyfor.gif',
        weight: 1
    },
    {
        title: 'Strongly For',
        value: 'Strongly For',
        static: './assets/emojis/stronglyfor.png',
        animated: './assets/emojis/stronglyfor.gif',
        weight: 0
    },
    {
        title: 'Unsure',
        value: 'Unsure',
        static: './assets/emojis/unsure.png',
        animated: './assets/emojis/unsure.gif',
        weight: 2
    }
]

class Choice {
    constructor(question, choiceSet, id) {
        this.question = question
        this.choiceSet = choiceSet
        this.optionSelected = null
        this.optionIndex = -1
        this.firstClick = true
        this.id = id
        this.weight = 0
    }
    selectOption(option, index) {
        this.optionSelected = option
        this.optionIndex = index
        this.weight = this.choiceSet[index].weight
    }
    get value() {
        return this.optionSelected
    }
}

class TextAnswer {
    constructor(question, id) {
        this.question = question
        this.value = null
        this.id = id
    }
    valueChanged(newValue) {
        this.value = newValue
    }
}