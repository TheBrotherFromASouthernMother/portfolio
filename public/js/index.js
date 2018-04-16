let $header = $("header");
let $heroImage = $(".hero-image");

let heightToCover = Number($heroImage.css("height").replace("px", ""));

let $main = $("main");

$(window).scroll(function(){
  $header.css("top", Math.max(0, heightToCover- $(this).scrollTop()));
}); // Solution to page banner scrolling issue: http://jsfiddle.net/b43hj/

let startingDistance = $header.css("height");
$main.css("margin-top", startingDistance)

let $hamburger = $(".hamburger");
let $cross = $(".cross");
let $pageMenu = $(".pageMenu");


$hamburger.click( ()=> {
  $pageMenu.slideToggle( "slow", function() {
    $pageMenu.css("display", "flex");
    $hamburger.hide();
    $cross.show();
  })
})

$cross.click( () => {
  $pageMenu.slideToggle( "slow", () => {
    $cross.hide();
    $hamburger.show();
  })
})
