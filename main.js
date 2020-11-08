"use strict";
// Home observer 홈 섹션 옵저버 적용
const home = document.querySelector("#home");
const homeBg = document.querySelector(".home__bg");
const homeInner = document.querySelector(".home__inner");
const homeHello = document.querySelector("#home > p");

const options = {
  threshold: 1,
};
const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      homeBg.classList.remove("invisible");
      homeHello.style.transform = "translateY(30%)";
    } else {
      entry.target.classList.remove("visible");
      homeBg.classList.add("invisible");
      homeHello.style.transform = "translateY(0)";
    }
  });
};
const homeInnerObserver = new IntersectionObserver(callback, options);
homeInnerObserver.observe(homeInner);

// resize change height - 화면 리사이즈시 높이 변수값 변경

let homeHeight = home.getBoundingClientRect().height;
let screenHeight = window.innerHeight;
let halfHeight = screenHeight / 2;
window.addEventListener("resize", () => {
  homeHeight = home.getBoundingClientRect().height;
  screenHeight = window.innerHeight;
  halfHeight = screenHeight / 2;
});

// Scroll Down Event - 스크롤 다운 이벤트
const sections = document.querySelectorAll(".section");
const sectionArrReverse = Array.from(sections).reverse();
const header = document.querySelector("#header");
const scrollUpBtn = document.querySelector(".scroll-up-btn");
const scrollDownIcon = document.querySelector(".scroll-down");

document.addEventListener("scroll", () => {
  let scrollY =
    (window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop) + screenHeight;

  // not scroll top 0 - 스크롤탑이 0이 아닐때
  if (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop > 0
  ) {
    header.classList.add("not-scroll-0");
    scrollUpBtn.classList.add("not-scroll-0");
  } else {
    header.classList.remove("not-scroll-0");
    scrollUpBtn.classList.remove("not-scroll-0");
  }

  // scrollDownIcon fix - 스크롤 다운 아이콘 고정
  if (scrollY > homeHeight) {
    if (window.getComputedStyle(scrollDownIcon).position === "fixed")
      scrollDownIcon.style.position = "absolute";
  } else {
    if (window.getComputedStyle(scrollDownIcon).position === "absolute")
      scrollDownIcon.style.position = "fixed";
  }

  // current section indicate - 현재 섹션위치 표시
  pageIndicate();
});

function pageIndicate() {
  let height =
    (window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop) + halfHeight;
  for (let i = 0; i < sectionArrReverse.length; i++) {
    let offsetTop = sectionArrReverse[i].offsetTop;
    if (height > offsetTop) {
      let currentNav = document.querySelector(".header__item.active");
      let postNav = document.querySelector(
        `.header__item[data-link="#${sectionArrReverse[i].id}"]`
      );
      currentNav.classList.remove("active");
      postNav.classList.add("active");
      break;
    }
  }
}

// Scroll To Event (click) - 해당 위치로 스크롤이동 이벤트
const headerNav = document.querySelector(".header__nav");
const navToggleBtn = document.querySelector(".header__nav-btn");

headerNav.addEventListener("click", event => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) return;
  navToggleBtn.classList.remove("open");
  scrollIntoView(link);
});

scrollUpBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

function scrollIntoView(selector) {
  const scrollInto = document.querySelector(selector);
  scrollInto.scrollIntoView({ behavior: "smooth" });
}

// Mobile nav menu clickEvent - 모바일 네비 클릭이벤트
navToggleBtn.addEventListener("click", () => {
  navToggleBtn.classList.toggle("open");
});

// Project filtering - 프로젝트 필터링
const workCategory = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project__item");

workCategory.addEventListener("click", event => {
  const target = event.target;
  const filter = target.dataset.filter;
  if (!filter) return;
  projectContainer.classList.add("animate-out");
  setTimeout(() => {
    onClickCategory(target);
    onFilterProject(filter);
    projectContainer.classList.remove("animate-out");
  }, 300);
});

function onClickCategory(selector) {
  const selectedCategory = document.querySelector(".category__btn.selected");
  selectedCategory.classList.remove("selected");
  selector.classList.add("selected");
}

function onFilterProject(filter) {
  projects.forEach(project => {
    if (filter === "*" || project.dataset.type.includes(filter)) {
      project.classList.remove("invisible");
    } else {
      project.classList.add("invisible");
    }
  });
}
