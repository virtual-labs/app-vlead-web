import React from "react";
import { useState, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkHtml from "remark-html";
import remarkSlug from "remark-slug";
import remarkRehype from "remark-rehype/lib";
import remarkToc from "remark-toc";
import Toc from "./toc";
import '../css/Devcontent.css';
import '../css/theme.css';
import Loader from "./loader";

export default function Vbox() {

    const toc = []

    const addToTOC = (props) => {
        const children = props.children[0];
        const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1));
        if (level && children && typeof children[0] === "string") {
            const id = children.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            toc.push({
                level,
                id,
                title: children,
            });
            // setToc_loaded(toc);
            return React.createElement(
                props.node.tagName, {id}, children
            )
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
        }
        fetch_readme();
    }, [])
    return (
            <div className="overall-container theme columns">
                <div className="column is-narrow"></div>
                <div className="readme-box  column content" style={{overflowY:"scroll",height:"100vh", paddingTop: '1%', scrollBehavior: 'smooth'}}>
                <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkSlug, remarkHtml, remarkRehype, remarkToc]} 
                components={{
                    h2: addToTOC,
                    h3: addToTOC,
                    h4: addToTOC,
                    h5: addToTOC,
                    h6: addToTOC,
                }} ></ReactMarkdown></div>
                <div className="column is-narrow"></div>
                <div className='readme-box theme column is-one-fifth' style={{overflowY:"scroll",height:"100vh", paddingTop:'1.5%', scrollBehavior: 'smooth'}}>
                    <Toc toc={toc}/>
                </div>
                <div className="column is-narrow"></div>
            </div>
    );
}