;(function ($) {
	"use strict"

	/*
  |--------------------------------------------------------------------------
  | Template Name: Donaty
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Modal Video
  | 7. Scroll Up
  | 8. Donation Card
  | 9.Counter Animation
  | 10. Accordian
  | 11. Progress Bar
  | 12. Review
  | 13. Light Gallery
  | 14. Modal
  | 15. Social btns active
  | 16. Hide Mobile Menu
  | 17. Dynamic contact form
  |
  */

	/*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
	$.exists = function (selector) {
		return $(selector).length > 0
	}

	$(window).on("load", function () {
		preloader()
	})

	$(function () {
		mainNav()
		stickyHeader()
		dynamicBackground()
		slickInit()
		modalVideo()
		scrollUp()
		donationCard()
		counterInit()
		accordian()
		progressBar()
		review()
		lightGallery()
		modal()
		showHideSocialBtns()
		if ($.exists(".wow")) {
			new WOW().init()
		}
	})

	$(window).on("scroll", function () {
		hideMenu()
		showScrollUp()
	})

	/*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
	function preloader() {
		$(".cs_preloader").fadeOut()
		$("cs_preloader_in").delay(150).fadeOut("slow")
	}

	/*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
	function mainNav() {
		$(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>')
		$(".menu_item_has_children").append(
			'<span class="cs_menu_dropdown_toggle"><span></span></span>'
		)
		$(".cs_menu_toggle").on("click", function () {
			$(this)
				.toggleClass("cs_toggle_active")
				.siblings(".cs_nav_list")
				.toggleClass("cs_active")
			$(".cs_main_header").toggleClass("active")
		})
		$(".cs_menu_dropdown_toggle").on("click", function () {
			$(this).toggleClass("active").siblings("ul").slideToggle()
			$(this).parent().toggleClass("active")
		})

		/* Side Nav */
		$(".cs_hamburger_btn").on("click", function () {
			$(".cs_side_header").addClass("active")
			$("html").addClass("cs_hamburger_active")
		})
		$(".cs_close, .cs_side_header_overlay").on("click", function () {
			$(".cs_side_header").removeClass("active")
			$("html").removeClass("cs_hamburger_active")
		})
	}

	/*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
	function stickyHeader() {
		var $window = $(window)
		var lastScrollTop = 0
		var $header = $(".cs_sticky_header")
		var headerHeight = $header.outerHeight() + 20

		$window.scroll(function () {
			var windowTop = $window.scrollTop()

			if (windowTop >= headerHeight) {
				$header.addClass("cs_gescout_sticky")
				$(".cs_main_header").removeClass("active")
			} else {
				$header.removeClass("cs_gescout_sticky")
				$header.removeClass("cs_gescout_show")
			}

			if ($header.hasClass("cs_gescout_sticky")) {
				if (windowTop < lastScrollTop) {
					$header.addClass("cs_gescout_show")
				} else {
					$header.removeClass("cs_gescout_show")
				}
			}
			lastScrollTop = windowTop
		})
	}

	/*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
	function dynamicBackground() {
		$("[data-src]").each(function () {
			var src = $(this).attr("data-src")
			$(this).css({
				"background-image": "url(" + src + ")",
			})
		})
	}

	/*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
	function slickInit() {
		if ($.exists(".cs_slider")) {
			$(".cs_slider").each(function () {
				// Slick Variable
				var $ts = $(this).find(".cs_slider_container")
				var $slickActive = $(this).find(".cs_slider_wrapper")
				// Auto Play
				var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10)
				// Auto Play Time Out
				var autoplaySpdVar = 3000
				if (autoPlayVar > 1) {
					autoplaySpdVar = autoPlayVar
					autoPlayVar = 1
				}
				// Slide Change Speed
				var speedVar = parseInt($ts.attr("data-speed"), 10)
				// Slider Loop
				var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10))
				// Slider Center
				var centerVar = Boolean(parseInt($ts.attr("data-center"), 10))
				// Variable Width
				var variableWidthVar = Boolean(
					parseInt($ts.attr("data-variable-width"), 10)
				)
				// Pagination
				var paginaiton = $(this)
					.find(".cs_pagination")
					.hasClass("cs_pagination")
				// Slide Per View
				var slidesPerView = $ts.attr("data-slides-per-view")
				if (slidesPerView == 1) {
					slidesPerView = 1
				}
				if (slidesPerView == "responsive") {
					var slidesPerView = parseInt(
						$ts.attr("data-add-slides"),
						10
					)
					var lgPoint = parseInt($ts.attr("data-lg-slides"), 10)
					var mdPoint = parseInt($ts.attr("data-md-slides"), 10)
					var smPoint = parseInt($ts.attr("data-sm-slides"), 10)
					var xsPoing = parseInt($ts.attr("data-xs-slides"), 10)
				}
				// Fade Slider
				var fadeVar = parseInt($($ts).attr("data-fade-slide"))
				fadeVar === 1 ? (fadeVar = true) : (fadeVar = false)

				// Slick Active Code
				$slickActive.slick({
					autoplay: autoPlayVar,
					dots: paginaiton,
					centerPadding: "28%",
					speed: speedVar,
					infinite: loopVar,
					autoplaySpeed: autoplaySpdVar,
					centerMode: centerVar,
					fade: fadeVar,
					prevArrow: $(this).find(".cs_left_arrow"),
					nextArrow: $(this).find(".cs_right_arrow"),
					appendDots: $(this).find(".cs_pagination"),
					slidesToShow: slidesPerView,
					variableWidth: variableWidthVar,
					swipeToSlide: true,
					responsive: [
						{
							breakpoint: 1600,
							settings: {
								slidesToShow: lgPoint,
							},
						},
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: mdPoint,
							},
						},
						{
							breakpoint: 992,
							settings: {
								slidesToShow: smPoint,
							},
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: xsPoing,
							},
						},
					],
				})
			})
		}
	}

	/*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
	function modalVideo() {
		if ($.exists(".cs_video_open")) {
			$("body").append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup-container">
              <div class="cs_video_popup-align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup-close"></div>
            </div>
          </div>
        </div>
      `)
			$(document).on("click", ".cs_video_open", function (e) {
				e.preventDefault()
				var video = $(this).attr("href")

				$(".cs_video_popup-container iframe").attr("src", `${video}`)

				$(".cs_video_popup").addClass("active")
			})
			$(".cs_video_popup-close, .cs_video_popup-layer").on(
				"click",
				function (e) {
					$(".cs_video_popup").removeClass("active")
					$("html").removeClass("overflow-hidden")
					$(".cs_video_popup-container iframe").attr(
						"src",
						"about:blank"
					)
					e.preventDefault()
				}
			)
		}
	}

	/*--------------------------------------------------------------
    7. Scroll Up
  --------------------------------------------------------------*/
	function scrollUp() {
		$(".cs_scrollup").on("click", function (e) {
			e.preventDefault()
			$("html,body").animate(
				{
					scrollTop: 0,
				},
				0
			)
		})
	}
	/* For Scroll Up */
	function showScrollUp() {
		let scroll = $(window).scrollTop()
		if (scroll >= 350) {
			$(".cs_scrollup").addClass("cs_scrollup_show")
		} else {
			$(".cs_scrollup").removeClass("cs_scrollup_show")
		}
	}

	/*--------------------------------------------------------------
    8. Donation Card
  --------------------------------------------------------------*/
	function donationCard() {
		// Update the value when a different radio button is selected
		$(".cs_fixed_amount_check").on("change", function () {
			var selectedValue = $(this).val()
			$(".cs_input_amount").val("$" + selectedValue)
		})

		// Handle the custom amount button click
		$('.cs_custom_amount_btn[type="button"]').on("click", function () {
			$(".cs_input_amount").prop("disabled", false).val("").focus()
			$(".cs_fixed_amount_check").prop("checked", false)
		})
	}

	/*--------------------------------------------------------------
    9. Counter Animation
  --------------------------------------------------------------*/
	function counterInit() {
		if ($.exists(".odometer")) {
			$(window).on("scroll", function () {
				function winScrollPosition() {
					var scrollPos = $(window).scrollTop(),
						winHeight = $(window).height()
					var scrollPosition = Math.round(scrollPos + winHeight / 1.2)
					return scrollPosition
				}

				$(".odometer").each(function () {
					var elemOffset = $(this).offset().top
					if (elemOffset < winScrollPosition()) {
						$(this).html($(this).data("count-to"))
					}
				})
			})
		}
	}

	/*--------------------------------------------------------------
    10. Accordian
  --------------------------------------------------------------*/
	function accordian() {
		$(".cs_accordian").children(".cs_accordian_body").hide()
		$(".cs_accordian.active").children(".cs_accordian_body").show()
		$(".cs_accordian_head").on("click", function () {
			$(this)
				.parent(".cs_accordian")
				.siblings()
				.children(".cs_accordian_body")
				.slideUp(250)
			$(this).siblings().slideDown(250)
			$(this)
				.parent()
				.parent()
				.siblings()
				.find(".cs_accordian_body")
				.slideUp(250)
			/* Accordian Active Class */
			$(this).parents(".cs_accordian").addClass("active")
			$(this).parent(".cs_accordian").siblings().removeClass("active")
		})
	}

	/*--------------------------------------------------------------
    11. Progress Bar
  --------------------------------------------------------------*/
	function progressBar() {
		$(".cs_progress").each(function () {
			var progressPercentage = $(this).data("progress") + "%"
			$(this).find(".cs_progress_in").css("width", progressPercentage)
		})
	}

	/*--------------------------------------------------------------
    12. Review
  --------------------------------------------------------------*/
	function review() {
		$(".cs_rating").each(function () {
			var review = $(this).data("rating")
			var reviewVal = review * 20 + "%"
			$(this).find(".cs_rating_percentage").css("width", reviewVal)
		})
	}

	/*--------------------------------------------------------------
    13. Light Gallery
  --------------------------------------------------------------*/
	function lightGallery() {
		$(".cs_gallery_list").each(function () {
			$(this).lightGallery({
				selector: ".cs_gallery_item",
				subHtmlSelectorRelative: false,
				thumbnail: false,
				mousewheel: true,
			})
		})
	}

	/*--------------------------------------------------------------
   14. Modal
 --------------------------------------------------------------*/
	function modal() {
		$(".cs_modal_btn").on("click", function () {
			var modalData = $(this).attr("data-modal")
			$(`[data-modal='${modalData}']`).addClass("active")
			$(this).parents(".cs_modal").removeClass("active")
		})
		$(".cs_close_modal, .cs_close_overlay").on("click", function () {
			var modalData = $(this).parents(".cs_modal").attr("data-modal")
			$(`[data-modal='${modalData}']`).removeClass("active")
		})
	}
	/*--------------------------------------------------------------
   15. Social btns active
 --------------------------------------------------------------*/
	function showHideSocialBtns() {
		$(".cs_share_btn").on("click", function () {
			$(this).siblings("a").toggleClass("active")
		})
	}

	/*--------------------------------------------------------------
    16. Hide Mobile Menu
  --------------------------------------------------------------*/
	function hideMenu() {
		let scroll = $(window).scrollTop()
		if (scroll >= 10) {
			$(".cs_nav_list").removeClass("cs_active")
			$(".cs_menu_toggle").removeClass("cs_toggle_active")
		}
	}
	/*--------------------------------------------------------------
    17. Dynamic contact form
  --------------------------------------------------------------*/
	if ($.exists("#cs_form")) {
		const form = document.getElementById("cs_form")
		const result = document.getElementById("cs_result")

		form.addEventListener("submit", function (e) {
			const formData = new FormData(form)
			e.preventDefault()
			var object = {}
			formData.forEach((value, key) => {
				object[key] = value
			})
			var json = JSON.stringify(object)
			result.innerHTML = "Please wait..."

			fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: json,
			})
				.then(async (response) => {
					let json = await response.json()
					if (response.status == 200) {
						result.innerHTML = json.message
					} else {
						console.log(response)
						result.innerHTML = json.message
					}
				})
				.catch((error) => {
					console.log(error)
					result.innerHTML = "Something went wrong!"
				})
				.then(function () {
					form.reset()
					setTimeout(() => {
						result.style.display = "none"
					}, 5000)
				})
		})
	}
})(jQuery) // End of use strict
