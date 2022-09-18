"use strict";

// Select audio files
const addAudio = document.querySelector("#addAudio");
const addImageAudio = document.querySelector("#addImageAudio");
const deleteAudio = document.querySelector("#deleteAudio");
const warningEmptyAudio = document.querySelector("#warningEmptyAudio");
const warningSelectAudio = document.querySelector("#warningSelectAudio");
const warningNameTakenAudio = document.querySelector("#warningNameTakenAudio");
const tabAudio = document.querySelector("#tabAudio");
const clickAudio = document.querySelector("#clickAudio");
const btnAudio = document.querySelector("#btnAudio");
const cancelAudio = document.querySelector("#cancelAudio");
const wrongAudio = document.querySelector("#wrongAudio");

// Global variable's
// current File Cab Index
let fcI = -243;
// current Main Folder Index
let mfI = -243;
// current Sub Folder Index
let sfI = -243;
// current note Index
let nI = -243;

// temp hold for array
let settingsArrayContainer;
// Theme current
let currentTheme = "Dark";
// Delete Mode
let deleteMode = false;
// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);

// This is the Main array that holds all the file cab objects
const fileCabArray = [];

// This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// The start of program exicution.
window.onload = function () {
  startUp();
};
// Start Up
function startUp() {
  const settingsStorage = new SettingsStorage();
  const settings = settingsStorage.getSettingsFromFile();

  if (settings.type === "fileCab") {
    // set the holding array
    settingsArrayContainer = settings.filePathArray;
    // loadsettings
    applySettings(settings);
    // update Form
    display.showAutoLoadList(settingsArrayContainer);

    if (el.autoLoadCheckBox.checked) {
      if (settings.filePathArray) {
        sendAutoLoadFilesToNode(settings.filePathArray);
      }
    }
  }
}
function sendAutoLoadFilesToNode(filePaths) {
  window.api.sendFilePathsForAutoload(filePaths);
}
//*************************************************** */
// Helper functions
//*************************************************** */
// **************************************************

//*************************************************** */
function removeActiveClass(element) {
  if (element) {
    element.classList.remove("active");
  }
}
// **************************************************
function renderFileCabs() {
  // function returns -243, -243 is used for close down of a file cabs
  fcI = display.paintFileCabTabs(mapNamesOut(fileCabArray));
}
// **************************************************
function renderMainFolders() {
  display.paintMainFolderTabs(
    deleteMode,
    mapNamesOut(fileCabArray[fcI].mainFolderArray)
  );
}
// ***************************************************
function renderSubFolders() {
  display.paintSubFolderTabs(
    deleteMode,
    mapNamesOut(fileCabArray[fcI].mainFolderArray[mfI].subFolderArray)
  );
}
// ****************************************************
function renderNotes() {
  display.paintNotes(
    deleteMode,
    fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray
  );
}
// ****************************************************
function pushFileSettingsContainer(filePath) {
  // check if the fileNamePath already exists if it does alert and return
  // make a variable to check
  let isTaken = false;

  for (const element of settingsArrayContainer) {
    if (element === filePath) {
      isTaken = true;
    }
  }

  if (isTaken) {
    warningNameTakenAudio.play();
    display.showAlert("That file is already loaded!", "error");
    return;
  }

  // add it too temp HOld
  settingsArrayContainer.push(filePath);
}
// *********************************************************
function sortArrayByName(array) {
  array.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

function loadUpSettingsForm() {
  const settingsStorage = new SettingsStorage();
  const settings = settingsStorage.getSettingsFromFile();
  settingsArrayContainer = settings.filePathArray;
  if (settings.type === "fileCab") {
    // set check box
    el.autoLoadCheckBox.checked = settings.autoLoad;
    // check the right theme
    switch (settings.theme) {
      case "Dark":
        el.darkRadio.checked = true;
        break;
      case "Light":
        el.lightRadio.checked = true;
        break;
      default:
        console.log("No valid theme!");
    }
    // check the right font size
    switch (settings.fontSize) {
      case "x-small":
        el.xSmallRadio.checked = true;
        break;
      case "small":
        el.smallRadio.checked = true;
        break;
      case "normal":
        el.normalRadio.checked = true;
        break;
      case "large":
        el.largeRadio.checked = true;
        break;
      case "x-large":
        el.xLargeRadio.checked = true;
        break;
      default:
        console.log("No valid font size");
    }
  }
  // update autoload form ul
  display.showAutoLoadList(settingsArrayContainer);
} // End loadUpSettingsForm()
// *******************************************************************
function applySettings(settings) {
  el.autoLoadCheckBox.checked = settings.autoLoad;

  switch (settings.fontSize) {
    case "x-small":
      el.root.style.fontSize = "10px";
      break;
    case "small":
      el.root.style.fontSize = "12px";
      break;
    case "normal":
      el.root.style.fontSize = "16px";
      break;
    case "large":
      el.root.style.fontSize = "20px";
      break;
    case "x-large":
      el.root.style.fontSize = "24px";
      break;
    default:
      console.log("No valid font-size");
  }
  if (deleteMode) {
    // set the theme
    switch (settings.theme) {
      case "Dark":
        el.blankCssLink.href = "assets/css/dark.css";
        break;
      case "Light":
        el.blankCssLink.href = "assets/css/light.css";
        break;
      default:
        console.log("No valid option!");
      // code block
    }
  } else {
    // set the theme
    switch (settings.theme) {
      case "Dark":
        el.blankCssLink.href = "assets/css/dark.css";
        el.body.style.backgroundColor = "black";
        currentTheme = "Dark";
        break;
      case "Light":
        el.blankCssLink.href = "assets/css/light.css";
        el.body.style.backgroundColor = "white";
        currentTheme = "Light";
        break;
      default:
        console.log("No valid option!");
      // code block
    }
  }
} // End applySettings(settings)

// ****************************************************************
function getRadioValue(form, name) {
  let val;
  // get list of radio buttons with specified name
  const radios = form.elements[name];
  // loop through list of radio buttons
  for (let i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked) {
      // radio checked?
      val = radios[i].value; // if so, hold its value in val
      break; // and break out of for loop
    }
  }
  return val; // return value of checked radio or undefined if none checked
} // End getRadioValue(form, name)

