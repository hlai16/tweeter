/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// 

$(() => {
    const loadTweets = () => {
        $.ajax({
            url: "/tweets",
            method: "GET",
            dataType: "json",
            success: (tweets) => {
                console.log("data:", tweets)
                renderTweets(tweets.reverse());

            },
            error: (err) => {
                console.log(`there was an error: ${err}`)
            }
        })
    }


    const renderTweets = function (tweets) {
        // loops through tweets
        for (const tweet of tweets) {
            // calls createTweetElement for each tweet
            const $tweet = createTweetElement(tweet);
            // takes return value and appends it to the tweets container
            $('.tweet').append($tweet);
        }
    }
    const preventCrossScripting = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };
    const createTweetElement = function (data) {
        data = $(`
    <div class="tweetSend">
        <div class="tweetHeader">
            <div class="user-profile">
             <img src="${data.user.avatars}"  
             <p class="username">${data.user.name}</p>
            </div>
            <a class="handle" href="#">${data.user.handle}</a>
        </div>
        <div class="tweetBody">
            <p>${preventCrossScripting(data.content.text)}</p>
        </div>
        <div class="tweetFooter">
          <p>${timeago.format(data.created_at)}</p>
          <div class="tweetIcons">
            <a href="#"><i class="fas fa-flag"></i></a>
            <a href="#"><i class="fas fa-retweet"></i></a>
            <a href="#"><i class="fas fa-heart"></i></a>
          </div>
        </div>
    </div>`);
        return data;
    }
    const $tweetText = $('#tweet-text');
    const $form = $("#new-tweet");
    $form.on("submit", function (event) {
        event.preventDefault();
        console.log('form was submitted');

        const serializedData = $(this).serialize();

        // the error message is a challenge for me. At first, I use another way with .append. Which is inconsistent in showing the error message. sometimes only once, sometimes more than once in a row. So evaluator rejected my app, but that was the only way I could think of.
        if ($tweetText.val() === '') {
            $(".error").html(" 🚫 No blank tweets! 🚫 ");
            $(".error").slideDown();
            return;
        // my friend Cat showed me .html. Old memory! I forgot about .html. Still, I have to adjust my css to go without border because I can't get rid of the bottom of border to not show when I refresh my app.
        }

        if ($tweetText.val().length > 140) {
            $(".error").html(" 🚫 Your tweet is toooooo loooonnggg!!!!!!!! 🚫 ");
            $(".error").slideDown();
        // Evaluator wants to see .slideDown(). So I use it here.
            return;
        }
        $(".error").html("");
        $(".error").slideUp();
        // Evaluator wants to see .slideUp(). So I use it here.
        // Before rejection, I use show(), and hide().
        
        $.post("/tweets", serializedData).then(() => {
            console.log('success');
            $('.tweet').empty();
            $('#tweet-text').val('');
            loadTweets();
        })
    })
    loadTweets();
})






