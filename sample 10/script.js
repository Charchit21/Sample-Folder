'use strict';

/////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');

const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////
////Button Scroll 



btnScrollTo.addEventListener('click', function (e){
    const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);

    // window.scrollTo(
    //     s1coords.left + window.pageXOffset,
    //     s1coords.top + window.pageYOffset
    // );

    //making it an objects helps to implement behaviour
    // window.scrollTo({     
    //    left : s1coords.left + window.pageXOffset,
    //    top :  s1coords.top + window.pageYOffset,
    //    behavior : 'smooth'
    // });

    //modern way / only in modern browser
    section1.scrollIntoView({behavior : 'smooth'});
});


////////////////////////////////////////////////////
//Page Navigation

//////Buttons////////

//Below method will work smoothly with small number of buttons but not in case of a lot.

// document.querySelectorAll('.nav__link').forEach
// (function (el) {
//  el.addEventListener('click',function (e){
//    e.preventDefault();
//    const id = this.getAttribute('href');
//    document.querySelector(id).scrollIntoView({
//      behavior : 'smooth'});
//  })
// });

document.querySelector('.nav__links').addEventListener
('click', function  (e) {
e.preventDefault();
if(e.target.classList.contains('nav__link')){
   const id = e.target.getAttribute('href');
   document.querySelector(id).scrollIntoView({
     behavior : 'smooth'});
}
});



// /////////////////////////////////////////////////////
// //cookie message

// const header = document.querySelector('.header') ;
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// const allButtons = document.getElementsByTagName('.button');
// console.log(allButtons);
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// //  message.textContent  = 'We use cookies for improved functionality and analytics';
// message.innerHTML  = 'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it! </button>';

// // header.prepend(message);
// header.append(message);
// // header.prepend(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// //Delete element
// document.querySelector('.btn--close-cookie').addEventListener('click' , function () {
//     message.remove();
// });

// //styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '104.1%';

// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// // const h1 = document.querySelector('h1');
// // h1.addEventListener('mouseenter', function(){
// // });


//////////////////////////////////////////////////////
//Operations

//tabs
tabsContainer.addEventListener('click', function (e) {
const clicked  = e.target.closest('.operations__tab');
console.log(clicked);
//incase of null
if(!clicked)
return;
//remove active class
tabs.forEach( t => t.classList.remove
  ('operations__tab--active'));
  tabsContent.forEach( t => t.classList.remove('operations__content--active'));
clicked.classList.add('operations__tab--active');
//activating content area
document
.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active');
});

// tabsContainer.addEventListener('hover', function (e){
// const hover = e.target.closest('.operations__tab');
// });

//////////////////////////////////////////////////
//Menu fading

const handleHover = function (e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
 //reducing opacity
  siblings.forEach(el => {
    if(el !== link )
      el.style.opacity = this;    
  });
  logo.style.opacity = this;
  }
};
//bind returns new function so better than callback function.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
///instead of callback function binding method can be used like above.
// nav.addEventListener('mouseover', function(e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function(e) {
//   handleHover(e, 1);
// });


//////////////////////////////////////////////////
//sticking navigation to the top

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries){
  const [entry] = entries;
  console.log(entry);
if (!entry.isIntersecting)
nav.classList.add('sticky');
else 
nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(
  stickyNav, {
    root : null,
    threshold : 0,
    rootMargin : `-${navHeight}px`,
  });
  headerObserver.observe(header);

/// Intersection observer Ex
// const obsCallback  = function (entries, observer) {
//   entries.forEach(entry => {
//    console.log(entry);
//   });
// };

// const obsOptions = {
//   root : null,
//   threshold: [0, 0.2] ,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

////scroll event is not efficient.
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (){
// if (window.scrollY > initialCoords.top)
// nav.classList.add('sticky');
// else{
//   nav.classList.remove('sticky');
// }
// });


////////////////////////////////////////////////////////
//Revealing Content
const revealSection = function (entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
   root : null, 
   threshold : 0.15,
 });
 allSections.forEach(function (section) {
 sectionObserver.observe(section);
 section.classList.add('section--hidden');
});


 //////////////////////////////////////////////////////
 //Image Loading

const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
 const [entry] = entries;
 if(!entry.isIntersecting) return;
 entry.target.src = entry.target.dataset.src;
 
 entry.target.addEventListener('load', function(){
 entry.target.classList.remove('lazy-img');
 });
 observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver (loading , {
  root : null,
  threshold : 0,
  // rootMargin : '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////
//slider
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

// slides.forEach((s, i) => (s.style.transform = 
// `translateX(${100 * i}%)`));

//Dots
const sliders = function () {
const createDots = function () {
  slides.forEach(function (_, i){
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class = "dots__dot" data-slide="${i}"> </button>`)
  });
};
createDots();
const activateDot = function(slide) {
   document.querySelectorAll('.dots__dot')
   .forEach(dot => dot.classList.remove('dots__dot--active'));

   document.querySelector(`.dots__dot[data-slide= "${slide}"]`)
   .classList.add('dots__dot--active');
}

activateDot(0);
const goToSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform = 
  `translateX(${100 * (i - slide)}%)`));
};

goToSlide(0);

const nextSlide = function() {
  if( curSlide === maxSlide - 1){
    curSlide = 0;
  }
  else {
    curSlide++;
  };
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0 ) {
    curSlide = maxSlide - 1;
  } 
  else 
  {
   curSlide--;
  }
goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

//sliding with keys 
document.addEventListener('keydown', function (e) {
console.log(e);
if (e.key === 'ArrowLeft') prevSlide();
e.key === 'ArrowRight' && nextSlide();
});

///Dots of Slide


dotContainer.addEventListener('click', function(e){
 if(e.target.classList.contains('dots__dot')){
   const {slide} = e.target.dataset;
   goToSlide(slide);
   activateDot(slide);
 }
});
};
sliders();
////////////////////////////////////////////////
///tryinging out stuffs

const h1 = document.querySelector('h1');
//Parent to ChildNodes
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

//child to parent
console.log(h1.parentNode);
console.log(h1.parentElement);
//  
//child to child
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
//nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);