function getTitle(post) {
    var title = "";
    switch (post.type) {
        case "regular":
            title = post['regular-title'];
            if (title === "") {
                title = extractTextBetweenH1Tags(post['regular-body']);
            }
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
            break;
        default:
            title = "";
    }
    return cutTitle(title);
}

function getIdFromUrl(url) {
    var res = "";
    var slash_pos = url.lastIndexOf("/");
    if (slash_pos != -1) {
        res = url.slice(slash_pos + 1, url.length);
    }
    return res;
}

function extractTextBetweenH1Tags(inputString) {
  // Define a regular expression to match <h1>...</h1> tags and capture the content in between.
  const regex = /<h1>(.*?)<\/h1>/gi;

  // Use the match method to find all matches in the input string.
  const matches = inputString.match(regex);

  // Check if any matches were found.
  if (matches) {
    // Initialize an array to store the extracted text.
    const extractedText = [];

    // Loop through the matches and extract the content between <h1> and </h1> tags.
    for (const match of matches) {
      // Use a regular expression to extract the text between <h1> and </h1> tags.
      const text = match.replace(/<h1>|<\/h1>/gi, '');
      extractedText.push(text);
    }

    // Return the array of extracted text.
    return extractedText;
  } else {
    // Return null if no matches were found.
    return null;
  }
}

function cutTitle(title) {
    chars = " .,;:"
    if (title.length > 140) {
        i = 140;
        while ((i < title.length) && (chars.indexOf(title[i]) == -1 )) {
            i++;
        }
        title = title.slice(0, i) + "...";
    }
    return title;
}