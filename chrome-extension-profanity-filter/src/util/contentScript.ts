const censorWords = (words: string[]) => {
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
  
    textNodes.forEach(node => {
      const originalText = node.nodeValue;
      if (originalText) {
        const censoredText = words.reduce((text, word) => {
          const regex = new RegExp(`\\b${word}\\b`, 'gi');
          return text.replace(regex, '*'.repeat(word.length));
        }, originalText);
        node.nodeValue = censoredText;
      }
    });
  };
  
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'applyCensor' && request.words) {
      censorWords(request.words);
    }
  });