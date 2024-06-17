# Alertist

A simple alert management system built on top of the native [**"dialog"**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) HTML tag.

![Demo of the Alertist Package](src/demo.gif 'Demo of the Alertist Package')

Simply install the package:

```
npm install alertist
```

and then import it in your project.

```javascript
import alertist from 'alertist';
```

Don't forget to import either the SASS file for styling inside the
`src/scss/main.scss` or include the `dist/alertist.css` file in your
document.

If you intend not to use this in a framework and instead just want to test
it out in a browser, you can use `unpkg` and include the js and css files into
your document.

```html
<link href="https://unpkg.com/alertist/dist/alertist.css" rel="stylesheet" />
<script src="https://unpkg.com/alertist/dist/alertist.browser.js"></script>
```

That's it!

---

## Features

- Supports dragging of the dialog window
- Plenty of customizability
- Function checker before calling okCallback
- Pop out a form into the dialog window

---

## Customization

You can customize the dialog styling by overwriting the SASS variables inside the
`src/scss/variables.scss`. If you want more customizability, you can always style it
yourself, up to you!

---

We currently have 2 types of alerts available. This will expand in the future but
as of now this is what the package offers.

1. Alert
2. Confirm
3. Form Pullout

## Alert

Syntax:

```javascript
// Use it like this:
alertist.alert({
	title: 'Title',
	text: 'Hello world!',
	button: 'Yes', // default: 'OK'
	okCallback: () => {},
	cancelCallback: () => {},
	check: (dialogElement) => {
		return true;
	}, // Optional
});
```

Here's the HTML if you want to style this alert type yourself:

```html
dialog.alertist.alertist-confirm div.alertist-container div.alertist-header div.alertist-title button.alertist-title_close img div.alertist-body div.alertist-footer
button.alertist-footer_button
```

## Confirm

Syntax:

```javascript
// Use it like this:
alertist.confirm({
	title: 'Title',
	text: 'Hello world!',
	button: 'Yes', // default: 'OK'
	cancel: 'No', // default: 'Cancel'
	okCallback: () => {},
	cancelCallback: () => {},
	check: (dialogElement) => {
		return true;
	}, // Optional
});
```

Here's the HTML structure if you want to style this alert type yourself:

```
dialog.alertist.alertist-confirm
	div.alertist-container
		div.alertist-header
			div.alertist-title
			button.alertist-title_close
				img
		div.alertist-body
		div.alertist-footer
			button.alertist-footer_button
			button.alertist-footer_cancelbutton
```

## Form Pullout

Pulls the form created in the DOM and puts it inside a pop-up dialog box.

Syntax:

```javascript
// Use it like this:
alertist.form({
	title: 'Log In to this Website',
	target: 'form#login',
	submit: false,
	okCallback: (e) => {
		const form = e.querySelector('form#login');
		console.log(form.username, form.password);
	},
	check: (elem) => {
		return new Promise((resolve, reject) => {
			alertist.confirm({
				// [alertist.confirm] Supports chaining!
				text: 'Are you sure you want to log in?',
				okCallback: () => {
					resolve();
				},
				cancelCallback: () => {
					reject();
				},
			});
		});
	},
});
```

```html
<form id="login">
	username: <input placeholder="admin" name="username" /><br />
	password: <input placeholder="********" name="password" /><br />
	<input type="submit" value="Log In" />
</form>
```

## `callback` Functions

There are three functions that you can add to the alertist object parameter.

### `okCallback`

Pretty self explanatory. This function will run when the user clicks on the "OK" button.

### `cancelCallback`

This function will run when either the X button, the Cancel button, or the background backdrop
gets clicked.

### `check`

This is a function that will run when the user attempts to click on the "OK" button. If unassigned,
this defaults to a function that returns `true`, but you can override this so that you can try doing
some kind of check before the `okCallback` function runs. It needs a return statement if assigned, and
will accept either a `return true`, `return false`, a promise that `resolve()` or a promise that
`reject()`. If the function receives a `false` or a `reject()`, the alert box will remain open and will
not close.

_Usage:_

```javascript
alertist.confirm({
	text: 'Hello world!',
	check: ({ dialogElement }) => {
		return true;
	},
});

alertist.confirm({
	text: 'Hello world!',
	check: ({ dialogElement }) => {
		return false;
	},
});

alertist.confirm({
	text: 'Hello world!',
	check: ({ dialogElement }) => {
		return new Promise((resolve, reject) => {
			resolve();
		});
	},
});

alertist.confirm({
	text: 'Hello world!',
	check: (dialogElement) => {
		return new Promise((resolve, reject) => {
			reject();
		});
	},
});

alertist.confirm({
	text: 'Hello world!',
	check: async (dialogElement) => {
		const value = await fetch(`https://example.com/api`);
		return value === 'ok' ? true : false;
	},
});
```
