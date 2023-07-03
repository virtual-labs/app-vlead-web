import React from "react";
import '../css/toc.css'
import '../css/Devcontent.css'
import "../css/theme.css"

export default function Toc(props) {
    return (
        <div className="content">
            <h1>Contents</h1>
            <ul style={{listStyleType:"none", marginLeft:'8px'}}>
                {(props.toc).map((c, i) => {
                        return(
                        <li key={c.id} className={`toc-entry-level-${c.level}`} style={{marginLeft:"none"}}>
                            <a href={`#${c.id}`}>{c.title}</a>
                        </li>);
                    })}
            </ul>
        </div>
    );
}

