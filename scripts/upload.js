import {getAllDataOnce} from "./firebase.js"

document.querySelectorAll(".drop-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");
  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });
  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
    }
  });
  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    const datatransfer = e.dataTransfer;
    files = datatransfer.files;
    var extention = GetFileExt(files[0])
    var name = GetFileName(files[0])
    nameBox.value=name
    extlab.innerHTML = extention;
    reader.readAsDataURL(files[0])
  });
});