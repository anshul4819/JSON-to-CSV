dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
    evt.preventDefault();
  };
  
  dropContainer.ondrop = function(evt) {
    fileInput.files = evt.dataTransfer.files;
    const dT = new DataTransfer();
    dT.items.add(evt.dataTransfer.files[0]);
    dT.items.add(evt.dataTransfer.files[3]);
    fileInput.files = dT.files;
  
    evt.preventDefault();
  };