//add more kinds of captions and randomly choose them

//utilize company corpora

//find better source of images

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//https://github.com/ifnull/buzzwords/tree/master/assets/data
var flickr_url='https://api.flickr.com/services/rest/?method=flickr.photos.search';
var flickr_key='25501fe14617da5532a582aee01d1456';

var search_term='';
var words = {};
var images = {};

var corpora = {};
var corpora_urls = [
   {
      "name":         "buzzword_adverbs",
      "url":         "/assets/data/buzzwords/adverbs.json"
   },
   {
      "name":         "buzzword_verbs",
      "url":         "/assets/data/buzzwords/verbs.json"
   },
   {
      "name":         "buzzword_adjectives",
      "url":         "/assets/data/buzzwords/adjectives.json"
   },
   {
      "name":         "buzzword_nouns",
      "url":         "/assets/data/buzzwords/nouns.json"
   },
   {
      "name":         "computer_science_nouns",
      "url":         "/assets/data/technology/computer_sciences.json"
   },
   {
      "name":         "startups",
      "url":         "/assets/data/technology/startups.json"
   },
   {
      "name":         "objects",
      "url":         "/assets/data/objects/objects.json"
   },
   {
      "name":         "nasdaq_companies",
      "url":         "/assets/data/corporations/nasdaq.json"
   },
   {
      "name":         "verbs",
      "url":         "/assets/data/words/verbs.json"
   },
   {
      "name":         "nouns",
      "url":         "/assets/data/words/nouns.json"
   },
   {
      "name":         "adverbs",
      "url":         "/assets/data/words/adverbs.json"
   },
   {
      "name":         "adjectives",
      "url":         "/assets/data/words/adjectives.json"
   }
];

var init = function(){
   //load all the corpora we want to use into memory
   corpora_urls.forEach(function(corpus) {
      $.ajax({
         url: corpus.url,
         success: function(response){
            corpora[corpus.name] = response.data;
         }
      });
   });

    $('#generate').click(generateSlide);
    $('#new_title').click(newTitle);
    $('#new_bullets').click(newBullets);
    $('#new_image').click(newImage);
    $('#new_colors').click(randomTextColor);

    $('#inner h2').draggable({ axis: "y", containment: "parent"});
    $('#bullets').draggable({ containment: "parent"});

    setTimeout(generateSlide,500);
};

$(document).ready(init);

//http://stackoverflow.com/questions/5650924/javascript-color-contraster
var randomTextColor = function() {
  var hex_color = Colors.randomElement();
  var rgb = hexToRgb(hex_color);

  $("#slide_content_container h2 span").css("background","rgba(" + rgb.r + "," + rgb.b + "," + rgb.b +", 0.8");
  $("#slide_content_container ul").css("background","rgba(" + rgb.r + "," + rgb.b + "," + rgb.b +", 0.8");

  var brightness;
  brightness = (rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114);
  brightness = brightness / 255000;

  // values range from 0 to 1
  // anything greater than 0.5 should be bright enough for dark text
  if (brightness >= 0.5) {
    $('#slide_content_container').css("color","#222")
  } else {
    $('#slide_content_container').css("color","#EEE")
  }
}

var positionText = function(){
  $("#inner").css({
    position: "absolute",
    top: $('#slide_image').offset().top,
    left : $('#slide_image').offset().left + 5,
    width : $('#slide_image').innerWidth(),
    height : $('#slide_image').innerHeight()
  });

  $('#bullets').css({
    top: $('#slide_image').offset().top - 100
  });
}

var showLoader = function(){
  $("#overlay").css({
    top  : $('#slide_content_container').offset().top + 200,
    left : $('#slide_content_container').offset().left,
    height: $('body').height(),
    width : $('body').width()
  });    

  $("#loader").css({
    top  : "200px",
    left : ($('body').width() / 2)-48,
  });
  $('#slide_content_container').hide();
  $('#overlay').show();
}

var hideLoader = function(){
  $('#overlay').hide();
  $('#slide_content_container').show();
}

var newTitle = function(){
  var content = generateContent();
  $('#slide_title').text(content.caption);
}

var newImage = function(){
  showLoader();
  search_term = corpora["nouns"].randomElement();
  getImage();
  positionText();
}

var newBullets = function(){
  var content = generateContent();

  $("#bullets").html("");
  content.bullets.forEach(function(bullet){
    $("#bullets").append("<li>" + bullet + "</li>");
  });
}

var generateSlide = function(){
  showLoader();
  $("#bullets").html("");
   var content = generateContent();
   $('#slide_title').text(content.caption);

   content.bullets.forEach(function(bullet){
    $("#bullets").append("<li>" + bullet + "</li>");
   });
   getImage();
}

var connectors = ["using", "with", "employing", "implementing", "powered by"];

