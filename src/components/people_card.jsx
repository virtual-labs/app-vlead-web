import React from "react";
import { useState, useEffect } from "react";
import {PeopleCard} from 'cmp-exp-browser'
import Loader from "./loader.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css'


export function People_Card_Component_Current () {
    
    const [content, setContent] = useState({});
    const [loaded, setLoaded] = useState(false);
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
    return(
        loaded ? (
          <div className="columns is-multiline is-mobile is-centered">
            {Object.values(content).map((c,i)=>{

                const associations = [];

                c["Associations"].map((a,j)=>{


                  const assoc = {
                    name: a["Association Type"],
                    joining: a["Joining(mmm-yy)"],
                    leaving: a["Leaving(mmm-yy)"],
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
                        present: true,
                        display_name: c["Display Name"],
                        full_name: c["Full Name"],
                        curr_position: c["Last Designation"],
                        last_working_year: c["Last Working Year"],
                        about_me: c["About Me"],
                        institute: c["Organisation / Institute"],
                        profile_img: convert_url(c["Image Drive Link URL"]),
                        impact_score: c["Impact Score (For Developers Only)"],
                        linkedin: c["Linkedin Profile Link URL"],
                        email: c["Personal Mail ID"],
                        associations : associations
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
          {Object.values(content).map((c,i)=>{

              const associations = [];

              c["Associations"].map((a,j)=>{
                const assoc = {
                  name: a["Association Type"],
                  joining: a["Joining(mmm-yy)"],
                  leaving: a["Leaving(mmm-yy)"],
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