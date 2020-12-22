---
id: even-odd-transition
title: 'Scene Transitions: The EvenOddTransition'
hide_title: true
hide_table_of_contents: false
sidebar_label: The EvenOddTransition
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
slug: /tutorials/monogame-3-8/scene-transitions/even-odd-transition
---

# The EvenOddTileTransition
Now that we've created a simple fade transition, lets create one that really stands out. Imagine a grid, like a chess board.  In this grid, we're going to group each odd grid cell together and each even grid cell together.  To help visualize this, see the image below.  The gray grid cells are the even ones and the white grid cells are the odd ones.

![](/img/tutorials/scene-transitions/even-odd-grid.png)

What were going to do with this transition effect take our scene and theoretically split it up into a grid like this.  For the transition out, we are going first take all of the odd grid cells and shrink + rotate them out of the scene. Then we are going to take all of the even grid cells and shrink + rotate them out of the scene  For the transition in, we'll do the reverse, growing + rotating the cells into the screen.

:::note Perform the Following
Create a new class file in your project called **EvenOddTileTransition.cs**, then add the following code. We'll go over the code in the sections after.

**using statements**
```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
```

**EvenOddTileTransition class**
```csharp
/// <summary>
///     A transition that divides the scene into a checkerboard and spins out/in the odd tiles
///     then the even tiles
/// </summary>
public class EvenOddTileTransition : Transition
{
    //  Have the transition time.
    private double _transitionHalfTime;

    //  The width and height, in pixels,  of a tile.
    private int _tileSize;

    //  The total number of columns.
    private int _columns;

    //  The total number of rows.
    private int _rows;

    /// <summary>
    ///     Creates a new EvenOddTransition instance.
    /// </summary>
    /// <param name="game">
    ///     A reference to our Game instance.
    /// </param>
    /// <param name="tileSize">
    ///     The width and height, in pixels, of a tile.
    /// </param>
    /// <param name="transitionTime">
    ///     The total amount of time the transition will take.
    /// </param>
    /// <param name="kind">
    ///     The type of transition.
    /// </param>
    public EvenOddTileTransition(Game1 game, int tileSize, TimeSpan transitionTime, TransitionKind kind)
        : base(game, transitionTime, kind)
    {
        _transitionHalfTime = TransitionTime.TotalSeconds / 2;
        _tileSize = tileSize;
    }

    /// <summary>
    ///     Starts the transition.
    /// </summary>
    /// <param name="sourceTexture">
    ///     A reference to the RenderTarget2D instance of the scene being transitioned.
    /// </param>
    public override void Start(RenderTarget2D sourceTexture)
    {
        base.Start(sourceTexture);

        _columns = (int)Math.Ceiling(SourceTexture.Width / (float)_tileSize);
        _rows = (int)Math.Ceiling(SourceTexture.Height / (float)_tileSize);
    }

    /// <summary>
    ///     Renders this transition.
    /// </summary>
    /// <param name="spriteBatch">
    ///     The SpriteBatch instance used for rendering.
    /// </param>
    protected override void Render(SpriteBatch spriteBatch)
    {
        for (int row = 0; row < _rows; row++)
        {
            for (int column = 0; column < _columns; column++)
            {
                int size = GetSize(IsOdd(column, row));
                int xPos = ((column * _tileSize) + (_tileSize - size) / 2) + (size / 2);
                int yPos = ((row * _tileSize) + (_tileSize - size) / 2) + (size / 2);

                spriteBatch.Draw(texture: SourceTexture,
                                    destinationRectangle: new Rectangle(xPos, yPos, size, size),
                                    sourceRectangle: new Rectangle(column * _tileSize, row * _tileSize, _tileSize, _tileSize),
                                    color: Color.White,
                                    rotation: GetRotation(IsOdd(column, row)),
                                    origin: new Vector2(_tileSize, _tileSize) * 0.5f,
                                    effects: SpriteEffects.None,
                                    layerDepth: 0.0f);
            }
        }
    }

    /// <summary>
    ///     Calculates and returns the value to use for the tiles rotation.
    /// </summary>
    /// <param name="isOdd">
    ///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
    ///     even numbers, or both odd numbers.
    /// </param>
    /// <returns>
    ///     The rotation value to use for the tile.
    /// </returns>
    private float GetRotation(bool isOdd)
    {
        double timeLeft = TransitionTimeRemaining.TotalSeconds;

        if (isOdd)
        {
            timeLeft = Math.Min(timeLeft, _transitionHalfTime);
        }
        else
        {
            timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
        }

        if (Kind == TransitionKind.Out)
        {
            return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime) - 1.0);
        }
        else
        {
            return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime));
        }
    }

    /// <summary>
    ///     Calculates and returns the size value to use for a tile.
    /// </summary>
    /// <param name="isOdd">
    ///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
    ///     even numbers, or both odd numbers.
    /// </param>
    /// <returns>
    ///     The size value to use for the tile.
    /// </returns>
    private int GetSize(bool isOdd)
    {
        double timeLeft = TransitionTimeRemaining.TotalSeconds;

        if (isOdd)
        {
            timeLeft = Math.Min(timeLeft, _transitionHalfTime);
        }
        else
        {
            timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
        }

        if (Kind == TransitionKind.Out)
        {
            return (int)((_tileSize) * (timeLeft / _transitionHalfTime));
        }
        else
        {
            return (int)((_tileSize) * (1 - (timeLeft / _transitionHalfTime)));
        }
    }

    /// <summary>
    ///     Given a column (x) and row (y) of a tile, determines if it is an 
    ///     odd tile.
    /// </summary>
    /// <remarks>
    ///     An odd tile is one where both the row and column are even numbers or
    ///     both the row and column are odd numbers
    /// </remarks>
    /// <param name="column">
    ///     The column the tile is in.
    /// </param>
    /// <param name="row">
    ///     The row the tile is in.
    /// </param>
    /// <returns></returns>
    private bool IsOdd(int column, int row)
    {
        return (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 != 0);
    }
}
```
:::

