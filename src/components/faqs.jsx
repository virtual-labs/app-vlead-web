import React, { useState, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkHtml from "remark-html";
import rehypeRaw from "rehype-raw";
import remarkSlug from "remark-slug";
import remarkRehype from "remark-rehype/lib";
import remarkToc from "remark-toc";
import Loader from "./loader";
import "../css/faq.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/theme.css";

export default function Faqs(props) {

  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(true);
  const [qna_, setQna_] = useState([]);
  const [repo_name, setRepo_name] = useState("-virtual-labs/");
  useEffect(()=>{
    // AOS.init();
  if (props.type === "outreach") {
    setRepo_name("/");
  }
  },[])
  useEffect(() => {
    async function getAllFilesInFolder() {
      // console.log("https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/faq" + repo_name);
      try {
        const res = await fetch("https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/faq" + repo_name);
        const response = await res.json();
        const files = [];
        if(response.length === undefined){
          setLoaded2(false);
          return 0;
        }
        for (let i = 0; i < response.length; i++) {
          if (response[i].type === "dir") {
            const fileResponse = await fetch(
              "https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/" +
                response[i].path +
                "/index.mdx"
            );
            const data = await fileResponse.json();
            const content = window?.atob(data.content);
            if(content === undefined){
              setLoaded2(false);
              return 0;
            }
            files.push(content);
          }
        }
        const qna = [];
        for (let i = 1; i <= files.length; i++) {
          let text = files[i - 1];
          const match = text.match(
            /^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m
          );
          text = text.replace(
            /^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m,
            ""
          );
          let question = match.groups.title;
          qna.push({ q: question, a: text, open: false });
        }
        // qna.sort()
        qna.sort((a, b) => (a.q > b.q ? 1 : -1));
        setQna_(qna);
        setLoaded(true);
        
      } 
      catch (error) {
        // console.error(error);

        setLoaded2(false)
      }
    }
    getAllFilesInFolder();
  }, [repo_name]);

  return loaded ? (
    <>
      <div className="faq-container theme px-6 mb-2 content">
        {Object.values(qna_).map((c, i) => {
          return (
            <>
              <button
              key={i}
              data-aos="fade-up"
              offset = "200"
              style={{color:"white"}}
                className="box question is-size-5 mb-0 mt-2"
                id={"q-" + i}
                onClick={() => {
                  if (c.open === false) {
                    c.open = true;
                    document.getElementById("a-" + i).style.display = "block";
                  } else {
                    c.open = false;
                    document.getElementById("a-" + i).style.display = "none";
                  }
                }}
              >
                <ReactMarkdown
                  children={c.q }
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[
                    remarkSlug,
                    remarkHtml,
                    remarkRehype,
                    remarkToc,
                  ]}
                ></ReactMarkdown>
              </button>
              <div
                className="box answer"
                style={{ display: "none" }}
                id={"a-" + i}
              >
                <ReactMarkdown
                  children={c.a}
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[
                    remarkSlug,
                    remarkHtml,
                    remarkRehype,
                    remarkToc,
                  ]}
                ></ReactMarkdown>
              </div>
            </>
          );
        })}
      </div>
    </>
  ) : (
    loaded2 ? (
    <div className="faq-container " style={{ height: "100vh" }}>
      <Loader />
    </div>
    ) : (
      <div className="is-size-1 is-flex is-align-items-center  px-5" style={{ height: "100vh"}}>
          <p>
          Oops! Page could not be displayed :/
          You can still find the FAQs documented here: 
          <a href="https://github.com/virtual-labs/outreach-web-pages-iiith/tree/main/faq-virtual-labs" target="blank">FAQs</a>
          </p>
      </div>
    )
  )
}
