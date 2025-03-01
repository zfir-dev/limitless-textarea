document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const stateOn = document.getElementById("stateOn");
  const stateOff = document.getElementById("stateOff");

  chrome.storage.local.get(["extensionEnabled"], function (result) {
    const enabled = result.extensionEnabled !== false;
    if (enabled) {
      stateOn.hidden = false;
      stateOff.hidden = true;
    } else {
      stateOn.hidden = true;
      stateOff.hidden = false;
    }
  });

  toggleButton.addEventListener("click", function () {
    setTimeout(function () {
      const enabled = !stateOn.hidden;
      chrome.storage.local.set({ extensionEnabled: enabled }, function () {
        console.log("Extension state updated to:", enabled);
      });
    }, 350);
  });
});
