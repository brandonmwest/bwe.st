---
layout: page
title: Latest Posts
---
{% include JB/setup %}


<h3>Latest Posts from SendGrid.com</h3>
<ul id="sg_posts" class="posts">
</ul>

<hr/>

<h3>Personal Blog</h3>
<ul id="posts" class="posts">
  {% for post in site.posts %}
    <li><h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>  <small>{{ post.date | date_to_string }}</small></h2> </li>
  {% endfor %}
</ul>

<script type="text/javascript" src="https://www.google.com/jsapi">
</script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.3/moment.min.js">
</script>

<script type="text/javascript">
//<![CDATA[|
    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed("https://sendgrid.com/blog/author/brandon/feed/");
      feed.setNumEntries(3);
      feed.load(function(result) {
        if (!result.error) {
          var container = $('#sg_posts');
          for (var i = result.feed.entries.length-1; i > -1; i--) {
            var entry = result.feed.entries[i];

            var link = '<a href="' + entry.link + '">' + entry.title + ' (SendGrid.com)</a> <small>' + moment(entry.publishedDate).format("Do MMM YYYY"); + '</small>';

            var li = $("<li><h2>" + link + "</h2></li>");

            container.prepend(li);
          }
        }
      });
    }
    
    google.setOnLoadCallback(initialize);
//]]>
</script>