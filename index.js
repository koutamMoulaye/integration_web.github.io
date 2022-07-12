
// images slide
$(document).ready(function() {
  var $firstSlide = $('.carousel li').first(),
    $lastSlide = $('.carousel li').last(),
    $slideWidth = $('.carousel-container').width(),
    $numOfSlides = $('.carousel li').length;
  $('.carousel-container').after('<ul class="thumbnails"></ul>');

  $('.carousel li').each(function(index) {
    $this = $(this);
    $this.addClass('slide-' + index);
    $this.clone().appendTo('.thumbnails');
  });

  function slideResize() {
    $slideWidth = $('.carousel-container').width();
    $('.carousel li').css('width', $slideWidth);
    $('.arrow').css('height', '100%');
  }
  
  $('.thumbnails li').first().addClass('active');
  slideResize();

  $firstSlide.addClass('active');
  $lastSlide.insertBefore($firstSlide);

  $('.carousel').css('margin-left', '-100%');

  $(window).on('resize', slideResize);
  
  function nextSlide(interval, iterations) {
    var howMany = 0;

    function goNext() {
      $firstSlide = $('.carousel li').first();
      $lastSlide = $('.carousel li').last();
      
      slideResize();
      $('.arrow').hide();
      $firstSlide.animate({
        width: "0"
      }, interval, function() {

        $firstSlide.insertAfter($lastSlide);
        $firstSlide.css('width', $slideWidth);

        $('.carousel li.active').next('li').addClass('active');
        $('.carousel li.active').first().removeClass('active');

        if ($('.thumbnails li').last().hasClass('active')) {
          $('.thumbnails li').removeClass('active');
          $('.thumbnails li').first().addClass('active');
        } else {
          $('.thumbnails li.active').next('li').addClass('active');
          $('.thumbnails li.active').first().removeClass('active');
        }
        howMany++;
        if (howMany < iterations) {
          goNext();
        } else {
        $('.arrow').show();
        }
      });
    }
    goNext();
  }

  function prevSlide(interval, iterations) {
    var howMany = 0;

    function goPrev() {
      $firstSlide = $('.carousel li').first();
      $lastSlide = $('.carousel li').last();
      
      slideResize();
      $('.arrow').hide();
      var $prevSlide = $('.active').prev();
      $lastSlide.css('width', '0');
      $lastSlide.insertBefore($firstSlide);
      $lastSlide.animate({
        width: $slideWidth
      }, interval, function() {
        $('.carousel li.active').prev('li').addClass('active');
        $('.carousel li.active').last().removeClass('active');

        if ($('.thumbnails li').first().hasClass('active')) {
          $('.thumbnails li').removeClass('active');
          $('.thumbnails li').last().addClass('active');
        } else {
          $('.thumbnails li.active').prev('li').addClass('active');
          $('.thumbnails li.active').last().removeClass('active');
        }
        howMany++;
        if (howMany < iterations) {
          goPrev();
        } else {
        $('.arrow').show();
        }
      });
    }
    goPrev();
  }
    $('.carousel-container').on('swipeleft', function() {
      if ($('li:animated').length === 0) {
    nextSlide(1000);
      } else {
        return;
      }
  });

  $('.carousel-container').on('swiperight', function() {
    if ($('li:animated').length === 0) {
    prevSlide(1000);
    } else {
      return;
    }
  });
  
  $('.right-arrow').on('click', function() {
    nextSlide(1000);
  });

  $('.left-arrow').on('click', function() {
    prevSlide(1000);
  });

  $('body').on('click', '.thumbnails li', function() {

    var $this = $(this),
      $desiredSlideIndex = $this.index(),
      $currentSlideIndex = $('ul.thumbnails li.active').index(),
      slideDifference = $desiredSlideIndex - $currentSlideIndex;

    console.log('desired slide: ' + $desiredSlideIndex);
    console.log('current slide: ' + $currentSlideIndex);
    console.log('slide difference: ' + slideDifference);
    if (slideDifference > 0) {
      nextSlide(500, slideDifference);
    } else if (slideDifference < 0) {
      slideDifference = slideDifference * -1;  
      prevSlide(500, slideDifference);
    } else {
      return;
    }
  });

});
// ///////////////////////////PARTIE REPONSIVE///////////////////////////

let toggle = document.querySelector('.toggle');
let body = document.querySelector('body');

