'use strict';

$(window).on('load', () => {
  $('.loader .inner-loader').fadeOut(200, () => {
    $('.loader').fadeOut(400);
  });
});

const apiKeyCat = '9807a3e1-36d8-4699-90f7-bc2b5e9fb0a4';
const urlCat = 'https://api.thecatapi.com/v1/images/search';

function getRandomCat() {
  const options = {
    headers: new Headers({
      'x-api-key': apiKeyCat
    })
  };

  fetch(urlCat, options)
    .then(cat => {
      if (cat.ok) {
        return cat.json();
      }
      throw new Error(cat.statusText);
    })
    .then(catJson => displayRandomCat(catJson))
    .catch(err => {
      $('#js-error-message').text(`Uh oh, Not cool: ${err.message}`);
    });
}

function getRandomDog() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(dog => {
      if (dog.ok) {
        return dog.json();
      }
      throw new Error(dog.statusText);
    })
    .then(dogJson => displayRandomDog(dogJson))
    .catch(err => {
      $('#js-error-message').text(`Uh oh, Not cool: ${err.message}`);
    });
}

function getRandomActivity() {
  fetch('https://www.boredapi.com/api/activity/')
    .then(activity => {
      if (activity.ok) {
        return activity.json();
      }
      throw new Error(activity.statusText);
    })
    .then(activityJson => displayRandomActivity(activityJson))
    .catch(err => {
      $('#js-error-message').text(`Uh oh, not cool: ${err.message}`);
    });
}

function getRandomAdvice() {
  fetch('https://api.adviceslip.com/advice')
    .then(advice => {
      if (advice.ok) {
        return advice.json();
      }
    })
    .then(adviceJson => displayRandomAdvice(adviceJson))
    .catch(err => {
      $('#js-error-message').text(`Uh oh, not cool:${err.message}`);
    });
}

function displayRandomActivity(activityJson) {
  emptyAndRemove();
  $('#next-activity').removeClass('hidden');
  $('#results-list').append(
    $(
      `<p>Ponder about this activity:<br><strong>${
        activityJson.activity
      }</strong></p>`
    )
  );
}

function displayRandomAdvice(adviceJson) {
  emptyAndRemove();
  $('#next-advice').removeClass('hidden');
  $('#results-list').append(
    $(`<p>Here's advice:<br><strong>${adviceJson.slip.advice}</strong></p>`)
  );
}

function displayRandomDog(dogJson) {
  emptyAndRemove();
  $('#next-dog').removeClass('hidden');
  $('#results-list').append(
    $(`<img class="image" src="${dogJson.message}" alt="random dog image">`)
  );
}

function displayRandomCat(catJson) {
  emptyAndRemove();
  $('#next-cat').removeClass('hidden');
  $('#results-list').append(
    $(`<img class="image" src="${catJson[0].url}" alt="random cat image">`)
  );
}

function emptyAndRemove() {
  $('#results-list').empty();
  $('#results-list').removeClass('hidden');
  $('#js-form').addClass('hidden');
  $('#previous').removeClass('hidden');
  $('#js-error-message').addClass('hidden');
}

function nextButtom() {
  $('#next-activity').click(function() {
    getRandomActivity();
  });
  $('#next-advice').click(function() {
    getRandomAdvice();
  });
  $('#next-dog').click(function() {
    getRandomDog();
  });
  $('#next-cat').click(function() {
    getRandomCat();
  });
}

function copyright() {
  let d = new Date();
  $('#copyright').text(
    `Copyright \u00A9 ${d.getFullYear()} Lou Zuniga https://github.com/louzuniga`
  );
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
  });

  $('.random-dog').on('click', () => {
    return getRandomDog();
  });

  $('.random-cat').on('click', () => {
    return getRandomCat();
  });

  $('form').on('click', '.random-activity', function() {
    return getRandomActivity();
  });

  $('.random-advice').click(function() {
    return getRandomAdvice();
  });

  $('#previous').on('click', () => {
    location.reload();
    $('#results').addClass('hidden');
    $('#js-form').removeClass('hidden');
  });

  nextButtom();
  copyright();
}

$(watchForm);
