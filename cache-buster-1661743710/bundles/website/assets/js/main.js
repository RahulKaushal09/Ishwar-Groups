$(document).ready(function(){

    // Stuff to do as soon as the DOM is ready;
    var currentYear = (new Date).getFullYear();
    $(".c-year").text( currentYear );

    // logo slider
    $('.banner-carousel').owlCarousel({
        loop:true,
        autoplay:true,
        video:true,
        smartSpeed: 800,
        autoplayTimeout:6000,
        // margin:10,
        nav:true,
        dots:true,
        items:1,
        navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        responsive:{
            
        }
    });

    // home-category-carousel slider
    $('.home-category-carousel').owlCarousel({
      loop:true,
      autoplay:true,
      smartSpeed: 800,
      autoplayTimeout:6000,
      // margin:10,
      nav:true,
      dots:true,
      items:1,
      navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
      responsive:{
          
      }
  });

  // home-category-carousel slider
  $('.modal-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    smartSpeed: 800,
    autoplayTimeout: 3000,
    // margin:10,
    nav:true,
    dots:false,
    items:1,
    navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsive:{
        
    }
});


     // About us HEADQUARTERS slider
     $('.headquart-carousel').owlCarousel({
      loop:true,
      autoplay:true,
      smartSpeed: 800,
      autoplayTimeout: 3000,
      // margin:10,
      nav:true,
      dots:true,
      items:1,
      navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
      responsive:{
          
      }
  });

    // portfolio filter function

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

// End portfolio filter function

//smooth scroll
$('.links a[href^="#"], .service-menu a[href^="#"').on('click',function (e) {
  e.preventDefault();
  var target = this.hash;
  var $target = $(target);
  $('html, body').stop().animate({
      'scrollTop': $target.offset().top
  }, 900, 'swing', function () {
      // window.location.hash = target;
  });
});
//End smooth scroll


// date range function
$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'right',
      showDropdowns: true,
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });
  

  //single date range function
  $(function() {
    $('input[name="birthday"]').daterangepicker({
      opens: 'right',
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format('YYYY'),10)
    }, function(start, end, label) {
      var years = moment().diff(start, 'years');
      alert("You are " + years + " years old!");
    });
  });


 

    // lightbox options
    lightbox.option({
        'resizeDuration': 100
      })

    // loader
    setTimeout(function(){
        $(".bs-loader").css({"display": "none"});
    }, 1500);
    
    $(".select-auto").select2({
      tags: true,
      minimumResultsForSearch: -1,
      placeholder: "Type of enquiry",
    });
    
    $(".select-job-role").select2({
      tags: true,
      minimumResultsForSearch: -1,
      // placeholder: "Job Role",
    });

    $(".type-of-company").select2({
      tags: true,
      minimumResultsForSearch: -1,
      // placeholder: "Type Of Company",
    });
    
    $(".company-size").select2({
      tags: true,
      minimumResultsForSearch: -1,
      // placeholder: "Company Size",
    });


    AOS.init({
      // disable: 'mobile'
    }); 
    
    // AOS.init({
    //   disable: function() {
    //     var maxWidth = 800;
    //     return window.innerWidth < maxWidth;
    //   }
    // });
  
});