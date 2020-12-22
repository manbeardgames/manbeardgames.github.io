---
id: testing-our-setup
title: "Scenes: Testing Our Setup"
hide_title: true
hide_table_of_contents: false
sidebar_label: Testing Our Setup
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
slug: /tutorials/monogame-3-8/scenes/testing-our-setup
---

# Testing Our Setup
Now that we've created the `Scene` class and integrated it into our `Game1` class, it's time to test the setup.  

### Add The Content
Before we can test the setup, we're going to create a few assets to use in our game.

:::note Perform the Following
Create or Download the following assets and add them to your project using the MGCB Editor.  If downloading them, you can just **right-click > Save As** on each link below.

* [A SpriteFont that we can use to render text. (Consolas, 12pt)](https://raw.githubusercontent.com/manbeardgames/monogame-scene-demo/develop/SceneDemo/Content/font.spritefont)
* [A 64 x 64 orange circle image.](https://raw.githubusercontent.com/manbeardgames/monogame-scene-demo/develop/SceneDemo/Content/orange_circle.png)
* [A 64px x 64px green circle image.](https://raw.githubusercontent.com/manbeardgames/monogame-scene-demo/develop/SceneDemo/Content/green_circle.png)

You can create these content files yourself, or you can click them below to download them.

Once you have the files, use the MGCB Editor (aka Content Pipeline Tool) to add them to the game content.
:::

:::note  
If you are unfamiliar with adding new content such as a SpriteFont, please see the official [MonoGame Documentation](https://docs.monogame.net/articles/getting_started/4_adding_content.html)
:::  

### Load the Global Content
We discussed previously how we can use the `ContentManager` in the `Game1` class to load content that can be used globally in any scene.  The SpriteFont we added as content is an excellent example of this, as well be using it in both of the test scenes we create.

:::note Perform the Following
Open the `Game1` class file. Locate the `LoadContent()` method and change it to the following.

```csharp
protected override void LoadContent()
{
    _spriteBatch = new SpriteBatch(GraphicsDevice);

    //  Load the global spritefont.
    Content.Load<SpriteFont>("font");
}
```
:::

Now, some of you have a sharp eye and you noticed something a little strange here.  We're loading the SpriteFont using the `ContentManager`, but we're not storing it anywhere. We just load it and move on.  

This is because of how a `ContentManager` instance works.  When you call `LoadContent<T>(string)`, it first checks to see if it has already loaded that content before from the disk.  If it **has not**, then it loads from disk and stores a cached version of it.  Then later in the code, if we tell the same `ContentManager` to load the same piece of content, instead of loading it from disk it will just serve the cached version it previously loaded.

:::note Source Code  
Want to see how the `ContentManager` caches the assets for your self?  That's the great thing about MonoGame, all of the source code is available to view.  

The particular bit of code you'd be looking for is https://github.com/MonoGame/MonoGame/blob/develop/MonoGame.Framework/Content/ContentManager.cs#L246
:::

### Create the Green Circle Scene
Next we're going to create the scene that displays the green circle image.  

:::note Perform the Following
Add a new class file to your project called **GreenCircleScene.cs** then add the following code to the file. We'll go over it after the code.

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
    ///     Creates a new GreenCircleScene instance.
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
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    public override void Draw(SpriteBatch spriteBatch)
    {
        spriteBatch.DrawString(_font, "Green Circle Scene", new Vector2(10, 10), Color.White);

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
:::

From the code above, you can see that our `GreenCircleScene` class is inheriting from the `Scene` class

```csharp
public class GreenCircleScene : Scene
```

Next there are two instance fields; `_font` to hold the font content file that we load in and `_greenCircle` to hold the green_circle.png content that we load in.

```csharp
//  The sprite font we use to render text.
private SpriteFont _font;

//  The green circle texture we render
private Texture2D _greenCircle;
```

After that is the constructor.  It just takes in the single `Game1` parameter and passes it to the `base` scene constructor

```csharp
/// <summary>
///     Creates a new GreenCircleScene instance.
/// </summary>
/// <param name="game">
///     A reference to the Game
/// </param>
public GreenCircleScene(Game1 game):base(game) { }
```

Following that is the `LoadContent()` method. This is where some magic happens.  We use `_game.Content.Load<T>(string)` to load the font since we know it is stored in our global content manager.  Remember, we loaded this previously in the `Game1.LoadContent()` method, so when we load it a second time here, it's loading the cached asset and not from the disk.  After loading the font, we load our scene specific asset, the **green_circle** texture using the scene's `ContentManager`.

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
///     The SpriteBatch instance used for rendering.
/// </param>
public override void Draw(SpriteBatch spriteBatch)
{
    spriteBatch.DrawString(_font, "Green Circle Scene", new Vector2(10, 10), Color.White);

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

Because of this, we won't discuss the code directly, as we already did that above.  Instead I'll just add it here for you to copy and paste.  

:::note Perform the Following
Add a new class file to your project called **OrangeCircleScene.cs**, then add the following code to it.

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
    ///     Creates a new OrangeCircleScene instance.
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
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    public override void Draw(SpriteBatch spriteBatch)
    {
        spriteBatch.DrawString(_font, "Orange Circle Scene", new Vector2(10, 10), Color.White);

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
:::

### Loading the Starting Scene
Now that we have added our two test scene classes, we need to tell the `Game1` class which scene to use as the starting scene.  

:::note Perform the Following
Open **Game1.cs** and locate the `Initialize()` method.  Change the `Initialize()` method to the following.

Change the `Initialize()` method to the following

```csharp
protected override void Initialize()
{
    base.Initialize();

    //  Load the GreenCircleScene as our first scene.
    ChangeScene(new GreenCircleScene(this));
}
```
:::

By doing this, we're telling `Game1` to load and switch to the `GreenCircleScene` directly after it finishes its call to `base.Initialize()`.

if you run the game now, you should see the following displayed.

![](/img/tutorials/scenes/green_circle_scene.png)

Fantastic, the game is now loading our initial scene and rendering it.  Next, let's add some code to make it switch between our two scenes.

### Switching Scenes
In order to switch scenes at the press of a button, we're going to need to do some initial input state management in our game.  Since input state is something that is global across the entire game, and not scene specific, it makes more sense for us to do this in our `Game1` class.

:::note Perform the Following
Open the **Game1.cs**  class file and add the following to the class

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
:::

These two properties will be used to track the state of keyboard input between the previous and current frames in our game.  Next, we need to make sure these have the proper values each frame. 

:::note Perform the Following
Scroll down to the `Update(GameTime)` method and add the following to the top of the method. Input states should be the first thing updated. 

```csharp
public override void Update(GameTime gameTime)
{
    PrevKeyboardState = CurKeyboardState;
    CurKeyboardState = Keyboard.GetState();

    // ... other code removed for brevity   
}
```
:::

Now that we are managing input states in `Game1`, we can do some input checking in the `GreenCircleScene.Update(GameTime)` method to see if we should switch scenes.  We're going to need to add an override to the `Update(GameTime)` method since we did not add one previously. In this update method, we need to tell it that if the space key is pressed, the game should switch to a new `OrangeCircleScene`.

:::note Perform the Following
Open the **GreenCircleScene.cs** class file and add the following code.

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
:::

Now run the game.  You should first be presented with the `GreenCircleScene`.  When you press the space key, the game will switch to the `OrangeCircleScene`.  Pretty nifty ya?  Unfortunately, we can't switch back to the `GreenCircleScene` from the `OrangeCircleScene`.  Let's fix this.

:::note Perform the Following
Open the **OrangeCircleScene.cs** class file and add the following code.

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
        _game.ChangeScene(new GreenCircleScene(_game));
    }
}
```
:::

If you run the game now, you'll be presented initially with the `GreenCircleScene`.  Pressing the space key will switch scenes to the `OrangeCircleScene` as before, only this time if you press the space key again, it will switch back to the `GreenCircleScene`.
