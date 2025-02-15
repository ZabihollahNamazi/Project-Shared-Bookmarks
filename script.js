// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

function createUserDropdown(getUserIds){
  let userContainer = document.querySelector("#user-container");
  let userSelectTag = document.querySelector("#user-dropdown");

  for(let i of getUserIds){
    let option = document.createElement("option");
    option.id = i;
    option.innerText = `User ${i}`;
    userSelectTag.appendChild(option);
  }
  userContainer.appendChild(userSelectTag);
}


window.onload = function () {
  const users = getUserIds();
  createUserDropdown(users);
  //document.querySelector("body").innerText = `There are ${users.length} users`;
};
