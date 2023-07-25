import React from "react";
import { useState, useEffect } from "react";
import {PeopleCard} from 'cmp-exp-browser'
import Loader from "./loader.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css'


export function People_Card_Component_Current () {
    
    const [content, setContent] = useState({});
    const [loaded, setLoaded] = useState(false);

    const data1 = {
        display_name: "First Last",
        full_name: "first Middlename last",
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
    // https://script.google.com/macros/s/AKfycbyvD_OVuhxgdgxTxoFMV4Jes40VtmH4SWRradzivUhknlPr-BepBeGp1IzrPcd9G-CftA/exec
    const url ="https://script.google.com/macros/s/AKfycbyvD_OVuhxgdgxTxoFMV4Jes40VtmH4SWRradzivUhknlPr-BepBeGp1IzrPcd9G-CftA/exec?q=current";

    useEffect(() => {
      const abc = async () => {
        const response = await fetch(url);
        const text = await response.json();
        const data = text.data.data;
        console.log("data: ", data);
        setContent(data);
        setLoaded(true);
      };
      abc();
    }, []);

    function convert_url(url)
    {
      var id = url.split("/")[5];
      return "https://drive.google.com/uc?export=view&id=" + id;
    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return(
        loaded ? (
          <div className="columns is-multiline is-mobile is-centered">
            {/* <People_Card UserData={data1} /> */}
            {Object.values(content).map((c,i)=>{

                const associations = [];

                c["Associations"].map((a,j)=>{


                  const assoc = {
                    name: a["Association Type"],
                    joining: a["Joining(mmm-yy)"],
                    leaving: a["Leaving(mmm-yy)"],
                    projects: []
                  };

                  // if(assoc.joining)
                  // {
                  //   if(assoc.joining !== "present")
                  //   {
                  //     assoc.joining = a["Joining(mmm-yy)"].slice(0,7);
                  //     console.log("1: ", assoc.joining);
                  //     let j = "";
                  //     j += months[Number(a["Joining(mmm-yy)"].slice(5,7))];
                  //     j += " ";
                  //     j += assoc.joining.slice(0,4);

                  //     assoc.joining = j;
                  //     console.log("2. ", assoc.joining);
                  //   }
                  // }
                  // if(assoc.leaving)
                  // {
                  //   if(assoc.leaving !== "present")
                  //   {
                  //     assoc.leaving = a["Leaving(mmm-yy)"].slice(0,7);
                      
                  //     let l = "";
                  //     l += months[Number(a["Leaving(mmm-yy)"].slice(5,7))];
                  //     l += " ";
                  //     l += assoc.leaving.slice(0,4);

                  //     assoc.leaving = l;
                  //   }
                  // }
                  
                  a["Projects"].map((p,k)=>{
                    assoc.projects.push({
                      link: p["Link (url) to project repo (if present)"],
                      title: p["Project Title"],
                      contribution: p["Work Contribution"]
                    })
                  })

                  associations.push(assoc);
                  
                })

                return(
                    <PeopleCard key={i} UserData={{
                        present: true,
                        display_name: c["Display Name"],
                        full_name: c["Full Name"],
                        curr_position: c["Last Designation"],
                        last_working_year: c["Last Working Year"],
                        about_me: c["About Me"],
                        institute: c["Organisation / Institute"],
                        profile_img: convert_url(c["Image Drive Link URL"]),
                        // profile_img: "https://picsum.photos/96/96",
                        impact_score: c["Impact Score (For Developers Only)"],
                        linkedin: c["Linkedin Profile Link URL"],
                        email: c["Personal Mail ID"],
                        associations : associations
                        // associations: [
                        //   {
                        //     name: "DASS",
                        //     joining: "Jan-23",
                        //     leaving: "Apr-23",
                        //     projects: [
                        //       {
                        //         link: "https://github.com/",
                        //         title: "title",
                        //         contribution:
                        //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
                        //       },
                        //       {
                        //         link: "https://github.com/",
                        //         title: "title1",
                        //         contribution:
                        //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     name: "Summer Intern",
                        //     joining: "May-23",
                        //     leaving: "present",
                        //     projects: [
                        //       {
                        //         link: "null11",
                        //         title: "title11",
                        //         contribution:
                        //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                        //       },
                        //       {
                        //         link: "null12",
                        //         title: "title12",
                        //         contribution:
                        //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                        //       },
                        //     ],
                        //   },
                        //   {
                        //     name: "RA",
                        //     joining: "May-23",
                        //     leaving: "present",
                        //     projects: [
                        //       {
                        //         link: "null11",
                        //         title: "title11",
                        //         contribution:
                        //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                        //       },
                        //       {
                        //         link: "null12",
                        //         title: "title12",
                        //         contribution:
                        //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus nec iaculis mauris.",
                        //       },
                        //     ],
                        //   },
                        // ],
                    }}/>
                );
            })}
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

  const url ="https://script.google.com/macros/s/AKfycbyvD_OVuhxgdgxTxoFMV4Jes40VtmH4SWRradzivUhknlPr-BepBeGp1IzrPcd9G-CftA/exec?q=past";

  useEffect(() => {
    const abc = async () => {
      const response = await fetch(url);
      const text = await response.json();
      const data = text.data.data;
      console.log(data);
      setContent(data);
      setLoaded(true);
    };
    abc();
  }, []);

  function convert_url(url)
  {
    var id = url.split("/")[5];
    return "https://drive.google.com/uc?export=view&id=" + id;
  }

  return(
      loaded ? (
        <div className="columns is-multiline is-mobile is-centered">
          {/* <People_Card UserData={data1} /> */}
          {Object.values(content).map((c,i)=>{

              const associations = [];

              c["Associations"].map((a,j)=>{
                const assoc = {
                  name: a["Association Type"],
                  joining: a["Joining(mmm-yy)"],
                  leaving: a["Leaving(mmm-yy"],
                  projects: []
                };

                a["Projects"].map((p,k)=>{
                  assoc.projects.push({
                    link: p["Link (url) to project repo (if present)"],
                    title: p["Project Title"],
                    contribution: p["Work Contribution"]
                  })
                })
              
                associations.push(assoc);
              
              })

              return(
                  <PeopleCard key={i} UserData={{
                      present: false,
                      display_name: c["Display Name"],
                      full_name: c["Full Name"],
                      curr_position: c["Last Designation"],
                      last_working_year: c["Last Working Year"],
                      about_me: c["About Me"],
                      institute: c["Organisation / Institution"],
                      profile_img: convert_url(c["Image Drive Link URL"]),
                      // profile_img: "https://picsum.photos/96/96",
                      impact_score: c["Impact Score (For Developers Only)"],
                      linkedin: c["Linkedin Profile Link URL"],
                      email: c["Personal Mail ID"],
                      associations : associations,
                  }}/>
              );
          })}
        </div>
      ) : (
          <>
              <Loader />
          </>
      )
  );
}