// *******************************************************************
function mapNamesOut(array) {
  const mapedArray = array.map((item) => item.name);
  return mapedArray;
} // End mapNamesOut(array)
// *******************************************************************
function handleFilePath(imagePath) {
  if (!imagePath) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a path in the name area!", "error");
    return;
  }
  // check if you have a valid note
  if (
    fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray[nI]
  ) {
    // set image path
    fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray[
      nI
    ].imagePath = imagePath;
    // write to file
    saveFileCabinet(fileCabArray[fcI]);
    addImageAudio.play();
    display.showAlert("A new image was added to the note!", "success");
  }
} // End handleFilePath(imagePath)
// ***************************************************************
function addImage() {
  window.api.showImageDialog();
} // End addImage()

window.api.handleImagePath((event, fileNames) => {
  let imagePath;
  if (!fileNames) {
    display.showAlert("No file selected!", "error");
  } else {
    // got file name
    imagePath = fileNames[0];
    handleFilePath(imagePath);
  }
});
// *************************************************************
// *************************************************************
function isNameInArray(name, array) {
  for (const item of array) {
    if (name === item.name) {
      return true;
    }
  }
  return false;
} // End isNameInArray(name, array)

// *************************************************************
//  file cab Code
// *************************************************************
// file cab UL *************************************************
el.fileCabList.addEventListener("click", (e) => {
  // if shift is held down rename fileCab
  if (e.shiftKey) {
    // get the index from the html
    clickAudio.play();
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    fcI = index;
    // grab file cab name
    const { name } = fileCabArray[fcI];
    el.fileCabRenameInput.value = name;
    display.showRenameFileCabForm();
    // set time out to focus
    setTimeout(function () {
      el.fileCabRenameInput.focus();
    }, 1000);
    return;
  } // End shift Key down

  // event delegation
  if (e.target.classList.contains("fileCab")) {
    const element = document.querySelector(".fileCab.active");
    removeActiveClass(element);

    // add active class
    e.target.classList.add("active");
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    fcI = index;
    tabAudio.play();
    renderMainFolders();
  }
}); // End

// when You click on the rename File Cab rename Btn in the form *******************
el.renameFileCabSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!deleteMode) {
    warningEmptyAudio.play();
    display.showAlert(
      "You have to enter Edit and Delete mode to rename a file cabinet!",
      "error"
    );
    return;
  }
  // get text
  const newName = el.fileCabRenameInput.value;
  //check for empty string
  if (!newName) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a name for the file cabinet!", "error");
    return;
  }
  if (isNameInArray(newName, fileCabArray)) {
    // alert and return
    warningNameTakenAudio.play();
    display.showAlert("That name is already taken!", "error");
    // set time out to focus
    setTimeout(function () {
      el.fileCabRenameInput.focus();
    }, 1000);
    return;
  }

  // change file cabinet name
  fileCabArray[fcI].name = newName;
  //sort the array
  sortArrayByName(fileCabArray);
  // write to file
  saveFileCabinet(fileCabArray[fcI]);
  addAudio.play();
  display.showAlert(
    `You renamed the file cabinet to ${newName}`,
    "success",
    1500
  );

  // reset form
  el.renameFileCabForm.reset();
  // send file cabinets array to display
  renderFileCabs();
}); // End

