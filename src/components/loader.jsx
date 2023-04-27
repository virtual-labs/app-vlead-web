import React from "react";
import "../css/load.css"
import { Devcontent } from "./Devcontent";

export default function Loader(props) {
    // document.onreadystatechange = function() {
    //     if (document.readyState === "complete") {
    //         document.querySelector(
    //           "#main_content").style.visibility = "hidden";
    //         document.querySelector(
    //           "#spinner").style.visibility = "visible";
    //     } else {
    //         document.querySelector(
    //           "#spinner").style.display = "none";
    //         document.querySelector(
    //           "#main_content").style.visibility = "visible";
    //     }
    // };
return(
    <div class="inline">
           <p class="spinner" id="spinner"><i class="fa fa-spinner fa-5x"></i></p>
    </div>
);}
