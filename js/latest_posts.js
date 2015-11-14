(function () {
    $(document).ready(function() {
        var latest_posts = document.getElementById("latest_posts");
        if (latest_posts != null) {
            var url = "http://" + document.domain + "/api/read/json?callback=?&num=10";
            $.getJSON(url, function(data) {
                $(data.posts).each(function(i, post) {
                    var title = getTitle(post);
                    var link = "<a href='" + post.url + "'>" + title + "</a>";
                    var paragraph = "<p>" + link + "</p>";
                    latest_posts.innerHTML = latest_posts.innerHTML + paragraph;
                });
            });
        };
    });
}) ();