// when You click on the rename File Cab cancel Btn in the form ************************
el.renameFileCabCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.renameFileCabForm.reset();
  // hide form
  display.displayNone(el.renameFileCabForm);
  // get rid of active class
  const element = document.querySelector(".fileCab.active");
  removeActiveClass(element);
});
// *************************************************************
//   Main Folder Code
// *************************************************************
// main UL *****************************************************
el.mainFolderList.addEventListener("click", (e) => {
  // if shift is held down rename main folder
  if (e.shiftKey) {
    // rename Main folder
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    mfI = index;

    // grab main folder name
    const { name } = fileCabArray[fcI].mainFolderArray[mfI];
    // set form text
    el.mainFolderNameInput.value = name;
    // show form
    display.showRenameMainFolderForm();
    // set time out to focus
    setTimeout(function () {
      el.mainFolderNameInput.focus();
    }, 1000);
    return;
  }
  if (e.target.classList.contains("delete-main")) {
    if (deleteMode) {
      if (e.ctrlKey) {
        // get the index from the html
        let deleteIndex = e.target.parentElement.dataset.index;
        deleteIndex = parseInt(deleteIndex);
        if (isNaN(deleteIndex)) {
          return;
        }
        // DELETE MAIN folder
        fileCabArray[fcI].mainFolderArray.splice(deleteIndex, 1);
        // write to file
        saveFileCabinet(fileCabArray[fcI]);
        deleteAudio.play();
        display.showAlert("Main folder deleted!", "success");
        renderMainFolders();
        // return;
        return;
      } else {
        warningEmptyAudio.play();
        display.showAlert(
          "You have to hold down the control key to make a deletion!",
          "error"
        );
        return;
      } // End control key down
    } // End delete mode
  }
  // event delegation

  // The Next code is to set the current tab color white with the active class
  // set's the current target active

  if (e.target.classList.contains("main")) {
    const element = document.querySelector(".main.active");
    removeActiveClass(element);
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    if (isNaN(index)) {
      return;
    }
    mfI = index;

    tabAudio.play();
    renderSubFolders();
    return;
  }
}); // End

// when You click on the +/icon in the main folder heading *********
el.mainFolderAddIcon.addEventListener("click", (e) => {
  clickAudio.play();

  el.mainFolderNameInput.value = "";
  // show form
  display.showMainFolderForm();
  // set time out to focus
  setTimeout(function () {
    el.mainFolderNameInput.focus();
  }, 1000);
}); // End

// when you click on the add main folder btn ***********************
el.addMainFolderSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab main folder array
  const mainFolderArray = fileCabArray[fcI].mainFolderArray;
  // grab text for main folder object
  const mainFolderName = el.mainFolderNameInput.value.trim();
  // check if text is empty

  if (!mainFolderName) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a name for the Main Folder!", "error");
    return;
  }
  // check for taken name
  if (isNameInArray(mainFolderName, mainFolderArray)) {
    warningNameTakenAudio.play();
    display.showAlert("That name is already taken!", "error");
    // set time out to focus
    setTimeout(function () {
      el.mainFolderNameInput.focus();
    }, 1000);
  } else {
    // create main folder object
    const mainFolder = new MainFolder(mainFolderName);
    // push main folder object into array
    mainFolderArray.push(mainFolder);
    // sort main folder array by name
    sortArrayByName(mainFolderArray);
    // save file cab
    saveFileCabinet(fileCabArray[fcI]);
    addAudio.play();
    display.showAlert("A new main folder was added!", "success", 1500);
    // reset form
    el.mainFolderForm.reset();
    // send main folder array to display
    renderMainFolders();
  } // End else statement
}); // End
// when you click on the rename main folder btn ***********************
el.renameMainFolderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!deleteMode) {
    warningEmptyAudio.play();
    display.showAlert(
      "You have to enter Edit and Delete mode to rename a main folder!",
      "error"
    );
    return;
  }
  // grab text for main folder object
  const mainFolderName = el.mainFolderNameInput.value.trim();
  // check if text is empty
  if (!mainFolderName) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a name for the Main Folder!", "error");
    return;
  }

  // check for taken name
  if (isNameInArray(mainFolderName, fileCabArray[fcI].mainFolderArray)) {
    warningNameTakenAudio.play();
    display.showAlert("That name is already taken!", "error");
    // set time out to focus
    setTimeout(function () {
      el.mainFolderNameInput.focus();
    }, 1000);
  } else {
    // grab main folder
    const mainFolder = fileCabArray[fcI].mainFolderArray[mfI];
    //change text
    mainFolder.name = mainFolderName;
    // sort main folder array by name
    sortArrayByName(fileCabArray[fcI].mainFolderArray);
    // save file cab
    saveFileCabinet(fileCabArray[fcI]);
    addAudio.play();
    display.showAlert(
      `You renamed the folder to ${mainFolderName}!`,
      "success",
      1500
    );
    // reset form
    el.mainFolderForm.reset();
    // send main folder array to display
    renderMainFolders();
  } // End else statement
});
// when You click on cancel btn on the main folder form ****************
el.mainFolderCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.mainFolderForm.reset();
  // hide form
  display.displayNone(el.mainFolderForm);
  // get rid of active class
  const element = document.querySelector(".main.active");
  removeActiveClass(element);
}); // End
// *************************************************************
//  End Main Folder Code
// *************************************************************
// *************************************************************
//  Sub Folder Code
// *************************************************************
// Sub Folder UL
el.subFolderList.addEventListener("click", (e) => {
  // if shift is held down rename sub folder
  if (e.shiftKey) {
    // rename Main folder
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    sfI = index;

    // grab sub folder name
    const { name } = fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI];
    // set from text
    el.subFolderNameInput.value = name;
    // show form
    display.showRenameSubFolderForm();
    // set time out to focus
    setTimeout(function () {
      el.subFolderNameInput.focus();
    }, 1000);
    return;
  }
  // event delegation
  if (e.target.classList.contains("delete-sub")) {
    if (deleteMode) {
      if (e.ctrlKey) {
        // get the index from the html
        let deleteIndex = e.target.parentElement.dataset.index;
        deleteIndex = parseInt(deleteIndex);

        if (isNaN(deleteIndex)) {
          return;
        }
        // DELETE sub folder
        fileCabArray[fcI].mainFolderArray[mfI].subFolderArray.splice(
          deleteIndex,
          1
        );
        // write to file
        saveFileCabinet(fileCabArray[fcI]);
        deleteAudio.play();
        display.showAlert("Sub folder deleted!", "success");
        renderSubFolders();
        return;
      } else {
        warningEmptyAudio.play();
        display.showAlert(
          "You have to hold down the control key to make a deletion!",
          "error"
        );
        return;
      } // End control key down
    } // End delete mode
  }

  if (e.target.classList.contains("sub")) {
    const element = document.querySelector(".sub.active");
    removeActiveClass(element);
    // add active class
    e.target.classList.add("active");
    // End code to set the active class

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    if (isNaN(index)) {
      return;
    }
    sfI = index;

    tabAudio.play();
    // send the note array to the Display
    renderNotes();
    return;
  }
}); // End

