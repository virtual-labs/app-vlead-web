import React from "react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkSlug from "remark-slug";
import remarkRehype from "remark-rehype";
export async function getdata() {
  var id = "1x12nhpp0QvnsA6x-O1sV4IA9SAbfVsq_wiexWkutOmU";
  var gid = "1573630614";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  return data;
}

export async function pageviews_per_month_data() {
  var id = "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI";
  var gid = "956580495";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  const final = await convert_data(
    JSON.parse(data.substring(47).slice(0, -2)).table.rows
  );
  return final;
}
async function convert_data(data) {
  var final = [{}];
  final[0] = {
    name: 0,
    pageviews: 0,
  }
  data.slice(1).forEach((element, i) => {
    final[i] = {
      name: element.c[0]?element.c[0].f:final[i-1].name,
      pageviews: element.c[2]?element.c[2].v:final[i-1].pageviews,
    };
  });
  return final;
}
export async function Cummalative_pageviews_all_collages_data() {
  var id = "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI";
  var gid = "300003553";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  const final = await convert_data_cumulative(
    JSON.parse(data.substring(47).slice(0, -2)).table.rows
  );
  return final;
}

async function convert_data_cumulative(data) {
  var final = [{}];
  final[0] = {
    name: 0,
    AMRT: 0,
    COEP: 0,
    DLBG: 0,
    IIITH: 0,
    IITB: 0,
    IITD: 0,
    IITG: 0,
    IITK: 0,
    IITKGP:0,
    IITR: 0,
    NITK: 0,
  };
  data.slice(4).forEach((element, i) => {
    final[i] = {
      name: element.c[0]?element.c[0].f:final[i-1].name,
      AMRT: element.c[1]?element.c[1].f:final[i-1].AMRT,
      COEP: element.c[2]?element.c[2].f:final[i-1].COEP,
      DLBG: element.c[3]?element.c[3].f:final[i-1].DLBG,
      IIITH: element.c[4]?element.c[4].f:final[i-1].IIITH,
      IITB: element.c[5]?element.c[5].f:final[i-1].IITB,
      IITD: element.c[6]?element.c[6].f:final[i-1].IITD,
      IITG: element.c[7]?element.c[7].f:final[i-1].IITG,
      IITK: element.c[8]?element.c[8].f:final[i-1].IITK,
      IITKGP: element.c[9]?element.c[9].f:final[i-1].IITKGP,
      IITR: element.c[10]?element.c[10].f:final[i-1].IITR,
      NITK: element.c[11]?element.c[11].f:final[i-1].NITK,
    };
  });
  return final;
}

export async function Top5_Labs_data() {
  var id = "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI";
  var gid = "1110929192";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  const final = await convert_data_top5(
    JSON.parse(data.substring(47).slice(0, -2)).table.rows
  );
  return final;
}

async function convert_data_top5(data) {
  var final = [{}];
  final[0] = {
    name: 0,
    pageviews: 0,
    college: 0,
  }
  data.slice(1, 6).forEach((element, i) => {
    final[i] = {
      name: element.c[0]?element.c[0].v:final[i-1].name,
      pageviews: element.c[2]?element.c[2].v:final[i-1].pageviews,
      college: element.c[3]?element.c[3].v:final[i-1].college,
    };
  });
  return final;
}

export async function Cummalative_pageviews_for_domains_data() {
  var id = "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI";
  var gid = "1725192462";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  const final = await convert_data_domains(
    JSON.parse(data.substring(47).slice(0, -2)).table.rows
  );
  return final;
}

async function convert_data_domains(data) {
  var final = [{}];
  data.forEach((element, i) => {
    if (element.c[2].v > 0.01)
      final[i] = {
        name: element.c[0].v,
        Percentage: element.c[2].v,
      };
  });
  return final;
}

export async function nodal_centers() {
  var id = "1bDrVUlSL4Grt2aOInyE1svteuuICqM0saQAAS7RCdiY";
  var gid = "1334890774";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  return JSON.parse(data.substring(47).slice(0, -2)).table.rows;
}
export async function Workshops() {
  var id = "1bDrVUlSL4Grt2aOInyE1svteuuICqM0saQAAS7RCdiY";
  var gid = "0";
  var url =
    "https://docs.google.com/spreadsheets/d/" +
    id +
    "/gviz/tq?tqx=out:json&tq&gid=" +
    gid;
  const res = await fetch(url);
  const data = await res.text();
  return JSON.parse(data.substring(47).slice(0, -2)).table.rows;
}
export async function Workshops_req() {
  const [md_file, setmd_file] = useState("");
  const [load, setload] = useState(false);
  useEffect(() => {
    const abc = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/virtual-labs/outreach-web-pages-iiith/main/workshop-process/workshop-process.md"
      );
      setmd_file(await response.text());
      setload(true);
    };
    abc();
  }, []);
  return load ? (
    <div>
      <ReactMarkdown
        children={md_file}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkSlug, remarkRehype]}
      />
    </div>
  ) : (
    <></>
  );
}
