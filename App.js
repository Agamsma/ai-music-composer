import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('http://localhost:5000/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ message: 'Server error', music_url: '' });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🎶 AI Music Composer</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe a music style (e.g., sad piano, upbeat lo-fi)"
        style={{
          padding: '0.75rem',
          width: '300px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #888'
        }}
      />
      <button
        onClick={handleGenerate}
        style={{
          marginLeft: '1rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Generating...' : 'Generate Music'}
      </button>

      {response && (
        <div style={{ marginTop: '2rem' }}>
          <p><strong>{response.message}</strong></p>
          {response.music_url && (
            <audio controls src={response.music_url} style={{ marginTop: '1rem' }}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
