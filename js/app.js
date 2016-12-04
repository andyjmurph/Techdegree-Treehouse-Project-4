//Search box
  //Problem: User can type in the search box, but nothing happens thereafter
  //Solution: Filter the gallery images as you type in the search box

var searchBox = document.getElementById("search");
var gallery = document.getElementById("gallery");
var overlay = document.createElement("div");
var image = document.createElement("img");
var caption = document.createElement("p");
var navLeft = document.createElement("i");
var navRight = document.createElement("i");
var close = document.createElement("i");
var endBody = document.querySelector("body script");
var listItem = "";
var linkRef = "";
var selectedListItem = "";
var nextListItem = "";

//close overlay
var closeOverlay = function() {
  overlay.style.display = "none";
}

//add overlay
var addOverlay = function(event) {
  //prevent default behaviour
  event.preventDefault();
  //make overlay visible
  overlay.style.display = "block";
  //set the imgSelected
  selectedListItem = event.currentTarget;
  //get the src attribute of the clicked image
  linkRef = event.currentTarget.firstElementChild.getAttribute("href");
  //update img src to selected image
  image.setAttribute("src", linkRef);
  //get the p text for the caption
  captionText = event.currentTarget.lastElementChild.innerHTML;
  //update the caption text on the overlay
  caption.innerHTML = captionText;
}

var search = function() {
  //Take the value of #search
  searchValue = searchBox.value;
  //Cycle through the .gallery-item(s)
  for (i = 0; i < gallery.children.length; i++) {
    //Get the .img-caption text
    var galleryItem = gallery.getElementsByTagName("li")[i];
    var caption = galleryItem.children[1].innerHTML;
    //Compare the #search value with the .img-caption text
    if (caption.indexOf(searchValue) > -1) {
      //remove the class hidden
      galleryItem.className = "gallery-item match";
    } else {
      //add the class hidden
      galleryItem.className = "gallery-item hidden";
    }
  }
}

var nextImage = function() {
  if (selectedListItem.nextElementSibling != null) {
    if ( (searchBox.value == "" && selectedListItem.nextElementSibling != null) || (searchBox.value != "" && selectedListItem.nextElementSibling != null && selectedListItem.nextElementSibling.className == "gallery-item match") ) {
      selectedListItem = selectedListItem.nextElementSibling;
      updateOverlay();
    } else {
        while ( selectedListItem.nextElementSibling != null ) {
          selectedListItem = selectedListItem.nextElementSibling;
          nextImage();
      }
    }
  }
}

/* var nextImage = function() {
  if ( ( searchBox.value == "" && selectedListItem.nextElementSibling != null) || ( searchBox.value != "" && selectedListItem.nextElementSibling != null && selectedListItem.nextElementSibling.className == "gallery-item match" ) ) {
    selectedListItem = selectedListItem.nextElementSibling;
    updateOverlay();
  } else {
    while ( selectedListItem.nextElementSibling != null ) {
      if ( selectedListItem.nextElementSibling.className != "gallery-match" ) {
        selectedListItem = selectedListItem.nextElementSibling;
      } updateOverlay();
    }
    updateOverlay();
  }
}
*/
var prevImage = function() {
  if (selectedListItem.previousElementSibling != null) {
    if ( (searchBox.value == "" && selectedListItem.previousElementSibling != null) || (searchBox.value != "" && selectedListItem.previousElementSibling != null && selectedListItem.previousElementSibling.className == "gallery-item match") ) {
      selectedListItem = selectedListItem.previousElementSibling;
      updateOverlay();
    } else {
        while ( selectedListItem.previousElementSibling != null && selectedListItem.previousElementSibling.className == "gallery-item hidden" ) {
          selectedListItem = selectedListItem.previousElementSibling;
          prevImage();
      }
    }
  }
}



function updateOverlay() {
  //get the href attribute of the image tag within the selectedListItem
  linkRef = selectedListItem.firstElementChild.getAttribute("href");
  //get the p tag text
  captionText = selectedListItem.lastElementChild.innerHTML;
  //set the image in the overlay's src attribute
  image.setAttribute("src", linkRef);
  //replace the caption with the captionText
  caption.innerHTML = captionText;
}

//Call the search function when text is entered in the search box
searchBox.onkeyup = search;


//Lightbox gallery
  //Problem:  When clicking on an image, you see the full screen link with no option to go back
  //Solution: Display the clicked image in an overlay with next and back buttons, and a close button

//Create the overlay
document.body.insertBefore(overlay, endBody);
//add overlay class to overlay
overlay.className = "overlay";
//append image to overlay
overlay.appendChild(image);
//append caption to overlay
overlay.appendChild(caption);
//append left navigation arrow to overlay
overlay.appendChild(navLeft);
//add font awesome class to navLeft
navLeft.className = "fa fa-chevron-left";
//append right navigation arrow to overlay
overlay.appendChild(navRight);
//add font awesome class to navRight
navRight.className = "fa fa-chevron-right";
//append close button to overlay
overlay.appendChild(close);
//add font awesome class to close
close.className = "fa fa-times";

//bind onclick event to the overlay close button
close.onclick = closeOverlay;

//bind onclick event to the navRight
navRight.onclick = nextImage;

//bind onclick event to the navRight
navLeft.onclick = prevImage;

//bind clickHandler function to all .galleryitem
for (i = 0; i < gallery.children.length; i ++) {
  gallery.children[i].onclick = addOverlay;
}
