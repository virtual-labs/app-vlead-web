import * as adapter from '@astrojs/netlify/netlify-functions.js';
import React, { createElement } from 'react';
import ReactDOM from 'react-dom/server';
import { g as server_default, h as deserializeManifest } from './chunks/astro.d9c4abc7.mjs';
import { _ as _page0, a as _page1, b as _page2, c as _page3, d as _page4, e as _page5, f as _page6, g as _page7, h as _page8 } from './chunks/pages/all.7a252cce.mjs';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'slash';
import 'path-to-regexp';
import 'html-escaper';
import 'string-width';
/* empty css                                 *//* empty css                                 */import 'typewriter-effect';
import 'react/jsx-runtime';
import 'googleapis';
/* empty css                                       */import 'react-markdown/lib/react-markdown.js';
import 'rehype-raw';
import 'remark-html';
import 'remark-slug';
import 'remark-rehype/lib/index.js';
import 'remark-toc';
/* empty css                                    *//* empty css                                       *//* empty css                                    */import 'react-markdown';
import 'remark-rehype';
/* empty css                                    */import 'aos';
/* empty css                                    *//* empty css                                    *//* empty css                                  */import 'svgo';
/* empty css                               *//* empty css                               *//* empty css                               */
/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
	return (
		err.message &&
		(err.message.startsWith("Cannot read property '__H'") ||
			err.message.includes("(reading '__H')"))
	);
}

async function check(Component, props, children) {
	// Note: there are packages that do some unholy things to create "components".
	// Checking the $$typeof property catches most of these patterns.
	if (typeof Component === 'object') {
		const $$typeof = Component['$$typeof'];
		return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
	}
	if (typeof Component !== 'function') return false;

	if (Component.prototype != null && typeof Component.prototype.render === 'function') {
		return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	}

	let error = null;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && vnode['$$typeof'] === reactTypeof) {
				isReactComponent = true;
			}
		} catch (err) {
			if (!errorIsComingFromPreactComponent(err)) {
				error = err;
			}
		}

		return React.createElement('div');
	}

	await renderToStaticMarkup(Tester, props, children, {});

	if (error) {
		throw error;
	}
	return isReactComponent;
}

async function getNodeWritable() {
	let nodeStreamBuiltinModuleName = 'stream';
	let { Writable } = await import(/* @vite-ignore */ nodeStreamBuiltinModuleName);
	return Writable;
}

async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	delete props['class'];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(StaticHtml, { value, name });
	}
	// Note: create newProps to avoid mutating `props` before they are serialized
	const newProps = {
		...props,
		...slots,
	};
	const newChildren = children ?? props.children;
	if (newChildren != null) {
		newProps.children = React.createElement(StaticHtml, { value: newChildren });
	}
	const vnode = React.createElement(Component, newProps);
	let html;
	if (metadata && metadata.hydrate) {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToPipeableStreamAsync(vnode);
		}
	} else {
		if ('renderToReadableStream' in ReactDOM) {
			html = await renderToReadableStreamAsync(vnode);
		} else {
			html = await renderToStaticNodeStreamAsync(vnode);
		}
	}
	return { html };
}

async function renderToPipeableStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let error = undefined;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(
					new Writable({
						write(chunk, _encoding, callback) {
							html += chunk.toString('utf-8');
							callback();
						},
						destroy() {
							resolve(html);
						},
					})
				);
			},
		});
	});
}

async function renderToStaticNodeStreamAsync(vnode) {
	const Writable = await getNodeWritable();
	let html = '';
	return new Promise((resolve, reject) => {
		let stream = ReactDOM.renderToStaticNodeStream(vnode);
		stream.on('error', (err) => {
			reject(err);
		});
		stream.pipe(
			new Writable({
				write(chunk, _encoding, callback) {
					html += chunk.toString('utf-8');
					callback();
				},
				destroy() {
					resolve(html);
				},
			})
		);
	});
}

/**
 * Use a while loop instead of "for await" due to cloudflare and Vercel Edge issues
 * See https://github.com/facebook/react/issues/24169
 */
async function readResult(stream) {
	const reader = stream.getReader();
	let result = '';
	const decoder = new TextDecoder('utf-8');
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) {
				result += decoder.decode(value);
			} else {
				// This closes the decoder
				decoder.decode(new Uint8Array());
			}

			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}

