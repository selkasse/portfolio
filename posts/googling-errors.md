---
title: "Why I Don't Always Google Errors"
date: "2020-02-24"
---

We've all been there.

You're in the zone, kickin' divs and takin' namespaces, when _The Unexpected Error_ rears its ugly head.You were making great progress (and great time!) before the error showed up. You curse the error. You want it gone as quickly as it showed up. So you fire up the Google machine and start smashing links, skimming for a quick fix.

<!-- end -->

You come up short.

Your frustration increases.

> And it is at this point that you can go one of two ways: You can let the frustration take you
> to the solution, or you can let your mind take you.
> I **strong**ly suggest the latter. Your mind is the best tool you have.
> And I am of the opinion that if you have ever enjoyed software development in any capacity, then you have a mind for it.
> New problems just mean new ways of thinking. Embrace them. Look at them as opportunities to sharpen your ultimate tool.

All of this is sounding pretty theoretical; let's get into an actual example.

## My Process

**I like to make small changes, check my work, and commit to version control frequently.**

If you can't tell by looking at it (or haven't perused my <a target='_blank' href="/resources">resources</a>), I'm using the [Gatsby v2 Casper Starter theme](https://gatsby-starter-v2-casper.netlify.com/) for the blog. The repo is [here](https://github.com/haysclark/gatsby-starter-casper) if you want to follow along.

Naturally, I couldn't keep all the defaults, and needed to change the name of `/content/sample-authors/authors/casper.json` to `sharif.json`.

Since this is only the second Gatsby project I've worked on (the first being a [tutorial](https://www.leveluptutorials.com/tutorials/pro-gatsby-2)), I took a very careful approach. I know, it's just changing the name of a file, but this stuff has bit me in the past.

Here we go!

1. Searched the project's codebase for any other places the filename was referenced, and took note of them in [Trello](https://trello.com/)
2. Committed and pushed changes on my current git branch
3. Checked out a new git branch
4. Changed the filename while the development server was running

## The Error

![TypeError: Cannot read property 'name' of undefined](https://dev-to-uploads.s3.amazonaws.com/i/eqou3cug7shjysuut2j6.PNG)

This is why I like to make small changes and then check my work. Granted, Gatsby will yell at you in the terminal as well, but I still believe it's a good practice, since not all platforms afford you that luxury. My point is that if I had made additional changes before checking the browser, the problem would have become instantly more complex. At this point, I know with 100% confidence that this error is the direct cause of the filename I changed.

But still, even having that knowledge, the error itself made me want to reach for Google. It just _looks_ like something I would Google, and it's not the error I would expect to get from changing a filename.

But instead of Googling frantically, I became genuinely interested in the error message. As a reader taking in this scenario, there's a good chance that you know exactly what the issue is without me tracing this error at all. And yes, it is a simple fix. When the error first appeared, I knew it was probably something simple. Still, I didn't know what that "something simple" _was_, and I think the process of finding it is important.

Let's break it down.

## Debugging

First thing's first: Where is the error coming from? If you scroll up a bit, you'll see that the error is pointing to `/src/components/AuthorImage/AuthorImage.jsx`.

The file looks like this:

```js
import React from "react"
import "./AuthorImage.css"

class AuthorImage extends React.Component {
  render() {
    const {
      author: { name, image, url },
    } = this.props
    if (image) {
      return (
        <figure className="author-image">
          <a
            className="img"
            href={url}
            style={{ backgroundImage: `url("${image}")` }}
          >
            <span className="hidden">{`${name}'s Picture`}</span>
          </a>
        </figure>
      )
    }
    return null
  }
}

export default AuthorImage
```

Next, what is actually wrong with the file? The beginning of the error message says that `name` is undefined. The error points specifically to this line:

```
author: {name, image, url}
```

Why is that?

Well, what do we know about this file in relation to the project as a whole? Looking at the `export` statement at the bottom, along with the fact that this file lives in the `/src/components/` folder, we know that this file is indeed a component.

Okay, so it's a component. So what? What can we do with that information?

There are two things that immediately come to mind when I think about components:

1. They get used in other files
2. The syntax to reference them in another file is something along these lines:

```js
<NameOfComponent />
```

Armed with this information, we can search the entire project for references to this component. I typed the following into the VS Code search tool (using `ctrl + shift + f`):

`<AuthorImage`

As a habit, I leave off the closing `>`, in case anything was passed into the component (for example: `<AuthorImage someProp='someValue'>`).

The search in VS Code showed that the AuthorImage component appears in two files:

1. `/src/templates/author.jsx`
2. `/src/templates/post.jsx`

I decided to investigate `author.jsx` because after all, it was the name of an author I had changed in the first place.

In `author.jsx`, we see that our component is referenced like this:

```js
<AuthorImage author={getAuthor()} />
```

Okay, that doesn't help us much; what does `getAuthor()` do? Let's `ctrl + f` and search for it in the file. The first result shows us:

```js
const getAuthor = () => authorsEdges[0].node
```

Same idea here: What is `authorsEdges`? Luckily, this one is declared on the line above `getAuthor`:

```js
const authorsEdges =
  allAuthorsJson && allAuthorsJson.edges ? allAuthorsJson.edges : []
```

Can you guess what the next step is? I'll bet you can! We search the file for `allAuthorsJson` and get:

```js
allAuthorsJson(filter: { uid: { eq: $author } }) {
      edges {
        node {
          uid
          name
          image
          url
          bio
          location
          socialUrls
        }
      }
    }
```

Knowing that a GraphQL query was involved, I realized that my author data (in the newly-named `sharif.json`) wasn't being returned from the query results. Because there were no explicit references to the original name of the file (`casper.json`), it seemed like something just needed to be "refreshed", so to speak.

Knowing that GraphQL deals with the server side, I killed the development server and re-ran `gatsby develop`. Lo and behold, once the build completed, the error was gone! It was a satisfying moment, knowing that I got to the bottom of the issue on my own instead of having to ask _The Googz_.

## Conclusion

In case it isn't clear already, I am not saying that Googling error messages is bad. In fact, Googling errors is often a tremendous help in the debugging process. I just don't think that we should always jump straight to someone elses answer. That being said, I also believe there are times when going straight to Google _is_ the best approach; it's just a matter of having hit enough errors during your career to know when it makes sense, and when it doesn't.

In this particular scenario, I felt like I actually gained a deeper understanding of the way the application works, instead of just "knowing what to do when that happens".

As always, [your feedback](mailto:whistle@theengine.tech) is welcomed, appreciated, and encouraged.

Until next time, keep **chugging**!
