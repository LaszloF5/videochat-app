let socket = io("http://localhost:8000");

navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then(loadStream);

function loadStream(stream) {
  const video = document.createElement("video");
  video.setAttribute("autoplay", 'true');
  video.getAttribute("playsinline", 'true');
  video.getAttribute("controls", 'true');
  video.srcObject = stream;
  document.querySelector(".js-container").appendChild(video);
};

navigator.mediaDevices
         .enumerateDevices()
         .then(logDevices)
         .catch(handleError);

function logDevices(devices) {
    for (let device of devices) {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
    }
}

function handleError() {
    console.log(err.name + ": " + err.message);
}