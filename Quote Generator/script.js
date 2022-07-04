// Get Quotes from API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// global variable
let apiQuotes = []; 

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show new Quote

function newQuote(){
    loading();
    // pick a random quote from apiquotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent = "Uknown";
    }
    else{
        authorText.textContent = quote.author;
    }
    // Check the quote length to determine styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');

    }
    // Set the quote and hide the loader
    quoteText.textContent = quote.text;
    complete();
}
async function getQuotes(){
    loading();
    const apiUrl  = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);// fetch api and store the data in response variable
        apiQuotes = await response.json();// converts the response into a json object
        newQuote();
    }

    catch(error){
        // Catch error here

    }
}
// Tweet Quote
function tweetquote(){
    const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterurl,"_blank");
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetquote);

// On load

getQuotes();