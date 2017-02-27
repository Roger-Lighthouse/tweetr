

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


function renderTweets(tweets) {
    $('.tweets').empty();
    for (tweet of tweets) {
      var $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
}


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


//this works
//   <p class='tweet'>${tweet.content.text}</p>
//
//New        <p class='tweet'>$(".tweet").text(${tweet.content.text})</p>


  function createTweetElement(tweet){
    let timeStamp = timeDifference(Date.now(), tweet.created_at)
    var output = "";

    //var tweet1 = $(".tweet").text(${tweet.content.text});
    //console.log('Escape:'+${escape(tweet.content.text)});

    output = `<article class='user-tweet'>
        <header class='header'>
          <img class='pic' src=${tweet.user.avatars.small}></img>
          <span class='name'>${tweet.user.name}</span>
          <span class='handle'>${tweet.user.handle}</span>
        </header>
        <p class="tweet-text">${escape(tweet.content.text)}</p>
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
    ev.preventDefault();
    let theVal = $('#ind-tweet').find("input[type=text], textarea").val();

      if(theVal === '' || theVal.length > 140){
        alert("Invalid Data!!");
      }else{
        // read the data from the form inputs
         const data_obj = {};
         $('#ind_tweet').serializeArray().forEach((elm) => {
           data_obj[elm.name] = elm.value;
         });
        // submit the info -- make POST request via ajax
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $('#ind-tweet').serialize()
        })
        .done((result) => {
          for(key in result){
            $('#ind-tweet').find("input[type=text], textarea").val('');
            $('.new-tweet .counter').text('140');
            loadTweets();
          }
        })
        .fail(console.error);
      }
  });



  $('#login1').on('submit', (ev) => {
    ev.preventDefault();

    var theVal = null;
    var values = {};
    $.each($('#login1').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    for(key in values){
      if( key === 'user'){
        theVal = values[key];
        break;
      }
    }

    if(theVal === '' || theVal.length > 140){
      alert("Invalid Data!!");
    }else{
      $.ajax({
        method: 'POST',
        url: '/tweets/login',
        data: $('#login1').serialize()
      })
      .done((result) => {
        console.log("Result:"+result);
        $(".login").css("display", "none");
        $(".container").css("display", "block");
        loadTweets();
      })
      .fail(console.error);
    }
  });










  $(".button").click(function(){
    $(".new-tweet").slideToggle(500);
    $(".new-tweet textarea").focus();
  });

  if(req.session.user_id){
    console.log('Halleluja');
  }else{
    console.log('Fuck You');
  }



});




