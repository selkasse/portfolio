---
title: "What I've Learned About npm Dependencies"
date: "2020-03-08"
---

Until recently, npm had always been one of those things that I could sort of muddle my way through, but ultimately felt very overwhelming. Every time I ran a `npm install`, I would cross my fingers and hope the install went through. When it didn't, I would Google around for a bit, and almost always ended up just giving up on it.

I didn't really have that option when it came to installing a Gatsby theme for this blog, since a package manager is needed for the install. It was either settle on a theme that didn't give me any installation issues, or dive in and learn npm.

And here we are.

This post is meant to be a primer to answer any questions you might have when reading my more <a target='_blank' href="/npm-installs">detailed/technical post</a> in which we dive into troubleshooting various issues with npm installations.

## package.json

This file serves as the backbone for node packages. This is the file that gets created when you start a node project with `npm init`. When you install packages in your project, the `package.json` file is updated, adding the package (along with its version) to the file.

This file contains a project's "top level" dependencies, and is the driving force behind which packages get installed. This is why running `npm install` won't work unless there is a `package.json` file present.

If you install `react` in your project using `npm install react`, you will see `react` added to `package.json`. However, `react` depends on many other packages for its functionality. You won't see those packages listed in `package.json`. Instead, those will be listed in `package-lock.json`.

## package-lock.json

This file exists for portability and dependency purposes. In the last section, I said that `package.json` was the driving force behind which packages get installed. Conversely, `package-lock.json` is the driving force behind which _versions_ get installed. To put this in context, let's imagine we are starting our own open source project from scratch. It's a simple project, and only requires two packages to be installed:

1. `some-made-up-library` (version 0.9.0)
2. `another-fake-library` (version 2.0.0)

Our project works perfectly with this configuration, until `some-made-up-library` updates to version 1.0.0, which causes `another-fake-library` to stop working. We can solve this problem in our own environment by simply downgrading `some-made-up-library` back to v0.9. This is fine for our individual setup, but what about the other developers that want to utilize our project? We could specify the version requirements in the `README` file, but what if our project had 50 libraries with similar version restrictions? Are we going to list those all out in the `README`? That's no way to live your life!

These are what are known as _dependencies_, since the functionality of one package **depends on** the version of one or more _other_ packages. Those other packages can have their own dependencies, which in turn have _their_ own dependencies, etc. This is the reason the `package-lock.json` file exists.

`package-lock.json` specifies the versions to use for each package. This means that when someone clones the repo and runs `npm install`, the versions specified in `package-lock.json` will be installed locally to their system.

In our fictitious scenario, the `package-lock.json` file would make sure that the older version of `some-made-up-library` is installed when other developers use our published package. If the `package-lock.json` file weren't present, then other developers would get the most up-to-date version, which does not work with our project.

## Semantic Versioning

Semantic Versioning (also referred to as "semver") is the syntax for the version numbers you see in `package.json` and `package-lock.json`. There are three numbers, separated by decimals. For example: `1.8.4`

- `1` is the major version
- `8` is the minor version
- `4` is the patch version

You can also use prefixes on the versions: `^` or `~`

- `^` allows the minor and patch versions to be updated, keeping the major version the same
- `~` allows the patch version to be updated, keeping the major and minor versions the same
- Omitting a prefix will use the exact version only (no updates)

It is generally safe to update minor and patch versions without breaking dependencies, but not major versions.

## Dev Dependencies

These are dependencies that are only needed during the actual development of a package. As such, devDependencies aren't needed to actually _use_ the package. Another way to think about this is: devDependencies are not needed at runtime. Things like testing libraries and [linters](<https://en.wikipedia.org/wiki/Lint_(software)>) are common use cases for devDependencies.

When you run `npm install`, both "regular" dependencies and devDependencies are installed, because this default command assumes that you will be doing some development. However, if you run `npm install --production`, the devDependencies listed in your `package.json` file will not be installed.

It's also important to note that the devDependencies of your dependencies won't be installed when you run `npm install`. This threw me off at first, but when you think about it, it makes sense:

Say `babel` is one of our dependencies; we aren't coding a new feature into `babel`, or improving the `babel` package, we are simply _using the existing functionality_ of `babel` to run our application.

If it's still not making sense, think about it this way: devDependencies listed in **your project's** `package.json` are installed so that you can work on your project. devDependencies listed in a `package.json` file inside a **package's sub-directory** in your project's `node_modules` folder (e.g. `yourproject/node_modules/babel/package.json`) are not installed because that package is already ready to use. Since the package is ready to use, it doesn't require any additional development as far as your project is concerned, and therefore the devDependencies specific to that package are not installed.

## Peer Dependencies

This type of dependency is a bit less common to see, but just as important to understand. These will appear in your `package.json` as `peerDependencies`.

The thing that sets peerDependencies apart from package-level dependencies and devDependencies is the fact that peerDependencies are not installed automatically. Why not?

This is typically seen with plugins that require a different version of a package that is already defined at the top-level. To avoid installing two versions of the same package, the peerDependencies are not installed.

Quite honestly, I think peerDependencies are a challenging concept to grasp. The important thing is that you are aware of them, and recognize not to ignore warnings that tell you a peer dependency is not installed. The reason that missing peerDependencies produce warnings instead of errors is because peerDependencies aren't required when the package is being installed and built. Instead, peerDependencies come into play when the package is actually being _used_.

What might that look like?

When I first installed the Gatsby theme for this blog, I had no clue about peerDependencies. There were warnings for missing peers when I installed the theme, but I didn't read them because I thought warnings could be ignored as long as the installation had no errors. Well, I probably should have read those warnings, because the auto-format-on-save functionality wasn't working when I was making changes to the code. It turns out, one of the peer warnings was for `eslint`.

If I had read the warning and manually installed `eslint`, my format-on-save would have worked from the get-go.

## Conclusion

Throughout this post, I have tried to provide a base-level understanding of the underlying technologies around JavaScript package management.

There is obviously a lot more to `npm` and `dependencies` than what I have gone through here. This post isn't intended to make you an expert on the topic, but rather, to provide enough foundational knowledge for you to get past any `npm` issues you might be having.

For detailed examples on troubleshooting npm installation failures and issues, see <a target='_blank' href="/npm-installs">How To Stop Your npm Installs From Failing</a>

If you feel like you need more information on the fundamentals of npm, Traversy Media has a great [crash course](https://www.youtube.com/watch?v=jHDhaSSKmB0) on YouTube.
