
// const ul_menu = document.getElementById('ul_menu');
// const btn_mobile_menu = document.getElementById('btn_mobile_menu');

// btn_mobile_menu.addEventListener('click', ()=>{
//     handleMenu()
// })


// function handleMenu(){
//     ul_menu.classList.toggle("is-active");
//     btn_mobile_menu.classList.toggle("is-active");
// }


var hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("active");
    document.getElementById("hamburger_a").classList.toggle("hamburger_active"); 
  })

  var layerOver = document.querySelector(".layerOver");
  layerOver.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("active");
    document.getElementById("hamburger_a").classList.toggle("hamburger_active"); 
  })

