const allImages = [
  "../assets/images/image1.jpg",
  "../assets/images/image2.jpg",
  "../assets/images/image3.jpg",
  "../assets/images/image4.jpg",
  "../assets/images/image5.jpg",
  "../assets/images/image6.jpg",
  "../assets/images/image7.jpg",
  "../assets/images/image8.jpg",
  "../assets/images/image9.jpg",
  "../assets/images/image10.jpg",
  "../assets/images/image11.jpg",
  "../assets/images/image12.jpg",
];

const galleryGrid = document.querySelector(".gallery-grid");
const currentPageDisplay = document.getElementById("current-page");
const totalPagesDisplay = document.querySelector(".pagination .total");
const prevButton = document.querySelector(".pagination .prev");
const nextButton = document.querySelector(".pagination .next");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

let currentPage = 1;
let imagesPerPage = 10;
let currentIndex = 0;

function updateImagesPerPage() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 1100) {
    imagesPerPage = 6;
  } else {
    const columns = getComputedStyle(galleryGrid)
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    imagesPerPage = columns * 2;
  }
}

function renderGallery() {
  updateImagesPerPage();
  galleryGrid.innerHTML = "";
  const start = (currentPage - 1) * imagesPerPage;
  const end = start + imagesPerPage;
  const imagesToShow = allImages.slice(start, end);

  imagesToShow.forEach((src, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = "Gallery Image";
    imgElement.classList.add("gallery-item-img");
    imgElement.addEventListener("click", () => openLightbox(start + index));

    const div = document.createElement("div");
    div.classList.add("gallery-item");
    div.appendChild(imgElement);
    galleryGrid.appendChild(div);
  });

  currentPageDisplay.textContent = String(currentPage).padStart(2, "0");
  totalPagesDisplay.textContent = String(
    Math.ceil(allImages.length / imagesPerPage)
  ).padStart(2, "0");
}

function openLightbox(index) {
  lightbox.style.display = "flex";
  currentIndex = index;
  lightboxImage.src = allImages[currentIndex];
}

document.querySelector(".close").onclick = () =>
  (lightbox.style.display = "none");
document.querySelector(".prev-light").onclick = () => changeLightboxImage(-1);
document.querySelector(".next-light").onclick = () => changeLightboxImage(1);

function changeLightboxImage(step) {
  currentIndex = (currentIndex + step + allImages.length) % allImages.length;
  lightboxImage.src = allImages[currentIndex];
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderGallery();
    scrollToTop();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < Math.ceil(allImages.length / imagesPerPage)) {
    currentPage++;
    renderGallery();
    scrollToTop();
  }
});

function scrollToTop() {
  window.scrollTo({
    top: document.querySelector(".gallery-title").offsetTop - 100,
    behavior: "smooth",
  });
}

function addNewImage(imageSrc) {
  allImages.unshift(imageSrc);
  currentPage = 1;
  renderGallery();
}

window.addEventListener("resize", renderGallery);

renderGallery();
