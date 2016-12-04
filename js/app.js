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
var currentListItem = "";
var linkRef = "";

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

//add overlay
function addOverlay(event) {
  //prevent default behaviour
  event.preventDefault();
  //make overlay visible
  overlay.style.display = "block";
  //set selected li
  currentListItem = event.currentTarget;
  //get the src attribute of the image and the p text for the clicked li
  linkRef = this.firstElementChild.getAttribute("href");
  captionText = this.lastElementChild.innerHTML;
  //update img src and caption text
  image.setAttribute("src", linkRef);
  caption.innerHTML = captionText;
}

function updateOverlay() {
  //set the image in the overlay's src attribute
  image.setAttribute("src", linkRef);
  //replace the caption with the captionText
  caption.innerHTML = captionText;
}

function nextImage() {
  nextListItem = currentListItem.nextElementSibling;
  if (nextListItem != null) {
    linkRef = nextListItem.firstElementChild.getAttribute("href");
    captionText = nextListItem.lastElementChild.innerHTML;
    updateOverlay();
    currentListItem = nextListItem;
  }
}

function prevImage() {
  prevListItem = currentListItem.previousElementSibling;
  if ( prevListItem != null ) {
    linkRef = prevListItem.firstElementChild.getAttribute("href");
    captionText = prevListItem.lastElementChild.innerHTML;
    updateOverlay();
    currentListItem = prevListItem;
  }
}

//close overlay
function closeOverlay() {
  overlay.style.display = "none";
}

//Listen for click event on all li's
for (i = 0; i < gallery.children.length; i ++) {
  gallery.children[i].addEventListener("click", addOverlay);
}

//Listen for key up event on search box
searchBox.addEventListener("keyup", search);

//Listen for click event on close and prev buttons
navRight.addEventListener("click", nextImage);
navLeft.addEventListener("click", prevImage);

//Listen for click event on close button
close.addEventListener("click", closeOverlay);

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
