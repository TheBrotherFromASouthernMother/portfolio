let $modalBackground = $('.modal-background');
let $project = $(".project");
let $projectImage = $(".project-image img");

let $modalContent = $(".modal-content");
let $projectDescription = $(".project-description");
let $projectName = $(".project-name");

for (let i = 0; i < $project.length; i ++) {
  $project[i].addEventListener("click", e => {
      let name = $project[i].getAttribute("name");
      try {

        console.log(name)
        $.ajax({
          url: `/${name}`,
          method: "GET"
        }).done( response => {
          console.log(typeof response)
          $modalContent.html(response);
          $modalBackground.css("display", "flex");
        })
      } catch(err) {
        console.log(err);
        window.open(`https://github.com/TheBrotherFromASouthernMother/${name}`);
      }
  })
}

$modalBackground.on('click', () => {
  $modalBackground.hide();
})
