Tasks:

1. Change the HTML structure of static/index.html and write remaining CSS rules to mimic
the layout shown on mock-ups located in screenshots/ directory.

ad.1.
I did not change the HTML structure. I completed the CSS with fragments needed for the correct display of the
channel list depending on the screen resolution. I have not done projects on GRID before, so it can be something to fix but on Chrome
it looks like "on the screens".


2. Some HTML and CSS have already been written. You need to implement missing
components:
- heading
- channel list
channels.json file contains all of the necessary youtube channels data.

ad. 2. Header completed with missing elements and implemented connection with channels.json. With the help of jQuery ajax I have displayed
       channel lists with selected information. forEach loop extract the necessary data for all single youtube channel.


3. Add following behavior to the application:
- Selecting radio button should sort listed channels accordingly. Sorting order
(asc/desc) is up to you.


Implemented radio search. The changeHandler function listens for changes in the value of the radio attribute and depending on the recognized value
starts the appropriate sorting function. Beacause i don`t want to modifiy the response received from Ajax, I created the auxiliary object "Channels"
and then I sorted data. Thanks to this, after calling the radio cleaning function, it was possible to return to the original response state from Ajax.
Every time when, sorting is performed the channel list is cleaned in the DOM tree and the list already sorted is displayed again.


- Filter channels by title based on an input text. Filtering should be
case-insensitive.

Implemented search that retrieves a string from the search field and then compares it with the text contained in the <h2> headings in the channel list.
If the given string is not in this field, it changes the display to "none" by hiding the channel in the list. Thanks to the loop, they are all channels
titles checked in this way. After passing the loop, only the channels meeting the given criterion remain.


- Pressing “clear” button should reset both sorting options and text filter.

Pressing the clear button causes the "checked" attribute to be switch to "false" which deselects the selected radio. And then clearing the value
of the input search. Then I clean the channel list and load the original response from ajax.

- Clicking or tapping on a channel logo should open the link to the channel's
youtube page in a new browser card.


I set the logo as a link to the channel and I get the <a> href from ajax just like all other data.


- Make sure to represent numbers in the US/British notation (each 10^3 group
separated by a comma) e.g. one million = 1,000,000

I received the British notation of numbers thanks to parse a string received from ajax to a number, and then set the British notation by converting toLocalString.




The solution is checked on a regular on Chrome. It also looks good on Opera, but on Edge and Mozilla beat me when it comes to grid prefixes. Maybe
with some autoprefixer it would be easier but i didn`t want to combine too much.

Unfortunately, so far I have not been able to write unit tests, but people are supposedly sharing those who write and those who
who will start writing them. So I'm happy to be doing it.

All comments are welcome.