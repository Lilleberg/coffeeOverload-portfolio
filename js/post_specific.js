const postContainer = document.querySelector(".main-section");
const main = document.querySelector("main");
const metaDescription = document.querySelector('meta[name="description"]');
const modal = document.querySelector(".modal");
const h1 = document.querySelector("h1");
const buttonSendComment = document.querySelector(".submit");
const form = document.querySelector("form");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  location.href = "index.html";
}

const url = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/posts/" + id;

async function getPost(url) {
  try {
    const response = await fetch(url);
    const post = await response.json();

    document.querySelector(".loader").style.display = "none";

    /*Edit meta description, and strip the <p> tags*/
    const excerpt = `${post.excerpt.rendered}`;
    const strippedExcerpt = excerpt.replace(/(<([^>]+)>)/gi, "");
    metaDescription.setAttribute("content", `${strippedExcerpt}`);
    document.title = `Coffee Overload | ${post.title.rendered}`;

    /*create html*/
    h1.innerHTML = `${post.title.rendered}`;
    postContainer.innerHTML = `${post.content.rendered}
    <p class="date">Published: ${post.formatted_date}</p>`;

    /*for loader*/
    h1.style.visibility = "visible";
    postContainer.style.visibility = "visible";

    /*Set modal on images, as well as blur on background*/
    let images = document.querySelectorAll("section > figure > img");

    images.forEach(function (image) {
      image.addEventListener("click", function () {
        const modalContent = document.querySelector(".modal-content");

        modalContent.innerHTML = "";
        let imgs = document.createElement("img");
        imgs.src = this.src;
        modalContent.appendChild(imgs);

        setStyles("blur(5px)", "block");
      });
    });
  } catch (error) {
    console.log("ERROR: ", error);
    setErrorMessage(main);
  }
}

getPost(url);

const urlComment = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/comments";

const contactFormHandler = (event) => {
  event.preventDefault();

  //const postId = document.querySelector("#postId");
  const name = document.querySelector("#your-name");
  const email = document.querySelector("#email");
  const comment = document.querySelector("#comment");

  const data = ({
    post: id,
    author_name: name.value,
    author_email: email.value,
    content: comment.value,
  });

  (async () => {
    const response = await fetch(urlComment, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const content = await response.json();
    console.log(content);
  })();
}

form.addEventListener("submit", contactFormHandler);

const urlPostComments = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/comments?post=" + id;

async function getComments(url) {
  const response = await fetch(url);
  const comments = await response.json();

  console.log(comments);

  comments.forEach(function (comment) {
    const str = comment.date;
    const time = str.slice(11, 19);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const date = day + "." + (month + 1) + "." + year;

    const dateTime = date + " " + time;
    console.log(dateTime);

    document.querySelector(".comments").innerHTML += `
    <div class="comment">
      <div class="author-info">
        <img src="${comment.author_avatar_urls[96]}">
        <p>${comment.author_name}</p>
        <div>
        <p>${comment.date}</p>
        </div>
      </div>
      <div class="comment-content">${comment.content.rendered}</div>
    </div>`;
  });
}

getComments(urlPostComments);

/*Modal has width and height 100% when displayed*/
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    setStyles(null, "none");
  }
});

function setStyles(blur, styleDisplay) {
  const elements = document.querySelectorAll(".main-section, h1, header, footer");
  elements.forEach(function (element) {
    modal.style.display = styleDisplay;
    element.style.filter = blur;
  });
}