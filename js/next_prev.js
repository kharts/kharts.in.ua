// functions for displaying next and previous posts title
(function () {
    $(document).ready(function() {
        function fillTitle(url, title_id) {
            var post_id = getIdFromUrl(url);
            if (post_id != "") {
                var url = url_base + post_id;
                $.getJSON(url, function(data) {
                    title = "";
                    $(data.posts).each(function(i, post) {
                        title = getTitle(post);
                    })
                var title_element = document.getElementById(title_id);
                title_element.innerHTML = title;
                })
            }
        }
        var domain = "kharts.in.ua";
        if (document.domain != "") {
            domain = document.domain;
        }
        var url_base = "http://" + domain + "/api/read/json?callback=?&id=";
        var next_link = document.getElementById("next_link");
        if (next_link != null) {
            fillTitle(next_link.href, "next_title");
        }
        var prev_link = document.getElementById("prev_link");
        if (prev_link != null) {
            fillTitle(prev_link.href, "prev_title");
        }
    })
}) ();
