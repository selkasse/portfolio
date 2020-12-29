---
title: "How to Easily Fix Your Docker Volumes in Windows"
date: "2020-03-25"
---

<span id='top'></span>

> TL;DR: Make sure Docker is installed in 'C:\Users'

<!-- end -->

I've included the "TL;DR" up top because it really is that simple of a fix. However, I still thought that this was worthy of a post, for those interested in a bit more detail.

So yes, that's really all there is "solution-wise" to this post:

- Make sure Docker is installed in `C:\Users\yourUserName`
- You can then use the following syntax for your volume:

`docker container run -it --rm -p 5000:5000 -e FLASK_APP=app.py --name web1 -e FLASK_DEBUG=1 -v $PWD:/app web1`

- `$PWD` is our 'present working directory' on your local machine

- `/app` is the `WORKDIR` in the container

- You should now be able to refresh the application to see changes, without stopping and restarting the image

If you're having issues with Docker volumes on Windows for a reason other than the installed location, [drop me a line](https://twitter.com/sharifElkassed), and I'll do my best to help you out!
