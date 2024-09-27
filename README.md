# VLEAD Website Documentation

## Introduction

Welcome to the VLEAD Website Project Documentation. This documentation is divided into two main sections:

1. [Developer Documentation](content-developer.md)
2. [Content Editor Documentation](content-editor.md)

---

## Overview

The aim of the project is to create a website for the Virtual Labs Engineering and Architecture Division (VLEAD). The website is intended to be rich, easy-to-use, and intuitive. Mobile usage is also a priority for the website, in that it should be responsive and content/functionality should not be compromised on smaller screens.

The website was built using [Astro](https://github.com/withastro/astro).

## Target Audience

We expect and provide for 3 kinds of users:

1. **Learners:** Learners should be able to use the website to effectively explore experiments and begin their learning process. The website should be equally intuitive for both first-time and returning users. They can browse, search, and filter experiments (by discipline and lab).
2. **Educators:** Would be using the website to access the experiments but also for other purposes. Outreach pages with relevant documentation have been added to that end.
3. **Creators:** The website has sections to guide experiment creators through the process of creation and hosting.

In addition to these proto-users, we also have some sections which are common to all of them and also to the casual visitor e.g. Analytics, Research, FAQs.

## Technology Used

The main framework is Astro. A sizeable portion of our project was to analyze and compare frameworks to arrive at the best one keeping in mind the requirements. To this end, we tested [Astro](https://astro.build/), [NextJS](https://github.com/vercel/next.js), and [Docusaurus](https://github.com/facebook/docusaurus). The framework comparison document can be seen [here](https://iiitaphyd-my.sharepoint.com/:w:/g/personal/shambhavi_jahagirdar_research_iiit_ac_in/EcErRHvq5KVBh-avesZpigUBehz83adNFtw_O2fREY6Gkg?rtime=K3SIvP1C20g), and the Astro segment can be found in the Appendix. Our priorities were that the framework be reasonably supported and easy to pick up for new users, so that future maintainers could quickly start working on the codebase without significant learning curves. 

The project is built on [node.js](https://nodejs.org/en) and uses [React](https://github.com/facebook/react) components in places. This utilizes a feature called [Astro Islands](https://docs.astro.build/en/concepts/islands/), whereby components written in *any* library can be imported into an astro filed and used directly. Hence, we leave future maintainers the option of modifying code and using a different library without having to refactor the entire codebase. 

For convenient CSS, we have used [Bulma](https://github.com/jgthms/bulma). 

A full list of the major libraries used in the project can be found in the Appendix.

## Overall Architecture

**The homepage** is organized so as to provide the website visitor with the choice of 3 roles. Until a role is chosen, the user will be able to see a link to the Analytics page and Our Team page on the navbar, and 2 other sections on the page -- **Domains** and **Support**. 
*Domains* is a carousel of the various domains covered by Virtual Labs experiments e.g. Computer Science, Biotechnology, etc. Clicking on any of them takes the user to the experiments page with the discipline filter applied. *Services* contains 4 parts -- *Development and Hosting*, *Research*, *Outreach* & *Virtual Box*. Clicking on these takes you to the relevant pages.
The 'choose role' side of things is important. On choosing one of *Learner*, *Educator*, or *Creator*, we set a Session Storage variable with the the corresponding value. Links relevant to each role appear in the navbar. Currently this entails
* Learner &#8594; Start Learning
* Educator &#8594; Outreach
* Creator &#8594; Create Experiment


**The Analytics page** contains 4 graphs, based on data fetched from 4 different spreadsheets. Below that we have an iframe showing detailed data.

**The Create Experiment page** can be accessed through the Support section on Homepage. In *Creator* mode, a hyperlink on the navbar also links user to this page. This page contains the required documentation for creating (development) and hosting an experiment. Each doc has the corresponding Table of Contents for easier navigation.

**The FAQ page** can be accessed through the Support section on Homepage. It has some frequently asked questions related to virtual labs. Each question answer pair is collapsible, i.e, opens on clicking.

**The Our Team page** can be accessed through the navbar. It contains the profiles and testimonials of all VLEAD employees and student associates - interns, RAs, etc.

**The Research page** can be accessed through the Support section on Homepage. As of now it does not contain any data, but simply a research.astro file can be created if required.

**The Outreach page** can be accessed through the Support section on Homepage. In *Educator* mode, a hyperlink on the navbar also links user to this page. This page contains the required documentation for conducting a workshop, FAQs regarding worshops, stats about the previously conducted worshops and information about nodal centers.

**The experiments page** was made by other team, which we just integrated in our website. It can be accessed by clicking on a particular domain which will filter experiments for that domain. In *Learner* mode, a hyperlink on the navbar also links user to this page. 

**The 404 page** is created so that if user by chance navigates to a non-existing page, he will be able to experience a random experiment.

**The experiments page** was made by other team, which we just integrated in our website. It can be accessed by clicking on a particular domain which will filter experiments for that domain. In *Learner* mode, a hyperlink on the navbar also links user to this page. 

**The 404 page** is created so that if user by chance navigates to a non-existing page, he will be able to experience a random experiment.

## Appendix

1. Astro framework analysis ![](https://i.imgur.com/C3r8osR.png)
2. Libraries used
* bulma
* swiperJS
* AOS(animate on scroll)
* recharts
* remark and rehpye (for markdown files)
* fuse.js
* mui (used on experiments page by other team)
* typewriter-effect
* font-awesome
