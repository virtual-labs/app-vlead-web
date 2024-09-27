import { useState } from "react";

export default function Roles() {
//   const [Role, setrole] = useState(localStorage.getItem("Role"));
let Role = {creator:"is-hidden",learner:"is-hidden",teacher:"is-hidden"}
    localStorage.getItem("Role") === "creator" ? (
      (Role.creator = "")
    ) : localStorage.getItem("Role") === "learner" ? (
      (Role.learner = "")
    ) : localStorage.getItem("Role") === "teacher" ? (
      (Role.teacher = "")
    ) : (
      <></>
    );
  
  return (
    <>
      <a
        className={`navbar-item is-size-5 ${Role.creator}`}
        href={`${import.meta.env.BASE_URL}/create/`}
        id="create"
      >
        Create Experiment
      </a>
      <a className={`navbar-item is-size-5 ${Role.teacher}`} id="outreach">
        Outreach
      </a>
      <a className={`navbar-item is-size-5 ${Role.learner}`} id="learning">
        Start learning
      </a>
    </>
  );
}
