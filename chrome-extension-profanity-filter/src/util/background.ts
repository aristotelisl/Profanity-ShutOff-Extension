console.log('Background script loaded.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'testMessage') {
    console.log('Received message:', message);
  }
});