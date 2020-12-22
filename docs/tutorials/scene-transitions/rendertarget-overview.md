---
id: tutorials-scene-transitions-rendertarget-overview
title: RenderTarget2D Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: RenderTarget2D Overview
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
slug: /tutorials/scene-transitions/rendertarget-overview
---

A `RenderTarget2D` is like a special kind of texture that we can draw things too.  So instead of drawing our scene directly to the game window (aka backbuffer), we're instead going to draw our scene to a render target.  By doing this, when we do our scene transitions, we can manipulate the render target before we draw it the the screen to for the transition effects.

There are a few caveats to using render targets that we need to be aware of, and make sure that we handle them properly.

1. A `RenderTarge2D` instance is a graphical resource object that we are creating manually. This means its life cycle is not managed by the `ContentManager` like a normal textures, and we'll need to handle disposing of it properly when no longer needed.
2. The contents of the `RenderTarget2D` when we draw to it reside in VRAM.  Due to this, anytime a `GraphicsDevice.DeviceCreated` or `GraphicsDevice.DeviceReset` event occurs, all contents of VRAM are discarded and the `RenderTarget2D` instance will need to be recreated again.  (this isn't as scary as it sounds).

So, with these points in mind, let's get started updating our scene demo.