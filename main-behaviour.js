window.onload = intit;

function intit() {
    var button = document.getElementById("addButton");
    button.onclick = createSticky;

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substring(0, 6) == "sticky") {
            var value = localStorage[key];
            addStickyToDOM(key, value);
        }
    } // end for loop
} // end init function

function addStickyToDOM(key, value) {
    var stickers = document.getElementById("stickers");
    var sticky = document.createElement("li");
    sticky.setAttribute("id", key);
    sticky.setAttribute("title", "Click to delete");
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.innerHTML = value;
    sticky.appendChild(span);
    stickers.insertBefore(sticky, stickers.firstChild);
    sticky.onclick = deleteSticky;

} // end addStickyToDOM function

function createSticky() {
    var value = document.getElementById("notetxt").value;

    if (document.getElementById("notetxt") && value) {

        // Create date object and get current time in millisecond
        var currentDate = new Date();
        var time = currentDate.getTime();

        // Set index or key for local storage according to current time
        var key = "sticky_" + time;

        try {
            localStorage[key] = value;

        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert("Out of Local Storage Capacity");
            }
        } // end try/catch

        addStickyToDOM(key, value);

    } else {
        alert("Your Note is Empty");
    }

} // end createSticky function

function deleteSticky(event) {
    var key = event.target.id;
    if (event.target.tagName.toLowerCase() == "span") {
        key = event.target.parentNode.id;
    } // end if
    localStorage.removeItem(key);
    removeStickyFromDOM(key);
}// end deleteSticky function

function removeStickyFromDOM(key) {
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);

} // end removeStickyFromDOM function