class Elements {
  constructor() {
    // select the lists
    this.fileCabList = document.querySelector("#fileCabList");
    this.mainFolderList = document.querySelector("#mainFolderList");
    this.subFolderList = document.querySelector("#subFolderList");
    this.noteList = document.querySelector("#noteList");
    this.autoLoadList = document.querySelector("#autoLoadList");
    // select headings
    this.headingMainFolder = document.querySelector("#headingMainFolder");
    this.headingSubFolder = document.querySelector("#headingSubFolder");
    this.headingNote = document.querySelector("#headingNote");
    // select forms
    this.renameFileCabForm = document.querySelector("#renameFileCabForm");
    this.mainFolderForm = document.querySelector("#mainFolderForm");
    this.subFolderForm = document.querySelector("#subFolderForm");
    this.noteForm = document.querySelector("#noteForm");
    this.settingsForm = document.querySelector("#settingsForm");
    // select btn's icon's inputs and textArea's
    this.renameFileCabSubmitBtn = document.querySelector(
      "#renameFileCabSubmitBtn"
    );
    this.addMainFolderSubmitBtn = document.querySelector(
      "#addMainFolderSubmitBtn"
    );
    this.renameMainFolderBtn = document.querySelector("#renameMainFolderBtn");
    this.addSubFolderSubmitBtn = document.querySelector(
      "#addSubFolderSubmitBtn"
    );
    this.renameSubfolderSubmitBtn = document.querySelector(
      "#renameSubfolderSubmitBtn"
    );
    this.renameFileCabCancelBtn = document.querySelector(
      "#renameFileCabCancelBtn"
    );
    this.mainFolderAddIcon = document.querySelector("#mainFolderAddIcon");
    this.mainFolderCancelBtn = document.querySelector("#mainFolderCancelBtn");
    this.subFolderAddIcon = document.querySelector("#subFolderAddIcon");
    this.subFolderCancelBtn = document.querySelector("#subFolderCancelBtn");
    this.noteModalTextArea = document.querySelector("#noteModalTextArea");
    this.noteAddIcon = document.querySelector("#noteAddIcon");
    this.addNoteSubmitBtn = document.querySelector("#addNoteSubmitBtn");
    this.noteCancelBtn = document.querySelector("#noteCancelBtn");
    this.noteClearTextAreaBtn = document.querySelector("#noteClearTextAreaBtn");
    this.noteAddDateBtn = document.querySelector("#noteAddDateBtn");
    this.saveEditedNoteBtn = document.querySelector("#saveEditedNoteBtn");
    this.editNoteCloseBtn = document.querySelector("#editNoteCloseBtn");
    this.saveSettingsSubmitBtn = document.querySelector(
      "#saveSettingsSubmitBtn"
    );
    this.settingsCancelBtn = document.querySelector("#settingsCancelBtn");
    this.factoryResetBtn = document.querySelector("#factoryResetBtn");
    this.settingsAddPathBtn = document.querySelector("#settingsAddPathBtn");
    this.fileCabRenameInput = document.querySelector("#fileCabRenameInput");
    this.mainFolderNameInput = document.querySelector("#mainFolderNameInput");
    this.subFolderNameInput = document.querySelector("#subFolderNameInput");
    this.noteTextAreaInput = document.querySelector("#noteTextAreaInput");
    // select message display
    this.displayMessage = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#messageBorder");
    // select setting's elements
    this.root = document.querySelector(":root");
    this.body = document.querySelector("body");
    this.autoLoadCheckBox = document.querySelector("#autoLoadCheckBox");
    this.darkRadio = document.querySelector("#darkRadio");
    this.lightRadio = document.querySelector("#lightRadio");
    this.xSmallRadio = document.querySelector("#xSmallRadio");
    this.smallRadio = document.querySelector("#smallRadio");
    this.normalRadio = document.querySelector("#normalRadio");
    this.largeRadio = document.querySelector("#largeRadio");
    this.xLargeRadio = document.querySelector("#xLargeRadio");
    this.blankCssLink = document.querySelector("#blankCssLink");
  } // End constructor
} // End Elements class
