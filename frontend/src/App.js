import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Realiza la solicitud HTTP al backend
    axios.get('/api/message', { withCredentials: true })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the message!', error);
      });

    // Cargar los scripts de Karve
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript('/karve/custom/custom-events.js')
      .then(() => loadScript('/karve/js/iframe-comunication-parent.js'))
      .catch(error => console.error('Error loading Karve scripts:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
        <div style={{ position: 'relative', top: 0, left: 0 }}>
          <iframe
            id="karve-iframe"
            width="100%"
            height="500px"
            frameBorder="0"
            scrolling="no"
            src="/karve/views/home.php"
            data-src="/karve/views/home.php"
            data-src-loading="/karve/views/loading.php"
            onLoad={(e) => {
              const iframe = e.target;
              const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

              // Reemplazar URLs dentro del iframe
              const scripts = iframeDoc.getElementsByTagName('script');
              for (let script of scripts) {
                script.src = script.src.replace('https://iframes.karveinformatica.com/AinacarIframe', 'http://localhost/karve');
              }

              const links = iframeDoc.getElementsByTagName('link');
              for (let link of links) {
                link.href = link.href.replace('https://iframes.karveinformatica.com/AinacarIframe', 'http://localhost/karve');
              }
            }}
          ></iframe>
        </div>
      </header>
    </div>
  );
}

export default App;