// When You click +/icon in the subfolder heading ***************************
el.subFolderAddIcon.addEventListener("click", (e) => {
  clickAudio.play();
  el.subFolderNameInput.value = "";
  // show form
  display.showSubFolderForm();
  // set time out to focus
  setTimeout(function () {
    el.subFolderNameInput.focus();
  }, 1000);
}); // End

// When You click on the add sub folder btn in the sub folder form
el.addSubFolderSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab array from file
  const mainFolderArray = fileCabArray[fcI].mainFolderArray;
  // grab text input
  const subFolderName = el.subFolderNameInput.value.trim();
  // check for empty string
  if (!subFolderName) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a name for the Sub Folder!", "error");
    return;
  }
  // check for taken name
  if (isNameInArray(subFolderName, mainFolderArray[mfI].subFolderArray)) {
    warningNameTakenAudio.play();
    display.showAlert("That name is already taken!", "error");
    // set time out to focus
    setTimeout(function () {
      el.subFolderNameInput.focus();
    }, 1000);
  } else {
    const subFolder = new SubFolder(subFolderName);
    // push object into array
    mainFolderArray[mfI].subFolderArray.push(subFolder);
    // sort sub folder array by name
    sortArrayByName(mainFolderArray[mfI].subFolderArray);
    // write to file
    saveFileCabinet(fileCabArray[fcI]);
    addAudio.play();
    display.showAlert("A new sub folder was added!", "success", 1500);
    // reset form
    el.subFolderForm.reset();
    renderSubFolders();
  } // End else statement
}); // End
// When you click on the sub folder rename btn
el.renameSubfolderSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!deleteMode) {
    warningEmptyAudio.play();
    display.showAlert(
      "You have to enter Edit and Delete mode to rename a sub folder!",
      "error"
    );
    return;
  }
  // grab text for sub folder object
  const subName = el.subFolderNameInput.value.trim();
  // check if text is empty
  if (!subName) {
    warningEmptyAudio.play();
    display.showAlert("Please enter a name for the Main Folder!", "error");
    return;
  }

  // check for taken name
  if (
    isNameInArray(
      subName,
      fileCabArray[fcI].mainFolderArray[mfI].subFolderArray
    )
  ) {
    warningNameTakenAudio.play();
    display.showAlert("That name is already taken!", "error");
    el.subFolderNameInput.focus();
  } else {
    // grab sub folder
    const subFolder =
      fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI];
    //change text
    subFolder.name = subName;
    // sort sub folder array by name
    sortArrayByName(fileCabArray[fcI].mainFolderArray[mfI].subFolderArray);
    // save file cab
    saveFileCabinet(fileCabArray[fcI]);
    addAudio.play();
    display.showAlert(`You renamed the folder to ${subName}!`, "success", 1500);
    // hide form
    // reset form
    el.subFolderForm.reset();
    // send main folder array to display
    renderSubFolders();
  } // End else statement
}); // End

