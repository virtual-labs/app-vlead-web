import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as addAttribute, u as unescapeHTML, d as renderComponent, F as Fragment, e as renderSlot, f as renderHead, _ as __astro_tag_component__ } from '../astro.d9c4abc7.mjs';
/* empty css                           *//* empty css                           */import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { google } from 'googleapis';
/* empty css                                 */import { ReactMarkdown as ReactMarkdown$1 } from 'react-markdown/lib/react-markdown.js';
import rehypeRaw from 'rehype-raw';
import remarkHtml from 'remark-html';
import remarkSlug from 'remark-slug';
import remarkRehype$1 from 'remark-rehype/lib/index.js';
import remarkToc from 'remark-toc';
/* empty css                              *//* empty css                                 *//* empty css                              */import ReactMarkdown from 'react-markdown';
import remarkRehype from 'remark-rehype';
/* empty css                              */import AOS from 'aos';
/* empty css                              *//* empty css                              *//* empty css                            */import { optimize } from 'svgo';
/* empty css                         *//* empty css                         *//* empty css                         */
const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$h = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/node_modules/astro-icon/lib/Icon.astro");

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$g = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead($$result)}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>
    ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}
</svg>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/node_modules/astro-icon/lib/Spritesheet.astro");

const $$Astro$f = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}
${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/node_modules/astro-icon/lib/SpriteProvider.astro");

const $$Astro$e = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead($$result)}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>
    ${title ? renderTemplate`<title>${title}</title>` : ""}
    <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use>
</svg>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/node_modules/astro-icon/lib/Sprite.astro");

