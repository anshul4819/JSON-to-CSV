document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });
    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
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
        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }
        dropZoneElement.classList.remove("drop-zone--over");
    });
});
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }
    thumbnailElement.dataset.label = file.name;

    // Main part which reads the json file and also stores it in a variable
    if (1) {
        var reader = new FileReader();
        reader.onload = (e) => {
            data = e.target.result

            // "data" is now the variable which stores the json data
            data = JSON.parse(data)
            var fields = Object.keys(data[0])
            var replacer = function (key, value) { return value === null ? '' : value }
            var csv = data.map(function (row) {
                return fields.map(function (fieldName) {
                    return JSON.stringify(row[fieldName], replacer)
                }).join(',')
            })
            csv.unshift(fields.join(',')) 
            csv = csv.join('\r\n');
            var btn = document.getElementById('btn')
            var dataObj = new Blob([csv], {type: 'csv'})
            btn.href = URL.createObjectURL(dataObj)
            btn.download = file.name.split(".")[0]+".csv"
        };
        reader.readAsText(file)
    }
} 