let $header = $("header");
let $heroImage = $(".hero-image");

let heightToCover = Number($heroImage.css("height").replace("px", ""));

let $main = $("main");

$(document).scroll(function(){
  console.log($(this).scrollTop())
  console.log('div height', heightToCover)
  console.log('window height', $(window).height())
  $header.css("top", Math.max(2, $(window).height() - $(this).scrollTop()) );
}); // Solution to page banner scrolling issue: http://jsfiddle.net/b43hj/

let startingDistance = $header.css("height");
$main.css("margin-top", startingDistance)
