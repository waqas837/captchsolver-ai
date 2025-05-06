(function ($) {
  "use strict";

  var rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      rtsJs.stickyHeader();
      rtsJs.backToTopInit();
      rtsJs.swiperJs();
      rtsJs.textAnimation();
      rtsJs.vedioActivation();
      rtsJs.metismenu();
      rtsJs.sideMenu();
      rtsJs.audioGenerate();
    },

    // sticky header activation
    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $(".header--sticky").addClass("sticky");
        } else {
          $(".header--sticky").removeClass("sticky");
        }
      });
    },

    backToTopInit: function () {
      $(document).ready(function () {
        "use strict";

        // Check if progressPath exists before accessing getTotalLength
        var progressPath = document.querySelector(".progress-wrap path");
        if (progressPath) {
          var pathLength = progressPath.getTotalLength();
          progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
          progressPath.style.strokeDasharray = pathLength + " " + pathLength;
          progressPath.style.strokeDashoffset = pathLength;
          progressPath.getBoundingClientRect();
          progressPath.style.transition = progressPath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";

          var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
          };

          updateProgress();
          $(window).scroll(updateProgress);
        }

        // This part is independent of progressPath and can run always
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery(".progress-wrap").addClass("active-progress");
          } else {
            jQuery(".progress-wrap").removeClass("active-progress");
          }
        });

        jQuery(".progress-wrap").on("click", function (event) {
          event.preventDefault();
          jQuery("html, body").animate({ scrollTop: 0 }, duration);
          return false;
        });
      });
    },

    swiperJs: function () {
      $(document).ready(function () {
        // Check if Swiper is defined and the element exists
        if (
          typeof Swiper !== "undefined" &&
          $(".swiper-container").length > 0
        ) {
          var menu = ["01", "02", "03"];
          var mySwiper = new Swiper(".swiper-container", {
            // If we need pagination
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              renderBullet: function (index, className) {
                return (
                  '<span class="' + className + '">' + menu[index] + "</span>"
                );
              },
            },
          });
        }
      });

      $(document).ready(function () {
        // Check if Swiper is defined and the element exists
        if (typeof Swiper !== "undefined" && $(".mySwiper-t4").length > 0) {
          var swiper = new Swiper(".mySwiper-t4", {
            slidesPerView: 4.5,
            spaceBetween: 30,
            centeredSlides: true,
            loopAdditionalSlides: 30,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            loop: true,
            breakpoints: {
              1440: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1140: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              512: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            },
          });
        }
      });
    },

    textAnimation: function () {
      $(document).ready(function () {
        var TxtRotate = function (el, toRotate, period) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 10) || 2000;
          this.txt = "";
          this.tick();
          this.isDeleting = false;
        };

        TxtRotate.prototype.tick = function () {
          var i = this.loopNum % this.toRotate.length;
          var fullTxt = this.toRotate[i];

          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }

          this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

          var that = this;
          var delta = 300 - Math.random() * 100;

          if (this.isDeleting) {
            delta /= 2;
          }

          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
          } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
          }

          setTimeout(function () {
            that.tick();
          }, delta);
        };

        // Modified to not rely on window.onload since Next.js handles loading differently
        // Instead, run this immediately since we're already in a document.ready block
        var elements = document.getElementsByClassName("txt-rotate");
        for (var i = 0; i < elements.length; i++) {
          var toRotate = elements[i].getAttribute("data-rotate");
          var period = elements[i].getAttribute("data-period");
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }

        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML =
          ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      });
    },

    vedioActivation: function (e) {
      $(".video-play-button").on("click", function (e) {
        e.preventDefault();
        $("#video-overlay, .video-overlay").addClass("open");
        $("#video-overlay, .video-overlay").append(
          '<iframe width="560" height="315" src="https://www.youtube.com/embed/UJOVNExmY8o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
        );
      });

      $(".video-overlay, .video-overlay-close").on("click", function (e) {
        e.preventDefault();
        close_video();
      });

      $(document).keyup(function (e) {
        if (e.keyCode === 27) {
          close_video();
        }
      });

      function close_video() {
        $(".video-overlay.open").removeClass("open").find("iframe").remove();
      }
    },

    metismenu: function () {
      // Check if metisMenu is defined and the element exists
      if (
        typeof $.fn.metisMenu !== "undefined" &&
        $("#mobile-menu-active").length > 0
      ) {
        $("#mobile-menu-active").metisMenu();
      }
    },

    // side menu desktop
    sideMenu: function () {
      // Menu button click handler
      $(document).on("click", "#menu-btn", function () {
        $("#side-bar").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });

      // Close icon click handler
      $(document).on("click", ".close-icon-menu", function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });

      // Anywhere home click handler
      $(document).on("click", "#anywhere-home", function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });

      // One page navigation click handler
      $(document).on("click", ".onepage .mainmenu li a", function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
    },

    audioGenerate: function () {
      $(document).ready(function () {
        var clicked_id;
        var audio_var = new Audio();

        $(".ppbutton").on("click", function () {
          var datasrc = $(this).attr("data-src");
          clicked_id = $(this).attr("id");
          console.log(clicked_id);
          audio_var.pause();

          $(".ppbutton")
            .not(this)
            .each(function () {
              $(this).removeClass("fa-pauses");
              $(this).addClass("fa-plays");
            });

          if ($(this).hasClass("fa-plays")) {
            console.log("play_click");
            audio_var.src = datasrc;
            $(this).removeClass("fa-plays");
            $(this).addClass("fa-pauses");
            console.log(audio_var);
            audio_var.play();
          } else {
            console.log("pause_click");
            $(this).removeClass("fa-pauses");
            $(this).addClass("fa-plays");
            console.log(audio_var);
            audio_var.pause();
          }
        });

        audio_var.onended = function () {
          $("#" + clicked_id).removeClass("fa-pauses");
          $("#" + clicked_id).addClass("fa-plays");
        };
      });
    },
  };

  // Modified to initialize only after document is ready
  $(document).ready(function () {
    rtsJs.m();
  });
})(jQuery, window);
