$(document).ready(function() {
  console.log("the DOM is ready!");
})

$("#tweet-text").on("input", function() {
  let counter = 140 - this.value.length;
  $('.counter').text(counter);
  if (counter < 0) {
    $('.counter').css("color", "red");
  } else {
    $('.counter').css("color", "#545149");
  }
})


// // This will add a click event listener to all elements with the "button" class
// $(".button").on("click", (event) => {
//   // do something here
// })
