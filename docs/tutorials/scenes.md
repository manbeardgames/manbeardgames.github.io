---
id: tutorials-scenes
sidebar_label: Scenes
title: Scenes
hide_table_of_contents: false
custom_edit_url: null
slug: /tutorials/scenes
---

In this tutorial, we'll go over the concept of a game *scene*, what it means for our game, and how we can implement the idea in code.

## What Is A Scene
Most people reading this are probably familar with the videogame Super Mario Bros.  When you first start that game, the first thing the player is shown is the *Title* screen. From here, you can choose *1 Player Game* to start the game, which then presents the player with an informative screen showing *World #-#* and the number of lives remaining. After a second, your finally presented with the first level of the game.



![](/img/tutorials/scenes/three-screens.png)


Each of of these screens that the player see has a cleared and defined purpose for the visuals that it presents and the controls it gives the player.  These *screens* are what we are going to call **scenes**.

###  Defining a Scene
In MonoGame, the default `Game1` class that we are given when creating a new project can be thought of as a scene.  And this works great when we are prototyping or making something on a super small scale, but eventually we'll need a way to logically seperate our game out

Since `Game1` is like a scene, we can use it as a foundation for defining the structure of our `Scene` class.  A few concept we'll borrow from it will be

* A `Initialize()` method that can initialize our scene.
* A `LoadContent()` method where we can load all of scene specific content.
* A `UnloadContent()` method where we can unload and dispose of any content no longer needed when the scene is no longer in use.
* A `Update()` method so we can update the scene each frame.
* A `Draw()` method so we can draw the scene.

Along with these concepts, we can add the following methods to help out as well

* A `BeforeDraw()` method where we can make the neccessary preperations for the scene to draw
* A `EndDraw()` method where we can perform the neccessary things to gracefully end drawing in our scene.

We'll also need a reference to our `Game1` class so we can easily access things like the `GraphicsDeviceManager`.  Lastly, each scene will need its own `ContentManager` instance to load and manage scene specific content.  More on this idea later in the LoadContent section.

With all of that said, lets get to the actual code.

## The Scene Class
Before we dive into discussing what each section of the Scene class is for, I'm going to post the full class here. 

### The Code
**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
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
    ///     This is called only once, immediatly after the scene becomes
    ///     the active scene, and before the first Update is called on 
    ///     the scene
    /// </remarks>
    public virtual void Initialize()
    {
        _content = new ContentManager(_game.Services);
        LoadContent();
    }

    /// <summary>
    ///     Loads the content specific to the Scene.
    /// </summary>
    /// <remarks>
    ///     This is called internally by the Initilize() method.
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
    ///     This is called immediatly after BeforeDraw.
    /// </remarks>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    public virtual void Draw(SpriteBatch spriteBatch) { }

    /// <summary>
    ///     Handles ending any drawing the scene is performing.
    /// </summary>
    /// <remarks>
    ///     This is called immediatly after Draw.
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


As you can see, the strcture of it is pretty much the same as our Game1 class, with the exception of the two fields and the `BeginDraw(SpriteBatch)` and `EndDraw(SpriteBatch)` methods.

So lets break this down section by section and discuss what each part of this is doing.

### Fields
The Scene class has two fields; `_game` and `_content`.

```csharp
//  A cached reference to our Game instance.
protected Game1 _game;

//  Used to load scene specific content
protected ContentManager _content;
```

We can use the `_game` field to access some of the usual stuff like `Game1.GraphicsDevice`.  This also allows us to set public fields/properties in our Game1 class and make them easily accessible from the Scnee.

The `_content` field will be used to load content that is specific to the Scene.  This will be a sepreate `ContentManager` instance from the one in the Game1 instalce.  This has two benifits

1. All content loaded from the Game1 class will act as sortof global content manager, since it's accessible from any scene through `_game.Content`.  This would be assets like fonts and audio that would be used in multiple scenes.
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

As far as constructors go, this a pretty simple one.  It takes an instance of Game1 as the only parameter.  An `ArgumentNullExcpetion` is thrown if the value given is `null`. From here we just cache the reference into the `_game` field.

