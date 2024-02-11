import api from "./api.js";
const container = document.querySelector(".tree_container");

function createElement(data, parentId) {
  const children = data.filter(function (item) {
    return item.head === parentId;
  });
  children.sort(function (a, b) {
    return a.sorthead - b.sorthead;
  });

  if (children.length === 0) {
    return "";
  }

  let ul = "<ul>";
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const name = `${child.name} (${child.price})`;
    ul += `<li> ${name} </li>`;
    ul += createElement(data, child.id);
  }
  ul += "</ul>";

  return ul;
}

const createTree = createElement(api.services, null);
container.innerHTML = createTree;

const allUl = document.querySelectorAll(".tree_container ul");
for (let i = 0; i < allUl.length; i++) {
  const li = allUl[i];

  if (li.previousSibling) {
    li.previousSibling.classList.add("list");

    li.previousSibling.addEventListener("click", (e) => {
      const isOpen = e.target.nextSibling;

      if (isOpen.style.display === "block") {
        isOpen.style.display = "none";
        li.previousSibling.classList.remove("list-close");
        li.previousSibling.classList.add("list");
      } else {
        isOpen.style.display = "block";
        li.previousSibling.classList.add("list-close");
      }
    });
  }

  console.log(li);
}
