// variable
const form = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTweet);

    // Cuando el documento está listo 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        addHTML();
    });
}

// Funciones
function addTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        showError('The message can not be empty');
        return;
    }
    
    const tweetObj = {
        id: Date.now(),
        text: tweet
    }

    tweets = [...tweets, tweetObj];
    addHTML();
    form.reset();
}

function showError(error) {
    const errorMessage = document.createElement('P');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    // Insert content
    const content = document.querySelector('#contenido');
    content.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

function addHTML() {
    cleanHTML();

    tweets.forEach((tweet) => {

        // Add a button
        const btnRemove = document.createElement('A');
        btnRemove.classList.add('borrar-tweet');
        btnRemove.innerText = 'X';

        // Add function remove
        btnRemove.onclick = () => {
            removeTweet(tweet.id);
        }


        const li = document.createElement('li');
        li.innerText = tweet.text;
        li.appendChild(btnRemove);
        listTweets.appendChild(li);
    });

    synchronizedLocalStorage();
}

function synchronizedLocalStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}



function removeTweet(id) {
    tweets = tweets.filter( tweet => tweet.id != id);
    addHTML();
}


// Clean HTML
function cleanHTML() {
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
}