### Initialize()
The Initialize method is where all initializations will be performed for our scene.  

```csharp
/// <summary>
///     Initializes the Scene
/// </summary>
/// <remarks>
///     This is called only once, immediatly after the scene becomes
///     the active scene, and before the first Update is called on 
///     the scene
/// </remarks>
public virtual void Initialize()
{
    _content = new ContentManager(_game.Services);
    LoadContent();
}
```

An important thing to note is that this is where the `_content` field is initialized, and immediately the `LoadContent()` method is called.  This is to ensure that all content is loaded before the implementing scene initailzies, mimicking the same way that the `Game` class is done in MonoGame.  We do this so any information about assets width, height, etc is available for any objects that need them when we initialize. 

In the order of events, Initialize will be called on the same frame that the scene is set as the active scene, and before the first Update is called on the scene.

### LoadContent()
The `LoadContent()` method is where all the content for the scene will be loaded.  

```csharp
/// <summary>
///     Loads the content specific to the Scene.
/// </summary>
/// <remarks>
///     This is called internally by the Initilize() method.
/// </remarks>
public virtual void LoadContent() { }
```

As we went over in the Initialize section, `LoadContent()` is called from within the `Initialize()` method.

### UnloadContent()
The `UnloadContent()` allows us to dispose of any content loaded when the scene ends to ensure we clear any from memory that no longer needs to be there.

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
Immediatly after `BeforeDraw(SpriteBatch, Color)` is call, we'll call `Draw(SpriteBatch)`

```csharp
/// <summary>
///     Draws the Scene to the screen.
/// </summary>
/// <remarks>
///     This is called immediatly after BeforeDraw.
/// </remarks>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
public virtual void Draw(SpriteBatch spriteBatch) { }
```

This will take in the same `SpriteBatch` instance that we can use to rendering visual assets to the screen.

### AfterDraw(SpritBatch)
Finally, we have `AfterDraw(SpriteBatch)`, which will be called immediatly after `Draw(SpriteBatch)` is called.

```csharp
/// <summary>
///     Handles ending any drawing the scene is performing.
/// </summary>
/// <remarks>
///     This is called immediatly after Draw.
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

Here we just end the spritebatch.

## Updating Game1
Now that we have the `Scene` class completed, we need to up `Game1` so it can properly handle scenes.  The following is a list of things that will need to be handled

* Keeping track of what scene is currently the active scene and which scene, if any, is the next scene.
* Updating the active scene.
* Drawing the active scene.
* Ability to change from one scene to another.

In the next sections, we'll go over implmenting each of the points into our `Game1` class. So open up **Game1.cs** and let's dive in.

### Tracking Active and Next Scene
We can make use of two instnace field to keep track of which scene is the **active** scene and, when we need to change scenes, which is the **next** scene to switch to.

Add the following fields to `Game1`

```csharp
//  The current scene that is active.
private Scene _activeScene;

