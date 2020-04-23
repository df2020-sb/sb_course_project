$(function () {
  // Form show
  $(
    ".navbar__contact__button-small, .navbar__contact__button-large, .button-o, .button:not(.contact-form__button"
  ).click(function () {
    disableScroll();
    $(".form").fadeIn(200);
  });
  // Form hide
  $(".overlay, .contact-form__close").click(function (e) {
    $(".form").fadeOut("fast");
    enableScroll();
  });
  // Submit disabled
  $(".contact-form").submit(function (e) {
    e.preventDefault();
  });

  // Form label color change
  $(".contact-form__label").click(function () {
    $(this).prev("input").focus();
    $(this).css("color", "#ff4e2e");
  });

  $(".contact-form__input").click(function () {
    $(this).focus();
    $(this).next("label").css("color", "#ff4e2e");
  });

  $(".contact-form__input").focusout(function () {
    $(this).next("label").css("color", "#8993ad");
  });

  $(".contact-form__input").focus(function () {
    $(this).next("label").css("color", "#ff4e2e");
  });

  // Remove error message if correct
  $(".contact-form__input").on("keyup", function () {
    if ($(".name").val() !== "") {
      $(".error-name").text("");
    }
    if ($(".phone").val().length == 17) {
      $(".error-phone").text("");
    }
    if ($(".mail").val() !== "") {
      $(".error-mail").text("");
    }
  });

  // Telephone input mask
  $(".phone").keydown(function (e) {
    if ($(this).val() === "" && (e.which === 55 || e.which === 56)) {
      e.preventDefault();
      $(this).val("+7 (");
    }
  });

  // Validation
  var checkName = function () {
    if ($(".name").val() === "") {
      // $(".name").focus();
      $(".error-name").text("Укажите Ваше имя");
      return false;
    } else {
      return true;
    }
  };

  var checkPhone = function () {
    if ($(".phone").val().length !== 18) {
      // $(".phone").focus();
      $(".error-phone").text("Некорректный номер");
      return false;
    } else {
      return true;
    }
  };

  var checkMail = function () {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    if (!re.test($(".mail").val())) {
      // $(".mail").focus();
      $(".error-mail").text("Некорректный адрес");
      return false;
    } else {
      return true;
    }
  };
  $(".contact-form__button").click(function () {
    checkName();
    checkPhone();
    checkMail();
    if (!checkName()) {
      $(".name").focus();
    } else if (!checkPhone()) {
      $(".phone").focus();
    } else if (!checkMail()) {
      $(".mail").focus();
    } else {
      $(".form").fadeOut("fast");
      enableScroll();
    }
  });

  // Scroll disable
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  function disableScroll() {
    if (window.addEventListener)
      // older FF
      window.addEventListener("DOMMouseScroll", preventDefault, false);

    // console.log("modernizr", Modernizr.passiveeventlisteners);

    window.addEventListener(
      "wheel",
      preventDefault,
      Modernizr.passiveeventlisteners ? { passive: false } : false
    ); // modern standard
    document.addEventListener(
      "mousewheel",
      preventDefault,
      Modernizr.passiveeventlisteners ? { passive: false } : false
    ); // older browsers, IE
    window.addEventListener(
      "mousewheel",
      preventDefault,
      Modernizr.passiveeventlisteners ? { passive: false } : false
    ); // older browsers, IE
    window.addEventListener(
      "touchmove",
      preventDefault,
      Modernizr.passiveeventlisteners ? { passive: false } : false
    ); // mobile
    document.onkeydown = preventDefaultForScrollKeys;
  }

  function enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener("DOMMouseScroll", preventDefault, false);
    document.removeEventListener("mousewheel", preventDefault, false);
    window.removeEventListener("mousewheel", preventDefault, false);
    window.removeEventListener("wheel", preventDefault, false);
    window.removeEventListener("touchmove", preventDefault, false);
    document.onkeydown = null;
  }
});
