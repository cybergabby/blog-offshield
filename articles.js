let articles = [];

const params = new URLSearchParams(window.location.search);

const slug = params.get("slug");

fetch("articles.json")
.then(response => response.json())
.then(data => {

    articles = data;

    loadArticle();

});

async function loadArticle(){

    const article = articles.find(a => a.slug === slug);

    if(!article){

        document.body.innerHTML = "<h1>Article not found</h1>";

        return;

    }

    document.title = article.title;

    document.getElementById("articleTitle").textContent = article.title;

    document.getElementById("articleCategory").textContent = article.category;

    document.getElementById("articleAuthor").textContent = article.author;

    document.getElementById("articleDate").textContent = article.date;

    document.getElementById("articleReadTime").textContent = article.readTime;

    document.getElementById("articleImage").src = article.image;

    const articleBody = await fetch(article.article);

    const html = await articleBody.text();

    document.getElementById("articleContent").innerHTML = html;

    loadRelated(article);

}

function loadRelated(current){

    const container = document.getElementById("relatedArticles");

    container.innerHTML = "";

    articles
    .filter(a => a.category === current.category && a.slug !== current.slug)
    .slice(0,3)
    .forEach(article=>{

        container.innerHTML += `

        <article class="news-card">

            <img src="${article.image}">

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

            </div>

        </article>

        `;

    });

}
