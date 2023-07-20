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
  const [repo_name, setRepo_name] = useState("initial");
  useEffect(() => {
    AOS.init();
    if (props.type === "outreach") {
      setRepo_name("");
    } else {
      setRepo_name("-virtual-labs");
    }
  }, []);

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (repo_name !== "initial") {
      const fetchFaqs = async () => {
        try {
          const owner = "virtual-labs";
          const repo = "outreach-web-pages-iiith";
          const folderPath = "faq" + repo_name;
          const ref = "main";
          const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`; // git tree API

          const response = await fetch(url);

          if (!response.ok) {
            setLoaded2(false);
            throw new Error("Failed to fetch folders");
          }

          const contents = await response.json();

          const mdxFiles = contents.tree.filter((item) => // filter for mdx files
            item.path.endsWith(".mdx")
          );

          const mdxFilesInSubfolder = mdxFiles.filter( // filter for mdx files in subfolders (faq or faq-virtual-labs)
            (item) =>
              item.path.startsWith(folderPath + "/") &&
              item.path.endsWith(".mdx")
          );

          mdxFilesInSubfolder.sort((a, b) => { // sort mdx files in subfolders by question number
            const nameA = a.path;
            const nameB = b.path;

            const [, numberA] = nameA.match(/Q(\d+)/);
            const [, numberB] = nameB.match(/Q(\d+)/);

            return Number(numberA) - Number(numberB);
          });

          const fetchMdxFileContent = async (downloadUrl) => { // fetch mdx file content
            const response = await fetch(downloadUrl);

            if (!response.ok) {
              setLoaded2(false);
              throw new Error("Failed to fetch file content");
            }

            const contents = await response.text();

            const contentRegex =
              /^---\s*title:\s*(.*?)\s*(?:excerpt:\s*(.*?))?\s*---\s*(.*)$/s; // regex to extract title, excerpt and content from mdx file

            const match = contents.match(contentRegex);
            const title = match[1].trim();
            const excerpt = match[2] ? match[2].trim() : "";
            const content = match[3].trim();
            return { // return object with title, content
              title,
              content,
            };
          };

          const mdxFileContents = await Promise.all( // fetch mdx file content for each mdx file in subfolder
            mdxFilesInSubfolder.map(async (mdxFile) => {
              const downloadUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${mdxFile.path}`; // download url for mdx file
              const { title, content } = await fetchMdxFileContent(downloadUrl);

              return {
                title: title,
                content: content,
              };
            })
          );
          
          setFaqs(mdxFileContents.flat()); // flatten mdx file content array
          setLoaded(true);
        } catch (error) {
          setLoaded2(false);
          console.error(error);
        }
      };

      fetchFaqs();
    }
  }, [repo_name]);
  const toggleCollapse = (index) => { // toggle collapse for each question
    setFaqs((prevFaqs) => {
      const updatedFaqs = [...prevFaqs];
      updatedFaqs[index].collapsed = !updatedFaqs[index].collapsed;
      return updatedFaqs;
    });
  };
  return loaded ? (
    <>
      <div className="faq-container theme py-0 px-6 mb-6 content">
        {faqs.map((c, i) => {
          return (
            <div key={i}>
              <button
                data-aos="fade-up"
                style={{ color: "white" }}
                className="box question is-size-5 mb-0 mt-2"
                onClick={() => toggleCollapse(i)}
              >
                <ReactMarkdown
                  children={c.title}
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[
                    remarkSlug,
                    remarkHtml,
                    remarkRehype,
                    remarkToc,
                  ]}
                ></ReactMarkdown>
              </button>
              {c.collapsed && (
                <div className="box answer">
                  <ReactMarkdown
                    children={c.content}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[
                      remarkSlug,
                      remarkHtml,
                      remarkRehype,
                      remarkToc,
                    ]}
                  ></ReactMarkdown>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  ) : loaded2 ? (
    <div className="faq-container " style={{ height: "100vh" }}>
      <Loader />
    </div>
  ) : (
    <div
      className="is-size-1 is-flex is-align-items-center  px-5"
      style={{ height: "100vh" }}
    >
      <p className="theme">
        Oops! Page could not be displayed :/ You can still find the FAQs
        documented here:
        <a
          href="https://github.com/virtual-labs/outreach-web-pages-iiith/tree/main/faq-virtual-labs"
          target="blank"
        >
          FAQs
        </a>
      </p>
    </div>
  );
}
