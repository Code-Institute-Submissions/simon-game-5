# Simon game

Based on the famous electronic game of memory skill invented by Ralph H. Baer and Howard J. Morrison. 
The game works by highlighting buttons and playing their corresponding sounds for a brief period of time in a random squence. 
The user then has to repeat this sequence to progress to the next level. The game is won by completing all 20 levels.

## UX

The design is based on the original game's but done in a more minimalistic and constrasting style in order to make the buttons more visible to the player.
Thee game features 6 buttons instead of 4 and 20 overall levels since I felt the game could use a bit more of a challenge.

Mockups in a pdf format and user stories can be found here [UX assets](assets/ux)

The final version of the project differs from the mockups. 
As I developed the project I would realize that some of the design decisions weren't 
the right solutions and I would update them on the go.

## Features 

* 6 buttons with unique colors and sounds.
* 20 levels, all have to be completed in order to win the game.
* 2 game modes:
   * Normal mode selected with the `start` button where a user can make a mistake 3 times before losing the game.
   * Strict mode selected with the `strict` button where a single mistake means game over and the user has to 
     start from scratch.
* In normal mode, after every mistake the pattern is repeated to remind the player what the sequence so far is. It also repeats
  in intervals if a player doesn't move their mouse for a long enough period of time to prompt them to make a move.


## Technologies

* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
  * Used for structuring content
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
  * Used for the presentation of the page
* [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
  * Used for the layout of the page
* [JavaScript](https://www.javascript.com/)
  * Used for the logic of the game
* [JQuery](https://jquery.com/)
  * Used to symplify DOM manipulation
* [Jasmine](https://jasmine.github.io/)
  * Used for automated testing of game logic
* [Markdown](https://en.wikipedia.org/wiki/Markdown)
  * Used for formatting user_stories.md and README.md

## Testing 

### Manual Tests

1. Play game in normal mode:

   i. Press the start button and verify that the counter increments to 1, a button is lit up
      and a sound plays.
   
   ii. Press the button that lit up and verify that a sound plays, the button lights up, the counter 
       increments and the sequence starts again from the original button, now adding another random one.
       
   iii. Press a button thats not part of the sequence, verify that an error sound is played, the counter 
        flashes '--' and the whole sequence is repeated.
   
   iv. Press the wrong button 3 times in a row and verify that the game displays 'LOST' on the counter, plays
   a losing sound, the counter is reset to 1 and resets the sequence from a new random button.
   
   v. Input the correct sequence for 20 levels and verify that it's a win, the counter displays 'WIN', flashes
   through the colors of the whole sequence and a win sound plays.

2. Play game in strict mode:

   i. Press the strict mode and verify that the game starts
  
   ii. Press the wrong button and verify that instead of an error message, sound and the pattern repeating,
   the game displays a losing message and resets the game with a new random button and pattern.
  
3. Pressing game mode buttons during game:

   i. While in the middle of a normal game, press the start button again and verify that the game resets to a 
   new random button and pattern and the counter is reset too.
  
   ii. While in the middle of a normal game, press the strict button and verify that the game is reset but this time
   if a wrong button is pressed, instead of an error message being displayed, the losing one is instead and the game resets.
  
   iii. While in the middle of a strict game, press the start button and verify that the game resets and when an error is made,
   the game does not reset the pattern and instead displays and error message then repeats the pattern.
  
   iv. While in the middle of a strict game, press the strict button and verify that the game resets, then when a mistake is made
   the game resets to the begining with a new pattern after displaying the losing message.

Tested on mobile, tablet and desktop devices for responsiveness and in different 
browsers(Firefox, Microsoft Edge and Google Chrome) to test browser compatibility.


### Automated Tests

* [Jasmine](https://jasmine.github.io/pages/getting_started.html)
  * Used to test JavaScript
* [W3C Markup Validation Service](https://validator.w3.org/)
  * Used for testing html
* [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)
  * Used for testing css
* [Mobile Friendly Test](https://search.google.com/test/mobile-friendly)
  * Used for testing mobile layout

### Bugs

* There is a slight delay before the button sounds play which can result in the sounds not playing at the right time if 
  buttons are pressed too quickly. Not addressed yet.

## Deployment 

Deployed to Github Pages 

Link: [https://alexander4k.github.io/simon-game/](https://alexander4k.github.io/simon-game/).

Clone the repository by copying the clone url

In the terminal type `git clone` followed by the copied url

`cd` into `simon-game` and open `index.html`

## Credits

### Fonts

* Fonts - [Google Fonts](https://fonts.google.com/)

### Sounds 

* [My Instants](https://www.myinstants.com/index/ie/)
* [Soundjay](https://www.soundjay.com/beep-sounds-1.html)

## License

MIT