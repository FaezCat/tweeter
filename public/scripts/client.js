/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const url = "/tweets";

  $("form").on("submit", function(event) {
    event.preventDefault();

    const inputLength = $('#tweet-text').val().length;
    
    if (inputLength > 140) {
      return alert("Your tweet exceeds the 140 character limit!");
    } else if (inputLength === 0) {
      return alert("Your tweet cannot be blank - record your thoughts!");
    } else {
      
      const formData = $('form').serialize();
      
      $.ajax({
        method: "POST",
        url: url,
        data: formData
      })
      .then(() => {
        $('.posted-tweets').html("");
        $('#tweet-text').val("");
        $('.counter').html(140);
        loadTweets();
      })
    }
  });

  
  const createTweetElement = function(tweet) {
    
    const $tweet = $(`<article><header><div><img src=${tweet.user.avatars}>${tweet.user.name}</div><div>${tweet.user.handle}</div></header>${escape(tweet.content.text)}<footer class="tweet-footer"><div>${timeago.format(tweet.created_at)}</div><div><i class="fa-solid fa-flag"></i><i class="fa-solid fa-arrow-rotate-right"></i><i class="fa-solid fa-heart"></i></div></footer></article>`);
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
  
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('.posted-tweets').append($tweetElement);
      $('.posted-tweets').append("<br>");
    }
  };
  
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