### Fields
The `EvenOddTileTransition` class has the following fields

```csharp
//  Half the transition time.
private double _transitionHalfTime;

//  The width and height, in pixels,  of a tile.
private int _tileSize;

//  The total number of columns.
private int _columns;

//  The total number of rows.
private int _rows;
```

These are pretty self explanatory as to what they values they store are for.

### Constructor
The constructor for the `EvenOddTileTransition` class is a little different than the fade one.

```csharp
/// <summary>
///     Creates a new EvenOddTransition instance.
/// </summary>
/// <param name="game">
///     A reference to our Game instance.
/// </param>
/// <param name="tileSize">
///     The width and height, in pixels, of a tile.
/// </param>
/// <param name="transitionTime">
///     The total amount of time the transition will take.
/// </param>
/// <param name="kind">
///     The type of transition.
/// </param>
public EvenOddTileTransition(Game1 game, int tileSize, TimeSpan transitionTime, TransitionKind kind)
    : base(game, transitionTime, kind)
{
    _transitionHalfTime = TransitionTime.TotalSeconds / 2;
    _tileSize = tileSize;
}
```

It takes the usual parameters as before, but with the addition of the `int tileSize` parameter.  This value is used to indicate the width and height, in pixels, of each of the grid tiles for the transition.

We then calculate the `_transitionHalfTime` value and cache the tile size given.

### Start(RenderTarget)
The `Start(RenderTarget)` does a little setup as well for the transition

```csharp
/// <summary>
///     Starts the transition.
/// </summary>
/// <param name="sourceTexture">
///     A reference to the RenderTarget2D instance of the scene being transitioned.
/// </param>
public override void Start(RenderTarget2D sourceTexture)
{
    base.Start(sourceTexture);

    _columns = (int)Math.Ceiling(SourceTexture.Width / (float)_tileSize);
    _rows = (int)Math.Ceiling(SourceTexture.Height / (float)_tileSize);
}
```

When we tell the transition to start, we calculate the total number of columns and rows for the grid.  We do this here instead of in the constructor because we need to know the dimensions of the `SourceTexture`.  

We also use `Math.Ceiling` here to ensure that if the texture cannot be divided cleanly, we add an extra row or column for the excess amount.

### Render(SpriteBatch)
Next is the `Render(SpriteBatch)` method.

```csharp
/// <summary>
///     Renders this transition.
/// </summary>
/// <param name="spriteBatch">
///     The SpriteBatch instance used for rendering.
/// </param>
protected override void Render(SpriteBatch spriteBatch)
{
    for (int row = 0; row < _rows; row++)
    {
        for (int column = 0; column < _columns; column++)
        {
            int size = GetSize(IsOdd(column, row));
            int xPos = ((column * _tileSize) + (_tileSize - size) / 2) + (size / 2);
            int yPos = ((row * _tileSize) + (_tileSize - size) / 2) + (size / 2);

            spriteBatch.Draw(texture: SourceTexture,
                                destinationRectangle: new Rectangle(xPos, yPos, size, size),
                                sourceRectangle: new Rectangle(column * _tileSize, row * _tileSize, _tileSize, _tileSize),
                                color: Color.White,
                                rotation: GetRotation(IsOdd(column, row)),
                                origin: new Vector2(_tileSize, _tileSize) * 0.5f,
                                effects: SpriteEffects.None,
                                layerDepth: 0.0f);
        }
    }
}
```

