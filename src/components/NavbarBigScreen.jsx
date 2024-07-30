import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { AiFillExperiment, AiFillStar } from 'react-icons/ai';
import { BsFillBookmarkStarFill } from 'react-icons/bs';

function NavbarBigScreen(props) {
    const [Display, setDisplay] = useState([]);
    const [History, setHistory] = useState([]);
    const [saved, setSaved] = useState([]);
    const [Exp, setExp] = useState([]);
    const [Word, setWord] = useState("");
    const [selectedTab, setSelectedTab] = useState('popular');
    
    useEffect(() => {
        setExp(props.experiments);
        setWord(props.word);
    }, [props]);

    const LoadRecents = () => {
        setSelectedTab('recent');
        props.settp(Math.ceil(History.length / 8));
        props.setp(1);
        props.setNav(1);
    };
    
    const LoadSaved = () => {
        setSelectedTab('saved');
        props.settp(Math.ceil(saved.length / 8));
        props.setp(1);
        props.setNav(2);
    };
    
    const LoadAll = () => {
        setSelectedTab('all');
        props.settp(Math.ceil(Display.length / 8));
        props.setp(1);
        props.setNav(0);
    };
    
    const LoadPop = () => {
        setSelectedTab('popular');
        props.settp(Math.ceil(History.length / 8));
        props.setp(1);
        props.setNav(3);
    };

    const getButtonStyle = (tab) => ({
        borderBottom: selectedTab === tab ? '2px solid black' : 'none'
    });

    return (
        <div className="columns is-vcentered is-hidden-mobile is-hidden-tablet-only is-2-desktop"
		style={{ padding: "0px", marginTop: "0", marginBottom: "0", backgroundColor: "#FFFFFF"}}>
            <div className="column is-1">
                <img alt="" className="image" style={{ padding: "0px", marginLeft: "30px", marginRight: "30px" }} width="100" src={"https://cdn.vlabs.ac.in/logo/vlead-large.png"} />
            </div>
            <div className="column" style={{ padding: "0px", marginLeft: "50px", marginRight: "30px" }}>
                <div className="buttons has-addons">
                    <button id="popular-tab" className='button is-white has-text-black is-normal'
                        style={{...getButtonStyle('popular'), backgroundColor: "#FFFFFF"}} onClick={LoadPop}>
                        <AiFillStar /> Popular
                    </button>
                    <button id="recent-tab" className='button is-white has-text-black is-normal'
                        style={{...getButtonStyle('recent'), backgroundColor: "#FFFFFF"}} onClick={LoadRecents}>
                        <RxCounterClockwiseClock /> Recents
                    </button>
                    <button id="all-tab" className='button is-white has-text-black is-normal'
                        style={{...getButtonStyle('all'), backgroundColor: "#FFFFFF"}} onClick={LoadAll}>
                        <AiFillExperiment /> All Experiments
                    </button>
                    <button id="save-tab" className='button is-white has-text-black is-normal'
                        style={{ ...getButtonStyle('saved'), backgroundColor: "#FFFFFF"}} onClick={LoadSaved}>
                        <BsFillBookmarkStarFill /> Starred
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NavbarBigScreen;
