$.getJSON("/articles", function(article) {
    for (var i = 0; i < article.length; i++) {
       var url = article[i].link;
       var title = article[i].title;
       $("#articles").prepend("<div class='card text-center col-12' " + "<p data-id='" + url + "'>" + "<div class='card-body ' a href=" + url + ">"  + title + "</a>" + "<hr>" + "<" + "a href=" + url + " target ='_blank' " + " class= 'btn btn-outline-success ' " + ">" + "Open article in new tab" + "</a>" + "<br> <br>"+  "<a class='btn btn-outline-success save'>Save Article</a>" );
       $(".btn.btn-primary.save").on("click",$(this), function() {
        
          var savedArticle = $(this)
            .parents(".card")
            .data();
          $.ajax({
            method: "POST",
            url: ""
          })  
          
          $(this)
            .parents(".card")
            .remove();
      });
  }
  });

  $("#scrape").on("click", function() {
    console.log("scraped");
  window.location.href = "/"
}); 