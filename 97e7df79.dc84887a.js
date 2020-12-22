(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{109:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return h}));var a=n(0),c=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,c=function(e,t){if(null==e)return{};var n,a,c={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(c[n]=e[n]);return c}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var l=c.a.createContext({}),d=function(e){var t=c.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},b=function(e){var t=d(e.components);return c.a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return c.a.createElement(c.a.Fragment,{},t)}},p=c.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=d(n),p=a,h=b["".concat(o,".").concat(p)]||b[p]||m[p]||i;return n?c.a.createElement(h,r(r({ref:t},l),{},{components:n})):c.a.createElement(h,r({ref:t},l))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=p;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:a,o[1]=r;for(var l=2;l<i;l++)o[l]=n[l];return c.a.createElement.apply(null,o)}return c.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return r})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return d}));var a=n(3),c=n(7),i=(n(0),n(109)),o={id:"updating-game1",title:"Scenes: Updating Game1",hide_title:!0,hide_table_of_contents:!1,sidebar_label:"Updating Game1",custom_edit_url:null,keywords:["monogame tutorial","monogame framework","monogame","tutorial","scene transition","scene","scenes"],description:"A tutorial on creating scenes in a MonoGame project.",image:"/img/mgb_cookie.svg",slug:"/tutorials/monogame-3-8/scenes/updating-game1"},r={unversionedId:"tutorials/monogame-3-8/scenes/updating-game1",id:"tutorials/monogame-3-8/scenes/updating-game1",isDocsHomePage:!1,title:"Scenes: Updating Game1",description:"A tutorial on creating scenes in a MonoGame project.",source:"@site/docs\\tutorials\\monogame-3-8\\scenes\\04-updating-game1.md",slug:"/tutorials/monogame-3-8/scenes/updating-game1",permalink:"/docs/tutorials/monogame-3-8/scenes/updating-game1",editUrl:null,version:"current",lastUpdatedBy:"Christopher Whitley",lastUpdatedAt:1608636223,sidebar_label:"Updating Game1",sidebar:"tutorials",previous:{title:"Scenes: The Scene Class",permalink:"/docs/tutorials/monogame-3-8/scenes/scene-class"},next:{title:"Scenes: Testing Our Setup",permalink:"/docs/tutorials/monogame-3-8/scenes/testing-our-setup"}},s=[{value:"Tracking Active and Next Scene",id:"tracking-active-and-next-scene",children:[]},{value:"Updating the Active Scene",id:"updating-the-active-scene",children:[]},{value:"Drawing the Active Scene",id:"drawing-the-active-scene",children:[]},{value:"Changing Scenes",id:"changing-scenes",children:[]}],l={rightToc:s};function d(e){var t=e.components,n=Object(c.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"updating-game1"},"Updating Game1"),Object(i.b)("p",null,"Now that we have the ",Object(i.b)("inlineCode",{parentName:"p"},"Scene")," class completed, we need to up ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," so it can properly handle scenes.  The following is a list of things that will need to be handled"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Keeping track of what scene is currently the active scene and which scene, if any, is the next scene."),Object(i.b)("li",{parentName:"ul"},"Updating the active scene."),Object(i.b)("li",{parentName:"ul"},"Drawing the active scene."),Object(i.b)("li",{parentName:"ul"},"Ability to change from one scene to another.")),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"In the next sections, we'll go over implementing each of the above points into our ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," class. So open up ",Object(i.b)("strong",{parentName:"p"},"Game1.cs")," class file in your project and let's dive in."))),Object(i.b)("h3",{id:"tracking-active-and-next-scene"},"Tracking Active and Next Scene"),Object(i.b)("p",null,"We can make use of two instance field to keep track of which scene is the ",Object(i.b)("strong",{parentName:"p"},"active")," scene and, when we need to change scenes, which is the ",Object(i.b)("strong",{parentName:"p"},"next")," scene to switch to."),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Add the following fields to ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"//  The current scene that is active.\nprivate Scene _activeScene;\n\n//  The next scene to switch to.\nprivate Scene _nextScene;\n")))),Object(i.b)("p",null,"Anytime we need to update, draw, or reference the current active scene for any reason, we'll use the ",Object(i.b)("inlineCode",{parentName:"p"},"_activeScene")," field.  The ",Object(i.b)("inlineCode",{parentName:"p"},"_nextScene")," field will be used to store a reference to the next scene to switch to whenever we need to switch scenes. This field should only hold a value when there is a scene to switch to. Once the switch has occurred, it will be set to ",Object(i.b)("inlineCode",{parentName:"p"},"null"),"."),Object(i.b)("h3",{id:"updating-the-active-scene"},"Updating the Active Scene"),Object(i.b)("p",null,"Next, we need to ensure that we are updating the active scene.  "),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Find the ",Object(i.b)("inlineCode",{parentName:"p"},"Update(GameTime)")," method in ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," class and change it to the following"),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"protected override void Update(GameTime gameTime)\n{\n    //  If there is an active scene, update it.\n    if(_activeScene != null)\n    {\n        _activeScene.Update(gameTime);\n    }\n\n    base.Update(gameTime);\n}\n")))),Object(i.b)("p",null,"So far, the ",Object(i.b)("inlineCode",{parentName:"p"},"Update(GameTime)")," logic is pretty simple.  It checks if there is a current active scene, and if so, updates it."),Object(i.b)("h3",{id:"drawing-the-active-scene"},"Drawing the Active Scene"),Object(i.b)("p",null,"Next, we need to ensure that we are drawing the active scene to the screen."),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Find the ",Object(i.b)("inlineCode",{parentName:"p"},"Draw(SpriteBatch, GameTime)")," method in the ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," class and change it to the following"),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"protected override void Draw(GameTime gameTime)\n{\n    //  If there is an active scene, draw it.\n    if(_activeScene != null)\n    {\n        _activeScene.BeforeDraw(_spriteBatch, Color.Black);\n        _activeScene.Draw(_spriteBatch);\n        _activeScene.AfterDraw(_spriteBatch);\n    }\n\n    base.Draw(gameTime);\n}\n")))),Object(i.b)("p",null,"This will handle calling ",Object(i.b)("inlineCode",{parentName:"p"},"BeforeDraw(SpriteBatch, Color)"),", ",Object(i.b)("inlineCode",{parentName:"p"},"Draw(SpriteBatch)"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"AfterDraw(SpriteBatch)"),", in that order, for the active scene."),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"The default Game1 class clears the backbuffer using good old ",Object(i.b)("inlineCode",{parentName:"p"},"Color.CornflowerBlue")," by default. Here, I'm passing instead ",Object(i.b)("inlineCode",{parentName:"p"},"Color.Black")," as the color to clear the backbuffer with.  You can use whatever color you'd like."))),Object(i.b)("h3",{id:"changing-scenes"},"Changing Scenes"),Object(i.b)("p",null,"To change scenes, we're going to first create a method to handle setting what the next scene should be. "),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Add the following method to the ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," class."),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),'/// <summary>\n///     Sets the next scene to switch to.\n/// </summary>\n/// <param name="next">\n///     The Scene instance to switch to.\n/// </param>\npublic void ChangeScene(Scene next)\n{\n    //  Only set the _nextScene value if it is not the\n    //  same instance as the _activeScene.\n    if(_activeScene != next)\n    {\n        _nextScene = next;\n    }\n}\n')))),Object(i.b)("p",null,"As far as things go, this is pretty simple.  It detects if the scene we are switching to is the same instance as the current active scene. Only if they are different instances will if set the value of ",Object(i.b)("inlineCode",{parentName:"p"},"_nextScene")),Object(i.b)("p",null,"Next we need to add an additional method to handle the actual transitioning from one scene to the next. "),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Add the following method to the ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," class."),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"/// <summary>\n///     Handles transitioning gracefully from one scene to\n///     the next.\n/// </summary>\nprivate void TransitionScene()\n{\n    if(_activeScene != null)\n    {\n        _activeScene.UnloadContent();\n    }\n\n    //  Perform a garbage collection to ensure memory is cleared\n    GC.Collect();\n\n    //  Set the active scene.\n    _activeScene = _nextScene;\n\n    //  Null the next scene value\n    _nextScene = null;\n\n    //  If the active scene isn't null, initialize it.\n    //  Remember, the Initialize method also calls the LoadContent method\n    if(_activeScene != null)\n    {\n        _activeScene.Initialize();\n    }\n}\n")))),Object(i.b)("p",null,"A few things are happening here. First, if ",Object(i.b)("inlineCode",{parentName:"p"},"_activeScene")," isn't ",Object(i.b)("inlineCode",{parentName:"p"},"null"),", we tell it to unload all content managed by that scene by calling the ",Object(i.b)("inlineCode",{parentName:"p"},"Unload()")," method. We no longer need it, so free up the memory.  Next, we perform a manual garbage collection to ensure the memory is freed up.  Then we set the ",Object(i.b)("inlineCode",{parentName:"p"},"_activeScene")," to the ",Object(i.b)("inlineCode",{parentName:"p"},"_nextScene"),", and, if it isn't ",Object(i.b)("inlineCode",{parentName:"p"},"null"),", we call the ",Object(i.b)("inlineCode",{parentName:"p"},"Initialize")," method."),Object(i.b)("p",null,"Finally, we need to do one last change in the Game1 ",Object(i.b)("inlineCode",{parentName:"p"},"Update(GameTime)")," method.  "),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"Perform the Following")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Go back to the ",Object(i.b)("inlineCode",{parentName:"p"},"Update(GameTime)")," method and update it to the following."),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-csharp"}),"protected override void Update(GameTime gameTime)\n{\n    //  If there is a next scene waiting to be switched to\n    //  transition to that scene.\n    if (_nextScene != null)\n    {\n        TransitionScene();\n    }\n\n    //  If there is an active scene, update it.\n    if (_activeScene != null)\n    {\n        _activeScene.Update(gameTime);\n    }\n\n    base.Update(gameTime);\n}\n")))),Object(i.b)("p",null,"With this change, we detect first if there is a next scene to switch to, and if so, we perform the scene transitions. Now you may be asking, ",Object(i.b)("em",{parentName:"p"},"why do we need to transition scene here? Why didn't we just perform the transition inside the ",Object(i.b)("inlineCode",{parentName:"em"},"ChangeScene(Scene)")," method all at once?")),Object(i.b)("p",null,"Well, we could have, absolutely. However, remember when we end one scene, we unload all of the content managed by the scene. Also, most likely, the call to ",Object(i.b)("inlineCode",{parentName:"p"},"ChangeScene(Scene)")," will be performed from within a scene itself.  So by telling our game which scene to switch to, and then performing the actual transition during the next update frame, we can be sure no issues occur with any references to the current scene's properties, objects, etc."),Object(i.b)("p",null,"(actually, I'm probably talking out of my ass with that last paragraph, but this is generally the structure used.)"),Object(i.b)("p",null,"On the next page, we're going to test our setup."))}d.isMDXComponent=!0}}]);