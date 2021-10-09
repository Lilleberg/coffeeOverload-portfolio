const postContainer = document.querySelector(".main-section");
const main = document.querySelector("main");
const metaDescription = document.querySelector('meta[name="description"]');
const modal = document.querySelector(".modal");
const h1 = document.querySelector("h1");
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
    let images = document.querySelectorAll("div > figure > img");

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

/* MODAL */
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

/* COMMENT SECTION */
const urlComment = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/comments";

const contactFormHandler = (event) => {
  event.preventDefault();

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const content = await response.json();

    /*Update innerHTML when button is clicked to view comment right away*/
    document.querySelector(".comments").innerHTML = "";
    getComments(urlPostComments);
  })();
  form.reset();
}

form.addEventListener("submit", contactFormHandler);

const urlPostComments = "https://gamehub-maria.digital/projectexam1/wp-json/wp/v2/comments?post=" + id;

async function getComments(url) {
  try {
    const response = await fetch(url);
    const comments = await response.json();

    //Latest comment at bottom.
    const commentsAsc = comments.reverse();

    commentsAsc.forEach(function (comment) {
      /*Don't like the date format from the API*/
      const str = comment.date;
      const time = str.slice(11, 19);
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const date = day + "." + (month + 1) + "." + year;
      const dateTime = date + " " + time;

      createHTMLComment(comment, dateTime);

    });
  } catch (error) {
    console.log("ERROR:", error);
    setErrorMessage(main);
  }
}

getComments(urlPostComments);

function createHTMLComment(comment, date) {
  document.querySelector(".comments").innerHTML += `
  <div class="comment">
    <div class="author-info">
      <img src="${comment.author_avatar_urls[96]} alt="user's comment image">
      <p>${comment.author_name}</p>
      <p class="date">${date}</p>
    </div>
    <div class="comment-content">${comment.content.rendered}</div>
  </div>`;
}

/* Comment section form error */
const nameInput = document.querySelector("#your-name");
const nameError = document.querySelector(".nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector(".emailError");
const comment = document.querySelector("#comment");
const commentError = document.querySelector(".commentError");
const submit = document.querySelector(".submit");

submit.style.filter = "grayscale(100%)";

function checkInputs() {
  if (checkLength(nameInput.value, 1) && checkEmail(email.value) && checkLength(comment.value, 1)) {
    submit.disabled = false;
    submit.style.filter = "grayscale(0%)";
  } else {
    submit.disabled = true;
    submit.style.filter = "grayscale(100%)";
  }
}

nameInput.addEventListener("keyup", checkInputs);
email.addEventListener("keyup", checkInputs);
comment.addEventListener("keyup", checkInputs);

nameInput.addEventListener("blur", (event) => {
  if (checkLength(nameInput.value, 1)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
});

nameInput.addEventListener("focus", (event) => {
  if (nameInput) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
});

email.addEventListener("blur", (event) => {
  if (checkEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
});

email.addEventListener("focus", (event) => {
  if (email) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
});

comment.addEventListener("blur", (event) => {
  if (checkLength(comment.value, 1)) {
    commentError.style.display = "none";
  } else {
    commentError.style.display = "block";
  }
});

comment.addEventListener("focus", (event) => {
  if (comment) {
    commentError.style.display = "none";
  } else {
    commentError.style.display = "block";
  }
});

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const checkPattern = regEx.test(email);
  return checkPattern;
}