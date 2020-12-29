---
title: "How to Fix Your GitHub SSH Authentication"
date: "2020-03-26"
---

Setting up an SSH key for your GitHub repo is pretty straightforward, especially if you follow their excellent [documentation](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

This documentation isn't always enough to get you where you need to be, though. There have been a few times where I am still asked for my GitHub password when running a `git push`.

## Here's how to fix it

Open up your git config file in a text editor. From the root of your project directory, it is located at `.git/config`.

If you're using Visual Studio Code, you can open the file from the terminal with:

`code .git/config`

If you're not using Visual Studio Code, one of the following should work for you:

`nano .git/config` (Mac OS)

`notepad .git/config` (Windows)

Next, you'll want to find the `url` variable under `[remote "origin"]`.

Then, change the syntax so that it has the following syntax:

`git@github.com:username/repo-name`

Mine looks like this:

```
[remote "origin"]
	url = git@github.com:engineblog/gatsby-casper-blog
```

Key things to note with this syntax are:

- `git@` prefixes the URL
- There is no `https://`
- `:` goes between `github.com` and your username instead of `/`
- There is no `.git` at the trailing end of the url

Save the file, start a new terminal session, and try a `git push`. You should not be prompted for your password.
