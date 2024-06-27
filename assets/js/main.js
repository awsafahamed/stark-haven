document.addEventListener('DOMContentLoaded', function () {
  // AOS Initialization
  AOS.init();

  
  // Sticky Header
  const header = document.querySelector('header');
  const sticky = header.offsetTop;

  function stickyHeader() {
      if (window.pageYOffset > sticky) {
          header.classList.add('sticky');
      } else {
          header.classList.remove('sticky');
      }
  }

  window.onscroll = function () {
      stickyHeader();
  };

  $(document).ready(function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 50) { // Adjust the scroll value as needed
            $(".header").addClass("scrolled");
        } else {
            $(".header").removeClass("scrolled");
        }
    });
});

  
  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const duration = 4000;

  counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const startTime = Date.now();
      const endTime = startTime + duration;

      function updateCount() {
          const now = Date.now();
          const elapsed = now - startTime;
          const progress = elapsed / duration;
          const currentCount = Math.round(progress * target);

          counter.innerText = currentCount < target ? currentCount : `${target}+`;
          if (currentCount < target) setTimeout(updateCount, 20);
      }

      updateCount();
  });

  // Feature Animation on Scroll
  const features = document.querySelectorAll('.feature');

  function checkScroll() {
      const triggerBottom = window.innerHeight * 0.8;

      features.forEach(feature => {
          const featureTop = feature.getBoundingClientRect().top;
          feature.classList.toggle('active', featureTop < triggerBottom);
      });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();

  // Image Change on Left Scroll
  const leftScrollTrigger = document.getElementById('left-scroll-trigger');
  const imageToChange = document.getElementById('image-to-change');

  leftScrollTrigger.addEventListener('scroll', function() {
      const scrollPercentage = (leftScrollTrigger.scrollTop / (leftScrollTrigger.scrollHeight - leftScrollTrigger.clientHeight)) * 100;
      
      if (scrollPercentage < 33) {
          imageToChange.src = 'image1.jpg';
      } else if (scrollPercentage < 66) {
          imageToChange.src = 'image2.jpg';
      } else {
          imageToChange.src = 'image3.jpg';
      }
  });

  // Horizontal Image Slider
  const imageList = document.querySelector('.slider-wrapper .image-list');
  const slideButtons = document.querySelectorAll('.slider-wrapper .slide-button');
  let maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  function updateScrollThumbPosition() {
      const scrollPosition = imageList.scrollLeft;
      slideButtons[0].style.display = scrollPosition <= 0 ? 'none' : 'flex';
      slideButtons[1].style.display = scrollPosition >= maxScrollLeft ? 'none' : 'flex';
  }

  function slideImages(direction) {
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  slideButtons.forEach(button => {
      button.addEventListener('click', () => {
          const direction = button.id === 'prev-slide' ? -1 : 1;
          slideImages(direction);
      });
  });

  imageList.addEventListener('scroll', updateScrollThumbPosition);
  window.addEventListener('resize', () => {
      maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
      updateScrollThumbPosition();
  });
  updateScrollThumbPosition();

  // Testimonial Carousel
  $('.testi.owl-carousel').owlCarousel({
      items: 2,
      margin: 10,
      lazyLoad: true,
      dots: true,
      autoPlay: true,
      autoPlayTimeout: 3000,
      responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 2 }
      }
  });

  // Slider for changing slides automatically
  const slider = document.querySelector('.slider');
  let slideWidth = slider.clientWidth;
  let slideIndex = 0;

  function nextSlide() {
      slideIndex = (slideIndex === slider.children.length - 1) ? 0 : slideIndex + 1;
      slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
  }

  setInterval(nextSlide, 2000);

  // Tab Navigation
  const tabs = document.querySelectorAll('.nav-link');
  let tabIndex = 0;

  function showNextTab() {
      tabs.forEach(tab => {
          tab.classList.remove('active');
          const paneId = tab.getAttribute('data-bs-target');
          document.querySelector(paneId).classList.remove('show', 'active');
      });

      tabs[tabIndex].classList.add('active');
      const activePaneId = tabs[tabIndex].getAttribute('data-bs-target');
      document.querySelector(activePaneId).classList.add('show', 'active');

      tabIndex = (tabIndex + 1) % tabs.length;
  }

  showNextTab();
  setInterval(showNextTab, 3000);

  // Scrolling Content Visibility Toggle
  const scrollingContent = $('#scrolling-content');
  const imageBox = $('.image-box');

  $(window).scroll(function() {
      const windowTop = $(window).scrollTop();
      const offsetTop = scrollingContent.offset().top;
      imageBox.toggle(windowTop < offsetTop);
  });
});


let nav_toggle = document.querySelector('.nav_toggle');
let nav_toggle_icon = document.querySelector('.nav_toggle ion-icon');
let nav_menu = document.querySelector('.nav_menu');

nav_toggle.addEventListener('click', () => {
  nav_menu.classList.toggle('active');
  nav_toggle_icon.setAttribute('name',
    nav_menu.classList.contains('active') ? 'close-outline' : 'menu-outline'
  );
});