var generateContent = function() {
  noun = corpora["nouns"].randomElement();
  search_term = noun;

  //randomly pick from several caption formats
  caption = corpora["buzzword_adjectives"].randomElement()
    + " " + noun.pluralize()
    + " " + connectors.randomElement()
    + " " + corpora["computer_science_nouns"].randomElement();

  bullets = [];
  var num_bullets = Math.floor((Math.random() * 5) + 1);
  for(i = 0; i < num_bullets; i++){
    bullet = generateBullet();
    bullets.push(bullet);
  }

   return { 
      "caption": caption.titleize(),
      "bullets": bullets
   };
};

var generateBullet = function() {
  return ing(corpora["buzzword_verbs"].randomElement()).capitalize() + " " + corpora["buzzword_nouns"].randomElement();
}

var getImage = function() {
   var options = "&is_commons=true&per_page=10&format=json&content_type=4"
   var url = flickr_url + "&text=" + search_term + options + "&api_key=" + flickr_key;

   $.ajax({url:url, dataType:         "text"})
   .done(function(response, statusText){
      var text = response;
      var json_string = text.replace("jsonFlickrApi(","").slice(0, - 1);
      var data = JSON.parse(json_string);

      var num_images = data.photos.photo.length;

      if (num_images == 0){
         images = {};
         search_term = corpora["nouns"].randomElement();

         return getImage();
      }

      images = data.photos.photo;
      var item = data.photos.photo.randomElement();
      var src = getImageSrc(item);
      var link = getImageLink(item);
      $('#flickr_link').attr("href",link);

      $("#slide_image").remove();

      var image = $('<img id="slide_image" src="' + src + '"/>');
      $(image).load(positionText);
      $(image).load(randomTextColor);
      $("#image_container").append(image);

      hideLoader();
   })
   .fail(function(){
      $("#slide_image").remove();
      var fail = $('<h2 id="slide_image">Failed to get image.</h2>');
      $("#image_container").append(fail);
      hideLoader();
   });
};

var getImageSrc = function(item){
   var id=item.id;
   var title=item.title;
   var secret=item.secret;
   var server=item.server;
   var farm=item.farm;
   var owner=item.owner;
   var base=id+'_'+secret+'_c.jpg';
   var major=id+'_'+secret+'_z.jpg';
   var url= 'http://farm'+farm+'.static.flickr.com/'+server+'/'+major;
   var img='http://farm'+farm+'.static.flickr.com/'+server+'/'+base;
   
   return img;
}

var getImageLink = function(item){
   var id=item.id;
   var title=item.title;
   var secret=item.secret;
   var server=item.server;
   var farm=item.farm;
   var owner=item.owner;
   var base=id+'_'+secret+'_c.jpg';
   var major=id+'_'+secret+'_z.jpg';
   var url= 'http://farm'+farm+'.static.flickr.com/'+server+'/'+major;
   var img='http://farm'+farm+'.static.flickr.com/'+server+'/'+base;
   var urlz='http://www.flickr.com/photos/'+owner+'/'+id;
   
   return urlz;   //var link='<a rel="flickr" title="'+ttlink+'" href="'+url+'" mce_href="'+url+'">'+html+'</a>';
}

//from github.com/dariusk
var ing = function(verb) {
  var result = '';

  // if it ends in b, double the b
  // grab -> grabb
  if (verb[verb.length-1] === 'b') {
    verb = verb + 'b';
  }

  // if it ends in " to"
  if (verb[verb.length-3] === ' to') {
    verb = verb;
  }

  // if it ends in r, double the r
  // refer -> referring
  if (verb[verb.length-1] === 'r') {
    verb = verb + 'r';
  }

  // if it ends in ie, make it a y
  // vie -> vy
  if (verb.substr(verb.length-2, verb.length-1) === 'ie') {
    verb = verb.substr(0, verb.length-2) + 'y';
  }

  // if it ends in e, cut the e
  if (verb[verb.length-1] === 'e') {
    verb = verb.substr(0, verb.length-1);
  }

  result = verb + 'ing';

  return result;
}

Colors = ["#00ffff",
"#f0ffff",
"#f5f5dc",
"#000000",
"#0000ff",
"#a52a2a",
"#00ffff",
"#00008b",
"#008b8b",
"#a9a9a9",
"#006400",
"#bdb76b",
"#8b008b",
"#556b2f",
"#ff8c00",
"#9932cc",
"#8b0000",
"#e9967a",
"#9400d3",
"#ff00ff",
"#ffd700",
"#008000",
"#4b0082",
"#f0e68c",
"#add8e6",
"#e0ffff",
"#90ee90",
"#d3d3d3",
"#ffb6c1",
"#ffffe0",
"#00ff00",
"#ff00ff",
"#800000",
"#000080",
"#808000",
"#ffa500",
"#ffc0cb",
"#800080",
"#800080",
"#ff0000",
"#c0c0c0",
"#ffffff",
"#ffff00"]

var hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
