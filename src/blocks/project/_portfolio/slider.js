// SLider
$(document).ready(function () {
  $(".slider").slick({
    arrows: true,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "0px",
    speed: 1000,
    easing: "ease",
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: false,
    appendArrows: $(".portfolio__container"),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          speed: 800,
          touchThreshold: 10,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          speed: 600,
        },
      },
    ],
  });
});
