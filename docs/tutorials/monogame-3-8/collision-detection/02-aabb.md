---
id: aabb
title: 'Collision Detection: AABB'
hide_title: true
hide_table_of_contents: false
sidebar_label: AABB Collision
custom_edit_url: null
keywords:
    - 'monogame tutorial'
    - 'monogame framework'
    - 'monogame'
    - 'tutorial'
    - 'aabb collision'
    - 'aabb'
    - 'separating axis theorem'
    - 'sat'
    - 'circle collision'
    - 'collision detection'
    - 'collision'
description: 'A tutorial on detecting collisions between 2D rectangles in MonoGame.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/collision-detection/aabb-collision
---
# Axis-Aligned Bounding Box
**Axis-Aligned Bounding Box** collision detection, or AABB for short, is one of the simplest forms of collision detection. The **Bounding Box** part of the name just refers to a rectangular structure that defines the surface area of an object.  **Axis-Aligned** means that the bounding boxes of the objects being compared for collision are aligned on both their x and y axes. 

Take, for example, the two bounding boxes in the image below.

![Two bounding boxes with aligned x and y axes](/img/tutorials/aabb-collision/axis-aligned-bounding-boxes.png)

The x and y axes of both boxes are aligned, which means we can use AABB collision detection to check for collision between them.  Conversely, the following two bounding boxes are not **Axis-Aligned**.

![Two bounding boxes with non aligning x and y axes](/img/tutorials/aabb-collision/not-axis-aligned-bounding-boxes.png)

Being that they are not **Axis-Aligned**, we cannot accurately detect collision between the two using AABB collision detection.

### Detecting a Collision
When using AABB collision detection, there are four conditions that must be true in order to say a collision has occurred.  Given Bounding Box `[A]` and Bounding Box `[B]`, these conditions are 

1. The **left edge** x-position of `[A]` must be less than the **right edge** x-position of `[B]`.
2. The **right edge** x-position of `[A]` must be greater than the **left edge** x-position of `[B]`.
3. The **top edge** y-position of `[A]` must be less than the **bottom edge** y-position of `[B]`.
4. The **bottom edge** y-position of `[A]` must be greater than the **top edge** y-position of `[B]`.

If any of these four conditions are false, even just one, then no collision has occurred. 

### The Code
Now that we know the conditions for AABB collision detection let's add the code for it to our game.

:::note Perform the Following
In the game project, add a new class file called **CollisionChecks.cs**  In the class file, change it to a static class like below.

```csharp
public static class CollisionChecks
```
:::

We know that with AABB collision detection, we'll be working with rectangular structures.  MonoGame already has the `Rectangle` struct built in, so we'll take advantage of that.

:::note Perform the Following
Add the following method to the `CollisionChecks` class.

```csharp
using Microsoft.Xna.Framework;
````

```csharp
/// <summary>
///     Checks for collision between two rectangular structures using
///     Axis-Aligned Bounding Box collision detection.
/// </summary>
/// <param name="boxA">
///     The bounding box of the first structure.
/// </param>
/// <param name="boxB">
///     The bounding box of the second structure.
/// </param>
/// <returns>
///     True if the two structures are colliding; otherwise, false.
/// </returns>
public static bool AABB(Rectangle boxA, Rectangle boxB)
{
    return boxA.Left < boxB.Right &&
            boxA.Right > boxB.Left &&
            boxA.Top < boxB.Bottom &&
            boxA.Bottom > boxB.Top;
}
```
:::

The method itself is simple. It takes in two `Rectangle` values and then performs each of the four checks for AABB collision detection and returns the result.  Since all of the checks are performed using `&&`, if one should be false then it will immediately return back false instead of checking the remaining, since it's all or nothing for AABB.


### Testing For Collision
Now that we have the code to test for AABB collision, lets test it out in our game project to make sure it works.

:::note Perform the Following
Open the **Game1.cs** class file in the project and add the following fields

```csharp
//  Represents bounding box [A]
private Rectangle _boxA;

//  Represents bounding box [B]
private Rectangle _boxB;

//  A value that indicates if the two bounding boxes are colliding.
private bool _areColliding;

//  A 1x1 white pixel texture we can use to render primitives.
private Texture2D _pixel;

//  The previous frame keyboard state.
private KeyboardState _prevKeyboardState;

