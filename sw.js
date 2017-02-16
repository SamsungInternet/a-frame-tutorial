/* global toolbox, importScripts, self */
/* jshint browser:true */
'use strict';

importScripts('sw-toolbox.js');

toolbox.options.networkTimeoutSeconds = 3;

toolbox.router.get('https://cdn.polyfill.io/*', toolbox.cacheFirst);
toolbox.router.get('https://aframe.io/*', toolbox.cacheFirst);
toolbox.router.get('https://cdn.rawgit.com/*', toolbox.cacheFirst);
toolbox.router.get('https://rawgit.com/*', toolbox.cacheFirst);
toolbox.router.get('https://cdnjs.cloudflare.com/*', toolbox.cacheFirst);
toolbox.router.get('https://ajax.googleapis.com/*', toolbox.cacheFirst);
toolbox.router.get('https://samsunginter.net/fonts/*', toolbox.cacheFirst);

toolbox.router.default = toolbox.networkFirst;
