$(function () {
  $(".footer__menu__link").click(function (e) {
    animateAnchorScroll($(e.target));
  });

  function animateAnchorScroll(el) {
    $("html,body").animate(
      {
        scrollTop: $(el.attr("href")).offset().top - 100,
      },
      800
    );
  }
});
