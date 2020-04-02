// Configuration
// ================================================================

// List of URLs to invert
const urlList = [
	"www.amd.com",
	"github.com",
	"www.logitechg.com",
	"medium.com",
	"unsplash.com"
]

// Selector for finding favicon
const selector = "link[rel='icon'], link[rel='shortcut icon']";

// Actual running code
// ================================================================

// Check if url is in list and invert accordingly
urlList.forEach(function(item) {
	if (location.host == item) invertFavicon();
	console.log(item, location.host == item);
});

function invertFavicon() {
	// Get favicon of page
	var favicon = document.querySelector(selector);

	// Load url of image, invert it and change favicon
	var image = new Image();
	image.crossOrigin = "anonymous";

	image.onload = function() {
	 	favicon.href = invertImage(image);
	}

	image.src = favicon.href;
}

// Function for inverting an image and returning dataURL
function invertImage(image) {
	// Create canvas with size of image
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	// Draw image on canvas
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	// Get imageData of canvas
	var imgData = ctx.getImageData(0, 0, image.width, image.height);
	var data = imgData.data;

	// Invert RGB channels
	for (var i = 0; i < data.length; i += 4) {
		data[i] = 255 - data[i];
		data[i+1] = 255 - data[i+1];
		data[i+2] = 255 - data[i+2];
 	}

 	// Put imageData on canvas and return dataURL
 	ctx.putImageData(imgData, 0, 0);
 	return canvas.toDataURL();
}