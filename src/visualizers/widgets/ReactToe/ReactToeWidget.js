/*globals define, WebGMEGlobal*/

/**
 * Generated by VisualizerGenerator 1.7.0 from webgme on Fri Jul 21 2023 22:01:49 GMT-0500 (Central Daylight Time).
 */

define(['css!./styles/ReactToeWidget.css'], function () {
    'use strict';

    var WIDGET_CLASS = 'react-toe';

    function ReactToeWidget(logger, container) {
        this._logger = logger.fork('Widget');

        this._el = container;

        this.nodes = {};
        this._initialize();

        this._logger.debug('ctor finished');
    }

    ReactToeWidget.prototype._initialize = function () {
        var width = this._el.width(),
            height = this._el.height(),
            self = this;

        // set widget class
        this._logger.info("cnm")
        this._el.addClass(WIDGET_CLASS);


        // Create a dummy header
        this._el.append('<h3>ReactToe Events:</h3>');
        

        // Registering to events can be done with jQuery (as normal)
        this._el.on('dblclick', function (event) {
            event.stopPropagation();
            event.preventDefault();
            self.onBackgroundDblClick();
        });
    };

    ReactToeWidget.prototype.onWidgetContainerResize = function (width, height) {
        this._logger.debug('Widget is resizing...');
    };

    // Adding/Removing/Updating items
    ReactToeWidget.prototype.addNode = function (desc) {
        if (desc) {
            // Add node to a table of nodes
            var node = document.createElement('div'),
                label = 'children';

            if (desc.childrenIds.length === 1) {
                label = 'child';
            }

            this.nodes[desc.id] = desc;
            node.innerHTML = 'Adding node "' + desc.name + '" (click to view). It has ' +
                desc.childrenIds.length + ' ' + label + '.';

            this._el.append(node);
            node.onclick = this.onNodeClick.bind(this, desc.id);
        }
    };

    ReactToeWidget.prototype.removeNode = function (gmeId) {
        var desc = this.nodes[gmeId];
        this._el.append('<div>Removing node "' + desc.name + '"</div>');
        delete this.nodes[gmeId];
    };

    ReactToeWidget.prototype.updateNode = function (desc) {
        if (desc) {
            this._logger.debug('Updating node:', desc);
            this._el.append('<div>Updating node "' + desc.name + '"</div>');
        }
    };

    /* * * * * * * * Visualizer event handlers * * * * * * * */

    ReactToeWidget.prototype.onNodeClick = function (/*id*/) {
        // This currently changes the active node to the given id and
        // this is overridden in the controller.
    };

    ReactToeWidget.prototype.onBackgroundDblClick = function () {
        this._el.append('<div>Background was double-clicked!!</div>');
    };

    /* * * * * * * * Visualizer life cycle callbacks * * * * * * * */
    ReactToeWidget.prototype.destroy = function () {
    };

    ReactToeWidget.prototype.onActivate = function () {
        this._logger.debug('ReactToeWidget has been activated');
    };

    ReactToeWidget.prototype.onDeactivate = function () {
        this._logger.debug('ReactToeWidget has been deactivated');
    };

    return ReactToeWidget;
});
