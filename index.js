
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
