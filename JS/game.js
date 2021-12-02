const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'How many All Star Appearances does Kobe Bryant have?', 
        choice1: '16', 
        choice2: '15', 
        choice3: '18', 
        choice4: '19', 
        answer: 3,
    },
    {
        question: 'What city won the first NBA Championship?', 
        choice1: 'Chicago', 
        choice2: 'Los Angeles', 
        choice3: 'Baltimore', 
        choice4: 'Philadelphia', 
        answer: 4,
    },
    {
        question: 'Who was the hardest player to guard for Kobe Bryant?', 
        choice1: 'Tracy McGrady', 
        choice2: 'Kevin Durant', 
        choice3: 'Allen Iverson', 
        choice4: 'Michael Jordan', 
        answer: 2,
    },
    {
        question: 'Who was Michael Jordan toughest defender?', 
        choice1: 'Joe Dumars', 
        choice2: 'Gary Payton', 
        choice3: 'Dennis Rodman', 
        choice4: 'Isaiah Thomas', 
        answer: 1,
    },
    {
        question: 'What year was the Milwaukee Bucks 1st Championship?', 
        choice1: '1971', 
        choice2: '1972', 
        choice3: '1973', 
        choice4: '1974', 
        answer: 2,
    },
    {
        question: 'What year did Giannis win his 1st MVP?', 
        choice1: '2020', 
        choice2: '2019', 
        choice3: '2018', 
        choice4: '2017', 
        answer: 2,
    },
    {
        question: 'Who scored the most career points in NBA History?', 
        choice1: 'Lebron James', 
        choice2: 'Kobe Bryant', 
        choice3: 'Michael Jordan', 
        choice4: 'Kareem Abdul-Jabbar', 
        answer: 4,
    },
    {
        question: 'Who is the only NBA player to record 35,000 points, 9,000 assists and 9,000 rebounds?', 
        choice1: 'Lebron James', 
        choice2: 'Magic Johnson', 
        choice3: 'Michael Jordan', 
        choice4: 'Wilt Chamberlain', 
        answer: 1,
    },
    {
        question: 'Who has the most rebounds in a game (55 rebounds)?', 
        choice1: 'Bill Russell', 
        choice2: 'David Robinson', 
        choice3: 'Shaquille ONeal', 
        choice4: 'Wilt Chamberlain', 
        answer: 4,
    },
    {
        question: 'Who has the most rings in NBA History?', 
        choice1: 'Michael Jordan', 
        choice2: 'Bill Russell', 
        choice3: 'Robert Horry', 
        choice4: 'Kobe Bryant', 
        answer: 2,
    },
    {
        question: 'Who holds the most assist of all times?', 
        choice1: 'Jason Kidd', 
        choice2: 'Steve Nash', 
        choice3: 'John Stockton', 
        choice4: 'Magic Johnson', 
        answer: 3,
    },
    {
        question: 'How many All Star Appearances does Jordan have?', 
        choice1: '20', 
        choice2: '15', 
        choice3: '14', 
        choice4: '16', 
        answer: 3,
    },
    {
        question: 'What city has the MOST NBA Championship?', 
        choice1: 'Chicago', 
        choice2: 'Los Angeles', 
        choice3: 'Boston', 
        choice4: 'Philadelphia', 
        answer: 3,
    },
    {
        question: 'What was Allen Iverson Childhood nickname?', 
        choice1: 'AI', 
        choice2: 'Bubba Chuck', 
        choice3: 'Man-Man', 
        choice4: 'Peewee',
        answer: 2,
    },
    {
        question: 'Shortest Player in NBA History?', 
        choice1: 'Muggsey Bogues', 
        choice2: 'Earl Boykins', 
        choice3: 'Nate Robinson', 
        choice4: 'Isaiah Thomas', 
        answer: 1,
    },
    {
        question: 'How many points did Giannis score in game 6 championship game?', 
        choice1: '50', 
        choice2: '55', 
        choice3: '53', 
        choice4: '51', 
        answer: 1,
    },
    {
        question: 'What year did Michael Jordan 1st retire?', 
        choice1: '1994', 
        choice2: '1992', 
        choice3: '1993', 
        choice4: '1995', 
        answer: 3,
    },
    {
        question: 'Who was the number 1 pick in 1984?', 
        choice1: 'Hakeem Olajuwon', 
        choice2: 'Michael Jordan', 
        choice3: 'John Stockton', 
        choice4: 'Charles Barkley', 
        answer: 1,
    },
    {
        question: 'What is the most points Shaquille ONeal scored in a game?', 
        choice1: '52', 
        choice2: '55', 
        choice3: '63', 
        choice4: '61', 
        answer: 4,
    },
    {
        question: 'What was Kobe Bryant middle name?', 
        choice1: 'Michael', 
        choice2: 'Bean', 
        choice3: 'Robert', 
        choice4: 'Nathaniel', 
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    // I used a couple forEach loops instead of just for loops. Hopefully this is fine.
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()