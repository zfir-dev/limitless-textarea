document.addEventListener('DOMContentLoaded', () => {
  const maxLengthInput = document.getElementById('maxLength');
  const saveButton = document.getElementById('save');

  // Load the saved custom max length; default is 0 (no limit)
  chrome.storage.sync.get({ customMaxLength: 0 }, (data) => {
    maxLengthInput.value = data.customMaxLength;
  });

  saveButton.addEventListener('click', () => {
    const newMax = parseInt(maxLengthInput.value, 10) || 0;
    chrome.storage.sync.set({ customMaxLength: newMax }, () => {
      console.log('Custom max length saved as:', newMax);
      // Optionally, show a notification using UIkit's notification component:
      UIkit.notification({ message: 'Custom max length saved!', status: 'success', pos: 'top-center' });
    });
  });
});
