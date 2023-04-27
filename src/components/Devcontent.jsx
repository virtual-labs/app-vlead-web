import React, { useState, useEffect } from "react";
import "../css/Devcontent.css";
import "../css/theme.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import remarkSlug from "remark-slug";
import remarkHtml from "remark-html";
import remarkRehype from "remark-rehype";
import Toc from "./toc";
import Loader from "../components/loader";

export function Devcontent(props) {
  const toc = [];
  const url = props.url;
  let link_count = 0;

  const addToTOC = (props) => {
    const children = props.children[0];
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1));
    if (level && children && typeof children[0] === "string") {
      const id_name = children.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const id = id_name + link_count;
      link_count++;
      toc.push({
        level,
        id,
        title: children,
      });
      return React.createElement(props.node.tagName, { id }, children);
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

  return loaded ? (
    <div className="columns">
      <div
        className="readme-box column is-8"
        style={{ overflowY: "scroll", height: "93vh", scrollBehavior:"smooth", scrollMarginTop:"100px" }}
      >
        <div className="content">
          <ReactMarkdown
            children={content}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkSlug, remarkHtml, remarkRehype, remarkToc]}
            components={{
              h2: addToTOC,
              h3: addToTOC,
              h4: addToTOC,
              h5: addToTOC,
              h6: addToTOC,
            }}
          />
        </div>
      </div>
      <div className="column is-narrow"></div>
      <div
        className="readme-box column is-3 theme"
        style={{ overflowY: "scroll", height: "93vh", scrollBehavior:"smooth", scrollMarginTop:"100px" }}
      >
        <Toc toc={toc} />
      </div>
    </div>
  ) : (
    <div className="columns">
      <div
        className="readme-box column is-8 theme"
        style={{ overflowY: "scroll", height: "97vh", scrollBehavior:"smooth", scrollMarginTop:"100px" }}
      >
        <Loader />
      </div>
    </div>
  );
}

export function Outreach_devcontent(props) {
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [change, setchange] = useState(false);
  const [url, setUrl] = useState(
    "https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/workshop-process/workshop-process.md"
  );

  useEffect(() => {
    if (props.page === "workshop_faq") {
      setUrl(
        `https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/faq/Q`
      );
    } else if (props.page === "workshop") {
      setUrl(
        `https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/workshop-process/workshop-process.md`
      );
    }
    setchange(true);
  }, []);

  useEffect(() => {
    const abc1 = async () => {
      if (change) {
        if (props.page === "workshop") {
          const response = await fetch(url);
          const text = await response.text();
          setContent(text);
        } else {
          let new_text = "\n";
          for (let i = 1; i < 14; i++) {
            const new_url = url + i + "/index.mdx";
            const response = await fetch(new_url);
            var text = await response.text();
            const match = text.match(
              /^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m
            );
            text = text.replace(
              /^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m,
              ""
            );
            new_text += "### " + match[1] + "\n" + text + "\n";
          }

          setContent(new_text);
        }
        setLoaded(true);
      }
    };
    abc1();
  }, [change]);
  return loaded ? (
    <div className="readme-box">
      <div id="readme-text">
        <div className="content">
          <ReactMarkdown
            children={content}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkSlug, remarkHtml, remarkRehype, remarkToc]}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
