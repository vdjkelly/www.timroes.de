---
title: Optimizing your webpage for 10k — Part 1
created: 2016-09-25T15:00:00
slug: optimizing-your-webpage-for-10k-part-1
authors:
  - timroes
series: 10kapart
category: Web
summary: |
  Building a real-life webpage in just 10k initial loading size is possible and this
  article explains how.
image: /banners/optimize10k.svg
---

With [10k Apart](https://a-k-apart.com/), Microsoft created a wonderful challenge for
web developers to optimize web projects as much as they can. The challenge is to create
a working web application in an initial file size under 10 kB.

Instead of creating a new small project for this contest, I decided to optimize
my blog to met the requirements. Why? If I would have created a new project I would
have skipped several real world issues just for the sake of the contest.
For example, I would most likely not have included share headers (Open Graph, Twitter, etc.)
into the HTML of the page. But those things exist and are needed in "the real web" and
optimization doesn't mean to get rid of everything, that is not needed for
a contest, but to make the _real web_ as amazing as possible.

Since knowledge is worth twice once you share it, I will use this article to explain what I
did, what I learned during optimizations, and besides it will be my contest entry.

The target
----------

What is the better webpage: the one that loads in one second or the one that loads
in five seconds? The answer is: it depends. If the five second webpage offers the user
a fully usable webpage after 200ms and just loads nice-to-have features afterwards,
while the one second webpage waits a complete one second before it offers anything
to the user, the user benefits way more from the first experience.

You want the user not to wait long. That doesn't mean, that you must have loaded
everything in - let's say - under a second. It just means: keep the waiting time, i.e.
the time the user can't do anything useful with your page, as short as possible.

That's also why the 10k Apart contest is about an initially loading
size below 10k. You should offer an interactive result for the user in 10k and
load asynchronous what you don't need for that.

Where did I start from?
-----------------------

To see where I start from, I looked at the file sizes of several pages of my blog
and e.g. the start page had the following sizes:

| Type       | Size   |
|------------|--------|
| HTML       | 3.5kB  |
| CSS        | 7.2kB  |
| Images     | 96.8kB |
| JavaScript | 39.6kB |
| Fonts      | 62.8kB |

Those summed up to a total of around 210kB for the start page. So a long way down
to 10kB. So what could one do to decrease that size?

* Optimize JavaScript loading
* Load fonts asynchronously
* Load images asynchronously
* Use above-the-fold rendering for CSS
* Make the HTML smaller

[[hintbox]] If you haven't minimized your CSS, JavaScript, HTML, images yet, that it of course
the very first step to do. There are great tools out there like [imagemin](https://github.com/imagemin/imagemin),
[UglifyJS](https://github.com/mishoo/UglifyJS) and [clean-css](https://github.com/jakubpawlowicz/clean-css)
that you can easily integrate into your build process. The sizes above are of course
the minified and gzipped - which you should totally use on any webserver - sizes.

The main restriction I set myself was, not to decrease the user experience I already had.
Also though the main target of the 10k Apart contest is the 10kB file size, the idea
behind this is to create amazing web experiences. It wouldn't match the idea
of the contest to get files smaller by decreasing user experience.

Besides the size limit the contest also judges aspects like accessibility,
interoperability, progressive enhancement, design and user experience, which I
will also cover throughout this article.

Optimizing JavaScript
---------------------

Let's first look at how I optimized the JavaScript. In fact most of the optimizations
explained during this section were already made when I created the new blog software
or some month after. But for the sake of this article, let's assume they are all new :-)

One of the technologies you should definitly have a look into when it comes to performance
are Service Workers. Serice Workers allow a browser the cache a complete webpage
for offline usage and serve it completely from cache. There are tons of great articles
out there in the web on how to use them, so I won't cover it in this article in detail.

I use [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) to create a service
worker that caches all articles on your first visit of the blog and all required
resources, except images, since they are just too large and in most of my articles,
they aren't really an important part of the article. Though if you visit an article
while being online, all images loaded will still be added to the cache for later
offline usage.

The easiest part I could do, to optimize the JavaScript loading performance, was
adding the `async` attributes to the script tag, that loads the JavaScript. The
[browser support](http://caniuse.com/#feat=script-async) is pretty good and the browser
will now load the script asynchronously and execute it once it's finished loading.

That technique is especially usefull if JavaScript is completely optional, as it
is for this blog (the so called _progressive enhancement_). The blog just adds some
nice-to-have features with JavaScript, like:
you get a sticky footer on bottom of the screen, without JS this footer will just be
at the bottom of the article. If you have a smaller device and JS, the related posts
below some articles will be collapsed by default and can be expanded. Without JS they
are just expanded all the time. The history of a post is loaded via AJAX and so only viewable with JavaScript,
since I don't consider this an important feature for the main purpose of this blog. Also buttons
to copy code snippets in the articles are considered optional by me and only available
via JavaScript.

In general I would recommend, if you can live without JavaScript, do so. As seen above
there are features that you might just not want to have without JavaScript and some
that you might want to build another way or with another design. But if you can't?

This brings me to the first and for me most important rule in optimization:
**Get your priorities straight!**

[[hintbox]] Only [1.1% of users](https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/)
are not experiencing your webpage with JavaScript. Also note, that the statistic
is from 2013 and I expect this number to be even smaller today, but haven't found
any more up-to-date numbers. If you compare this number e.g. to the number of
[blind users](https://nfb.org/blindness-statistics), which is around 2 to 3 times higher,
and you haven't optimized for both groups, you might want to start with the latter group (also
taking into account, that disabled JavaScript is more often by choice than being blind).

Besides using `async` to get the JS I thought about getting rid of jQuery completely, which would
decrease the size of the loaded script a lot. In the end I decided against it, since
jQuery does a great job in solving all the interoperability issues between different
browsers.

So I ended up in having around 40kB JavaScript loaded asynchronous and not being
required at all. If the request e.g. would fail or the user doesn't have JS
available only small enhancements would be missing.

Continue reading in [part 2](post:optimizing-for-10k-part2).
