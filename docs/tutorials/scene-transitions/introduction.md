---
id: tutorials-scene-transitions-introduction
title: Introduction
hide_title: false
hide_table_of_contents: false
sidebar_label: Introduction
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'scene transition'
    - 'scene'
    - 'scenes'
description: 'A tutorial on create scene transition effects in a MonoGame project.'
image:
slug: /tutorials/scene-transitions/introduction
---

In the previous tutorial, we went through the steps of adding a `Scene` class and implementing it in to our `Game1` class. With this, we were able to change from one scene to another using the `ChangeScene(Scene)` method we created.  However, when we changed scenes, visually, it was less than impressive. One scene pops out and the new one pops in almost instantly.

In this tutorial, we're going to fix that. We're going to adjust what we did previous so that we can have different effects to transition our scenes out and in.  

## Prerequisites
The following are the prerequisites if you plan to follow along with this tutorial in code.

* MonoGame 3.8
    * The code has not been tested against **MonoGame 3.7.1**.  It should still function the same, however no guarantees are given.
* Completion of the previous [Scenes](/scenes) tutorial.
    * This tutorial builds off the code that was created in the previous tutorial series.

## Tutorial Structure
Due to the size of this tutorial, I have opted to break it down into smaller pages.  At the bottom of each page in this tutorial, you'll find a button to click which will take you to the next page in the series, or the previous page if you wish to go back one.

### Desktop Users
Users using a desktop or larger screen device can use the side bar on the left to jump to different pages within the tutorial.  There is also a table of contents on the left of each page if you wish to jump to a difference section in a page.

### Mobile Users
users using a mobile device can use the side bar that would normally be on the left by clicking the menu button positioned in the bottom right corner of your screen.  Due to the limited screen real estate of a mobile device, no table of contents for each page will appear. 


## Credits
Before we get started, I would like to acknowledge [PorbleG](https://www.twitter.com/PorbleG).  Some time ago, I reached out to them regarding the scene transition effects they were using in their game [Wark & Wimble](https://warkandwimble.com).  They were kind enough to provide me with some source code examples of the transition effects they used in game.  

With permission, I have created this tutorial series to show how anyone can implement them into a MonoGame game project.

## Code License
All code written in this **Scene Transitions** tutorial series, unless otherwise stated, is licensed under The UnLicense.  This license extends to only the code written, not the tutorial documentation.  The license text is as follows:

```
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
```

With all of that out of the way, let's jump to the next page in the tutorial.