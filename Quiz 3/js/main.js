$(document).ready(function(){
  var count = 0;
  var time = 0;
  var result = null;

  var timer;

  var jokes = [
    "You're so slow, the bird grew a beard while racing... go look..., GOTCHA!!! didn't I?",
    "You're so slow, we had to measure your 10 second race with a calendar",
    "You're so slow, you came in 2nd in a 1 man race",
    "You're so slow, you have to chase the zombies",
    "You're slower than a slow cooker",
    "You're slower than a 1 legged dog on tranquilizers",
    "You're slower than Daenerys Targaryen on her way to Westeros",
    "You gotta get those fingers to the gym asap! You too slow!",
    "You've got some supreme slownest in those fingers son! You gotta do some finger cardio!",
    "You've got limitted edition slow fingers! go claim your Ginnes record!",
  ]

  function initialize(){
    timer = setInterval(function () {
      let position = $('.bird').offset();
      let position2 = $('.bird2').offset();
      if (count == 500)
      randomBubbles ();
      if (count >= 1000 && count < 2000) {
        $('.rsg').html('READY');
        } else if (count >= 2000 && count < 3000) {
        $('.rsg').html('SET');
      } else if (count >= 3000 && count < 4000) {
        $('.rsg').html('GO!');
       
      } else {
        $('.rsg').html('');
      }
     

      if (time >= 30000 && !result) {
        result = 'lost';

        console.log('lost joke');

        stop();
        showResult(jokes[Math.floor(Math.random() * 10)], 'joke');
      }

      if (count >= 3000) {
        var ran = Math.floor(Math.random() * 65) + 1;
        var mov = 20 + ran;
      if (position2.left < window.innerWidth - $('.bird2').width()) {
          $('.bird2').css('left', Math.min(position2.left + mov, window.innerWidth - $('.bird2').width()));
         }
        time += 100;
        $('.timer').html(time / 1000);
      }

      count += 100;
    }, 100);
 
  }

  function randomBubbles(){
var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var ran1 = Math.floor((Math.random() * 300) + 1);
var ran2 = Math.floor((Math.random() * 300) + 300); 
b1.style.top=ran1 + "px";
b2.style.top=ran2 + "px";
  }

  function stop() {
    clearInterval(timer);
  }

  function reset() {
    count = 0;
    time = 0;
    result = null;

    console.log('reseting');

    $('.result').addClass('hide').html('');
    $('.bird').css({
      'top': '50%',
      'left': 0
    });
    $('.bird2').css({
      'top': '35%',
      'left': 0
    });
    $('.timer').html(0);

    initialize();
  }

  $(window).keydown(function (e) {
    let position = $('.bird').offset();
    let position2 = $('.bird2').offset();
    let target = $('.crossing-line').offset();

    // console.log(position);
    if(count > 3000){
      if (position.left + 20 > target.left) {
        if (time >= 10000 && !result) {
          result = 'lost';
          stop();
          showResult('YOU LOSE!');
        }
        if (time > 3000 && !result) {
          result = 'won';
          stop();
          showResult('YOU WIN!');
        }
      }
        else if ((position2.left + 20) > target.left) {
          if (time >= 3000 && !result) {
            result = 'lost';
            stop();
            showResult('YOU LOSE!');
          }}
        
  

      if (e.keyCode === 37) {
        if (position.left > 0) {
          $('.bird').css('left', Math.max(position.left - 50, 0));
        }
      }
      if (e.keyCode === 38) {
        if (position.top > 0) {
          $('.bird').css('top', Math.max(position.top - 50, 0));
        }
      }
      if (e.keyCode === 39) {
        if (position.left < window.innerWidth - $('.bird').width()) {
          $('.bird').css('left', Math.min(position.left + 50, window.innerWidth - $('.bird').width()));
        }
      }
      if (e.keyCode === 40) {
        if (position.top < window.innerHeight - $('.bird').height()) {
          $('.bird').css('top', Math.min(position.top + 50, window.innerHeight - $('.bird').height()));
        }
      }
    }
    
  });

  $(window).keyup(function (e) {
    let position = $('.bird').offset();

    // console.log('position ', position);

  });

  function showResult(msg, className) {
    $('.result').removeClass('hide').html(`
            <div class=${className || ''}>${msg}</div>
            <div class="reset-btn">RESTART</div>
          `).promise().done(function () {
      $('.reset-btn').click(reset);
    });
  }

  initialize();

});
