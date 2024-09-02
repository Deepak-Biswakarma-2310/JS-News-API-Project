const API_KEY = "6add9e3dde2644789208e594a3521ffe";
const url = "https://newsapi.org/v2/everything?q=";

function reload() {
    window.location.reload();
}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector("#news-img");    
    const newsTitle = cardClone.querySelector("#news-title");    
    const newsSource = cardClone.querySelector("#news-source");    
    const newsDesc = cardClone.querySelector("#news-desc");    

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const templateNewsCard = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = templateNewsCard.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}

window.addEventListener("load", () => fetchNews("India"));

let currentSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;
    searchInput.value = "";
});