// when You click the cancel btn in the sub folder form
el.subFolderCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.subFolderForm.reset();
  // hide form
  display.displayNone(el.subFolderForm);
  // get rid of active class
  const element = document.querySelector(".sub.active");
  removeActiveClass(element);
}); //End
// *************************************************************
//  End SubFolder Code
// *************************************************************
// *************************************************************
//  Note Code
// *************************************************************
// Note UL
el.noteList.addEventListener("click", (e) => {
  // this gets the data I embedded into the html
  let dataIndex = e.target.dataset.index;
  let deleteIndex = parseInt(dataIndex);
  nI = deleteIndex;
  // this makes sure only one picture in a note shows up in the note area
  const picArray = [];
  const picElements = document.querySelectorAll(".myPic");

  // push all pic index's into an array to loop through next
  for (const element of picElements) {
    // remove all elements with the class of .myPic
    let indexP = element.getAttribute("data-pIndex");
    indexP = parseInt(indexP);
    picArray.push(indexP);
  }
  // loop through picArray and return if the picture is already displayed
  for (const item of picArray) {
    if (item === nI) {
      nI = -243;
      return;
    }
  }

  // event delegation
  if (e.target.classList.contains("moveUp")) {
    // get the index from the html
    let index = e.target.parentElement.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    //If index is zero. You can't move it any more so return
    if (index === 0) {
      return;
    }
    // get move to index
    const moveTo = index - 1;
    const arr =
      fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray;
    // swap array elements
    [arr[index], arr[moveTo]] = [arr[moveTo], arr[index]];
    btnAudio.play();
    // write to file
    saveFileCabinet(fileCabArray[fcI]);
    // redisplay
    // send note array to display
    renderNotes();
    // return
    return;
  }

  // event delegation
  if (e.target.classList.contains("moveDown")) {
    // get the index from the html
    let index = e.target.parentElement.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    const arr =
      fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray;
    // let arrayLength = arr.length - 1;
    //If index is equal to length - 1. You can't move it any more so return
    if (index === arr.length - 1) {
      return;
    }
    // get move to index
    const moveTo = index + 1;
    // swap array elements
    [arr[index], arr[moveTo]] = [arr[moveTo], arr[index]];
    btnAudio.play();
    // write to file
    saveFileCabinet(fileCabArray[fcI]);
    // redisplay
    // send note array to display
    renderNotes();
    // return
    return;
  }
  // event delegation
  if (e.target.classList.contains("delete-item")) {
    // get the index from the html
    let deleteIndex = e.target.parentElement.dataset.index;
    deleteIndex = parseInt(deleteIndex);

    // check if control was down, if so delete note
    if (!deleteMode) {
      warningEmptyAudio.play();
      display.showAlert(
        "You have to select Edit and Delete mode in menu to make a deletion!",
        "error"
      );
      return;
    }
    if (!e.ctrlKey) {
      warningEmptyAudio.play();
      display.showAlert(
        "You have to hold down ctrl key to make a deletion!",
        "error"
      );
      return;
    }
    if (e.ctrlKey) {
      if (deleteMode) {
        // delete note
        fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[
          sfI
        ].noteArray.splice(deleteIndex, 1);
        // write to file
        saveFileCabinet(fileCabArray[fcI]);
        // reasign current note
        nI = -243;
        deleteAudio.play();
        display.showAlert("Note deleted!", "success");
        // send note array to display
        renderNotes();
      }
    } // End control key down
    return;
  }
  // event delegation
  if (e.target.classList.contains("myPic")) {
    // remove image
    e.target.remove();
    return;
  }

  // event delegation
  if (e.target.classList.contains("note")) {
    // see if the note has a imagePath
    let selectedNote =
      fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray[nI];

    if (selectedNote.imagePath) {
      const oImg = document.createElement("img");
      oImg.setAttribute("src", selectedNote.imagePath);
      oImg.setAttribute("alt", "na");
      oImg.setAttribute("width", "100%");
      oImg.setAttribute("data-pIndex", nI);
      oImg.className = "myPic";
      // insert the image after current note
      this.noteList.insertBefore(oImg, e.target.nextSibling);
    }
    // check if the alt Key is held down and add Image to note
    if (e.altKey) {
      addImage();
      return;
    }
    // if shift is down remove the current path
    if (e.shiftKey) {
      selectedNote.imagePath = null;
      // write to file
      saveFileCabinet(fileCabArray[fcI]);
      // reasign current note
      nI = -243;
      deleteAudio.play();
      display.showAlert("Removed the image from note!", "success");
      // send note array to display
      renderNotes();
    }
    return;
  } // End class name contains note
  // event delegation
  if (e.target.classList.contains("edit-note")) {
    // this kicks off the modal
    // get the index from the html
    let index = e.target.parentElement.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    nI = index;
    // set modal text
    // grab current note
    const note =
      fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray[nI];

    el.noteModalTextArea.value = note.text;
    clickAudio.play();
    return;
  }
}); // End
// when You click the + in the Note Heading
el.noteAddIcon.addEventListener("click", (e) => {
  clickAudio.play();
  display.showNoteForm();

  // set time out to focus
  setTimeout(function () {
    el.noteTextAreaInput.focus();
  }, 1000);
}); // End
// when You click the add note btn in the note form
el.addNoteSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab main folder array
  const mainFolderArray = fileCabArray[fcI].mainFolderArray;
  // create note
  const noteText = el.noteTextAreaInput.value.trim();
  // check if text is empty
  if (!noteText) {
    warningEmptyAudio.play();
    display.showAlert("Please enter note in the text area!", "error");
    return;
  }
  // create new note
  const newNote = new Note(noteText);
  // push note into note array
  mainFolderArray[mfI].subFolderArray[sfI].noteArray.push(newNote);
  // write to file
  saveFileCabinet(fileCabArray[fcI]);
  addAudio.play();
  el.noteTextAreaInput.value = "";
  display.showAlert("A new note was added!", "success", 900);
  nI = -243;
  renderNotes();
}); // End
// when You click the cancel btn in the note form
el.noteCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  el.noteForm.reset();
  display.displayNone(el.noteForm);
}); // End

