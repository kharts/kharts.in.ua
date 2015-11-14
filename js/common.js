function getTitle(post) {
    var title = "";
    switch (post.type) {
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
            title = "";
    }
    return title;
}

function getIdFromUrl(url) {
    var res = "";
    var slash_pos = url.lastIndexOf("/");
    if (slash_pos != -1) {
        res = url.slice(slash_pos + 1, url.length);
    }
    return res;
}