---
title: "Ways to fix strange behavior with localhost and 'gatsby develop'"
date: "2020-03-28"
---

Normally, any funky behavior can be resolved with a simple restart of the development server. Recently, though -- I ran into a couple of issues that required some additional steps.

### Check the production build

Chances are, the issue you are facing is only happening with `gatsby develop`, and shouldn't be cause for concern. A good way to confirm this is to check the production build of your project, and see if the issue exists there.

To do so:

1. `gatsby build`
2. `gatsby serve`
3. View the build at `http://localhost:9000/`

Next, we cover steps for how to solve the specific issues.

### Page is constantly refreshing

You'll know it if you see it. The page doesn't even seem to fully load before it starts the loading process over again. Luckily, the fix is pretty straightforward:

1. Stop the development server
2. `gatsby clean`
3. `gatsby develop`
4. `ctrl` + `shift` + `r` to force a new version of the page instead of the cached version

> Note: Most of the time you can get by with just the hard reload

You should be all set!

### Page hangs, never loads

Exactly what it sounds like. The 'loading' circle spins 'round and 'round... but it doesn't ever stop loading to give you an error.

To resolve this, try any and all of the following:

- Try in a different browser / window / tab
- `gatsby clean`
- Update Gatsby using `npm install -g gatsby-cli`
- Restart computer

---

I'll continue to update this post if I run into any other issues with `gatsby develop`. Thankfully, the Gatsby team seems to update pretty frequently. Maybe this won't even be an issue by the time you're reading this!

> Gatsby version at the time of this writing: `2.19.43`
