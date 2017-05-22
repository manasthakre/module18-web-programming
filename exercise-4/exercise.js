'use strict';
//d3 has already been "imported"

//Move the ball (the <circle>) to the top of the slide by setting
//its `cx` attribute to 225 and its `cy` attribute to 95.



//Add event listeners so that when the mouse is over the #cloud, it disappears
//(reappearing when the mouse leaves).



//Add an event listener so that when the user clicks on the ball, it moves to
//the bottom of the slide (cx:415, cy:320).
//Chain the attribute change calls to the returned value from calling `transition()`
//on the selection to animate the ball!
//You can call `duration()` after `transition()` to specify the speed in ms
//(1000) looks good



//Modify the above callback so that the ball's position _toggles_ when you click
//on it---if it is at the bottom of the slide, move to the top, and vice versa.


//Modify your script so that it *counts* how many times the ball has gone down
//the slide, logging out the count.
//Bonus: add an HTML element that shows this count!
