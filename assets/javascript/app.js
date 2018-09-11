
  var animals = [
    "dog", "cat", "rabbit", "hamster",  "goldfish","horse",
    "bird", "ferret", "turtle", "chinchilla","cow",
    "capybara", "teacup pig", "pig", "goat", "frog",
    "hedgehog", "fish", "elephants", "giraff", "chicken",
  ];

  function gyphButtons() {
    $('#buttons').empty();
    for (var i = 0; i < animals.length; i++) {
        var nextButton = "<button class='animal-btn' data-animals='" + animals[i] + "'>" + 
            animals[i] + "</button>"
        $('#buttons').append(nextButton);
    }
}
    gyphButtons();
 $(document).on("click", ".animal-btn", function() {
    // stores the value of the clicked topic

    var animal = $(this).attr("data-animals");
    console.log(animal);
     // URL for Giphy API 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
     //AJAX GET request to access data
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        
        var results = response.data;
         for (var i = 0; i < results.length; i++) {
             var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
             // create a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);
             
            // display each gif on the page
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "gif");
             
            gifDiv.append(p);
            gifDiv.append(animalImage);
             // prepend the gifDiv to the gif-results div
            $("#gif-results").prepend(gifDiv);
        }
    });
});
 $(document).on("click", ".gif", function() {
    console.log("cow");
    
    
    var state = $(this).attr("data-state");
    
    
   
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});
 $('#add-search-term').on("click", function() {
   
    if ($('#animal-input').val().length > 0) {
       
        var searchTerm = $('#animal-input').val();
        animals.push(searchTerm);
            gyphButtons();
    }
});