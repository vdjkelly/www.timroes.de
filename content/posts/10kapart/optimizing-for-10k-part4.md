---
title: Optimizing your webpage for 10k — Part 4
created: 2016-09-25T15:02:00
slug: optimizing-your-webpage-for-10k-part-4
authors:
  - timroes
series: 10kapart
category: Web
summary: |
  Building a real-life webpage in just 10k initial loading size is possible and this
  article explains how.
image: /banners/optimize10k.svg
---

Read more in [part 3](post:optimizing-for-10k-part3) of this series.

Make HTML smaller
-----------------

After I optimized the above aspects, the last tasks was optimizing HTML. Everything was
already minimzed there, so I thought about looking into minifying CSS class names.
Since I didn't found any plugin that is working well enough and the size benefit
was very minimal, I decided to leave CSS names as they are. I removed some script
tags from the HTML and put them into the async loaded JavaScript and removed some
unnecessary meta tags.

After that I checked sizes and realized, that most of my blog posts are now under 10kB,
but still there are some that didn't match that criteria. So what to do about those?

The HTML for some of the posts is too large, because the content is just too long
to fit in 10kB no matter how much optimization you do on the HTML. So it's nothing
I could solve with plain optimization of the HTML as it was and the only solution
would be splitting up the HTML.

So here is the solution:

* Split up the HTML into page one, two, and so on.
* If the user has JS enabled, load all further pages via AJAX and append to the content loaded initially.
* If the user doesn't have JS, just offer links, which will go to the next/previous page.

That way you can end up with all posts - no matter how long they are - being less than 10kB in size.
Nevertheless I didn't put this solution into my blog. Why? It has some technical and more
important several usability problems.

The main technical issue is searchin engine indexing. If I implement the solution
above, Google would start indexing the first page and since they execute JavaScript index
the whole article as one page (which is also what I would like). Unfortunately a lot
of search engines doesn't execute JS yet and would index all pages individually, which
is not what I would like, since the article should be seen as one article. I could
influence the indexing a bit by setting the canonical URL of each page to the first page,
but than all other pages wouldn't be indexed and seachable. I could create a special
one page serverside rendered version, that is only delivered to search engines.
Right now this blog is completely served static without any serverside logic and I would
like to leave it that way (for performance and complexity reasons).

Way more than the search engine problems ways the usability problem I see. If a user
is on a bad connection, the user might get the initial page one but even with JS
enabled will not be able to load any additional pages, due to connectivity problems.
I tested how the bahviour feels in practise. I prefered waiting for 15kB (my largest
article so far) over reading half of that article, and being stuck with a "Content loading"
spinner when reaching the end of the initial loaded article. That's why I ended
up not implementing this solution, which brings me to the last hint:

**Don't optimize for some arbitrary limits.**

The 10kB are some arbitrary limit and could have been as well 8kB or 17kB (in which case
all my articles would have met the criteria). Do whatever you can to get the best result
for your webpage, but don't set yourself a limit and enforce it by decreasing your
usability or making nonsense decisions.

Since this is one of the articles, having a larger than 10k HTML, I will be hypocritical
enough to split it up into multiple pages (despite the overhead due to the HTML frame)
just for the sake of the contest (but leave the complete one page version on my blog).

The Result
----------

Looking at the new sizes after I finished all optimizations:

| Type                  | Size   | Async |
|-----------------------|--------|-------|
| HTML                  | 3.48kB |       |
| Critical CSS          | 2.88kB |       |
| CSS                   | 2.72kB | <span aria-label="Loaded async">X</span> |
| CSS (start page only) | 1.89kB | <span aria-label="Loaded async">X</span> |
| Logo on top           | 601B   |       |
| Images                | 96.8kB | <span aria-label="Loaded async">X</span> |
| JavaScript            | 35.7kB | <span aria-label="Loaded async">X</span> |
| Font                  | 62.8kB | <span aria-label="Loaded async">X</span> |

With all the changes I decreased my initial loading size from
210kB to 3.46 kB plus the size for the HTML - in case of the start page around 3.5kB.

Looking at all different article HTML sizes, I succeeded in having 24 post and pages
to load in under 10k and the remaining 9 to load in under 20k.

Also looking at how the page loads the loading behavior has improved, especially
for low connections, and the - in my opinion - greatest benefit is: I finally implemented
a proper accessibility for this blog.
