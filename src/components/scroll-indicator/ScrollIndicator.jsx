import React, { useEffect, useState } from 'react';
import './scrollIndicator.css';

export const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorM, setErrorM] = useState('');

  async function fetchData(url) {
    try {
      setLoading(true);
    } catch (e) {
      setErrorM(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return <div className='container'>Scroll Indicator</div>;
};
