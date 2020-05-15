var apiKEY = '9b7ddce343c54eaca95069d97fd45ec7'

function changeBackground(backgrounds, weather) {
  console.log(backgrounds, weather)
  if (backgrounds[weather] !== undefined) {
    $('body').css("background", backgrounds[weather])
  } else {
    $('body').css("background", backgrounds.default)
  }
  $('body').css("background-size", "cover")
}

function toggleDisplay() {
  $('form').toggle();
  $('#reset-wrapper').toggle();
}

var backgrounds = {
  rain: "url(./Images/joy-stamp-pGQbWXBC1dA-unsplash.jpg) no-repeat center top",
  clouds: "url(./Images/daria-nepriakhina-auMjWDfTFhI-unsplash.jpg) no-repeat center top",
  default: "url(./Images/chandan-chaurasia-wCYuhCA4T9k-unsplash.jpg) no-repeat center top"
}

$(document).ready(function () {


  $('.search-form').submit(function (event) {
    event.preventDefault();
    var location = $('#search').val();
    console.log(location);
    $.get('https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + location + '&appid=' + apiKEY, function (data) {
      console.log(data)
      changeBackground(backgrounds, data.weather[0].main.toLowerCase())
      // if (data.weather[0].main === 'Rain') {
      //   $('body').addClass('rain')
      // } if (data.weather[0].main === 'Clouds') {
      //   $('body').addClass('cloudy')
      // }

      $('.results').html('<div id="results" style="display:block;">' +
        '<h1 class="results-title">' + data.name + ', ' + data.sys.country + '</h1>' +
        '<div class="current-weather">' +
        '<h2 class="results-weather">' + data.weather[0].main + '<h2>' +
        '<p class="results-description">' + data.weather[0].description + '</p>' +
        '</div>' +
        '<h2>Temperatures</h2>' +
        '<ul class="results-temperatures">' +
        '<li>' + '<h4>Temperature </h4>' + data.main.temp + '</li>' +
        '<li>' + '<h4>Feels Like </h4>' + data.main.feels_like + '</li>' +
        '<li>' + '<h4>Min. Temperature </h4>' + data.main.temp_min + '</li>' +
        '<li>' + '<h4>Max. Temperature </h4>' + data.main.temp_max + '</li>' +
        '<li>' + '<h4>Humidity </h4>' + data.main.humidity + '</li>' +
        '<li>' + '<h4>Pressure </h4>' + data.main.pressure + '</li>' + '</ul>' +
        '<h2>Wind</h2>' +
        '<ul class="results-wind">' +
        '<li>' + '<h4>Speed</h4>' + data.wind.speed + '</li>' +
        '<li>' + '<h4>Degrees</h4>' + data.wind.deg + '</li>' + '</ul>' +
        '</div>')
    })
    toggleDisplay();

  })
});

// click event for the search again button
$('#reset-wrapper button').on('click', function (evt) {
  toggleDisplay();
  changeBackground(backgrounds, '')
  $('.results').empty();
});


$(".fade").click(function () {
  $("form").fadeOut();
});

$('.results').hide()

$('.solid').on('click', function () {
  $(".results").slideDown(500);
});

$('form input').on('focus', function () {
  $('input').addClass('switch')
})

$('form input').on('blur', function () {
  $('input').removeClass('switch')
})

$('.circle button').on('click', function () {
  $('.circle').toggleClass('green');
})