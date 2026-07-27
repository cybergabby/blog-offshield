// ======================================
// OFFSHIELD SECURITY NEWS
// Article Engine v1.0
// ======================================

let articles = [];

document.addEventListener("DOMContentLoaded", () => {
    loadArticles();
});

// ----------------------------
// Load JSON
// ----------------------------

async function loadArticles() {

    try {

        const response = await fetch("articles.json");

        articles = await response.json();

        buildHero();

        buildLatestNews();

        buildTrending();

        buildThreatIntel();

        buildVulnerabilities();

    }

    catch(error){

        console.error("Unable to load articles.", error);

    }

}

// ----------------------------
// Featured Hero
// ----------------------------

function buildHero(){

    const hero = articles.find(article => article.featured);

    if(!hero) return;

    document.querySelector(".hero-main img").src = hero.image;

    document.querySelector(".hero-main img").alt = hero.title;

    document.querySelector(".hero-content .category").textContent = hero.category;

    document.querySelector(".hero-content h1").textContent = hero.title;

    document.querySelector(".hero-content p").textContent = hero.summary;

    document.querySelector(".read-btn").href =
        `article.html?slug=${hero.slug}`;

}

// ----------------------------
// Latest News
// ----------------------------

function buildLatestNews(){

    const container = document.getElementById("latestNews");

    container.innerHTML = "";

    articles.slice(0,6).forEach(article=>{

        container.innerHTML += createCard(article);

    });

}

// ----------------------------
// Trending
// ----------------------------

function buildTrending(){

    const container =
        document.getElementById("trendingStories");

    container.innerHTML = "";

    articles
    .filter(article=>article.trending)
    .slice(0,5)
    .forEach(article=>{

        container.innerHTML += `

        <div class="trend-item">

            <span>${article.category}</span>

            <a href="article.html?slug=${article.slug}">

                ${article.title}

            </a>

        </div>

        `;

    });

}

// ----------------------------
// Threat Intelligence
// ----------------------------

function buildThreatIntel(){

    const container =
        document.getElementById("threatIntel");

    container.innerHTML = "";

    articles
    .filter(article=>article.category==="Threat Intelligence")
    .forEach(article=>{

        container.innerHTML += createCard(article);

    });

}

// ----------------------------
// Vulnerabilities
// ----------------------------

function buildVulnerabilities(){

    const container =
        document.getElementById("vulnerabilityNews");

    container.innerHTML = "";

    articles
    .filter(article=>article.category==="Vulnerabilities")
    .forEach(article=>{

        container.innerHTML += createCard(article);

    });

}

// ----------------------------
// Card Generator
// ----------------------------

function createCard(article){

    return `

    <article class="news-card">

        <img src="${article.image}" alt="${article.title}">

        <div class="card-content">

            <span class="category">

                ${article.category}

            </span>

            <h3>

                <a href="article.html?slug=${article.slug}">

                    ${article.title}

                </a>

            </h3>

            <p>

                ${article.summary}

            </p>

            <div class="meta">

                <span>${article.date}</span>

                <span>${article.readTime}</span>

            </div>

        </div>

    </article>

    `;

}
