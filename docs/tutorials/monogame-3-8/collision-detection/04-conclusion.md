---
id: conclusion
title: 'Collision Detection: Conclusion'
hide_title: true
hide_table_of_contents: false
sidebar_label: Conclusion
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'aabb collision'
    - 'aabb'
    - 'circle collision'
    - 'collision detection'
    - 'collision'
description: 'A tutorial series on detecting collisions between 2D primitives in MonoGame.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/collision-detection/conclusion
---

## Conclusion
In this tutorial series, we've discussed collision detection between two rectangles and between two circles. We then implemented the ideas into code into a MonoGame game project.  These two methods are foundational for 2D collision detection in any game development environment and many other implementations can be built off of them. One thing we did not discuss in this series however was collision detection between more complex polygons such as triangles, pentagons, hexagons, etc.  We also did not discuss checking collisions between a polygon and a circle.  

To perform these collision detections, you would most likely use what is called **Separating Axis Theorem**.  The maths behind this have been discussed in length in many other tutorials far better than I could explain, so I will defer you to read those.  If you are interested in further reading about this, please see the following articles as a good starting point

* [Separating Axis Theorem (SAT) Explanation](https://www.sevenson.com.au/actionscript/sat/)
* [Collision Detection Using the Separating Axis Theorem](https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169) by Kah Shiu Chong
* [N Tutorial A - Collision Detection and Response](http://www.metanetsoftware.com/technique/tutorialA.html)
