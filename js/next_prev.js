// functions for displaying next and previous posts title
(function () {
    $(document).ready(function() {
        function getTitle(post) {
            var title = "";
            switch(post.type) {
                case "regular":
                    title = post['regular-title'];
                    break;
                case "link":
                    title = post['link-text'];
                    break;
                case "quote":
                    title = post['quote-text'];
                    break;
                case "photo":
                    title = post['photo-caption'];
                    break;
                case "conversation":
                    title = post['conversation-title'];
                    break;
                case "video":
                    title = post['video-caption'];
                    break;
                case "audio":
                    title = post['audio-caption'];
                    break;
                case "answer":
                    title = post['question'];
                default:
                    title = 0;
            }
            return title;
        }
        function getIdFromUrl(url) {
            var res = "";
            var slash_pos = url.lastIndexOf("/");
            if (slash_pos != -1) {
                res = url.slice(slash_pos, url.lenght - 1);
            }
            return res;
        }
        var next_link = document.getElementById("next_link");
        var prev_link = document.getElementById("prev_link");
        var url_base = "http://" + document.domain + "/api/read/json?callback=?&id="
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
    })
}) ();
