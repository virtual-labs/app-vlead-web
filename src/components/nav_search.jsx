import * as React from "react";
import Fuse from "fuse.js";

export default NavSearch = () => {
    const [experiments, setExperiments] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    // fetch experiments from API
    React.useEffect(() => {
        fetch("https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items")
            .then((response) => response.json())
            .then((data) => {
                setExperiments(data)
            });
        }, []);

    return (
        <div>
            Hi
        </div>
    )
};
