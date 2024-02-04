document.addEventListener("DOMContentLoaded", function () {
    const mainTag = document.getElementsByTagName('main')[0];
    const headerPart = document.getElementById('headerPart');
    const qrCode = document.getElementById("qrcode");
    const searchPagePart = document.getElementById('searchPagePart');
    const loaderPagePart = document.getElementById('loaderPagePart');
    const qrCodePagePart = document.getElementById('qrCodePagePart');
    const urlInput = document.getElementById('urlInput');
    const logoImages = document.querySelectorAll('.logoId');
    const downloadButton = document.getElementById('downloadButton');

    // Function to redirect at starting page
    function redirectURL() {
        const redirectURL = "/index.html";
        window.location.href = redirectURL;
    }

    // Function to generate QR code
    function generateQRCode(givenURL) {
        // Hide search page part - part 1
        searchPagePart.style.display = 'none';

        // Show Loader page - part 2
        loaderPagePart.style.display = 'flex';
        mainTag.style.height = 'inherit';


        // Get the data (you can replace this with your desired data)
        const dataToEncode = givenURL;

        // Clear any existing QR code
        qrCode.innerHTML = "";

        // Create a new instance of QRCode and generate the QR code
        const qrcode = new QRCode(qrCode, {
            text: dataToEncode,
            width: 184,
            height: 184,
        });

        // Wait for 5 seconds
        setTimeout(function () {
            // Hide Loader page part - part 2
            loaderPagePart.style.display = 'none';
            mainTag.style.height = 'auto';

            // Show QR code page part - part 3
            if (qrcode) {
                qrCodePagePart.style.display = 'flex';
                headerPart.style.display = "block";
            }
        }, 5000);
    }

    // Function to validate the entered URL
    function validateURL() {
        try {
            if (!urlInput.value.trim()) {
                alert("Error: Enter URL");
                return;
            }
            let givenURL = new URL(urlInput.value.trim());
            generateQRCode(givenURL);
        } catch (error) {
            alert("Error: Enter a valid URL");
            return false; // The URL is not valid
        }
    }

    // Add a click event listener to the button
    document.getElementById("generateQRButton").addEventListener("click", validateURL);
    logoImages.forEach(function (logoImage) {
        logoImage.addEventListener("click", redirectURL);
    });
});

// Function to copy the QR Code
function copyQRCode() {
    if (document.hasFocus()) {
        const imgElement = document.getElementById("qrcode").querySelector("img");
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
        canvas.toBlob((blob) => {
            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]).then(() => {
                alert('QR code copied to clipboard successfully.');
            }).catch((error) => {
                console.error('Error copying QR code to clipboard:', error);
            });
        }, 'image/png');
    } else {
        console.error('Document is not focused. Cannot copy to clipboard.');
    }
}

// Function to download the QR Code
function downloadQRCode() {
    const canvas = document.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
