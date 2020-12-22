(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{109:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var o=n(0),r=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},h=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(n),h=o,b=d["".concat(a,".").concat(h)]||d[h]||p[h]||i;return n?r.a.createElement(b,s(s({ref:t},l),{},{components:n})):r.a.createElement(b,s({ref:t},l))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},64:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var o=n(3),r=n(7),i=(n(0),n(109)),a={id:"tutorials-scene-transitions-introduction",title:"Introduction",hide_title:!1,hide_table_of_contents:!1,sidebar_label:"Introduction",custom_edit_url:null,keywords:["monogame tutorial","monogame framework","monogame","tutorial","scene transition","scene","scenes"],description:"A tutorial on create scene transition effects in a MonoGame project.",image:null,slug:"/tutorials/scene-transitions/introduction"},s={unversionedId:"tutorials/scene-transitions/tutorials-scene-transitions-introduction",id:"tutorials/scene-transitions/tutorials-scene-transitions-introduction",isDocsHomePage:!1,title:"Introduction",description:"A tutorial on create scene transition effects in a MonoGame project.",source:"@site/docs\\tutorials\\scene-transitions\\introduction.md",slug:"/tutorials/scene-transitions/introduction",permalink:"/docs/tutorials/scene-transitions/introduction",editUrl:null,version:"current",sidebar_label:"Introduction",sidebar:"tutorials",previous:{title:"Conclusion",permalink:"/docs/tutorials/scenes/conclusion"},next:{title:"RenderTarget2D Overview",permalink:"/docs/tutorials/scene-transitions/rendertarget-overview"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Tutorial Structure",id:"tutorial-structure",children:[{value:"Desktop Users",id:"desktop-users",children:[]},{value:"Mobile Users",id:"mobile-users",children:[]}]},{value:"Credits",id:"credits",children:[]},{value:"Code License",id:"code-license",children:[]}],l={rightToc:c};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"In the previous tutorial, we went through the steps of adding a ",Object(i.b)("inlineCode",{parentName:"p"},"Scene")," class and implementing it in to our ",Object(i.b)("inlineCode",{parentName:"p"},"Game1")," class. With this, we were able to change from one scene to another using the ",Object(i.b)("inlineCode",{parentName:"p"},"ChangeScene(Scene)")," method we created.  However, when we changed scenes, visually, it was less than impressive. One scene pops out and the new one pops in almost instantly."),Object(i.b)("p",null,"In this tutorial, we're going to fix that. We're going to adjust what we did previous so that we can have different effects to transition our scenes out and in.  "),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("p",null,"The following are the prerequisites if you plan to follow along with this tutorial in code."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"MonoGame 3.8",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"The code has not been tested against ",Object(i.b)("strong",{parentName:"li"},"MonoGame 3.7.1"),".  It should still function the same, however no guarantees are given."))),Object(i.b)("li",{parentName:"ul"},"Completion of the previous ",Object(i.b)("a",Object(o.a)({parentName:"li"},{href:"../scenes/introduction"}),"Scenes")," tutorial.",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"This tutorial builds off the code that was created in the previous tutorial series.")))),Object(i.b)("h2",{id:"tutorial-structure"},"Tutorial Structure"),Object(i.b)("p",null,"Due to the size of this tutorial, I have opted to break it down into smaller pages.  At the bottom of each page in this tutorial, you'll find a button to click which will take you to the next page in the series, or the previous page if you wish to go back one."),Object(i.b)("h3",{id:"desktop-users"},"Desktop Users"),Object(i.b)("p",null,"Users using a desktop or larger screen device can use the side bar on the left to jump to different pages within the tutorial.  There is also a table of contents on the left of each page if you wish to jump to a difference section in a page."),Object(i.b)("h3",{id:"mobile-users"},"Mobile Users"),Object(i.b)("p",null,"users using a mobile device can use the side bar that would normally be on the left by clicking the menu button positioned in the bottom right corner of your screen.  Due to the limited screen real estate of a mobile device, no table of contents for each page will appear. "),Object(i.b)("h2",{id:"credits"},"Credits"),Object(i.b)("p",null,"Before we get started, I would like to acknowledge ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.twitter.com/PorbleG"}),"PorbleG"),".  Some time ago, I reached out to them regarding the scene transition effects they were using in their game ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://warkandwimble.com"}),"Wark & Wimble"),".  They were kind enough to provide me with some source code examples of the transition effects they used in game.  "),Object(i.b)("p",null,"With permission, I have created this tutorial series to show how anyone can implement them into a MonoGame game project."),Object(i.b)("h2",{id:"code-license"},"Code License"),Object(i.b)("p",null,"All code written in this ",Object(i.b)("strong",{parentName:"p"},"Scene Transitions")," tutorial series, unless otherwise stated, is licensed under The UnLicense.  This license extends to only the code written, not the tutorial documentation.  The license text is as follows:"),Object(i.b)("pre",null,Object(i.b)("code",Object(o.a)({parentName:"pre"},{}),'This is free and unencumbered software released into the public domain.\n\nAnyone is free to copy, modify, publish, use, compile, sell, or\ndistribute this software, either in source code form or as a compiled\nbinary, for any purpose, commercial or non-commercial, and by any\nmeans.\n\nIn jurisdictions that recognize copyright laws, the author or authors\nof this software dedicate any and all copyright interest in the\nsoftware to the public domain. We make this dedication for the benefit\nof the public at large and to the detriment of our heirs and\nsuccessors. We intend this dedication to be an overt act of\nrelinquishment in perpetuity of all present and future rights to this\nsoftware under copyright law.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\nIN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR\nOTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\nARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\nOTHER DEALINGS IN THE SOFTWARE.\n\nFor more information, please refer to <http://unlicense.org/>\n')),Object(i.b)("p",null,"With all of that out of the way, let's jump to the next page in the tutorial."))}u.isMDXComponent=!0}}]);