---
title: "Solving 'zsh:command not found: nvm'"
date: "2020-03-28"
---

When you install nvm with zsh, you may run into this error when you try to use nvm in a new terminal window:

```js
zsh: command not found: nvm
```

What is happening here is that `nvm` is not being "sourced" from your configuration. In other words, `zsh` is not immediately aware of the fact that `nvm` is available to use.

One solution is to run the following command:

`source ~/.nvm/nvm.sh`

This will allow you to use `nvm`, but only for the current terminal session. If you open a new terminal session, you'll need to run the command again.

Kind of annoying, right?

Luckily, there is a way to source `nvm` automatically each time a new `zsh` session is launched.

First, open your `.zshrc` file:

`code ~/.zshrc`

> Note: `code` is specific to Visual Studio Code. You can replace `code` with the command for your text editor of choice.

Then, add this to the bottom of your `.zshrc` file:

```
export NVM_DIR=~/.nvm
 [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

Save the file, and test it out by opening a new terminal!
