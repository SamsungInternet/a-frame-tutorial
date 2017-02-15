'use strict';
/* eslint no-var: 0 */
/* global CodeMirror, marked */

var MIN = 1;
var MAX = 10;

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
		step = 0;
	};
	nextStep();
	getSample();
};

var instructions = document.querySelector('.instructions');
var step = 1;
var scene = document.querySelector('a-scene #contents');

function renderStep(id) {
	instructions.innerHTML = marked(document.querySelector('#' + id + '[type="text/markdown"]').text.replace(/\n\t\t\t/ig, '\n'));
}

function getSample() {
	sample('step-' + step);
}

function sample(id) {
	editor.getDoc().setValue(wrapping.slice(0,8).join('\n') + '\n\t\t\t' + document.querySelector('#' + id + '[type="text/html"]').text.replace(/\n\t\t\t/ig, '\n\t\t\t').trim() + '\n' + wrapping.slice(8).join('\n'));
}
document.getElementById('btn-sample').addEventListener('click', getSample);

function submit() {
	scene.innerHTML = document.createRange().createContextualFragment(editor.getValue()).querySelector('a-scene').innerHTML;
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

