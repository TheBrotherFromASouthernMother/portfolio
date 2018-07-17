
      let techSlider = document.querySelector("#tech-slider");

      function showTechIcons() {
        let x = 0
        let transtion = setInterval(()=> {
          techSlider.style.opacity = x / 100;
          x ++;
          if(x >= 100) {
            clearInterval(transtion)
          }
        }, 5)
      } //end showTechIcons

      let bool = true;

      $(window).scroll( (e)=> {

        function elementScrolled(elem) {
          //This function inspired by https://stackoverflow.com/a/42016457/8865999
            if (bool === false) {
              return false;
            }
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            console.log("DocBottom: " + docViewBottom, "docViewTop: " + docViewTop);
            if ( ((elemTop <= docViewBottom - 10) && (elemTop >= docViewTop)) ) {
              console.log("ElemTop: " + elemTop)
                bool = false;
                return true;
            } else {
                return false;
            }
          } //end elementScrolled
          if(elementScrolled('#tech-slider')) {
            // Your function here
            showTechIcons();
            }
          }); // end Window Scroll
