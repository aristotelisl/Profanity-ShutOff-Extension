import React, { useState, useEffect } from 'react';

const WordsPage: React.FC = () => {
  const [newWord, setNewWord] = useState('');
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    // Load words from Chrome storage when the component mounts
    chrome.storage.sync.get(['censoredWords'], (result) => {
      if (result.censoredWords) {
        setWords(result.censoredWords);
      }
    });
  }, []);

  const handleAddWord = () => {
    if (newWord && !words.includes(newWord)) {
      const updatedWords = [...words, newWord];
      setWords(updatedWords);
      chrome.storage.sync.set({ censoredWords: updatedWords });
      setNewWord('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWord(e.target.value);
  };

  return (
    <div>
      <h2>Manage Censored Words</h2>
      <input type="text" value={newWord} onChange={handleInputChange} />
      <button onClick={handleAddWord}>Add Word</button>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordsPage;