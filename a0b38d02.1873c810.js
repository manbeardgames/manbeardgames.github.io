(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{109:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return b}));var a=t(0),r=t.n(a);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=r.a.createContext({}),p=function(e){var n=r.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=p(e.components);return r.a.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},h=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=p(t),h=a,b=d["".concat(s,".").concat(h)]||d[h]||m[h]||i;return t?r.a.createElement(b,o(o({ref:n},l),{},{components:t})):r.a.createElement(b,o({ref:n},l))}));function b(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,s=new Array(i);s[0]=h;var o={};for(var c in n)hasOwnProperty.call(n,c)&&(o[c]=n[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var l=2;l<i;l++)s[l]=t[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,t)}h.displayName="MDXCreateElement"},89:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"metadata",(function(){return o})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return p}));var a=t(3),r=t(7),i=(t(0),t(109)),s={id:"tutorials-scene-transitions-transition-class",title:"The Transition Class",hide_title:!1,hide_table_of_contents:!1,sidebar_label:"The Transition Class",custom_edit_url:null,keywords:["monogame tutorial","monogame framework","monogame","tutorial","scene transition","scene","scenes"],description:"A tutorial on create scene transition effects in a MonoGame project.",image:null,slug:"/tutorials/scene-transitions/transition-class"},o={unversionedId:"tutorials/scene-transitions/tutorials-scene-transitions-transition-class",id:"tutorials/scene-transitions/tutorials-scene-transitions-transition-class",isDocsHomePage:!1,title:"The Transition Class",description:"A tutorial on create scene transition effects in a MonoGame project.",source:"@site/docs\\tutorials\\scene-transitions\\the-transition-class.md",slug:"/tutorials/scene-transitions/transition-class",permalink:"/docs/tutorials/scene-transitions/transition-class",editUrl:null,version:"current",sidebar_label:"The Transition Class",sidebar:"tutorials",previous:{title:"Updating The Scene Class",permalink:"/docs/tutorials/scene-transitions/updating-scene-class"},next:{title:"Scene Transitions: Updating Game1",permalink:"/docs/tutorials/scene-transitions/updating-game1"}},c=[{value:"The Code",id:"the-code",children:[]},{value:"IDisposable",id:"idisposable",children:[]},{value:"TransitionKind Enum",id:"transitionkind-enum",children:[]},{value:"Fields",id:"fields",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Events",id:"events",children:[]},{value:"Constructor",id:"constructor",children:[]},{value:"Start(RenderTarget)",id:"startrendertarget",children:[]},{value:"Update(GameTime)",id:"updategametime",children:[]},{value:"BeforeRender(SpriteBatch, Color)",id:"beforerenderspritebatch-color",children:[]},{value:"Render(SpriteBatch)",id:"renderspritebatch",children:[]},{value:"EndRender(SpriteBatch)",id:"endrenderspritebatch",children:[]},{value:"Draw(SpriteBatch, Color)",id:"drawspritebatch-color",children:[]},{value:"HandleGraphicsCreated()",id:"handlegraphicscreated",children:[]},{value:"HandleGraphicsReset()",id:"handlegraphicsreset",children:[]},{value:"CreateRenderTarget()",id:"createrendertarget",children:[]}],l={rightToc:c};function p(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Now that we have updated our ",Object(i.b)("inlineCode",{parentName:"p"},"Scene")," class, the next thing we need to do is create the ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," class.  A transition, like a scene, is an abstract concept that is implemented by the different type of transitions, such as fade, swipes, etc.  So before we get to the code of the ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," class, let's first define what we'll need."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"A way of specifying if the transition is ",Object(i.b)("strong",{parentName:"li"},"in")," or ",Object(i.b)("strong",{parentName:"li"},"out")," (i.e. fade in vs fade out)."),Object(i.b)("li",{parentName:"ul"},"A render target to draw the transition too."),Object(i.b)("li",{parentName:"ul"},"Handling graphics create/reset for the render target."),Object(i.b)("li",{parentName:"ul"},"Disposal of the render target"),Object(i.b)("li",{parentName:"ul"},"A reference to render target of the scene we are transitioning."),Object(i.b)("li",{parentName:"ul"},"Way of tracking how long the transition should take and the amount of time the amount of time that has elapsed."),Object(i.b)("li",{parentName:"ul"},"A way of telling the transition when to start."),Object(i.b)("li",{parentName:"ul"},"A way of knowing exactly when the transition has ended so we can handle anything in code")),Object(i.b)("p",null,"So now that we have defined what we'll need, let's take a look at the code."),Object(i.b)("h3",{id:"the-code"},"The Code"),Object(i.b)("p",null,"Below is the entire code needed for the transition class. First create add a new class file to the project called ",Object(i.b)("strong",{parentName:"p"},"Transition.cs"),", then add the following code to it. We'll go over each section of the code in a moment."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"using statements")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"using Microsoft.Xna.Framework;\nusing Microsoft.Xna.Framework.Graphics;\nusing System;\n")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Transition class")),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Base class for all transition instances.\n/// </summary>\npublic abstract class Transition : IDisposable\n{\n    public enum TransitionKind\n    {\n        In,\n        Out\n    }\n\n    protected bool _disposed;   //  Indicates if this instance has been disposed of.\n    protected Game1 _game;   //  Cached reference to our game instance.\n\n    /// <summary>\n    ///     Gets a value indicating if this transition is currently transitioning.\n    /// </summary>\n    public bool IsTransitioning { get; private set; }\n\n    /// <summary>\n    ///     Gets a value indicating the type of transition this is\n    /// </summary>\n    public TransitionKind Kind { get; private set; }\n\n    /// <summary>\n    ///     Gets the total amount of time required for this transition to complete.\n    /// </summary>\n    public TimeSpan TransitionTime { get; private set; }\n\n    /// <summary>\n    ///     Gets the total amount of time remaining for the transition to complete.\n    /// </summary>\n    public TimeSpan TransitionTimeRemaining { get; private set; }\n\n    /// <summary>\n    ///     Gets a cached reference to the RenderTarget2D instance used by the Scene\n    ///     this transition is transitioning.\n    /// </summary>\n    public RenderTarget2D SourceTexture { get; private set; }\n\n    /// <summary>\n    ///     Gets the RenderTarget2D instance this transition renders to.\n    /// </summary>\n    public RenderTarget2D RenderTarget { get; private set; }\n\n    /// <summary>\n    ///     Event triggered when the transition has fully completed.\n    /// </summary>\n    public event EventHandler TransitionCompleted;\n\n    /// <summary>\n    ///     Creates a new Transition instance.\n    /// </summary>\n    /// <param name="game">\n    ///     A reference to our Game instance.\n    /// </param>\n    /// <param name="transitionTime">\n    ///     The total amount of time the transition will take.\n    /// </param>\n    /// <param name="kind">\n    ///     The type of transition.\n    /// </param>\n    public Transition(Game1 game, TimeSpan transitionTime, TransitionKind kind)\n    {\n        _game = game;\n        TransitionTimeRemaining = TransitionTime = transitionTime;\n        Kind = kind;\n        CreateRenderTarget();\n    }\n\n    /// <summary>\n    ///     Starts the transition.\n    /// </summary>\n    /// <param name="sourceTexture">\n    ///     A reference to the RenderTarget2D instance of the scene being transitioned.\n    /// </param>\n    public virtual void Start(RenderTarget2D sourceTexture)\n    {\n        SourceTexture = sourceTexture;\n        IsTransitioning = true;\n    }\n\n    /// <summary>\n    ///     Updates this Transition.\n    /// </summary>\n    /// <param name="gameTime">\n    ///     A snapshot of the timing values provided by the MonoGame Framework.\n    /// </param>\n    public virtual void Update(GameTime gameTime)\n    {\n        TransitionTimeRemaining -= gameTime.ElapsedGameTime;\n\n        if (TransitionTimeRemaining <= TimeSpan.Zero)\n        {\n            IsTransitioning = false;\n\n            if (TransitionCompleted != null)\n            {\n                TransitionCompleted(this, EventArgs.Empty);\n            }\n        }\n    }\n\n    /// <summary>\n    ///     Draws the Transition to its render target.\n    /// </summary>\n    /// <param name="spriteBatch">\n    ///     The SpriteBatch instance used for rendering.\n    /// </param>\n    /// <param name="clearColor">\n    ///     The color value to use when clearing the backbuffer.\n    /// </param>\n    public void Draw(SpriteBatch spriteBatch, Color clearColor)\n    {\n        BeginRender(spriteBatch, clearColor);\n        Render(spriteBatch);\n        EndRender(spriteBatch);\n    }\n\n    /// <summary>\n    ///     Prepares this transition for rendering.\n    /// </summary>\n    /// <param name="spriteBatch">\n    ///     The SpriteBatch instance used for rendering.\n    /// </param>\n    /// <param name="clearColor">\n    ///     The color value to use when clearing the backbuffer.\n    /// </param>\n    private void BeginRender(SpriteBatch spriteBatch, Color clearColor)\n    {\n        //  Prepare the graphics device.\n        _game.GraphicsDevice.SetRenderTarget(RenderTarget);\n        _game.GraphicsDevice.Viewport = new Viewport(RenderTarget.Bounds);\n        _game.GraphicsDevice.Clear(clearColor);\n\n        //  Begin the sprite batch.\n        spriteBatch.Begin(blendState: BlendState.AlphaBlend,\n                            samplerState: SamplerState.PointClamp);\n    }\n\n    /// <summary>\n    ///     Renders this transition.\n    /// </summary>\n    /// <param name="spriteBatch">\n    ///     The SpriteBatch instance used for rendering.\n    /// </param>\n    protected virtual void Render(SpriteBatch spriteBatch) { }\n\n    /// <summary>\n    ///     Ends the rendering for this transition.\n    /// </summary>\n    /// <param name="spriteBatch">\n    ///     The SpriteBatch instance used for rendering.\n    /// </param>\n    private void EndRender(SpriteBatch spriteBatch)\n    {\n        //  End the sprite batch.\n        spriteBatch.End();\n\n        _game.GraphicsDevice.SetRenderTarget(null);\n    }\n\n    /// <summary>\n    ///     When the graphics device is created, no contents are in VRAM, so we need\n    ///     to ensure that the RenderTarget is created.\n    /// </summary>\n    public void HandleGraphicsCreated()\n    {\n        CreateRenderTarget();\n    }\n\n    /// <summary>\n    ///     When the graphics device is reset, all contents of VRAM are discarded. When\n    ///     this happens, we need to create things like RenderTarget instances.\n    /// </summary>\n    public void HandleGraphicsReset()\n    {\n        CreateRenderTarget();\n    }\n\n    /// <summary>\n    ///     Creates a new RenderTarget instance for this Transition.\n    /// </summary>\n    private void CreateRenderTarget()\n    {\n        int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;\n        int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;\n\n        //  If the RenderTarget instance has already been created previously but has yet\n        //  to be disposed of properly, dispose of the instance before setting a new one.\n        if (RenderTarget != null && !RenderTarget.IsDisposed)\n        {\n            RenderTarget.Dispose();\n        }\n\n        RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);\n    }\n\n    /// <summary>\n    ///     Handles the disposing of resources used by this instance.\n    /// </summary>\n    /// <remarks>\n    ///     For more information on using Dispose and the IDisposable interface\n    ///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose\n    /// </remarks>\n    public void Dispose()\n    {\n        Dispose(true);\n        GC.SuppressFinalize(this);\n    }\n\n    /// <summary>\n    ///     Handles the disposing of resources used by this instance.\n    /// </summary>\n    /// <param name="isDisposing">\n    ///     A value indicating if resources should be disposed.\n    /// </param>\n    /// <remarks>\n    ///     For more information on using Dispose and the IDisposable interface\n    ///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose\n    /// </remarks>\n    protected virtual void Dispose(bool isDisposing)\n    {\n        if (_disposed)\n        {\n            return;\n        }\n\n        if (isDisposing)\n        {\n            if (RenderTarget != null)\n            {\n                RenderTarget.Dispose();\n                RenderTarget = null;\n            }\n        }\n\n        _disposed = true;\n    }\n}\n')),Object(i.b)("h3",{id:"idisposable"},"IDisposable"),Object(i.b)("p",null,"The first thing to pay attention to in the code is that we are using the ",Object(i.b)("inlineCode",{parentName:"p"},"IDisposable")," interface.  "),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"public abstract class Transition : IDisposable\n")),Object(i.b)("p",null,"This means we have a Dispose method that we can call manually, or can be called by the garbage collector automatically when there is no reference to a transition object instance. By having this, we can ensure that resources are cleaned up, like the render target."),Object(i.b)("p",null,"The implementation here for the ",Object(i.b)("inlineCode",{parentName:"p"},"IDisposable")," interface is pretty simple.  First we have the following field"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"protected bool _disposed;\n")),Object(i.b)("p",null,"This field indicates if the transition instance has already been disposed of."),Object(i.b)("p",null,"Next we have the ",Object(i.b)("inlineCode",{parentName:"p"},"Dispose()")," and ",Object(i.b)("inlineCode",{parentName:"p"},"Dispose(bool)")," methods."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Handles the disposing of resources used by this instance.\n/// </summary>\n/// <remarks>\n///     For more information on using Dispose and the IDisposable interface\n///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose\n/// </remarks>\npublic void Dispose()\n{\n    Dispose(true);\n    GC.SuppressFinalize(this);\n}\n\n/// <summary>\n///     Handles the disposing of resources used by this instance.\n/// </summary>\n/// <param name="isDisposing">\n///     A value indicating if resources should be disposed.\n/// </param>\n/// <remarks>\n///     For more information on using Dispose and the IDisposable interface\n///     https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/implementing-dispose\n/// </remarks>\nprotected virtual void Dispose(bool isDisposing)\n{\n    if (_disposed)\n    {\n        return;\n    }\n\n    if (isDisposing)\n    {\n        if (RenderTarget != null)\n        {\n            RenderTarget.Dispose();\n            RenderTarget = null;\n        }\n    }\n\n    _disposed = true;\n}\n')),Object(i.b)("p",null,"The first ",Object(i.b)("inlineCode",{parentName:"p"},"Dispose()")," method is the public one. This is the one that we can call when we need to dispose of the instance, or is called by the garbage collector.  The second ",Object(i.b)("inlineCode",{parentName:"p"},"Dispose(bool)")," is where the disposal occurs.  Here, we check if we have already disposed, and if so we just return back.  If not, we then check the value of ",Object(i.b)("inlineCode",{parentName:"p"},"_isDisposing"),", and if ",Object(i.b)("inlineCode",{parentName:"p"},"true"),", we dispose of the render target gracefully."),Object(i.b)("h3",{id:"transitionkind-enum"},"TransitionKind Enum"),Object(i.b)("p",null,"Next, we said before that we needed a way of indicating if we were transitioning ",Object(i.b)("strong",{parentName:"p"},"in")," or ",Object(i.b)("strong",{parentName:"p"},"out"),". This is what the ",Object(i.b)("inlineCode",{parentName:"p"},"TransitionKind")," enum is for."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     Defines a value that indicates the kind of transition.\n/// </summary>\npublic enum TransitionKind\n{\n    /// <summary>\n    ///     Indicates a transition in.\n    /// </summary>\n    In,\n\n    /// <summary>\n    ///     Indicates a transition out.\n    /// </summary>\n    Out\n}\n")),Object(i.b)("p",null,"As far as things go, this is pretty simple.  It defines a value for us that indicates if a transition is transitioning ",Object(i.b)("em",{parentName:"p"},"in")," or ",Object(i.b)("em",{parentName:"p"},"out"),"."),Object(i.b)("h3",{id:"fields"},"Fields"),Object(i.b)("p",null,"Our ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," class only has two fields."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"protected bool _disposed;\nprotected Game1 _game; \n")),Object(i.b)("p",null,"We talked previously about the ",Object(i.b)("inlineCode",{parentName:"p"},"_disposed")," field in the IDisposable section above.  The ",Object(i.b)("inlineCode",{parentName:"p"},"_game")," field is to store a cached reference to the ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," instance, just like we did in the Scene class."),Object(i.b)("h3",{id:"properties"},"Properties"),Object(i.b)("p",null,"The following are the properties of our ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," class."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     Gets a value indicating if this transition is currently transitioning.\n/// </summary>\npublic bool IsTransitioning { get; private set; }\n\n/// <summary>\n///     Gets a value indicating the type of transition this is\n/// </summary>\npublic TransitionKind Kind { get; private set; }\n\n/// <summary>\n///     Gets the total amount of time required for this transition to complete.\n/// </summary>\npublic TimeSpan TransitionTime { get; private set; }\n\n/// <summary>\n///     Gets the total amount of time remaining for the transition to complete.\n/// </summary>\npublic TimeSpan TransitionTimeRemaining { get; private set; }\n\n/// <summary>\n///     Gets a cached reference to the RenderTarget2D instance used by the Scene\n///     this transition is transitioning.\n/// </summary>\npublic RenderTarget2D SourceTexture { get; private set; }\n\n/// <summary>\n///     Gets the RenderTarget2D instance this transition renders to.\n/// </summary>\npublic RenderTarget2D RenderTarget { get; private set; }\n")),Object(i.b)("p",null,"These should all be pretty self explanatory.  "),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"IsTransitioning")," is a value we can set to indicate if the transition has started and is currently in the middle of transitioning.  "),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"Kind")," indicates what ",Object(i.b)("inlineCode",{parentName:"p"},"TransitionKind")," this transition is doing."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"TransitionTime")," is a TimeSpan that indicates the total amount of time the transition should take before it is completed."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"TransitionTimeRemaining")," is a TimeSpan we use as a countdown to indicate how much time left for the transition to complete."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"SourceTexture")," is a reference to the render target of the scene that this transition is transitioning.  We'll manipulate this render target when we draw the transition to create the transition effect."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"RenderTarget")," is the render target that we draw the transition too."),Object(i.b)("h3",{id:"events"},"Events"),Object(i.b)("p",null,"There is only one event in the ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," class."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     Event triggered when the transition has fully completed.\n/// </summary>\npublic event EventHandler TransitionCompleted;\n")),Object(i.b)("p",null,"We will invoke this event when a transition has completed. Anything subscribed to this event can safely assume that the transition is done and it can move on."),Object(i.b)("h3",{id:"constructor"},"Constructor"),Object(i.b)("p",null,"Next, let's take a look at the constructor"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Creates a new Transition instance.\n/// </summary>\n/// <param name="game">\n///     A reference to our Game instance.\n/// </param>\n/// <param name="transitionTime">\n///     The total amount of time the transition will take.\n/// </param>\n/// <param name="kind">\n///     The type of transition.\n/// </param>\npublic Transition(Game1 game, TimeSpan transitionTime, TransitionKind kind)\n{\n    _game = game;\n    TransitionTimeRemaining = TransitionTime = transitionTime;\n    Kind = kind;\n    CreateRenderTarget();\n}\n')),Object(i.b)("p",null,"When creating a new ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," instance, this is the constructor that is called.  It requires a reference to ",Object(i.b)("inlineCode",{parentName:"p"},"Game1"),", a TimeSpan indicating how long the transition will take, and a ",Object(i.b)("inlineCode",{parentName:"p"},"TransitionKind")," value to indicate if this transition is going ",Object(i.b)("em",{parentName:"p"},"in")," or *out."),Object(i.b)("p",null,"After caching these values, we create the RenderTarget for the transition."),Object(i.b)("h3",{id:"startrendertarget"},"Start(RenderTarget)"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Start(RenderTarget)")," method is used to start the transition."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Starts the transition.\n/// </summary>\n/// <param name="sourceTexture">\n///     A reference to the RenderTarget2D instance of the scene being transitioned.\n/// </param>\npublic virtual void Start(RenderTarget2D sourceTexture)\n{\n    SourceTexture = sourceTexture;\n    IsTransitioning = true;\n}\n')),Object(i.b)("p",null,"When ",Object(i.b)("inlineCode",{parentName:"p"},"Start")," is called, we have to pass to it the render target instance of the scene that is being transitioned.  We simply just cache the reference to the render target, then set the ",Object(i.b)("inlineCode",{parentName:"p"},"IsTransitioning")," property to ",Object(i.b)("inlineCode",{parentName:"p"},"true")," to indicate the the transition has started."),Object(i.b)("h3",{id:"updategametime"},"Update(GameTime)"),Object(i.b)("p",null,"Next is the ",Object(i.b)("inlineCode",{parentName:"p"},"Update(GameTime)")," method."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Updates this Transition.\n/// </summary>\n/// <param name="gameTime">\n///     A snapshot of the timing values provided by the MonoGame Framework.\n/// </param>\npublic virtual void Update(GameTime gameTime)\n{\n    TransitionTimeRemaining -= gameTime.ElapsedGameTime;\n\n    if (TransitionTimeRemaining <= TimeSpan.Zero)\n    {\n        IsTransitioning = false;\n\n        if (TransitionCompleted != null)\n        {\n            TransitionCompleted(this, EventArgs.Empty);\n        }\n    }\n}\n')),Object(i.b)("p",null,"This is a pretty simple update method all things considered.  We subtract the amount of time that has elapsed from the ",Object(i.b)("inlineCode",{parentName:"p"},"TransitionTimeRemaining"),".  We then check if the ",Object(i.b)("inlineCode",{parentName:"p"},"TransitionTimeRemaining")," has reached or gone below zero.  If it has, we set ",Object(i.b)("inlineCode",{parentName:"p"},"IsTransitioning")," to false and trigger the ",Object(i.b)("inlineCode",{parentName:"p"},"TransitionCompeted")," event."),Object(i.b)("h3",{id:"beforerenderspritebatch-color"},"BeforeRender(SpriteBatch, Color)"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"BeforeRender(SpriteBatch, Color)")," method will handle setting up the graphics device and the spritebatch to for rendering our transition."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Prepares this transition for rendering.\n/// </summary>\n/// <param name="spriteBatch">\n///     The SpriteBatch instance used for rendering.\n/// </param>\n/// <param name="clearColor">\n///     The color value to use when clearing the backbuffer.\n/// </param>\nprivate void BeginRender(SpriteBatch spriteBatch, Color clearColor)\n{\n    //  Prepare the graphics device.\n    _game.GraphicsDevice.SetRenderTarget(RenderTarget);\n    _game.GraphicsDevice.Clear(clearColor);\n\n    //  Begin the sprite batch.\n    spriteBatch.Begin(blendState: BlendState.AlphaBlend,\n                        samplerState: SamplerState.PointClamp);\n}\n')),Object(i.b)("p",null,"Here we setting the ",Object(i.b)("inlineCode",{parentName:"p"},"GraphicsDevice")," render target to use the transition's render target.  Then we clear the backbuffer using the color provided.  After that we tell the ",Object(i.b)("inlineCode",{parentName:"p"},"SpriteBatch")," instance to begin."),Object(i.b)("h3",{id:"renderspritebatch"},"Render(SpriteBatch)"),Object(i.b)("p",null,"Next is the ",Object(i.b)("inlineCode",{parentName:"p"},"Render(SpriteBatch)")," method."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Renders this transition.\n/// </summary>\n/// <param name="spriteBatch">\n///     The SpriteBatch instance used for rendering.\n/// </param>\nprotected virtual void Render(SpriteBatch spriteBatch) { }\n')),Object(i.b)("p",null,"In this base ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," class, we don't do anything here. Instead it will be up to the class that inherits from ",Object(i.b)("inlineCode",{parentName:"p"},"Transition")," to implement how to render the transition."),Object(i.b)("h3",{id:"endrenderspritebatch"},"EndRender(SpriteBatch)"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"EndRender(SpriteBatch)")," method handles gracefully ending rendering of our transition."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Ends the rendering for this transition.\n/// </summary>\n/// <param name="spriteBatch">\n///     The SpriteBatch instance used for rendering.\n/// </param>\nprivate void EndRender(SpriteBatch spriteBatch)\n{\n    //  End the sprite batch.\n    spriteBatch.End();\n\n    _game.GraphicsDevice.SetRenderTarget(null);\n}\n')),Object(i.b)("p",null,"It does this by simply ending the spritebatch and then setting the render target of the graphics device to null."),Object(i.b)("h3",{id:"drawspritebatch-color"},"Draw(SpriteBatch, Color)"),Object(i.b)("p",null,"This is where all of the above rendering methods get called."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Draws the Transition to its render target.\n/// </summary>\n/// <param name="spriteBatch">\n///     The SpriteBatch instance used for rendering.\n/// </param>\n/// <param name="clearColor">\n///     The color value to use when clearing the backbuffer.\n/// </param>\npublic void Draw(SpriteBatch spriteBatch, Color clearColor)\n{\n    BeginRender(spriteBatch, clearColor);\n    Render(spriteBatch);\n    EndRender(spriteBatch);\n}\n')),Object(i.b)("p",null,"We pass in the ",Object(i.b)("inlineCode",{parentName:"p"},"SpriteBatch")," instance used for drawing and a ",Object(i.b)("inlineCode",{parentName:"p"},"Color")," to clear the backbuffer with, then call the ",Object(i.b)("inlineCode",{parentName:"p"},"BeginRender(SpriteBatch, Color)"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Render(SpriteBatch)"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"EndRender(SpriteBatch)")," methods in that order."),Object(i.b)("h3",{id:"handlegraphicscreated"},"HandleGraphicsCreated()"),Object(i.b)("p",null,"Just like in our ",Object(i.b)("inlineCode",{parentName:"p"},"Scene")," class, we have a ",Object(i.b)("inlineCode",{parentName:"p"},"HandleGraphicsCreated()")," method that can be called whenever the graphics device is created."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     When the graphics device is created, no contents are in VRAM, so we need\n///     to ensure that the RenderTarget is created.\n/// </summary>\npublic void HandleGraphicsCreated()\n{\n    CreateRenderTarget();\n}\n")),Object(i.b)("p",null,"When this happens, we tell the transition instance to create its render target."),Object(i.b)("h3",{id:"handlegraphicsreset"},"HandleGraphicsReset()"),Object(i.b)("p",null,"Again, just like in our ",Object(i.b)("inlineCode",{parentName:"p"},"Scene")," class, we have a ",Object(i.b)("inlineCode",{parentName:"p"},"HandleGraphicsReset()")," method that can be called whenever the graphics device is reset"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     When the graphics device is reset, all contents of VRAM are discarded. When\n///     this happens, we need to create things like RenderTarget instances.\n/// </summary>\npublic void HandleGraphicsReset()\n{\n    CreateRenderTarget();\n}\n")),Object(i.b)("p",null,"When this happens, we tell the transition instance to create its render target."),Object(i.b)("h3",{id:"createrendertarget"},"CreateRenderTarget()"),Object(i.b)("p",null,"Finally, we have the ",Object(i.b)("inlineCode",{parentName:"p"},"CreateRenderTarget()")," method."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     Creates a new RenderTarget instance for this Transition.\n/// </summary>\nprivate void CreateRenderTarget()\n{\n    int width = _game.GraphicsDevice.PresentationParameters.BackBufferWidth;\n    int height = _game.GraphicsDevice.PresentationParameters.BackBufferHeight;\n\n    //  If the RenderTarget instance has already been created previously but has yet\n    //  to be disposed of properly, dispose of the instance before setting a new one.\n    if (RenderTarget != null && !RenderTarget.IsDisposed)\n    {\n        RenderTarget.Dispose();\n    }\n\n    RenderTarget = new RenderTarget2D(_game.GraphicsDevice, width, height);\n}\n")),Object(i.b)("p",null,"Just like with the ",Object(i.b)("inlineCode",{parentName:"p"},"Scene")," class, we first check if the render target needs to be disposed of, and if so, we dispose it. Then we create the instance."))}p.isMDXComponent=!0}}]);