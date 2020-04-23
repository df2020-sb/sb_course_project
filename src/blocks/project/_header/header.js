$(document).ready(function () {
  // SLIDE MENU
  $(".slide-menu__item").click(function (e) {
    animateAnchorScroll($(e.target));
  });
  // Close slide menu on body click
  $("body").click(function (e) {
    if (
      !$(e.target).is(".navbar__menu__button") &&
      $(".slide-menu").hasClass("slide-menu_active")
    ) {
      $(".slide-menu").removeClass("slide-menu_active");
    }
  });
  // CLose slide menu on window resize
  $(window).on("resize", function () {
    if ($(window).width() >= 1200) {
      $(".slide-menu").removeClass("slide-menu_active");
    }
  });

  // NAVBAR FIXED MENU
  $(".navbar__menu__item").click(function (e) {
    animateAnchorScroll($(e.target));
    toggleNavbarItems($(e.target));
  });

  $(".navbar__menu__button").click(function () {
    $(".slide-menu").toggleClass("slide-menu_active");
  });

  // Toggle on Scroll
  var debounce_timer;

  $(window).scroll(function () {
    $(".navbar").css("top", "0px");
    if (debounce_timer) {
      window.clearTimeout(debounce_timer);
    }
    debounce_timer = window.setTimeout(function () {
      if ($(window).scrollTop() == 0) {
        $(".navbar__menu__item").removeClass("navbar__menu__item_active");
      } else if (isScrolledIntoView($(".services"))) {
        toggleNavbarItems($(".menu-services"));
      } else if (isScrolledIntoView($(".portfolio"))) {
        toggleNavbarItems($(".menu-portfolio"));
      } else if (isScrolledIntoView($(".price"))) {
        toggleNavbarItems($(".menu-price"));
      } else return;
    }, 50);
  });

  function toggleNavbarItems(elem) {
    $(elem).addClass("navbar__menu__item_active");
    $(elem).siblings().removeClass("navbar__menu__item_active");
  }

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    // var elemBottom = elemTop + $(elem).height();
    return elemTop <= docViewBottom + 200 && elemTop >= docViewTop;
  }
  // Animate Scroll
  function animateAnchorScroll(el) {
    $("html,body").animate(
      {
        scrollTop: $(el.attr("href")).offset().top - 100,
      },
      800
    );
  }

  // Remove decor animation on ios
  if (navigator.userAgent.match(/(iPhone|iPad)/)) {
    $(".hero__image__gradient-bg").addClass("hero__image__gradient-bg-ios");
    $(".hero__decor__hash").addClass("hero__decor__hash-ios");
    $(".hero__decor__hash-2").addClass("hero__decor__hash-2-ios");
    $(".hero__decor__div").addClass("hero__decor__div-ios");
    $(".hero__decor__div-2").addClass("hero__decor__div-2-ios");
    $(".hero__decor__brackets-1").addClass("hero__decor__brackets-1-ios");
    $(".hero__decor__brackets-2").addClass("hero__decor__brackets-2-ios");
    $(".hero__decor__html").addClass("hero__decor__html-ios");
    $(".hero__decor__html-2").addClass("hero__decor__html-2-ios");
  }
});
