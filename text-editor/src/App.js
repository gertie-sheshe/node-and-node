import React from 'react';
import './App.css';
import MyEditor from './components/Editor';

function App() {
  return (
    <div>
      <p>My React Editor</p>
      <div className="myeditor">
        <MyEditor />
      </div>
    </div>
  );
}

export default App;
