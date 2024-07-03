chrome.runtime.onInstalled.addListener(() => {
    // On installation, ensure storage has default values
    chrome.storage.sync.set({ censorEnabled: false, censorWords: [] });
  });
  
  // Listen for messages from the options page or popup
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'toggleCensor') {
      const { enabled, words } = request;
      chrome.storage.sync.set({ censorEnabled: enabled });
  
      if (enabled) {
        // Apply censoring on all tabs
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            chrome.scripting.executeScript({
              target: { tabId: tab.id! },
              files: ['contentScript.js']
            }, () => {
              chrome.tabs.sendMessage(tab.id!, { action: 'applyCensor', words });
            });
          });
        });
      }
    }
  });