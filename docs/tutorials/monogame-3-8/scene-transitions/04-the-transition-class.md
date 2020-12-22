---
id: transition-class
title: 'Scene Transitions: The Transition Class'
hide_title: true
hide_table_of_contents: false
sidebar_label: The Transition Class
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'scene transition'
    - 'scene'
    - 'scenes'
description: 'A tutorial on creating scene transition effects in a MonoGame project.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/scene-transitions/transition-class
---
# The Transition Class
Now that we have updated our `Scene` class, the next thing we need to do is create the `Transition` class.  A transition, like a scene, is an abstract concept that is implemented by the different types of transitions, such as fade, swipes, etc.  So before we get to the code of the `Transition` class, let's first define what we'll need.

* A way of specifying if the transition is **in** or **out** (i.e. fade in vs fade out).
* A render target to draw the transition too.
* Handling graphics create/reset for the render target.
* Disposal of the render target
* A reference to render target of the scene we are transitioning.
* Way of tracking how long the transition should take and the amount of time the amount of time that has elapsed.
* A way of telling the transition when to start.
* A way of knowing exactly when the transition has ended so we can handle anything in code

Now that we have defined what we'll need, let's take a look at the code.

### The Code
:::note Perform the Following
In your project, create a new class file called **Transition.cs** and add the code below to the file.  In the sections of this page after the code, we'll go over each of the aspects of the class file and what it is all doing.

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**Transition class**
```csharp
/// <summary>
///     Base class for all transition instances.
/// </summary>
public abstract class Transition : IDisposable
{
    public enum TransitionKind
    {
        In,
        Out
    }

    protected bool _disposed;   //  Indicates if this instance has been disposed of.
    protected Game1 _game;   //  Cached reference to our game instance.

    /// <summary>
    ///     Gets a value indicating if this transition is currently transitioning.
    /// </summary>
    public bool IsTransitioning { get; private set; }

    /// <summary>
    ///     Gets a value indicating the type of transition this is
    /// </summary>
    public TransitionKind Kind { get; private set; }

    /// <summary>
    ///     Gets the total amount of time required for this transition to complete.
    /// </summary>
    public TimeSpan TransitionTime { get; private set; }

    /// <summary>
    ///     Gets the total amount of time remaining for the transition to complete.
    /// </summary>
    public TimeSpan TransitionTimeRemaining { get; private set; }

    /// <summary>
    ///     Gets a cached reference to the RenderTarget2D instance used by the Scene
    ///     this transition is transitioning.
    /// </summary>
    public RenderTarget2D SourceTexture { get; private set; }

    /// <summary>
    ///     Gets the RenderTarget2D instance this transition renders to.
    /// </summary>
    public RenderTarget2D RenderTarget { get; private set; }

    /// <summary>
    ///     Event triggered when the transition has fully completed.
    /// </summary>
    public event EventHandler TransitionCompleted;

    /// <summary>
    ///     Creates a new Transition instance.
    /// </summary>
    /// <param name="game">
    ///     A reference to our Game instance.
    /// </param>
    /// <param name="transitionTime">
    ///     The total amount of time the transition will take.
    /// </param>
    /// <param name="kind">
    ///     The type of transition.
    /// </param>
    public Transition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
    {
        _game = game;
        TransitionTimeRemaining = TransitionTime = transitionTime;
        Kind = kind;
        CreateRenderTarget();
    }

    /// <summary>
    ///     Starts the transition.
    /// </summary>
    /// <param name="sourceTexture">
    ///     A reference to the RenderTarget2D instance of the scene being transitioned.
    /// </param>
    public virtual void Start(RenderTarget2D sourceTexture)
    {
        SourceTexture = sourceTexture;
        IsTransitioning = true;
    }

    /// <summary>
    ///     Updates this Transition.
    /// </summary>
    /// <param name="gameTime">
    ///     A snapshot of the timing values provided by the MonoGame Framework.
    /// </param>
    public virtual void Update(GameTime gameTime)
    {
        TransitionTimeRemaining -= gameTime.ElapsedGameTime;

        if (TransitionTimeRemaining <= TimeSpan.Zero)
        {
            IsTransitioning = false;

            if (TransitionCompleted != null)
            {
                TransitionCompleted(this, EventArgs.Empty);
            }
        }
    }

    /// <summary>
    ///     Draws the Transition to its render target.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    /// <param name="clearColor">
    ///     The color value to use when clearing the backbuffer.
    /// </param>
    public void Draw(SpriteBatch spriteBatch, Color clearColor)
    {
        BeginRender(spriteBatch, clearColor);
        Render(spriteBatch);
        EndRender(spriteBatch);
    }

    /// <summary>
    ///     Prepares this transition for rendering.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    /// <param name="clearColor">
    ///     The color value to use when clearing the backbuffer.
    /// </param>
    private void BeginRender(SpriteBatch spriteBatch, Color clearColor)
    {
        //  Prepare the graphics device.
        _game.GraphicsDevice.SetRenderTarget(RenderTarget);
        _game.GraphicsDevice.Viewport = new Viewport(RenderTarget.Bounds);
        _game.GraphicsDevice.Clear(clearColor);

        //  Begin the sprite batch.
        spriteBatch.Begin(blendState: BlendState.AlphaBlend,
                            samplerState: SamplerState.PointClamp);
    }

    /// <summary>
    ///     Renders this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    protected virtual void Render(SpriteBatch spriteBatch) { }

    /// <summary>
    ///     Ends the rendering for this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    private void EndRender(SpriteBatch spriteBatch)
    {
        //  End the sprite batch.
        spriteBatch.End();

        _game.GraphicsDevice.SetRenderTarget(null);
    }

    /// <summary>
    ///     When the graphics device is created, no contents are in VRAM, so we need
    ///     to ensure that the RenderTarget is created.
    /// </summary>
    public void HandleGraphicsCreated()
    {
        CreateRenderTarget();
    }

    /// <summary>
    ///     When the graphics device is reset, all contents of VRAM are discarded. When
    ///     this happens, we need to create things like RenderTarget instances.
    /// </summary>
    public void HandleGraphicsReset()
    {
        CreateRenderTarget();
    }

    /// <summary>
    ///     Creates a new RenderTarget instance for this Transition.
    /// </summary>
    private void CreateRenderTarget()
    {
        int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;
        int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;

        //  If the RenderTarget instance has already been created previously but has yet
        //  to be disposed of properly, dispose of the instance before setting a new one.
        if (RenderTarget != null && !RenderTarget.IsDisposed)
        {
            RenderTarget.Dispose();
        }

        RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);
    }

    /// <summary>
    ///     Handles the disposing of resources used by this instance.
    /// </summary>
    /// <remarks>
    ///     For more information on using Dispose and the IDisposable interface
    ///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
    /// </remarks>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    /// <summary>
    ///     Handles the disposing of resources used by this instance.
    /// </summary>
    /// <param name="isDisposing">
    ///     A value indicating if resources should be disposed.
    /// </param>
    /// <remarks>
    ///     For more information on using Dispose and the IDisposable interface
    ///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
    /// </remarks>
    protected virtual void Dispose(bool isDisposing)
    {
        if (_disposed)
        {
            return;
        }

        if (isDisposing)
        {
            if (RenderTarget != null)
            {
                RenderTarget.Dispose();
                RenderTarget = null;
            }
        }

        _disposed = true;
    }
}
```
:::

