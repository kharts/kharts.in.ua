// functions for displaying next and previous posts title
(function () {
    $(document).ready(function() {
        function getTitle(post) {
            title = "";
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
        next_link = document.getElementById("next_link");
        prev_link = document.getElementById("prev_link");
        url_base = "http://" + document.domain + "/api/read/json?callback=?&id="
        if (next_link != null) {
            url = url_base + next_link.Href;
            $.getJSON(url, function(data) {
                title = "";
                $(data.posts).each(function(i, post) {
                    title = getTitle(post);
                })
                next_title = document.getElementById("next_title");
                next_title.innerHTML = title;
            })
        }
    })
}) ();