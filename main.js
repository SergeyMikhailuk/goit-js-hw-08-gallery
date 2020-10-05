import gallery from "./gallery-items.js";
const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const buttonCloseRef = document.querySelector(".js-close-button");
const imgLightboxRef = document.querySelector(".lightbox__image");
const overlayRef = document.querySelector(".lightbox__overlay");
const buttonsRef = document.querySelectorAll(".lightbox__content button");
const buttonLeft = buttonsRef[0];
const buttonRight = buttonsRef[1];
galleryRef.addEventListener("click", handlOpenModal);
buttonCloseRef.addEventListener("click", handlCloseModal);
overlayRef.addEventListener("click", handelBackdropClick);
buttonLeft.addEventListener("click", handleClickLeft);
buttonRight.addEventListener("click", handleClickRight);

let index = 0;
function findIndex() {
  index = gallery.map((item) => item.original).indexOf(imgLightboxRef.src);
}

function handleClickLeft() {
  findIndex();
  buttonRight.disabled = false;

  if (index === 0) {
    buttonLeft.disabled = true;
    return;
  }
  imgLightboxRef.src = gallery[index - 1].original;
}

function handleClickRight() {
  findIndex();
  buttonLeft.disabled = false;
  if (index === gallery.length - 1) {
    buttonRight.disabled = true;
    return;
  }
  imgLightboxRef.src = gallery[index + 1].original;
}

//Create murkup
gallery.forEach((item) => {
  const string = `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href=${item.original}
  >
    <img
      class="gallery__image"
      src=${item.preview}
      data-source=${item.original}
      alt=${item.description}
    />
  </a>
</li>
`;
  galleryRef.insertAdjacentHTML("beforeend", string);
});

function handlOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    console.log("клик не по IMG");
    return;
  }
  lightboxRef.classList.add("is-open");
  imgLightboxRef.src = evt.target.dataset.source;
  window.addEventListener("keydown", handlPressEscape);
}

function handlPressEscape(evt) {
  if (evt.code !== "Escape") {
    return;
  }
  handlCloseModal();
}

function handelBackdropClick(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  handlCloseModal();
}

function handlCloseModal() {
  window.removeEventListener("keydown", handlPressEscape);
  lightboxRef.classList.remove("is-open");
  imgLightboxRef.src = "";
}
