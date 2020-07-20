# paris-tech-exercise

This is the repository of the MakeMusic Paris hire test.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [yarn](https://yarnpkg.com/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `yarn install`

## Running / Development

* `yarn start`
* Visit your app at [http://localhost:3000](http://localhost:3000).

### Running Tests

* `yarn test`

## Exercise

The exercise consists in the implementation of a single web page application which is a chromatic tuner.
The application should display the frequency and the closest note name of the sound captured by the computer microphone.
The page should allow a musician to tune in his instrument.

When you have completed the exercise, push all your git commits to the remote git repository that has been created for you and send us an email to warn us.
Don't hesitate to ask questions if something is not clear

### Expected Architecture

The exercise and the final app will have two concerns:
 - Business Logic (a.k.a. audio engine): acquires signal, detects frequency and provides a note name and the distance in cents from the perfect note
 - Graphical rendering layer: React components which display and react to the audio engine output

### Implement the Audio Engine

In this step, you should code the microphone signal acquisition and process the acquired signal by a simple autocorrelation algorithm.

We have created a skeletton app, that is displaying dummy static frequence/note/cents informations. (that you can see using `yarn start`)

Your code will be written in replacement of the dummy code of the skeletton file `src/libs/data_feed.js`. You can architecture the code as you want as long as the interface of the DataFeed class does not change

The output of this processing chain should return, in the foundFrequency function:

- frequency expressed in Hz
- the closest note
- the cents from the perfect not

Note:
- you can use the `getUserMedia()` and `scriptProccessorNode` webAudioApi primitives
- `scriptProccessorNode` needs to have its output connected to a destination in order to work
- The audio engine may need an internal memory in order to smooth out its output values

Commit the code in a git branch and push it to the remote repository

At the end of this step we should be able to:
- run `yarn start`
- having the browser prompting for microphone access
- the frequency, note, cents displayed in the webpage in the basic design


### Implement the UI

Create a layout inspired by the one in the picture using multiple React components
(it's not important that the final display is exactly the one presented but the main ideas of the design should be kept)

![Image](./tuner.gif?raw=true)

Notes:
- The CSS framework Bootstrap 3 is included in the project
- You can also use flex CSS rules to help manage the page layout.

Commit the code in a git branch and push it to the remote repository

At the end of this step we should be able to:
- run `yarn start`
- press the "start" button the button label changes to "stop"
- the frequency, note, cents start to be displayed in the webpage in the new design

### Going Further

This step is not mandatory but is closest to our coding principles and will make good impression

- write unit tests for your React Components
