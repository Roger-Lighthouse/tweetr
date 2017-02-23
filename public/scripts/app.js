/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];


function timeDifference(current, previous) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;
  let elapsed = current - previous;
  if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';
  }
  else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
  }
  else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
  }
  else if (elapsed < msPerMonth) {
     return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
  }
  else if (elapsed < msPerYear) {
     return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
  }
  else {
     return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
  }
}

// function createTweetElement(tweet) {
//   let userName = tweet.user.name;
//   let photo = tweet.user.avatars.small;
//   let userHandle = tweet.user.handle;
//   let tweetText = tweet.content.text;
//   let timeStamp = timeDifference(Date.now(), tweet.created_at)
//   let html = `<article class="sent-tweets">
//                 <header>
//                   <img src=${photo}><h2>${userName}</h2><h5>${userHandle}</h5>
//                 </header>
//                 <div class="tweet-body">
//                   ${tweetText}
//                 </div>
//                 <footer>
//                   ${timeStamp}
//                 </footer>
//               </article>`;
//   return html;
// }






//######################################

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (tweet of tweets) {
      var $tweet = createTweetElement(tweet);
      // console.log(tweet);
      $('.tweets').prepend($tweet);
    }
}




  function createTweetElement(tweet){
    let timeStamp = timeDifference(Date.now(), tweet.created_at)
    var output = "";
    output = `<article class='user-tweet'>
        <header class='header'>
          <img class='pic' src=${tweet.user.avatars.small}></img>
          <span class='name'>${tweet.user.name}</span>
          <span class='handle'>${tweet.user.handle}</span>
        </header>
          <p class='tweet'>${tweet.content.text}</p>
        <footer class='footer'>
            <span>${timeStamp}</span>
            <span class='icon'>
              <i class="material-icons">favorite</i>
              <i class="material-icons">schedule</i>
              <i class="material-icons">stars</i>
            </span>
        </footer>
      </article>`;
    return output;

    //create an article
  }



$(document).ready(function() {


  function loadTweets(){
    $.ajax({
        method: 'GET',
        url: '/tweets',
    })
    .then((data) => {
      $('.new-tweet .counter').text('140');
      renderTweets(data);
    })
  };


  loadTweets();


  $('#ind-tweet').on('submit', (ev) => {
    // prevent default browser form submission


    ev.preventDefault();
    let theVal = $('#ind-tweet').find("input[type=text], textarea").val();
    console.log("The Value : " +theVal);

    if(theVal === '' || theVal.length > 140){
      alert("Invalid Data!!");
    }else{
      // read the data from the form inputs
       const data_obj = {};
       $('#ind_tweet').serializeArray().forEach((elm) => {
        console.log("GOT HERE:", elm.name+'  //  '+elm.value);
         data_obj[elm.name] = elm.value;
       });
      // submit the info -- make POST request via ajax
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $('#ind-tweet').serialize()
      })
      .done((result) => {
        console.log('new post created!', result);
        $('#ind-tweet').find("input[type=text], textarea").val('');
        $('.new-tweet .counter').text('140');
        loadTweets();
      })
      .fail(console.error);
    }
  });

  $(".button").click(function(){
    $(".new-tweet").slideToggle(500);
    $(".new-tweet textarea").focus();
  });



});




