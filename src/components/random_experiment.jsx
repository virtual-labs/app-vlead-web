import * as React from "react";

export default function RandomExperiment() {
  const [experiments, setExperiments] = React.useState("");
  React.useEffect(() => {
    fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
      .then((resp) => resp.json())
      .then((data) => {
        var r = Math.floor(Math.random() * (Object.keys(data).length + 1));
        setExperiments(data[r]["Experiment URL"]);
      });
  }, []);

  return (
    <div
      style={{
        fontSize: "2rem",
        fontWeight: "600",
        textAlign: "center",
        paddingTop: "20px",
        fontFamily: "Comfortaa",
        // height:"50vh"
      }}
    >
      <div>
        OH NO! Looks like we lost your page : (
        <br />
        Instead, let us take you on an unpredictable{" "}
        <a href={"https://" + experiments} style={{ fontSize: "3rem" }}>
          adventure
        </a>
        !
        <div >
          <img src="cards/oswald.gif" />
        </div>
      </div>
      {/* <div class=" ">
          OH NO! Looks like we lost your page : (
          <br />
          Instead, let us take you on an unpredictable{" "}
          <a href={"https://" + experiments} style={{ fontSize: "3rem" }}>
            adventure
          </a>
          !
          <div
            className=""
            style={{ marginTop: "3.2vh", height: "80vh", width: "80vh" }}
          >
            <img src="cards/oswald.gif" />
          </div>
        </div> */}
    </div>
  );
}
