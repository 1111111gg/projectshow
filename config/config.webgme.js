// DO NOT EDIT THIS FILE
// This file is automatically generated from the webgme-setup-tool.
'use strict';


var config = require('webgme/config/config.default'),
    validateConfig = require('webgme/config/validator');

// The paths can be loaded from the webgme-setup.json
config.plugin.basePaths.push(__dirname + '/../src/plugins');
config.seedProjects.basePaths.push(__dirname + '/../src/seeds/TicTacToe');



config.visualization.panelPaths.push(__dirname + '/../src/visualizers/panels');




// Visualizer descriptors
config.visualization.visualizerDescriptors.push(__dirname + '/../src/visualizers/Visualizers.json');
// Add requirejs paths
config.requirejsPaths = {
  'panels': './src/visualizers/panels',
  'widgets': './src/visualizers/widgets',
  'mic-react-viz': './src/common',
};


config.mongo.uri = 'mongodb://127.0.0.1:27017/mic_react_viz';
validateConfig(config);
module.exports = config;
