'use strict';

const fileTypes = [
  'image/jpeg',
  'image/png'
];

const img = new Image();
img.crossOrigin = 'anonymous';

const canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 450;

const ctx = canvas.getContext('2d');

const fileInput = document.getElementById('file');
fileInput.addEventListener('change', updateImage);

function updateImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const file = fileInput.files[0];

    if (!validateFileType(file)) {
        alert(`Not a valid file type. Update your selection. Allowed: ${fileTypes.join(', ')}.`);
    }

    // img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function validateFileType(file) {
    return fileTypes.includes(file.type);
}

function original() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function grayscale() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[1] + data[i + 1] + data[i + 2]) / 3;

        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    ctx.putImageData(imgData, 0, 0);
}

function inverse() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }

    ctx.putImageData(imgData, 0, 0);
}
