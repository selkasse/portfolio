---
title: "How I Stopped My npm Installs From Failing"
date: "2020-02-27"
---

<span id='top'></span>

> TL;DR: <br /><br />
> Make sure your environment is set up with the proper build tools;<br /><br />
> Understand package.json, lock files, and the various types of dependencies;<br /><br />
> Know what to look for in the error log;<br /><br />
> Look up issues about the specific package/theme/library that is failing;<br /><br />
> Try manually installing the failing package without specifying a version (assuming a lock file is present);<br /><br />

<!-- end -->

> `npm update` and `npm update -D` are your friends;<br /><br />
> Nuke your `node_modules` folder and try again; <br /><br />
> Using `yarn` can be helpful when dealing with troublesome peer dependencies

## What's This Post About?

If you're just getting started with web development, package managers can be a tough nut to crack. I know this because I've given up on projects after having spent days going around in circles, just trying to get a library to install.

When I started this blog, I reached for a Gatsby theme, and was reminded of my rudimentary knowledge of npm. I had plenty of blog posts lined up, but I found myself fixated on grasping npm. I was able to get _some_ themes installed, but not others. I put my other posts on hold and decided to immerse myself in npm so that I could gain a deeper knowledge of it, and in turn, share that knowledge with you.

I still don't know _nearly_ everything about npm and dependencies -- but I now have enough knowledge to get any package to install / build with minimal warnings and vulnerabilities. My hope is that this post and its <a target='_blank' href="/npm-dependencies">supplementary post</a> will allow you to say the same.

This post doesn't go into npm fundamentals; That's what the <a target='_blank' href="/npm-dependencies">supplementary post</a> is for. What this post does include is **solutions for five different scenarios** that might cause you issues with npm installations and builds. These scenarios are not exhaustive, but they are the ones I found most useful in my research.

All of the scenarios deal with Gatsby themes, but the concepts all apply to npm in general.

## Contents

This post is pretty long, and I may split it into multiple posts at some point. For now, I'm going to provide some links to jump to different areas of the post.

In each of the sections, there will be a link back to this section to minimize scrolling.

