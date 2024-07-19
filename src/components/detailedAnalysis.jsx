// analyticsScript.js

import all from "../analytics_data.json"; // get json data 

export function initializeAnalytics() {
  var data = all.institutes;

  // Get the dropdown button and menu
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const listitems = document.getElementById("listitems");

  // display institutes logo (desktop-mode)
  // creating institute cards
  data.forEach((item) => {
    var li = document.createElement("li");
    li.classList.add("column", "is-narrow", "logo");
    const div = document.createElement("div");
    div.classList.add(
      "is-flex",
      "is-flex-direction-column",
      "has-text-centered",
      "total"
    );
    div.style.border = "1px solid black";
    div.style.borderRadius = "10px";
    const span = document.createElement("span");
    span.classList.add("column", "py-0");
    span.textContent = item.heading;
    const div1 = document.createElement("div");
    div1.classList.add("column", "image-container");
    div1.style.padding = "0%";
    const img = document.createElement("img");
    img.src = item.image;
    img.style.height = "100px";
    img.style.width = "100px";
    div1.appendChild(img);
    div.appendChild(span);
    div.appendChild(div1);
    li.appendChild(div);
    listitems.appendChild(li);
  });

  //selecting a institute card
  const listItem = listitems.querySelectorAll(".logo");
  let selectedCard = listItem[0].querySelector("span");
  listItem.forEach(function (item) {
    item.addEventListener("click", function (event) {
      const with_span = item.querySelector("span");
      if (selectedCard) {
        selectedCard.style.boxShadow = "none";
      }

      selectedCard = item;
      selectedCard.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

      let foundItem = null;
      data.forEach((item) => {
        if (item.heading === with_span.innerHTML) {
          foundItem = item;
        }
      });
      const iframe = document.querySelector("iframe");
      const new_path = foundItem.iframe_src;
      if (new_path != iframe.src) {
        iframe.src = new_path;
      }
      event.preventDefault();
    });
  });

  // mobile-mode 
  // creating elements from json file
  var div = document.createElement("div");
  div.classList.add('dropdown-menu');
  var div1 = document.createElement("div");
  div1.classList.add('dropdown-content');
  data.forEach((item) => {
    var a = document.createElement("a");
    a.classList.add('dropdown-item');
    a.textContent = item.heading;
    div1.appendChild(a);
  });
  div.appendChild(div1);
  dropdownMenu.appendChild(div);
  const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

  dropdownButton.addEventListener("click", function (event) {
    // Toggle the "is-active" class on the dropdown menu
    dropdownMenu.classList.toggle("is-active");
    event.preventDefault();
  });

  // selecting a institute
  dropdownItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      dropdownButton.innerHTML = item.innerHTML + "&#9660;";
      const a = item;
      let foundItem = data[0];
      data.forEach((item) => {
        if (item.heading === a.innerHTML) {
          foundItem = item;
        }
      });
      const iframe = document.querySelector("iframe");
      const new_path = foundItem.iframe_src;
      if (new_path != iframe.src) {
        iframe.src = new_path;
      }
      dropdownMenu.classList.remove("is-active");
      event.preventDefault();
    });
  });
  
  // loading iframe
  var iframe = document.querySelector("iframe");
  iframe.onload = function () {
    iframe.style.height = 130 + "vh";
  };
}