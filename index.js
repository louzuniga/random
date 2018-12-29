'use strict';

function getRandomActivity() {
    fetch ('https://www.boredapi.com/api/activity/')
    .then (activity => activity.json())
    .then(activityJson => displayRandomActivity(activityJson))
    .catch(err => {
        $('#js-error-message').text(`Uh oh, not cool: ${err.message}`);
    });
}

function getRandomAdvice() {
    fetch('https://api.adviceslip.com/advice')
    .then(advice => advice.json())
    .then(adviceJson => displayRandomAdvice(adviceJson))
    .catch(err => {
        $('#js-error-message').text(`Uh oh, not cool:${err.message}`);
    });
}

function getRandomName() {
    fetch('https://uinames.com/api/')
    .then(name => name.json())
    .then(nameJson => displayRandomName(nameJson))
    .catch(err => {
        $('#js-error-message').text(`Uh oh, Not cool: ${err.message}`);
    });
}

function displayRandomActivity(activityJson) {
    emptyAndRemove();
     $('#results-list').append(
        $(`<p>Ponder about this random activity:<br><b>${activityJson.activity}</b></p>`)
    );
 }

 function displayRandomAdvice(adviceJson) {
     emptyAndRemove();
     $('#results-list').append(
         $(`<p>Here's advice:<br><b>${adviceJson.slip.advice}</b></p>`)
    );
 }

 function displayRandomName(nameJson) {
     emptyAndRemove();
     $('#results-list').append(
         $(`<p>What do you think of this ${nameJson.region} name:<br><b>${nameJson.name}</b></p>`)
     );console.log(nameJson);
 }

 function emptyAndRemove() {
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    $('#js-form').addClass('hidden');
 }

 function copyright() {
    let d = new Date()
    $('#copyright').text(`Copyright \u00A9 ${d.getFullYear()} Lou Zuniga https://github.com/louzuniga`)
}

function watchForm () {
  $('form').submit(event => {
    event.preventDefault();
  });
  copyright();
    $('form').on('click', '.random-activity',
        function () { 
         return getRandomActivity();
        });
    $('form').on('click', '.random-advice',
        function() {
            return getRandomAdvice();
        });
    $('form').on( 'click', '.random-name', 
        function() {
            return getRandomName();
        });
    $('.previous').on('click',() => {
        $('#results').addClass('hidden');
        $('#js-form').removeClass('hidden');
    });
}

$(watchForm);