async function renderToReadableStreamAsync(vnode) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode));
}

const _renderer1 = {
	check,
	renderToStaticMarkup,
};

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/experiments.astro", _page1],["src/pages/virtual_box.astro", _page2],["src/pages/analytics.astro", _page3],["src/pages/faq_page.astro", _page4],["src/pages/outreach.astro", _page5],["src/pages/create.astro", _page6],["src/pages/loader.astro", _page7],["src/pages/404.astro", _page8],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),];

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.1a99fc17.js"}],"styles":[{"type":"external","src":"/_astro/index.e428fd64.css"},{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/404.53e6695e.css"},{"type":"external","src":"/_astro/index.d861795c.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.cc6349e8.js"}],"styles":[{"type":"external","src":"/_astro/index.e428fd64.css"},{"type":"external","src":"/_astro/experiments.ca7a4c1b.css"},{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/404.53e6695e.css"}],"routeData":{"route":"/experiments","type":"page","pattern":"^\\/experiments\\/?$","segments":[[{"content":"experiments","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/experiments.astro","pathname":"/experiments","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.8d08712d.js"}],"styles":[{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/virtual_box.0576da6c.css"},{"type":"external","src":"/_astro/faq_page.99d66e41.css"},{"type":"external","src":"/_astro/faq_page.6be50550.css"},{"type":"external","src":"/_astro/index.e428fd64.css"}],"routeData":{"route":"/virtual_box","type":"page","pattern":"^\\/virtual_box\\/?$","segments":[[{"content":"virtual_box","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/virtual_box.astro","pathname":"/virtual_box","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.f037bd32.js"}],"styles":[{"type":"external","src":"/_astro/index.e428fd64.css"},{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/404.53e6695e.css"}],"routeData":{"route":"/analytics","type":"page","pattern":"^\\/analytics\\/?$","segments":[[{"content":"analytics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/analytics.astro","pathname":"/analytics","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.8d08712d.js"}],"styles":[{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/faq_page.64b1a0f2.css"},{"type":"external","src":"/_astro/faq_page.99d66e41.css"},{"type":"external","src":"/_astro/faq_page.73168167.css"},{"type":"external","src":"/_astro/faq_page.6be50550.css"},{"type":"external","src":"/_astro/index.e428fd64.css"}],"routeData":{"route":"/faq_page","type":"page","pattern":"^\\/faq_page\\/?$","segments":[[{"content":"faq_page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq_page.astro","pathname":"/faq_page","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.8ef106a1.js"}],"styles":[{"type":"external","src":"/_astro/index.e428fd64.css"},{"type":"external","src":"/_astro/faq_page.64b1a0f2.css"},{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/404.53e6695e.css"},{"type":"external","src":"/_astro/outreach.e33bdaf8.css"}],"routeData":{"route":"/outreach","type":"page","pattern":"^\\/outreach\\/?$","segments":[[{"content":"outreach","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/outreach.astro","pathname":"/outreach","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.674c124e.js"}],"styles":[{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/faq_page.6be50550.css"}],"routeData":{"route":"/create","type":"page","pattern":"^\\/create\\/?$","segments":[[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/create.astro","pathname":"/create","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.onreadystatechange=function(){document.readyState===\"complete\"?(document.querySelector(\"body\").style.visibility=\"hidden\",document.getElementById(\"spinner\").style.visibility=\"visible\"):(document.getElementById(\"spinner\").style.display=\"none\",document.querySelector(\"body\").style.visibility=\"visible\")};\n"}],"styles":[{"type":"external","src":"/_astro/loader.78f5baec.css"}],"routeData":{"route":"/loader","type":"page","pattern":"^\\/loader\\/?$","segments":[[{"content":"loader","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/loader.astro","pathname":"/loader","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.8d08712d.js"}],"styles":[{"type":"external","src":"/_astro/404.538bd73c.css"},{"type":"external","src":"/_astro/404.4ebb9ecc.css"},{"type":"external","src":"/_astro/404.53e6695e.css"}],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"pageMap":null,"componentMetadata":[["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/analytics.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/experiments.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/outreach.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/virtual_box.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/faq_page.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/create.astro",{"propagation":"none","containsHead":true}],["/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/pages/loader.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","typewriter-effect":"_astro/_astro-entry_typewriter-effect.f9435a9d.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/faqs.jsx":"_astro/faqs.bc8d4bec.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/vbox_fetch":"_astro/vbox_fetch.cbb59845.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Typewrite.jsx":"_astro/Typewrite.e2186fbc.js","/astro/hoisted.js?q=4":"_astro/hoisted.674c124e.js","/astro/hoisted.js?q=1":"_astro/hoisted.cc6349e8.js","/astro/hoisted.js?q=3":"_astro/hoisted.8ef106a1.js","/astro/hoisted.js?q=2":"_astro/hoisted.f037bd32.js","/astro/hoisted.js?q=6":"_astro/hoisted.8d08712d.js","/astro/hoisted.js?q=5":"_astro/hoisted.a461236c.js","@astrojs/react/client.js":"_astro/client.4d291f08.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/Devcontent":"_astro/Devcontent.2117d261.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/faqs":"_astro/faqs.052374ae.js","/astro/hoisted.js?q=0":"_astro/hoisted.1a99fc17.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/random_experiment":"_astro/random_experiment.8984bf4e.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/role":"_astro/role.a18e4508.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/search_filters":"_astro/search_filters.27f192b7.js","/home/yatharth/Desktop/sem_4/DASS/DASS2k23-Team-2/github-code/app-vlead-web/src/components/chart":"_astro/chart.3982b81f.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/404.4ebb9ecc.css","/_astro/404.53e6695e.css","/_astro/404.538bd73c.css","/_astro/experiments.ca7a4c1b.css","/_astro/faq_page.99d66e41.css","/_astro/faq_page.6be50550.css","/_astro/faq_page.64b1a0f2.css","/_astro/faq_page.73168167.css","/_astro/index.d861795c.css","/_astro/index.e428fd64.css","/_astro/loader.78f5baec.css","/_astro/outreach.e33bdaf8.css","/_astro/virtual_box.0576da6c.css","/analytics_data.json","/devprocess_docs.json","/footer_data.json","/home_data.json","/images.png","/not_all_experiments.json","/oswald.gif","/_astro/Devcontent.2117d261.js","/_astro/Navbar.astro_astro_type_script_index_1_lang.dd1fc69a.js","/_astro/Typewrite.e2186fbc.js","/_astro/_astro-entry_typewriter-effect.f9435a9d.js","/_astro/aos.1b31ad32.js","/_astro/chart.3982b81f.js","/_astro/client.4d291f08.js","/_astro/faqs.052374ae.js","/_astro/faqs.6b26b0a8.js","/_astro/faqs.bc8d4bec.js","/_astro/fetch.5b0f168d.js","/_astro/hoisted.1a99fc17.js","/_astro/hoisted.674c124e.js","/_astro/hoisted.8d08712d.js","/_astro/hoisted.8ef106a1.js","/_astro/hoisted.cc6349e8.js","/_astro/hoisted.f037bd32.js","/_astro/index.04846a42.js","/_astro/index.5a8496e9.js","/_astro/index.91349d3f.js","/_astro/index.c8731e8d.js","/_astro/index.fbb9edb4.js","/_astro/interopRequireDefault.01ffd8a5.js","/_astro/jsx-runtime.5ec5f311.js","/_astro/load.4ed993c7.js","/_astro/loader.fe9e8604.js","/_astro/random_experiment.8984bf4e.js","/_astro/react.41164ef0.js","/_astro/role.a18e4508.js","/_astro/search_filters.27f192b7.js","/_astro/toc.33c68451.js","/_astro/vbox_fetch.cbb59845.js","/cards/Biotech.png","/cards/Chem.png","/cards/ChemEngg.png","/cards/Civil.png","/cards/Comp.png","/cards/ElCom.png","/cards/Elec.png","/cards/FAQs.webp","/cards/Mech.png","/cards/Phys.png","/cards/development.webp","/cards/outreach.webp","/cards/research.webp","/cards/virtualbox.webp"]}), {
	pageMap: pageMap,
	renderers: renderers,
	
});
const _args = {};
const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap, renderers };
