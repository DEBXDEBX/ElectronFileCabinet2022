const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  system: () => {
    console.log("system test");
  },
  handleShowAlert: (callback) => ipcRenderer.on("Display:showAlert", callback),
  handleOpenFile: (callback) => ipcRenderer.on("fileCabinet:load", callback),
  handleFontSizeChange: (callback) =>
    ipcRenderer.on("FontSize:Change", callback),
  handleNewFileCabinet: (callback) =>
    ipcRenderer.on("fileCabinet:add", callback),
  saveFileCabinet: (test) => {
    ipcRenderer.send("fileCabinet:save", test);
  },
  // auto load
  handleShowSettingsForm: (callback) =>
    ipcRenderer.on("Display:showSettingsForm", callback),
  showOpenDialog: () => {
    ipcRenderer.send("autoload:getFiles");
  },
  showImageDialog: () => {
    ipcRenderer.send("image:getFiles");
  },
  handleImagePath: (callback) =>
    ipcRenderer.on("imagePath:sendToRenderer", callback),
  handleAuotLoadPaths: (callback) => {
    ipcRenderer.on("autoLoadPaths:sendTolocalStorage", callback);
  },
  sendFilePathsForAutoload: (myFilePathsForAutoLoad) => {
    ipcRenderer.send("autoloadFiles:open", myFilePathsForAutoLoad);
  },
  handleSetDeleteMode: (callback) => {
    ipcRenderer.on("deleteMode:set", callback);
  },
  handleSetTheme: (callback) => {
    ipcRenderer.on("Theme:set", callback);
  },
  handleCloseSelectedFileCab: (callback) => {
    ipcRenderer.on("FileCab:close", callback);
  },
  handleCloseAllFileCabs: (callback) => {
    ipcRenderer.on("FileCab:closeAll", callback);
  },
});
