$(document).ready(function() {
  console.log("the DOM is ready!");
  
  // event listener handling the character counter for new tweets - updated whenever the box's input count changes and applies red styling whenn the character counter drops below 0
  $("#tweet-text").on("input", function() {
    let counter = 140 - this.value.length;
    $('.counter').text(counter);
    if (counter < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
  });
});