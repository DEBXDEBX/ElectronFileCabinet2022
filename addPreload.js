const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addFormSubmit: (name) => {
    ipcRenderer.send("addForm:submit", name);
    console.warn(name);
  },
  addFormCancel: () => {
    ipcRenderer.send("addForm:cancel");
  },
});
