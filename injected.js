(function() {
  console.log('Injected script loaded: Removing maxlength for all textarea elements');

  // Remove maxlength attribute from any existing textarea elements
  document.querySelectorAll('textarea').forEach(el => {
    el.removeAttribute('maxlength');
  });

  // Override Element.prototype.setAttribute for textarea elements
  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    if (name.toLowerCase() === 'maxlength' && this.tagName.toLowerCase() === 'textarea') {
      return; // Block setting maxlength on textarea elements
    }
    return originalSetAttribute.call(this, name, value);
  };

  // Override the maxLength property on HTMLTextAreaElement
  const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'maxLength');
  Object.defineProperty(HTMLTextAreaElement.prototype, 'maxLength', {
    set: function(value) {
      if (this.tagName.toLowerCase() === 'textarea') {
        return; // Block setting a value for textarea elements
      }
      originalDescriptor.set.call(this, value);
    },
    get: function() {
      if (this.tagName.toLowerCase() === 'textarea') {
        return -1; // Indicates no limit
      }
      return originalDescriptor.get.call(this);
    }
  });
})();
