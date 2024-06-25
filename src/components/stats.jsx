import { useState, useEffect } from 'react';

const Stats = () => {
    const [stats, setStats] = useState({ users: 0, views: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://docs.google.com/spreadsheets/d/1x12nhpp0QvnsA6x-O1sV4IA9SAbfVsq_wiexWkutOmU/gviz/tq?tqx=out:json&tq&gid=1573630614";
            try {
                const res = await fetch(url);
                const data = await res.text();
                const parsedData = JSON.parse(data.substring(47).slice(0, -2));
                setStats({
                    users: parsedData.table.rows[0].c[2].f,
                    views: parsedData.table.rows[1].c[2].f
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <a className="m-auto px-2 is-size-5" id="user-display">
                <strong>
                    Users: {stats.users}
                </strong>
            </a>
            <a className="m-auto px-2 is-size-5" id="views-display">
                <strong>
                    Views: {stats.views}
                </strong>
            </a>
        </>
    );
};

export default Stats;