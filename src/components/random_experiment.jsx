import * as React from "react";

export default function RandomExperiment() {
    const [experiments, setExperiments] = React.useState("");
    React.useEffect(() => {
        fetch('https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items')
          .then(resp => resp.json())
          .then(data => {
            var r = Math.floor(Math.random() * (Object.keys(data).length + 1));
          setExperiments(data[r]["Experiment URL"]);
        })
      }, []);


    return (
        <div style={{fontSize:"2rem", fontWeight:"600", textAlign:"center", paddingTop:"10vh", fontFamily:"Comfortaa"}}>
            <div class="columns is-centered is-vcentered">
                <div class="column is-narrow has-text-centered">
                    OH NO! Looks like we lost your page : (
                    <br/>
                    Instead, let us take you on an unpredictable <a href={"https://"+experiments} style={{fontSize: "3rem"}}>adventure</a>!
                    <div className="mx-auto"style={{marginTop:"3.2vh",height:"80vh",width:"80vh"}}><img src="cards/oswald.gif"/></div>
              </div>
        </div>
        </div>
    );
}