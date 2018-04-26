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
