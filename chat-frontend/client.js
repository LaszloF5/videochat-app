let socket = io("http://localhost:8000");

navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then(loadStream);

function loadStream(stream) {
  const video = document.createElement("video");
  video.setAttribute("autoplay", "true");
  video.setAttribute("playsinline", "true");
  video.setAttribute("controls", "true");
  video.srcObject = stream;
  document.querySelector(".js-container").appendChild(video);
}

navigator.mediaDevices.enumerateDevices().then(logDevices).catch(handleError);

function logDevices(devices) {
  for (let device of devices) {
    console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
  }
}

function handleError() {
  console.log(error.name + ": " + error.message);
}

navigator.mediaDevices.enumerateDevices().then(selectOne).catch(handleError);

function selectOne(devices) {
  let html = "";
  for (let i = 0; i < devices.length; i += 1) {
    let device = devices[i];
    if (device.kind === "audioinput") {
      html += `<option value="${device.deviceId}">${device.label}</option>`;
    }
    const devicesSelect = document.querySelector(".js-input-devices");
    devicesSelect.innerHTML = html;
    devicesSelect.addEventListener("change", changeMicrophone);
  }
}

function changeMicrophone(event) {
  console.log(event.target.value);
}

// Buttons

document.querySelector(".js-start-stream").addEventListener("click", () => {
  const microphoneId = document.querySelector(".js-input-devices").value;
  startStream(microphoneId);
});

document.querySelector(".js-stop-stream").addEventListener("click", stopStream);

let video = null;

function stopStream() {
  document.querySelector(".js-container").innerHTML = "";
}

function startStream(audiodeviceId) {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId: audiodeviceId,
      },
      video: true,
    })
    .then((stream) => {
      stopStream();
      video = document.createElement("video");
      video.setAttribute("autoplay", "true");
      video.setAttribute("playsinline", "true");
      video.setAttribute("controls", "true");
      video.srcObject = stream;
      document.querySelector(".js-container").appendChild(video);
      window.stream = stream;
    });
}
