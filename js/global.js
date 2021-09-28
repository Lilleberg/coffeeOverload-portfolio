/*Navbar, hamb-icon*/
const hamburgerNav = document.querySelector(".hamburger-icon");
const nav = document.querySelector(".navbar");
const opacityItems = document.querySelectorAll("main, footer, .back-forth, .view-more");
const footer = document.querySelector("footer");
/*Popular posts*/
const popularPosts = document.querySelector(".popular-container");

async function getPopularPosts(url) {
  try {
    const response = await fetch(url);
    const posts = await response.json();

    posts.forEach(function (post) {
      popularPosts.innerHTML += `<a href="post_specific.html?id=${post.id}">${post.title.rendered}</a>`;
    });

  } catch (error) {
    console.log("ERROR", error);
  }
}

getPopularPosts("https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts?categories=2");

hamburgerNav.onclick = function () {
  if (nav.style.display === "block") {
    setStyle(null, "none", "<i class='fas fa-bars'></i>", "visible");
  } else {
    setStyle("0.5", "block", "<i class='fas fa-times'></i>", "hidden");
  }
}

function editOpacity(opac) {
  opacityItems.forEach(function (item) {
    item.style.opacity = opac;
  });
}

function setStyle(opac, disp, icon, dispLogo) {
  editOpacity(opac);
  nav.style.display = disp;
  hamburgerNav.innerHTML = icon;
  document.querySelector(".logo_top img").style.visibility = dispLogo;
}

window.onclick = function (event) {
  if (event.target === nav) {
    setStyle(null, "none", "<i class='fas fa-bars'></i>", "visible");
  }
}

function setErrorMessage(container) {
  container.innerHTML = errorMessage();
  container.style.backgroundColor = "var(--light-skin)";
}