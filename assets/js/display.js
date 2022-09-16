class Display {
  constructor(elements, $) {
    this.elements = elements;
    // JQuery
    this.$ = $;
    this.tabColorIndex = 0;
    this.tabColors = [
      "#2de11d",
      "#4848e8",
      "#e84d4d",
      "Orange",
      "Violet",
      "#820ee8",
      "#8e7fc7",
      "#ff008b",
      "#4dc6e8",
      "#17abf5",
      "#4c69bd",
      "#e251dc",
      "#bbb70e",
    ];
  } // End constructor

  //Method
  displayNone(element) {
    this.$(element).slideUp("slow");
  } // End displayNone(element)

  //Method
  displayBlock(element) {
    this.$(element).slideDown("slow");
  } // End displayBlock(element)

  //Method
  clearFileCabDisplay() {
    this.elements.fileCabList.innerHTML = "";
  } // End clearFileCabDisplay()

  //Method
  clearPrimaryDisplay() {
    this.elements.mainFolderList.innerHTML = "";
  } // End clearPrimaryDisplay()

  //Method
  clearSubDisplay() {
    this.elements.subFolderList.innerHTML = "";
  } // End clearSubDisplay()

  //Method
  clearNoteDisplay() {
    this.elements.noteList.innerHTML = "";
  } // End clearNoteDisplay()

  // Method
  paintFileCabTabs(mapedArray) {
    this.hideSetttingsForm();
    this.clearFileCabDisplay();
    this.clearPrimaryDisplay();
    this.clearSubDisplay();
    this.clearNoteDisplay();
    this.displayNone(this.elements.renameFileCabForm);
    this.displayNone(this.elements.headingMainFolder);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.renameFileCabForm);
    // this will paint all file cabinets tabs
    // make variable for html
    let html = "";
    mapedArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="fileCab">${element}</li>`;
    });
    // paint file cab tabs
    this.elements.fileCabList.innerHTML = html;
    // color tabs
    const tabList = document.getElementsByClassName("fileCab");
    this.colorSetOfTabs(tabList);
    return -243;
  } // End paintFileCabTabs(mapedArray)

  // Method
  paintMainFolderTabs(deleteMode, mapedArray) {
    this.clearPrimaryDisplay();
    this.clearSubDisplay();
    this.clearNoteDisplay();
    this.displayNone(this.elements.renameFileCabForm);
    this.displayNone(this.elements.headingMainFolder);
    this.displayBlock(this.elements.headingMainFolder);
    this.displayNone(this.elements.mainFolderList);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    // make a variable to hold html
    let html = "";
    if (deleteMode) {
      mapedArray.forEach((element, index) => {
        html += `<li data-index="${index}" class="main">${element}<i
        title="Delete Main Folder"
        class="delete-main trash fas fa-trash-alt"
      ></i
    ></li>`;
      });
      // paint main folder tabs
      this.elements.mainFolderList.innerHTML = html;
    } else {
      mapedArray.forEach((element, index) => {
        html += `<li data-index="${index}" class="main">${element}</li>`;
      });
      // paint main folder tabs
      this.elements.mainFolderList.innerHTML = html;
    } // End if/else statement
    this.displayBlock(this.elements.mainFolderList);
    // color tabs
    const tabList = document.getElementsByClassName("main");
    this.colorSetOfTabs(tabList);
  } // End paintMainFolderTabs(deleteMode, mapedArray)

  // Method
  paintSubFolderTabs(deleteMode, mappedSecondaryArray) {
    this.clearSubDisplay();
    this.clearNoteDisplay();
    this.displayNone(this.elements.headingSubFolder);
    this.displayBlock(this.elements.headingSubFolder);
    this.displayNone(this.elements.subFolderList);
    this.displayNone(this.elements.headingNote);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    // make variable for html
    let html = "";
    if (deleteMode) {
      mappedSecondaryArray.forEach((element, index) => {
        html += `<li data-index="${index}" class="sub">${element}<i
       title="Delete Sub Folder"
       class="delete-sub trash fas fa-trash-alt"
     ></i
   ></li>`;
      });
      this.elements.subFolderList.innerHTML = html;
    } else {
      mappedSecondaryArray.forEach((element, index) => {
        html += `<li data-index="${index}" class="sub">${element}</li>`;
      });
      this.elements.subFolderList.innerHTML = html;
    }
    this.displayBlock(this.elements.subFolderList);
    // color tabs
    const tabList = document.getElementsByClassName("sub");
    this.colorSetOfTabs(tabList);
  } // End paintSubFolderTabs(deleteMode, mappedSecondaryArray)

  //Method
  paintNotes(deleteMode, noteArray) {
    this.displayNone(this.elements.headingNote);
    this.displayBlock(this.elements.headingNote);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.noteList);
    // clear the div
    this.clearNoteDisplay();
    // build div
    noteArray.forEach((note, index) => {
      // if delete mode is true, build div with head of the note to delete and move note
      if (deleteMode) {
        let html = "";
        const newHead = document.createElement("div");
        html += `<h3 data-index="${index}" class="head"><span title='Move Down' class='moveUp'>&uArr;</span><i
      title="Delete Note"
      class="delete-item fas fa-trash-alt trash"
    ></i
  ><span title='Move Up' class='moveDown'>&dArr;</span><i class="edit-note fas fa-edit" data-toggle="modal" data-target="#myModal"
  title="Edit Note"
  
></i
></h3>`;
        newHead.innerHTML = html;
        // insert the head of the note
        this.elements.noteList.appendChild(newHead);
      } // End Head of Note
      //######################## Now build the Note #################################
      const newElement = document.createElement("h4");
      newElement.className = "note";
      newElement.setAttribute("data-index", `${index}`);
      if (note.imagePath) {
        newElement.appendChild(
          document.createTextNode(`${note.text}\n\n ${note.imagePath}`)
        );
      } else {
        newElement.appendChild(document.createTextNode(`${note.text}`));
      }
      // insert the note
      this.elements.noteList.appendChild(newElement);
    });

    this.displayBlock(this.elements.noteList);
  } // paintNotes(deleteMode, noteArray)

  //Method
  showRenameFileCabForm() {
    this.clearPrimaryDisplay();
    this.clearSubDisplay();
    this.clearNoteDisplay();
    this.displayNone(this.elements.headingMainFolder);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.renameFileCabForm);
    this.displayBlock(this.elements.renameFileCabForm);
  } // End showRenameFileCabForm()

  //Method
  showMainFolderForm() {
    // hide Add btn
    this.displayBlock(this.elements.addMainFolderSubmitBtn);
    // enable add btn
    this.elements.addMainFolderSubmitBtn.disabled = false;
    // show reName btn
    this.displayNone(this.elements.renameMainFolderBtn);
    // disable rename btn
    this.elements.renameMainFolderBtn.disabled = true;

    this.displayNone(this.elements.mainFolderForm);
    this.displayBlock(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);
    this.clearSubDisplay();
    this.clearNoteDisplay();
  } // End showMainFolderForm()
  //Method
  showRenameMainFolderForm() {
    // hide Add btn
    this.displayNone(this.elements.addMainFolderSubmitBtn);
    // disable add btn
    this.elements.addMainFolderSubmitBtn.disabled = true;
    // show reName btn
    this.displayBlock(this.elements.renameMainFolderBtn);
    // enable rename btn
    this.elements.renameMainFolderBtn.disabled = false;

    this.displayNone(this.elements.mainFolderForm);
    this.displayBlock(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);
    this.clearSubDisplay();
    this.clearNoteDisplay();
  } // End showRenameMainFolderForm()
  //Method
  showSubFolderForm() {
    // hide Add btn
    this.displayBlock(this.elements.addSubFolderSubmitBtn);
    // enable add btn
    this.elements.addSubFolderSubmitBtn.disabled = false;
    // show reName btn
    this.displayNone(this.elements.renameSubfolderSubmitBtn);
    // disable rename btn
    this.elements.renameSubfolderSubmitBtn.disabled = true;

    this.displayNone(this.elements.subFolderForm);
    this.displayBlock(this.elements.subFolderForm);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.headingNote);
    this.clearNoteDisplay();
  } // End showSubFolderForm()
  showRenameSubFolderForm() {
    // hide Add btn
    this.displayNone(this.elements.addSubFolderSubmitBtn);
    // disable add btn
    this.elements.addSubFolderSubmitBtn.disabled = true;
    // show reName btn
    this.displayBlock(this.elements.renameSubfolderSubmitBtn);
    // enable rename btn
    this.elements.renameSubfolderSubmitBtn.disabled = false;

    this.displayNone(this.elements.subFolderForm);
    this.displayBlock(this.elements.subFolderForm);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.headingNote);
    this.clearNoteDisplay();
  } // End showSubFolderForm()
  //Method
  showNoteForm() {
    this.displayBlock(this.elements.noteForm);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
  } // End showNoteForm()

  //Method
  colorSetOfTabs(htmlCollection) {
    for (const item of htmlCollection) {
      item.style.backgroundColor = this.tabColors[this.tabColorIndex];
      if (this.tabColorIndex === this.tabColors.length - 1) {
        this.tabColorIndex = 0;
      } else {
        this.tabColorIndex++;
      }
    }
  } // End colorSetOfTabs(htmlCollection)

  // Method
  showAlert(message, className, displayTime = 4000) {
    if (className === "success") {
      // remove error
      this.elements.displayMessage.classList.remove("error");
      // add success
      this.elements.displayMessage.classList.add("success");
      // remove red border
      this.elements.messageBorder.classList.remove("redBorder");
      // add green border
      this.elements.messageBorder.classList.add("greenBorder");
    } else {
      // remove success
      this.elements.displayMessage.classList.remove("success");
      // add error
      this.elements.displayMessage.classList.add("error");
      // remove green border
      this.elements.messageBorder.classList.remove("greenBorder");
      // add red border
      this.elements.messageBorder.classList.add("redBorder");
    }
    this.elements.displayMessage.textContent = message;
    $("#myMessageModal").modal("hide");
    $("#myMessageModal").modal("show");
    setTimeout(() => {
      $("#myMessageModal").modal("hide");
    }, displayTime);
  } // End showAlert()

  // ****************************Settings Below**********************

  //Method
  showSettingsForm() {
    this.clearFileCabDisplay();
    this.clearPrimaryDisplay();
    this.clearSubDisplay();
    this.clearNoteDisplay();
    this.displayNone(this.elements.headingMainFolder);
    this.displayNone(this.elements.headingSubFolder);
    this.displayNone(this.elements.headingNote);
    this.displayNone(this.elements.mainFolderForm);
    this.displayNone(this.elements.subFolderForm);
    this.displayNone(this.elements.noteForm);
    this.displayNone(this.elements.renameFileCabForm);
    //show settings form
    this.displayBlock(this.elements.settingsForm);
  } // End showSettingsForm()

  //Method
  hideSetttingsForm() {
    this.displayNone(this.elements.settingsForm);
  } // End hideSetttingsForm()

  //Method
  clearAutoLoadUL() {
    // clear the ul
    this.elements.autoLoadList.innerHTML = "";
  } // End clearAutoLoadUL()

  //Method
  showAutoLoadList(autoLoadArray) {
    // clear the ul
    this.clearAutoLoadUL();
    // make variable for html
    let html = "";
    autoLoadArray.forEach((element, index) => {
      html += `<li data-index="${index}" class="autoLoad"><span title='Delete'><i class="fas fa-trash-alt deleteFile"></i></span>${element}</li>`;
    });
    this.elements.autoLoadList.innerHTML = html;
  }
} // End Display class
