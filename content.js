chrome.storage.local.get(['extensionEnabled'], function(result) {
  if (result.extensionEnabled === false) {
    console.log('Limitless Textarea extension is disabled.');
    return;
  }

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js');
  (document.head || document.documentElement).appendChild(script);
  script.onload = function() {
    script.remove();
  };
});
