FLICKR_API_KEY = '05ffe437472660bdc882aa85d7b64e86';

$(document).ready(function() {
    // Probably start a spinner or something like that

    // Get the list of cities and randomly choose one
    var cities = ["Georgetown", "San Francisco", "Taipei", "Los Angeles", "Toronto"];
    var chosenCity = cities[Math.floor(Math.random() * cities.length)];

    $(".info-pane .city-name").text(chosenCity);

    // Grab images from flickr
    $.ajax('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=05ffe437472660bdc882aa85d7b64e86&tags=' + chosenCity + '&extras=url_q&format=json&nojsoncallback=1&sort=relevance&media=photos', {
        success: function(data) {
            for (var i = 0; i < 6 && i < data.photos.photo.length; i++) {
                var photo = data.photos.photo[i];
                $(".photos-pane-1 div:nth-of-type(" + (i+1) + ")").append('<img class="img-rounded img-responsive" src="' + photo.url_q + '">');
            }

            for (var i = 6; i < 12 && i < data.photos.photo.length; i++) {
                var photo = data.photos.photo[i];
                $(".photos-pane-2 div:nth-of-type(" + (i-5) + ")").append('<img class="img-rounded img-responsive" src="' + photo.url_q + '">');
            }
        },
        error: function() {
            // Oops
        }
    });

    // Grab weather thingy
    var weatherData;
    $.ajax('http://api.openweathermap.org/data/2.5/weather?q=' + chosenCity, {
        success: function(data) {
            $(".info-pane .temperature").html(Math.floor(data.main.temp - 273.15) + "&#8451;")
        },
        error: function() {
            // Oops
        }
    });
});
