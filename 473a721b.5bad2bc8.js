(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{113:function(e,a,t){"use strict";var l=t(0),r=t.n(l),o=t(112);a.a=function({game:e}){return r.a.createElement("div",{class:"block-container"},r.a.createElement("div",{class:"block"},r.a.createElement("div",{class:"block-platforms"},e&&e.platforms.length>0&&e.platforms.map(((e,a)=>r.a.createElement("div",{class:"platform"},r.a.createElement("a",{href:e.url,target:"_blank"},r.a.createElement("img",{className:"",src:Object(o.a)("img/badges/"+e.name+"-badge-dark.png")})),"\xa0"))))))}},117:function(e,a,t){"use strict";var l=t(0),r=t.n(l),o=t(110),c=t(113);a.a=function({game:e}){const a=0==e.trailer.length?"no-trailer":"has-trailer";return r.a.createElement("div",{className:Object(o.a)("block",e.slug+"-cover-image")},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"ml-auto mr-auto col col--6 "},r.a.createElement("div",{className:Object(o.a)("block-trailer","img-thumbnail",a)},r.a.createElement("div",{className:"embed-responsive embed-responsive-16by9"},e&&e.trailer&&r.a.createElement("iframe",{width:"560",height:"315",src:e.trailer,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0}))))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col center-div"},r.a.createElement(c.a,{game:e}))))}},118:function(e,a,t){"use strict";var l=t(0),r=t.n(l);a.a=function({game:e}){return r.a.createElement("div",{class:"block-container"},r.a.createElement("div",{class:"block"},r.a.createElement("h3",{class:"block-header"},e.name),r.a.createElement("hr",null),r.a.createElement("div",{class:"block-description"},e&&e.description.length>0&&e.description.map(((e,a)=>r.a.createElement("p",null,e))))))}},144:function(e,a,t){"use strict";a.a={name:"Ophidian",slug:"ophidian",trailer:"https://www.youtube.com/embed/OHsSIbKU-SQ",imageCover:"/img/games/ophidian/cover.png",imagePreview:"/img/games/ophidian/game_preview.png",shortDescription:"Arcade puzzle game insprited by classic snake gameplay.",description:["Ophidian is an arcade puzzle game inspired by a great classic. In Ophidian, players navigate the play area to consume food blocks, while avoiding any obstacles set in the way. Featuring multiple game modes for players to enjoy.","Arcade mode features a classic style of game play with newly added features. Play solo to eat as much food as you can to get a high score, or go head to head locally with up to four players total. Try out trash mode, where each time you eat a food block, a wall block takes its place. Or challenge yourself in Ghost mode, where each level pits you against the ghost of your previous level.","Challenge mode features 100 puzzles designed for players to navigate the ophidian through in order to consume all of the food in each level. Puzzles include various specials blocks to interact with including wall blocks, portal blocks, bounce blocks, bomb blocks, and more. Complete each challenge, or replay them to go for a faster record time."],platforms:[{name:"steam",url:"https://store.steampowered.com/app/697710/Ophidian/"}]}},76:function(e,a,t){"use strict";t.r(a);var l=t(0),r=t.n(l),o=t(116),c=t(117),i=t(118),s=(t(113),t(144));a.default=function(){return r.a.createElement(o.a,{title:s.a.name,description:s.a.shortDescription},r.a.createElement("div",{id:"game"},r.a.createElement(c.a,{game:s.a}),r.a.createElement(i.a,{game:s.a})))}}}]);