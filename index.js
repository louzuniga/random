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

// function getRandomName() {
//     fetch('https://uinames.com/api/')
//     .then(name => name.json())
//     .then(nameJson => displayRandomName(nameJson))
//     .catch(err => {
//         $('#js-error-message').text(`Uh oh, Not cool: ${err.message}`);
//     });
// }

function getRandomDog() {
    fetch ('https://dog.ceo/api/breeds/image/random')
    .then(dog => {
        if(dog.ok) {
            return dog.json();
        }
        throw new Error(dog.statusText);
    })
    .then(dogJson => displayRandomDog(dogJson))
    .catch(err => {
         $('#js-error-message').text(`Uh oh, Not cool: ${err.message}`);
    });
}

const apiKeyCat = '9807a3e1-36d8-4699-90f7-bc2b5e9fb0a4';

function getRandomCat () {
    const url = 'https://api.thecatapi.com/v1/images/search'

    const options = {
        headers: new Headers ({
            "x-api-key": apiKeyCat}) 
    }; 

   fetch(url, options)
   .then(cat => {
       if(cat.ok) {
           return cat.json(); 
       }
       throw new Error(cat.statusText);
   })
   .then(catJson => displayRandomCat(catJson))
   .catch(err => {
        $('#js-error-message').text(`Uh oh, Not cool: ${err.message}`);
   });
}

function displayRandomActivity(activityJson) {
    emptyAndRemove();
     $('#results-list').append(
        $(`<p>Ponder about this activity:<br><strong>${activityJson.activity}</strong></p>`)
    );
 }

 function displayRandomAdvice(adviceJson) {
     emptyAndRemove();
     $('#results-list').append(
         $(`<p>Here's advice:<br><strong>${adviceJson.slip.advice}</strong></p>`)
    );
 }

//  function displayRandomName(nameJson) {
//      emptyAndRemove();
//      $('#results-list').append(
//          $(`<p>What do you think of this name from <em>${nameJson.region}</em>:<br><strong>${nameJson.name}</strong></p>`)
//      );
//  }

 function displayRandomDog(dogJson) {
     emptyAndRemove();
     $('#results-list').append(
         $(`<img class="image" src="${dogJson.message}" alt="random dog image">`)
     );
 }

 function displayRandomCat(catJson) {
     emptyAndRemove();
     $('#results-list').append(
        $(`<img class="image" src="${catJson[0].url}" alt="random dog image">`)
     );
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

function nextButtom (activityJson, adviceJson) {
    if($('.random-activity').click) { console.log(activityJson);
         for(let i = 0; i < activityJson; i++)
            return getRandomActivity(); 
    }else if($('.random-advice').click) {
        for(let i = 0; i < adviceJson; i++)
        getRandomAdvice();
    }else {
        getRandomName();
    }
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
    // $('form').on( 'click', '.random-name', 
    //     function() {
    //         return getRandomName();
    //     });
    $('.random-dog').on('click', () => {
        return getRandomDog();
    });
    $('.random-cat').on('click', () => {
        return getRandomCat();
    });
    $('.previous').on('click',() => {
        location.reload();
        $('#results').addClass('hidden');
        $('#js-form').removeClass('hidden');
    });
    $('.next').on('click', () => {
        nextButtom();
    });
}

$(watchForm);