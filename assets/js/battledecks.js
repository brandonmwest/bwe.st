//add more kinds of captions and randomly choose them
//utilize company corpora
//random fonts

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

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

var search_url = 'http://www.splashbase.co/api/v1/images/search/';
var random_url = 'http://www.splashbase.co/api/v1/images/random';
var search_term='';
var words = {};

var corpora = {};
var corpora_urls = [
   {
      "name":  "buzzword_adverbs",
      "url":  "/assets/data/buzzwords/adverbs.json"
   },
   {
      "name":  "buzzword_verbs",
      "url":  "/assets/data/buzzwords/verbs.json"
   },
   {
      "name":  "buzzword_adjectives",
      "url":  "/assets/data/buzzwords/adjectives.json"
   },
   {
      "name":  "buzzword_nouns",
      "url":  "/assets/data/buzzwords/nouns.json"
   },
   {
      "name":  "computer_science_nouns",
      "url":  "/assets/data/technology/computer_sciences.json"
   },
   {
      "name":  "startups",
      "url":  "/assets/data/technology/startups.json"
   },
   {
      "name":  "objects",
      "url":  "/assets/data/objects/objects.json"
   },
   {
      "name":  "nasdaq_companies",
      "url":  "/assets/data/corporations/nasdaq.json"
   },
   {
      "name":  "verbs",
      "url":  "/assets/data/words/verbs.json"
   },
   {
      "name":  "nouns",
      "url":  "/assets/data/words/nouns.json"
   },
   {
      "name":  "adverbs",
      "url":  "/assets/data/words/adverbs.json"
   },
   {
      "name":  "adjectives",
      "url":  "/assets/data/words/adjectives.json"
   },
   {
      "name":  "animals",
      "url":  "/assets/data/animals/common.json"
   },
   {
      "name":  "colors",
      "url":  "/assets/data/colors/web_colors.json"
   },
   {
      "name":  "veggies",
      "url":  "/assets/data/foods/vegetables.json"
   },
   {
      "name":  "countries",
      "url":  "/assets/data/geography/countries.json"
   },
   {
      "name":  "jobs",
      "url":  "/assets/data/humans/occupations.json"
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
  var hex_color = corpora.colors.randomElement().hex;
  var rgb = hexToRgb(hex_color);

  $("#slide_content_container h2 span").css("background","rgba(" + rgb.r + "," + rgb.b + "," + rgb.b +", 0.8");
  $("#slide_content_container ul").css("background","rgba(" + rgb.r + "," + rgb.b + "," + rgb.b +", 0.8");

  var brightness;
  brightness = (rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114);
  brightness = brightness / 255000;

  // values range from 0 to 1
  // anything greater than 0.5 should be bright enough for dark text
  if (brightness >= 0.5) {
    $('#slide_content_container').css("color","#222");
  } else {
    $('#slide_content_container').css("color","#EEE");
  }
};

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
};

var showLoader = function(){
  $("#overlay").css({
    top  : "200px",
    left : $('#slide_content_container').left,
    height: $('body').height(),
    width : $('body').width()
  });    

  $("#loader").css({
    top  : "200px",
    left : ($('body').width() / 2)-48,
  });
  $('#slide_content_container').hide();
  $('#overlay').show();
};

var hideLoader = function(){
  $('#overlay').hide();
  $('#slide_content_container').show();
};

var newTitle = function(){
  var content = generateContent();
  $('#slide_title').text(content.caption);
};

var newImage = function(){
  showLoader();
  search_term = corpora.nouns.randomElement();
  getImage();
};

var newBullets = function(){
  var content = generateContent();

  $("#bullets").html("");
  content.bullets.forEach(function(bullet){
    $("#bullets").append("<li>" + bullet + "</li>");
  });
};

var generateSlide = function(){
  showLoader();
  $("#bullets").html("");
   var content = generateContent();
   $('#slide_title').text(content.caption);

   content.bullets.forEach(function(bullet){
    $("#bullets").append("<li>" + bullet + "</li>");
   });
   getImage();
};

var connectors = ["using", "with", "employing", "implementing", "powered by"];

var generateContent = function() {
  noun = corpora.nouns.randomElement();
  search_term = noun;
  var random = Math.floor((Math.random() * 3) + 1);

  switch(random) {
    case 1:
      noun = Math.floor((Math.random() * 2)) > 0 ? 
               corpora.nouns.randomElement().pluralize() :
               corpora.buzzword_nouns.randomElement().pluralize();

      caption = corpora.buzzword_adjectives.randomElement() + 
      " " + noun.pluralize() + 
      " " + connectors.randomElement() +
      " " + corpora.computer_science_nouns.randomElement();
      break;

    case 2:
      adverbs = ['',corpora.adverbs.randomElement() + " ",corpora.buzzword_adverbs.randomElement() + " "];

      caption = Math.floor((Math.random() * 2)) > 0 ? 
        corpora.animals.randomElement().pluralize() 
        : corpora.veggies.randomElement().pluralize();

      caption = adverbs.randomElement() + corpora.buzzword_adjectives.randomElement() + " " + caption;

      search_term=caption;
      break;

    case 3:
      adverb = Math.floor((Math.random() * 2)) > 0 ? 
               corpora.adverbs.randomElement() :
               corpora.buzzword_adverbs.randomElement();

      caption = adverb + 
        " " + ing(corpora.verbs.randomElement().present.capitalize()) + 
        " " + corpora.nouns.randomElement().pluralize();
      break;
  }

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
  var random = Math.floor((Math.random() * 6) + 1);
  var bullet = '';

  switch(random) {
    case 1:
      bullet =  ing(corpora.buzzword_verbs.randomElement()).capitalize() + 
                " " + corpora.buzzword_nouns.randomElement();
    break;

    case 2:
      noun = Math.floor((Math.random() * 2)) > 0 ? 
               corpora.nasdaq_companies.randomElement().name :
               corpora.jobs.randomElement().pluralize();

      bullet = corpora.verbs.randomElement().past.capitalize() + 
                " by " + noun +
                " in " + corpora.countries.randomElement().capitalize();     

    break;

    case 3:
      bullet = corpora.adjectives.randomElement().capitalize() + 
                " " + corpora.jobs.randomElement().pluralize();     
    break;


    default:
      bullet = ing(corpora.buzzword_verbs.randomElement()).capitalize() + 
                " " + corpora.buzzword_nouns.randomElement();
    break;
  }
  
  return bullet;
};

var getImage = function(random) {
   var url = random ? random_url : search_url;

   $.ajax({
      url:url,
      dataType: "json",
      data: { "query": search_term }
    })
   .done(function(response, statusText){
      if(!random){
        var num_images = response.images.length;
        if (num_images === 0){
          return getImage(true);
        }
  
        var item = response.images.randomElement();
      } else {
        item = response;
      }
      var src = item.url;
      
      if( (src.indexOf("mp4") != -1) || (src.indexOf("webm") != -1))
        return getImage(true);

      $("#slide_image").remove();

      var image = $('<img id="slide_image" src="' + src + '"/>');

      $(image).load(function() {
        randomTextColor();
        hideLoader();
        setTimeout(positionText,05);
      });

      $("#image_container").append(image);
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
};

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
};

//from github.com/dariusk
var ing = function(verb) {
  if (verb.length < 2)
    return;

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
};

var hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
