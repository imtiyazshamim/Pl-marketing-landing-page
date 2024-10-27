!(function () {
    "use strict";
    let e = (e, a = !1) => (((e = e.trim()), a) ? [...document.querySelectorAll(e)] : document.querySelector(e)),
        a = (a, t, i, s = !1) => {
            let o = e(t, s);
            o && (s ? o.forEach((e) => e.addEventListener(a, i)) : o.addEventListener(a, i));
        },
        t = (e, a) => {
            e.addEventListener("scroll", a);
        },
        i = e("#navbar .scrollto", !0),
        s = () => {
            let a = window.scrollY + 200;
            i.forEach((t) => {
                if (!t.hash) return;
                let i = e(t.hash);
                i && (a >= i.offsetTop && a <= i.offsetTop + i.offsetHeight ? t.classList.add("active") : t.classList.remove("active"));
            });
        };
    window.addEventListener("load", s), t(document, s);
    let o = (a) => {
            let t = e("#header").offsetHeight,
                i = e(a).offsetTop;
            window.scrollTo({ top: i - t, behavior: "smooth" });
        },
        l = e("#header");
    if (l) {
        let r = () => {
            window.scrollY > 100 ? l.classList.add("header-scrolled") : l.classList.remove("header-scrolled");
        };
        window.addEventListener("load", r), t(document, r);
    }
    let n = e(".back-to-top");
    if (n) {
        let d = () => {
            window.scrollY > 100 ? n.classList.add("active") : n.classList.remove("active");
        };
        window.addEventListener("load", d), t(document, d);
    }
    a("click", ".mobile-nav-toggle", function (a) {
        e("#navbar").classList.toggle("navbar-mobile"), this.classList.toggle("bi-list"), this.classList.toggle("bi-x");
    }),
        a(
            "click",
            ".navbar .dropdown > a",
            function (a) {
                e("#navbar").classList.contains("navbar-mobile") && (a.preventDefault(), this.nextElementSibling.classList.toggle("dropdown-active"));
            },
            !0
        ),
        a(
            "click",
            ".scrollto",
            function (a) {
                if (e(this.hash)) {
                    a.preventDefault();
                    let t = e("#navbar");
                    if (t.classList.contains("navbar-mobile")) {
                        t.classList.remove("navbar-mobile");
                        let i = e(".mobile-nav-toggle");
                        i.classList.toggle("bi-list"), i.classList.toggle("bi-x");
                    }
                    o(this.hash);
                }
            },
            !0
        ),
        window.addEventListener("load", () => {
            window.location.hash && e(window.location.hash) && o(window.location.hash);
        });
    let m = e("#preloader");
    m &&
        window.addEventListener("load", () => {
            m.remove();
        }),
        GLightbox({ selector: ".glightbox" });
    let c = e(".skills-content");
    c &&
        new Waypoint({
            element: c,
            offset: "80%",
            handler: function (a) {
                e(".progress .progress-bar", !0).forEach((e) => {
                    e.style.width = e.getAttribute("aria-valuenow") + "%";
                });
            },
        }),
        new Swiper(".clients-slider", {
            speed: 400,
            loop: !0,
            autoplay: { delay: 5e3, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 },
            breakpoints: { 320: { slidesPerView: 2, spaceBetween: 40 }, 480: { slidesPerView: 3, spaceBetween: 60 }, 640: { slidesPerView: 4, spaceBetween: 80 }, 992: { slidesPerView: 6, spaceBetween: 80 } },
        }),
        $(document).ready(function () {
            $(".service-slider").owlCarousel({
                loop: !0,
                margin: 15,
                nav: !0,
                arrows: !0,
                navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>", "<img src='assets/img/service-arrow-2.svg' alt='next'>"],
                autoplay: !0,
                autoplayTimeout: 5e3,
                autoplayHoverPause: !0,
                responsive: { 0: { items: 1 }, 600: { items: 2 }, 1200: { items: 2 }, 1200: { items: 3 } },
            });
        }),
        $(document).ready(function () {
            $(".portfolio-video").owlCarousel({
                loop: !0,
                margin: 15,
                nav: !0,
                arrows: !0,
                navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>", "<img src='assets/img/service-arrow-2.svg' alt='next'>"],
                autoplay: !0,
                autoplayTimeout: 5e3,
                autoplayHoverPause: !0,
                responsive: { 0: { items: 1 }, 600: { items: 2 }, 1e3: { items: 3 }, 1200: { items: 3 }, 1280: { items: 3 }, 1300: { items: 4 } },
            });
        }),
        $(document).ready(function () {
            $(".choose-slider").owlCarousel({
                loop: !0,
                margin: 15,
                nav: !0,
                arrows: !0,
                navText: ["<img src='assets/img/arrow-white.svg' alt='Previous '>", "<img src='assets/img/arrow-white.svg' alt='next'>"],
                autoplay: !0,
                autoplayTimeout: 5e3,
                autoplayHoverPause: !0,
                responsive: { 0: { items: 1 }, 600: { items: 2 }, 1e3: { items: 3 }, 1200: { items: 3 }, 1280: { items: 3 }, 1400: { items: 4 } },
            });
        }),
        window.addEventListener("load", () => {
            let t = e(".portfolio-container");
            if (t) {
                let i = new Isotope(t, { itemSelector: ".portfolio-item" }),
                    s = e("#portfolio-flters li", !0);
                a(
                    "click",
                    "#portfolio-flters li",
                    function (e) {
                        e.preventDefault(),
                            s.forEach(function (e) {
                                e.classList.remove("filter-active");
                            }),
                            this.classList.add("filter-active"),
                            i.arrange({ filter: this.getAttribute("data-filter") }),
                            i.on("arrangeComplete", function () {
                                AOS.refresh();
                            });
                    },
                    !0
                );
            }
        }),
        new Swiper(".testimonials-slider", {
            speed: 600,
            loop: !0,
            autoplay: { delay: 5e3, disableOnInteraction: !1 },
            slidesPerView: "auto",
            pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 },
            breakpoints: { 320: { slidesPerView: 1, spaceBetween: 40 }, 1200: { slidesPerView: 2, spaceBetween: 10 } },
        }),
        GLightbox({ selector: ".portfolio-lightbox" }),
        new Swiper(".portfolio-details-slider", { speed: 400, loop: !0, autoplay: { delay: 5e3, disableOnInteraction: !1 }, pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 } }),
        window.addEventListener("load", () => {
            AOS.init({ duration: 1e3, easing: "ease-in-out", once: !0, mirror: !1 });
        });
})(),
    jQuery(document).ready(function (e) {
        e(".whatwedo-slider").owlCarousel({
            loop: !0,
            margin: 15,
            nav: !0,
            arrows: !0,
            navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>", "<img src='assets/img/service-arrow-2.svg' alt='Next'>"],
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !0,
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 1200: { items: 2 }, 1200: { items: 3 } },
        });
    }),
    $(document).ready(function () {
        function e(e) {
            $(".loading").addClass("d-block");
            let a = new URLSearchParams(window.location.search);
            if ("web-development.html" == window.location.href.split("/")[4]) var t = "Web Landing Page";
            else var t = "Video Landing Page";
            $.ajax({
                url: e.action,
                type: e.method,
                data:
                    $(e).serialize() +
                    "&time=<?php echo date('H:i:s'); ?>&date=<?php echo date('d'); ?>&Campaign=" +
                    t +
                    "&utm_source=" +
                    a.get("utm_source") +
                    "&utm_campaign=" +
                    a.get("utm_campaign") +
                    "&utm_ad_group=" +
                    a.get("utm_ad_group") +
                    "&utm_keyword=" +
                    a.get("utm_keyword") +
                    "&gclid=" +
                    a.get("gclid"),
                success: function (e) {
                    "OK" == e
                        ? ($(".loading").removeClass("d-block"),
                          $(".sent-message").addClass("d-block"),
                          $("#contact_form")[0].reset(),
                          $("#lead_form").hasClass("show") && ($("#popup_form")[0].reset(), $("#lead_form").hide()),
                          (window.location.href = "https://www.pinklemonade.in/landing-page/thank-you.html"))
                        : $(".error-message").text("Form submission failed, Try again later").addClass("d-block");
                },
            });
        }
        $(".case-slider").owlCarousel({
            loop: !0,
            margin: 15,
            nav: !0,
            arrows: !0,
            navText: ["<img src='assets/img/web/arrow-white-left.svg' alt='Previous'>", "<img src='assets/img/arrow-white.svg' alt='Next'>"],
            autoplay: !0,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !0,
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 1200: { items: 2 }, 1200: { items: 3 } },
        }),
            $(".open_lead_popup").click(function (e) {
                e.preventDefault();
                var t = $(this).data("btn-label"),
                    i = $(this).data("form-heading"),
                    s = $(this).data("section-heading");
                $("#btn_label").val(t), $("#form_heading").val(i), $("#section_heading").val(s), $("#lead_form").modal("show"), clearTimeout(a);
            }),
            $("#lead_form").on("show.bs.modal", function (e) {
                $(e.relatedTarget), $(".modal-form-title").text($("#form_heading").val()), $("#lead_form").find(".popup_sumit").text($("#btn_label").val()), $("#lead_form").find("#form_title").val($("#section_heading").val());
            }),
            $("#contact_form").validate({
                rules: { fname: "required", email: { email: !0, required: !0 }, phone: { required: !0, minlength: 10 }, message: "required" },
                messages: {
                    fname: "Please fill name",
                    email: { email: "Enter Valid Email!", required: "Enter Email!" },
                    phone: { minlength: "Please enter Valid Mobile No.", required: "Please enter Mobile No." },
                    message: "Please enter your message",
                },
                submitHandler: function (a) {
                    e(a);
                },
            }),
            $("#popup_form").validate({
                rules: { fname: "required", cname: "required", cemail: { email: !0, required: !0 }, phone: { required: !0, minlength: 10 } },
                messages: {
                    name: "Please fill name",
                    cemail: { email: "Enter Valid Email!", required: "Enter Email!" },
                    cname: "Please fill company name",
                    phone: { minlength: "Please enter Valid Mobile No.", required: "Please enter Mobile No." },
                },
                submitHandler: function (a) {
                    e(a);
                },
            }),
            $("input").keyup(function () {
                clearTimeout(a);
            });
        var a = setTimeout(function () {
            $("#lead_form").modal("show");
        }, 2e4);
    });
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoIframe");
    const close = document.querySelector(".close");
    const items = document.querySelectorAll(".portfolio-item");
    const closeModal = () => {
        modal.style.display = "none";
        iframe.src = "about:blank";
    };
    items.forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const videoUrl = this.getAttribute("data-video-url");
            iframe.src = `${videoUrl}?autoplay=1&modestbranding=1`;
            modal.style.display = "block";
        });
    });
    close.addEventListener("click", closeModal);
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});
