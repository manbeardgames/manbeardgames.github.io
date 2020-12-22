---
id: scene-class
title: "Scenes: The Scene Class"
hide_title: true
hide_table_of_contents: false
sidebar_label: The Scene Class
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'scene transition'
    - 'scene'
    - 'scenes'
description: 'A tutorial on creating scenes in a MonoGame project.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/scenes/scene-class
---

# The Scene Class

:::note  
If you haven't created a new Monogame 3.8 game project yet to follow along with this tutorial, now would be the time to do it.  For more information on creating a new project, check out the official documentation at https://docs.monogame.net/articles/getting_started/2_creating_a_new_project_vs.html.
:::

### The Code
In this part of the tutorial, we are going to create the code necessary for our `Scene` class. This class will be the foundation for all scenes we could create in our game.  

:::note Perform the Following
In your project, create a new class file called **Scene.cs** and add the code found below.  In the sections of this page after the code, we'll go over each of the aspects of this class file and what all of it is doing.


**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**Scene Class**
```csharp
public abstract class Scene
{
    //  A cached reference to our Game instance.
    protected Game1 _game;

    //  Used to load scene specific content
    protected ContentManager _content;

    /// <summary>
    ///     Creates a new Scene instance.
    /// </summary>
    /// <param name="game">
    ///     A reference to our Game1 instance.
    /// </param>
    /// <exception cref="ArgumentNullException">
    ///     Thrown if the value supplied for <paramref name="game"/> 
    ///     is null
    /// </exception>
    public Scene(Game1 game)
    {
        if (game == null)
        {
            throw new ArgumentNullException(nameof(game), "Game cannot be null!");
        }

        _game = game;
    }

    /// <summary>
    ///     Initializes the Scene
    /// </summary>
    /// <remarks>
    ///     This is called only once, immediately after the scene becomes
    ///     the active scene, and before the first Update is called on 
    ///     the scene
    /// </remarks>
    public virtual void Initialize()
    {
        _content = new ContentManager(_game.Services);
        _content.RootDirectory = _game.Content.RootDirectory;
        LoadContent();
    }

    /// <summary>
    ///     Loads the content specific to the Scene.
    /// </summary>
    /// <remarks>
    ///     This is called internally by the Initialize() method.
    /// </remarks>
    public virtual void LoadContent() { }

    /// <summary>
    ///     Unloads any content that has been loaded by the scene.
    /// </summary>
    /// <remarks>
    ///     This will be called after the game switches to a new
    ///     scene.
    /// </remarks>
    public virtual void UnloadContent() 
    {
        _content.Unload();
        _content = null;
    }

    /// <summary>
    ///     Updates the Scene.
    /// </summary>
    /// <param name="gameTime">
    ///     A snapshot of the frame specific timing values.
    /// </param>
    public virtual void Update(GameTime gameTime) { }


    /// <summary>
    ///     Handles preparing the Scene to draw.
    /// </summary>
    /// <remarks>
    ///     This is called just before the main Draw method.
    /// </remarks>
    /// <param name="spriteBatch"></param>
    public virtual void BeforeDraw(SpriteBatch spriteBatch, Color clearColor)
    {
        //  Clear the backbuffer
        _game.GraphicsDevice.Clear(clearColor);

        //  Begin the spritebatch
        spriteBatch.Begin();
    }

    /// <summary>
    ///     Draws the Scene to the screen.
    /// </summary>
    /// <remarks>
    ///     This is called immediately after BeforeDraw.
    /// </remarks>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    public virtual void Draw(SpriteBatch spriteBatch) { }

    /// <summary>
    ///     Handles ending any drawing the scene is performing.
    /// </summary>
    /// <remarks>
    ///     This is called immediately after Draw.
    /// </remarks>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    public virtual void AfterDraw(SpriteBatch spriteBatch)
    {
        //  End the spritebatch
        spriteBatch.End();
    }
}
```
:::

As you can see, the structure of it is pretty much the same as our Game1 class, with the exception of the two fields and the `BeginDraw(SpriteBatch)` and `EndDraw(SpriteBatch)` methods.

So lets break this down section by section and discuss what each part of this is doing.

### Fields
The Scene class has two fields; `_game` and `_content`.

```csharp
//  A cached reference to our Game instance.
protected Game1 _game;

//  Used to load scene specific content
protected ContentManager _content;
```

We can use the `_game` field to access some of the usual stuff like `Game1.GraphicsDevice`.  This also allows us to set public fields/properties in our Game1 class and make them easily accessible from the Scene.

The `_content` field will be used to load content that is specific to the Scene.  This will be a separate `ContentManager` instance from the one in the Game1 instance.  This has two benefits

1. All content loaded from the Game1 class will act as sort of global content manager, since it's accessible from any scene through `_game.Content`.  This would be assets like fonts and audio that would be used in multiple scenes.
2. By each scene having its own content manager, this means we don't have to load every asset up front at runtime. Instead loading only the global stuff as to point #1 above, and then the scene specific stuff per scene. This means a smaller memory footprint throughout the game life cycle. 

