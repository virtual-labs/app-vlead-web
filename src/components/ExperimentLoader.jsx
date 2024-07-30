import React, { useState } from 'react'
import 'bulma/css/bulma.min.css';
import 'bulma-divider'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bulma-switch'
import { AiFillStepBackward, AiFillDelete, AiFillSave } from 'react-icons/ai'
import { BsFillSave2Fill, BsFillBookmarkPlusFill, BsFillStickyFill } from 'react-icons/bs';
import { BulmaComponent } from 'yatharth-super-lemon'
export default function ExperimentLoader(props) {
    const [Instis, setInstis] = useState(["option1-Insti", "option2-Insti"])
    const [Discipline, setDiscipline] = useState(["option1-discipline", "option2-dis"])
    const [Display, setDisplay] = useState([])
    const [SelectInstis, setSelectInstis] = useState([])
    const [SelectDisciplines, setSelectDiscipline] = useState([])
    const [History, setHistory] = useState([])
    const [saved, setSaved] = useState([])
    const [saved_filters, setSavedFilters] = useState(JSON.parse(localStorage.getItem("Saved_Filters")))
    const [apply, setApply] = useState(1);
    const [rename1, setRename1] = useState(0);
    const [rename2, setRename2] = useState(0);
    const [rename3, setRename3] = useState(0);
    const [Exp,setExp] = useState([])
    const [Word,setWord] = useState("")
    const disc = {
        "Civil Engineering": "CIVIL",
        "Computer Science and Engineering": "CSE",
        "Electronics and Communication Engineering": "ECE",
        "Electrical Engineering": "ELECTRICAL",
        "Mechanical Engineering": "MECHANICAL",
        "Biotechnology and Biomedical Engineering": "BIO-TECH",
        "Chemical Sciences": "CHEM-SCI",
        "Physical Sciences": "PHY-SCI",
        "Chemical Engineering": "CHEMICAL",
    }

    const IncludeDis = (element) => {
        let copy = [...SelectDisciplines]
        copy.push(element)
        setSelectDiscipline(copy)
    }
    const ExcludeDis = (element) => {
        let copy = [...SelectDisciplines]
        let idx = copy.indexOf(element)
        copy.splice(idx, 1)
        setSelectDiscipline(copy)
    }
    const IncludeInsti = (element) => {
        let copy = [...SelectInstis]
        copy.push(element)
        setSelectInstis(copy)
    }
    const ExcludeInsti = (element) => {
        let copy = [...SelectInstis]
        let idx = copy.indexOf(element)
        copy.splice(idx, 1)
        setSelectInstis(copy)
    }
    const CloseModal = () => {
        document.getElementById("filter-model").className = "modal is-hidden-desktop";
    }
    const OpenLink = (link) => {
        let name
        for (let i of Display) {
            if (i["Experiment URL"]===link)
                name = i["Experiment Name"]
        }
        var a = localStorage.getItem("history");
        if (a === null) a = ""
        else a += ","
        a = a.replace(name, "")
        a += name
        let links = a.split(",");
        links = links.filter((ele) => {
            return ele !==""
        })
        links.reverse()
        setHistory(links.slice(0, 8))
        localStorage.setItem("history", a);
        var win = window.open("https://" + link, '_blank');
        win.focus();
    }
    const SaveFilter = () => {
        console.log(saved_filters);
        let a = {};
        if (saved_filters) a = JSON.parse(JSON.stringify(saved_filters))
        if (!a || !a["Filter1"]) {
            a["Filter1"] = {
                Instis: JSON.parse(JSON.stringify(SelectInstis)),
                Discipline: JSON.parse(JSON.stringify(SelectDisciplines)),
                AltName: "Filter1"
            }
            window.alert("Saved as Filter1")
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            setSavedFilters(a);
        }
        else if (!a["Filter2"]) {
            a["Filter2"] = {
                Instis: JSON.parse(JSON.stringify(SelectInstis)),
                Discipline: JSON.parse(JSON.stringify(SelectDisciplines)),
                AltName: "Filter2"
            }
            window.alert("Saved as Filter2")
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            setSavedFilters(a);
        }
        else if (!a["Filter3"]) {
            a["Filter3"] = {
                Instis: JSON.parse(JSON.stringify(SelectInstis)),
                Discipline: JSON.parse(JSON.stringify(SelectDisciplines)),
                AltName: "Filter3"
            }
            window.alert("Saved as Filter3")
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            setSavedFilters(a);
        }
        else {
            window.alert("3 filters already saved. Delete some first")
        }
    }
    const ToggleSave = (exp) => {
        console.log(exp)
        if (saved.includes(exp)) {
            let a = localStorage.getItem("saved");
            a = a.replace(exp, "")
            let saves = a.split(",");
            saves = saves.filter((ele) => {
                return ele !==""
            })
            setSaved(saves)
            localStorage.setItem("saved", saves.join(","))
        }
        else {
            let a = localStorage.getItem("saved");
            a += "," + exp
            let saves = a.split(",");
            saves = saves.filter((ele) => {
                return ele !==""
            })
            setSaved(saves)
            localStorage.setItem("saved", saves.join(","))
        }
    }
    const ClearFilter = () => {
        setSelectDiscipline([])
        setSelectInstis([])
    }
    const ApplyFilter = (name) => {
        setSelectDiscipline(saved_filters[name]["Discipline"]);
        setSelectInstis(saved_filters[name]["Instis"])
        window.alert(saved_filters[name]["AltName"] + " Applied")
        setApply(1);
    }
    const RenameFilter = (name) => {
        if (name==="Filter1") setRename1(1 - rename1);
        else if (name==="Filter2") setRename2(1 - rename2);
        else if (name==="Filter3") setRename3(1 - rename3);
    }
    const ChangeName = (name, val) => {
        if (val && val !=="") {
            let a = JSON.parse(JSON.stringify(saved_filters))
            a[name]["AltName"] = val;
            setSavedFilters(a)
            localStorage.setItem("Saved_Filters", JSON.stringify(a));
            RenameFilter(name)
        }
    }
    const DeleteFilter = (name) => {
        let a = JSON.parse(JSON.stringify(saved_filters))
        a[name] = null;
        setSavedFilters(a)
        localStorage.setItem("Saved_Filters", JSON.stringify(a));
        window.alert("Filter deleted")
    }
    React.useEffect(() => {
        setExp(props.experiments)
        setWord(props.word)
    }, [props]);
    React.useEffect(() => {
        let arr = []
        let arr_dis = []
        for (let i of Exp) {
            if (!arr.includes(i["Insitute Name"]))
                arr.push(i["Insitute Name"])
            if (!arr_dis.includes(i["Discipline Name"]))
                arr_dis.push(i["Discipline Name"])
        }
        let a = ""
        if (localStorage.getItem("history") !== undefined && localStorage.getItem("history") !== null) {
            a = localStorage.getItem("history")
        }
        let links = a.split(",")
        links = links.filter((ele) => {
            return ele !==""
        })
        links.reverse()
        if (localStorage.getItem("saved") === null) {
            localStorage.setItem("saved", "")
        }
        else {
            setSaved(localStorage.getItem("saved").split(",").filter((ele) => {
                return ele !=="";
            }))
        }
        setInstis(arr)
        setDiscipline(arr_dis)
        setDisplay(Exp)
        setHistory(links)
    }, [Exp]);

    React.useEffect(() => {
        let arr = []
        let arr_after_search = []
        if (Word === "") {
            arr_after_search = [...Exp]
        }
        else {
            for (let i of Exp) {
                if (i["Experiment Name"].toLowerCase().includes(Word.toLowerCase()) ||
                    i["Lab Name"].toLowerCase().includes(Word.toLowerCase())) {
                    arr_after_search.push(i)
                }
                else {
                    let flag = false
                    for (let j of i["Tags"].split()) {
                        if (j.toLowerCase().includes(Word.toLowerCase())) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) arr_after_search.push(i)
                }
            }
        }
        if (SelectDisciplines.length === 0 && SelectInstis.length === 0) {
            setDisplay(arr_after_search)
            props.setp(1);
            props.settp(Math.ceil(arr_after_search.length / 8))
            return;
        }
        for (let i of arr_after_search) {
            if ((SelectDisciplines.includes(i["Discipline Name"]) || SelectDisciplines.length===0) &&
                (SelectInstis.includes(i["Insitute Name"]) || SelectInstis.length===0)) {
                arr.push(i)
            }
        }
        setDisplay(arr)
        props.setp(1);
        props.settp(Math.ceil(arr.length / 8))
    }, [Exp,SelectDisciplines, SelectInstis, Word]);//eslint-disable-line
    return (
        <div>
            <div className="columns m-0 is-mobile">
                <div id="filter-model" className="modal is-hidden-desktop">
                    <div className="modal-background"></div>
                    <div className="modal-card " style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
                        <header className="modal-card-head">
                            <p className="modal-card-title">Filters</p>
                            <button className="delete" aria-label="close" onClick={CloseModal}></button>
                        </header>
                        <section className="modal-card-body">
                            {apply ? <><div className="field mb-4 ml-4">
                                <label className="label m-2 is-size-4 has-text-primary" style={{ textShadow: "0.15rem 0.15rem #D5F2D8" }}>Institutes</label>
                                {
                                    Instis.map((element) => {
                                        if (SelectInstis.includes(element))
                                            return (
                                                <>
                                                    <button className="button is-rounded is-success is-light has-text-black is-small is-focused m-2"
                                                        onClick={() => { ExcludeInsti(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{element}</button>
                                                </>
                                            )
                                        else
                                            return (
                                                <>
                                                    <button className="button is-rounded is-danger is-light is-focused is-small m-2 has-text-black"
                                                        onClick={() => { IncludeInsti(element) }}
                                                        style={{
                                                            boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                            height: "max-content", whiteSpace: "inherit"
                                                        }}>{element}</button>
                                                </>
                                            )
                                    })
                                }
                            </div>
                                <hr style={{"backgroundColor":"black"}}/>
                                <div className="field mb-4 ml-4">
                                    <label className="label m-2 is-size-4 has-text-primary" style={{ textShadow: "0.15rem 0.15rem #D5F2D8" }}>Discipline</label>
                                    {
                                        Discipline.map((element) => {
                                            if (SelectDisciplines.includes(element))
                                                return (
                                                    <>
                                                        <button className="button is-rounded is-success is-light has-text-black is-small is-focused m-2"
                                                            onClick={() => { ExcludeDis(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{disc[element]}</button>

                                                    </>
                                                )
                                            else
                                                return (
                                                    <>
                                                        <button className="button is-rounded is-danger is-light is-focused is-small m-2 has-text-black"
                                                            onClick={() => { IncludeDis(element) }}
                                                            style={{
                                                                boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                                height: "max-content", whiteSpace: "inherit"
                                                            }}>{disc[element]}</button>

                                                    </>
                                                )
                                        })
                                    }
                                </div></> : null}
                            {
                                apply===0 ? <>
                                    <ul className='m-4' style={{ color: "black" }}>
                                        {saved_filters && saved_filters["Filter1"] ?
                                            <li className='mt-5'>
                                                <span style={{ backgroundColor: "lightgreen", borderRadius: "29000px", padding: "7px" }}><b>{saved_filters["Filter1"]["AltName"]}</b></span>
                                                <br />
                                                <button className='button mt-2 ml-1 is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { ApplyFilter("Filter1") }}>Apply</button>
                                                <button className='mt-2 ml-1 button is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { RenameFilter("Filter1") }}>Rename</button>
                                                <button className='mt-2 ml-1 button is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { DeleteFilter("Filter1") }}>Delete</button>
                                                {
                                                    rename1 ? <>
                                                        <input id="Filter1-val" className="input is-small ml-1 is-rounded mt-3" size="1" placeholder='Enter the new name' style={{ border: "2px solid black" }}></input>
                                                        <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black' onClick={() => {
                                                            ChangeName("Filter1", document.getElementById("Filter1-val").value)
                                                        }}>Save</button>
                                                    </> : null
                                                }
                                            </li> : null}
                                        {saved_filters && saved_filters["Filter2"] ?
                                            <li className='mt-5'>
                                                <span style={{ backgroundColor: "lightgreen", borderRadius: "29000px", padding: "7px" }}><b>{saved_filters["Filter2"]["AltName"]}</b></span>
                                                <br />
                                                <button className='button mt-2 ml-1  is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { ApplyFilter("Filter2") }}>Apply</button>
                                                <button className='mt-2 ml-1 button is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { RenameFilter("Filter2") }}>Rename</button>
                                                <button className='mt-2 ml-1 button is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { DeleteFilter("Filter2") }}>Delete</button>
                                                {
                                                    rename2 ? <>
                                                        <input id="Filter2-val" className="input is-small ml-1 is-rounded mt-3" size="1" placeholder='Enter the new name' style={{ border: "2px solid black" }}></input>
                                                        <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black' onClick={() => {
                                                            ChangeName("Filter2", document.getElementById("Filter2-val").value)
                                                        }}>Save</button>
                                                    </> : null
                                                }
                                            </li> : null}
                                        {saved_filters && saved_filters["Filter3"] ?
                                            <li className='mt-5'>
                                                <span style={{ backgroundColor: "lightgreen", borderRadius: "29000px", padding: "7px" }}><b>{saved_filters["Filter3"]["AltName"]}</b></span>
                                                <br />
                                                <button className='button mt-2 ml-1 is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { ApplyFilter("Filter3") }}>Apply</button>
                                                <button className='mt-2 ml-1 button is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { RenameFilter("Filter3") }}>Rename</button>
                                                <button className='mt-2 ml-1 button is-small is-success is-light is-rounded has-text-black'
                                                    onClick={() => { DeleteFilter("Filter3") }}>Delete</button>
                                                {
                                                    rename3 ? <>
                                                        <input id="Filter3-val" className="input is-small ml-1 is-rounded mt-3" size="1" placeholder='Enter the new name' style={{ border: "2px solid black" }}></input>
                                                        <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black' onClick={() => {
                                                            ChangeName("Filter3", document.getElementById("Filter3-val").value)
                                                        }}>Save</button>
                                                    </> : null
                                                }
                                            </li> : null}
                                    </ul>
                                </> : null
                            }
                        </section>
                        <footer className="modal-card-foot" style={{ overflow: "auto" }}>
                            {apply ?
                                <><button className='button is-success is-light is-rounded' style={{ padding: "8px" }} onClick={() => {
                                    setApply(0);
                                }}><AiFillSave />View Saved</button>
                                    <button id="but-3" className='button is-info is-rounded' style={{ padding: "8px" }} onClick={ClearFilter}><AiFillDelete />Clear</button>
                                    <button id="but-4" className='button is-info is-rounded' style={{ padding: "8px" }} onClick={SaveFilter}><BsFillBookmarkPlusFill />Save</button></> : null}
                            {
                                !apply ? <><button className='button is-success is-light is-rounded' style={{ padding: "8px" }} onClick={() => {
                                    setApply(1);
                                }}><AiFillStepBackward />Back</button>
                                </> : null
                            }
                        </footer>
                    </div>
                </div>
                <div className='column'>
                    
                    <br className='is-hidden-mobile is-hidden-tablet-only' />
                    <br className='is-hidden-mobile is-hidden-tablet-only' />
                    {
                        props.nav===0 ? (
                            <div className='columns is-mobile is-multiline'>
                                {
                                    props.settp(Math.ceil(Display.length / 8))
                                }
                                {
                                    Display.slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                        return (
                                            <div className='column is-one-quarter-desktop' key={Math.random()} >
                                                <BulmaComponent onclickinglink={() => { OpenLink(exp["Experiment URL"]) }} onValueChange={() => { ToggleSave(exp["Experiment Name"]) }} UserData={{
                                                    exp_name: exp["Experiment Name"],
                                                    institute: exp["Insitute Name"],
                                                    exp_link: exp["Experiment URL"],
                                                    exp_img: exp["Image"],
                                                    institute_img: "https://cdn.vlabs.ac.in/logo/" + exp["Insitute Name"].toLowerCase() + ".png",
                                                    card_content: exp["Description"],
                                                    rating: exp["Rating"],
                                                    domain: exp["Discipline Name"],
                                                    lab: exp["Lab Name"],
                                                    saved: saved.includes(exp["Experiment Name"])
                                                }} />
                                            </div>
                                        )
                                    })
                                }
                            </div>) : null}
                    {
                        props.nav===1 ? (
                            <div className='columns is-multiline is-mobile'>
                                {
                                    props.settp(Math.ceil(History.filter((ele) => {
                                        for (let i of Display) {
                                            if (i["Experiment Name"] === ele) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }).length / 8))
                                }
                                {
                                    History.filter((ele) => {
                                        for (let i of Display) {
                                            if (i["Experiment Name"] === ele) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    }).slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                        let a = {}
                                        for (let i of props.experiments) {
                                            if (i["Experiment Name"] === exp) {
                                                a = i;
                                                break;
                                            }
                                        }
                                        return (
                                            <div className='column is-one-quarter-desktop' key={Math.random()}>
                                                <BulmaComponent onclickinglink={() => { OpenLink(a["Experiment URL"]) }} onValueChange={() => { ToggleSave(a["Experiment Name"]) }} UserData={{
                                                    exp_name: a["Experiment Name"],
                                                    institute: a["Insitute Name"],
                                                    exp_link: a["Experiment URL"],
                                                    exp_img: a["Image"],
                                                    institute_img: "https://cdn.vlabs.ac.in/logo/" + a["Insitute Name"].toLowerCase() + ".png",
                                                    card_content: a["Description"],
                                                    rating: a["Rating"],
                                                    domain: a["Discipline Name"],
                                                    lab: a["Lab Name"],
                                                    saved: saved.includes(a["Experiment Name"])
                                                }} />
                                            </div>
                                        )
                                    })
                                }
                            </div>) : null}
                    {
                        props.nav===2 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(saved.filter((ele) => {
                                    for (let i of Display) {
                                        if (i["Experiment Name"] === ele) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }).length / 8))

                            }
                            {
                                console.log(typeof (saved))
                            }
                            {
                                saved.filter((ele) => {
                                    for (let i of Display) {
                                        if (i["Experiment Name"] === ele) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }).slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    let a = {}
                                    for (let i of props.experiments) {
                                        if (i["Experiment Name"] === exp) {
                                            a = i;
                                            break;
                                        }
                                    }
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <BulmaComponent onclickinglink={() => { OpenLink(a["Experiment URL"]) }} onValueChange={() => { ToggleSave(a["Experiment Name"]) }} UserData={{
                                                exp_name: a["Experiment Name"],
                                                institute: a["Insitute Name"],
                                                exp_link: a["Experiment URL"],
                                                exp_img: a["Image"],
                                                institute_img: "https://cdn.vlabs.ac.in/logo/" + a["Insitute Name"].toLowerCase() + ".png",
                                                card_content: a["Description"],
                                                rating: a["Rating"],
                                                domain: a["Discipline Name"],
                                                lab: a["Lab Name"],
                                                saved: saved.includes(a["Experiment Name"])
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                    {
                        props.nav===3 ? (<div className='columns is-multiline is-mobile'>
                            {
                                props.settp(Math.ceil(Math.min(8, Display.length) / 8))
                            }
                            {
                                props.pop.filter((ele) => {
                                    if (Display.includes(ele)) return true;
                                    else return false;
                                }).slice(0, 8).slice((props.pagenum - 1) * 8, (props.pagenum) * 8).map((exp) => {
                                    return (
                                        <div className='column is-one-quarter-desktop' key={Math.random()}>
                                            <BulmaComponent onclickinglink={() => { OpenLink(exp["Experiment URL"]) }} onValueChange={() => { ToggleSave(exp["Experiment Name"]) }} UserData={{
                                                exp_name: exp["Experiment Name"],
                                                institute: exp["Insitute Name"],
                                                exp_link: exp["Experiment URL"],
                                                exp_img: exp["Image"],
                                                institute_img: "https://cdn.vlabs.ac.in/logo/" + exp["Insitute Name"].toLowerCase() + ".png",
                                                card_content: exp["Description"],
                                                rating: exp["Rating"],
                                                domain: exp["Discipline Name"],
                                                lab: exp["Lab Name"],
                                                saved: saved.includes(exp["Experiment Name"])
                                            }} />
                                        </div>
                                    )
                                })
                            }
                        </div>) : null}
                </div>
                <div id="filter-set" className='column is-2 is-hidden-mobile is-hidden-desktop is-hidden-tablet' style={{"borderLeft":"3px solid black"}}>
                    <div className=" " style={{ textAlign: "center", whiteSpace: "nowrap", overflow: "auto" }}>

                        {apply ? <>
                            <span style={{ display: "inline-block", whiteSpace: "normal" }}>
                                <button className='button is-white has-text-black is-medium' style={{ border: "2px solid black", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }}>
                                    <BsFillStickyFill />{" "}Apply
                                </button>
                            </span>
                            <span style={{ display: "inline-block", whiteSpace: "normal" }}>
                                <button className='button is-white has-text-black is-medium' style={{ border: "2px solid black", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }} onClick={() => {
                                    setApply(0);
                                }}>
                                    <BsFillSave2Fill />&nbsp;Load
                                </button>

                            </span></> : null}
                        {!apply ? <>
                            <span style={{ display: "inline-block", whiteSpace: "normal" }}>
                                <button className='button is-primary has-text-black is-medium' style={{ border: "2px solid black", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" }} onClick={() => {
                                    setApply(1);
                                }}>
                                    <BsFillStickyFill />{" "}Apply
                                </button>
                            </span >
                            <span style={{ display: "inline-block", whiteSpace: "normal" }}>
                                <button className='button is-info has-text-black is-medium' style={{ border: "2px solid black", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}>
                                    <BsFillSave2Fill />&nbsp;Load
                                </button>

                            </span></> : null}

                    </div>
                    {apply ? <>
                        <div className="field mb-4 ml-4">
                            <label className="label is-size-4 has-text-black" style={{ marginTop: "50px" }}>Institutes</label>
                            {
                                Instis.map((element) => {
                                    if (SelectInstis.includes(element))
                                        return (
                                            <>
                                                <button className="button is-success is-dark has-text-black is-small is-focused m-2"
                                                    onClick={() => { ExcludeInsti(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{element}</button>
                                            </>
                                        )
                                    else
                                        return (
                                            <>
                                                <button className="button is-warning is-dark is-focused is-small m-2 has-text-black"
                                                    onClick={() => { IncludeInsti(element) }}
                                                    style={{
                                                        boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                        height: "max-content", whiteSpace: "inherit"
                                                    }}>{element}</button>
                                            </>
                                        )
                                })
                            }
                        </div>
                        <hr style={{"backgroundColor":"black"}}></hr>
                        <div className="field mb-4 ml-4">
                            <label className="label m-2 is-size-4 has-text-black">Discipline</label>
                            {
                                Discipline.map((element) => {
                                    if (SelectDisciplines.includes(element))
                                        return (
                                            <>
                                                <button className="button is-success is-dark has-text-black is-small is-focused m-2"
                                                    onClick={() => { ExcludeDis(element) }} style={{ height: "max-content", whiteSpace: "inherit" }}>{disc[element]}</button>
                                            </>
                                        )
                                    else
                                        return (
                                            <>
                                                <button className="button is-warning is-dark is-focused is-small m-2 has-text-black"
                                                    onClick={() => { IncludeDis(element) }}
                                                    style={{
                                                        boxShadow: "0 8px 8px 8px rgba(0,0,0,0.4)",
                                                        height: "max-content", whiteSpace: "inherit"
                                                    }}>{disc[element]}</button>
                                            </>
                                        )
                                })
                            }
                        </div>
                        <hr style={{"backgroundColor":"black"}}/>
                        <div className='has-text-centered'>
                            <button id="but-1" className='button is-danger is-dark mr-4' style={{ padding: "8px" }} onClick={ClearFilter}><AiFillDelete />Clear</button>
                            <button id="but-2" className='button is-success is-dark' style={{ padding: "8px" }} onClick={SaveFilter}><BsFillBookmarkPlusFill />Save</button>
                        </div>
                    </> : null}
                    {
                        apply===0 ? <>
                            <ul style={{ color: "black", marginTop: "60px" }}>
                                {saved_filters && saved_filters["Filter1"] ?
                                    <li className='mt-3'>
                                        <span style={{ backgroundColor: "lightgreen", borderRadius: "29000px", padding: "7px" }}><b>{saved_filters["Filter1"]["AltName"]}</b></span>
                                        <br />
                                        <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { ApplyFilter("Filter1") }}>Apply</button>
                                        <button className='mt-2 ml-1 button is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { RenameFilter("Filter1") }}>Rename</button>
                                        <button className='mt-2 ml-1 button is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { DeleteFilter("Filter1") }}>Delete</button>
                                        {
                                            rename1 ? <>
                                                <input id="Filter1-change" className="input is-small ml-1 is-rounded mt-3" size="1" placeholder='Enter the new name' style={{ border: "2px solid black" }}></input>
                                                <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black' onClick={() => {
                                                    ChangeName("Filter1", document.getElementById("Filter1-change").value)
                                                }}>Save</button>
                                            </> : null
                                        }
                                    </li> : null}
                                {saved_filters && saved_filters["Filter2"] ?
                                    <li className='mt-5'>
                                        <span style={{ backgroundColor: "lightgreen", borderRadius: "29000px", padding: "7px" }}><b>{saved_filters["Filter2"]["AltName"]}</b></span>
                                        <br />
                                        <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { ApplyFilter("Filter2") }}>Apply</button>
                                        <button className='mt-2 ml-1 button is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { RenameFilter("Filter2") }}>Rename</button>
                                        <button className='mt-2 ml-1 button is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { DeleteFilter("Filter2") }}>Delete</button>
                                        {
                                            rename2 ? <>
                                                <input id="Filter2-change" className="input is-small ml-1 is-rounded mt-3" size="1" placeholder='Enter the new name' style={{ border: "2px solid black" }}></input>
                                                <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black' onClick={() => {
                                                    ChangeName("Filter2", document.getElementById("Filter2-change").value)
                                                }}>Save</button>
                                            </> : null
                                        }
                                    </li> : null}
                                {saved_filters && saved_filters["Filter3"] ?
                                    <li className='mt-5'>
                                        <span style={{ backgroundColor: "lightgreen", borderRadius: "29000px", padding: "7px" }}><b>{saved_filters["Filter3"]["AltName"]}</b></span>
                                        <br />
                                        <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { ApplyFilter("Filter3") }}>Apply</button>
                                        <button className='mt-2 ml-1 button is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { RenameFilter("Filter3") }}>Rename</button>
                                        <button className='mt-2 ml-1 button is-small is-success is-rounded is-light has-text-black'
                                            onClick={() => { DeleteFilter("Filter3") }}>Delete</button>
                                        {
                                            rename3 ? <>
                                                <input id="Filter3-change" className="input is-small ml-1 is-rounded mt-3" size="1" placeholder='Enter the new name' style={{ border: "2px solid black" }}></input>
                                                <button className='button mt-2 ml-1 is-small is-success is-rounded is-light has-text-black'
                                                    onClick={() => {
                                                        ChangeName("Filter3", document.getElementById("Filter3-val").value)
                                                    }} >Save</button>
                                            </> : null
                                        }
                                    </li> : null}
                            </ul>
                        </> : null
                    }
                </div>
            </div>
        </div>
    )
}
