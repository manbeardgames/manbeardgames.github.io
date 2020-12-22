---
id: fade-transition
title: 'Scene Transitions: The Fade Transition'
hide_title: true
hide_table_of_contents: false
sidebar_label: The Fade Transition
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
slug: /tutorials/monogame-3-8/scene-transitions/fade-transition
---
# The Fade Transition
The first transition effect we'll create is going to be the most command and simplest one of all, a fade effect.  This transition will simply fade out the current scene and then fade in the next one.

:::note Perform the Following
In the game project, reate a new class file called **FadeTransition.cs**, then add the following code.  We'll go over the code in the sections below.

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**FadeTransition class**
```csharp
/// <summary>
///     A transition that fades the scene out/in.
/// </summary>
public class FadeTransition : Transition
{
    /// <summary>
    ///     Creates a new FadeTransition instance.
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
    public FadeTransition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
        : base(game, transitionTime, kind) { }

    /// <summary>
    ///     Renders this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    protected override void Render(SpriteBatch spriteBatch)
    {
        spriteBatch.Draw(texture: SourceTexture,
                            destinationRectangle: SourceTexture.Bounds,
                            sourceRectangle: SourceTexture.Bounds,
                            color: Color.White * GetAlpha());
    }

    /// <summary>
    ///     Gets the alpha value to use for the color mask when rendering.
    /// </summary>
    /// <returns>
    ///     The value to use for the color mask alpha
    /// </returns>
    private float GetAlpha()
    {
        double timeLeft = TransitionTimeRemaining.TotalSeconds;

        if (Kind == TransitionKind.Out)
        {
            return (float)(timeLeft / TransitionTime.TotalSeconds);
        }
        else
        {
            return (float)(1.0 - (timeLeft / TransitionTime.TotalSeconds));
        }
    }
}
```
:::

### Constructor
The constructor of our `FadeTransition` is pretty simple. 

```csharp
/// <summary>
///     Creates a new FadeTransition instance.
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
public FadeTransition(Game1 game, TimeSpan transitionTime, TransitionKind kind)
    : base(game, transitionTime, kind) { }
```

It simply just takes in the required values of the base `Transition` constructor and then passes them along.

### Render(SpriteBatch)
The `Render(SpriteBatch)` method is rather simple as well.

```csharp
/// <summary>
///     Renders this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
protected override void Render(SpriteBatch spriteBatch)
{
    spriteBatch.Draw(texture: SourceTexture,
                        destinationRectangle: SourceTexture.Bounds,
                        sourceRectangle: SourceTexture.Bounds,
                        color: Color.White * GetAlpha());
}
```

All it does is render the source texture, but sets the color mask to `Color.White * GetAlpha()`.  By multiplying it by an alpha value, we can make the render of the texture transparent depending on the amount of alpha we apply.


### GetAlpha()
The `GetAlpha()` method is responsible for determining how much alpha to apply to the render.

```csharp
/// <summary>
///     Gets the alpha value to use for the color mask when rendering.
/// </summary>
/// <returns>
///     The value to use for the color mask alpha
/// </returns>
private float GetAlpha()
{
    double timeLeft = TransitionTimeRemaining.TotalSeconds;

    if (Kind == TransitionKind.Out)
    {
        return (float)(timeLeft / TransitionTime.TotalSeconds);
    }
    else
    {
        return (float)(1.0 - (timeLeft / TransitionTime.TotalSeconds));
    }
}
```

Depending on if the fade transition is fading in or out, we interpolate the alpha value between 0.0 and 1.0 based on the amount of time that is remaining for the transition.


### Testing The Transition
Now let's test the transition. 

:::note Perform the Following
Open the **GreenCircleScene.cs** class file and locate the `Update(GameTime)` method.  Change the method to the following.

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
        //  Tell the game to change to the OrangeCircleScene using the FadeTransition
        _game.ChangeScene(new OrangeCircleScene(_game),
                            new FadeTransition(_game, TimeSpan.FromSeconds(1), Transition.TransitionKind.Out),
                            new FadeTransition(_game, TimeSpan.FromSeconds(1), Transition.TransitionKind.In));
    }
}
```
:::

We've updated it so that when we call `_game.ChangeScene` we are now using the `(Scene, Transition Transition)` overload.  We pass to it a new `OrangeCircleScene` instance, a `FadeTransition` instance that is fading out and a `FadeTransition` instance that is fading in.

:::note Perform the Following
Next, open the **OrangeCircleScene.cs** class file and make the same change to it's `Update(GameTime)` method as we did above to. Only for this one, make sure we are changing to the `GreenCircleScene` instead.
:::

If you run the game now, you should see the green circle scene first. Then if you press the space key to change scenes, the green circle scene will fade out, then the orange circle scene will fade in.  It's magic!!!

![](/img/tutorials/scene-transitions/fade-transition.gif)

The fade transition effect is nice and all, but we can create something even fancier.  In the next page of this tutorial, we'll create the even-odd tile transition effect.