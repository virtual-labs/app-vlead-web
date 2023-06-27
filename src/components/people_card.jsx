import React from "react";
import { useState, useEffect } from "react";
import { People_Card, Bulma_component } from "yatharth-super-lemon";
// const People_Card = require('yatharth-super-lemon');
import Loader from "./loader.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css'


export function People_Card_Component_Current () {
    
    const [content, setContent] = useState({});
    const [loaded, setLoaded] = useState(false);

    const data1 = {
        display_name: "Yatharth Gupta_",
        full_name: "Yatharth_ Middlename Gupta",
        curr_position: "Employee",
        last_working_year: "present",
        about_me:
          "Lorem ipsum sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris. ",
        institute: "IIIT-H",
        profile_img: "https://picsum.photos/96/96",
        impact_score: "4.5",
        linkedin: "https://www.linkedin.com/",
        email: "example@gamil.com",
        associations: [
          {
            name: "DASS",
            joining: "Jan-23",
            leaving: "Apr-23",
            projects: [
              {
                link: "https://github.com/",
                title: "title",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
              },
              {
                link: "https://github.com/",
                title: "title1",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
          {
            name: "Summer Intern",
            joining: "May-23",
            leaving: "present",
            projects: [
              {
                link: "null11",
                title: "title11",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
              {
                link: "null12",
                title: "title12",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
          {
            name: "RA",
            joining: "May-23",
            leaving: "present",
            projects: [
              {
                link: "null11",
                title: "title11",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
              {
                link: "null12",
                title: "title12",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
          {
            name: "RA",
            joining: "May-23",
            leaving: "present",
            projects: [
              {
                link: "null11",
                title: "title11",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
              {
                link: "null12",
                title: "title12",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
          {
            name: "RA",
            joining: "May-23",
            leaving: "present",
            projects: [
              {
                link: "null11",
                title: "title11",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
              {
                link: "null12",
                title: "title12",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
          {
            name: "RA",
            joining: "May-23",
            leaving: "present",
            projects: [
              {
                link: "null11",
                title: "title11",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
              {
                link: "null12",
                title: "title12",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
          {
            name: "RA",
            joining: "May-23",
            leaving: "present",
            projects: [
              {
                link: "null11",
                title: "title11",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
              {
                link: "null12",
                title: "title12",
                contribution:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
              },
            ],
          },
        ],
    };

    const url_old = "https://script.google.com/macros/s/AKfycbx5XaIxLb3qpQ3Dc91P1zEX1LcOqCce_U5YuRClSzWIqi03g9B0DSlw6TfmiiNiyEY/exec";
    const url ="https://script.google.com/macros/s/AKfycbzapvDQRF3bY8dm5MYFVWqFjg83NibzZy0Dsid9VnucIxwCohPRxGMVTImgGoYjvrs/exec?q=current";
    const url_past = "https://script.google.com/macros/s/AKfycbzmX446lvSLy79J6nNO_ztHLvJzSddRG0FAmfGvbepxpzf_VhkyWf_7hHJ5toKUkT0/exec?q=past";

    useEffect(() => {
      const abc = async () => {
        const response = await fetch(url);
        const text = await response.json();
        const data = text.data.data;
        setContent(data);
        setLoaded(true);
      };
      abc();
    }, []);

    function convert_url(url)
    {
      var id = url.split("/")[5];
      console.log("https://drive.google.com/uc?export=view&id=" + id);
      return "https://drive.google.com/uc?export=view&id=" + id;
    }

    return(
        loaded ? (
          <div class="columns is-multiline is-mobile is-centered">
            {/* <People_Card UserData={data1} /> */}
            {Object.values(content).map((c,i)=>{
                console.log(c["Associations"]);
                return(
                    <People_Card UserData={{
                        present: true,
                        display_name: c["Display Name"],
                        full_name: c["Full Name"],
                        curr_position: c["Last Designation"],
                        last_working_year: c["Last Working Year"],
                        about_me: c["About Me"],
                        institute: c["Organisation / Institute"],
                        profile_img: convert_url(c["Image Drive Link URL"]),
                        // profile_img: "https://picsum.photos/96/96",
                        impact_score: "4.5",
                        linkedin: c["Linkedin Profile Link URL"],
                        email: c["Personal Mail ID"],
                        // associations : c["Associations"]
                        associations: [
                          {
                            name: "DASS",
                            joining: "Jan-23",
                            leaving: "Apr-23",
                            projects: [
                              {
                                link: "https://github.com/",
                                title: "title",
                                contribution:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
                              },
                              {
                                link: "https://github.com/",
                                title: "title1",
                                contribution:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                              },
                            ],
                          },
                          {
                            name: "Summer Intern",
                            joining: "May-23",
                            leaving: "present",
                            projects: [
                              {
                                link: "null11",
                                title: "title11",
                                contribution:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                              },
                              {
                                link: "null12",
                                title: "title12",
                                contribution:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                              },
                            ],
                          },
                          {
                            name: "RA",
                            joining: "May-23",
                            leaving: "present",
                            projects: [
                              {
                                link: "null11",
                                title: "title11",
                                contribution:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                              },
                              {
                                link: "null12",
                                title: "title12",
                                contribution:
                                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                              },
                            ],
                          },
                        ],
                    }}/>
                    // <People_Card UserData={data1} />
                    // <Bulma_component UserData={{}} />
                );
            })}
            {/* <img src="https://drive.google.com/file/d/1M54UcieP8m0_0NVUm9-nuXIuQJoOwzOe/view?usp=sharing"/> */}
          </div>
        ) : (
            <>
                <Loader />
            </>
        )
    );
}

export function People_Card_Component_Past () {

  const [content, setContent] = useState({});
  const [loaded, setLoaded] = useState(false);

  const url_old = "https://script.google.com/macros/s/AKfycbx5XaIxLb3qpQ3Dc91P1zEX1LcOqCce_U5YuRClSzWIqi03g9B0DSlw6TfmiiNiyEY/exec";
  const url ="https://script.google.com/macros/s/AKfycbzapvDQRF3bY8dm5MYFVWqFjg83NibzZy0Dsid9VnucIxwCohPRxGMVTImgGoYjvrs/exec?q=past";
  const url_past = "https://script.google.com/macros/s/AKfycbzmX446lvSLy79J6nNO_ztHLvJzSddRG0FAmfGvbepxpzf_VhkyWf_7hHJ5toKUkT0/exec?q=past";

  useEffect(() => {
    const abc = async () => {
      const response = await fetch(url);
      const text = await response.json();
      const data = text.data.data;
      setContent(data);
      setLoaded(true);
    };
    abc();
  }, []);

  return(
      loaded ? (
        <div class="columns is-multiline is-mobile is-centered">
          {/* <People_Card UserData={data1} /> */}
          {Object.values(content).map((c,i)=>{
              return(
                  <People_Card UserData={{
                      present: false,
                      display_name: c["Display Name"],
                      full_name: c["Full Name"],
                      curr_position: c["Last Designation"],
                      last_working_year: c["Last Working Year"],
                      about_me: c["About Me"],
                      institute: c["College / Employee"],
                      // profile_img: c["Image drive link url"],
                      profile_img: "https://picsum.photos/96/96",
                      impact_score: "4.5",
                      linkedin: c["Linkedin profile link url"],
                      email: c["Personal Mail ID"],
                      // associations : c["Associations"]
                      associations: [
                        {
                          name: "DASS",
                          joining: "Jan-23",
                          leaving: "Apr-23",
                          projects: [
                            {
                              link: "https://github.com/",
                              title: "title",
                              contribution:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
                            },
                            {
                              link: "https://github.com/",
                              title: "title1",
                              contribution:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                            },
                          ],
                        },
                        {
                          name: "Summer Intern",
                          joining: "May-23",
                          leaving: "present",
                          projects: [
                            {
                              link: "null11",
                              title: "title11",
                              contribution:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                            },
                            {
                              link: "null12",
                              title: "title12",
                              contribution:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                            },
                          ],
                        },
                        {
                          name: "RA",
                          joining: "May-23",
                          leaving: "present",
                          projects: [
                            {
                              link: "null11",
                              title: "title11",
                              contribution:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                            },
                            {
                              link: "null12",
                              title: "title12",
                              contribution:
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                            },
                          ],
                        },
                      ],
                  }}/>
                  // <People_Card UserData={data1} />
                  // <Bulma_component UserData={{}} />
              );
          })}
          {/* <img src="https://drive.google.com/file/d/1M54UcieP8m0_0NVUm9-nuXIuQJoOwzOe/view?usp=sharing"/> */}
        </div>
      ) : (
          <>
              <Loader />
          </>
      )
  );
}