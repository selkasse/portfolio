---
title: "Learning Vim: A Beginner's Perspective"
date: "2020-12-11"
---

# First, some background...

I've always been a pretty fast typist, but I didn't realize until recently that even though I type 100 WPM, I'm still quite slow when it comes to actually editing code. Moving things around, finding and replacing multiple instances of a variable, jumping to different lines of code... doing these things quickly requires a completely different skillset than typing -- a sort of typing superset.

After hearing it mentioned several times on [Syntax.fm](https://syntax.fm), I started learning the keyboard shortcuts for Visual Studio Code. The editor-specific shortcuts were easy to pick up (toggling the file explorer, opening the extensions menu, etc), but it was a different story when I tried to use keyboard shortcuts to edit the actual code.

This was mainly due to the fact that the <kbd>Home</kbd> and <kbd>End</kbd> keys are in awkward positions on a standard keyboard, and I needed to use these keys a lot so that I could move to the beginning or end of a line quickly. To get around this issue, I installed [AutoHotKey](https://www.autohotkey.com/), and used my <kbd>CapsLock</kbd> key as a modifier in order to mimic the <kbd>Home</kbd> and <kbd>End</kbd> keys. It helped for sure, but things still felt a bit clunky.

Around this same time, I started becoming interested in mechanical keyboards, for no reason other than I thought they looked cool. As I started looking into the smaller mechanical keyboards (60% and below), I started noticing that **a lot of people who liked these keyboards were also Vim users.** I had always assumed Vim wasn't for me, especially after having the same experience a lot of devs go through when opening it for the first time -- not being able to exit the editor.

But, as I kept researching keyboards, I kept seeing more overlap with Vim. I wasn't really sure why, until [this video](https://youtu.be/AKGXZ1ReU54) shed some light. The reason that there is so much overlap between specialized keyboards and Vim is because they are both centered around the idea of **getting as much a possible done without moving your hands from the keyboard**, or even from the home row.

At this point, I couldn't contain my curiosity any longer; I had to know what the hype around Vim was, and why so many developers seem to swear by it. Until I watched that video, Vim had always given off sort of an elitist vibe to me:

> _I don't need to use a mouse because I'm better than the average user._

> _The mouse is for beginners._

> _Only the truly savvy can wield the power of the keyboard._

While this attitude is unfortunately present in the developer community, I don't think we should let that stop us from benefiting from the great tool that Vim is. At the end of the day, it's about efficiency. We type and edit so much text as developers, if we can shave off a fraction of a second here and there, it adds up to a large amount of time saved in the long run. As a bonus, less hand and wrist movement also reduces the chance of injury.

With that out of the way, let's take a look at what it's like to actually use Vim.

# Enter Vim

What immediately sets Vim apart from a standard text editor is the fact that it has multiple modes of operation. By default, you are in a mode that does not allow you to input text, and instead this mode is intended for you to navigate through existing text in the document. To actually type text into the document, you need to invoke a keyboard shortcut to enter the 'insert mode'. When in insert mode, (mostly) everything works the way you would expect in a normal text editor. To work efficiently in Vim, you'll need to be constantly toggling back and forth between insert mode and the normal navigation mode.

I think this is what initially turns a lot of people away from Vim. If you go into it without any frame of reference or instruction, it feels highly unintuitive. This is because **Vim is more focused on editing existing text, as opposed to typing new text** (like a standard text editor).

Luckily, there is a tutorial built into every Unix-based terminal (Windows users can access it via WSL). To access the tutorial, execute the `vimtutor` command from any directory in your terminal. `vimtutor` consists of seven moderately-detailed lessons on how to use Vim, and although it only scratches the surface of what is possible in Vim, it covers more than enough to get you started and feeling comfortable with Vim.

For instance, while going through `vimtutor`, I discovered that all of the keyboard shortcuts I was previously using with AutoHotKey were already built into Vim, and were also much more intuitive.

It's also worth noting that even though the tutorial goes through a lot of material, you really only need the first lesson to get over the hump. The first lesson goes over things like navigating using the <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, and <kbd>L</kbd> keys (which replace your arrow keys), switching between 'normal' and 'insert' mode, as well as saving and quitting a file.

# Now what?

If you're anything like me, you might try out `vimtutor`, see why Vim is beneficial, but then think:

> _Is it really worth switching over from Visual Studio Code? That means I lose my autocomplete, my extensions, my config..._

Luckily, there are some solutions to this problem.

One solution is to install the Vim extension for Visual Studio Code. This way, you still get autocompletion, jump to definition, linting, git integration, and any other customizations you've made to your VS Code setup. The only downside I have noticed with this approach is that some VS Code shortcuts seem to conflict with Vim shortcuts. For example, when using the Vim extension, I was no longer able to use <kbd>Ctrl + B</kbd> to toggle the file explorer sidebar because <kbd>Ctrl + B</kbd> is already a shortcut in Vim, which takes precedence. This can be solved by changing the key bindings, but I like to leave those alone until I explore other options.

Speaking of other options, another route you can go is setting up your Vim editor to mimic an IDE through the use of a `vimrc` file and Vim plugins. Although this approach requires some setup, you may find that it is worth it, since it enables you navigate your project's file structure using Vim shortcuts, as opposed to the VS Code plugin, which is only scoped to the main editor area. Although I haven't configured Vim just yet, this is information I gathered from watching videos from [The Primeagen](https://www.youtube.com/channel/UC8ENHE5xdFSwx71u3fDH5Xw) and [Leeren](https://www.youtube.com/watch?v=JFr28K65-5E) on YouTube.

# Vim outside the editor?

After getting used to the idea of using primarily the keyboard for navigating through text, it seemed strange to go back to using a mouse for browsing the web. I had tried using the Chrome keyboard shortcuts for browsing the web, but it wasn't a very pleasant experience.

That's when I found [Vimium](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en), a Chrome extension that lets you use Vim shortcuts to navigate the web. Besides the fact that it doesn't work on some pages (like Gmail and the Chrome Extension store, ironically), Vimium is awesome. I think it makes surfing the web feel like a video game, with the keyboard as your controller.

Vimium also has a feature that I think any user can find helpful, even if you aren't into Vim and heavy keyboard usage. With Vimium installed, pressing `o` brings up a search bar that allows you to search any text within any of your open tabs, as well as tabs from your browser history. This makes it great for those moments when you can't find the page you're looking for by Googling, but you remember some key words from the page.

As far as dealing with pages that don't support Vimium, you can just fall back to the default Chrome shortcuts. Here are the main Chrome shortcuts that I've found helpful:

| Action             | Shortcut              |
| ------------------ | --------------------- |
| Cycle through tabs | <kbd>CTRL + Tab</kbd> |
| New Tab            | <kbd>CTRL + T</kbd>   |
| Close current tab  | <kbd>CTRL + W</kbd>   |
| Highlight URL bar  | <kbd>ALT + D</kbd>    |

And then of course you can use just plain old <kbd>Tab</kbd> to cycle through to links, then press <kbd>Enter</kbd> to click the link. This is honestly the most painful part of navigating with the Chrome defaults, and if it weren't for how cumbersome this was, I wouldn't see a need for Vimium.

# Consistency

So, we've covered using Vim to navigate text in a text editor, as well as using Vim-esque shortcuts to navigate the browser, but there's still one area we haven't covered -- using Vim shortcuts in text areas.

I'm talking about things like writing an email, filling out a form on a website, writing a tweet.

While some might argue that using Vim in these scenarios is overkill, I don't think it is.

Once I got used to the Vim shortcuts, the default (and even custom AutoHotKey) shortcuts just fall short. I don't want to have to revert to those every time I need to write text outside of Vim. Of course, this is personal preference, but again, it's about efficiency.

So, what can we do to bridge the gap?

There are some third-party options available, depending on your operating system.

For Unix-based systems, you can use a tool like [vim-anywhere](https://github.com/cknadler/vim-anywhere), which will open a Vim prompt when you interact with a text area, so that you can still use your Vim shortcuts.

There might be a way to get `vim-anywhere` to work with Windows and WSL, but it seemed like too much of a hassle to me, so instead I used a [AutoHotKey script I found](https://github.com/lubokkanev/vim-everywhere).

# EOF

The point of this post was to show the benefits of using Vim, and prove that it isn't nearly as scary as you might think. I encourage anyone to give it an honest try while using the tutorial, before writing it off like I did for so long.

If I missed something, or if there's something you disagree with, I'd love to hear your thoughts. Drop me some words down below!
