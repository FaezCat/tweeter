$(document).ready(function() {
  
  // event listener handling the character counter for new tweets
  // updates whenever the form's input count changes 
  // applies red styling when the character counter drops below 0
  $('#tweet-text').on('input', function() {
    let counter = 140 - this.value.length;
    $('.counter').text(counter);
    if (counter < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'darkred');
    }
  });
});