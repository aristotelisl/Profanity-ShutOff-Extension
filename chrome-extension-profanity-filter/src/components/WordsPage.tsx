import React, { useState, useEffect } from 'react';
import '../App.css';

const WordsPage: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');
  const [showUserWords, setShowUserWords] = useState(false); // State to toggle displaying user-added words
  const [censorshipEnabled, setCensorshipEnabled] = useState(true); // State for censorship switch

  useEffect(() => {
    // Fetch the list of censored words and censorship state from chrome.storage.sync
    chrome.storage.sync.get(['censoredWords', 'censorshipEnabled'], (result) => {
      setWords(result.censoredWords || []);
      setCensorshipEnabled(result.censorshipEnabled !== undefined ? result.censorshipEnabled : true);
    });
  }, []);

  const handleAddWord = () => {
    if (newWord.trim() === '' || words.includes(newWord.trim().toLowerCase())) return;
    const updatedWords = [...words, newWord.trim().toLowerCase()];
    setWords(updatedWords);
    setNewWord('');
    // Save the updated list of censored words to chrome.storage.sync
    chrome.storage.sync.set({ censoredWords: updatedWords });
  };

  const handleRemoveWord = (wordToRemove: string) => {
    const updatedWords = words.filter(word => word !== wordToRemove);
    setWords(updatedWords);
    // Save the updated list of censored words to chrome.storage.sync
    chrome.storage.sync.set({ censoredWords: updatedWords });
  };

  const toggleShowUserWords = () => {
    setShowUserWords(prev => !prev); // Toggle showUserWords state
  };

  const handleToggleCensorship = () => {
    setCensorshipEnabled(!censorshipEnabled);
    // Save the updated censorship state to chrome.storage.sync
    chrome.storage.sync.set({ censorshipEnabled: !censorshipEnabled });
    // Notify content script to apply or remove censorship based on the new state
    chrome.runtime.sendMessage({ action: 'toggleCensorship', state: !censorshipEnabled });
  };

  return (
    <div className="container">
      <h2>Censored Words</h2>
      <div className="add-word">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Add a new word"
        />
        <button onClick={handleAddWord}>Add</button>
      </div>
      <div className="censorship-switch">
        <label>
          Censorship Enabled
          <input
            type="checkbox"
            checked={censorshipEnabled}
            onChange={handleToggleCensorship}
          />
        </label>
      </div>
      <div className="user-words-card">
        <button onClick={toggleShowUserWords} className="show-user-words-btn">
          {showUserWords ? 'Hide User Words' : 'Show User Words'}
        </button>
        {showUserWords && (
          <div className="user-words">
            <h3>User-Added Words</h3>
            {words.length === 0 ? (
              <p>No user-added words yet.</p>
            ) : (
              <ul>
                {words.map((word, index) => (
                  <li key={index}>
                    {word}
                    <button onClick={() => handleRemoveWord(word)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsPage;
