const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid");
const points = document.querySelector(".points");

let currentTime = 0;
let pontos = 0;

// quando a janela carregar
window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem("player")
    startTimer();
    loadGame();
};

// função para iniciar o tempo

const startTimer = () => {

    this.loop = setInterval(() => {
        
        points.innerHTML = pontos;
        currentTime++;
        timer.innerHTML = currentTime;

    }, 1000);
};

// array dos personas das cartas

const characters = [
    'nidere',
    'anjo',
    'degolificada',
    'gal',
    'joui',
    'dante',
    'kaiser',
    'carnical',
    'arthur',
    'carente',
];

//duplicando e embaralhando as cartas

const duplicateCharacters = [...characters, ...characters];
const shufflerdArray = duplicateCharacters.sort(() => Math.random() - 0.5);

// função para criar o elemento
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
};

//criar as cartas
const creatCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url(../img/imagem_cartas/${character}.PNG)`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;

};

//função para carregar o jogo
const loadGame = () => {

    shufflerdArray.forEach((character) =>{

        const card = creatCard(character);

        grid.appendChild(card);
    });
};

//criar variaveis para a primeira e segunda carta
let firstCard = "";
let secondCard = "";

//função para revelar as cartas 
const revealCard = ( {target} ) => {

    if (target.parentNode.className.includes("reveal-card")) {

        return;
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;

    } else if (secondCard === "") {
        target.parentNode.classList.add("reveal-card")
        secondCard = target.parentNode;

        checkCards();
    }

};

//função para checar as cartas
const checkCards = () => {

    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {

        //quando acertar as cartas
        pontos += 10;

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();

    } else {

        //quando errar as cartas
        pontos -= 2;

        setTimeout(() => {

            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";

        }, 500);
    };
};

const modal = document.getElementById("modal")

// função para chegar no end game
const checkEndGame = () => {

    
    const disabledCards = document.querySelectorAll(".disabled-card");
    
    if (disabledCards.length === 20) {

        localStorage.setItem("score", pontos);
        localStorage.setItem("recordTimer", currentTime);

        clearInterval(this.loop);

        setTimeout(() => {

            alert(`
                Parabéns ${spanPlayer.innerHTML}.
                Tempo Total: ${currentTime}.
                Pontos: ${pontos}.
                `);

                const dialog = confirm("Gostaria de jogar novamente?");

                if (dialog) {
                    
                    window.location.reload();
                } else {
                    window.location.href = "../index.html";
                }

           modal.style.display = "block";

           if (dialog) {
               window.location.reload();
           } else {
               window.location = "../index.html"
           }

        }, 500);
    }
};
