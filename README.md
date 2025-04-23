# miniproject
The purpose of this design studio is to be capable of generating and allowing end-users to play othello (reversi) game.
The description will talk about the different components and configuration options that need to be taken
to allow the studio to work.
## Installation
First you should download the files except temp1.zip or download the temp1.zip from github repository,
To install this design studio, you have two options. You can either choose the preferred docker based deployment
 or you can stick to the standard way that involves more installation.

### Docker based deplyoment
You are going to need install [Docker](https://www.docker.com/) on your machine and fetch this code. Once
 everything is downloaded you just need to initiate a `docker-compose up -d` command to start all necessary
 containers and access the server at the localhost:8888 port. Be mindful that your database will be stored in the
 `db` subdirectory, so make sure you are not editing it manually. Also be mindful that instead of the `default` 
 configuration, this deployment uses the `dc` one.
### Basic deployment
For a regular deployment, you need to install the following components on top of fetching this repository:
- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [MongoDB](https://www.mongodb.com/)

After all components in place, you need to install the dependencies, using `npm i` command and start your deployment 
using the `node ./app.js` command. If you have not changed the configuration, your design studio should be accessible on 
port 8888 of your localhost.

## Development
If you are using this repository as an example and would like to 'recreate' it or add further components to it, you are
going to need additional software:
- [NodeJS](https://nodejs.org/en/) (LTS recommended)
- [WebGME-CLI](https://www.npmjs.com/package/webgme-cli) (latest recommended)

You are going to use nodejs to bring in potentially new components or dependencies while the CLI is there to generate or import design studio components with handling the necessary config updates as well.

## Components
We are going to list the available components in this studio as well as describing how they can be created or what 
needs to be set for them to work as intended.

### Seed
There is a single seed in the project representing the example studio - tictactoe - but all other default seeds are also available.

To create new one, just use the command `webgme new seed -f mySeedFile.webgmex mySeedName`.

### Plugin
There are three plugins in this studio to showcase the currently available languages for interpretations.
- CreateGame: this plugin is written in python and responsible for creating a game in the proper folder with the start state.
- CheckWinCondition: this plugin is written in javascript and simply checks if one of the players has won the game.
- BuildDescriptor: this plugin is written in javascript and shows how a structured data representing the model for the visualization can be created with a plugin - which allows for a more generalized approach and minimizes the need for learning all the different APIs of the system
- Playermoves: this plugin in this studio to show how the to play othello game,judge whether the piece can be landed.
- mytile:this plugin in this studio to help show how to play othello game.
- undo:this plugin in this studio is to help satisfy undo function,is to help the game return to former condition.

### Game Introduction
Steps to enter the game interface:

1.Click on "Games" to enter the menu.
2.Navigate to "Game-001".
3.In "Game-001", select the "ReactToe" on the left.
![Alt text](https://github.com/1111111gg/miniproject/blob/main/2.JPG)

Game Board: Composed of an 8 x 8 grid. Initially, the central 4 squares of the board are occupied by alternating black and white pieces.

Game Rules:The game starts with black pieces.
A new piece must form one or more straight lines (horizontal, vertical, or diagonal) with any existing piece on the board, trapping opponent pieces.
Between the new and existing pieces forming a straight line, there must be one or more opponent pieces.

4.You can click button to creategames or drag othellogamestate on the left to start a new game
### Instructions
Placing a Piece: Click on an empty space on the board to place a piece.

Left-side Information Display: Shows the current player and the number of black and white pieces on the board.

Action Buttons:

Undo: Reverts the last move.
Auto: Initiates an automatic move.
Hints: Available move positions are highlighted on the board.

### Example Screenshots
![Alt text](https://github.com/1111111gg/miniproject/blob/main/1.JPG)

### notation
learn othello game by https://github.com/ksakiyama/react-othello
and learn structure by https://github.com/kecso/mic-react-viz