### Constructor
Next we'll take a look at the constructor

```csharp
/// <summary>
///     Creates a new Scene instance.
/// </summary>
/// <param name="game">
///     A reference to our Game1 instance.
/// </param>
/// <exception cref="ArgumentNullException">
///     Thrown if the value supplied for <paramref name="game"/> 
///     is null
/// </exception>
public Scene(Game1 game)
{
    if (game == null)
    {
        throw new ArgumentNullException(nameof(game), "Game cannot be null!");
    }

    _game = game;
}
```

As far as constructors go, this a pretty simple one.  It takes an instance of `Game1` as the only parameter.  An `ArgumentNullException` is thrown if the value given is `null`. From here we just cache the reference into the `_game` field.

### Initialize()
The Initialize method is where all initializations will be performed for our scene.  

```csharp
/// <summary>
///     Initializes the Scene
/// </summary>
/// <remarks>
///     This is called only once, immediately after the scene becomes
///     the active scene, and before the first Update is called on 
///     the scene
/// </remarks>
public virtual void Initialize()
{
    _content = new ContentManager(_game.Services);
    _content.RootDirectory = _game.Content.RootDirectory;
    LoadContent();
}
```

An important thing to note is that this is where the `_content` field is initialized, and immediately the `LoadContent()` method is called.  This is to ensure that all content is loaded before the implementing scene initializes, mimicking the same way that the `Game` class is done in MonoGame.  We do this so any information about assets width, height, etc is available for any objects that need them when we initialize. 

In the order of events, Initialize will be called on the same frame that the scene is set as the active scene, and before the first Update is called on the scene.

### LoadContent()
The `LoadContent()` method is where all the content for the scene will be loaded.  

```csharp
/// <summary>
///     Loads the content specific to the Scene.
/// </summary>
/// <remarks>
///     This is called internally by the Initialize() method.
/// </remarks>
public virtual void LoadContent() { }
```

As we went over in the Initialize section, `LoadContent()` is called from within the `Initialize()` method.

### UnloadContent()
The `UnloadContent()` allows us to unload any content loaded by the scene when the scene ends.

```csharp
/// <summary>
///     Unloads any content that has been loaded by the scene.
/// </summary>
/// <remarks>
///     This will be called after the game switches to a new
///     scene.
/// </remarks>
public virtual void UnloadContent() 
{
    _content.Unload();
    _content = null;
}
```

When we switch from one scene to another, `UnloadContent` will be called to free up any memory before the next scene is loaded.

### Update(GameTime)
The `Update(GameTime)` method is pretty simple. 

```csharp
/// <summary>
///     Updates the Scene.
/// </summary>
/// <param name="gameTime">
///     A snapshot of the frame specific timing values.
/// </param>
public virtual void Update(GameTime gameTime) { }
```

We'll use this to handle all update logic for the scene.

### BeforeDraw(SpritBatch, Color)
Here, in `BeforeDraw(SpritBatch, Color)`, we'll handle preparing the scene for rendering to the screen.

```csharp
/// <summary>
///     Handles preparing the Scene to draw.
/// </summary>
/// <remarks>
///     This is called just before the main Draw method.
/// </remarks>
/// <param name="spriteBatch"></param>
public virtual void BeforeDraw(SpriteBatch spriteBatch, Color clearColor)
{
    //  Clear the backbuffer
    _game.GraphicsDevice.Clear(clearColor);

    //  Begin the spritebatch
    spriteBatch.Begin();
}
```

The method will take two parameters; A `SpriteBatch` instance and a `Color` value.  Next we clear the backbuffer using `_game.GraphicsDevice.Clear(Color)`, giving it the color value provided. Then we call `spriteBatch.Begin()` to get us started with rendering.

### Draw(SpriteBatch)
Immediately after `BeforeDraw(SpriteBatch, Color)` is call, we'll call `Draw(SpriteBatch)`

```csharp
/// <summary>
///     Draws the Scene to the screen.
/// </summary>
/// <remarks>
///     This is called immediately after BeforeDraw.
/// </remarks>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
public virtual void Draw(SpriteBatch spriteBatch) { }
```

This will take in the same `SpriteBatch` instance that was used in `BeforeDraw(SpriteBatch, Color)` so we can use it to render visual assets to the screen.

### AfterDraw(SpritBatch)
Finally, we have `AfterDraw(SpriteBatch)`, which will be called immediately after `Draw(SpriteBatch)` is called.

```csharp
/// <summary>
///     Handles ending any drawing the scene is performing.
/// </summary>
/// <remarks>
///     This is called immediately after Draw.
/// </remarks>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
public virtual void AfterDraw(SpriteBatch spriteBatch)
{
    //  End the spritebatch
    spriteBatch.End();
}
```
This takes the same `SpriteBatch` instance that was used in `BeforeDraw(SpriteBatch, Color)` and `Draw(SpriteBatch)` so that we can call the `SpriteBatch.End()` method so signal that we are done drawing.

On the next page, we're going to update our `Game1` class to make use of the `Scene` class we just created.
