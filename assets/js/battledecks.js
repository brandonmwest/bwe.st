//need some sort of part of speech lib, inflection.js? pos.js?
//load all the corpora into memory

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
      "name": "buzzword_adverbs",
      "url": "/assets/data/buzzwords/adverbs.json"
   },
   {
      "name": "buzzword_verbs",
      "url": "/assets/data/buzzwords/verbs.json"
   },
   {
      "name": "buzzword_adjectives",
      "url": "/assets/data/buzzwords/adjectives.json"
   },
   {
      "name": "buzzword_nouns",
      "url": "/assets/data/buzzwords/nouns.json"
   },
   {
      "name": "computer_science_nouns",
      "url": "/assets/data/technology/computer_sciences.json"
   },
   {
      "name": "startups",
      "url": "/assets/data/technology/startups.json"
   },
   {
      "name": "objects",
      "url": "/assets/data/objects/objects.json"
   },
   {
      "name": "nasdaq_companies",
      "url": "/assets/data/corporations/nasdaq.json"
   },
   {
      "name": "verbs",
      "url": "/assets/data/words/verbs.json"
   },
   {
      "name": "nouns",
      "url": "/assets/data/words/nouns.json"
   },
   {
      "name": "adverbs",
      "url": "/assets/data/words/adverbs.json"
   },
   {
      "name": "adjectives",
      "url": "/assets/data/words/adjectives.json"
   }
];

var init = function(){
   //load all the corpora we want to use
   corpora_urls.forEach(function(corpus) {
      $.ajax({
         url: corpus.url,
         success: function(response){
            corpora[corpus.name] = response.data;
         }
      });
   });
   $('#generate').click(generateSlide);
};

$(document).ready(init);

var generateSlide = function(){
   var content = generateContent();
   $('#slide_title').text(content.caption);
   $('#bullet1').text(content.bullet1);
   $('#bullet2').text(content.bullet2);
   $('#bullet3').text(content.bullet3);
   getImage();
}

var connectors = ["using", "with", "employing", "implementing", "powered by"];

var generateContent = function() {
   words = {
      "nouns": [ corpora["nouns"].randomElement(),
         corpora["buzzword_nouns"].randomElement(),
         corpora["objects"].randomElement()
      ],
      "adjectives": [
         corpora["adjectives"].randomElement(),
         corpora["buzzword_adjectives"].randomElement()
      ],
      "verbs": [
         corpora["buzzword_verbs"].randomElement(),
         corpora["verbs"].randomElement().present
      ],
      "adverbs": [
         corpora["adverbs"].randomElement(),
         corpora["buzzword_adverbs"].randomElement()
      ],
      "noun": corpora["nouns"].randomElement(),
      "buzzword_noun": corpora["buzzword_nouns"].randomElement(),
      "cs_noun": corpora["computer_science_nouns"].randomElement(),
      "adjective": corpora["adjectives"].randomElement(),
      "buzzword_adjective": corpora["buzzword_adjectives"].randomElement(),
      "buzzword_verb": corpora["buzzword_verbs"].randomElement(),
      "verb": corpora["verbs"].randomElement().present,
      "buzzword_adverb": corpora["buzzword_adverbs"].randomElement(),
      "adverb": corpora["adverbs"].randomElement(),
      "objects": corpora["objects"].randomElement()
   }

   search_term = words.nouns.randomElement();
   noun1 = words.nouns.randomElement();
   words.nouns.remove(noun1);

   caption = words.buzzword_adjective
      + " " + noun1.pluralize()
      + " " + connectors.randomElement()
      + " " + words.cs_noun;

   bullet1 = ing(words.buzzword_verb).capitalize() + " " + words.buzzword_noun;
   bullet2 = ing(corpora["buzzword_verbs"].randomElement()).capitalize() + " " + corpora["buzzword_nouns"].randomElement();
   bullet3 = ing(corpora["buzzword_verbs"].randomElement()).capitalize() + " " + corpora["buzzword_nouns"].randomElement();
   
   return { 
      "caption": caption.titleize(),
      "bullet1": bullet1,
      "bullet2": bullet2,
      "bullet3": bullet3
   };
};

var getImage = function() {
   var options = "&is_commons=true&per_page=10&format=json&content_type=4"
   var url = flickr_url + "&text=" + search_term + options + "&api_key=" + flickr_key;
   //todo add load indicator

   $.ajax({url:url, dataType: "text"})
   .done(function(response, statusText){
      var text = response;
      var json_string = text.replace("jsonFlickrApi(","").slice(0, - 1);
      var data = JSON.parse(json_string);

      var num_images = data.photos.photo.length;

      if (num_images == 0){
         images = {};
         search_term = words.nouns.randomElement();

         return getImage();
      }

      images = data.photos.photo;
      var item = data.photos.photo.randomElement();
      var src = getImageSrc(item);
      $('#slide_image').attr("src",src);
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
   
   return link='<a href="'+urlz+'" mce_href="'+urlz+'" target="_blank">'+html+'</a>';   //var link='<a rel="flickr" title="'+ttlink+'" href="'+url+'" mce_href="'+url+'">'+html+'</a>';
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

