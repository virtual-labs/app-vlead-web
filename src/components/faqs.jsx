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
  const [repo_name, setRepo_name] = useState("-virtual-labs");
  useEffect(() => {
    AOS.init();
    if (props.type === "outreach") {
      setRepo_name("");
    }
  }, []);
  // useEffect(() => {
  //   async function getAllFilesInFolder() {
  //     try {
  //       const res = await fetch("https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/faq" + repo_name);
  //       const response = await res.json();
  //       const files = [];
  //       if(response.length === undefined){
  //         setLoaded2(false);
  //         return 0;
  //       }
  //       for (let i = 0; i < response.length; i++) {
  //         if (response[i].type === "dir") {
  //           const fileResponse = await fetch(
  //             "https://api.github.com/repos/virtual-labs/outreach-web-pages-iiith/contents/" +
  //               response[i].path +
  //               "/index.mdx"
  //           );
  //           const data = await fileResponse.json();
  //           const content = window?.atob(data.content);
  //           if(content === undefined){
  //             setLoaded2(false);
  //             return 0;
  //           }
  //           files.push(content);
  //         }
  //       }
  //       const qna = [];
  //       for (let i = 1; i <= files.length; i++) {
  //         let text = files[i - 1];
  //         const match = text.match(
  //           /^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m
  //         );
  //         text = text.replace(
  //           /^---\s*\n(?:.+\n)*title:\s*(?<title>.+)\s*\n(?:.+\n)*---\s*\n/m,
  //           ""
  //         );
  //         let question = match.groups.title;
  //         qna.push({ q: question, a: text, open: false });
  //       }
  //       // qna.sort()
  //       qna.sort((a, b) => (a.q > b.q ? 1 : -1));
  //       setQna_(qna);
  //       setLoaded(true);

  //     }
  //     catch (error) {

  //       setLoaded2(false)
  //     }
  //   }
  //   getAllFilesInFolder();
  // }, [repo_name]);

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const owner = "virtual-labs";
        const repo = "outreach-web-pages-iiith";
        const folderPath = "faq"+repo_name;
        // const accessToken =
        //   "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"; // sham
        const accessToken =
          "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"; // vlead-public

        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(url, {
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch folders");
        }

        const contents = await response.json();
        const fetchFilesAndExtractFaqs = async (folderName) => {
          const folderUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}/${folderName}`;
          const folderResponse = await fetch(folderUrl, {
            headers: headers,
          });

          if (!folderResponse.ok) {
            setLoaded2(false)
            throw new Error("Failed to fetch files");
          }

          const folderContents = await folderResponse.json();

          const mdFiles = folderContents.filter(
            (item) => item.type === "file" && item.name.endsWith(".mdx")
          );
          const extractFaqs = (file) => {
            const fetchFileContent = async () => {
              const fileContentUrl = file.download_url;
              const fileContentResponse = await fetch(fileContentUrl);

              if (!fileContentResponse.ok) {
                setLoaded2(false)
                throw new Error(
                  `Failed to fetch content of file: ${file.name}`
                );
              }

              const fileContent = await fileContentResponse.text();

              const contentRegex = /^---\s*title:\s*(.*?)\s*(?:excerpt:\s*(.*?))?\s*---\s*(.*)$/s;

              const match = fileContent.match(contentRegex);
              // if (match) {
                const title = match[1].trim();
                const excerpt = match[2] ? match[2].trim() : "";
                const content = match[3].trim();
              // }

              return {
                title,
                content,
              };
            };

            return fetchFileContent();
          };

          const faqsFromFolder = await Promise.all(
            mdFiles.map((file) => extractFaqs(file))
          );

          return faqsFromFolder.flat();
        };

        const allFaqs = await Promise.all(
          contents.map((item) => {
            if (item.type === "dir") {
              return fetchFilesAndExtractFaqs(item.name);
            }
            return [];
          })
        );
          allFaqs.sort((a, b) => {
            const nameA = a[0].title?.toLowerCase();
            const nameB = b[0].title?.toLowerCase();
            
            return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
          });
        setFaqs(allFaqs.flat());
        setLoaded(true)
      } catch (error) {
        setLoaded2(false)
        console.error(error)
      }
    };

    fetchFaqs();
  }, [repo_name]);
  const toggleCollapse = (index) => {
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
              {c.collapsed && 
              <div
                className="box answer"
              >
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
              </div>}
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
      <p>
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
