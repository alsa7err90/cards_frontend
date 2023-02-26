/*global $, alert, console */
$(function(){
  'use strict';

  // ===> Start  public all project <=== //
    $(document).ready(function() { 
      let intViewportWidth = window.innerWidth;
      getScreen(intViewportWidth);
      // removeSpiner();
    });

    // >>>>>> remove spiner in document
    function removeSpiner() {
      // let divSpiner =  document.querySelector('.spinner-content-opctiy');
      // divSpiner.style.display = "none";
    };


    window.addEventListener('resize',function() {
      let intViewportWidth = window.innerWidth;
      getScreen(intViewportWidth);
    });

    function getScreen(intViewportWidth){

      var body = document.body;

      if(intViewportWidth < 992){
        body.classList.add("mobile-screen");
      } else {  
        body.classList.remove("mobile-screen");
      }
    }

  // ===> End  public all project <=== //

  /* ===> Start Scroll To Top <=== */
    window.onscroll = function() { btnScrollFixed() };
    function btnScrollFixed() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        $("#btn-top-pages").addClass('show');
      } else {
        $("#btn-top-pages").removeClass('show');
      }
    }
  
    $("#btn-top-pages").click(function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
      // document.body.scrollTop = 0; // For Safari
      // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
    
  /* ===> End Scroll To Top <=== */



  // ===> Start  menu bar <=== //
  $('.menu-bar').on('click', function(e) {
    $(".side-menu").toggleClass("toggled-menu");
  });

  $('.close-side-menu').on('click', function(e) {
    $(".side-menu").toggleClass("toggled-menu");
  });
  // ===> End  menu bar <=== //

  // ===> Start massege pop <=== //
    $('.btn-close-pop').on('click', function(e) {
      $(this).parent().parent().remove();
    });

  // ===> Ens massege pop <=== //


  // ===> Start Page Login <=== //
    $('.btn-show-pass').click(function(){
      var type_input_password = $(this).siblings('input').attr('type');
      switch (type_input_password) {
        case 'password':
        {
          $(this).siblings('input[type="password"]').attr('type', 'text');
          return;
        }
        case 'text':
        {
          $(this).siblings('input[type="text"]').attr('type', 'password');
          return;
        }
      }
    });
  // ===> End  Page Login <=== //


  // ===> Start Theme Dark <=== //
  
    if(document.getElementById("icon-theme")){

      var iconTheme = document.getElementById("icon-theme");
      let dartMode = localStorage.getItem("dark_mode_robot_card");

      // check If Thers Local Storage Dart Mode Option
      if(dartMode !== null && dartMode == 'dark') {
        var element = document.body;
        element.classList.toggle("dark-theme");
        iconTheme.classList.remove("icon-moon");
        iconTheme.classList.add("icon-sun");
      }

      iconTheme.onclick = function (params) {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
          // Set Color On Local Storage
          localStorage.setItem("dark_mode_robot_card", "dark");
  
          iconTheme.classList.remove("icon-moon");
          iconTheme.classList.add("icon-sun");
        } else {
          // Set Color On Local Storage
          localStorage.setItem("dark_mode_robot_card", "light");
          
          iconTheme.classList.remove("icon-sun");
          iconTheme.classList.add("icon-moon");

        }
      }
    }

  // ===> End Theme Dark <=== //

  // ===> Start Theme Dark <=== //
    document.addEventListener("click", (e) => {

      let allBtnLanguage = document.querySelectorAll(".include-language .btn-language");
      let btnClass    = e.target.classList;
      var mySet       = new Set(btnClass);
      var hasBtnLang  = mySet.has('btn-language');
      var hasActive   = mySet.has('active');
    
      if(hasBtnLang && !hasActive){
        let lang = e.target.dataset.lang;
    
        allBtnLanguage.forEach(btn => {
          btn.classList.remove("active");
        });
    
        e.target.classList.add("active");
    
        let dataGet ='?action=LanguageSwitching&lang='+lang+'';
        fetch('control_lang.php'+dataGet+'', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Content-type": "application/json;charset=UTF-8"
          }, 
          body: "",
          mode: 'cors',
          cache: 'default',
        }).then((res) => {
    
          res.json().then((data) => {
            if(data['msg'] == 'ok'){
              location.reload();
            }
          });

        });
      }
    });


    /**
     * Lang toggle
    **/
    let listItemsLang = document.querySelectorAll('ul.language li');
    listItemsLang.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        let lang = item.dataset.lang;

        let dataGet ='?action=LanguageSwitching&lang='+lang+'';
        fetch('control_lang.php'+dataGet+'', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Content-type": "application/json;charset=UTF-8"
          }, 
          body: "",
          mode: 'cors',
          cache: 'default',
        }).then((res) => {
    
          res.json().then((data) => {
            if(data['msg'] == 'ok'){
              location.reload();
            }
          });

        });

      });
    });

  // ===> End Theme Dark <=== //

  /*===> Start Page new order item <===*/
    $('.btn-count-plus').on('click', function(e) {
      
      var price_item  = document.querySelector(".price-item").innerHTML;
      var total_item  = document.querySelector(".total-item");
      var coun        = document.querySelector(".text-count-item");
      var n_coun      = parseInt(coun.value);
      let nn_coun     = n_coun + 1;

      if(n_coun < 24 ){
        
        coun.value            = nn_coun;
        var total_coun        = (parseFloat(price_item) * nn_coun).toFixed(2);
        total_item.innerHTML  = total_coun;

      } else {
        toast("يرجى تحديد كمية مسموحة", 1500);
      }

    });

    $('.btn-count-minus').on('click', function(e) {
      var price_item  = document.querySelector(".price-item").innerHTML;
      var total_item  = document.querySelector(".total-item");
      var coun        = document.querySelector(".text-count-item");
      var n_coun      = parseInt(coun.value);
      let nn_coun     = n_coun - 1;

      if(n_coun > 1 ){
        coun.value            = nn_coun;
        var total_coun        = (parseFloat(price_item) * nn_coun).toFixed(2);
        total_item.innerHTML  = total_coun;

      } else {
        toast("يرجى تحديد كمية مسموحة", 1500);
      }

    });

    $('.order-row #quantity').on('input', function(e) {
      // console.log(e.target.value);
      var price_item  = document.querySelector(".price-item").innerHTML;
      var total_item  = document.querySelector(".total-item");
      var coun        = document.querySelector(".text-count-item");
      var n_coun      = e.target.value; // parseInt(coun.value);

      if(n_coun >= 100 ){
        var total_coun        = (parseFloat(price_item) * n_coun).toFixed(3);
        total_item.innerHTML  = total_coun;

      } else {
        toast("يرجى تحديد كمية مسموحة", 1500);
      }

    });
  /*===> End Page new order item <===*/
  /*===> Start Page View order <===*/
    $(".btn-copy-text").on('click', function(e) {
      e.preventDefault();
      const textCopy = this.dataset.textcopy;
      
      // creating textarea of html
      var input = document.createElement("textarea");
      //adding p tag text to textarea 
      input.value = textCopy;
      document.body.appendChild(input);
      input.select();
      document.execCommand("Copy");
      // removing textarea after copy
      input.remove();
      toast("Copy", 1200);
    });

  /*===> End Page View order <===*/

  // ===> Start Api Protocol Description <=== //
    $("tr.row-product").on('click', function(e) {
      let ref = this;
      const productID = this.dataset.productid;
      window.location.href="view_item.php?id="+productID;
    });
  // ===> End Api Protocol Description <=== //


 

  
});

/*===> Start Alert Sweet <===*/
function showSweetAlert(tit, tex, type, btn){
  'use strict';
  swal({
    title: tit,
    text: tex,
    icon: type,
    button: btn,
  });
};
/*===> End Alert Sweet <===*/
/*===> Start Toast <===*/

function toast(msg, timeOut) {
  var el = $('.content-pages');
  el.append('<div id="snackbar" className="show">'+msg+'</div>');
  setTimeout(function(){ $('#snackbar').remove() }, timeOut);
}

/*===> End   Toast <===*/

function addAccount(account_email) {
  localStorage.setItem("account_email", account_email);
  console.log(account_email);
}
