import { useState } from 'react';
import './App.css';
import { ScrollIndicator } from './components/scroll-indicator/ScrollIndicator';

function App() {
  const dataUrl = 'https://dummyjson.com/products?limit=100';
  return (
    <div className='app'>
      <ScrollIndicator url={dataUrl} />
    </div>
  );
}

export default App;