// when You click the clear btn in the note form
el.noteClearTextAreaBtn.addEventListener("click", (e) => {
  btnAudio.play();
  // clear the text Area
  el.noteTextAreaInput.value = "";
  // set time out to focus
  setTimeout(function () {
    el.noteTextAreaInput.focus();
  }, 1000);
}); //End

// when you click on the add Date btn in the note form
el.noteAddDateBtn.addEventListener("click", (e) => {
  btnAudio.play();
  const date = new Date();
  el.noteTextAreaInput.value = date.toDateString();
  // set time out to focus
  setTimeout(function () {
    el.noteTextAreaInput.focus();
  }, 1000);
}); //End

// *************************************************************
//  Edit Note Code
// *************************************************************
// when you click on the save edit btn in the modal
el.saveEditedNoteBtn.addEventListener("click", (e) => {
  if (fcI < 0 || isNaN(fcI)) {
    warningNameTakenAudio.play();
    return;
  }
  const newNoteText = el.noteModalTextArea.value.trim();
  // check if text is empty
  if (!newNoteText) {
    warningEmptyAudio.play();
    display.showAlert("Please enter text in the text area!", "error");
    return;
  }
  // grab current note
  const note =
    fileCabArray[fcI].mainFolderArray[mfI].subFolderArray[sfI].noteArray[nI];

  // if note is valid set the new text
  if (note) {
    note.text = newNoteText;
  }
  display.showAlert("Note updated!", "success", 3000);
  addAudio.play();

  // write to file
  saveFileCabinet(fileCabArray[fcI]);
  renderNotes();
});

// when you click on the cancel Btn on the edit note form
el.editNoteCloseBtn.addEventListener("click", (e) => {
  clickAudio.play();
});
// *************************************************************
//  End Edit Note Code
// *************************************************************
// *************************************************************
//  End Note Code
// *************************************************************
// *************************************************************
// Settings code
// *************************************************************
// when You click on save settings Btn
el.saveSettingsSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // get form data to create a settings object
  // theme radio code
  const themeValue = getRadioValue(el.settingsForm, "theme");
  // set the current theme
  currentTheme = themeValue;
  // fontsize radio code
  const fontSizeValue = getRadioValue(el.settingsForm, "fontSize");
  const settingsStorage = new SettingsStorage();
  const settingsObj = new SettingsObj();
  // set the object values
  settingsObj.theme = themeValue;
  settingsObj.fontSize = fontSizeValue;
  settingsObj.filePathArray = settingsArrayContainer;
  // set auto load true or false
  settingsObj.autoLoad = el.autoLoadCheckBox.checked;

  // save the object
  settingsStorage.saveSettings(settingsObj);
  addAudio.play();
  display.showAlert("Saving User Settings!", "success", 900);
  // reset form
  el.settingsForm.reset();
  if (settingsObj.autoLoad) {
    // clear two arrays
    // setting the length to Zero emptys the array
    fileCabArray.length = 0;
    settingsArrayContainer.length = 0;
    display.displayNone(el.settingsForm);
    startUp();
  } else {
    // let settings = settingsStorage.getSettingsFromFile();
    applySettings(settingsObj);
    // hide form
    display.displayNone(el.settingsForm);
    renderFileCabs();
  }
}); // End

// when You click on settings form cancel Btn
el.settingsCancelBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // hide form
  display.displayNone(el.settingsForm);
  renderFileCabs();
});

// when You click on settings form factory reset btn
el.factoryResetBtn.addEventListener("click", (e) => {
  btnAudio.play();
  const settingsStorage = new SettingsStorage();
  settingsStorage.clearFileFromLocalStorage();
  loadUpSettingsForm();
});