Object.assign($$Sprite, { Provider: $$SpriteProvider });

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$d = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Navbar;
  var id = "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI";
  var gid = "405192847";
  let users = 0, Views = 0;
  var url = "https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?tqx=out:json&tq&gid=" + gid;
  try {
    const res = await fetch(url);
    const data = await res.text();
    users = JSON.parse(data.substring(47).slice(0, -2)).table.rows[0].c[2].f;
    Views = JSON.parse(data.substring(47).slice(0, -2)).table.rows[1].c[2].f;
  } catch (err) {
  }
  fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items").then((resp) => resp.json()).then((data) => {
  });
  return renderTemplate(_a$2 || (_a$2 = __template$2(['<!-- <script src="./../../public/script.js"><\/script> -->\n\n\n\n<!-- <head>\n	<link\n			rel="stylesheet"\n			href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"\n		/>\n</head> -->', '<nav class="navbar theme is-fixed-top has-shadow px-0 astro-5BLMO7YK" role="navigation" aria-label="main navigation">\n	<div class="navbar-brand astro-5BLMO7YK">\n		<!-- <a class="navbar-item py-0 px-0 " href="https://bulma.io">\n		<img	src="https://cdn.vlabs.ac.in/logo/iiit-small.png" style="max-height:70px " class="py-2 px-2"/>\n		</a> -->\n		<a class="navbar-item py-0 px-0 ml-5 astro-5BLMO7YK" href="/">\n			<img src="https://cdn.vlabs.ac.in/logo/vlead-small.png" loading="lazy" style="max-height:70px " class="py-2 px-2 astro-5BLMO7YK">\n		</a>\n		<div class="navbar-item astro-5BLMO7YK" id="theme">\n			<div class="theme-toggle astro-5BLMO7YK">\n				<span class="icon-theme mx-auto astro-5BLMO7YK">\n					', "\n					", '\n				</span>\n			</div>\n		</div>\n		<div class="navbar-item astro-5BLMO7YK">\n			<div class="search-bar astro-5BLMO7YK" id="search-bar-container">\n				<!-- <form>\n				<input type="search" class="input search-input is-rounded">\n				<input type="submit" class="button search-submit" value="" id="search-submit">\n				<span class="icon-search" id="search-button">\n					<Icon name="ic:outline-search"/>\n				</span>\n				</form> -->\n				<form id="form" class="astro-5BLMO7YK">\n					<input type="search" placeholder="Search for experiments" class="input search-input is-rounded astro-5BLMO7YK" id="search_value">\n				<a href="/experiments" class="button search-submit astro-5BLMO7YK" id="search-submit"></a>\n					<span class="icon-search astro-5BLMO7YK" id="search-button">\n					', '\n					</span>\n					</form>\n			</div>\n		</div>\n		<a role="button" id="burger" class="navbar-burger is-left astro-5BLMO7YK" aria-label="menu" aria-expanded="false" data-target="navbarMain">\n			<span aria-hidden="true" class="astro-5BLMO7YK"></span>\n			<span aria-hidden="true" class="astro-5BLMO7YK"></span>\n			<span aria-hidden="true" class="astro-5BLMO7YK"></span>\n		</a>\n	</div>\n	<div id="navbarMain" class="navbar-menu is-boxed astro-5BLMO7YK">\n	<div class="navbar-start astro-5BLMO7YK">\n	</div>\n		<div class="navbar-end astro-5BLMO7YK">\n			<div class="navbar-item has-dropdown is-hoverable is-hidden astro-5BLMO7YK" id="choose-drop">\n				<a class="navbar-link is-size-6 astro-5BLMO7YK">\n						Choose a Role\n				</a>\n\n				<div class="navbar-dropdown astro-5BLMO7YK">\n					<a class="navbar-item theme astro-5BLMO7YK" id="drop-learner">\n						Learner\n					</a>\n					<hr class="navbar-divider astro-5BLMO7YK">\n					<a class="navbar-item theme astro-5BLMO7YK" id="drop-educator">\n						Educator\n					</a>\n					<hr class="navbar-divider astro-5BLMO7YK">\n					<a class="navbar-item theme astro-5BLMO7YK" id="drop-creator">\n						Creator\n					</a>\n				</div>\n				</div>\n				<a class="navbar-item is-size-6 is-hidden astro-5BLMO7YK" id="create" href="/create/">\n						Create Experiment\n					</a>\n					<a class="navbar-item is-size-6 is-hidden astro-5BLMO7YK" id="outreach" href="/outreach/">\n						Outreach\n					</a>\n					<a class="navbar-item is-size-6 is-hidden astro-5BLMO7YK" id="learning" href="/experiments">\n						Start Learning\n					</a>\n				', '\n				<!-- <div class="flashing"> -->\n				<a class="navbar-item is-size-6 astro-5BLMO7YK" href="/analytics/">\n						Analytics\n				</a>\n		<!-- </div> -->\n			<a class="navbar-item is-size-5 astro-5BLMO7YK">\n				<strong class="astro-5BLMO7YK">\n					Users: ', '\n				</strong>\n			</a>\n			<a class="navbar-item is-size-5 astro-5BLMO7YK">\n				<strong class="astro-5BLMO7YK">\n					Views: ', '\n				</strong>\n			</a>\n			</div>\n			</div>\n	<!-- <div class="buttons-right">\n		<div class="searchBox">\n			<input class="searchText" type="text" placeholder="Search...">\n			<a href="#" class="searchBtn"><Icon name="ic:outline-search" width="35px"/></a>\n		</div> \n		<button class="navbutton">Create Experiment</button>\n		<button class="navbutton">Teaching</button>\n		<button class="navbutton">Start Learning</button>\n		<button class="navbutton" id="stats">Analytics&nbsp&nbsp</button>\n		<p class="users_display">Users:{users}&nbsp</p>\n		<p class="users_display">Views:{Views}&nbsp</p>\n	</div> -->\n	<!-- </div> -->\n</nav>'])), maybeRenderHead($$result), renderComponent($$result, "Icon", $$Icon, { "id": "icon-theme-light", "name": "ph:sun-bold", "class": "astro-5BLMO7YK" }), renderComponent($$result, "Icon", $$Icon, { "id": "icon-theme-dark", "style": "display:none;", "name": "ph:moon-fill", "class": "astro-5BLMO7YK" }), renderComponent($$result, "Icon", $$Icon, { "name": "ic:outline-search", "class": "astro-5BLMO7YK" }), renderComponent($$result, "Roles", null, { "client:only": true, "client:component-hydration": "only", "class": "astro-5BLMO7YK", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/role", "client:component-export": "default" }), users, Views);
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Navbar.astro");

const address = "Engineering and Architecture Division : Room No:B6-204, Vindhya C6, VLEAD, IIIT-H, Gachibowli, Hyderabad - 500032";
const contact = {
	General_Information: "011-64674687",
	DevelopmentandOutreach: "+91-9177792945",
	Email: "support@vlabs.ac.in"
};
const Follow = [
	{
		social: "facebook",
		logo: "https://vlead.vlabs.ac.in/static/8f5ce27564945d2c9a10ef827549a78c/d689f/facebook.webp",
		link: "https://www.facebook.com/VLabsIITDelhi/"
	},
	{
		social: "twitter",
		logo: "https://vlead.vlabs.ac.in/static/0251d8ee95aa6d1f3400faa3b46b4bcf/d689f/twitter.webp",
		link: "https://twitter.com/TheVirtualLabs"
	},
	{
		social: "YT",
		logo: "https://vlead.vlabs.ac.in/static/636a36cd46f7b4e5de659e7cb8ccf5a2/416c3/youtube.webp",
		link: "https://www.youtube.com/watch?v=asxRaOgk6a0"
	},
	{
		social: "LinkedIn",
		logo: "https://vlead.vlabs.ac.in/static/fd0d5546fdbdc85c76c4372a0d51f1bc/d689f/linkedin.webp",
		link: "https://www.linkedin.com/in/virtual-labs-008ba9136"
	}
];
const aboutus = "Virtual Labs, a mission mode MHRD project under NMEICT, provides free, laboratory learning experience to students through remote experimentation. Free Workshops, are conducted and nodal centers are setup to partner with institutes of the Virtual Labs consortium for the adoption of Virtual Labs. To keep in pace with growing needs of students, experiments across domains are conceptualized, aligned and built using cutting-edge open source technologies. State of the art digital classroom is available for streaming video lectures to complement Virtual Lab experiments.";
const all$1 = {
	address: address,
	contact: contact,
	Follow: Follow,
	aboutus: aboutus
};

const $$Astro$c = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`<!-- <hr class="mb-1" /> -->${maybeRenderHead($$result)}<div class="footer-class has-text-white astro-SZ7XMLTE">
<div class="columns is-mobile  astro-SZ7XMLTE">
  <div class="column px-5 astro-SZ7XMLTE">
    <p class="is-size-4 has-text-centered py-0 astro-SZ7XMLTE">Address</p>
    <hr class="my-1 m-auto astro-SZ7XMLTE" style="width: 75%; ">
    <p class="is-size-6 py-3 has-text-centered astro-SZ7XMLTE">
      ${all$1.address}
    </p>
  </div>
  <div class="column px-5 astro-SZ7XMLTE">
    <p class="is-size-4 has-text-centered py-0 astro-SZ7XMLTE">Contact</p>
    <hr class="my-1 m-auto astro-SZ7XMLTE" style="width: 75%; ">
    <p class="is-size-6 py-3 has-text-centered astro-SZ7XMLTE">
      General Information : ${all$1.contact.General_Information}<br class="astro-SZ7XMLTE">
      Development/Outreach : ${all$1.contact.DevelopmentandOutreach}<br class="astro-SZ7XMLTE">
      Email: ${all$1.contact.Email}
    </p>
  </div>
  <div class="column px-5 astro-SZ7XMLTE">
    <p class="is-size-4 has-text-centered py-0 astro-SZ7XMLTE">Follow Us</p>
    <hr class="my-1 m-auto astro-SZ7XMLTE" style="width: 75%; ">
    <div class="is-flex is-justify-content-space-evenly py-5 astro-SZ7XMLTE">
      ${all$1.Follow.map((item) => {
    return renderTemplate`<a${addAttribute(item.link, "href")} class="astro-SZ7XMLTE">
              <img height="50px" width="50px"${addAttribute(item.logo, "src")}${addAttribute(item.social, "alt")} class="astro-SZ7XMLTE">
            </a>`;
  })}
    </div>
  </div>
</div>
<div class="column px-5 astro-SZ7XMLTE">
  <p class="is-size-4 has-text-centered py-0 astro-SZ7XMLTE">About Us</p>
  <hr class="my-1 m-auto astro-SZ7XMLTE" style="width: 75%; ">
  <p class="is-size-6 py-3 has-text-centered astro-SZ7XMLTE">
    ${all$1.aboutus}
  </p>
</div>
</div>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Footer.astro");

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$b = createAstro();
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Base;
  const { title } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<html class="astro-5HCE7SGA">\n	<head>\n		<title>', '</title>\n		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">\n		<link rel="stylesheet" href="src/css/theme.css">\n		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">\n	<script type="text/javascript" src="../../app.js"><\/script>', '</head>\n	\n	<body class="astro-5HCE7SGA">\n		<!-- <canvas id="cnv"> -->\n		<div class="about_box theme astro-5HCE7SGA">\n			  ', "\n			  ", "\n		  ", "\n		</div>\n	<!-- </canvas> -->\n	</body></html>"])), title, renderHead($$result), renderComponent($$result, "Navbar", $$Navbar, { "class": "astro-5HCE7SGA" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "class": "astro-5HCE7SGA" }));
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/layouts/Base.astro");

const $$Astro$a = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Card;
  const { href, title, body, img } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<li class="link-card theme astro-DOHJNAO5">
  <a${addAttribute(href, "href")} class="has-text-centered p-1 astro-DOHJNAO5">
    <h2 class="astro-DOHJNAO5">
      ${title}
      <span class="astro-DOHJNAO5">&rarr;</span>
    </h2>
    <img height="250" width="250"${addAttribute(img, "src")} alt="image" class="astro-DOHJNAO5">
    <p class="astro-DOHJNAO5">
      ${body}
    </p>
  </a>
</li>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Card.astro");

const $$Astro$9 = createAstro();
const $$Role = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Role;
  return renderTemplate`

${maybeRenderHead($$result)}<div class="comp-container text theme astro-YWONBOWH">
	<div class="level astro-YWONBOWH">
		<div class="level-item role-title my-6 mx-auto astro-YWONBOWH">
			<h1 class="has-text-weight-semibold astro-YWONBOWH">
			 Choose your role
			</h1>
		</div>
	</div>
	<div class="uniform columns is-centered content-container m-auto astro-YWONBOWH">
		<div class="column is-6 plaintext px-5 py-0 my-2 has-text-weight-medium astro-YWONBOWH" id="all_roles">
			<!-- added paragraphs using json files in script tag -->
		</div>
		<div id="buttons" class="column tile is-vertical is-gapless is-parent is-1 astro-YWONBOWH">
			<div class="tile astro-YWONBOWH">
				<button id="learner" class="role-button button is-rounded theme astro-YWONBOWH">
					<span class="icon-container astro-YWONBOWH">
						${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:learn-outline", "class": "role-icon astro-YWONBOWH" })}
					</span>
				</button>
			</div>
			<div class="tile astro-YWONBOWH">
				<button id="teacher" class="role-button button is-rounded theme astro-YWONBOWH">
					<span class="icon-container astro-YWONBOWH">
						${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:teach", "class": "role-icon astro-YWONBOWH" })}
					</span>
				</button>
			</div>
			<div class="tile astro-YWONBOWH">
				<button id="dev" class="role-button button is-rounded theme astro-YWONBOWH">
					<span class="icon-container astro-YWONBOWH">
						${renderComponent($$result, "Icon", $$Icon, { "name": "ic:round-code", "class": "role-icon astro-YWONBOWH" })}
					</span>
				</button>
			</div>
		</div>
	</div>
</div>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Role.astro");

function MyTypewriter() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(Typewriter, {
      options: {
        strings: ["Explore", "Experiment", "Discover"],
        autoStart: true,
        loop: true
      }
    })
  });
}
__astro_tag_component__(MyTypewriter, "@astrojs/react");

const roles = [
	{
		role: "default",
		about: "This site operates based on three major roles: Learner, Educator and Creator. Based on your role, you will be presented with functions that are more appropriate for your use of this site. You can always change your role later!",
		id: "default"
	},
	{
		role: "learner",
		about: "The role of the learner is simply to learn new concepts by studying and simulating any of the existing experiments in any of the labs. Scroll down or check out the navigation bar above to get started!",
		id: "learner-text"
	},
	{
		role: "educator",
		about: "The role of the educator is to use Virtual Labs as a platform to simulate experiments as an aid to classroom teaching. Also, an educator can collaborate through the outreach programs.",
		id: "educator-text"
	},
	{
		role: "creater",
		about: "The role of the creator is to contribute to Virtual Labs by developing new experiments under laboratories or otherwise. Development and hosting guidelines can be found on our Hosting Info page.",
		id: "creator-text"
	}
];
const domains = [
	{
		title: "Computer Science and Engineering",
		img: "../../public/cards/Comp.png",
		href: ""
	},
	{
		title: "Mechanical",
		img: "../../public/cards/Mech.png",
		href: ""
	},
	{
		title: "Chemical Engineering",
		img: "../../public/cards/ChemEngg.png",
		href: ""
	},
	{
		title: "Electronics and Comm. Engineering",
		img: "../../public/cards/ElCom.png",
		href: ""
	},
	{
		title: "Biotechnology",
		img: "../../public/cards/Biotech.png",
		href: ""
	},
	{
		title: "Electrical Engineering",
		img: "../../public/cards/Elec.png",
		href: ""
	},
	{
		title: "Chemical Science",
		img: "../../public/cards/Chem.png",
		href: ""
	},
	{
		title: "Physical Sciences",
		img: "../../public/cards/Phys.png",
		href: ""
	},
	{
		title: "Civil Engineering",
		img: "../../public/cards/Civil.png",
		href: ""
	}
];
const services = [
	{
		title: "Development and Hosting",
		href: "/create",
		img: "../../public/cards/development.webp",
		body: ""
	},
	{
		title: "Research",
		href: "/research",
		img: "../../public/cards/research.webp",
		body: ""
	},
	{
		title: "Virtual Box",
		href: "/virtual_box",
		img: "../../public/cards/virtualbox.webp",
		body: ""
	},
	{
		title: "FAQ's",
		href: "/faq_page",
		img: "../../public/cards/FAQs.webp",
		body: ""
	}
];
const shorty = "We are Virtual Labs.";
const all = {
	roles: roles,
	domains: domains,
	services: services,
	shorty: shorty
};

const $$Astro$8 = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index;
  google.sheets("v4");
  const data = all.domains;
  const services = all.services;
  const short_about = all.shorty;
  return renderTemplate`



${renderComponent($$result, "Base", $$Base, { "title": "Home", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main style="margin-bottom: 2rem;" class="astro-J7PV25F6">
    <div class="explore-container columns is-desktop astro-J7PV25F6" id="typewrite-container">
      <div class="explore column rows astro-J7PV25F6" id="explore">
        <p class="typewriter row text theme is-full astro-J7PV25F6" id="typewriter">
          ${renderComponent($$result2, "MyTypewriter", MyTypewriter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Typewrite.jsx", "client:component-export": "default", "class": "astro-J7PV25F6" })}
          ${renderComponent($$result2, "Typewriter", Typewriter, { "options": {
    strings: ["EXPLORE", "EXPERIMENT", "DISCOVER"],
    autoStart: true,
    loop: true
  }, "client:load": true, "client:component-hydration": "load", "client:component-path": "typewriter-effect", "client:component-export": "default", "class": "astro-J7PV25F6" })}
        </p>
        <p class="row text theme is-full astro-J7PV25F6" id="short-about">
          ${short_about}
      </p>
      </div>
      <div id="divider" class="divider is-hidden-touch theme astro-J7PV25F6"></div>
      <div class="column astro-J7PV25F6" id="role">
        ${renderComponent($$result2, "Role", $$Role, { "class": "astro-J7PV25F6" })}
      </div>
    </div>
    <div id="arrow-container" class="columns is-centered astro-J7PV25F6">
      <div class="column dummy-container is-2-desktop astro-J7PV25F6">
        <span class="arrow-span text theme astro-J7PV25F6">
          ${renderComponent($$result2, "Icon", $$Icon, { "name": "ic:round-keyboard-arrow-down", "id": "arrow", "class": "astro-J7PV25F6" })}
        </span>
      </div>
    </div>

    <p id="domains-header" class="heading-center text theme astro-J7PV25F6">Domains</p>
    ${renderComponent($$result2, "swiper-container", "swiper-container", { "class": "mySwiper astro-J7PV25F6", "navigation": "true", "pagination": "true", "effect": "coverflow", "grab-cursor": "true", "centered-slides": "true", "slides-per-view": "4", "coverflow-effect-rotate": "25", "coverflow-effect-stretch": "0", "coverflow-effect-depth": "50", "coverflow-effect-modifier": "1", "pagination-dynamic-bullets": "true", "keyboard": "true", "loop": "true", "id": "domains" }, { "default": () => renderTemplate`
      ${data.map((item, i) => {
    return renderTemplate`${renderComponent($$result2, "swiper-slide", "swiper-slide", { "class": "common_domains astro-J7PV25F6", "id": item.title }, { "default": () => renderTemplate`
              <div class="astro-J7PV25F6">
                ${renderComponent($$result2, "Card", $$Card, { "img": item.img, "href": "/experiments", "body": "", "title": item.title, "class": "astro-J7PV25F6" })}
              </div>
            ` })}`;
  })}
    ` })}
    <br class="astro-J7PV25F6">
    <p class="heading-center text theme astro-J7PV25F6">Support</p>
    <div class="link-card-grid astro-J7PV25F6" id="services">
      ${services.map((item, i) => {
    return renderTemplate`${renderComponent($$result2, "Card", $$Card, { "img": item.img, "href": item.href, "body": item.body, "title": item.title, "class": "astro-J7PV25F6" })}`;
  })}
    </div>
  </main>
` })}`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/index.astro");

const $$file$8 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/index.astro";
const $$url$8 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro();
const $$Experiments = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Experiments;
  return renderTemplate`
