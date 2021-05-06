---
title: "How I Got Better at CSS"
date: "2020-10-05"
---

# Intro

CSS has always been an issue for me. Truthfully, it's what deterred me from wanting to get into web development for a long time. I wasn't good at CSS. I would feel like I was getting better at it, but would eventually run into a layout issue I couldn't solve. Every time that happened, I felt like I needed to relearn CSS. It wasn't for lack of trying, either; I've been trying to learn CSS (on and off) since before the days of Flexbox and Grid.

Instead of spending the entire article lamenting my struggles with CSS, I'm going to share the resources and techniques that allowed me to overcome my biggest stumbling blocks. It is my hope that this post will prevent others from making some of the same mistakes I made when learning CSS.

# The Basics

You've heard it before: You can't get far without the basics. CSS is no exception. With CSS, though, it's not always easy to know what exactly encompasses 'the basics'. Understanding elements and selectors simply isn't enough. These were the portions that really made a difference for me:

- Specificity
- Block/Inline block
- Relative units

Not understanding what these things were threw me off in a major way when I was trying to build an entire layout. I could get away with not knowing them if I was only building a very small part of a UI, but things started to get hairy as I added more markup and styling.

# Structure

My CSS files used to be a mess of classes. It's easy to do if you're not sure how to structure your styles in such a way that the 'cascade' works in your favor.

What helped me structure my styles better was actually a course. In ['Modern CSS Design Systems' by Level Up Tutorials](https://www.leveluptutorials.com/tutorials/modern-css-design-systems), I learned how to set up a base-level template for styling. The template uses "classless" CSS, meaning that the styling is produced _implicitly_ by the cascade, rather than _explicitly_ via classes.

Now that I've completed that course, I can now use that template, and tweak it for a variety of layouts, without cluttering up the stylesheet with classes. More importantly, I now have a better idea of how to properly take advantage of the 'cascade' in Cascading Style Sheets. This was **huge.**

# Dev tools, dev tools, dev tools!

I shied away from my browser dev tools for a long time. The dev tools have so many tabs -- it might as well be a separate application! It was intimidating. It was only after seeing other developers use them over and over that I realized how important they were.

For me, it was hard to know where to start. Luckily, I realized you don't need to be familiar with all of the features to get a lot out of your dev tools. The tabs I find myself using most often are:

- Elements
- Style
- Console (when dealing with styling via Javascript)

The tool that really changed the game for me, though, was the element selector. It took a little bit of getting used to, but I found that once I knew what to look for, the selector made debugging layouts a dream. I got into the habit of slowly moving the selector tool all over the page whenever my layout was broken. The overlay that the selector tool provides almost always pointed out where my "problem element" was.

If the overlay didn't give me my answer, the 'Styles' tab was next in line. Seeing the actual CSS that is being applied to a given element is extremely helpful.

If I was _still_ scratching my head after inspecting both the overlay and the Styles tab, the element was usually inside a Flexbox container and its accompanying `justify-content` property was affecting the available space for the content.

# Development Workflow

After I got a bit more comfortable with CSS, I started looking into other tools to improve my workflow. I considered using a framework like [Tailwind](https://tailwindcss.com/), but I decided to go a different route, because I wanted to strengthen my fundamentals instead of having a framework do the heavy lifting.

The tools I used:

## Sass

[Sass](https://sass-lang.com/) is another tool that I should have started using a long time ago. I knew that it was a "preprocessor", but I had no idea what that meant. I assumed it was only useful for more advanced CSS, and that trying to learn it would only confuse me more.

How very wrong I was.

Think of Sass as a tool that adds some 'programmatic' flare to your CSS. It gives you the ability to write functions, nest styles, and my personal favorite -- the ability to break your stylesheet into multiple stylesheets.

This was a key selling point for me, since one of the things I always disliked about CSS was having to scroll up and down a stylesheet, trying to find the section I needed to modify.

You can do a lot with Sass, and I could probably write entire blog post about it. The point I want to drive home is that you should not categorize Sass as an 'advanced' CSS tool. In my opinion, it can be extremely helpful to beginners, simply for the organizational aspect.

If you're looking to get started with Sass, Traversy Media has an excellent [crash course](https://www.youtube.com/watch?v=nu5mdN2JIwM&t) on YouTube.

## PostCSS / Autoprefixer

If you've worked with CSS, chances are you've run into vendor prefixes. You know, those syntactically-weird lines of CSS that look like:

`-webkit-animation: myAnimation 0.5s`

Here, `-webkit-` is a vendor prefix, and is necessary for your CSS to work on certain browsers. Therefore, any time you need to add some CSS that isn't directly supported on all browsers (like an animation), you'll need to add multiple prefixes to ensure consistency on all browsers.

As you can imagine, remembering to add a prefix can be quite cumbersome. That's where [PostCSS](https://postcss.org/) comes into play. Much like Sass, you can add PostCSS as a development dependency and use the autoprefixer plugin to have the vendor prefixes generated for you. It's not cheating; it's efficient!

For a quick and easy rundown on how to implement PostCSS with autoprefixer, check out Gary Simon's [tutorial on YouTube](https://www.youtube.com/watch?v=jbjVUgCrXsE&t=5s).

# Building Projects

Now, all of this is great in theory, but none of it is going to stick if you don't put these concepts to work. There are tons of practice CSS projects you can take on, but personally, I believe the best learning experience is a project with some higher stakes.

I was fortunate enough to have the opportunity to rebuild the [website](https://accessphysicaltherapyllc.com/) for my dad's physical therapy practice. Knowing that this website would actually end up in production, being viewed by actual customers, added just enough pressure to perform. The stakes were high enough to push me forward, but not so high that the experience was stressful.

I realize that not everyone will have that opportunity, but there are still options aplenty. You can:

- Ask friends and family if they know anyone in need of a website
- Utilize a feedback-oriented training service like [Frontend Mentor](https://www.frontendmentor.io/)
- Build out your personal portfolio website

See if you can build a real, but low-risk project. If you're anything like me, and have trouble finishing projects, this will give you the push you need to take it to the finish line, while also giving you real experience.

# Wrapping Up

While I've been trying to improve my CSS for years, what I've outlined in this post has taken place only over the course of the past couple of months. If I hadn't adopted these techniques and resources, I would still be swimming in a sea of confusion (and may have even given up on CSS entirely). I hope you've come away from this article feeling better-equipped for your future CSS battles.

Thanks for reading!
