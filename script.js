// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";
import { setData } from "./storage.js";
import { getData } from "./storage.js";

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

function addData(){
  let button = document.querySelector("#submit-btn");

  button.addEventListener("click", event =>{
    let inputLink = document.querySelector("#input-link");
    let description = document.querySelector("#description");

    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let hour = date.getHours().toString().padStart(2, "0");
    let minute = date.getMinutes().toString().padStart(2, "0");
    let time = Number(year + month + day + hour + minute); // i use this time to compare each object from newest to oldest
    console.log(year, month, day, hour, minute);
    console.log(time);
    if(inputLink.value == "" || description.value == ""){
      alert("You need to fill both inputs!")
    }
    else{
      let userDropdown = document.querySelector("#user-dropdown");
      let selectedOption = userDropdown.options[userDropdown.selectedIndex];
      let userId = selectedOption.id;
      console.log(userId);
      let newData = {
        id: userId,
        link: inputLink.value,
        description: description.value,
        time: time
      };
      console.log(newData);
    }
  })
}

function createList(){
  let ulList = document.querySelector("#list");

  let userDropdown = document.querySelector("#user-dropdown");
  userDropdown.addEventListener("change", event => {
    let selectedOption = userDropdown.options[userDropdown.selectedIndex];
    let userId = selectedOption.id;
    console.log(userId+ "  create list");
    
  })
}

window.onload = function () {
  const users = getUserIds();
  createUserDropdown(users);
  addData()
  createList()
  //document.querySelector("body").innerText = `There are ${users.length} users`;
};
