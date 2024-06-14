// not in use

import 'bulma/css/bulma.min.css';
import { FcSearch } from 'react-icons/fc';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import ExperimentLoader from './ExperimentLoader.jsx';
import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi'
import { RxCounterClockwiseClock } from 'react-icons/rx'
import { AiFillExperiment, AiFillStar } from 'react-icons/ai'
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import "../css/theme.css"
import "../css/exp.css"
import Loader from './loader.jsx';
function ExpComponent() {
    const [experiments, setExperiments] = React.useState([]);
    const [nav, setNav] = useState(3);
    const [word, setWord] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotal] = useState(1);
    const [Pop, setPop] = useState([]);
    const [fetched, setFetched] = useState(false);
    const LoadRecents = () => {
        setPage(1)
        setNav(1);
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("pop-tab").className = "dropdown-item"
        document.getElementById("all-tabs").className = "dropdown-item"
        document.getElementById("save-tabs").className = "dropdown-item"
        document.getElementById("rec-tab").className = "dropdown-item is-active"
    }
    const LoadAll = () => {
        setPage(1)
        setNav(0);
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("pop-tab").className = "dropdown-item"
        document.getElementById("rec-tab").className = "dropdown-item"
        document.getElementById("save-tabs").className = "dropdown-item"
        document.getElementById("all-tabs").className = "dropdown-item is-active"
    }
    const LoadSaved = () => {
        setPage(1)
        setNav(2);
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("pop-tab").className = "dropdown-item"
        document.getElementById("all-tabs").className = "dropdown-item"
        document.getElementById("rec-tab").className = "dropdown-item"
        document.getElementById("save-tabs").className = "dropdown-item is-active"
    }
    const LoadPop = () => {
        setPage(1)
        setNav(3);
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        document.getElementById("rec-tab").className = "dropdown-item"
        document.getElementById("all-tabs").className = "dropdown-item"
        document.getElementById("save-tabs").className = "dropdown-item"
        document.getElementById("pop-tab").className = "dropdown-item is-active"
    }
    const PrevPage = () => {
        setPage(page - 1)
    }
    const NextPage = () => {
        setPage(page + 1)
    }
    React.useEffect(() => {
        const navsearch = sessionStorage.getItem("search")
        if(navsearch)
        {
            setWord(navsearch)
            sessionStorage.removeItem("search")
        }
        fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
            .then((resp) => resp.json())
            .then((data) => {
                setExperiments(data);
                setTotal(Math.ceil(data.length / 8))
                let copy = [...data]
                setPop(copy.sort((a, b) => b["Pageviews"] - a["Pageviews"]))
                setFetched(true)
            });
    }, []);
    const SearchExp = (e) => {
        setWord(e.target.value)
    }
    const ToggleFilter = () => {
        if (!document.getElementById("filter-set").className.includes("is-hidden-desktop is-hidden-tablet")) {
            document.getElementById("filter-set").className = document.getElementById("filter-set").className + " is-hidden-desktop is-hidden-tablet";
            document.getElementById("divider").className = document.getElementById("divider").className + " is-hidden-desktop is-hidden-tablet";
        }
        else {
            document.getElementById("filter-set").className = 'column is-2 is-hidden-mobile is-hidden-tablet-only mr-4';
            document.getElementById("divider").className = 'is-divider-vertical is-white is-hidden-mobile is-hidden-tablet-only';
        }
        document.getElementById("filter-model").className = document.getElementById("filter-model").className + " is-active"
    }
    const DropTabs = () => {
        if (document.getElementById("tabs").className.includes("is-active")) {
            document.getElementById("tabs").className = "dropdown is-hidden-desktop"
        }
        else document.getElementById("tabs").className = document.getElementById("tabs").className + " is-active"
    }
    return (
        <>


            <div className='columns is-vcentered is-mobile m-0'>
                {/* <div className=" column mb-0 is-hidden-mobile is-hidden-tablet-only is-2-desktop ml-4 mt-2" >
                    <img className="image" style={{ padding: "0px" }} width="200" height="200" src={"https://cdn.vlabs.ac.in/logo/vlead-large.png"} />
                </div> */}
                <div className='column is-three-fifths-desktop is-offset-one-quarter-desktop  ' >
                    <div className="field has-addons">
                        <div className='control' style={{ marginTop: "auto", marginBottom: "auto" }}>
                            <p className="control has-icons-left">
                                <input className="input is-large" size="42" placeholder="Search" style={{ borderRadius: "290000px", borderWidth: "3px", borderColor: "black" }} onChange={SearchExp} value={word} />
                                <span className="icon is-small is-left">
                                    <FcSearch />
                                </span>
                            </p>
                        </div>
                        <div className="control" style={{ marginTop: "auto", marginBottom: "auto" }}>
                            <button id="button-style" className="button is-info ml-6 has-text-white is-large" style={{ borderRadius: "290000px", borderWidth: "3px", borderColor: "black" }} onClick={ToggleFilter}>
                                <HiFilter /> Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="tabs" className="dropdown is-hidden-desktop">
                <div className="dropdown-trigger">
                    <button className="button is-rounded is-primary is-light ml-3" style={{ width: "20vw" }} aria-haspopup="true" aria-controls="dropdown-menu" onClick={DropTabs}>
                        <span>Select Tab</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu" style={{ width: window.screen.width }}>
                    <div className="dropdown-content">
                        <a id="pop-tab" href="#" className="dropdown-item is-active" onClick={LoadPop}>
                            Popular
                        </a>
                        <a id="rec-tab" className="dropdown-item" onClick={LoadRecents}>
                            Recents
                        </a>
                        <a id="all-tabs" href="#" className="dropdown-item" onClick={LoadAll}>
                            All Experiments
                        </a>
                        <a id="save-tabs" href="#" className="dropdown-item" onClick={LoadSaved}>
                            Saved
                        </a>
                    </div>
                </div>
            </div>
            <ExperimentLoader experiments={experiments} word={word} pagenum={page} setp={setPage} settp={setTotal} nav={nav} setNav={setNav} pop={Pop} pages = {totalPage} fetched={fetched}/>
            {
                totalPage != 0 ?
                    <footer className="theme" style={{ padding: "2%", marginBottom: "10px" }}>
                        <div className="content has-text-centered">
                            <button className=' button is-pulled-left ml-1' style={{ fontSize: '20px' }}
                                disabled={page === 1} onClick={PrevPage}>
                                <AiOutlineArrowLeft />&nbsp;Previous
                            </button>
                            <button className='button is-pulled-right mr-1' style={{ fontSize: '20px' }}
                                disabled={page === totalPage} onClick={NextPage}>
                                Next&nbsp;<AiOutlineArrowRight />
                            </button>
                            <p className='is-size-4'>
                                Page {page} of {totalPage}
                            </p>
                        </div>
                    </footer> : <span>
                        {/* {fetched ?
                            <h1 className='has-text-black has-text-centered is-size-1'>No Results Found</h1>
                            : <Loader />
                        } */}
                    </span>}
        </>
    );
}

export default ExpComponent;