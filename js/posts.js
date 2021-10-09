const main = document.querySelector("main");
const postContainer = document.querySelector(".main-section");
const viewMoreButton = document.querySelector(".view-more");
const buttonCategory = document.querySelector(".category");
const buttonPopular = document.querySelector(".popular");
const buttonUseful = document.querySelector(".useful");
const buttonFacts = document.querySelector(".facts");
const buttonEducational = document.querySelector(".educational");
const buttonInteresting = document.querySelector(".interesting");
const buttonAllPosts = document.querySelector(".view-all");

let url = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&per_page=12";

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    postContainer.innerHTML = " ";
    for (let i = 0; i < posts.length && i <= 9; i++) {
      createHTML(posts[i], postContainer);

      viewMoreButton.onclick = function () {
        for (i = 10; i < posts.length; i++) {
          createHTML(posts[i], postContainer);
        }
        viewMoreButton.style.display = "none";
      }
    }
  } catch (error) {
    console.log("ERROR: ", error);
    setErrorMessage(main);
  }
}

getPosts(url);

const popularUrl = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&categories=2";
const factsUrl = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&categories=3";
const usefulUrl = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&categories=4";
const educationalUrl = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&categories=5"
const interestingUrl = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&categories=6";

async function getCategories(url, button) {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    button.onclick = function () {

      postContainer.innerHTML = " ";
      for (let i = 0; i < posts.length; i++) {
        createHTML(posts[i]);
        viewMoreButton.style.display = "none";
        dispCategory.style.display = "none";
      }
    }

  } catch (error) {
    console.log("ERROR", error);
  }
}

getCategories(popularUrl, buttonPopular);
getCategories(factsUrl, buttonFacts);
getCategories(usefulUrl, buttonUseful);
getCategories(educationalUrl, buttonEducational);
getCategories(interestingUrl, buttonInteresting);
getCategories(url, buttonAllPosts);

function createHTML(post) {
  postContainer.innerHTML += `
  <div class="post-container">
    <a href="post_specific.html?id=${post.id}">
      <h2 class="post-heading">${post.title.rendered}</h2>
      <img src="${post._embedded['wp:featuredmedia']['0'].source_url}">
      ${post.excerpt.rendered}
    </a>
  </div>`;
}

const dispCategory = document.querySelector(".disp-sort-content");
buttonCategory.onclick = function () {
  if (dispCategory.style.display === "block") {
    dispCategory.style.display = "none";
  } else {
    dispCategory.style.display = "block";
  }
}