//  The next scene to switch to.
private Scene _nextScene;
```

### Updating the Active Scene
Next, we need to ensure that we are updating the active scene.  Find the `Update(GameTime)` method in Game1 and change it to the following

```csharp
protected override void Update(GameTime gameTime)
{
    //  If there is an active scene, update it.
    if(_activeScene != null)
    {
        _activeScene.Update(gameTime);
    }

    base.Update(gameTime);
}
```

And that's it for updating the active scene. Let's draw it next

### Drawing the Active Scene
To draw the active scene, find the `Draw(SpriteBatch, GameTime)` method in the Game1 class and change it to the following

```csharp
protected override void Draw(GameTime gameTime)
{
    //  If there is an active scene, draw it.
    if(_activeScene != null)
    {
        _activeScene.BeforeDraw(_spriteBatch, Color.Black);
        _activeScene.Draw(_spriteBatch);
        _activeScene.AfterDraw(_spriteBatch);
    }

    base.Draw(gameTime);
}
```

This will handle calling `BeforeDraw(SpriteBatch, Color)`, `Draw(SpriteBatch)`, and `AfterDraw(SpriteBatch)`, in that order, for the active scene.

:::note  
The default Game1 class clears the backbuffer using good old `Color.CornflowerBlue` by default. Here, I'm passing instead `Color.Black` as the color to clear the backbuffer with.  You can use whatever color you'd like.
:::  

### Changing Scenes
To change scenes, we're going to first create a method to handle setting what the next scene should be. 

Add the following method to the Game1 class

```csharp
/// <summary>
///     Sets the next scene to switch to.
/// </summary>
/// <param name="next">
///     The Scene instance to switch to.
/// </param>
public void ChangeScene(Scene next)
{
    //  Only set the _nextScene value if it is not the
    //  same instnace as the _activeScene.
    if(_activeScene != next)
    {
        _nextScene = next;
    }
}
```

As far as things go, this is pretty simple.  It detects if the scene we are switching to is the same instance as the current active scene. Only if they are different instances will if set the value of `_nextScene`

Next we need to add an additinal method to handle the actual transitioning from one scene to the next. Add the following method to the Game1 class.

```csharp
/// <summary>
///     Handles transitioning gracefully from one scene to
///     the next.
/// </summary>
private void TransitionScene()
{
    if(_activeScene != null)
    {
        _activeScene.UnloadContent();
    }

    //  Perform a garbage collection to ensure memory is cleared
    GC.Collect();

    //  Set the active scene.
    _activeScene = _nextScene;

    //  Null the next scene value
    _nextScene = null;

    //  If the active scene isn't null, initilize it.
    //  Remember, the Iniitlize method also calls the LoadContent method
    if(_activeScene != null)
    {
        _activeScene.Initialize();
    }
}
```

A few things are happening here. First, if `_activeScene` isn't `null`, we tell it to unload all content managed by that scene by calling the `Unload()` method. We no longer need it, so free up the memory.  Next, we perform a manual garbage collection to ensure the memory is freed up.  Then we set the `_activeScene` to the `_nextScene`, and, if it isnt' `null`, we call the `Initialize` method.

Finally, we need to do one last change in the Game1 `Update(GameTime)` method.  Change it to the following.

```csharp
protected override void Update(GameTime gameTime)
{
    //  If there is a next scene waiting to be switched to
    //  transition to that scene.
    if (_nextScene != null)
    {
        TransitionScene();
    }

    //  If there is an active scene, update it.
    if (_activeScene != null)
    {
        _activeScene.Update(gameTime);
    }

    base.Update(gameTime);
}
```

With this chnage, we detect first if there is a next scene to switch to, and if so, we perform the scene transitions. Now you may be asking, "why do we need to transition scene here?". Why didn't we just perform the transition inside the `ChangeScene(Scene)` method all at once. 

Well, we could have, absolutly. However, remember when we end one scene, we unload all of the content managed by the scene. Also, most likely, the call to `ChangeScene(Scene)` will be performed from within a scene itself.  So by telling our game which scene to switch to, and then performing the actual transition during the next update frame, we can be sure no issues occur with any references to the current scene's properties, objects, etc.

(actually, I'm probably talking out of my ass with that last paragraph, but this is generally the structure used.)

## Testing Our Setup
Now that we've created the `Scene` class and integrated it into our `Game1` class, it's time to test the setup.  

### Add The Content
First, we're going to add the content to our project that we'll use in each scene.  The content we're adding is

* [A SpriteFont that we can use to render text.](/assets/tutorials/scenes/font.spritefont)
* [A 64 x 64 orance circle image.](/assets/tutorials/scenes/orange_circle.png)
* [A 64px x 64px green circle image.](/assets/tutorials/scenes/green_circle.png)

You can create these content files yourself, or you can click them below to download them.

Once you have the files, use the MGCB Editor (aka Content Pipeline Tool) to add the files to the games content.

:::note  
If you are unfamilar with adding new content such as a SpriteFont, please see the offical [MonoGame Documentation](https://docs.monogame.net/articles/getting_started/4_adding_content.html)
:::  

### Load the Global Content
We discusssed previously how we can use the `ContentManager` in the Game1 class to load content that can be used globally in any scene.  The SpriteFont we added as content is an excellent example of this, as well be using it in both of the test scenes we create.

So open Game1.cs and add the following to the `LoadContent()` method

```csharp
protected override void LoadContent()
{
    _spriteBatch = new SpriteBatch(GraphicsDevice);

    //  Load the global spritefont.
    Content.Load<SpriteFont>("font");
}
```

Now, some of you have a sharp eye and you noticed something a little strange here.  We're loading the SpriteFont using the `ContentManager`, but we're not storing it anywhere. We just load it and move on.  

This is because of how a `ContentManager` instance works.  When you call `LoadContent<T>(string)`, it first checks to see if it has already loaded that content before from the disk.  If it **has not**, then it loads from disk and stores a cached version of it.  Then later in the code, if we tell the same `ContentManager` to load the same piece of content, instead of loading it from disk it will just serve the cached version it previously loaded.

:::note Source Code  
Want to see how the `ContentManager` caches the asets for your self?  That's the great thing about MonoGame, all of the source code is availalbe to view.  

The particular bit of code you'd be looking for is https://github.com/MonoGame/MonoGame/blob/develop/MonoGame.Framework/Content/ContentManager.cs#L246
:::

### Create the Green Circle Scene
Next we're going to create the scene that displays the green circle image.  

Add a new class file to your project called **GreenCircleScene.cs** then add the following code to the file. We'll go over in after the code.

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
```
**GreenCircleScene class**
```csharp
public class GreenCircleScene : Scene
{
    //  The sprite font we use to render text.
    private SpriteFont _font;

    //  The green circle texture we render
    private Texture2D _greenCircle;

    /// <summary>
    ///     Creates a new GreenCircleScene instnace.
    /// </summary>
    /// <param name="game">
    ///     A reference to the Game
    /// </param>
    public GreenCircleScene(Game1 game):base(game) { }

    /// <summary>
    ///     Loads the content for this scene.
    /// </summary>
    public override void LoadContent()
    {
        base.LoadContent();

        //  We load the font using the content manager from the Game1 reference.
        _font = _game.Content.Load<SpriteFont>("font");

        //  We load the green circle using the scene specific content manager.
        _greenCircle = _content.Load<Texture2D>("green_circle");
    }

    /// <summary>
    ///     Draws this scene.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instnace used for rendering.
    /// </param>
    public override void Draw(SpriteBatch spriteBatch)
    {
        spriteBatch.DrawString(_font, "Green Cirlce Scene", new Vector2(10, 10), Color.White);

        int centerX = _game.GraphicsDevice.PresentationParameters.BackBufferWidth / 2;
        int centerY = _game.GraphicsDevice.PresentationParameters.BackBufferHeight / 2;

        spriteBatch.Draw(texture: _greenCircle, 
                        position: new Vector2(centerX, centerY), 
                        sourceRectangle: null, 
                        color: Color.White, 
                        rotation: 0.0f, 
                        origin: new Vector2(_greenCircle.Width, _greenCircle.Height) * 0.5f, 
                        scale: Vector2.One,
                        effects: SpriteEffects.None, 
                        layerDepth: 0.0f);
    }
}
```

