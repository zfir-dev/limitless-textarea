document.addEventListener("DOMContentLoaded", function () {
  const extensionState = document.getElementById("extensionState");
  const toggleButton = document.getElementById("toggleButton");

  chrome.storage.local.get(["extensionEnabled"], function (result) {
    const enabled = result.extensionEnabled !== false;
    if (enabled) {
      extensionState.classList.add("uk-card-primary");
      extensionState.textContent = "Extension is On";
    } else {
      extensionState.classList.remove("uk-card-primary");
      extensionState.textContent = "Extension is Off";
    }
  });

  toggleButton.addEventListener("click", function () {
    setTimeout(function () {
      const enabled = extensionState.classList.contains("uk-card-primary");
      extensionState.textContent = enabled
        ? "Extension is On"
        : "Extension is Off";
      chrome.storage.local.set({ extensionEnabled: enabled }, function () {
        console.log("Extension state updated to:", enabled);
      });
    }, 100);
  });
});
