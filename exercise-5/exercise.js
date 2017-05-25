'use strict';
//d3 has already been "imported"

//base Spotify uri
var BASE_URI = "https://api.spotify.com/";

//Create a variable `searchUri` that is the URI to seach Spotify for your
//favorite artist. You will need the construct this query usig String
//concatenation. Log out the variable (so you can test it in the browser)


//Send an AJAX request to the `searchURI`. In the resopnse callback, log out
//the `id` of the _first_ item in the returned results.
//Note: we CANNOT "return" this value to use outside of the callback!



//Define a function `getTopTracks()` that takes in a Spotify artist id as an
//argument. This function should send an AJAX request for the top tracks by
//that artist (don't forget the `country` parameter!). Once a response is received,
//flatten (map) each track into an object containing the track's `preview_url`,
//as well as the url for the track's `album` image (the last one, small one)
//Log out this object (for testing).
//
//You can test your function by calling it from the callback of your search
//request. Notice that sequential (synchronous) AJAX requests need to happen
//in the predecessor's callback



//Define a function `renderTracks()`` that takes in an array of objects, each
//representing a track with an image url and a preview url. The function should
//appends a new <div> element to the webpage's `#tracks` div. Give the new <div>
//two child elements:
//  - an <img> element whose `src` is the image url of the track
//  - an <audio> element whose `src` is the the preview url. Also give the element
//    a `controls` attribute with a value of `true`
//Call this function from inside the `getTopTracks()` function.



//Notice how we use callbacks to sequence all of these functions!