//  The current frame keyboard state.
private KeyboardState _curKeyboardState;    
```
:::

`_boxA` and `_boxB` are just `Rectangle` values used to define the two bounding boxes we're going to test with.
`_areColliding` is a `bool` field we can use to store a value indicating fo the two rectangles are colliding.
`_pixel` is a `Texture2D` that we'll create in a moment that we can use to draw the rectangles to the screen.
`_prevKeyBoardState` and `_curKeyboardState` are used to track the state of keyboard input so we can move the rectangles around the screen.


Next, let's define the initial values for `_boxA` and `_boxB`.

:::note Perform the Following
Locate the `Initialize()` method in the `Game1` class and change it to the following.

```csharp
protected override void Initialize()
{
    base.Initialize();

    //  Define the x, y, width, and height of the two bounding boxes.
    _boxA = new Rectangle(100, 100, 50, 50);
    _boxB = new Rectangle(200, 200, 50, 50);
}
```
:::

Now that we have the dimensions defined for the two rectangles, we need to create the 1x1 white pixel texture used to render them.

:::note Perform the Following
Locate the `LoadContent()` method in the `Game1` class and change it to the following.

```csharp
protected override void LoadContent()
{
    _spriteBatch = new SpriteBatch(GraphicsDevice);

    //  Create the 1x1 pixel texture
    _pixel = new Texture2D(GraphicsDevice, 1, 1);
    _pixel.SetData<Color>(new Color[] { Color.White });
}

```
:::

Next, we need to update the keyboard input states and check for input to move the rectangles around the screen.

:::note Perform the Following
Locate the `Update(GameTime)` method in the `Game1` class and change it to the following

```csharp
protected override void Update(GameTime gameTime)
{
    //  Update the input states.
    _prevKeyboardState = _curKeyboardState;
    _curKeyboardState = Keyboard.GetState();

    MoveBoxA();
    MoveBoxB();

    //  Check if _boxA and _boxB are colliding.
    _areColliding = CollisionChecks.AABB(_boxA, _boxB);

    base.Update(gameTime);
}
```

Add the following `MoveBoxA()` method to the `Game1` class.

```csharp
/// <summary>
///     Moves bounding box [A] based on keyboard input.
/// </summary>
private void MoveBoxA()
{
    if(_curKeyboardState.IsKeyDown(Keys.W))
    {
        _boxA.Y--;
    }
    else if(_curKeyboardState.IsKeyDown(Keys.S))
    {
        _boxA.Y++;
    }
    
    if (_curKeyboardState.IsKeyDown(Keys.A))
    {
        _boxA.X--;
    }
    else if (_curKeyboardState.IsKeyDown(Keys.D))
    {
        _boxA.X++;
    }
}
```

Add the following `MoveBoxB()` method to the `Game1` class.

```csharp
/// <summary>
///     Moves bounding box [B] based on keyboard input
/// </summary>
private void MoveBoxB()
{
    if (_curKeyboardState.IsKeyDown(Keys.Up))
    {
        _boxB.Y--;
    }
    else if (_curKeyboardState.IsKeyDown(Keys.Down))
    {
        _boxB.Y++;
    }

    if (_curKeyboardState.IsKeyDown(Keys.Left))
    {
        _boxB.X--;
    }
    else if (_curKeyboardState.IsKeyDown(Keys.Right))
    {
        _boxB.X++;
    }
}
```
:::

During the `Update(GameTime)` method, we're updating the values of `_prevKeyboardState` and `_curKeyboardState`, and then we call `MoveBoxA()` and `MoveBoxB()`  `MoveBoxA()` checks for input on the **W, S, A, and D** keys and moves `_boxA` based on which, if any, are pressed.  `MoveBoxB()` does the same thing for `_boxB`, only it utilizes the **Up, Down, Left, and Right** arrow keys. Once the movement checks have completed for both rectangles, we call the `CollisionChecks.AABB(Rectangle, Rectangle)` method, giving it our two rectangles.  If it detects a collision, it sets the value of `_areColliding` to `true`; otherwise, it sets it to `false`.

Finally, we need to draw the rectangles to the screen.

:::note Perform the Following
Locate the `Draw(GameTime)` method in the `Game1` class and change it to the following.

```csharp
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);

    //  Draw the bounding boxes as white rectangles.
    Color color = Color.White;

    //  If the bounding boxes are colliding, make them red instead.
    if(_areColliding)
    {
        color = Color.Red;
    }

    _spriteBatch.Begin();
    _spriteBatch.Draw(_pixel, _boxA, color);
    _spriteBatch.Draw(_pixel, _boxB, color);
    _spriteBatch.End();
    base.Draw(gameTime);
}
```
:::

Here we are just creating a color value defaulted to `Color.White`.  The we check the value of `_areColliding`, and if `true`, sets the color value to `Color.Red`.  Finally, we draw our two rectangles using the color value calculated.

If you run the game at this point, you should see two white rectangles on the screen.  Using the **W, S, A, and D** keys to move the left rectangle, and the **Up, Down, Left, and Right** arrow keys to move the right rectangle, if you make them collide, they will both turn red.  Moving them apart so they are no longer colliding will change them back to white.

<div>
    <video width="100%" height="100%" controls playsinline autoplay muted loop>
        <source src="/img/tutorials/aabb-collision/aabb-collision-demo.mp4"></source>
    </video>
</div>

### Conclusion
In this tutorial, we discussed what **Axis-Aligned Bounding Box** means and how to use it to detect collision between two rectangular objects.  We then implemented a demo of this into a new MonoGame game project. Not all objects in our game are rectangles though. Sometimes we may have things like a ball that's circular.  On the next page of this tutorial series, we'll discuss how to test for collision between two circular objects.