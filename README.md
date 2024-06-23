# Alertist

A simple alert management system built on top of the native [`dialog`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) HTML tag.

![Demo of the Alertist Package](src/demo.gif 'Demo of the Alertist Package')

[![NPM Registry Publisher](https://github.com/thisjt/alertist/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/thisjt/alertist/actions/workflows/npm-publish.yml) [![Demo Page Deployer](https://github.com/thisjt/alertist/actions/workflows/static.yml/badge.svg)](https://github.com/thisjt/alertist/actions/workflows/static.yml)

You can check for a [demo here](https://thisjt.me/alertist/demo).

Install the package:

```
npm install alertist
```

and then import it in your project.

```javascript
import alertist from 'alertist';
```

Don't forget to import the SASS file located in `dist/alertist.scss` in your project.

If you intend not to use this in a framework and instead just want to test
it out in a browser, you can use `unpkg` and include the js and css files into
your document.

```html
<link href="https://unpkg.com/alertist/dist/alertist.css" rel="stylesheet" />
<script src="https://unpkg.com/alertist/dist/alertist.browser.js"></script>
```

## Customization

You can customize the dialog styling by overwriting the SASS variables inside the
`src/scss/variables.scss`. If you want more customizability, you can always style it
yourself, up to you!

## Methods

### Alert

```js
alertist
	.alert({
		title: 'Title',
		text: 'Hello world!',
		button: 'Yes',
	})
	.then(() => {
		// do things after dialog is closed
	});
```

### Confirm

```js
alertist
	.confirm({
		title: 'Title',
		text: 'Hello world!',
		button: 'Yes',
		cancel: 'No',
	})
	.then((action) => {
		// do things after confirm is closed
		// action = true (ok) | null (cancel, x button)
	});
```

### Prompt

Make sure to compare strict equality of the `action` variable to
`null`, as it is possible for the `action` variable to have a string
with a value of ` ` which will equate to false if directly put inside an
if else statement. This is useful if you want the input value to be
optional in the prompt, but handle that the **OK** button is clicked.

```js
alertist
	.prompt({
		title: 'Title',
		text: 'Hello world!',
		type: 'input', // input, textarea, password, checkbox
		button: 'Yes',
		cancel: 'No',
	})
	.then((action) => {
		// do things after the prompt is closed
		// action = [prompt value] (ok) | null (cancel, x button)
	});
```

`action` variable values:

| Type     | OK        | Cancel | X      |
| -------- | --------- | ------ | ------ |
| input    | `string`  | `null` | `null` |
| textarea | `string`  | `null` | `null` |
| password | `string`  | `null` | `null` |
| checkbox | `boolean` | `null` | `null` |

### Toast

Be careful with setting `timeout:0`, `closeonclick:false`, and `closebutton:false`. This will make the toast permanently persist without any way of closing it until a page refresh happens.

```js
alertist
	.toast({
		text: 'Hello world!',
		timeout: 3000,
	})
	.then((action) => {
		// do things after toast closes
		// action = true (clicked by user), null (closes by itself)
	});
```
