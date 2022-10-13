class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ["previous", "next"];
    this.carouselData = [
      {
        id: "1",
        reviewer_name: "Jenny Wilson",
        src: "/review3.svg",
        review:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et 😍. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim ❤️. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi 💓.",
        star : '/star.svg'
      },
      {
        id: "2",
        reviewer_name: "Jenny Wilson",
        src: "/review1.svg",
        review:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et 😍. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim ❤️. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi 💓.",
          star : '/star.svg'
      },
      {
        id: "3",
        reviewer_name: "Jenny Wilson",
        src: "/review2.svg",
        review:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et 😍. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim ❤️. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi 💓.",
          star : '/star.svg'
      },
    ];
    this.carouselInView = [1, 2, 3];
    this.carouselContainer;
    this.carouselPlayState;
  }
  mounted() {
    this.setupCarousel();
  }
  setupCarousel() {
    const container = document.createElement("div");
    const star = document.createElement("div");
    const text = document.createElement("div");
    const reviewer_name = document.createElement("div");
    const controls = document.createElement("div");
    this.el.append(container, text, reviewer_name, star , controls);
    container.className = "carousel-container";
    controls.className = "carousel-controls";
    this.carouselData.forEach((item, index) => {
      const carouselText = item.review
        ? document.createElement("p")
        : document.createElement("div");
      const carouselItem = item.src
        ? document.createElement("img")
        : document.createElement("div");
      const carouselstar = item.star
        ? document.createElement("img")
        : document.createElement("div");
      const carouselname = item.reviewer_name
        ? document.createElement("p")
        : document.createElement("div");

      container.append(carouselItem);
      star.append(carouselstar)
      text.append(carouselText);
      reviewer_name.append(carouselname);
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselText.className = `carousel-text carousel-text-${index + 1}`;
      carouselname.className = `carousel-name carousel-name-${index + 1}`;
      carouselstar.className = `carousel-star carousel-star-${index + 1}`;

      carouselItem.src = item.src;
      carouselText.innerHTML = item.review;
      carouselname.innerHTML = item.reviewer_name;
      carouselstar.src = item.star;
      carouselItem.setAttribute("loading", "lazy");
      carouselItem.setAttribute("data-index", `${index + 1}`);
    });
    this.carouselOptions.forEach((option) => {
      const btn = document.createElement("button");
      const axSpan = document.createElement("span");
      axSpan.innerText = option;
      axSpan.className = "ax-hidden";
      btn.append(axSpan);
      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute("data-name", option);
      controls.append(btn);
    });
    this.setControls([...controls.children]);
    this.carouselContainer = container;
    this.carouseltexts = text;
    this.carouselstars = star;
    this.carouselnames = reviewer_name;
  }
  setControls(controls) {
    controls.forEach((control) => {
      control.onclick = (event) => {
        event.preventDefault();
        this.controlManager(control.dataset.name);
      };
    });
  }
  controlManager(control) {
    if (control === "previous") return this.previous();
    if (control === "next") return this.next();
    return;
  }

  previous() {
    this.carouselData.unshift(this.carouselData.pop());
    this.carouselInView.push(this.carouselInView.shift());
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${item}`;

      this.carouselstars.children[
        index
      ].className = `carousel-star carousel-star-${item}`;

      this.carouselnames.children[
        index
      ].className = `carousel-name carousel-name-${item}`;
      this.carouseltexts.children[
        index
      ].className = `carousel-text carousel-text-${item}`;
    });
    this.carouselData.slice(0, 3).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
      document.querySelector(`.carousel-name-${index + 1}`).innerHTML =
        data.reviewer_name;
      document.querySelector(`.carousel-text-${index + 1}`).innerHTML =
        data.review;
    });
  }
  next() {
    this.carouselData.push(this.carouselData.shift());
    this.carouselInView.unshift(this.carouselInView.pop());
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${item}`;
      this.carouselstars.children[
        index
      ].className = `carousel-star carousel-star-${item}`;
      this.carouselnames.children[
        index
      ].className = `carousel-name carousel-name-${item}`;
      this.carouseltexts.children[
        index
      ].className = `carousel-text carousel-text-${item}`;
    });
    this.carouselData.slice(0, 3).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }
}
const el = document.querySelector(".carousel");
const exampleCarousel = new Carousel(el);
exampleCarousel.mounted();


const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elements-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
