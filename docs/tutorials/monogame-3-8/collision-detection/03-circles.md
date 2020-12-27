---
id: circles
title: 'Collision Detection: Circles'
hide_title: true
hide_table_of_contents: false
sidebar_label: Circle Collision
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
description: 'A tutorial on detecting collisions between 2D circles in MonoGame.'
image: /img/mgb_cookie.svg
slug: /tutorials/monogame-3-8/collision-detection/circles
---

# Circle Collision
Not every object in a game can or should be defined as rectangular.  Sometimes we need to use a circle.  We can't use the AABB collision detection as discussed on the previous page because it is strictly for rectangles only. Instead we'll need to use a small amount of trigonometry when it comes to circles.  Don't let this scare you though.

:::note Ellipses
The method used on this page to detect collision will only work for a circle. This means that any given point on the circle's perimeter is equal distance to the center of the circle.  The method of collision detection here does not apply to an ellipses.
:::

## Defining a Circle
Before we begin, let's define a few terms about circles.  First, let's look at the image below.

![A circle is defined by its center point and a radius](/img/tutorials/circle-collision/circle-definition.png)

A circle can be defined by two distinct properties

* An x- and y-coordinate position for the center point of the circle
* The radius of the circle, which is the distance from the center to any given point on the circle's perimeter.

From the second point above, we can safely assume that given any (x, y) point, if the distance from that point to the circle's center is less than the radius of the circle, then it will be contained within the circle's perimeter.  This means that we're going to need a method of calculating the distance between any two points.  

## Calculating Distance Between Points
When it comes to calculating the distance between two points, thankfully Pythagoras has already solved this for us.  Most should be familiar with Pythagorean's Theorem.