Here we loop through through each row of the grid, looping through each column of the grid for each row.  For each column, we first get the size of the grid cell with the `GetSize(bool)` method. We then calculate the x and y position of the cell in the render.  Finally we draw it with the spritebatch.  

There are two other methods that are called from within here; the `IdOdd(int, int)` and `GetRotation(bool)` methods. We discuss these below.

### GetSize(bool)
The `GetSize(bool)` method is responsible for calculating the size of the grid cell.

```csharp
/// <summary>
///     Calculates and returns the size value to use for a tile.
/// </summary>
/// <param name="isOdd">
///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
///     even numbers, or both odd numbers.
/// </param>
/// <returns>
///     The size value to use for the tile.
/// </returns>
private int GetSize(bool isOdd)
{
    double timeLeft = TransitionTimeRemaining.TotalSeconds;

    if (isOdd)
    {
        timeLeft = Math.Min(timeLeft, _transitionHalfTime);
    }
    else
    {
        timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
    }

    if (Kind == TransitionKind.Out)
    {
        return (int)((_tileSize) * (timeLeft / _transitionHalfTime));
    }
    else
    {
        return (int)((_tileSize) * (1 - (timeLeft / _transitionHalfTime)));
    }
}
```

The method takes a `bool` value that indicates if the grid cell is an odd cell.  We then interpolate the size of the cell based on if it is odd or even, and the amount of time left in the transition.

### GetRotation(bool)
The `GetRotation(bool)` method is responsible for determining the amount of rotation to apply to the grid cell when its rendered.

```csharp
/// <summary>
///     Calculates and returns the value to use for the tiles rotation.
/// </summary>
/// <param name="isOdd">
///     Is the tile one of the odd tiles. An odd tile is one that is ina  row and column that is both
///     even numbers, or both odd numbers.
/// </param>
/// <returns>
///     The rotation value to use for the tile.
/// </returns>
private float GetRotation(bool isOdd)
{
    double timeLeft = TransitionTimeRemaining.TotalSeconds;

    if (isOdd)
    {
        timeLeft = Math.Min(timeLeft, _transitionHalfTime);
    }
    else
    {
        timeLeft = Math.Max(timeLeft - _transitionHalfTime, 0);
    }

    if (Kind == TransitionKind.Out)
    {
        return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime) - 1.0);
    }
    else
    {
        return 5.0f * (float)Math.Sin((timeLeft / _transitionHalfTime));
    }
}
```
Just like the `GetSize(bool)` method, this also takes a `bool` value that indicates if the grid cell is an odd cell.  We then interpolate the rotation of the cell based on if it is odd or even, and the amount of time left in the transition.

### IsOdd(int, int)
Finally, the last method is the `IsOdd(int, int)` method.  This one determines if the grid cell at the column and row position in the grid is an odd cell.

```csharp
/// <summary>
///     Given a column (x) and row (y) of a tile, determines if it is an 
///     odd tile.
/// </summary>
/// <remarks>
///     An odd tile is one where both the row and column are even numbers or
///     both the row and column are odd numbers
/// </remarks>
/// <param name="column">
///     The column the tile is in.
/// </param>
/// <param name="row">
///     The row the tile is in.
/// </param>
/// <returns></returns>
private bool IsOdd(int column, int row)
{
    return (column % 2 == 0 && row % 2 == 0) || (column % 2 != 0 && row % 2 != 0);
}
```

And odd cell is one were either both the row and column are even numbers, or both the row and column are odd numbers.

### Testing the Transition.
Now let's test our transition out.  

:::note Perform the Following
Open the `GreenCircleScene` class file.  Locate the `Update(GameTime)` method, and change it to the following.

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
        _game.ChangeScene(new OrangeCircleScene(_game),
                            new EvenOddTileTransition(_game, 32, TimeSpan.FromSeconds(1), Transition.TransitionKind.Out),
                            new EvenOddTileTransition(_game, 32, TimeSpan.FromSeconds(1), Transition.TransitionKind.In));
    }
}
```
:::

This changes it from using the `FadeTransition` to our new `EvenOddTileTransition`. when creating the new `EventOddTileTransition` instances I used a tile size of `32`, but you can use whatever value you'd like. Experiment with it.


:::note Perform the Following
Open the `OrangeCircleScene` class file and change the `Update(GameTime)` method there as well to use the new `EvenOddTileTransition`.  Remember to have this one create a new `GreenCircleScene` to switch to.
:::

Once you've made these changes, run the game.  As usual, you should see the green circle scene appear first.  Press the space key to switch scenes and watch the magic happen. 

![](/img/tutorials/scene-transitions/even-odd-transition.gif)