From the code above, you can see that our `GreenCirlceScrene` class is inheriting from the `Scene` class

```csharp
public class GreenCircleScene : Scene
```

Next there are two instance fields; `_font` to hold the font content file that we load in and `_greenCirlce` to hold the green_circle.png contnet that we load in.

```csharp
//  The sprite font we use to render text.
private SpriteFont _font;

//  The green circle texture we render
private Texture2D _greenCircle;
```

After that is the constructor.  It just takes in the single `Game1` parameter and passes it to the base scene constructor

```csharp
/// <summary>
///     Creates a new GreenCircleScene instnace.
/// </summary>
/// <param name="game">
///     A reference to the Game
/// </param>
public GreenCircleScene(Game1 game):base(game) { }
```

Following that is the `LoadContent()` method. This is where some magic happens.  We use `_game.Content.Load<T>(string)` to load the font since we know it is stored in our global content manager.  Remember, we loaded this previously in the Game1 LoadContent method, so when we load it a second time here, it's loading the cached asset and not from the disk.  After loading the font, we load our scene specific asset, the **green_circle** textue using the scene's `ContentManager`.

```csharp
/// <summary>
///     Loads the content for this scene.
/// </summary>
public override void LoadContent()
{
    base.LoadContent();

    //  We load the font using the content manager from the Game1 reference.
    _font = _game.Content.Load<SpriteFont>("font");

    //  We load the green circle using the scene specific content manager.
    _greenCircle = _content.Load<Texture2D>("green_circle");
}
```

