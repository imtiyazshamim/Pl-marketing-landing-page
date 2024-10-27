
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

   /**
   * service-slider Slider
   */

   
  
   

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    // slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 80
      }
    }
  });


 

  /**
   * service Slider
   */
  $(document).ready(function(){
    $(".service-slider").owlCarousel({
        loop:true,
        margin:15,
        nav:true,
        arrows: true,
        navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>","<img src='assets/img/service-arrow-2.svg' alt='next'>"],
        autoplay: true, // Enable autoplay
        autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
        autoplayHoverPause: true, // Pause autoplay on hover
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1200:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });
});


/**
 * Service Slider Main
 */
$(document).ready(function(){
  $(".service-slider-main").owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      arrows: true,
      navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>", "<img src='assets/img/service-arrow-2.svg' alt='next'>"],
      autoplay: true, // Enable autoplay
      autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
      autoplayHoverPause: true, // Pause autoplay on hover
      dots: false, // Default - no dots for non-mobile
      responsive: {
          0: {
              items: 1,
              dots: true // Enable dots for mobile devices (width <= 600px)
          },
          600: {
              items: 2,
              dots: true // Enable dots for tablets
          },
          1200: {
              items: 2,
              dots: false // Disable dots for larger screens
          },
          1400: {
              items: 3,
              dots: false // Disable dots for larger screens
          }
      }
  });
});


  

   /**
   * portfolio Slider
   */
   $(document).ready(function(){
    $(".portfolio-video").owlCarousel({
      loop:true,
      margin:15,
      nav:true,
arrows: true,
      navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>","<img src='assets/img/service-arrow-2.svg' alt='next'>"],
          autoplay: true, // Enable autoplay
        autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
        autoplayHoverPause: true, // Pause autoplay on hover

      responsive:{
        0:{
          items:1
        },
        600:{
          items:2
        },
        1000:{
          items:3
        },
         1200:{
          items:3
        },
          1280:{
          items:3
        },
        1300:{
          items:4
        }
      }
    });
  });
  
   $(document).ready(function(){
    $(".choose-slider").owlCarousel({
      loop:true,
      margin:15,
      nav:true,
      arrows: true,
      navText: ["<img src='assets/img/arrow-white.svg' alt='Previous '>","<img src='assets/img/arrow-white.svg' alt='next'>"],
          autoplay: true, // Enable autoplay
        autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
        autoplayHoverPause: true, // Pause autoplay on hover

      responsive:{
        0:{
          items:1
        },
        600:{
          items:2
        },
        1000:{
          items:3
        },
         1200:{
          items:3
        },
          1280:{
          items:3
        },
        1400:{
          items:4
        }
        
      }
    });
  });
  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });


  
  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