// When You click on settings form add path to autoload Btn
el.settingsAddPathBtn.addEventListener("click", async (e) => {
  // addImageAudio.play();
  window.api.showOpenDialog();
});

// responding api
window.api.handleAuotLoadPaths((event, fileNames) => {
  if (!fileNames) {
    display.showAlert("Bad file names.", "error", 1500);
    return;
  }
  // push into array of paths
  for (const filePath of fileNames) {
    if (settingsArrayContainer.includes(filePath)) {
      continue;
    } else {
      settingsArrayContainer.push(filePath);
    }
  }
  addImageAudio.play();
  display.showAutoLoadList(settingsArrayContainer);
});

// when You click on x to delete a file path
el.autoLoadList.addEventListener("click", (e) => {
  // event delegation
  if (e.target.classList.contains("deleteFile")) {
    if (!deleteMode) {
      warningEmptyAudio.play();
      display.showAlert(
        "You have to select Edit and Delete mode in menu to make a deletion",
        "error"
      );
      return;
    }
    if (!e.ctrlKey) {
      warningEmptyAudio.play();
      display.showAlert(
        "You have to hold down ctrl key to make a deletion",
        "error"
      );
      return;
    }

    if (e.ctrlKey) {
      if (deleteMode) {
        // this gets the data I embedded into the html
        let dataIndex = e.target.parentElement.parentElement.dataset.index;
        let deleteIndex = parseInt(dataIndex);
        if (isNaN(deleteIndex)) {
          return;
        }
        // delete path
        settingsArrayContainer.splice(deleteIndex, 1);
        warningSelectAudio.play();
        // update Form
        display.showAutoLoadList(settingsArrayContainer);
      }
    }
  }
});
// *************************************************************
//  End Settings Code
// *************************************************************

const saveFileCabinet = (fileCabinet) => {
  window.api.saveFileCabinet(fileCabinet);
}; //End savefileCabinet()

window.api.handleShowAlert((event, { message, msgType }) => {
  display.showAlert(message, msgType);
});
window.api.handleShowSettingsForm((event, noData) => {
  clickAudio.play();
  loadUpSettingsForm();
  display.showSettingsForm();
});

window.api.handleFontSizeChange((event, fontSize) => {
  btnAudio.play();
  switch (fontSize) {
    case "x-small":
      el.root.style.fontSize = "10px";
      break;
    case "small":
      el.root.style.fontSize = "12px";
      break;
    case "normal":
      el.root.style.fontSize = "16px";
      break;
    case "large":
      el.root.style.fontSize = "20px";
      break;
    case "x-large":
      el.root.style.fontSize = "24px";
      break;
    default:
      console.log("No valid font-size");
  }
});

window.api.handleNewFileCabinet((event, { name, path }) => {
  if (!name || !path) {
    wrongAudio.play();
    display.showAlert("Error creating file cabinet!", "error");
    return;
  }
  let pathIsTaken = false;

  for (const fileCab of fileCabArray) {
    if (fileCab.filePath === path) {
      pathIsTaken = true;
    }
  }

  if (pathIsTaken) {
    display.showAlert("That file cabinet is already loaded", "error");
    return;
  }

  let nameIsTaken = false;

  for (const fileCab of fileCabArray) {
    if (fileCab.name === name) {
      nameIsTaken = true;
    }
  }
  if (nameIsTaken) {
    display.showAlert(
      `A file cabinet called ${name} is already loaded`,
      "error"
    );
    return;
  }

  // create a file cab object
  const newfileCab = new FileCabinet(name, path);
  // push the file cab obj into the array of file cabinets
  fileCabArray.push(newfileCab);
  sortArrayByName(fileCabArray);
  // write to file
  // newfileCab.writeFileCabToHardDisk(fs, display);
  saveFileCabinet(newfileCab);
  addAudio.play();
  display.showAlert("A new file cabinet was added", "success", 1500);
  renderFileCabs();
});

window.api.handleOpenFile((event, { name, fileNamePath, mainFolderArray }) => {
  if (!name || !fileNamePath) {
    wrongAudio.play();
    display.showAlert("Error creating file cabinet!", "error");
    return;
  }
  let pathIsTaken = false;

  for (const fileCab of fileCabArray) {
    if (fileCab.fileNamePath === fileNamePath) {
      pathIsTaken = true;
    }
  }

  if (pathIsTaken) {
    wrongAudio.play();
    display.showAlert("That file cabinet is already loaded", "error");
    return;
  }

  let nameIsTaken = false;

  for (const fileCab of fileCabArray) {
    if (fileCab.name === name) {
      nameIsTaken = true;
    }
  }
  if (nameIsTaken) {
    wrongAudio.play();
    display.showAlert(
      `A file cabinet called ${name} is already loaded`,
      "error"
    );
    return;
  }
  addAudio.play();
  const newfileCab = new FileCabinet(name, fileNamePath, mainFolderArray);
  fileCabArray.push(newfileCab);
  renderFileCabs();
});