### IDisposable
The first thing to pay attention to in the code is that we are using the `IDisposable` interface.  

```csharp
public abstract class Transition : IDisposable
```

This means we have a Dispose method that we can call manually, or can be called by the garbage collector automatically when there is no reference to a `Transition` object instance. By having this, we can ensure that resources are cleaned up, like the render target.

The implementation here for the `IDisposable` interface is pretty simple.  First we have the following field

```csharp
protected bool _disposed;
```

This field indicates if the transition instance has already been disposed of.

Next we have the `Dispose()` and `Dispose(bool)` methods.

```csharp
/// <summary>
///     Handles the disposing of resources used by this instance.
/// </summary>
/// <remarks>
///     For more information on using Dispose and the IDisposable interface
///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
/// </remarks>
public void Dispose()
{
    Dispose(true);
    GC.SuppressFinalize(this);
}

/// <summary>
///     Handles the disposing of resources used by this instance.
/// </summary>
/// <param name="isDisposing">
///     A value indicating if resources should be disposed.
/// </param>
/// <remarks>
///     For more information on using Dispose and the IDisposable interface
///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose
/// </remarks>
protected virtual void Dispose(bool isDisposing)
{
    if (_disposed)
    {
        return;
    }

    if (isDisposing)
    {
        if (RenderTarget != null)
        {
            RenderTarget.Dispose();
            RenderTarget = null;
        }
    }

    _disposed = true;
}
```

The first `Dispose()` method is the public one. This is the one that we can call when we need to dispose of the instance, or is called by the garbage collector.  The second `Dispose(bool)` is where the disposal occurs.  Here, we check if we have already disposed, and if so we just return back.  If not, we then check the value of `_isDisposing`, and if `true`, we dispose of the render target gracefully.

