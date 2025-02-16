// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";
import { setData } from "./storage.js";
import { getData } from "./storage.js";
import { clearData } from "./storage.js";

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
        time: time,
        date:{
          year: year,
          month: month,
          day: day
        }
      };
        //get existing data
      let userData = getData(userId) || [];

      // if (!Array.isArray(userData)) {
      //   userData = []; // make sure it is array
      // }
      userData = isArray(userData);
      console.log("Before adding:", userData);

      //push new data
      userData.push(newData);

      //add new data to existing data
      setData(userId, userData);

      console.log("After adding:", getData(userId));
    }
  })
}

function createList(){
  let ulList = document.querySelector("#list");

  let userDropdown = document.querySelector("#user-dropdown");
  userDropdown.addEventListener("change", event => {
    ulList.innerHTML = "";
    let selectedOption = userDropdown.options[userDropdown.selectedIndex];
    let userId = selectedOption.id;
    console.log(userId+ "  create list");
    let localData = getData(userId);
    console.log(localData + "  local data");
    //make sure  localData is an array
    if (!Array.isArray(localData)) {
      localData = []; // Prevent errors
    }
    console.log(localData + " after ensuring its an array");
    if (localData.length === 0) {
      let liEmpty = document.createElement("li");
      liEmpty.innerHTML = `There is no data for user ${userId}`;
      ulList.appendChild(liEmpty);
    } 
    else{
      let sortedLocalData = localData.sort(({time:a}, {time:b}) => b-a); // sort by time from newest to oldest
      console.log(sortedLocalData);
      sortedLocalData.forEach(element => {
        let li = document.createElement("li");

        // Create anchor tag for link
        let aTag = document.createElement("a");
        aTag.href = element.link;
        aTag.target = "_blank"; // Opens link in new tab
        aTag.innerText = element.link;
        aTag.style = "display: inline-block; padding: 12px 24px;";

        // Create paragraph for description
        let descriptionP = document.createElement("p");
        descriptionP.innerText = element.description;

        // Create paragraph for date
        let dateP = document.createElement("p");
        dateP.innerText = `${element.date.year}-${element.date.month}-${element.date.day}`;

        // Append elements to list item
        li.appendChild(aTag);
        li.appendChild(descriptionP);
        li.appendChild(dateP);

        // Append list item to list
        ulList.appendChild(li);
      });
    }
    
    
  })
}

function isArray(userData){
  if (!Array.isArray(userData)) {
    return userData = []; // make sure it is array
  }
  else{return userData;}
}

window.onload = function () {
  const users = getUserIds();
  createUserDropdown(users);
  addData()
  createList()
  //document.querySelector("body").innerText = `There are ${users.length} users`;
};

