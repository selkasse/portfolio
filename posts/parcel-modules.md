---
title: "Troubleshooting Modules with Parcel"
date: "2020-04-19"
---

When I took Wes Bos's [Beginner Javascript Course](https://beginnerjavascript.com/), I was able to use [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [Parcel](https://parceljs.org/) just fine on their own, but ran into an issue when I tried to use them together.

I didn't get any errors, but functions imported from modules were coming back as `undefined`.

In this post, I list the steps I took to get around the issue.

## The Fix

The issue appeared when I started the [web speech color game exercise](https://github.com/wesbos/beginner-javascript/tree/master/exercises/84%20-%20Web%20Speech%20Colour%20Game). The `handleResult` function in `handlers.js` would return `undefined` when I tried to import it into `speech.js`.

If I copied the `handleResult` function into `speech.js`, it worked as expected, but I wanted to be able to use it from the module, and follow along with the exercise, the way it was intended.

As Wes mentions in the video for this exercise, the Chrome browser must be used for this particular exercise, since it uses the experimental speech recognition API. Note that this means **you need the official Chrome browser**; a Chrome-_based_ browser like [Brave](https://brave.com/) will not work.

With that out of the way, let's get to the actual steps for resolution:

1. Remove the 'Speech Color Game' exercise directory from project directory
2. Manually recreate the exercise directory
3. Create the `index.html` file within the directory, and copy-paste the markup from the [repo](https://github.com/wesbos/beginner-javascript/blob/master/exercises/84%20-%20Web%20Speech%20Colour%20Game/index.html)
4. Add `type="modules"` attribute to the opening `<script>` tag:

```html
<body>
  <h1>Say a Color</h1>
  <div class="colors"></div>
  <script src="./speech.js" type="modules"></script>
</body>
```

5. Create the `style.css` file and paste in its contents from the repo
6. Create the `colors.js` file and paste in its contents from the repo
7. Create the `speech.js` file; leave it empty for now
8. Create the `handlers.js` file; leave this one empty as well
9. In your terminal, make sure you are in the exercise directory
10. Run `npm init`, setting the entry point to `speech.js` when prompted

If you accidentally set the entry point as the default, no worries. We can still change it in the next step.

11. Edit your `package.json` file to include the `start` script, `browserslist`, and the entry point if you missed it in step 10 (it corresponds to `main`)

```json
{
  "name": "web-speech-colours",
  "version": "1.0.0",
  "description": "",
  "main": "speech.js",
  "scripts": {
    "start": "parcel index.html"
  },
  "author": "",
  "license": "ISC",
  "browserslist": ["last 1 chrome versions"]
}
```

12. Install Parcel as a local devDependency by running:

`npm install parcel-bundler -D`

Now we we can paste in the necessary code to make sure the handler function works when imported from the `handlers` module.

13. In `speech.js`:

```js
import { handleResult } from "./handlers"

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

function start() {
  // see if their browser supports this
  if (!("SpeechRecognition" in window)) {
    console.log("Sorry your browser does not support speech reco. ")
    return
  }
  // it is supported
  console.log("Starting...")
  // make a new speech reco
  const recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.onresult = handleResult

  recognition.start()
}

start()
```

14. In `handlers.js`:

```js
export function handleResult(e) {
  console.log(e)
}
```

15. Run `npm run start`, put your localhost Parcel URL into Chrome, and start yappin'!

You should now see the console logging your voice data.
