$(document).ready(function () {
    // --- our code goes here ---
    console.log('loading');
    
    $('#tweet-text').keyup(function() {
        const $counter = $(this).siblings('.buttonDiv').children('.counter');
        let count = $(this).val().length;
        $counter.text(140 - count);
        if (count > 140) {
            $counter.css('color', 'red');
        } else {
            $counter.css('color', 'black');
        }
    })
});