1. [When the Initial Install Fails](/npm-installs#when-the-initial-install-fails)

2. [Using a Previous Version of Node](/npm-installs#using-a-previous-version-of-node)

3. [When 'npm audit fix' Breaks Your Dependencies](/npm-installs#when-npm-audit-fix-breaks-your-dependencies)

   - [Using Yarn](/npm-installs#using-yarn)

4. [Using 'npm dedupe'](/npm-installs#using-npm-dedupe)

5. [Dealing with Overly-Restrictive package.json Files](/npm-installs#dealing-with-overly-restrictive-packagejson-files)

[Still Having Issues?](/npm-installs#still-having-issues)

## Build Tools

Before getting started, you'll want to make sure that you have the proper build tools installed for your operating system. The Gatsby documentation has some pretty good guides on getting you set up:

[Setting up your development environment](https://www.gatsbyjs.org/tutorial/part-zero/)

**Note:** If you're using WSL, skip the Windows instructions and use the Linux instructions instead.

If you already have your build tools set up, but want to follow along with the installations in this post, you'll need to install Gatsby:

`npm install -g gatsby-cli`

If the installation fails, refer to the link above.

Let's get to it!

## When the Initial Install Fails

[Contents](/npm-installs#contents)

Alright! So this is probably the most common scenario, and arguably the most frustrating for beginners (it was for me):

You run the exact command you were given, but npm fails to complete the installation because of an issue with a particular package.

[The theme in question](https://www.gatsbyjs.org/starters/GatsbyCentral/gatsby-v2-starter-casper/)

`gatsby new gatsby-v2-starter-casper https://github.com/GatsbyCentral/gatsby-v2-starter-casper`

The theme fails to install (as expected), and we have a good amount of errors in our terminal. **Sometimes scrolling to the top of the error log is necessary**, but in our case, the issue is pointed out right near the bottom:

```js
npm ERR! Failed at the sharp@0.20.8 install script.
```

Before beginning to troubleshoot, we need to move into the directory where the theme was cloned into.

`cd gatsby-v2-starter-casper`

Sometimes we can manually install the "problem package" without specifying a version (assuming a lockfile is present); the idea is to update the package to the latest semver-compliant version. In this case, that would look like:

`npm install sharp`

But if we run that command, we actually get the same error. So what's going on?

If we inspect our `package.json` file, and search the file for `sharp`, we notice that the "sharp" package is not listed explicitly in the file. However, we do have one result returned from the search, which is `gatsby-plugin-sharp`.

If we look to our `package-lock.json` file and search for "gatsby-plugin-sharp", we see that `sharp` is listed under `requires`:

```json
    "gatsby-plugin-sharp": {
      ...
      "requires": {
        ...
        "sharp": "^0.23.4",
        ...
      },
```

Since we now know that `sharp` is not a **direct** dependency of our project (because it does not appear in `package.json`), we can start looking into `gatsby-plugin-sharp`:

https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/

If we scroll _allllll_ the way to to the bottom of the plugin's documentation, we see a **Troubleshooting** section:

> To fix this, you’ll need to update all Gatsby plugins in the current project that depend on the sharp package.

The documentation then provides us with a list of all of the gatsby plugins that depend on `sharp`. To find out which of those packages are included in our theme, we can use the `npm ls` command:

- `npm ls gatsby-plugin-sharp`
- `npm ls gatsby-plugin-manifest`
- `npm ls gatsby-remark-images-contentful`
- `npm ls gatsby-source-contentful`
- `npm ls gatsby-transformer-sharp`
- `npm ls gatsby-transformer-sqip`

After running these commands, the only ones that do not return `(empty)`
are `gatsby-plugin-sharp` and `gatsby-plugin-manifest`.

Per the Gatsby docs, we update them like so:

`npm install gatsby-plugin-sharp gatsby-plugin-manifest`

This install completes successfully, and now we can attempt to install the remaining packages (because the installation was interrupted when `sharp` failed):

`npm install`

The install completes successfully; we have some vulnerabilities and peer dependency warnings, but we cover how to deal with those in the following sections.

For now, the important thing is that we can run `gatsby develop` and get our theme up and running.

## Using a Previous Version of Node

[Contents](/npm-installs#contents)

The troubleshooting tips and strategies covered above don't always solve the issue. One such example can be seen if a dependency was developed using a previous version of `node`, and has not been updated to account for any "breaking changes" introduced in the current `node` version.

> Note: We are using node 13 for this scenario

[The theme in question](https://www.gatsbyjs.org/starters/the-road-to-react-with-firebase/react-gatsby-firebase-authentication/)

`gatsby new firebase-authentication https://github.com/the-road-to-react-with-firebase/react-gatsby-firebase-authentication`

```js
npm ERR! Failed at the grpc@1.23.3 install script.
```

My first thought is to install `grpc` explicitly, since manually installing the "problem package" seems to work a lot of the time.

`cd firebase-authentication`

`npm install grpc`

`npm install`

We get this same error. Why didn't this work?

If we scroll up and look at our warnings in detail, we see this:

```js
node-pre-gyp WARN Pre-built binaries not found for grpc@1.23.3 and node@13.8.0 (node-v79 ABI, glibc) (falling back to source compile with node-gyp)
```

From installing a fair amount of themes in preparation for this blog post, I know that the latest version of `node` does not always work, depending on what dependencies are specified in the package and lock files. At the time of this writing, `node 10` seems to work most of the time when we run into this scenario.

To use another version of node, we need to use `nvm`, which we can install with the following commands:

1. `sudo apt-get install curl`
2. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`

Once nvm is installed, you can switch to another version of node. Note that only the current terminal session will use that version of node. In other words, if you open a new terminal window and type `node -v`, you should see your default version of node.

To use node 10:

1. `nvm install 10`
2. `nvm use 10`

This version of node will not be aware of your Gatsby installation, so you will need to run `npm install -g gatsby-cli`.

Now that we are all set up, we need to run the install again, since it initially failed. Since we had to downgrade `node` for the install, it seems likely that there are other outdated definitions in the theme. Therefore, we run:

1. `npm update`
2. `npm install`

The install goes through this time. If we run `gatsby develop`, the dev server spins up!

## When 'npm audit fix' Breaks Your Dependencies

[Contents](/npm-installs#contents)

Sometimes, the theme will install successfully, but with a lot of vulnerabilities. npm suggests running `npm audit fix` to resolve them.

[The theme in question](https://www.gatsbyjs.org/starters/PrototypeInteractive/gatsby-react-boilerplate/)

`gatsby new gatsby-react-boilerplate https://github.com/PrototypeInteractive/gatsby-react-boilerplate`

We get the following error:

```js
npm ERR! Failed at the node-sass@4.9.3 postinstall script.
```

So we change into the project directory:

`cd gatsby-react-boilerplate`

And attempt to install the package manually:

`npm install node-sass`

The install completes, and we see that we now have a newer version of `node-sass`.

Next, we install the remaining packages:

`npm install`

The install completes successfully, but with a large number of vulnerabilities:

```js
found 1261 vulnerabilities (694 low, 17 moderate, 548 high, 2 critical)
run `npm audit fix` to fix them, or `npm audit` for details
```

<!-- Before moving forward, let's also take note of which peer dependency warnings we received during the install:

```js
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN bootstrap@4.2.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
npm WARN bootstrap@4.2.1 requires a peer of popper.js@^1.14.6 but none is installed. You must install peer dependencies yourself.
npm WARN eslint-plugin-graphql@2.1.1 requires a peer of graphql@^0.12.0 || ^0.13.0 but none is installed. You must install peer dependencies yourself.
npm WARN express-graphql@0.6.12 requires a peer of graphql@^0.10.0 || ^0.11.0 || ^0.12.0 || ^0.13.0 but none is installed. You must install peer dependencies
yourself.
npm WARN extract-text-webpack-plugin@1.0.1 requires a peer of webpack@^1.9.11 but none is installed. You must install peer dependencies yourself.
npm WARN gatsby-plugin-postcss-sass@1.0.22 requires a peer of gatsby@^1.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN graphql-tools@3.1.1 requires a peer of graphql@^0.13.0 but none is installed. You must install peer dependencies yourself.
npm WARN sass-loader@4.1.1 requires a peer of webpack@^2 || ^2.2.0-rc.0 || ^2.1.0-beta || ^1.12.6 but none is installed. You must install peer dependencies yourself.
``` -->

For the sake of demonstration, let's check if we can run the development server before fixing the vulnerabilities:

`gatsby develop`

The dev server spins up:

```
You can now view gatsby-react-boilerplate in the browser.
⠀
  http://localhost:8000/
```

Now to kill the dev server and resolve the vulnerabilities:

`ctrl + c`

`npm audit fix`

<!-- Again, before moving forward, let's take note of what has changed in our peer dependency warnings:

```js
npm WARN sass-loader@4.1.1 requires a peer of webpack@^2 || ^2.2.0-rc.0 || ^2.1
.0-beta || ^1.12.6 but none is installed. You must install peer dependencies yo
urself.
```

The `sass-loader` warning is new.

```js
npm WARN bootstrap@4.4.1 requires a peer of jquery@1.9.1 - 3 but none is instal
led. You must install peer dependencies yourself.
npm WARN bootstrap@4.4.1 requires a peer of popper.js@^1.16.0 but none is insta
lled. You must install peer dependencies yourself.
```

We had the above two warnings before, but now the versions are different.

```js
npm WARN eslint-config-react-app@5.2.1 requires a peer of eslint@6.x but none i
s installed. You must install peer dependencies yourself.
npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev |
| >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta
 || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer
dependencies yourself.
npm WARN ink@2.7.1 requires a peer of react@>=16.8.0 but none is installed. You
 must install peer dependencies yourself.
npm WARN ink-spinner@3.0.1 requires a peer of react@^16.8.2 but none is install
ed. You must install peer dependencies yourself.
```

All of these are new warnings. -->

Now, if we run `gatsby develop` now, we get this error:

```js
  Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  1. You might have mismatching versions of React and the renderer (such as React DOM)
  2. You might be breaking the Rules of Hooks
  3. You might have more than one copy of React in the same app
  See https://fb.me/react-invalid-hook-call for tips about how to debug and fix
   this problem.
```

If we go to the link in the error message, it tells us that we can run `npm ls react` and `npm ls react-dom` to see if we have duplicates.

Neither of these commands return duplicates, but we do get this message:

```js
├─┬ UNMET PEER DEPENDENCY gatsby@2.20.4
│ └─┬ gatsby-cli@2.11.1
│   └── UNMET PEER DEPENDENCY react@16.13.1
└── react@16.7.0

npm ERR! peer dep missing: gatsby@^1.0.0, required by gatsby-plugin-postcss-sas
s@1.0.22
```

Since I've installed this theme many times, I'll save you some trouble and tell you that we've basically bricked this project by running `npm audit fix`.

To demonstrate how to do this without breaking the project, we'll start again with a fresh copy. This time, we'll clone the repo to avoid the initial install failing:

1. `cd ..`
2. `rm -rf gatsby-react-boilerplate`
3. `git clone https://github.com/PrototypeInteractive/gatsby-react-boilerplate.git`
4. `cd gatsby-react-boilerplate`
5. `npm install node-sass`
6. `npm install`

This time, instead of running the audit fix, we run:

`npm update -D`

This will update all of our dependencies, including devDependencies. Now, if we run `gatsby develop`, we still get an error, but it's a different one this time:

```js
 ERROR #98123  WEBPACK

Generating development JavaScript bundle failed

Cannot find module 'webpack/package.json'
Require stack:
- /home/idev/.nvm/versions/node/v13.8.0/lib/node_modules/gatsby-cli/lib/index.js

File: src/components/icon/github.icon
```

Alright, at this point, we need to do something that probably should have been done at the beginning, but I wanted leave it until now so that its importance could be demonstrated.

What we need to do is check the `README` on the [repo](https://github.com/PrototypeInteractive/gatsby-react-boilerplate).

Here, we see that we are instructed to run `npm run dev`, and not `gatsby develop`. If we look at the `package.json` file, we get some more insight:

```json
"scripts": {
    ...
    "dev": "(shx --silent rm -rf public || shx true) && gatsby develop",
    ...
  }
```

`npm run dev`

Except, we still get an error.

This is getting a little hairy. I'm not sure what the exact intent of the `dev` script is, but _do_ I know that deleting both the `public` and `.cache` folders is often a recommended troubleshooting step. The `dev` script is only removing the `public` folder. Perhaps something has changed since this script was written.

Let's see if we can alter the script to remove the `.cache` folder as well:

```json
"scripts": {
    ...
    "dev": "(shx --silent rm -rf public .cache || shx true) && gatsby develop",
    ...
  }
```

`npm run dev`

```
You can now view gatsby-react-boilerplate in the browser.
⠀
  http://localhost:8000/
```

Now we are able to run the dev server!

But, we still have some warnings about our peer dependencies. If we run `npm ls` for some of the packages that are missing peers, we see more errors.

<!-- Before installing peer dependencies, I like to check to see if another version of that package is already installed:

```js
npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
```

- `npm ls ajv`: It looks like we already have `ajv` in our project; let's skip it for now

```js
npm WARN extract-text-webpack-plugin@1.0.1 requires a peer of webpack@^1.9.11 but none is installed. You must install peer dependencies yourself.

```

- `npm ls webpack`: We see that `webpack@4` is already installed -- skipping.

```js
npm WARN gatsby-plugin-postcss-sass@1.0.22 requires a peer of gatsby@^1.0.0 but none is installed. You must install peer dependencies yourself.
```

- We shouldn't need to have both version 1 _and_ version 2 of Gatsby.

_Skip-a-dee-doo-da_

```js
npm WARN sass-loader@4.1.1 requires a peer of webpack@^2 || ^2.2.0-rc.0 || ^2.1.0-beta || ^1.12.6 but none is installed. You must install peer dependencies yourself.
```

- We already confirmed that webpack was installed. Yep, skip it!

```js
npm WARN bootstrap@4.4.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
```

- `npm ls jquery`: Hey, this one is empty! Let's install it. There are more dependency warnings in the console, but we'll revisit them after the installation. I've found that the most straightforward way to install peer dependencies with `npm` is to use `npx`:

- `npx install-peerdeps bootstrap@4.4.1`

```js
+ bootstrap@4.4.1
+ popper.js@1.16.1
+ jquery@3.0.0
added 2 packages from 3 contributors, updated 4 packages and audited 27731 packages in 36.881s

56 packages are looking for funding
  run `npm fund` for details

found 9 vulnerabilities (8 low, 1 moderate)
  run `npm audit fix` to fix them, or `npm audit` for details
SUCCESS bootstrap
  and its peerDeps were installed successfully.
```

We still have peer dependency warnings, but we also have the opportunity to run an audit. Let's do that: -->

```js
npm WARN eslint-config-react-app@5.2.1 requires a peer of eslint@6.x but none is installed. You must install peer dependencies yourself.
```

`npm ls eslint`

```js
├── eslint@5.12.0
└─┬ UNMET PEER DEPENDENCY gatsby@2.20.2
  └── UNMET PEER DEPENDENCY eslint@6.8.0

npm ERR! peer dep missing: gatsby@^1.0.0, required by gatsby-plugin-postcss-sass@1.0.22
```

Let's see what happens if we install the dependency in the warning message:

`npx install-peerdeps eslint-config-react-app@5.2.1`

Look at what happens. We installed `eslint@6`, but that made `eslint@5` fall off, and now we are getting a warning that `eslint@5` is missing:

```js
npm WARN @prototype-interactive/eslint-config@0.1.2 requires a peer of eslint@^
5.0.0 but none is installed. You must install peer dependencies yourself.
```

Another thing to note about the peer message returned from `npm ls eslint` is that it is pointing us to an unmet peer for `gatsby@2.19.48`.

Why is that? Let's see if we can get some more information:

First, let's run `npm ls gatsby`

```js
└── UNMET PEER DEPENDENCY gatsby@2.20.2

npm ERR! peer dep missing: gatsby@^1.0.0, required by gatsby-plugin-postcss-sass@1.0.22
```

Then, if we look at our `package.json` file, we see:

```js
  "devDependencies": {
    ...
    "gatsby": "^2.19.48",
    ...
  },
```

<!-- For some reason, when we ran the audit fix the first time, it broke this dependency. To update all dependencies (including devDependencies), we can run:

`npm update -D`

Again, lots of warnings, with the opportunity to run an audit:

`npm audit fix`

Okay, so we still have some of the same peer warnings. The only one left that doesn't require an **already-installed** package is:

```js
npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
```

`npx install-peerdeps tsutils@3.17.1`

But when we run this, we get an error:

```js
npm ERR! notarget No matching version found for typescript@3.7.0.
```

It looks like the version of `typescript` specified in our dependencies is not recognized by `npm`. Not to worry, we can just install the latest applicable version:

`npm install typescript`

These are the peer warnings that are still present:

```js
npm WARN @prototype-interactive/eslint-config@0.1.2 requires a peer of eslint@^5.0.0 but none is installed. You must install peer dependencies yourself.

npm WARN ajv-keywords@3.2.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.

npm WARN extract-text-webpack-plugin@1.0.1 requires a peer of webpack@^1.9.11 but none is installed. You must install peer dependencies yourself.

npm WARN gatsby-plugin-postcss-sass@1.0.22 requires a peer of gatsby@^1.0.0 but none is installed. You must install peer dependencies yourself.

npm WARN sass-loader@4.1.1 requires a peer of webpack@^2 || ^2.2.0-rc.0 || ^2.1.0-beta || ^1.12.6 but none is installed. You must install peer dependencies yourself.
```

We are sort of stuck as far as resolving these dependencies:

- If we install peers for `prototype-interactive/eslint-config@0.1.2`, we will just end up with another peer warning saying `eslint@6` is missing

- If we install peers for `extract-text-webpack-plugin@1.0.1` or `sass-loader`, we will get a peer warning saying that a later version of `webpack` is required

- If we install peers for `gatsby-plugin-postcss-sass`, then we are in big trouble because we will be missing `gatsby@2` -->

Something still seems off about our peer dependencies. If we go down the line and install them with `npx`, we end up with errors when running `gatsby develop`.

We could try to delete the `node_modules` folder and try again, but I'll save you some time; I tried it several times, and we end up in the same place we are now.

What we can do instead is use a package called `yarn`.

`yarn` does essentially the same thing as `npm`, but it executes a bit differently. The reason we are going to use it in this scenario is because `yarn` attempts to "flatten" the dependency tree as much as possible.

In the next section, we cover how to use `yarn` to get around this issue.

## Using Yarn

[Contents](/npm-installs#contents)

So, we are going to delete the project directory from the previous section and start over, just to make sure that we are using the original `package.json` file.

1. `cd ..`

- `rm -rf gatsby-react-boilerplate`

- `git clone https://github.com/PrototypeInteractive/gatsby-react-boilerplate.git`

- `cd gatsby-react-boilerplate`

- `npm install -g yarn`

- `yarn add node-sass`

2. `yarn install`
   - If `yarn install` gives you a network error, try `yarn install --network-timeout 1000000`

Upon running `yarn install`, we get this warning:

```js
warning package-lock.json found. Your project contains lock files generated by tools other than Yarn. It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. To clear this warning, remove package-lock.json.
```

Since `yarn install` generates its own lockfile (`yarn.lock`), we are clear to remove `package-lock.json`

`rm package-lock.json`

Now we can run the following command to check if our dependencies have been met:

`yarn install --check-files`

The warning at the top of the list is:

<!-- ```js
warning "@typescript-eslint/eslint-plugin > tsutils@3.17.1" has unmet peer depe
ndency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >
= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
``` -->

<!-- So we install it with `yarn add typescript` -->

```js
warning " > bootstrap@4.4.1" has unmet peer dependency "jquery@1.9.1 - 3".
warning " > bootstrap@4.4.1" has unmet peer dependency "popper.js@^1.16.0".
```

`yarn list jquery popper.js`

Since this command does not return a version for either package, we know that neither of these packages are installed, and can install them both with the command below:

`yarn add jquery@1.9.3 popper.js@^1.16.0`

Now the warning at the top of our list is:

```js
warning "gatsby > react-hot-loader@4.12.20" has unmet peer dependency "@types/react@^15.0.0 || ^16.0.0".
```

`yarn list @types/react`

Which returns:

```json
└─ @types/react@16.9.25
```

Since it looks like we satisfy the requirement, we can skip this one and move onto the next warning:

```js
warning "gatsby > @typescript-eslint/eslint-plugin > tsutils@3.17.1" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
```

`yarn add typescript`

Now, this is interesting. The next warning on our list says this:

```js
warning " > gatsby-plugin-postcss-sass@1.0.22" has incorrect peer dependency "gatsby@^1.0.0".
```

Notice that we now get a message saying this dependency is **incorrect** instead of unmet.

The rest of our peer warnings are for packages that are already installed in some capacity or another. At this point, we can run the `yarn` equivalent of `update` to try and resolve the issue:

Before we run the command, let's take note of the list of warnings that still exist before we ran the command:

```js
warning "gatsby > react-hot-loader@4.12.20" has unmet peer dependency "@types/react@^15.0.0 || ^16.0.0".

warning " > gatsby-plugin-postcss-sass@1.0.22" has incorrect peer dependency "gatsby@^1.0.0".

warning "gatsby-plugin-postcss-sass > sass-loader@4.1.1" has unmet peer dependency "webpack@^2 || ^2.2.0-rc.0 || ^2.1.0-beta || ^1.12.6".

warning "gatsby-plugin-postcss-sass > gatsby-1-config-extract-plugin > extract-text-webpack-plugin@1.0.1" has unmet peer dependency "webpack@^1.9.11".

warning "gatsby-plugin-sass > sass-loader@7.3.1" has unmet peer dependency "webpack@^3.0.0 || ^4.0.0".

warning "svg-sprite-loader > html-webpack-plugin@3.2.0" has unmet peer dependency "webpack@^1.0.0 || ^2.0.0 || ^3.0.0 || ^4.0.0".
```

`yarn upgrade -latest`

The first thing that I notice after the command runs are these warnings:

```js
warning gatsby-plugin-postcss-sass@1.0.22: You can now add postcss plugins to gatsby-plugin-sass

warning gatsby-plugin-postcss-sass > gatsby-1-config-extract-plugin > extract-text-webpack-plugin@1.0.1: Deprecated. Please use https://github.com/webpack-contrib/mini-css-extract-plugin
```

After all dependencies had been updated, `yarn` recognized that the way the `gatsby-plugin-postcss-sass` package is being used is outdated. It tells us that we can use this package as a plugin within the `gatsby-config.js` file instead. What this tells me is that we can effectively ignore the two warnings below, since we should use the `gatsby-config` method for this package.

```js
warning "gatsby-plugin-postcss-sass > sass-loader@4.1.1" has unmet peer dependency "webpack@^2 || ^2.2.0-rc.0 || ^2.1.0-beta || ^1.12.6".

warning "gatsby-plugin-postcss-sass > gatsby-1-config-extract-plugin > extract-text-webpack-plugin@1.0.1" has unmet peer dependency "webpack@^1.9.11".
```

The only warning left is the one for `@types/react`, which we confirmed was erroneous because an acceptable version was returned when we ran `yarn list @types/react`.

We can double check with `yarn install --check-files`

The only peer dependency we haven't checked at this point is:

```js
warning "svg-sprite-loader > html-webpack-plugin@3.2.0" has unmet peer dependency "webpack@^1.0.0 || ^2.0.0 || ^3.0.0 || ^4.0.0".
```

`yarn list webpack`

```json
└─ webpack@4.42.0
```

This dependency seems to be satisfied as well, so now we can run `gatsby develop`

We get the `webpack` error again, but we already covered how to deal with this one:

1.  Edit the `dev` script in `package.json` to remove the `.cache` folder as well as the `public` folder
2.  run `yarn run dev`

<!-- Success!

We installed all of the dependencies without getting any warnings about missing packages.

The moment of truth: `gatsby develop`

```js
 ERROR #98123  WEBPACK

Generating development JavaScript bundle failed

Cannot find module 'webpack/package.json'
Require stack:
- /home/idev/.nvm/versions/node/v13.8.0/lib/node_modules/gatsby-cli/lib/index.js

File: src/components/icon/github.icon
```

Ouch..

Alright, at this point, we need to do something that probably should have been done at the beginning, but I wanted leave it until now so that its importance could be demonstrated.

What we need to do is check the `README` on the [repo](https://github.com/PrototypeInteractive/gatsby-react-boilerplate)!

Here, we see that we are instructed to run `npm run dev`, and not `gatsby develop`. If we look at the `package.json` file, we get some more insight:

```json
"scripts": {
    ...
    "dev": "(shx --silent rm -rf public || shx true) && gatsby develop",
    ...
  }
```

`npm run dev`

```js
npm ERR! Failed at the gatsby-react-boilerplate@1.0.0 dev script.
```

Okay,  -->

#### Setting a default package manager

To specify which package manager to use with Gatsby, you can alter the file located in `~/.config/gatsby/config.json`

## Using 'npm dedupe'

[Contents](/npm-installs#contents)

Sometimes, even when you install peers selectively, you still end up with with duplicates of a package. We cover how to resolve that in this section.

[The theme in question](https://www.gatsbyjs.org/starters/konsumer/gatsby-starter-bootstrap-netlify/)

`gatsby new gatsby-starter-bootstrap-netlify https://github.com/konsumer/gatsby-starter-bootstrap-netlify`

```js
npm ERR! Failed at the node-sass@4.10.0 postinstall script.
```

`cd gatsby-starter-bootstrap-netlify`

`npm install node-sass`

`npm audit fix`

```js
npm WARN bootstrap@4.4.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
```

`npm ls jquery`

```
└── (empty)
```

`npx install-peerdeps bootstrap@4.4.1`

```js
npm WARN ink-spinner@3.0.1 requires a peer of react@^16.8.2 but none is installed. You must install peer dependencies yourself.
```

`npm ls react`

```js
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── UNMET PEER DEPENDENCY react@16.13.1
└── react@16.6.3

npm ERR! peer dep missing: react@>=16.8.0, required by ink@2.7.1
npm ERR! peer dep missing: react@^16.8.2, required by ink-spinner@3.0.1
```

We are shown that `gatsby`'s dependencies are met as far as `react` is concerned, but other packages require a higher version.

Let's open `package.json` to see what's going on:

```json
"dependencies": {
    ...
    "react": "^16.5.2",
    ...
  },
```

We should be covered, but we don't have the most up-to-date version.

`npm update`

```js
npm WARN gatsby-link@2.3.0 requires a peer of @reach/router@^1.1.1 but none is installed. You must install peer dependencies yourself
```

`npm ls @reach/router`

```js
└─┬ gatsby@2.20.2
  └── UNMET PEER DEPENDENCY @reach/router@1.3.3

npm ERR! peer dep missing: @reach/router@^1.0, required by gatsby-react-router-scroll@2.2.0
```

At this point, it can be a little confusing as to which package we should install the peers for. We originally checked due to the warning we got for `gatsby-link`, but the `npm ls` command tells us that it's also missing for `gatsby-react-router-scroll`. The package we choose to install can lead to different results.

Let's see what happens if we install the peer listed at the end of our `npm ls` output:

`npx install-peerdeps gatsby-react-router-scroll@2.2.0`

```js
npm WARN gatsby-link@2.3.0 requires a peer of react@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

`npm update`

Now we only have this warning left:

```js
npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
```

`npm install typescript`

We have cleared all of our missing package warnings, and are ready to run `gatsby develop`:

```js
  Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  1. You might have mismatching versions of React and the renderer (such as React DOM)
  2. You might be breaking the Rules of Hooks
  3. You might have more than one copy of React in the same app
  See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

If we visit the link provided in the error, it suggests we run the following to check for multiple copies of `react`:

`npm ls react`

```json
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── react@16.13.1
└── react@16.13.1
```

Okay, so this is a problem for a couple of reasons:

1. React should only have one copy in your application. Too many things depend on it for multiple copies to work together.
2. We have two copies, and they are both the same version.

`npm` provides a command to resolve this issue:

`npm dedupe`

Once we run it, we can run `npm ls react` again to see if it worked:

```json
├─┬ gatsby@2.20.2
│ └─┬ gatsby-cli@2.11.0
│   └── react@16.13.1  deduped
└── react@16.13.1
```

We can see that `npm` removed the extra copy for us -- "deduping" it, so to speak.

So now we should be ready to run `gatsby develop` again:

```
You can now view gatsby-starter-bootstrap-netlify in the browser.
⠀
  http://localhost:8000/
```

**Note:** If `gatsby develop` gave you an error after the `dedupe`:

1. Run `gatsby clean`
1. Run `gatsby develop` again

## Dealing with Overly-Restrictive package.json Files

[Contents](/npm-installs#contents)

It's not recommended to manually edit dependencies your `package.json` file, since the current version of `npm` automatically updates the file when you perform updates and installs. Sometimes, though, your options are limited by the semver syntax in the file.

[The theme in question](https://www.gatsbyjs.org/starters/DSchau/gatsby-blog-starter-kit/)

`gatsby new gatsby-blog-starter-kit https://github.com/dschau/gatsby-blog-starter-kit`

This time, we get a different type of error:

```js
✖ Error: pngquant failed to build, make sure that libpng-dev is installed
```

It's a bit hard to tell, but this is actually a tooling issue at the operating system level. In other words, you can't `npm install` this tool.

If we Google `pngquant`, we see that it can be installed with the command:

`sudo apt-get install libpng-dev` (Linux / WSL)

or

`brew install libpng` (macOS)

Once we install `pngquant`, we are ready to try the theme installation again:

`cd gatsby-blog-starter-kit`

`npm install`

We get a familiar error message:

```js
npm ERR! Failed at the sharp@0.21.3 install script.
```

We follow the `npm ls` steps from the previous sections of this post, and determine that we need to run:

`npm install gatsby-plugin-manifest gatsby-plugin-sharp`

```js
npm ERR! Failed at the sharp@0.21.3 install script.
```

This worked before; why isn't it working now?

A pattern emerges: We check our source of truth -- `package.json`

Alright, so what are we looking for here? Well, first we can look for the packages that we were trying to install:

Our `package.json` shows:

```json
"dependencies": {
    ...
    "gatsby-plugin-manifest": "~2.0.2-beta.3",
    "gatsby-plugin-sharp": "2.0.0-beta.5",
    ...
  },
```

If we look these packages up in the [npm registry](https://www.npmjs.com/), we can see that both of these packages have already released version 2, and are no longer in beta.

Now it's clear that the versions are being locked down too restrictively in `package.json`.

We can alter the semver to look like this:

```json
"dependencies": {
    ...
    "gatsby": "^2.0.0",
    "gatsby-plugin-manifest": "^2.0.2",
    "gatsby-plugin-sharp": "^2.0.0",
    ...
  },
```

Note that we also altered the semver for `gatsby`. This is because the two packages we are trying to install are plugins that "plug in" to `gatsby`. So if we are updating the plugin version, it is likely that we need to update the "host" version as well (i.e. `gatsby`).

Now we try our install again:

`npm install gatsby-plugin-manifest gatsby-plugin-sharp`

This time the installation completes, and we can move onto installing the rest of the packages that failed during the initial install:

`npm install`

But now we get yet another error message that doesn't fit the typical pattern:

```js
npm ERR! Cannot read property 'match' of undefined
```

If we Google this error, we can see that the [fix for this error](https://npm.community/t/cannot-read-property-match-of-undefined/203) is to run:

`rm -rf package-lock.json node_modules`

This makes sense, considering we probably goofed something up when we manually edited the `package.json` file.

Now we can run `npm install` once more.

The install works this time, but we have some peer warnings to fix.

```js
npm WARN gatsby@2.0.120 requires a peer of react@^16.4.2 but none is installed. You must install peer dependencies yourself.

npm WARN gatsby@2.0.120 requires a peer of react-dom@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

Our `package.json`:

```json
"dependencies": {
    ...
    "react": "~16.3.0",
    "react-dom": "~16.3.0",
    ...
  },
```

We change it to:

```json
"dependencies": {
    ...
    "react": "^16.3.0",
    "react-dom": "^16.3.0",
    ...
  },
```

Now we can run `npm install` again to update. Except nothing actually updates. The script runs, and we get the same peer warnings again.

If we run `npm ls react`, we see that `react` was not actually updated according to our semver revision. So we can remove the `node_modules` folder and try again:

1. `rm -rf node_modules`
2. `npm install`
3. `npm audit fix`

The only warnings left are for optional dependencies, and so we run `gatsby develop`.

We get this error again

```js
  Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  1. You might have mismatching versions of React and the renderer (such as React DOM)
  2. You might be breaking the Rules of Hooks
  3. You might have more than one copy of React in the same app
  See https://fb.me/react-invalid-hook-call for tips about how to debug and fix
   this problem.
```

If we run `npm ls react react-dom`, we see that we a duplicate.

`npm dedupe`

The duplicate was removed, and we run `gatsby develop` again

```js
 ERROR #98123  WEBPACK

Generating SSR bundle failed

Can't resolve '@babel/runtime/core-js/object/keys' in '/mnt/c/Users/iDev/gatsby-blog-starter
-kit/node_modules/gatsby-link'

File: node_modules/gatsby-link/index.js
```

The error is pointing us to `gatsby-link.` If we look in our `package.json`, we see:

```json
...
"dependencies":{
  ...
  "gatsby-link": "2.0.0-beta.4",
  ...
}
...
```

We change it to:

```json
...
"dependencies":{
  ...
  "gatsby-link": "^2.0.0",
  ...
}
...
```

Then run `npm install`

<!-- The install goes through, but we still have some warnings:

```js
npm WARN gatsby@2.19.49 requires a peer of react@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

`npm ls react`

```js
├─┬ gatsby@2.19.49
│ └─┬ gatsby-cli@2.10.13
│   └── UNMET PEER DEPENDENCY react@16.13.1
└── UNMET PEER DEPENDENCY react@16.3.2

npm ERR! peer dep missing: react@^16.4.2, required by gatsby@2.19.49
npm ERR! peer dep missing: react@>=16.8.0, required by ink@2.7.1
npm ERR! peer dep missing: react@^16.8.2, required by ink-spinner@3.0.1
```

`react` did not get installed when we ran `npm install` after deleting `node_modules`. We now install it now as a peer dependency. We want to get the latest version that also satisfies all of the packages that depend on it. If we install peers for `gatsby`, then we get `16.4.2`, which doesn't satisfy the other two packages that depend on `react` (`16.8.0` and `16.8.2`). Since `gatsby` will accept a version of `react` all the way up to `16.9.9`, we can do it this way:

`npx install-peerdeps ink-spinner@3.0.1`

To reiterate, we installed the peers for `ink-spinner` because it required the most up-to-date version of `react`. This works because of the semver syntax specified.

Alright! All of our warnings for `react` missing are gone, and we are left with warnings for `react-dom`:

```js
npm WARN gatsby@2.19.49 requires a peer of react-dom@^16.4.2 but none is installed. You must install peer dependencies yourself.

npm WARN gatsby-link@2.2.31 requires a peer of react-dom@^16.4.2 but none is installed. You must install peer dependencies yourself.
```

I am hesitant to install the dependencies for `gatsby`, since it is such a large library, and the potential for duplicates seems likely. Since both `gatsby` and `gatsby-link` are expecting the same version of `react-dom` (`16.4.2`) as a peer, we'll go for `gatsby-link` instead:

`npx install-peerdeps gatsby-link@2.2.31`

Sweet! The only peer warning left is for `typescript`:

```js
npm WARN tsutils@3.17.1 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
```

It looks like this peer is defined incorrectly, and we get an error when we try to install it with `npx`. So we can install it directly instead:

`npm install typescript`

Now we have no more peer warnings, and all that's left are warnings for optional dependencies. -->

Now, `gatsby develop` finally works!

```
You can now view gatsby-blog-starter-kit in the browser.
⠀
  http://localhost:8000/
```

## Closing Thoughts

That was a lot to get through, but hopefully you feel a bit more comfortable with npm now. Learning how npm works wasn't necessarily something I was dying to do, but I'm really glad I invested the time. Now I feel like I know enough about npm to install _any_ theme, package, or library.

If something didn't quite make sense, or if you think I left something out (or just plain got it wrong), [let me know](mailto:whistle@theengine.tech)!

## Still Having Issues?

[Contents](/npm-installs#contents)

If the steps in the examples above didn't solve your issue, you may want to try the following:

- Close text editor(s)
- **Completely** close terminal application (don't just open a new tab)
  - Start a fresh terminal session
- `sudo apt upgrade`
- `sudo apt update`
- `sudo apt-get upgrade`
- `sudo apt-get update`
- Check for and install any updates to your OS
- Restart computer (yeah, yeah)
- [Email me for help](mailto:whistle@theengine.tech), or [ask me on Twitter](https://twitter.com/sharifElkassed)!
