$(document).ready(function() {

  // hides the initial display-error div
  $('#display-error').slideUp(0);
  
  // function later used to help format our tweet form input (removing scripts etc.)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const url = "/tweets";

  // event handler for submitting the tweet form which checks for appropriate tweet length 
  // (not null and under or equal to 140 chars) prior to submitting the tweet's data and 
  // refreshing the posted-tweets section
  $("form").on("submit", function(event) {
    event.preventDefault();

    const inputLength = $('#tweet-text').val().length;
    
    // tweet input checks and appropriate error messaging if checks fail
    if (inputLength > 140) {
      $('#display-error').html("Your tweet exceeds the 140 character limit!");
      $('#display-error').slideDown();
      return;
    } else if (inputLength === 0) {
      $('#display-error').html("Your tweet cannot be blank - record your thoughts!");
      $('#display-error').slideDown();
      return;
    } else {

      // hides the error messaging once the tweet passes requirements
      $('#display-error').slideUp(0);
      
      const formData = $('form').serialize();
      
      // ajax submits the POST request containing the tweet form data
      $.ajax({
        method: "POST",
        url: url,
        data: formData
      })
      .then(() => {
        // clears existing data in the posted-tweets section and in the tweet form 
        // then loads all tweets including the newly submitted one
        $('.posted-tweets').html("");
        $('#tweet-text').val("");
        $('.counter').html(140);
        loadTweets();
      })
    }
  });

  // function which accepts tweet object data and then generates the dynamic HTML needed to render an individual tweet (see renderTweets next)
  const createTweetElement = function(tweet) {
    
    const $tweet = $(`<article><header><div><img src=${tweet.user.avatars}>${tweet.user.name}</div><div>${tweet.user.handle}</div></header>${escape(tweet.content.text)}<footer class="tweet-footer"><div>${timeago.format(tweet.created_at)}</div><div><i class="fa-solid fa-flag"></i><i class="fa-solid fa-arrow-rotate-right"></i><i class="fa-solid fa-heart"></i></div></footer></article>`);
    return $tweet;
  };
  
  // function which accepts an array of tweet objects, generates tweets, and then appends them to the posted-tweets section (see loadTweets next)
  const renderTweets = function(tweets) {
  
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('.posted-tweets').append($tweetElement);
      $('.posted-tweets').append("<br>");
    }
  };
  
  // function which loads tweets in order of newest to oldest through the use of the createTweetElement and renderTweets functions
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: url,
    })
    .then((tweets) => {
      tweets.reverse();
      renderTweets(tweets);
    });
  };

  loadTweets();

});