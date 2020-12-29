---
title: "Permission Denied! Resolving npm Permission Errors"
date: "2020-03-27"
---

## The Setup

Before delving into the particular error messages this post is meant to resolve, I wanted to list out the specific software I am using:

- WSL 2 with Ubuntu 18.04
- zsh
- oh-my-zsh
- Windows Terminal
- Visual Studio Code

## The problem

You can install some packages fine, but others give you this error:

```js
npm ERR! ERROR: EACCESS: permission denied"
```

Naturally, you try to install the package again, this time prefixing the command with `sudo` -- but then you get this error:

```
sudo: npm: command not found
```

## The solution

There are a few things you can do to resolve the issue, depending on what the actual issue is. I've listed them out in a logical order:

#### Install Build Tools

Some packages require build tools in order to install. Each operating system has separate build tools.

This [documentation from Gatsby](https://www.gatsbyjs.org/tutorial/part-zero/) includes instructions for installing build tools on different types of operating systems.

#### Close Visual Studio Code

I believe this issue is specific to using WSL and the WSL extension for VS Code, but it really couldn't hurt, either way.

Believe it or not, sometimes you can get around this issue simply by closing the text editor and running the install command again.

#### npm unsafe-perm

If the two steps above do not resolve the issue, you can try the following command:

`npm config set unsafe-perm true`

---

I hope these suggestions got you where you needed to be!

If not, [let me know on Twitter](https://twitter.com/sharifElkassed), or [shoot me an email](mailto:whistle@theengine.tech), and I'll do my best to help out.
