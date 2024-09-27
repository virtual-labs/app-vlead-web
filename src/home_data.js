const baseURL = import.meta.env.BASE_URL.replace(/\/+$/, "");

export default {
    "roles": [
        {
            "role": "default",
            "about": "This site operates based on three major roles: Learner, Educator and Creator. Based on your role, you will be presented with functions that are more appropriate for your use of this site. You can always change your role later!",
            "id": "default"
        },
        {
            "role": "learner",
            "about": "The role of the learner is simply to learn new concepts by studying and simulating any of the existing experiments in any of the labs. Scroll down or check out the navigation bar above to get started!",
            "id": "learner-text"
        },
        {
            "role": "educator",
            "about": "The role of the educator is to use Virtual Labs as a platform to simulate experiments as an aid to classroom teaching. Also, an educator can collaborate through the outreach programs.",
            "id": "educator-text"
        },
        {
            "role": "creater",
            "about": "The role of the creator is to contribute to Virtual Labs by developing new experiments under laboratories or otherwise. Development and hosting guidelines can be found on our Hosting Info page.",
            "id": "creator-text"
        }
    ],
    "domains": [
        {
            "title": "Computer Science and Engineering",
            "img": "cards/Comp.png",
            "frag": "comp"
        },
        {
            "title": "Mechanical",
            "img": "cards/Mech.png",
            "frag": "mech"
        },
        {
            "title": "Chemical Engineering",
            "img": "cards/ChemEngg.png",
            "frag": "chem"
        },
        {
            "title": "Electronics and Comm. Engineering",
            "img": "cards/ElCom.png",
            "frag": "el-com"
        },
        {
            "title": "Biotechnology",
            "img": "cards/Biotech.png",
            "frag": "bio-tech"
        },
        {
            "title": "Electrical Engineering",
            "img": "cards/Elec.png",
            "frag": "elec"
        },
        {
            "title": "Chemical Science",
            "img": "cards/Chem.png",
            "frag": "chem-sci"
        },
        {
            "title": "Physical Sciences",
            "img": "cards/Phys.png",
            "frag": "phy"
        },
        {
            "title": "Civil Engineering",
            "img": "cards/Civil.png",
            "frag": "civil"
        }
    ],
    "services": [
        {
            "title": "Development and Hosting",
            "href": "${baseURL}/development/",
            "img": "cards/development.webp",
            "body": ""
        },
        {
            "title": "Outreach",
            "href": "${baseURL}/outreach/",
            "img": "cards/outreach_2.jpg",
            "body": ""
        },
        {
            "title": "Research",
            "href": "${baseURL}/research/",
            "img": "cards/research.webp",
            "body": ""
        }
    ],
    "explore": [
        {
            "title": "Virtual Labs FAQ",
            "href": "${baseURL}/faq_page/",
            "img": "https://i.imgur.com/ZhFf5SE.jpg",
            "body": ""
        },
        {
            "title": "Workshop FAQ",
            "href": "${baseURL}/outreach/#faq",
            "img": "https://i.imgur.com/on7M1R7.jpg",
            "body": ""
        },
        {
            "title": "Analytics",
            "href": "${baseURL}/summary/",
            "img": "https://i.imgur.com/j0UDVdv.jpg",
            "body": ""
        }
    ],
    "shorty": "The Virtual Labs Engineering, Architecture, and Design (VLEAD) Team at IIIT Hyderabad optimizes Virtual Labs operations, including infrastructure management, system administration, user interface design, process coordination, analytics, automation, performance, security enhancements, content authoring tool development, and technology research. Their efforts ensure efficiency and a seamless learning experience."
};