### TransitionKind Enum
Next, we said before that we needed a way of indicating if we were transitioning **in** or **out**. This is what the `TransitionKind` enum is for.

```csharp
/// <summary>
///     Defines a value that indicates the kind of transition.
/// </summary>
public enum TransitionKind
{
    /// <summary>
    ///     Indicates a transition in.
    /// </summary>
    In,

    /// <summary>
    ///     Indicates a transition out.
    /// </summary>
    Out
}
```

As far as things go, this is pretty simple.  It defines a value for us that indicates if a transition is transitioning *in* or *out*.

### Fields
Our `Transition` class only has two fields.

```csharp
protected bool _disposed;
protected Game1 _game; 
```

We talked previously about the `_disposed` field in the IDisposable section.  The `_game` field is to store a cached reference to the `Game1` instance, just like we did in the Scene class.

### Properties
The following are the properties of our `Transition` class.

```csharp
/// <summary>
///     Gets a value indicating if this transition is currently transitioning.
/// </summary>
public bool IsTransitioning { get; private set; }

/// <summary>
///     Gets a value indicating the type of transition this is
/// </summary>
public TransitionKind Kind { get; private set; }

/// <summary>
///     Gets the total amount of time required for this transition to complete.
/// </summary>
public TimeSpan TransitionTime { get; private set; }

/// <summary>
///     Gets the total amount of time remaining for the transition to complete.
/// </summary>
public TimeSpan TransitionTimeRemaining { get; private set; }

/// <summary>
///     Gets a cached reference to the RenderTarget2D instance used by the Scene
///     this transition is transitioning.
/// </summary>
public RenderTarget2D SourceTexture { get; private set; }

/// <summary>
///     Gets the RenderTarget2D instance this transition renders to.
/// </summary>
public RenderTarget2D RenderTarget { get; private set; }
```

These should all be pretty self explanatory.  

`IsTransitioning` is a value we can set to indicate if the transition has started and is currently in the middle of transitioning.  

`Kind` indicates what `TransitionKind` this transition is doing.

`TransitionTime` is a TimeSpan that indicates the total amount of time the transition should take before it is completed.

`TransitionTimeRemaining` is a TimeSpan we use as a countdown to indicate how much time left for the transition to complete.

`SourceTexture` is a reference to the render target of the scene that this transition is transitioning.  We'll manipulate this render target when we draw the transition to create the transition effect.

`RenderTarget` is the render target that we draw the transition too.

### Events
There is only one event in the `Transition` class.

```csharp
/// <summary>
///     Event triggered when the transition has fully completed.
/// </summary>
public event EventHandler TransitionCompleted;
```

We will invoke this event when a transition has completed. Anything subscribed to this event can safely assume that the transition is done and it can move on.

### Constructor
Next, let's take a look at the constructor

```csharp
/// <summary>
///     Creates a new Transition instance.
/// </summary>
/// <param name="game">
///     A reference to our Game instance.
/// </param>
/// <param name="transitionTime">
///     The total amount of time the transition will take.
/// </param>
/// <param name="kind">
///     The type of transition.
/// </param>
public Transition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
{
    _game = game;
    TransitionTimeRemaining = TransitionTime = transitionTime;
    Kind = kind;
    CreateRenderTarget();
}
```

When creating a new `Transition` instance, this is the constructor that is called.  It requires a reference to `Game1`, a `TimeSpan` indicating how long the transition will take, and a `TransitionKind` value to indicate if this transition is going *in* or *out.

After caching these values, we create the RenderTarget for the transition.

### Start(RenderTarget)
The `Start(RenderTarget)` method is used to start the transition.

```csharp
/// <summary>
///     Starts the transition.
/// </summary>
/// <param name="sourceTexture">
///     A reference to the RenderTarget2D instance of the scene being transitioned.
/// </param>
public virtual void Start(RenderTarget2D sourceTexture)
{
    SourceTexture = sourceTexture;
    IsTransitioning = true;
}
```

When `Start` is called, we have to pass to it the render target instance of the scene that is being transitioned.  We simply just cache the reference to the render target, then set the `IsTransitioning` property to `true` to indicate the the transition has started.

### Update(GameTime)
Next is the `Update(GameTime)` method.

```csharp
/// <summary>
///     Updates this Transition.
/// </summary>
/// <param name="gameTime">
///     A snapshot of the timing values provided by the MonoGame Framework.
/// </param>
public virtual void Update(GameTime gameTime)
{
    TransitionTimeRemaining -= gameTime.ElapsedGameTime;

    if (TransitionTimeRemaining <= TimeSpan.Zero)
    {
        IsTransitioning = false;

        if (TransitionCompleted != null)
        {
            TransitionCompleted(this, EventArgs.Empty);
        }
    }
}
```

