class Audio {
  constructor() {
    //Select audio files
    this.addAudio = document.querySelector("#addAudio");
    this.addImageAudio = document.querySelector("#addImageAudio");
    this.deleteAudio = document.querySelector("#deleteAudio");
    this.warningEmptyAudio = document.querySelector("#warningEmptyAudio");
    this.warningSelectAudio = document.querySelector("#warningSelectAudio");
    this.warningNameTakenAudio = document.querySelector(
      "#warningNameTakenAudio"
    );
    this.tabAudio = document.querySelector("#tabAudio");
    this.clickAudio = document.querySelector("#clickAudio");
    this.btnAudio = document.querySelector("#btnAudio");
    this.cancelAudio = document.querySelector("#cancelAudio");
    this.wrongAudio = document.querySelector("#wrongAudio");
  } // End constructor
}
