const main = document.querySelector("main");
const firstSlideContainer = document.querySelector(".first-slide");
const secondSlideContainer = document.querySelector(".second-slide");
const thirdSlideContainer = document.querySelector(".third-slide");
const buttonPrev = document.querySelector(".carousel-back");
const buttonNext = document.querySelector(".carousel-forth");

let firstSlide = [];
let secondSlide = [];
let thirdSlide = [];

async function getPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);

    for (let i = 0; i < posts.length; i++) {

      //console.log("Innlegg " + posts[i].title.rendered, posts[i]);
      if (i >= 0 && i < 4) firstSlide.push(posts[i]);
      if (i > 3 && i < 8) secondSlide.push(posts[i]);
      if (i > 7) thirdSlide.push(posts[i]);
    }

    for (let i = 0; i < firstSlide.length; i++) {
      createHTML(firstSlide[i], firstSlideContainer);
    }

    for (let i = 0; i < secondSlide.length; i++) {
      createHTML(secondSlide[i], secondSlideContainer);
    }

    for (let i = 0; i < thirdSlide.length; i++) {
      createHTML(thirdSlide[i], thirdSlideContainer);
    }

  } catch (error) {
    console.log("ERROR: ", error);
    setErrorMessage(main);
  }
}

getPosts("https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?_embed&per_page=12");

buttonNext.onclick = function () {
  nextSlide(1);
}

buttonPrev.onclick = function () {
  nextSlide(-1);
}

let slideCount = 1;
carousel(slideCount);

function currentSlide(n) {
  carousel(slideCount = n);
}

function nextSlide(n) {
  carousel(slideCount += n);
}

function carousel(n) {
  let slides = document.querySelectorAll(".slide");

  if (n > slides.length) slideCount = 1;
  if (n < 1) slideCount = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideCount - 1].style.display = "block";
}

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