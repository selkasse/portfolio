---
title: "Twitter Bot Part 2 : Securing API Keys"
date: "2020-06-04"
---

In [Part 1](/blog/twitter-bot) of this post, we created a simple Twitter bot that quotes tweets from a given user.

The bot itself works fine, but we do have one glaring issue: Security.

You may have noticed that our API keys are shown in plain text right in our `bot.js` file.

In this post, we're going to fix that using environment variables.

## Understanding Environment Variables

First, let's answer the question: What are environment variables?

Environment variables are just what they sound like -- variables for your environment. Except, instead of the values being used for the logic of your application, they are used at a system level for the configuration of your application. These variables typically only need to be set once, and then their values can simply be referenced in your code.

Before we dive in here, it's important to note that there are multiple ways to set up your environment variables.

If you're on Windows, you may want to try [setting your environment variables through Powershell](https://mcpmag.com/articles/2019/03/28/environment-variables-in-powershell.aspx).

Another option for Windows users (and the one I recommend) is to use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10), and then install [zsh](https://evdokimovm.github.io/windows/zsh/shell/syntax/highlighting/ohmyzsh/hyper/terminal/2017/02/24/how-to-install-zsh-and-oh-my-zsh-on-windows-10.html).

If you're on macOS, you shouldn't need to install anything, although you may need to create a `.bashrc` file. More on that in a minute.

If you're having trouble with any of the methods above, then you may want to try the [dotenv](https://www.npmjs.com/package/dotenv) npm package.

## Setting Environment Variables

For the purposes of this post, we are going to focus on configuring environment variables through either your `.zshrc` file (if you're using zsh), or your `.bashrc` file. The syntax should be the same in either case.

> This section uses the `code` command, and assumes you have Visual Studio Code installed. The reason for this is for consistency, as the commands should work on any environment, as long as VS Code is installed.

The first thing we want to do is open (or create) our `.zshrc` or `.bashrc` file. You can do that by running the following command from your terminal (it is not necessary to be in your project directory):

`code ~/.zshrc` (replace with `.bashrc` if not using zsh).

> For the remainder of the post I will be referring to the file as the `.zshrc` file. Just keep in mind that the two are interchangeable, as far as the steps you need to take to set your environment variables.

If you already have this file created, it will open in Visual Studio Code.

If you do not already have the file created, this command both creates the file, and then opens it in Visual Studio Code.

From here, we need to create variables for our API credentials. Recall that we have four separate credentials for our Twitter bot:

- consumer key
- consumer secret
- access token
- access token secret

So what we need to do is create variables for each of these credentials, and store them in our `.zshrc` file.

We can name the variables anything we want, but it is a good idea to name them something that is recognizable. We should have something like this:

```
export BOT_CONSUMER_KEY=OtYVuKyn101nJNqmkD00gOWr1

export BOT_CONSUMER_SECRET=tyNOliCqoo2o35kzSyLNsHGry2gg81

export BOT_ACCESS_TOKEN=1266877680hiiI0127-vKh8bo4aXa74V4A1

export BOT_ACCESS_TOKEN_SECRET=5VmZzabcdefghijUyHv6vATdeRlZoSZxqMTdKa1
```

Save the file, and head back to your terminal. Sine your environment will not be immediately aware of these new variables, we either need to close the terminal and re-open it, or 'source' the `.zshrc` file with the following command:

`source ~/.zshrc`

Once you've done that, we need to check to see if our Node environment is aware of our new environment variables. We can do that using the Node [REPL](https://docs.repl.it/), using these commands:

`node` : Press `enter` and it will launch the REPL. You should notice that your terminal has a different prompt now.

`process.env` : Press `enter` and you should see the four environment variables we set displayed in the terminal.

Next, it's time to use those variables in our code!

## Using Environment Variables in our Code

Bringing the variables into our code is as simple as referencing `process.env`, and using a little bit of [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```js
const {
  BOT_CONSUMER_KEY,
  BOT_CONSUMER_SECRET,
  BOT_ACCESS_TOKEN,
  BOT_ACCESS_TOKEN_SECRET,
} = process.env
```

Now, we simply swap out the raw credentials with the environment variables when we initialize the Twit package:

```js
const t = new Twit({
  consumer_key: BOT_CONSUMER_KEY,
  consumer_secret: BOT_CONSUMER_SECRET,
  access_token: BOT_ACCESS_TOKEN,
  access_token_secret: BOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // * optional HTTP request timeout to apply to all requests.
  strictSSL: true, // * optional - requires SSL certificates to be valid.
})
```

If you're wondering how Twitter is going to be aware of these variables, fear not. We're covering that next!

## Making Environment Variables Accessible Remotely

At this point, only our local environment is aware of these variables that we have set. We can fix that by storing the same key/value pairs in our Netlify site configuration.

- Head to [Netlify](https://www.netlify.com/) and log in
- Click on your site, and then select 'Site Settings'
- Click the 'Build & deploy' section on the left
- Choose 'Environment' from the list of options that are nested under Build & deploy

Here, you should see a section called 'Environment Variables'. Go ahead and click 'Edit variables', and then add the variables that we set up in the previous step. Make sure to use the same names.

Make sure to press 'Save' in the Netlify interface once you are finished adding the variables.

Now, we just need to push our project code to the remote repository so that our Netlify site builds, and syncs up our variables. Before we do that, though, we need to create a `.gitignore` file so that we don't push our entire `node_modules` folder to our remote repository:

- Create a new file in the root of your project directory, and name it `.gitignore`
- Open the `.gitignore` file, and type `node_modules` in the file
- Save the file
- In your terminal, run a `git status` command, and make sure that the `node_modules` folder is **not** listed

Now we can push our code to git:

- `git add .`
- `git commit -am "added environment variables"`
- `git push`

Now, if we head over to the repo on our GitHub account, we should see our `bot.js` file present, with no API credentials exposed.

Test the bot to make sure it still works by running `node bot.js` in your terminal.

Hooray for security!

## Having trouble?

If the steps in either Part 1 or Part 2 of this post did not work for you, or if you need some more clarification, please let me know! I am happy to help.

Of course, your question doesn't _have_ to be about these Twitter bot posts; it can be anything -- even something I might not know! I genuinely enjoy figuring things out, and if I can do that while helping you, then it's a win-win for me.