![Demonstrating Pythagorean's Theorem](/img/tutorials/circle-collision/right-triangle.png)

Given the length of two sides (**A** and **B**) of a right triangle, the hypotenuse (**C**) is equal to **&Sqrt;(A<sup>2</sup> + B<sup>2</sup>)**.  So how can we use this to get the the distance between any two points? Imagine that the two points given are located at the start and end points of the hypotenuse of the triangle. If we take the distance of the x-coordinates of each point, that will give use the value of **B**, and the distance between the y-coordinates of each point will give use the value of **A**.  

![Finding the value of A and B](/img/tutorials/circle-collision/finding-a-b.png)

Now all we need to do is `plug` those values into the formula &Sqrt;(A<sup>2</sup> + B<sup>2</sup>). Given the example above that would be &Sqrt;(3<sup>2</sup> + 4<sup>2</sup>) = &Sqrt;(25) = `5`.

## Detecting Circle Collision
When it comes to detecting collision between two circles, what we are really checking for is if any given point within one circle's perimeter is contained within the perimeter of another circle.  We know from the definitions above that any give point that is in a circle's perimeter cannot be any distance further from the center than the length of the radius. So if all points in one circle are within its radius distance, and all points of another circle are within its radius distance, then distance between the centers of both circles must be greater than or equal to the sum of their radii, otherwise they are colliding.

To further illustrate this, take a look at the following three scenarios in the image below.

![](/img/tutorials/circle-collision/collision-vs-non-collision.png)

In the first two scenarios, visually we can see that the circles are not colliding. We prove this math by showing the the distance between their centers is greater than the sum of the radii. In the third scenario, these circles are visually colliding, and we prove it by showing the distance between the centers is less than the sum of the radii.

So know that we know how to detect a circle collision, let's create the code in our MonoGame project to handle this.

## The Code
Before we can add the circle collision check code, first we need a way of defining a circle.  Unlike the `Rectangle` struct, MonoGame does not provided a built-in struct for a circle.  So we need to create one ourself.  

:::note Perform the Following
Create a new class file in the project called **Circle.cs** and add the following code to it.

```csharp
using Microsoft.Xna.Framework;
```

**Circle struct**
```csharp
/// <summary>
///     A simple structure that defines the values of a circle.
/// </summary>
public struct Circle
{
    /// <summary>
    ///     The center xy-coordinate location of the circle.
    /// </summary>
    public Point Center;

    /// <summary>
    ///     The length of the radius of the circle.
    /// </summary>
    public int Radius;

    /// <summary>
    ///     Creates a new Circle structure.
    /// </summary>
    /// <param name="x">
    ///     The x-coordinate position of the center of the circle.
    /// </param>
    /// <param name="y">
    ///     The y-coordinate position of the center of the circle.
    /// </param>
    /// <param name="radius">
    ///     The length of the radius of the circle.
    /// </param>
    public Circle(int x, int y, int radius)
    {
        Center = new Point(x, y);
        Radius = radius;
    }    
}
```
:::
For the purposes of this tutorial, these are all the values we'll need for a circle.  The `Center` field will be used to hold the x-coordinate and y-coordinate location of the center point of the circle. The `Radius` field will hold the value of the length of the radius.  The constructor takes in the `x` and `y` coordinate locations for the center point, and the `radius` value, then sets the fields to using these values.

Next, we need to add the collision detection check to our `CollisionCheck` class.

:::note Perform the Following
Open the **CollisionCheck.cs** class file that we created previously and add the following new methods.

** Distance(Circle, Circle) method**
```csharp
/// <summary>
///     Calculates the distance between the center points of two circles.
/// </summary>
/// <param name="circleA">
///     The first circle.
/// </param>
/// <param name="circleB">
///     The second circle.
/// </param>
/// <returns>
///     The distance between the center point of both circles.
/// </returns>
public static float Distance(this Circle circleA, Circle circleB)
{
    //  Get the distance between the x-coordinates of each circle.
    int dx = circleA.Center.X - circleB.Center.X;

    //  Get the distance between the y-coordinates of each circle.
    int dy = circleA.Center.Y - circleB.Center.Y;

    //  Use Pythagorean's Theorem to calculate the distance between the two and return it.
    return (float)Math.Sqrt((dx * dx) + (dy * dy));
}
```

**Circle(Circle, Circle) method**
```csharp
/// <summary>
///     Checks for collision between two circle structures.
/// </summary>
/// <param name="circleA">
///     The first circle.
/// </param>
/// <param name="circleB">
///     The second circle.
/// </param>
/// <returns>
///     True if the two circles are colliding; otherwise, false.
/// </returns>
public static bool Circle(Circle circleA, Circle circleB)
{
    //  Get the sum of the radii
    int radii = circleA.Radius + circleB.Radius;

    //  Get the distance from the center of each circle.
    float distance = Distance(circleA, circleB);

    //  If the distance is less than the radii sum, then it is a collision
    return distance < radii;
}
```
:::

The `Distance(Circle, Circle)` method takes two circles and, using Pythagorean's Theorem as discussed before, calculates the distance between the two points and returns the value.  The `Circle(Circle, Circle)` method is where the actual collision check occurs.  It first calculates the sum of the two radii of the circles. It then calls the `Distance(Circle, Circle)` method to get the distance between the two centers.  Finally it compares the distance to the radii, and if the distance is less, it returns `true`; otherwise, it returns `false`.

## Testing For Collision
Now that we have a way to detect collisions between circles, we need to test the code to make sure it's functioning properly.  We're going to need some graphic to represent our circles.  There are many ways of rendering 2D circles, some more complicated than others. For the purposes of this tutorial however, we're going to just use a simple `Texture2D` to represent our circles.

:::note Perform the Following
The circle image we'll be using is a 64px x 64px white circle.  You can download the already prepared version that is used for this tutorial at the link below. Or you can use your favorite image editing software to create one yourself. If downloading the one below, right-click the link and select **Save Link As...**

* [64px x 64px White Circle](https://raw.githubusercontent.com/manbeardgames/monogame-collision-detection-demo/develop/CollisionDemo/Content/white-circle.png)

Once downloaded or created, add the the image to the game project using the MGCB Editor.  If you are unfamiliar with how to add content files to the game, please check out the [official MonoGame documentation](https://docs.monogame.net/articles/content/using_mgcb_editor.html)
:::

Now that we have the white circle image added that we can draw to represent our circle, we need to update `Game1`.

:::note Perform the Following
Open the `Game1` class file. 

Remove the two `Rectangle` fields we ere using before for AABB collision

Add the following new fields.

```csharp
//  Represents the first circle (A).
private Circle _circleA;

//  Represents the second circe (B).
private Circle _circleB;

//  The texture used to draw the circles.
private Texture2D _circleTexture;
```
:::

`_circleA` will hold the values of our first circle and `_circleB` will hold the values of the second circle.  `_circleTexture` will be used to hold the `Texture2D` that we'll load from the content manager to render our circles with.

:::note Perform the Following
Locate the `Initialize()` method and update it to the following

```csharp
protected override void Initialize()
{
    base.Initialize();

    //  Define the x and y center, and the radius of each circle.
    //  The circle image is 64px x 64px so the radius is 32px.
    _circleA = new Circle(100, 100, 32);
    _circleB = new Circle(200, 200, 32);
}
```
:::

Here we removed the initializations of the two rectangles and instead are now initializing our two circles.  We set the x and y locations for both, and the radius of both is `32`. We used `32` because the image we created is 64px x 64px and half of 64px is 32.

:::note Perform the Following
Locate the `LoadContent()` method and change it to the following.

```csharp
protected override void LoadContent()
{
    _spriteBatch = new SpriteBatch(GraphicsDevice);

    //  Create the 1x1 pixel texture
    _pixel = new Texture2D(GraphicsDevice, 1, 1);
    _pixel.SetData<Color>(new Color[] { Color.White });

    //  Load the circle texture
    _circleTexture = Content.Load<Texture2D>("white-circle");

}
```
:::

Here, we've just added the code to load the white circle image we created and store it in the `_circleTexture` instance.

:::note Perform the Following
Locate the `Update(GameTime)` method and change it to the following.

```csharp
protected override void Update(GameTime gameTime)
{
    //  Update the input states.
    _prevKeyboardState = _curKeyboardState;
    _curKeyboardState = Keyboard.GetState();

    MoveCircleA();
    MoveCircleB();

    //  Check if _boxA and _boxB are colliding.
    _areColliding = CollisionChecks.Circle(_circleA, _circleB);

    base.Update(gameTime);
}
```
:::

We've removed the input handling for the rectangles from the previous page and adding two calls to `MoveCircleA()` and `MoveCircleB()`.  These will be use to move our circles in much the same way we did the rectangles.  Next, we are calling `CollisionChecks.Circle(Circle, Circle)` to check for collision between our two circles, and storing the value in the `_areColliding` field.

:::note Perform the Following
Locate the `MoveBoxA()` method and remove it completely.

Locate the `MoveBoxB()` method and remove it completely.

Add the following methods to the `Game1` class.

***MoveCircleA()**
```csharp
/// <summary>
///     Moves circle (A) based on keyboard input.
/// </summary>
private void MoveCircleA()
{
    if(_curKeyboardState.IsKeyDown(Keys.W))
    {
        _circleA.Center.Y--;
    }
    else if(_curKeyboardState.IsKeyDown(Keys.S))
    {
        _circleA.Center.Y++;
    }
    
    if (_curKeyboardState.IsKeyDown(Keys.A))
    {
        _circleA.Center.X--;
    }
    else if (_curKeyboardState.IsKeyDown(Keys.D))
    {
        _circleA.Center.X++;
    }
}
```

**MoveCircleB()**
```csharp
/// <summary>
///     Moves circle (B) based on keyboard input.
/// </summary>
private void MoveCircleB()
{
    if (_curKeyboardState.IsKeyDown(Keys.Up))
    {
        _circleB.Center.Y--;
    }
    else if (_curKeyboardState.IsKeyDown(Keys.Down))
    {
        _circleB.Center.Y++;
    }

    if (_curKeyboardState.IsKeyDown(Keys.Left))
    {
        _circleB.Center.X--;
    }
    else if (_curKeyboardState.IsKeyDown(Keys.Right))
    {
        _circleB.Center.X++;
    }
}
```
:::

Here we've removed the `MoveBoxA()` and `MoveBoxB()` methods and replaced them with `MoveCircleA()` and `MoveCircleB()`.  Functionally these do the same as the box ones, moving their respective circles based on keyboard input.

Finally, we need to draw the circles to the screen.

:::note Perform the Following
Locate the `Draw(GameTime) method and change it to the following.

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
    _spriteBatch.Draw(texture: _circleTexture,
                      position: _circleA.Center.ToVector2(),
                      sourceRectangle: null,
                      color: color,
                      rotation: 0.0f,
                      origin: new Vector2(_circleTexture.Width, _circleTexture.Height) * 0.5f,
                      scale: 1.0f,
                      effects: SpriteEffects.None,
                      layerDepth: 0.0f);

    _spriteBatch.Draw(texture: _circleTexture,
                      position: _circleB.Center.ToVector2(),
                      sourceRectangle: null,
                      color: color,
                      rotation: 0.0f,
                      origin: new Vector2(_circleTexture.Width, _circleTexture.Height) * 0.5f,
                      scale: 1.0f,
                      effects: SpriteEffects.None,
                      layerDepth: 0.0f);

    _spriteBatch.End();
    base.Draw(gameTime);
}
```
:::

Just as with the previous tutorial on AABB, we first create a `Color` instance defaulted to `Color.White`. Then we check if the two circles are colliding and, if so, change the color to `Color.Red`.  Next we draw the two circles.  Here in the `_sprteBatch.Draw()` methods, I'm using the full method signature overload. This is so we can set the `origin:` parameter to half the width and height of the `_circleTexture`.  This makes it so when rendered, the center of the texture is drawn at the position given, which makes sense since we use the center of the circle as its position.

If you run the game at this point, you should see two white circles on the screen.  Using the **W, S, A, and D** keys to move the left circle, and teh **Up, Down, Left, and Right** arrow keys to move the right circle, if you make them collide, they will both turn red. Moving them apart so they are no longer colliding will change them back to white.

<div>
    <video width="100%" height="100%" controls playsinline autoplay muted loop>
        <source src="/img/tutorials/circle-collision/circle-collision-demo.mp4"></source>
    </video>
</div>

## Conclusion
In this tutorial, we defined what a circle is, how to calculate the distance between two circles, and how to calculate if two circles are colliding. We then implemented this into our MonoGame project and tested collision between to circles in our game.