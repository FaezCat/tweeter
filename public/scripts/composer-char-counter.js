$(document).ready(function() {
  console.log("the DOM is ready!");
})

$(".tweet-text").on("click", (e) => {
  console.log(e);
})


// // This will add a click event listener to all elements with the "button" class
// $(".button").on("click", (event) => {
//   // do something here
// })
