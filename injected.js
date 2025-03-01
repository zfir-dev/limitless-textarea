console.log('ZAFIR injected script loaded');

// Override Element.prototype.setAttribute
const originalSetAttribute = Element.prototype.setAttribute;
Element.prototype.setAttribute = function(name, value) {
  if (name.toLowerCase() === 'maxlength' &&
      this.classList && this.classList.contains('slds-textarea')) {
    return; // Block setting maxlength on elements with slds-textarea
  }
  return originalSetAttribute.call(this, name, value);
};

// Override the maxLength property on HTMLTextAreaElement
const originalDescriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'maxLength');
Object.defineProperty(HTMLTextAreaElement.prototype, 'maxLength', {
  set: function(value) {
    if (this.classList.contains('slds-textarea')) {
      return; // Do nothing if it's an slds-textarea
    }
    originalDescriptor.set.call(this, value);
  },
  get: function() {
    if (this.classList.contains('slds-textarea')) {
      return -1; // Indicates no limit
    }
    return originalDescriptor.get.call(this);
  }
});