This is a pretty simple update method all things considered.  We subtract the amount of time that has elapsed from the `TransitionTimeRemaining`.  We then check if the `TransitionTimeRemaining` has reached or gone below zero.  If it has, we set `IsTransitioning` to false and trigger the `TransitionCompeted` event.

### BeforeRender(SpriteBatch, Color)
The `BeforeRender(SpriteBatch, Color)` method will handle setting up the graphics device and the spritebatch to for rendering our transition.


```csharp
/// <summary>
///     Prepares this transition for rendering.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
/// <param name="clearColor">
///     The color value to use when clearing the backbuffer.
/// </param>
private void BeginRender(SpriteBatch spriteBatch, Color clearColor)
{
    //  Prepare the graphics device.
    _game.GraphicsDevice.SetRenderTarget(RenderTarget);
    _game.GraphicsDevice.Clear(clearColor);

    //  Begin the sprite batch.
    spriteBatch.Begin(blendState: BlendState.AlphaBlend,
                        samplerState: SamplerState.PointClamp);
}
```

Here we setting the `GraphicsDevice` render target to use the transition's render target.  Then we clear the backbuffer using the color provided.  After that we tell the `SpriteBatch` instance to begin.


### Render(SpriteBatch)
Next is the `Render(SpriteBatch)` method.

```csharp
/// <summary>
///     Renders this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
protected virtual void Render(SpriteBatch spriteBatch) { }
```

In this base `Transition` class, we don't do anything here. Instead it will be up to the class that inherits from `Transition` to implement how to render the transition.


### EndRender(SpriteBatch)
The `EndRender(SpriteBatch)` method handles gracefully ending rendering of our transition.

```csharp
/// <summary>
///     Ends the rendering for this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
private void EndRender(SpriteBatch spriteBatch)
{
    //  End the sprite batch.
    spriteBatch.End();

    _game.GraphicsDevice.SetRenderTarget(null);
}
```

It does this by simply ending the spritebatch and then setting the render target of the graphics device to null.

### Draw(SpriteBatch, Color)
This is where all of the above rendering methods get called.

```csharp
/// <summary>
///     Draws the Transition to its render target.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
/// <param name="clearColor">
///     The color value to use when clearing the backbuffer.
/// </param>
public void Draw(SpriteBatch spriteBatch, Color clearColor)
{
    BeginRender(spriteBatch, clearColor);
    Render(spriteBatch);
    EndRender(spriteBatch);
}
```

We pass in the `SpriteBatch` instance used for drawing and a `Color` to clear the backbuffer with, then call the `BeginRender(SpriteBatch, Color)`, `Render(SpriteBatch)`, and `EndRender(SpriteBatch)` methods in that order.

### HandleGraphicsCreated()
Just like in our `Scene` class, we have a `HandleGraphicsCreated()` method that can be called whenever the graphics device is created.

```csharp
/// <summary>
///     When the graphics device is created, no contents are in VRAM, so we need
///     to ensure that the RenderTarget is created.
/// </summary>
public void HandleGraphicsCreated()
{
    CreateRenderTarget();
}
```

When this happens, we tell the transition instance to create its render target.

### HandleGraphicsReset()
Again, just like in our `Scene` class, we have a `HandleGraphicsReset()` method that can be called whenever the graphics device is reset

```csharp
/// <summary>
///     When the graphics device is reset, all contents of VRAM are discarded. When
///     this happens, we need to create things like RenderTarget instances.
/// </summary>
public void HandleGraphicsReset()
{
    CreateRenderTarget();
}
```

When this happens, we tell the transition instance to create its render target.

### CreateRenderTarget()
Finally, we have the `CreateRenderTarget()` method.

```csharp
/// <summary>
///     Creates a new RenderTarget instance for this Transition.
/// </summary>
private void CreateRenderTarget()
{
    int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;
    int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;

    //  If the RenderTarget instance has already been created previously but has yet
    //  to be disposed of properly, dispose of the instance before setting a new one.
    if (RenderTarget != null && !RenderTarget.IsDisposed)
    {
        RenderTarget.Dispose();
    }

    RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);
}
```

Just like with the `Scene` class, we first check if the render target needs to be disposed of, and if so, we dispose it. Then we create the instance.

Now tha we have our base `Transition` class, on the next page, we'll update the `Game1` class to use the transitions.