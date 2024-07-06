function censorWordsInTextNode(textNode: Node, wordsSet: Set<string>): void {
  const originalText = textNode.nodeValue;

  if (originalText) {
    const censoredText = originalText.replace(/\b\w+\b/g, (match) => {
      return wordsSet.has(match.toLowerCase()) ? '*'.repeat(match.length) : match;
    });

    if (censoredText !== originalText) {
      textNode.nodeValue = censoredText;
    }
  }
}

function censorWordsInDocument(wordsSet: Set<string>): void {
  const textNodes: Node[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => censorWordsInTextNode(node, wordsSet));
}

function fetchAndCensorWords(): void {
  chrome.storage.sync.get(['censorshipEnabled', 'censoredWords'], (result) => {
    if (!result.censorshipEnabled) {
      console.log('Censorship is disabled');
      return;
    }

    const userWords = result.censoredWords || [];
    const wordsSet = new Set<string>(userWords.map((word: string) => word.toLowerCase()));

    fetch(chrome.runtime.getURL('bad_words_list.txt'))
      .then(response => response.text())
      .then(text => {
        const badWords = text.split('\n').map(word => word.trim().toLowerCase()).filter(Boolean);
        badWords.forEach(word => wordsSet.add(word));
        censorWordsInDocument(wordsSet);
      })
      .catch(error => console.error('Failed to fetch bad words list:', error));
  });
}

// Use DOMContentLoaded to ensure the DOM is fully loaded before applying censorship
document.addEventListener('DOMContentLoaded', fetchAndCensorWords);

// Listen for messages from the background script to reapply censorship
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'applyCensor' || request.action === 'toggleCensorship') {
    fetchAndCensorWords();
  }
});
