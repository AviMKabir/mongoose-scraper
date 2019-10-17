$.getJSON("/articles", function(article) {
    for (var i = 0; i < article.length; i++) {
       var url = article[i].link;
       var title = article[i].title;
       var summary = "Article Summary";
       $("#articles").append("<div class='card text-white bg-dark mb-2' style='max-width: 20rem'>" + "<p data-id='" + article[i]._id + "'>" + "<div class='card-header ' a href=" + article[i].link + ">"  + title + "</a>" + "<hr>" + "<hr>" + "<a class='btn btn-primary save'>Save Article</a>" + "<br>" + "<" + "a href=" + article[i].link + " class= 'btn btn-primary ' " + ">" + "Go somewhere" + "</a>");
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