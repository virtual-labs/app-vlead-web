const baseURL = import.meta.env.BASE_URL.replace(/\/+$/, "");

export default [
    {
        "name": "About",
        "dropdowns": [
            {
                "name": "Virtual Labs",
                "url": `${baseURL}/Vlabs/`,
                "id": "about-virtual-labs"
            },
            {
                "name": "VLEAD",
                "url": `${baseURL}/vlead/`,
                "id": "about-vlead"
            }
        ]
    },
    {
        "name": "I am",
        "dropdowns": [
            {
                "name": "a Learner",
                "url": `${baseURL}/experiments/`,
                "id": "drop-learner"
            },
            {
                "name": "a Facilitator",
                "url": `${baseURL}/outreach/`,
                "id": "drop-educator"
            },
            {
                "name": "a Creator",
                "url": `${baseURL}/development/`,
                "id": "drop-creator"
            }
        ]
    },
    {
        "name": "I want to",
        "dropdowns": [
            {
                "name": "Create Experiment",
                "url": `${baseURL}/development/#development-process`,
                "id": "create-experiment"
            },
            {
                "name": "Start Learning",
                "url": `${baseURL}/experiments/`,
                "id": "start-learning"
            },
            {
                "name": "Host Workshop",
                "url": `${baseURL}/outreach/#request-a-workshop`,
                "id": "outreach"
            },
            {
                "name": "Explore Research",
                "url": `${baseURL}/research/`,
                "id": "research"
            }
        ]
    },
    {
        "name": "Analytics",
        "dropdowns": [
            {
                "name": "Summary",
                "url": `${baseURL}/summary/`,
                "id": "summary"
            },
            {
                "name": "Detailed Analysis",
                "url": `${baseURL}/detailedAnalysis/`,
                "id": "Detailed-Analysis"
            }
        ]
    }
];
