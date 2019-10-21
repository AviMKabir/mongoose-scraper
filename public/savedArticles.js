$.getJSON("/saved", function(article) {
    // For each one
    for (var i = 0; i < article.length; i++) {
        // Display the apropos information on the page
        var url = article[i].link;
        var title = article[i].title;
        $("#articles").prepend("<div class='card text-center col-12' " + "<p data-id='" + url + "'>" + "<div class='card-header ' a href=" + url + ">"  + title + "</a>" + "<hr>" + "<" + "a href=" + url + " target ='_blank' " + " class= 'btn btn-outline-success ' " + ">" + "Open article in new tab" + "</a>" + "<br> <br>"+  "<a class='btn btn-outline-danger delete''>Delete Article</a>" );
  
  }

  $(".btn.btn-warning.notes").on("click",$(this),  function() {
    // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });

  });
  $(".btn.btn-danger.delete").on("click",$(this), function() {
  //  Delete saved article 
     
  
      // Remove card from page
      $(this)
        .parents(".card")
        .remove();
  });
});