toggle.addEventListener('click', function() {
    body.classList.toggle('open');
})

// ////////////////////image carousel responsive////////////////////
let img__slider= document.getElementsByClassName('img__slider');
console.log(img__slider);

let etape = 0;

let nbr__img = img__slider.length;

let precedent = document.querySelector('.precedent');
let suivant = document.querySelector('.suivant');


function enleverActiveImages() {
  for(let i = 0 ; i < nbr__img ; i++){
    img__slider[i].classList.remove('active');
  } 
}

suivant;addEventListener('click', function(){
  etape++;
  if(etape>= nbr__img){
    etape = 0;
  }
  enleverActiveImages();
  img__slider[etape].classList.add('active');
})
setInterval(function(){
  etape++;
  if(etape>= nbr__img){
    etape = 0;
  }
  enleverActiveImages();
  img__slider[etape].classList.add('active');
}, 5000)
// /////////////////////////////////////////POP UP PARTIE/////////////////
$(".Click-here").on('click', function() {
  $(".custom-model-main").addClass('model-open');
}); 
$(".close-btn, .bg-overlay").click(function(){
  $(".custom-model-main").removeClass('model-open');
});
// /////////////////////////////pop up slide/////////////////////////////
const carousel = document.querySelector(".c-carousel");
const nextButton = document.querySelector(".c-carousel-control-next");
const prevButton = document.querySelector(".c-carousel-control-prev");
const carouselItems = document.querySelectorAll(".c-carousel-item");
const carouselImages = document.querySelectorAll(".c-carousel-item img");
const indicatorLi = document.querySelectorAll(".c-carousel-indicator-li");
const indicatorUl = document.querySelector(".c-carousel-indicators ul");
var itemCount = carouselItems.length;
var timeCount = 0;
var autoTimer ="0";
var indicatorUlWidth = indicatorUl.offsetWidth;
var tempUrl = "";
var imgCounter = 0;
var timeInterval = 0;
var imgUrls = [];
var indicatorWidth = indicatorUlWidth/(itemCount+1.5);

carouselImages.forEach((item, i) => {
  imgUrls[i] = item.src;
});

function autoNext(){
  var itemIndex = 0;
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex++;
  if(itemIndex >= itemCount)
  {
    itemIndex = 0;
  }
  addActiveStatus(itemIndex);
}

if(carousel.hasAttribute('data-interval')){
  timeInterval = carousel.getAttribute('data-interval');
  autoTimer = setInterval(autoNext,timeInterval);
}

window.addEventListener('resize',()=>{
  indicatorUlWidth = indicatorUl.offsetWidth;
  indicatorWidth = indicatorUlWidth/(itemCount+1.5);
  indicatorLi.forEach((item, i) => {
    item.style.width = indicatorWidth+"px";
    item.style.height = (indicatorWidth/1.777)+"px";
  });
});

indicatorLi.forEach((item, i) => {
  item.style.width = indicatorWidth+"px";
  item.style.height = (indicatorWidth/1.777)+"px";
  tempUrl = imgUrls[i];
  item.style.backgroundImage = "url('" + tempUrl + "')";
  item.addEventListener('click',()=>{
    removeActiveStatus();
    addActiveStatus(i);
    clearInterval(autoTimer);
    autoTimer = setInterval(autoNext,5000);
  })
});

nextButton.addEventListener('click',() =>{
  var itemIndex = 0;
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex++;
  if(itemIndex >= itemCount)
  {
    itemIndex = 0;
  }
  addActiveStatus(itemIndex);
  clearInterval(autoTimer);
  autoTimer = setInterval(autoNext,5000);
});

prevButton.addEventListener('click',()=> {
  carouselItems.forEach((item, i) => {
    if(item.classList.contains("active"))
    {
      itemIndex = i;
    }
  });
  removeActiveStatus();
  itemIndex--;
  if(itemIndex < 0){
    itemIndex = itemCount-1;
  }
  addActiveStatus(itemIndex);
  clearInterval(autoTimer);
  autoTimer = setInterval(autoNext,5000);
});

function removeActiveStatus(){
  carouselItems.forEach((item, i) => {
    item.classList.remove("active");
    indicatorLi[i].classList.remove("active");
  });
}

function addActiveStatus(target){
  carouselItems[target].classList.add("active");
  indicatorLi[target].classList.add("active");
}