//   navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev'
//       },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 2,
            spaceBetween: 10
      }
      
    }
  });


  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()

  jQuery(document).ready(function($){
    $(".whatwedo-slider").owlCarousel({
        loop:true,
        margin:15,
        nav:true,
        arrows: true,
        navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous '>","<img src='assets/img/service-arrow-2.svg' alt='Next'>"],
        autoplay: false, // Enable autoplay
        autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
        autoplayHoverPause: true, // Pause autoplay on hover
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1200:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });
});
jQuery(document).ready(function($){
     // tabbed content
    $(".technologiesweb .tab_content").hide();
    $(".technologiesweb .tab_content:first").show();

  /* if in tab mode */
    $(".technologiesweb ul.tabs li").click(function() {
    
      $(".technologiesweb .tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();    
    
      $(".technologiesweb ul.tabs li").removeClass("active");
      $(this).addClass("active");

    $(".technologiesweb .tab_drawer_heading").removeClass("d_active");
    $(".technologiesweb .tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
    
    });
  /* if in drawer mode */
  $(".technologiesweb .tab_drawer_heading").click(function() {
      
      $(".technologiesweb .tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
    
    $(".technologiesweb .tab_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
    
    $(".technologiesweb ul.tabs li").removeClass("active");
    $(".technologiesweb ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
    });
  
  
  /* Extra class "tab_last" 
     to add border to right side
     of last tab */
  $('.technologiesweb ul.tabs li').last().addClass("tab_last");
  
});


// Maketing page js

 /**
   * Case-study Slider
   */
 $(document).ready(function(){
  $(".case-slider").owlCarousel({
      loop:true,
      margin:15,
      nav:true,
      arrows: true,
      navText: ["<img src='assets/img/web/arrow-white-left.svg' alt='Previous'>","<img src='assets/img/arrow-white.svg' alt='Next'>"],
      autoplay: true, // Enable autoplay
      autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
      autoplayHoverPause: true, // Pause autoplay on hover
      responsive:{
          0:{
              items:1
          },
          600:{
              items:2
          },
          1200:{
              items:2
          },
          1200:{
              items:3
          }
      }
  });
/**
 * Blog-study Slider
 */
$(document).ready(function(){
  $(".blog-slider").owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      dots: false, // Disable dots
      arrows: true,
      navText: ["<img src='assets/img/service-arrow-3.svg' alt='Previous'>","<img src='assets/img/service-arrow-2.svg' alt='Next'>"],
      autoplay: true, // Enable autoplay
      autoplayTimeout: 5000, // Set autoplay interval (5000ms = 5s)
      autoplayHoverPause: true, // Pause autoplay on hover
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 2
          },
          1200: {
              items: 2
          },
          1400: {
              items: 3
          }
      }
  });
});


  
  
$('.open_lead_popup').click(function(e){
      e.preventDefault();
      var btn_label=$(this).data('btn-label');
      var form_heading=$(this).data('form-heading');
      var section_heading=$(this).data('section-heading');
      $('#btn_label').val(btn_label);
      $('#form_heading').val(form_heading);
      $('#section_heading').val(section_heading);
      $('#lead_form').modal('show');
      clearTimeout(autopopup);
  });
  $('#lead_form').on('show.bs.modal', function(event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      $('.modal-form-title').text($('#form_heading').val());
      $('#lead_form').find('.popup_sumit').text($('#btn_label').val());
      $('#lead_form').find('#form_title').val($('#section_heading').val());
})

$("#contact_form").validate({
rules:{
  fname:"required",
  email:{email: true,required: true},
  phone:{required : true,minlength:10},
  message:"required",

},

messages: {
  fname:"Please fill name",
  email:{email:"Enter Valid Email!",
    required:"Enter Email!"
    },
  phone:{minlength:"Please enter Valid Mobile No.",
    required:"Please enter Mobile No."
    },
  message:"Please enter your message",
},

submitHandler: function(form){
    submit_handler(form);
}
});
$("#popup_form").validate({
rules:{
  fname:"required",
  cname:"required",
  cemail:{email: true,required: true},
  phone:{required : true,minlength:10},
},

messages: {
  name:"Please fill name",
  cemail:{email:"Enter Valid Email!",
    required:"Enter Email!"
    },
  cname:"Please fill company name",
  phone:{minlength:"Please enter Valid Mobile No.",
    required:"Please enter Mobile No."
    },
},

submitHandler: function(form){
    submit_handler(form);
}
});
function submit_handler(form){
    $('.loading').addClass('d-block');
const urlParams = new URLSearchParams(window.location.search);
var url = window.location.href;
var current_path = url.split('/');
if(current_path[4]=='web-development.html'){
    var Campain='Web Landing Page';
}
else{
    var Campain='Video Landing Page';
}
$.ajax({
  url: form.action,
  type: form.method,
  data: $(form).serialize()+"&time="+"<?php echo date('H:i:s'); ?>"+"&date="+"<?php echo date('d'); ?>"+"&Campaign="+Campain+"&utm_source="+urlParams.get('utm_source')+"&utm_campaign="+urlParams.get('utm_campaign')+"&utm_ad_group="+urlParams.get('utm_ad_group')+"&utm_keyword="+urlParams.get('utm_keyword')+"&gclid="+urlParams.get('gclid'),
  success: function(response) {
    if(response=='OK'){
        $('.loading').removeClass('d-block');
        $('.sent-message').addClass('d-block');
        $('#contact_form')[0].reset();
        if($('#lead_form').hasClass('show')){
            $('#popup_form')[0].reset();
            $('#lead_form').hide();
        }
            window.location.href = 'https://www.pinklemonade.in/landing-page/thank-you.html';
    }
    else{
        $('.error-message').text('Form submission failed, Try again later').addClass('d-block');
    }
  }            
      });
}
$('input').keyup(function() {
    clearTimeout(autopopup);
});
    var autopopup = setTimeout(function() {
      $('#lead_form').modal('show');
    }, 20000);

});