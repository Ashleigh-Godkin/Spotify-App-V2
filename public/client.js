// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {  
  
  $('form').submit(function(event) {
    event.preventDefault();
    
    let query = $('input').val();
    
    $.get('/search?' + $.param({query: query}), function(data) {
      $('input[type="text"]').val('');
      $('input').focus();
      
      document.getElementById('results').innerHTML = data.tracks.items.map(track => {
        return `<li><a href="${track.external_urls.spotify}">${track.name}   |   ${track.artists[0].name}</a></li>`;
      }).join('\n');
    });
  });
  
   $.get('/search-track', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = $('<h3><a href="' + data.external_urls.spotify + '">' + data.name + '</a></h3>');
    var artistName = $('<h3>' + data.artists[0].name + '</h3>');
    trackName.appendTo('#search-track-container');
    artistName.appendTo('#search-track-container');
    
    // Display the album art
    var img = $('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  
  /*$.get('/search-track', function(event) {
     event.preventDefault();
    
    let query = $('title').val();
    
    $.get('/search-track' + $.param({query: query}), function(data) {
     
      
      document.getElementById('results').innerHTML = data.tracks.items.map(track => {
        return `<li><a href="${track.external_urls.spotify}">${track.name}   |   ${track.artists[0].name}</a></li>`;
      }).join('\n');
    });
  });*/
  
  $.get('/artist', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the artist's image
    var img = $('<img class="circle-image" />');
    img.attr('src', data.images[0].url);
    img.appendTo('#artist-container');
    
    // Display the artist name
    var trackName = $('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = $('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
  });
  

});
