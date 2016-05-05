var baseUrl = "http://localhost:3000/";

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: baseUrl + "questions.json",
    success: function(data)
    {
        //console.log(questions);
        //alert("success")
        var questions = data.questions;

        // fetch template once, outside the loop
        // render every question with the template we menu
        // look up the documentation on mustache
        // https://github.com/janl/mustache.js
        // Step 1 - fetch template html from the DOM
        var template = $('#question-summary').html();
        // Step 2 - Parse the template. optional, speeds up future users
        Mustache.parse(template);   // optional, speeds up future uses

        for (var i=0; i<questions.length; i++) {
          // Step 3: we generated HTML using the data we get and the template we parsed
          //var rendered = Mustache.render(template, {name: "Luke"});
          // questions[i] -> {title: "hello world", id: 14, view_count: 3}
          var rendered = Mustache.render(template, questions[i]);
          // Step 4: Add the rendered HTML to the DOM
          $("#questions").append(rendered);

        }
    },
    error: function() {
        alert("Problem loading questions. Please retry");
    }
  });

  $("#questions").on("click", "h2 a",function(){
    //alert("clicked");
    $.ajax({
      method: "GET",
      // $(this).data("id") is a shortcut for data-id
      url: baseUrl + "questions/" + $(this).data("id") + ".json",
      success: function(question){
        //console.log(question);
        var template = $('#question-details').html();
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, question);
        $("#single-question").html(rendered);
        $("#questions").fadeOut(500, function(){
          $("single-question").fadeIn(500);
        });

      },
      error: function(){
        alert("Error loading question.  Please try again");
      }
    });
  });

  $("#single-question").on("click", "#back", function() {
    $("single_question").fadeOut(500);
    $("#questions").fadeIn(500);
  });

});
