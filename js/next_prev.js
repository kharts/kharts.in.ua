// functions for displaying next and previous posts title
(function () {
    $(document).ready(function() {
        var url_base = "http://" + document.domain + "/api/read/json?callback=?&id=";
        var next_link = document.getElementById("next_link");
        if (next_link != null) {
            var id = getIdFromUrl(next_link.href);
            if (id != "") {
                var url = url_base + id;
                $.getJSON(url, function(data) {
                    title = "";
                    $(data.posts).each(function(i, post) {
                        title = getTitle(post);
                    })
                var next_title = document.getElementById("next_title");
                next_title.innerHTML = title;
                })
            }
        }
        var prev_link = document.getElementById("prev_link");
        if (prev_link != null) {
            var id = getIdFromUrl(prev_link.href);
            if (id != "") {
                var url = url_base + id;
                $.getJSON(url, function(data) {
                    title = "";
                    $(data.posts).each(function(i, post) {
                        title = getTitle(post);
                    })
                var prev_title = document.getElementById("prev_title");
                prev_title.innerHTML = title;
                })
            }
        }
    })
}) ();
