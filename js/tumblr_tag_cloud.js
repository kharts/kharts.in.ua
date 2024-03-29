(function () {
  var config = new Object();
  var start = 0;
  var all_tags = [];
  var tag_counts = [];
  var cloud = new Object();

  var scripts = document.getElementsByTagName('script');
  var this_script = scripts[scripts.length - 1];
  var params = this_script.src.replace(/^[^\?]+\??/,'').split('&');

  for(var i=0; i<params.length; i++) {
    var tmp = params[i].split("=");
    config[tmp[0]] = unescape(tmp[1]);
  }

  if(typeof(config.minsize) == 'undefined') config.minsize = '120';
  if(typeof(config.maxsize) == 'undefined') config.maxsize = '280';
  if(typeof(config.math) == 'undefined') config.math = 'log';

  var url_base = ((typeof(config.url) == 'undefined') ?
    ('http://' + document.domain + '/') : ('http://' + config.url + '/'));

  switch(config.css) {
    case ('default'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://rive.rs/stylesheets/tumblr_tag_clouds/default.css" />');
    break;
    case ('flickr'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://rive.rs/stylesheets/tumblr_tag_clouds/flickr.css" />');
    break;
  }

  document.write(
    '<div id="tag_cloud">' +
      '<div id="loading_tag_cloud">Loading tags...</div>' +
      '<ul id="tag_list"></ul>' +
    '</div>'
  );

  $(document).ready(function() {
    function sortNum(a, b) {return (a - b);}
    function sortByValue(keyArray, valueMap) {
      return keyArray.sort(function(a,b){return valueMap[a]-valueMap[b];});
    }
    function getProperties (obj) {
      var properties = [];
      for (var property in obj) properties.push(property);
      return properties;
    }
    function getTags() {
      $.getJSON(url_base+'api/read/json?callback=?&num=20&start='+start, function(data) {
        $(data.posts).each(function(i, post) {
          $(post.tags).each(function(i, tag) {
            if(typeof(tag) == 'string') all_tags.push(tag);
          });
        });
        if (start+20 < data['posts-total']) {
          start = start + 20;
          getTags();
        } else {
          getCloud();
        }
      });
    }
    function getCloud() {
      $(all_tags).each(function(i, tag) {
        cloud[tag] = (cloud[tag] ? cloud[tag] + 1 : 1);
      });
      var raw_cloud = new Object;
      for(tag in cloud) {raw_cloud[tag] = cloud[tag];}
      if(config.math == 'log') {
        for(tag in cloud) {cloud[tag] = Math.log(cloud[tag]);}
      }
      if(config.order == 'frequency') {
        var cloudSorted = new Object();
        var cloudKeys = getProperties(cloud);
        var sortedTags = sortByValue(cloudKeys, cloud).reverse();
        for (k in sortedTags) {
          cloudSorted[sortedTags[k]] = cloud[sortedTags[k]];
        }
        cloud = cloudSorted;
      } else if(config.order == 'alphabetical') {
        var cloudSorted = new Object();
        var cloudKeys = getProperties(cloud);
        var sortedTags = cloudKeys.sort(function(x,y) {
          var a = String(x).toUpperCase();
          var b = String(y).toUpperCase();
          if (a > b) {return 1;}
          if (a < b) {return -1;}
          return 0;
        });
        for (k in sortedTags) {
          cloudSorted[sortedTags[k]] = cloud[sortedTags[k]];
        }
        cloud = cloudSorted;
      }

      size_range = config.maxsize - config.minsize;
      for (j in cloud) tag_counts.push(cloud[j]);
      tag_counts.sort(sortNum);
      min_count = tag_counts[0];
      max_count = tag_counts[tag_counts.length - 1];
      slope = size_range / (max_count - min_count);
      count = 0
      for (tag in cloud) {
        count++;
        if(typeof(config.limit) != 'undefined' &&
        config.limit != 'none' &&
        count > config.limit) {
          break;
        }
        font_size = Math.round(slope*cloud[tag]-(slope*min_count-config.minsize));
        title = (raw_cloud[tag] == 1 ? raw_cloud[tag] + ' post' : raw_cloud[tag] + ' posts');
        link = '<a href="'+url_base+'tagged/'+tag+'" title="'+title+'">'+tag+'</a>';
        output = '<li style="font-size:'+font_size+'%;">'+link+' </li>';
        $("#tag_list").append(output);
      }
      $("#loading_tag_cloud").html('');
    }
    getTags();
  });
})();