And finally, we have the `Draw(SpritBatch)` method that we use to draw the scene to the screen.  In short, this is drawing the text "Green Circle Scene" in the top left corner of the screen, then it is drawing the green circle in the center of the screen.

```csharp
/// <summary>
///     Draws this scene.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instnace used for rendering.
/// </param>
public override void Draw(SpriteBatch spriteBatch)
{
    spriteBatch.DrawString(_font, "Green Cirlce Scene", new Vector2(10, 10), Color.White);

    int centerX = _game.GraphicsDevice.PresentationParameters.BackBufferWidth / 2;
    int centerY = _game.GraphicsDevice.PresentationParameters.BackBufferHeight / 2;

    spriteBatch.Draw(texture: _greenCircle, 
                    position: new Vector2(centerX, centerY), 
                    sourceRectangle: null, 
                    color: Color.White, 
                    rotation: 0.0f, 
                    origin: new Vector2(_greenCircle.Width, _greenCircle.Height) * 0.5f, 
                    scale: Vector2.One,
                    effects: SpriteEffects.None, 
                    layerDepth: 0.0f);
}
```

That's it for the Green Circle Scene. Next let's create the Orange Circle Scene

### Create the Orange Circle Scene
The orange circle scene is pretty much identical to the Green Circle Screen, only it loads the **orange_circle.png** content and displays the text "Orange Circle Scene" when rendered.  

Because of this, we won't discuss the code directly, as we already did that above.  Instead I'll just add it here for you to copy and paste.  Add a new class file to your project called **OrangeCircleScene.cs**, then add the following code to it

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
```

**OrangeCircleScene class**
```csharp
public class OrangeCircleScene : Scene
{
    //  The sprite font we use to render text.
    private SpriteFont _font;

    //  The orange circle texture we render
    private Texture2D _orangeCircle;

    /// <summary>
    ///     Creates a new OrangeCircleScene instnace.
    /// </summary>
    /// <param name="game">
    ///     A reference to the Game
    /// </param>
    public OrangeCircleScene(Game1 game) : base(game) { }

    /// <summary>
    ///     Loads the content for this scene.
    /// </summary>
    public override void LoadContent()
    {
        base.LoadContent();

        //  We load the font using the content manager from the Game1 reference.
        _font = _game.Content.Load<SpriteFont>("font");

        //  We load the orange circle using the scene specific content manager.
        _orangeCircle = _content.Load<Texture2D>("orange_circle");
    }

