---
layout: page
title: Latest Posts
---
{% include JB/setup %}

<ul id="posts" class="posts">
  {% for post in site.posts %}
    <li><h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>  <small>{{ post.date | date_to_string }}</small></h2> </li>
  {% endfor %}
  
</ul>
