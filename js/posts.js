const main = document.querySelector("main");
const postContainer = document.querySelector(".main-section");
const viewMoreButton = document.querySelector(".view-more");

let url = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&per_page=12";

var counter = 0;
async function getPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    for (let i = 0; i < posts.length; i++) {
      if (i <= 9) createHTML(posts[i], postContainer);
    }

    viewMoreButton.onclick = function () {
      for (let j = 10; j < posts.length; j++) {
        createHTML(posts[j], postContainer);
      }
      viewMoreButton.style.display = "none";
    }

  } catch (error) {
    console.log("ERROR: ", error);
    setErrorMessage(main);
  }
}

getPosts(url);

function createHTML(post, container) {
  container.innerHTML += `
  <div class="post-container">
    <a href="post_specific.html?id=${post.id}">
      <h2 class="post-heading">${post.title.rendered}</h2>
      <img src="${post._embedded['wp:featuredmedia']['0'].source_url}">
      ${post.excerpt.rendered}
    </a>
  </div>`;
}