window.api.handleSetTheme((event, Theme) => {
  $("#myModal").modal("hide");
  // set te current theme
  btnAudio.play();
  currentTheme = Theme;
  // check if delete mode is on, if so return
  if (deleteMode) {
    switch (currentTheme) {
      case "Dark":
        el.blankCssLink.href = "assets/css/dark.css";
        break;
      case "Light":
        el.blankCssLink.href = "assets/css/light.css";
        break;
      default:
        console.log("No Match");
    }
    return;
  }
  switch (currentTheme) {
    case "Dark":
      el.blankCssLink.href = "assets/css/dark.css";
      el.body.style.backgroundColor = "black";
      deleteMode = false;
      break;
    case "Light":
      el.blankCssLink.href = "assets/css/light.css";
      el.body.style.backgroundColor = "white";
      deleteMode = false;
      break;
    default:
      console.log("No valid option!");
    // code block
  }
});

window.api.handleSetDeleteMode((event, deleteModeBool) => {
  $("#myModal").modal("hide");
  // set the delete mode to true or false
  deleteMode = deleteModeBool;
  btnAudio.play();
  let paintMain = false;
  let mainText;
  let subText;
  let paintSub = false;
  let paintNote = false;
  let activeMain = document.querySelector(".main.active");
  let activeSub = document.querySelector(".sub.active");
  if (activeMain) {
    mainText = activeMain.textContent;
  }
  if (activeSub) {
    subText = activeSub.textContent;
  }

  if (deleteMode) {
    display.showAlert("Edit and Delete mode!", "error");
    el.body.style.background = "linear-gradient(to right, #180808, #ff0000)";
    //check for Main folders
    const htmlMainFolders = document.querySelectorAll(".main");
    if (htmlMainFolders.length > 0) {
      paintMain = true;
    }

    // check for sub folders
    const htmlSubFolders = document.querySelectorAll(".sub");

    if (htmlSubFolders.length > 0) {
      paintSub = true;
    }
    // check for notes
    const htmlNotes = document.querySelectorAll(".note");

    if (htmlNotes.length > 0) {
      paintNote = true;
    }
    switch (currentTheme) {
      case "Dark":
        el.blankCssLink.href = "assets/css/dark.css";
        break;
      case "Light":
        el.blankCssLink.href = "assets/css/light.css";
        break;
      default:
        console.log("No Match");
    }
  } else {
    //check for Main folders
    const htmlMainFolders = document.querySelectorAll(".main");
    if (htmlMainFolders.length > 0) {
      paintMain = true;
    }
    // check for sub folders
    const htmlSubFolders = document.querySelectorAll(".sub");
    if (htmlSubFolders.length > 0) {
      paintSub = true;
    }

    // check for notes
    const htmlNotes = document.querySelectorAll(".note");
    if (htmlNotes.length > 0) {
      paintNote = true;
    }

    display.showAlert("Read and Write mode!", "success");
    switch (currentTheme) {
      case "Dark":
        el.body.style.background = "none";
        el.body.style.backgroundColor = "black";
        el.blankCssLink.href = "assets/css/dark.css";
        break;
      case "Light":
        el.body.style.background = "none";
        el.body.style.backgroundColor = "white";
        el.blankCssLink.href = "assets/css/light.css";
        break;
      default:
        console.log("No Match");
    }
  }
  if (paintMain) {
    renderMainFolders();
    if (mainText) {
      // loop through the main array and set the one with mactching text to active
      const htmlCollection = document.querySelectorAll(".main");
      for (let i = 0; i < htmlCollection.length; i++) {
        if (htmlCollection[i].textContent === mainText) {
          htmlCollection[i].classList.add("active");
          break;
        }
      }
    }
  }

  if (paintSub) {
    renderSubFolders();
    if (subText) {
      // loop through the sub array and set the one with mactching text to active
      const htmlCollection = document.querySelectorAll(".sub");
      for (let i = 0; i < htmlCollection.length; i++) {
        if (htmlCollection[i].textContent === subText) {
          htmlCollection[i].classList.add("active");
          break;
        }
      }
    }
  }
  if (paintNote) {
    renderNotes();
  }
});

window.api.handleCloseSelectedFileCab((event, data) => {
  $("#myModal").modal("hide");
  if (fcI === -243 || isNaN(fcI)) {
    warningEmptyAudio.play();
    renderFileCabs();
    display.showAlert("Please select a file cabinet to close!", "error");
    return;
  }
  // remove file cab from array
  fileCabArray.splice(fcI, 1);
  cancelAudio.play();
  renderFileCabs();
});
window.api.handleCloseAllFileCabs((event, data) => {
  $("#myModal").modal("hide");
  // setting the length to Zero emptys the array
  fileCabArray.length = 0;
  cancelAudio.play();
  renderFileCabs();
});
