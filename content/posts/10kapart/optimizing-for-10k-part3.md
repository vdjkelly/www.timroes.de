---
title: Optimizing your webpage for 10k — Part 3
created: 2016-09-25T15:02:00
slug: optimizing-your-webpage-for-10k-part-3
authors:
  - timroes
series: 10kapart
category: Web
summary: |
  Building a real-life webpage in just 10k initial loading size is possible and this
  article explains how.
image: /banners/optimize10k.svg
---

Read more in [part 2](post:optimizing-for-10k-part2) of this series.

Design and Accessibility
------------------------

Good design is as important for visual unimpaired users, as good accessibility (a11y) for
visual impaired users. I didn't change the design during this contest, since I tried
creating a proper design when I created the blog. The most important part for me about
the design was: focusing on the content. I didn't want to get any big headers or
side navigations distracting the reading flow of the user. I tweaked font metrics
a lot until I (and the people that tested for me) found them the most pleasant to read.

Unfortunately I haven't spend much time into tweaking accessibility of my blog, but
thanks to 10k Apart I did now.

I used tools like [a11y](https://github.com/addyosmani/a11y) to check for issues
in the blog. I highly recommend using such tools - and use common sense than. These
tools are great in showing you several issues that are really existing, but you
also need some common sense to filter out several false positives.

First I checked, that the [OpenDyslexic](https://opendyslexic.org/download/) plugins
work fine with my page, so dyslexic people can read this blog properly.

Next I corrected the contrast of of all my colors to have at least the
[WCAG recommended](https://www.w3.org/TR/WCAG/#visual-audio-contrast) contrast ratio of **4.5:1**.
Therefore I shifted some of the colors a bit to make them slightly lighter or darker.
This [contrast ratio calculator](http://leaverou.github.io/contrast-ratio/) helped
me a lot while finding new colors. If you have some corporate identity, that you must
respect, these kind of tasks might be a bit more complicated. So shoutout to all
designers of corporated identities: take these recommendation already in mind when
creating color palettes.

The hardest part was testing for screenreaders. I am working on Linux whose screen-reader
choice (and real-world distribution) is quite low. The best screen reader for testing
I found was [ChromeVox](http://www.chromevox.com/), Google's screenreader used in Chrome OS.
You can install it as a simple Chrome plugin and start optimizing your page. I later checked
everything on a Mac with VoiceOver again and made sure it also works as expected.

One of the large problems there is, screenreaders are adding a third level to the
compatibility matrix, that browsers and operating systems are already creating.
VoiceOver may behave different with Safari on Mac than with Chrome on Mac, which
might differ from Chrome on Windows with Jaws, etc. Unfortunately documentation
on what tags and what behaviour is implemented in which screenreader is pretty
non-existing (except some rare pages where you find some of the combinations tested
for one special ARIA tag or so).

So what are my recommendations for a11y HTML?

* Use standard HTML where possible. If you use `a` for links and `button` elements
  for buttons screenreaders can do their job already pretty good. If you use custom
  elements or use elements in ways not intended, make sure to set the correct
  [roles](https://www.w3.org/TR/wai-aria/roles).
* If you use semantic tags like `nav`, `main` or `header`, screenreaders can use
  these as "landmarks" to quickly let the user navigate towards them and e.g. skip
  directly to main content.
* Set `aria-hidden="true"` on pure design elements not contributing to content, e.g.
  I recognized that screenreaders are reading out the "middle dot" separator between
  my navigation links. So I put it into an aria-hidden span. Another example: the sticky
  footer is a copy, that will be attached to the body. So there are actually two times
  the same element in the DOM (the fixed one on bottom of the article and the sticky one).
  I changed the JS to add `aria-hidden="true"` to the copy, so screenreaders can't see it.
* Some "not just for design images" may be also hidden, e.g. I `aria-hidden`'ed the author images
  on the bottom of the post. Any alternative text would just be "Profile picture of Tim Roes" or
  "a strange guy looking to the upper left". There is no real use in my opinion in
  presenting that to screen readers. The author section fulfills its purpose also
  very fine without the image, so I decided not to put any nonsense alternative text
  on it.
* Create useful `aria-label` or `title` for image links, e.g. the I set a `title` "Share on Twitter"
  on the appropriate share button and therefore `aria-hidden` the "Share on" label
  before the icons (that you will only see if your screen is wide enough). It just sounded
  nicer to have the screenreader read out "link, Share on Google+", "link, Share on Twitter", etc.
  instead of "Share on", "link, Google+", "link, Twitter".
* In some places it makes more sense creating a `aria-label` for a group than "naming" all children (e.g. icons).
  I could e.g. just add a SVG `title` to the clock icon on top indicated the reading time
  of this post. I found the reading flow way better, just hiding the icon to screenreaders
  and give the whole time tag an `aria-label` of "Estimated reading time is 20 minutes". That way
  it's just one "*tab*" (navigation to next item) for that very expressive label instead of: *tab*, *clock icon*
  (or better *reading time*), *tab*, *20 min read*. I did the same for the article overview on the
  start page. Instead of letting the user navigate over 3 children in each link, just add an
  `aria-label` with *post title, written on May 4, 2016, a 12 minutes read*.
* Use advance attributes (like `aria-expanded`) for more advance controls. I have a "Show changes"
  button on top, which toggles the history of changes of a post. I use `aria-expanded` and `controls`
  to mark which element this button toggles and what the current state is. I still find it hard
  to get the screenreader to show the relation to what the button toggles, so I added a label
  "Toggle post changes. Next in tab order when shown." to the button, so you know immediately
  where you can expect the expanded element.

Continue reading in [part 4](post:optimizing-for-10k-part4).
