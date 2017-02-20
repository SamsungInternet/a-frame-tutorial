'use strict';
/* eslint no-var: 0 */
/* global CodeMirror, marked, $ */

var MIN = 1;
var MAX = 9;

var wrapping = [
	'<!DOCTYPE html>',
	'<html>',
	'	<head>',
	'		<title>My A-Frame Demo</title>',
	'		<script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>',
	'	</head>',
	'	<body>',
	'		<a-scene>',
	'		</a-scene>',
	'	</body>',
	'</html>',
];

var editor;
window.onload = function () {
	editor = CodeMirror(document.getElementById('code'), { mode: 'text/html',
		extraKeys: { 'Ctrl-Space': 'autocomplete', 'Ctrl-Enter': submit },
		lineNumbers: true,
		value: ''
	});
	if (location.hash.length >= 2) {
		step = Number(location.hash.slice(1)) - 1;
	} else {
		step = MIN;
	};
	nextStep();
	getSample();
	submit();
};

var instructions = document.querySelector('.instructions');
var step = 1;
var scene = document.querySelector('a-scene');

function renderStep(id) {
	instructions.innerHTML = marked(document.querySelector('#' + id + '[type="text/markdown"]').text.replace(/\n\t\t\t/ig, '\n'));
	scene.resize();
}

function getSample() {
	sample('step-' + step);
}

function sample(id) {

	var wrapper = wrapping;
	var wrapperSplit = 8;

	if (id === 'step-9') {
		var wrapper = wrapping.slice();
		wrapper.splice(5, 0, '		<script src="//cdn.rawgit.com/donmccurdy/aframe-physics-system/v1.2.1/dist/aframe-physics-system.min.js"></script>');
		wrapper.splice(8, 1, '		<a-scene physics="gravity: -9.8;">');
		var wrapperSplit = 9;
	}

	editor.getDoc().setValue(wrapper.slice(0,wrapperSplit).join('\n') + '\n\t\t\t' + document.querySelector('#' + id + '[type="text/html"]').text.replace(/\n\t\t\t/ig, '\n\t\t\t').trim() + '\n' + wrapper.slice(wrapperSplit).join('\n'));
}
document.getElementById('btn-sample').addEventListener('click', getSample);

var oldEls = [];

function submit() {
	var res = editor.getValue().match(/<a-scene.*>([^p]|p)*<\/a-scene>/)[0];
	var virtualSceneEl = document.createRange().createContextualFragment(res).firstChild;

	// update the attributes of the scene
	[].forEach.call(virtualSceneEl.attributes, function (attr) {
		scene.setAttribute(attr.name, attr.value);
	});

	// remove old elements
	oldEls.splice(0).forEach(function (el) {
		scene.removeChild(el);
	});

	// add new elements
	[].slice.call(virtualSceneEl.children).forEach(function (el) {
		oldEls.push(el);
		scene.appendChild(el);
	});
}
document.getElementById('btn-submit').addEventListener('click', submit);

function nextStep() {
	if (step === MAX) return;
	step++;
	location.hash = step;
	renderStep('step-' + step);
}
document.getElementById('btn-nextstep').addEventListener('click', nextStep);


function prevStep() {
	if (step === MIN) return;
	step--;
	location.hash = step;
	renderStep('step-' + step);
}
document.getElementById('btn-prevstep').addEventListener('click', prevStep);


// Fancy Type Faces
window.WebFontConfig = {
	custom: {
		families: ['Samsung One:n4,n7'],
		urls: ['https://samsunginter.net/fonts/SamsungOne/fonts.css']
	}
};

(function(d) {
	var wf = d.createElement('script')
	var s = d.scripts[0];
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
	s.parentNode.insertBefore(wf, s);
} (document));