${renderComponent($$result, "Base", $$Base, { "title": "Experiments", "class": "astro-KNRGQR2X" }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead($$result2)}<main style="padding-top: 10vh;" class="astro-KNRGQR2X">
        <div class="header astro-KNRGQR2X">
          Experiments
        </div>
        ${renderComponent($$result2, "JoyOrderDashboardTemplate", null, { "client:only": true, "client:component-hydration": "only", "class": "astro-KNRGQR2X", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/search_filters", "client:component-export": "default" })}
    </main>
` })}`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/experiments.astro");

const $$file$7 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/experiments.astro";
const $$url$7 = "/experiments";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Experiments,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

function Toc(props) {
  return /* @__PURE__ */ jsxs("div", {
    className: "content",
    style: {
      marginTop: "5%"
    },
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Contents"
    }), /* @__PURE__ */ jsx("ul", {
      style: {
        listStyleType: "none",
        marginLeft: "8px"
      },
      children: props.toc.map((c, i) => {
        return /* @__PURE__ */ jsx("li", {
          className: `toc-entry-level-${c.level}`,
          style: {
            marginLeft: "none"
          },
          children: /* @__PURE__ */ jsx("a", {
            href: `#${c.id}`,
            children: c.title
          })
        }, c.id);
      })
    })]
  });
}
__astro_tag_component__(Toc, "@astrojs/react");

function Devcontent(props) {
  const toc = [];
  const url = props.url;
  let link_count = 0;
  const addToTOC = (props2) => {
    const children = props2.children[0];
    const level = Number(props2.node.tagName.match(/h(\d)/)?.slice(1));
    if (level && children && typeof children[0] === "string") {
      const id_name = children.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const id = id_name + link_count;
      link_count++;
      toc.push({
        level,
        id,
        title: children
      });
      return React.createElement(props2.node.tagName, {
        id
      }, children);
    }
  };
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const abc = async () => {
      const response = await fetch(url);
      const text = await response.text();
      setContent(text);
      setLoaded(true);
    };
    abc();
  }, [url]);
  return loaded ? /* @__PURE__ */ jsxs("div", {
    className: "columns",
    children: [/* @__PURE__ */ jsx("div", {
      className: "readme-box column is-8",
      style: {
        overflowY: "scroll",
        height: "93vh",
        scrollBehavior: "smooth",
        scrollMarginTop: "100px"
      },
      children: /* @__PURE__ */ jsx("div", {
        className: "content",
        children: /* @__PURE__ */ jsx(ReactMarkdown, {
          children: content,
          rehypePlugins: [rehypeRaw],
          remarkPlugins: [remarkSlug, remarkHtml, remarkRehype, remarkToc],
          components: {
            h2: addToTOC,
            h3: addToTOC,
            h4: addToTOC,
            h5: addToTOC,
            h6: addToTOC
          }
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "column is-narrow"
    }), /* @__PURE__ */ jsx("div", {
      className: "readme-box column is-3 theme",
      style: {
        overflowY: "scroll",
        height: "93vh",
        scrollBehavior: "smooth",
        scrollMarginTop: "100px"
      },
      children: /* @__PURE__ */ jsx(Toc, {
        toc
      })
    })]
  }) : /* @__PURE__ */ jsx("div", {
    className: "columns",
    children: /* @__PURE__ */ jsx("div", {
      className: "readme-box column is-8 theme",
      style: {
        overflowY: "scroll",
        height: "97vh",
        scrollBehavior: "smooth",
        scrollMarginTop: "100px"
      },
      children: /* @__PURE__ */ jsx(Loader, {})
    })
  });
}
function Outreach_devcontent(props) {
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [change, setchange] = useState(false);
  const [url, setUrl] = useState("https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/workshop-process/workshop-process.md");
  useEffect(() => {
    if (props.page === "workshop_faq") {
      setUrl(`https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/faq/Q`);
    } else if (props.page === "workshop") {
      setUrl(`https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/workshop-process/workshop-process.md`);
    }
    setchange(true);
  }, []);
  useEffect(() => {
    const abc1 = async () => {
      if (change) {
        if (props.page === "workshop") {
          const response = await fetch(url);
          const text2 = await response.text();
          setContent(text2);
        } else {
          let new_text = "\n";
          for (let i = 1; i < 14; i++) {
            const new_url = url + i + "/index.mdx";
            const response = await fetch(new_url);
            var text = await response.text();
            const match = text.match(/^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m);
            text = text.replace(/^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m, "");
            new_text += "### " + match[1] + "\n" + text + "\n";
          }
          setContent(new_text);
        }
        setLoaded(true);
      }
    };
    abc1();
  }, [change]);
  return loaded ? /* @__PURE__ */ jsx("div", {
    className: "readme-box",
    children: /* @__PURE__ */ jsx("div", {
      id: "readme-text",
      children: /* @__PURE__ */ jsx("div", {
        className: "content",
        children: /* @__PURE__ */ jsx(ReactMarkdown, {
          children: content,
          rehypePlugins: [rehypeRaw],
          remarkPlugins: [remarkSlug, remarkHtml, remarkRehype, remarkToc]
        })
      })
    })
  }) : /* @__PURE__ */ jsx(Fragment$1, {});
}
__astro_tag_component__(Devcontent, "@astrojs/react");
__astro_tag_component__(Outreach_devcontent, "@astrojs/react");

function Loader(props) {
  return /* @__PURE__ */ jsx("div", {
    class: "inline",
    children: /* @__PURE__ */ jsx("p", {
      class: "spinner",
      id: "spinner",
      children: /* @__PURE__ */ jsx("i", {
        class: "fa fa-spinner fa-5x"
      })
    })
  });
}
__astro_tag_component__(Loader, "@astrojs/react");

function Vbox() {
  const toc = [];
  const addToTOC = (props) => {
    const children = props.children[0];
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1));
    if (level && children && typeof children[0] === "string") {
      const id = children.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      toc.push({
        level,
        id,
        title: children
      });
      return React.createElement(props.node.tagName, {
        id
      }, children);
    } else {
      return React.createElement(props.node.tagName, props, children);
    }
  };
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetch_readme = async () => {
      const response = await fetch("https://raw.githubusercontent.com/virtual-labs/ph3-exp-dev-process/main/virtual-box/README.md");
      const text = await response.text();
      setContent(text);
      setLoaded(true);
    };
    fetch_readme();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "overall-container theme columns is-5",
    style: {
      paddingTop: "2%"
    },
    children: [/* @__PURE__ */ jsx("div", {
      className: "column is-narrow"
    }), /* @__PURE__ */ jsx("div", {
      className: "readme-box theme column content",
      style: {
        overflowY: "scroll",
        height: "100vh",
        paddingTop: "1%",
        scrollBehavior: "smooth"
      },
      children: /* @__PURE__ */ jsx(ReactMarkdown$1, {
        children: content,
        rehypePlugins: [rehypeRaw],
        remarkPlugins: [remarkSlug, remarkHtml, remarkRehype$1, remarkToc],
        components: {
          h2: addToTOC,
          h3: addToTOC,
          h4: addToTOC,
          h5: addToTOC,
          h6: addToTOC
        }
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "column is-narrow"
    }), /* @__PURE__ */ jsx("div", {
      className: "readme-box theme column is-one-fifth",
      style: {
        overflowY: "scroll",
        height: "100vh",
        paddingTop: "1.5%",
        scrollBehavior: "smooth"
      },
      children: /* @__PURE__ */ jsx(Toc, {
        toc
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "column is-narrow"
    })]
  });
}
__astro_tag_component__(Vbox, "@astrojs/react");

const $$Astro$6 = createAstro();
const $$VirtualBox = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$VirtualBox;
  return renderTemplate`<html class="astro-XS7AGBRX">
  <head>
    <title>Virtual Box for Virtual Labs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  ${renderHead($$result)}</head>
  <body class="astro-XS7AGBRX">
    <div class="astro-XS7AGBRX">
      ${renderComponent($$result, "Navbar", $$Navbar, { "class": "astro-XS7AGBRX" })}
        <div id="placeholder" class="astro-XS7AGBRX"></div>
        ${renderComponent($$result, "Vbox", Vbox, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/vbox_fetch", "client:component-export": "default", "class": "astro-XS7AGBRX" })}
      ${renderComponent($$result, "Footer", $$Footer, { "class": "astro-XS7AGBRX" })}
    </div>
  </body></html>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/virtual_box.astro");

const $$file$6 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/virtual_box.astro";
const $$url$6 = "/virtual_box";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$VirtualBox,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Analytics;
  return renderTemplate`
${renderComponent($$result, "Base", $$Base, { "title": "Analytics" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main style="padding-top: 10vh; margin-bottom:2rem;">
    <p class="title has-text-white has-text-centered is-size-2 pt-2">Summary</p>
    <div class="columns is-multiline has-text-black-bis mx-0 mt-2">
      <div class="column has-background-white px-0">
        <p class="has-text-centered is-size-4">
          <u>No. of Users v/s Time</u>
        </p>
        <div class="is-flex is-justify-content-center">
          ${renderComponent($$result2, "Pageviews_per_month", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/chart", "client:component-export": "Pageviews_per_month" })}
        </div>
      </div>
      <div class="column has-background-white px-0">
        <p class="has-text-centered is-size-4">
          <u>Cumulative Pageviews v/s Colleges</u>
        </p>
        <div class="is-flex is-justify-content-center">
          ${renderComponent($$result2, "Cummalative_pageviews_all_collages", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/chart", "client:component-export": "Cummalative_pageviews_all_collages" })}
        </div>
      </div>
      <div class="column has-background-white px-0">
        <p class="has-text-centered is-size-4">
          <u>Top 5 Labs by Cumulative Pageviews</u>
        </p>
        <div class="is-flex is-justify-content-center">
          ${renderComponent($$result2, "Top5_Labs", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/chart", "client:component-export": "Top5_Labs" })}
        </div>
      </div>
      <div class="column has-background-white px-0">
        <p class="has-text-centered is-size-4">
          <u>Percentage wise pageviews of domains</u>
        </p>
        <div class="is-flex is-justify-content-center">
          ${renderComponent($$result2, "Cummalative_pageviews_for_domains", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/chart", "client:component-export": "Cummalative_pageviews_for_domains" })}
        </div>
      </div>
    </div>
    <div class="column">
      <p class="title has-text-white has-text-centered is-size-2">Detailed Analysis</p>
    </div>
    <div class="dropdown is-hidden-desktop is hidden-tablet ml-5 mb-5" id="dropdown-menu">
      <div class="dropdown-trigger">
        <button class="button box" id="dropdownButton">Summary &#9660;</button>
      </div>
    </div>
    <div class="columns is-desktop mx-0 my-0">
      <aside class="menu column has-background-white is-one-fifth is-narrow is-hidden-touch mx-5" style="max-height: 130vh; overflow-y: scroll;">
        <ul class="menu-list columns is-multiline is-centered has-text-black" id="listitems">
        <!-- added institute cards using javascript -->
        </ul>
      </aside>
      <div class="column py-0">
        <iframe width="100%" src="https://lookerstudio.google.com/embed/reporting/b40ac724-41f1-4b46-ba1b-c83f65284092/page/5fLPB" allowfullscreen></iframe>
      </div>
    </div>
  </main>
` })}`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/analytics.astro");

const $$file$5 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/analytics.astro";
const $$url$5 = "/analytics";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

function Faqs(props) {
  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(true);
  const [qna_, setQna_] = useState([]);
  const [repo_name, setRepo_name] = useState("-virtual-labs/");
  useEffect(() => {
    AOS.init();
    if (props.type === "outreach") {
      setRepo_name("/");
    }
  }, []);
  useEffect(() => {
    async function getAllFilesInFolder() {
      console.log("https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/faq" + repo_name);
      try {
        const res = await fetch("https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/faq" + repo_name);
        const response = await res.json();
        const files = [];
        if (response.length === void 0) {
          setLoaded2(false);
          return 0;
        }
        for (let i = 0; i < response.length; i++) {
          if (response[i].type === "dir") {
            const fileResponse = await fetch("https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/" + response[i].path + "/index.mdx");
            const data = await fileResponse.json();
            const content = window?.atob(data.content);
            if (content === void 0) {
              setLoaded2(false);
              return 0;
            }
            files.push(content);
          }
        }
        const qna = [];
        for (let i = 1; i <= files.length; i++) {
          let text = files[i - 1];
          const match = text.match(/^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m);
          text = text.replace(/^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m, "");
          let question = match.groups.title;
          qna.push({
            q: question,
            a: text,
            open: false
          });
        }
        qna.sort((a, b) => a.q > b.q ? 1 : -1);
        setQna_(qna);
        setLoaded(true);
      } catch (error) {
        setLoaded2(false);
      }
    }
    getAllFilesInFolder();
  }, [repo_name]);
  return loaded ? /* @__PURE__ */ jsx(Fragment$1, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "faq-container theme mt-6 pt-6 px-6 pb-2 content",
      children: [repo_name === "/" ? /* @__PURE__ */ jsx("h2", {
        className: "header theme",
        children: "Frequently Asked Questions"
      }) : /* @__PURE__ */ jsx("h2", {
        className: "header theme has-text-white",
        children: "Frequently Asked Questions"
      }), Object.values(qna_).map((c, i) => {
        return /* @__PURE__ */ jsxs(Fragment$1, {
          children: [/* @__PURE__ */ jsx("button", {
            "data-aos": "fade-up",
            offset: "200",
            style: {
              color: "white"
            },
            className: "box question theme is-size-5 mb-0 mt-2",
            id: "q-" + i,
            onClick: () => {
              if (c.open === false) {
                c.open = true;
                document.getElementById("a-" + i).style.display = "block";
              } else {
                c.open = false;
                document.getElementById("a-" + i).style.display = "none";
              }
            },
            children: /* @__PURE__ */ jsx(ReactMarkdown$1, {
              children: c.q,
              rehypePlugins: [rehypeRaw],
              remarkPlugins: [remarkSlug, remarkHtml, remarkRehype$1, remarkToc]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "box answer theme",
            style: {
              display: "none"
            },
            id: "a-" + i,
            children: /* @__PURE__ */ jsx(ReactMarkdown$1, {
              children: c.a,
              rehypePlugins: [rehypeRaw],
              remarkPlugins: [remarkSlug, remarkHtml, remarkRehype$1, remarkToc]
            })
          })]
        });
      })]
    })
  }) : loaded2 ? /* @__PURE__ */ jsx("div", {
    className: "faq-container theme",
    style: {
      height: "100vh"
    },
    children: /* @__PURE__ */ jsx(Loader, {})
  }) : /* @__PURE__ */ jsx("div", {
    className: "is-size-1 is-flex is-align-items-center px-5",
    style: {
      height: "100vh",
      color: "black"
    },
    children: /* @__PURE__ */ jsxs("p", {
      children: ["Oops! Page could not be displayed :/ You can still find the FAQs documented here:", /* @__PURE__ */ jsx("a", {
        href: "https://github.com/virtual-labs/outreach-web-pages-iiith/tree/main/faq-virtual-labs",
        target: "blank",
        children: "FAQs"
      })]
    })
  });
}
__astro_tag_component__(Faqs, "@astrojs/react");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$4 = createAstro();
const $$FaqPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$FaqPage;
  return renderTemplate(_a || (_a = __template(['<html>\n	<head>\n		<title>FAQs</title>\n		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">\n		<link rel="stylesheet" href="src/css/theme.css">\n		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">\n	<script type="text/javascript" src="../../app.js"><\/script>', "</head>\n	\n	<body>\n		  ", ' \n      <div id="FAQ">\n       \n      ', "\n		</div>\n  ", "\n	</body></html>"])), renderHead($$result), renderComponent($$result, "Navbar", $$Navbar, {}), renderComponent($$result, "Faqs", Faqs, { "type": "vlabs", "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/faqs.jsx", "client:component-export": "default" }), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/faq_page.astro");

const $$file$4 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/faq_page.astro";
const $$url$4 = "/faq_page";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FaqPage,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const $$Outreach = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Outreach;
  return renderTemplate`







${renderComponent($$result, "Base", $$Base, { "title": "Outreach", "class": "astro-XOIWNBW6" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main style="margin-top: 10vh;" class="astro-XOIWNBW6">
    <div class="img_box astro-XOIWNBW6">
      ${renderComponent($$result2, "swiper-container", "swiper-container", { "class": "mySwiper p-6 astro-XOIWNBW6", "navigation": "true", "effect": "coverflow", "space-between": "30", "space-end": "300", "centered-slides": "true", "autoplay-delay": "5500", "speed": "1000", "slides-per-view": "3", "autoplay-disable-on-interaction": "false", "loop": "true", "id": "swip-cont" }, { "default": () => renderTemplate`
        ${renderComponent($$result2, "swiper-slide", "swiper-slide", { "class": "astro-XOIWNBW6" }, { "default": () => renderTemplate`<div class="astro-XOIWNBW6">
            <img id="first_img" src="" alt="Image could not be displayed :/" class="astro-XOIWNBW6">
          </div>` })}
          <!-- added rest of the images using javascript -->
      ` })}
    </div>

    <div class="tabs theme is-centered is-medium astro-XOIWNBW6">
      <ul class="astro-XOIWNBW6">
        <li id="nc" class="is-active link astro-XOIWNBW6"><a class="astro-XOIWNBW6">Nodal Centers</a></li>
        <li id="wo" class="link astro-XOIWNBW6"><a class="astro-XOIWNBW6">Workshops Organized</a></li>
        <li id="rw" class="link astro-XOIWNBW6"><a class="astro-XOIWNBW6">Request a Workshop</a></li>
        <li id="faq" class="link astro-XOIWNBW6"><a class="astro-XOIWNBW6">FAQ's</a></li>
      </ul>
    </div>
    <div id="NC" class="Nodal_Centers is-centered table-container astro-XOIWNBW6">
      <table id="data-table" class="table is-bordered fit-content is-hoverable is-fullwidth astro-XOIWNBW6">
        <thead class="astro-XOIWNBW6">
          <tr class="is-size-5 astro-XOIWNBW6">
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">S.No</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Name</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Location</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Pincode</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Action</b></th>
          </tr>
        </thead>
        <tbody class="astro-XOIWNBW6"></tbody>
      </table>
    </div>
    <div id="WO" class="workshops astro-XOIWNBW6">
      <table id="data-table1" class="table is-bordered fit-content is-hoverable is-centered astro-XOIWNBW6">
        <thead class="astro-XOIWNBW6">
          <tr class="is-size-5 astro-XOIWNBW6">
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">S.No</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">College Name</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Location</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Version</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Date</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Participants Attended</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">No.of Sessions</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Session Duration</b></th>
            <th class="astro-XOIWNBW6"><b class="astro-XOIWNBW6">Usage</b></th>
          </tr>
        </thead>
        <tbody class="astro-XOIWNBW6"></tbody>
      </table>
    </div>
    <div id="RW" class="workshops_md_file astro-XOIWNBW6">
      ${renderComponent($$result2, "Outreach_devcontent", null, { "page": "workshop", "client:only": true, "client:component-hydration": "only", "class": "astro-XOIWNBW6", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Devcontent", "client:component-export": "Outreach_devcontent" })}
    </div>
    <div id="FAQ" class="workshops_faq astro-XOIWNBW6">
      <!-- <Outreach_devcontent page={"workshop_faq"} client:only /> -->
      ${renderComponent($$result2, "Faqs", null, { "type": "outreach", "client:only": true, "client:component-hydration": "only", "class": "astro-XOIWNBW6", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/faqs", "client:component-export": "default" })}
    </div>
  </main>
` })}`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/outreach.astro");

const $$file$3 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/outreach.astro";
const $$url$3 = "/outreach";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Outreach,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const pages = [
	{
		heading: "Create Experiment",
		docs: [
			{
				title: "Step 1 : Development",
				url: "https://raw.githubusercontent.com/virtual-labs/ph3-exp-dev-process/main/dev-process/README.md"
			},
			{
				title: "Step 2 : Hosting",
				url: "https://raw.githubusercontent.com/virtual-labs/engineers-forum/master/ph4/services/onboarding-hosting-process.md"
			}
		]
	},
	{
		heading: "See Also",
		docs: [
			{
				title: "Best Practices",
				url: "https://raw.githubusercontent.com/virtual-labs/ph3-exp-dev-process/main/best-practices/README.md"
			}
		]
	}
];

const $$Astro$2 = createAstro();
const $$Create = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Create;
  let index = 0;
  let index2 = 0;
  return renderTemplate`<html>
    <head>
        <title>DevHost</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="stylesheet" href="../src/css/theme.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    ${renderHead($$result)}</head>
    <body>
    <div>
        ${renderComponent($$result, "Navbar", $$Navbar, {})}
        <div class="overall-container columns theme">
            <div class="column is-narrow"></div>
            <div class="column is-one-fifth" style="height:97vh">
                <ul class="menu-list">
                    ${pages.map((c, i) => {
    return renderTemplate`<li>
                                <a class="is-active" style="background-color: #0a0a0a80;">${c.heading}</a>
                                <ul>
                                    ${c.docs.map((d, j) => {
      index++;
      return renderTemplate`<li>
                                                <a style="background-color: var(--white); color: var(--black)"${addAttribute("page-" + index, "id")}>
                                                    ${d.title}
                                                </a>
                                            </li>`;
    })}
                                </ul>
                            </li>`;
  })}
                </ul>
            </div>
            <div class="column is-narrow"></div>
            <div class="column is-four-fifths" style="height:97vh;">
                ${pages.map((c, i) => {
    return renderTemplate`<div>
                            ${c.docs.map((d, j) => {
      index2++;
      return renderTemplate`<div${addAttribute(
        "react-dev-content-" + index2,
        "id"
      )} style="display:none;" class="column">
                                        ${renderComponent($$result, "Devcontent", null, { "url": d.url, "client:only": true, "client:component-hydration": "only", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Devcontent", "client:component-export": "Devcontent" })}
                                    </div>`;
    })}
                        </div>`;
  })}
            </div>
        </div>
        ${renderComponent($$result, "Footer", $$Footer, {})}
    </div>
    

</body></html>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/create.astro");

const $$file$2 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/create.astro";
const $$url$2 = "/create";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Create,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Loader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Loader;
  return renderTemplate`<html class="astro-YPZ3B5G5">
<head>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
${renderHead($$result)}</head>
<body class="astro-YPZ3B5G5">
    <div class="inline astro-YPZ3B5G5">
        <div class="center astro-YPZ3B5G5">
            
            <h1 class="astro-YPZ3B5G5">Eductive/Edpresso</h1>
            <h2 class="astro-YPZ3B5G5">Home of Dev Shots Loader</h2>

        </div>  
           <p class="spinner astro-YPZ3B5G5" id="spinner"><i class="fa fa-spinner fa-4x astro-YPZ3B5G5"></i></p>
    </div>


</body></html>`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/loader.astro");

const $$file$1 = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/loader.astro";
const $$url$1 = "/loader";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Loader,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "404", "class": "astro-ZETDM5MD" }, { "default": ($$result2) => renderTemplate`
        ${maybeRenderHead($$result2)}<main class="astro-ZETDM5MD">
        ${renderComponent($$result2, "RandomExperiment", null, { "client:only": true, "client:component-hydration": "only", "class": "astro-ZETDM5MD", "client:component-path": "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/random_experiment", "client:component-export": "default" })}
    </main>
` })}`;
}, "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/404.astro");

const $$file = "/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/404.astro";
const $$url = "/404";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g, _page8 as h };
