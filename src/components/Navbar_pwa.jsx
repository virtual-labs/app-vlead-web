import React from 'react'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs';

export default function Navbar(props) {
    const LoadRecents = (e) => {
        e.preventDefault();
        props.setp(1)
        props.setNav(1);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    const LoadAll = (e) => {
        e.preventDefault();
        props.setp(1)
        props.setNav(0);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    const LoadSaved = (e) => {
        e.preventDefault();
        props.setp(1)
        props.setNav(2);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    const LoadPop = (e) => {
        e.preventDefault();
        props.setp(1)
        props.setNav(3);
        document.getElementById("navbarBasicExample").className="navbar-menu"
    }
    return (
        <div>
            <nav className="navbar is-hidden-desktop is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href=".">
                        <img src={"https://cdn.vlabs.ac.in/logo/vlead-large.png"} alt="" width="70" height="90"/>
                    </a>
                    <b style={{marginTop:"auto",marginBottom:"auto",fontSize:"x-large"}}>Virtual Labs</b>
                    <a href="/" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={(e)=>{
                        e.preventDefault()
                        if(document.getElementById("navbarBasicExample").className.includes("is-active"))
                        {
                            document.getElementById("navbarBasicExample").className="navbar-menu"
                        }
                        else{
                            document.getElementById("navbarBasicExample").className="navbar-menu is-active"
                        }
                    }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/" className="navbar-item" onClick={LoadPop}>
                        <AiFillStar />Popular
                        </a>

                        <a href="/" className="navbar-item" onClick={LoadRecents}>
                        <RxCounterClockwiseClock />Recents
                        </a>
                        <a href="/" className="navbar-item" onClick={LoadAll}>
                        <AiFillExperiment />All Experiments
                        </a>
                        <a href="/" className="navbar-item" onClick={LoadSaved}>
                        <BsFillBookmarkStarFill />Starred
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
