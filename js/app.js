//Variables
const searchBar = document.getElementById('search');
const photoGallery = document.getElementById('gallery');
const galleryItems = photoGallery.children;
const overlayDiv = document.createElement('div');
let overlayImage = document.createElement('img');
let overlayCaption = document.createElement('p');
const overlayCloseButton = document.createElement('i');
const overlayLeftButton = document.createElement('i');
const overlayRightButton = document.createElement('i');
const endOfBody = document.querySelector('body script');
let imageRef = '';
let imageCaption = '';


//Search Bar
searchBar.addEventListener('keyup', (event) => {
  searchBarValue = searchBar.value;
  for ( let i = 0 ; i < galleryItems.length ; i += 1 ) {
    let galleryItemCaption = galleryItems[i].lastElementChild.textContent;
    if (galleryItemCaption.indexOf(searchBarValue) > -1 ) {
      galleryItems[i].classList.remove('hidden');
      galleryItems[i].classList.add('visible');
    } else {
        galleryItems[i].classList.remove('visible');
        galleryItems[i].classList.add('hidden');
    }
  }
});

//add the overlay and show the selected image and caption
photoGallery.addEventListener('click', (event) => {
  event.preventDefault();
  overlayDiv.style.display = 'block';
  if (event.target.tagName == 'IMG') {
    imageRef = event.target.parentNode.getAttribute('href');
    imageCaption = event.target.parentNode.nextElementSibling.textContent;
    selectedListItem = event.target.parentNode.parentNode;
  } else if (event.target.tagName == 'P') {
    imageRef = event.target.previousElementSibling.getAttribute('href');
    imageCaption = event.target.textContent;
    selectedListItem.event.target.parentNode;
  }
  updateOverlay();
});

//Cycle through the next image and caption whenc clicking on the next arrow
overlayRightButton.addEventListener('click', () => {
  while (selectedListItem.nextElementSibling != null) {
    if (selectedListItem.nextElementSibling.classList.contains('visible') == false ) {
      selectedListItem = selectedListItem.nextElementSibling;
    } else {
      break;
    }
  }
  if ( selectedListItem.nextElementSibling != null && selectedListItem.nextElementSibling.classList.contains('visible')) {
    selectedListItem = selectedListItem.nextElementSibling;
    imageRef = selectedListItem.firstElementChild.getAttribute('href');
    imageCaption = selectedListItem.lastElementChild.textContent;
    updateOverlay();
  }
});

//cycle through previous image and caption when clicking on the previous arrow
overlayLeftButton.addEventListener('click', () => {
  while (selectedListItem.previousElementSibling != null) {
    if (selectedListItem.previousElementSibling.classList.contains('visible') == false ) {
      selectedListItem = selectedListItem.previousElementSibling;
    } else {
      break;
    }
  }
  if ( selectedListItem.previousElementSibling != null && selectedListItem.previousElementSibling.classList.contains('visible')) {
    selectedListItem = selectedListItem.previousElementSibling;
    imageRef = selectedListItem.firstElementChild.getAttribute('href');
    imageCaption = selectedListItem.lastElementChild.textContent;
    updateOverlay();
  }
});
//update the image and caption on the overlay
function updateOverlay() {
  overlayImage.setAttribute('src', imageRef);
  overlayCaption.textContent = imageCaption;
}

//Hide the overlay on clicking the overlayCloseButton
overlayCloseButton.addEventListener('click', () => {
  overlayDiv.style.display = 'none';
});

//Add the overlay
document.body.insertBefore(overlayDiv, endOfBody);
overlayDiv.className = 'overlay';
overlayDiv.appendChild(overlayImage);
overlayDiv.appendChild(overlayCaption);
overlayDiv.appendChild(overlayLeftButton);
overlayLeftButton.className = 'fa fa-chevron-left';
overlayDiv.appendChild(overlayRightButton);
overlayRightButton.className = 'fa fa-chevron-right';
overlayDiv.appendChild(overlayCloseButton);
overlayCloseButton.className = 'fa fa-times';
