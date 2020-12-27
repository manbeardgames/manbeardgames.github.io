---
id: introduction
title: 'Collision Detection: Introduction'
hide_title: true
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
description: 'A tutorial series on 2D collision detection in MonoGame'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/collision-detection/introduction
---

# Introduction
In this tutorial series, we are going to discuss  the different methods of collision detection used in 2D games. These methods are

* Axis-Aligned Bounding Box
* Circle Collision
* Separating Axis Theorem

As we discuss each of these methods, we're going ot create an implementation fo them into a new MonoGame 3.8 game project.

## Prerequisites
The following are the prerequisites if you plan to follow along with this tutorial in code.

* MonoGame 3.8
    * The code has not been tested against **MonoGame 3.7.1**.  It should still function the same, however no guarantees are given.
* A new game project
    * This tutorial starts with a fresh **MonoGame Cross-Platform Desktop Application (OpenGL)** project.

## Tutorial Structure
Due to the size of this tutorial, I have opted to break it down into smaller pages.  At the bottom of each page in this tutorial, you'll find a button to click which will take you to the next page in the series, or the previous page if you wish to go back one.

### Desktop Users
Users using a desktop or larger screen device can use the side bar on the left to jump to different pages within the tutorial.  There is also a table of contents on the left of each page if you wish to jump to a difference section in a page.

### Mobile Users
users using a mobile device can use the side bar that would normally be on the left by clicking the menu button positioned in the bottom right corner of your screen.  Due to the limited screen real estate of a mobile device, no table of contents for each page will appear.

## Project Files
You can find the completed version of the project created with this demo at https://github.com/manbeardgames/monogame-collision-detection-demo

## Code License
All code written in this **Collision Detection** tutorial series, unless otherwise stated, is licensed under The Unlicense.  This license extends to only the code written, not the tutorial documentation.  The license text is as follows:

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