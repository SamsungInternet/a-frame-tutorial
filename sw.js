/* global toolbox, importScripts, self */
/* jshint browser:true */
'use strict';

importScripts('sw-toolbox.js');

toolbox.options.networkTimeoutSeconds = 3;

toolbox.router.get(/https:\/\/cdn.polyfill.io\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/aframe.io\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/cdn.rawgit.com\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/rawgit.com\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/code.jquery.com\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/cdnjs.cloudflare.com\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/ajax.googleapis.com\/.*/ig, toolbox.cacheFirst);
toolbox.router.get(/https:\/\/samsunginter.net\/fonts\/.*/ig, toolbox.cacheFirst);

toolbox.router.default = toolbox.networkFirst;