    /// <summary>
    ///     Draws this scene.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instnace used for rendering.
    /// </param>
    public override void Draw(SpriteBatch spriteBatch)
    {
        spriteBatch.DrawString(_font, "Orange Cirlce Scene", new Vector2(10, 10), Color.White);

        int centerX = _game.GraphicsDevice.PresentationParameters.BackBufferWidth / 2;
        int centerY = _game.GraphicsDevice.PresentationParameters.BackBufferHeight / 2;

        spriteBatch.Draw(texture: _orangeCircle,
                        position: new Vector2(centerX, centerY),
                        sourceRectangle: null,
                        color: Color.White,
                        rotation: 0.0f,
                        origin: new Vector2(_orangeCircle.Width, _orangeCircle.Height) * 0.5f,
                        scale: Vector2.One,
                        effects: SpriteEffects.None,
                        layerDepth: 0.0f);
    }
}
```

### Loading the Starting Scene
Now that we have added our two test scene classes, we need to tell the Game1 class which scene to use as the starting scene.  To do this, open **Game1.cs** and locate the `Initialize()` method.  We're going to tell it to load the `GreenCircleScene` directly after it finishes it's called to `base.Initialize()`.  

Change the `Initialize()` method to the following

```csharp
protected override void Initialize()
{
    base.Initialize();

    //  Load the GreenCircleScene as our first scene.
    ChangeScene(new GreenCircleScene(this));
}
```

if you run the game now, you should see the following displayed.

![](/img/tutorials/scenes/green_circle_scene.png)

Fantastic, the game is now loading our initiale scene and rendering it.  Next, let's add some code to make it switch between our two scenes.

### Switching Scenes
In order to switch scenes at the press of a button, we're going to need to do some initial input state setup in our game.  Since input state is something that is global across the entire game, and not scene specific, it makes more sense for us to do this in our `Game1` class.

So first, open **Game1.cs** and add the following to the class

**using statement**
```csharp
using Microsoft.Xna.Framework.Input;
```

**Properties**
```csharp
/// <summary>
///     Gets the state of keyboard input during the previous frame.
/// </summary>
public KeyboardState PrevKeyboardState { get; private set; }

/// <summary>
///     Gets the state of keyboard input during the current frame.
/// </summary>
public KeyboardState CurKeyboardState { get; private set; }
```

These two properties will be used to track the state of keyboard input between the previous and current frames in our game.  Now we need to make sure these have the proper values each frame. So scroll down to the `Update(GameTime)` method and add the following to the top of the method. Input states should be the first thing updated.

```csharp
public override void Update(GameTime gameTime)
{
    PrevKeyboardState = CurKeyboardState;
    CurKeyboardState = Keyboard.GetState();

    // ... other code removed for brevity   
}
```

Now that we are managing input states in `Game1`, we can do some input checking in the `GreenCircleScene.Update(GameTime)` method to see if we should switch scenes.  To do this, first open **GreenCircleScene.cs**. 

Now we need to add an update method to the scene.  We did not add one previously because we didn't need it at the time.  In this update method, we need to tell it that if the space key is pressed, the game should switch to a new OrangeCircleScene.

To do this, add the following code to the GreenCircleSceen class.

**using statement**
```csharp
using Microsoft.Xna.Framework.Input;
```

**Update(GameTime) Method**
```csharp
/// <summary>
///     Updates this scene.
/// </summary>
/// <param name="gameTime">
///     A snapshot of the frame specific timing values.
/// </param>
public override void Update(GameTime gameTime)
{
    if(_game.CurKeyboardState.IsKeyDown(Keys.Space) && _game.PrevKeyboardState.IsKeyUp(Keys.Space))
    {
        //  Tell the game to change to the OrangeCircleScene
        _game.ChangeScene(new OrangeCircleScene(_game));
    }
}
```

Now run the game.  You should first be presented with the GreenCircleScene.  When you press the space key, the game will switch to the OrangeCircleScene.  Pretty nifty ya?

Now we need to tell the OrangeCircleScene to do the same thing, only to switch to the GreenCircleScene.  Use the code above to update the **OrangeCircleScene.cs** class file in the same way that we did for the GreenCircleScene.  The only different is in the `Udpate(GameTime)` method, when we change scenes, make sure it's changing to the GreenCircleScene instead.

```csharp
//  Tell the game to change to the GreenCircleScene
_game.ChangeScene(new GreenCircleScene(_game));
```

## Conclusion
In this tutorial, we discussed what the idea of a game **Scene** is and, defined a foundation for one, then created the code for it.  We then created two test scenes that we could use to demonstrate the idea.  

We also discussed an important topic of content management between scenes and how we can use sepearte `ContentManager` instances to store global assets and scene specific assets.

In the next tutorial, we'll take the scene setup we just created a little further and show how to create cool transition effects when switching from one scene to the next.







