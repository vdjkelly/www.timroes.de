---
title: Optimizing your webpage for 10k — Part 2
created: 2016-09-25T15:01:00
slug: optimizing-your-webpage-for-10k-part-2
authors:
  - timroes
series: 10kapart
category: Web
summary: |
  Building a real-life webpage in just 10k initial loading size is possible and this
  article explains how.
image: /banners/optimize10k.svg
---

Read more in [part 1](post:optimizing-for-10k) of this series.

Above-the-fold CSS
------------------

Next up was the CSS. I earlier loaded 7.2kB in the head of my page. That's too much
and I wanted to get it down and even more important split it up and use
[above-the-fold](https://css-tricks.com/authoring-critical-fold-css/) CSS.

In that way you determine some "critical" CSS, that you don't want your page to render
without and load the rest async. The critical CSS is often the CSS you need to render
what is visible "above-the-fold", i.e. without scrolling your page. There are some
tools that automate that process and figure out which CSS you need without scrolling.

I would recommend splitting up manually. There are parts of your CSS above the fold
that you still won't consider critical and stuff out of view, that you still might to load.
But how to decide? This brings me to my most important rule: **Prevent jumping content!**

Jumping content means your page shows content and while more and more async loaded
resources come back the content starts too jump, e.g. because images are inserted,
sizes set in CSS changes, etc. Why is jumping content so bad? Your user has already started interacting with the
page and perhaps is trying to click a link in that moment content jumps and suddenly
the link is somewhere completely different. Even if the user
isn't clicking there is usually at least the human-machine-interaction of reading the page, which
jumping content will just interrupt. So how does this influence splitting?

Some of the stuff I would recommend putting into critical CSS:

* General positioning (dimensions, margins, paddings, etc.) of elements
* Font families and sizes, line-heights, several other font-metrics

Some recommendations of what to load async:

* Colors (e.g. color scheme for syntax highlighting in this blog)
* CSS for elements clearly out of scroll (e.g. the author box below this article)

To prevent that elements that I didn't put any styling in the critical CSS (author box, comments, footer, etc.)
from showing in an unstyled version for the case the async loaded CSS needs longer to load than
the user to scroll to them, I used `display: none` in the critical CSS to hide
them until their final style has been loaded. If you need more inspiration on
how to split up your CSS, you can have a look at [my styles](https://github.com/timroes/www.timroes.de/tree/master/src/styles)
with all critical styles in the "atf" folder.

I ended up with 2950 bytes critical CSS loaded synchronous with the article and even
splitted up the async loaded CSS a bit more. I recognized that 2kB of the remaining
CSS are only used for the start page, which the vast majority of the visitors
never visit. So I extracted this into its own file and only load it on the start page.
The remaining 2775 bytes of CSS are loaded via [loadCSS](https://github.com/filamentgroup/loadCSS#recommended-usage-pattern).

Several people (and Google PageSpeed Insights) recommend inlining the critical CSS
into the head of your page, to prevent any further network request and also not having
possible failed requests. I considered 2.9kB still too large to inline into the HTML
and prefered that being also cached between pages and not needing to be transfered for
every article you read again. I prefered making sure the blog looks also readable
for the case that request fails and you don't have any CSS.

Load fonts asynchronously
-------------------------

Webfonts can make up large parts of the total size of a webpage. So it is also useful
to load them async. Since browser behaviour isn't very consistent in font loading yet
and I wanted to give the best experience and not having text that shortly flashes
after loading, I build some custom font loading into the blog. Since the explanation
is a bit longer, I spend font loading its own post: [Optimizing your webpage - Font Loading](post:optimizing-font-loading)

As a result of this optimization all fonts are now loaded asynchronous and so we got
rid of another 70kB before user meaningful user interaction.


Load images asynchronously
--------------------------

Besides finding and fixing a bug in my build system, that caused my favicons to become
larger while optimizing, I also started loading all images - except the 601 bytes favicon
on top of the page - async.

Since async image loading deserves some more attention, I wrote a complete
article about it: [Optimizing your webpage - Image Loading](post:optimizing-image-loading)

After optimization I ended up with all images being loaded async and not contributing
to the 10k initial loading size at all anymore.

Continue reading in [part 3](post:optimizing-for-10k-part3).
