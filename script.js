const paragraphs = [ 
    "My first visit to Nha Trang, the coastal city, was three years ago. It was a pleasant and memorable trip. Nha Trang, the capital of Khanhs Hoaf province, has one of the most popular municipal beaches in all of Vietnam. In Nha Trang, nature beauties are so tempting. Waves crashing onto the cliffs; the soft sigh of the sea breeze; clean white sands and turquoise waters; it all makes for a stunning landscapes. On my visit to Nha Trang, I used to get up early each morning to stroll along the beach a chance to breath in the fresh sea air and enjoy the sunrise across the water. One attraction that captivated me three years ago and still it does is the collection of small offshore islands. Hon Tre is the largest of the islands, and Monkey island is, as the name suggests, the home of hundreds of wild monkeys. Yen island is known for its swifts nests. Nha Trang is the city in hamoney: its fine weather, favorite position and friendly people bring it a cerain balance. Nha Trang is a great holiday destination. I hope to have chance to come back.",
    "My favorite subject is English. The first reason I like this subject is that it is a core subject which is vital and essential in my career path. I try to learn this international language well so that I can communicate with foreigners and find a good job in the future. Fur  thermore, learning English well can help me read books or magazines in English. Through reading things in English, I can be exposed to various cultures and customs. Besides, my English teacher is a dedicated person who can engage me in her lessons and bring the passion for me. I found her lessons interesting be  cause she delivered them in a way that I really liked. In short, English is an important subject which I am really keen on.",
    "Life in the city is full of activity. Early in the morning hundreds of people rush out of their homes in the manner ants do when their nest is broken. Soon the streets are full of traffic. Shops and offices open, stu  dents flock to their schools and the day work begins. The city now throb with activity, and it is full of noise. Hundreds of sight seers, tourists and others visit many places of interest in the city while businessmen from various parts of the world arrive to transact business. Then towards evening, the offices and day schools begin to close. Many of the shops too close. There is now a rush for buses and other means of transport. Everyone seems to be in a hurry to reach home. The city is described as a place of constant activity. Here, the drama of life is enacted every day.",
    "Of all my friends, Hanh and Mai are my best friends. We are at the same class at the primary school and secondary school. We are also neighbors, so we spend most of our time studying and talking together. Hanh is a beautiful girl with black eyes and an oval face. She is an intelligent student who is always at the top of the class. She likes reading and going to the library whenever she has free time. Mai is not as beautiful as Hanh but she has a lovely smile and a good appear  ance. Mai is very sporty. She spends most of her free time playing sports. Mai is a volleyball star of our school. She is also very sociable and has a good sense of humor. Her jokes always make us laugh. I love both of my friends and I always hope our friendship will last forever.",
    "There are several reasons why television is an essential part of our lives. First, television helps us see more of the world and learn useful things because TV pro  grams can provide us with general knowledge about many fileds. For example, we can know and understand different cultures and customs around the world just by staying at home to watch TV programs. Also, televi  sion can entertain us with interesting and exciting pro  grams such as comedy shows or movies. This is one of the best ways to help us relax and have fun after work. Furthermore, TV can make things memorable because it presents information in an effective way. In short, television has many benefits because it is not only a source of information but also a means of entertainment."
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60 ;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph()
{
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char =>
        {
            console.log(char);
            let span = `<span>${char}</span>`
            typingText.innerHTML += span;
        });
        typingText.querySelectorAll("span")[0].classList.add("active");
        document.addEventListener("keydown", (e) => {
            inpField.focus();
            typing(e.key);
        });
        typingText.addEventListener("click", () => inpField.focus());
}

//xem xét và xử lý quá trình nhập liệu
function initTyping()
{
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft >0)
    {
        if(!isTyping)
        {
            timer =  setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null)
        {
            if(charIndex>0)
            {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect"))
                {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }else
        {
            if(characters[charIndex].innerText == typedChar)
            {
                characters[charIndex].classList.add("correct");
            }else
            {
                 mistakes++;
                characters[charIndex].classList.add("incorrect");
             }
        charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)/5)/(maxTime - timeLeft)*60);
        wpm = wpm <0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    }
    else
    {
        clearInterval(timer);
        inpField.value= "";
    }
}

//đếm thời gian
function initTimer()
{
    if(timeLeft> 0)
    {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)/5)/(maxTime - timeLeft)*60);
        wpmTag.innerText = wpm;
    }
    else
    {
        clearInterval(timer);
    }
}
//thử lại
function resetGame()
{
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = 0;
    mistakeTag.innerText = 0 ;
    cpmTag.innerText =0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

const keys = document.querySelectorAll('.key');
let isShift = false;
keys.forEach(key => {
  key.addEventListener('click', (e) => {
    let char = e.target.innerHTML;
    if (/^[a-zA-Z]$/.test(char)) {
        if (isShift){
            inpField.value += e.target.innerHTML;
            typing(e.target.innerHTML);
        } else {
            inpField.value += e.target.innerHTML.toLowerCase();
            typing(e.target.innerHTML);
        }
    } else if (char === 'Space') {
        inpField.value += ' ';
        typing(' ');
    } else if (char === 'Backspace') {
        inpField.value = inpField.value.slice(0, -1);
        typing('Backspace');
    } else if (char === 'Shift') {
        isShift = !isShift;
        if (isShift) {
            document.getElementById('Shift').classList.add('typing-animation-shift');
        } else {
            document.getElementById('Shift').classList.remove('typing-animation-shift');
        }
        typing('Shift', true);
        return;
    } else if (char === '.' || char === ',') {
        inpField.value += e.target.innerHTML;
        typing(e.target.innerHTML);
    }
    initTyping()
    console.log(inpField.value);
  });
});

function typing(typedChar, click = false) {
    console.log(typedChar);

    if (/^[a-zA-Z]$/.test(typedChar)) {
        let char = document.getElementById(typedChar.toUpperCase() + '');
        char.classList.add('typing-animation');
        setTimeout(() => {
            char.classList.remove('typing-animation');
        }, 500)
    } else if (typedChar === ' ') {
        let char = document.getElementById('Space');
        char.classList.add('typing-animation');
        setTimeout(() => {
            char.classList.remove('typing-animation');
        }, 500)
    } else if (typedChar === 'Backspace') {
        let char = document.getElementById('Backspace');
        char.classList.add('typing-animation');
        setTimeout(() => {
            char.classList.remove('typing-animation');
        }, 500)
    } else if (typedChar === 'Shift' && !click) {
        let char = document.getElementById('Shift');
        char.classList.add('typing-animation');
        setTimeout(() => {
            char.classList.remove('typing-animation');
        }, 500)
    } else if (typedChar === '.' || typedChar === ',') {
        let char = document.getElementById(typedChar+'');
        char.classList.add('typing-animation');
        setTimeout(() => {
            char.classList.remove('typing-animation');
        }, 500)
    }
}