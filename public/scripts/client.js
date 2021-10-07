/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const url = "/tweets";

  $("form").on("submit", function(event) {
    event.preventDefault();

    const formData = $('form').serialize();
    console.log(formData);

    $.ajax({
      method: "POST",
      url: url,
      data: formData
    });
  });

  
  const createTweetElement = function(tweet) {
    const $tweet = $(`<article><header><div><img src=${tweet.user.avatars}>${tweet.user.name}</div><div>${tweet.user.handle}</div></header>${tweet.content.text}<footer class="tweet-footer"><div>${timeago.format(tweet.created_at)}</div><div><i class="fa-solid fa-flag"></i><i class="fa-solid fa-arrow-rotate-right"></i><i class="fa-solid fa-heart"></i></div></footer></article>`);
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
      renderTweets(tweets);
    });
  };

  loadTweets();

});

//   <section class="posted-tweets">
//   <article>
//     <header>
//       <div><i class="fas fa-angle-double-down"></i>Faez</div>
//       <div>@FaezCat</div>
//     </header>
//       Something ultra witty to impress my followers with. Look at me! I'm oh so clever!
//     <footer class="tweet-footer">
//       <div>10 days ago</div>
//       <div>
//         <i class="fa-solid fa-flag"></i>
//         <i class="fa-solid fa-arrow-rotate-right"></i>
//         <i class="fa-solid fa-heart"></i>
//       </div>
//     </footer>
//   </article>
// </section>