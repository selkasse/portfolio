---
title: "Making a Twitter Bot with Node.js and Netlify"
date: "2020-06-03"
---

In this post, we'll take a look at how to use Node.js, the Twitter API, Netlify, and a package called [Twit](https://github.com/ttezel/twit) to make a simple Twitter bot. Our bot will quote tweets from a given Twitter user.

If you know how to create a Git repository, and have [Node.js](https://nodejs.org/en/) installed, you should be able to follow along just fine.

If you would rather follow along with a video, I've also posted the solution to my [YouTube Channel](https://youtu.be/GdwIjtNZGBw).

## Create a Twitter developer account

The first thing you're going to want to do is apply for a [Twitter Developer Account](https://developer.twitter.com/en).

Depending on what you want to do with your Twitter bot, it may be a good idea to create a test/development Twitter account, and use that account to apply.

- Sign into the Twitter Developer site with the Twitter account you want to use
- Click [Apply](https://developer.twitter.com/en/apply-for-access) in the upper right-hand corner
- Click the 'Apply for a developer account' button
- You will be taken to a [page](https://developer.twitter.com/en/application/use-case) where you will need to tell Twitter what you are using their API for
- Select 'Making a bot' under the 'Hobbyist' column, and press 'Next'
- If you haven't yet provided Twitter with a phone number, you will need to do so at this point
  - Once you have verified your phone number, refresh the application page, and the red warning message should go away
- You will then be asked some more detailed questions about your use case for the API

Finally, you are presented with the [Developer Agreement](https://developer.twitter.com/en/application/terms). As expected, it is pretty lengthy. While reading the entire thing is probably not necessary, they do provide several links to various policies regarding use of automation and the API in general, which are worth reading.

Once you accept the Developer Agreement, you will need to confirm your email.

Before making an app, we need do some pre-work and set up our environment.

## Create your project locally

- Make a new directory on your machine and open the folder in your text editor of choice
- Create a basic HTML file

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Twitter Bot</title>
  </head>
  <body>
    <h1>This is my Twitter Bot!</h1>
  </body>
</html>
```

We aren't actually going to be doing anything with this HTML page, other than using it as confirmation that our site is hosted correctly.

## Create a Git repository

First, initialize the repository locally:

- Open your terminal and navigate to the root of your project directory
- `git init`
- `git add .`
- `git commit -m "initial commit"`

Next, create a repository on [github](https://github.com/).

Now, we are provided with some commands to link our local repository with the remote repository:

- `git remote add origin git@github.com:<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git`
- `git push -u origin master`

## Host the project on Netlify

In this step, we are going to be linking our GitHub repository to a Netlify site.

- Head to [Netlify's website](https://www.netlify.com/) and create an account if you do not have one already.
  - It's free!
- Click 'New site from Git' in the upper right hand area of the interface
- Select 'GitHub' under the 'Continuous Deployment' section
- Search for the name of your repository and press `enter`
- Accept the default options on the 'Create a new site' page by clicking 'Deploy Site' at the bottom of the page
- Wait for your site to build. It will have a fun name like `quizzical-murdock-948ade`
- Click the link underneath your site name, and the HTML page we built a couple steps ago should show up

Copy the URL for the site, and make a note of it. We will need it in the next step

## Create an App

If you've confirmed your email with Twitter, you should be able to click [Create an app](https://developer.twitter.com/en/apps).

You are presented with a form. Go ahead and give your app a name and a description.

In the field marked 'Website URL', paste in your Netlify site URL.

Note that you also need to provide an additional description at the bottom of the page.

Once you have completed the steps above, the 'Create' button at the bottom of the page will become enabled.

Click the 'Create' button, and we have our app!

## Create a dev environment

- Click your name in the top-right, next to your profile picture
- Select 'Dev environments' from the dropdown
- Click 'Set up dev environment' under 'Account Activity API / Sandbox'
- Give your dev environment a name
- Select the app that we created in the last step
- Click 'Complete Setup'

## Set up app permissions

- Click your name in the top-right, next to your profile picture
- Select 'Apps' from the dropdown
- Click the 'Details' button for your App
- Click the 'Permissions' tab at the top of the page
- Click 'Edit'
- Under 'Access Permission', select 'Read, write, and Direct Messages'
- Press 'Save'

## Obtain API credentials

- Click your name in the top-right, next to your profile picture
- Select 'Apps' from the dropdown
- Click the 'Details' button for your App
- Click the 'Keys and Tokens' tab at the top of the page
- Copy down your API key and API secret key
- Click the 'Generate' button next to 'Access token & access token secret'
- Copy these keys as well
  - Note that you are only shown these keys once
  - If you do not copy them down somewhere, you will not be able to see them again, and will need to regenerate the token/secret

## Install the Twit package in our project

- Once again, open your terminal and navigate to the root of your project directory
- Initialize your project as an npm package by issuing the command: `npm init -y`
- Head to the [README](https://github.com/ttezel/twit) for Twit
- Install Twit with `npm install twit`

## Link Twit to our Twitter app

In the root of your project directory, create a new file. We can call it something like `bot.js`.

From the Twit README, copy this first section of code into your `bot.js` file:

```js
var Twit = require("twit")

var T = new Twit({
  consumer_key: "...",
  consumer_secret: "...",
  access_token: "...",
  access_token_secret: "...",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
})

//
//  tweet 'hello world!'
//
T.post(
  "statuses/update",
  { status: "hello world!" },
  function (err, data, response) {
    console.log(data)
  }
)
```

Use the keys that you copied from the 'Keys and Tokens' section of our app and paste them into values for:

`consumer_key`

`consumer_secret`

`access_token`

`access_token_secret`

Next, we are going to post a Tweet using our bot!

## Tweet it!

From your terminal, type `node bot.js`

The terminal will output a response from Twitter, where you can see that the 'hello world!' tweet was created.

Sign into Twitter using the account that you created your Developer Account with.

You should see your 'hello world!' tweet on your timeline.

## Get tweets from another user

Tweeting from our bot account is fun and all, but there is a lot more that we can do with the Twitter API.

For this part, we will need to get a little creative, as the Twit README does not explicitly supply us with a way to retrieve another user's tweets.

However, it does provide us with a way to get the followers from a user, so we're halfway there!

Here is what the README provides us:

```js
//
//  get the list of user id's that follow @tolga_tezel
//
T.get(
  "followers/ids",
  { screen_name: "tolga_tezel" },
  function (err, data, response) {
    console.log(data)
  }
)
```

Now, if we head to the Twitter Developer [documentation](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline), we can see that there is an endpoint for getting the tweets for a given user.

So we can use that as a reference to figure out the syntax we need to use with Twit:

```js
//
//  get the list of tweets from @tolga_tezel
//
T.get(
  "statuses/user_timeline",
  { screen_name: "tolga_tezel" },
  function (err, data, response) {
    console.log(data)
  }
)
```

Now if we go to our terminal and run `node bot.js` once more, we should see all of the tweets from that user returned in the terminal.

## Filtering the tweets

So we were able to get all tweets from a user, but what if that user has thousands of tweets? We don't want to scroll through all of those if we want to pick out a particular tweet to quote. Luckily, Twitter provides us with some options that we can pass to our API call to get some more granular results.

If we head over to the documentation for the API endpoint we're using ([GET statuses/user_timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline)), we see a 'Parameters' section.

You might notice that we have already used the `screen_name` parameter. We can use some of the other parameters to trim down our list.

At this point, it all depends on what you're looking for. Let's just assume that we are getting tweets from an account with a large number of tweets. Let's look at how we might reduce the number.

The parameters that look most useful and easy to implement to me are:

- `count`
- `exclude_replies`
- `include_rts`

Let's try and get 50 tweets that do not include replies, and do not include retweets. To do that, we could edit our code to look something like this:

```js
//
//  get the list of tweets from @tolga_tezel
//
T.get(
  "statuses/user_timeline",
  {
    screen_name: "tolga_tezel",
    count: 50,
    exclude_replies: true,
    include_rts: false,
  },
  function (err, data, response) {
    console.log(data)
  }
)
```

We test the results by saving the file, and again running `node bot.js` in our terminal.

We get less tweets, but it's still a bit much to scroll through all of that in our terminal. Each tweet returns a lot of data, and we don't necessarily need all of that data for the purposes of our simple bot.

So, to make our output more readable, we can implement some Javascript to only show us the data we need:

```js
T.get(
  "statuses/user_timeline",
  {
    screen_name: "tolga_tezel",
    count: 50,
    exclude_replies: true,
    include_rts: false,
  },
  function (err, data, response) {
    data.forEach(tweet => {
      console.log(tweet.id_str)
      console.log(tweet.text)
    })
  }
)
```

Now when we run `node bot.js`, we should only get two lines for each tweet, instead of the mass of data we were getting back before.

Browse through the tweets, and pick one that you want to quote, as we will be doing that in the next section.

Keep in mind that if you pick a tweet that mentions someone via `@`, then that person will get tagged by your tweet when we run our code. For testing purposes, it's best to choose a tweet that does not include any `@` mentions.

## Quoting a tweet

Before we quote a tweet from a user, we should understand the URL structure for a tweet.

An easy way to do this is to go to Twitter in your browser, click on any tweet, and then observe the URL.

Let's use one of my tweets as an example. The URL looks like this:

https://twitter.com/sharifElkassed/status/1261464404861702144

All tweets share this same structure. Let's break it down:

- `https://twitter.com`: The base URL
- `sharifElkassed`: The Twitter handle of the user that posted the tweet
  - corresponds to the `screen_name` parameter
- `status`: tweets
- `1261464404861702144` an ID to identify the tweet
  - corresponds to `id_str` property

Another way to express that is:

`https://twitter.com/<screen_name>/status/<id_str>`

Now that we understand that, we need to understand how quoting a tweet works, as far as the API is concerned.

The main thing to note here is that this is different than a 'retweet with comment'. When you quote a tweet using the Twitter API, it does not count as a retweet. As far as the Twitter API is concerned, retweets and quoting tweets are two completely separate things; you can retweet something with the API, and it will add 1 to the retweet counter -- but the closest thing to a 'retweet with comment' is to first quote the tweet and then retweet it separately. Unfortunately, that would show up as two separate tweets.

That might sound a bit confusing, so let's look at an example of quoting a tweet.

Remember that the first thing we did was post a 'hello world!' tweet.

```js
//
//  tweet 'hello world!'
//
T.post(
  "statuses/update",
  { status: "hello world!" },
  function (err, data, response) {
    console.log(data)
  }
)
```

To quote a tweet, all we need to do is add the URL of the tweet to the end of the `status` string, like this:

```js
//
//  tweet 'hello world!'
//
T.post(
  "statuses/update",
  {
    status:
      "hello world! https://twitter.com/sharifElkassed/status/1261464404861702144",
  },
  function (err, data, response) {
    console.log(data)
  }
)
```

If you run `node bot.js` again, and refresh your Twitter timeline, you should see the tweet quoted!

> IMPORTANT NOTE: Do not push your code to your git remote just yet. We have API keys and tokens exposed as plaintext in our code. We are going to cover securing these credentials in a [follow-up post](/twitter-bot-2).

## Wrapping up

We hardly scratched the surface of the API here, but hopefully you've gained a general sense of the types of things we can do with the Account Activity API.

Please let me know if something was not clear.

Also feel free to let me know what you thought about this post, and what you might like to see me write about next!
