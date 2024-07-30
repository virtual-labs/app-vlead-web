import 'bulma/css/bulma.min.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import ExperimentLoader from '../components/ExperimentLoader';
import React, { useState } from 'react';
import { HiFilter } from 'react-icons/hi'
import Navbar from './Navbar_pwa';
import NavbarBigScreen from '../components/NavbarBigScreen';

function ExpComponent() {
const [experiments, setExperiments] = React.useState([]);
const [nav, setNav] = useState(3);
const [word, setWord] = useState("");
const [page, setPage] = useState(1);
const [totalPage, setTotal] = useState(1);
const [Pop, setPop] = useState([]);
const [fetched, setFetched] = useState(0);
const [filterActive, setFilterActive] = useState(false);
const [isSearchFocused, setIsSearchFocused] = useState(false);

const PrevPage = () => {
  setPage(page - 1);
};

const NextPage = () => {
  setPage(page + 1);
};

React.useEffect(() => {
  fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      setExperiments(data);
      setTotal(Math.ceil(data.length / 8));
      let copy = [...data];
      setPop(copy.sort((a, b) => b["Pageviews"] - a["Pageviews"]));
      setFetched(1);
    });
}, []);

const SearchExp = (e) => {
  setWord(e.target.value);
};

const ToggleFilter = () => {
  setFilterActive(!filterActive);
  console.log(document.getElementById("filter-set").className);
  if (!document.getElementById("filter-set").className.includes("is-hidden-desktop is-hidden-tablet")) {
    document.getElementById("filter-set").className = document.getElementById("filter-set").className + " is-hidden-desktop is-hidden-tablet";
  } else {
    document.getElementById("filter-set").className = 'column is-2 is-hidden-mobile is-hidden-tablet-only mr-4';
  }
  document.getElementById("filter-model").className = document.getElementById("filter-model").className + " is-active";
};

return (
  <div style={{backgroundColor: "#FFFFFF"}}>
    <Navbar setp={setPage} settp={setTotal} nav={nav} setNav={setNav} />
    <NavbarBigScreen experiments={experiments} word={word} pagenum={page} setp={setPage} settp={setTotal} nav={nav} setNav={setNav} pop={Pop} />

    <hr style={{ backgroundColor: "#000000", height: "1px", margin: "0 0 0 0" }}></hr>
    <div className='columns is-vcentered is-mobile m-0' style={{backgroundColor: "#1C6E8C"}}>
      <div className='column is-three-fifths-desktop' style={{ margin: "auto" }}>
        <div className="field has-addons" style={{ display: "flex", alignItems: "center" }}>
          
          {/* Search Button */}
          <div className="control has-icons-left has-icons-right" style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: isSearchFocused ? "100%" : "80%", transition: "width 0.3s ease" }}>
              <input
                className="input is-normal"
                type="search"
                placeholder="Search Experiment"
                style={{
                  borderRadius: "290000px",
                  borderWidth: "1px",
                  borderColor: "black",
                  width: "100%",
                  paddingLeft: "2.5rem"
                }}
                onChange={SearchExp}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <span className="icon is-small is-left" style={{ left: "10px", position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
                <span className="material-symbols-outlined">search</span>
              </span>
            </div>
          </div>

          {/* Filter Button */}
          <div className="control" style={{ marginLeft: "10px" }}>
            <button
              id="button-style"
              className={`button ${filterActive ? 'is-dark has-text-white' : 'is-white has-text-gray'}`}
              style={{ borderRadius: "50px", borderWidth: "1px", borderColor: "black", padding: "0.5rem 1rem" }}
              onClick={ToggleFilter}
            >
              <HiFilter /> Filter
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr style={{ backgroundColor: "#000000", height: "1px", margin: "0 0 0 0" }}></hr>
    <ExperimentLoader experiments={experiments} word={word} pagenum={page} setp={setPage} settp={setTotal} nav={nav} setNav={setNav} pop={Pop} />

    {totalPage !== 0 ? (
      <footer className="footer" style={{ padding: "1.5%", backgroundColor: "black" }}>
        <div className="content has-text-centered">
          <button className='button is-dark has-text-white is-pulled-left is-normal' style={{ fontSize: '15px' }}
            disabled={page === 1} onClick={PrevPage}>
            <AiOutlineArrowLeft />&nbsp;Previous
          </button>
          <button className='button is-dark has-text-white is-pulled-right is-normal' style={{ fontSize: '15px' }}
            disabled={page === totalPage} onClick={NextPage}>
            Next&nbsp;<AiOutlineArrowRight />
          </button>
          <p className='has-text-white' style={{ fontSize: "100%" }}>
            Page {page} of {totalPage}
          </p>
        </div>
      </footer>
    ) : (
      <span>
        {fetched ? (
          <h1 className='has-text-black has-text-centered is-size-1'>No Results Found</h1>
        ) : (
          <h1 className='has-text-black has-text-centered is-size-1'>Loading</h1>
        )}
      </span>
    )}
  </div>
);
}

export default ExpComponent;
