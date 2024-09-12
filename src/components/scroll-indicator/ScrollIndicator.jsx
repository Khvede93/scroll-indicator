import React, { useEffect, useState } from 'react';
import './scrollIndicator.css';

export const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorM, setErrorM] = useState('');

  async function fetchData(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error ! Error code: ${response.status}`);
      }
      const data = await response.json();
      if (!data || !data.products || !data.products.length) {
        throw new Error(`No Products to show`);
      }
      setData(data.products);
    } catch (e) {
      setErrorM(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  if (errorM !== '') {
    return <div>{errorM}</div>;
  }
  if (loading) {
    return <div>Loading ! Please wait</div>;
  }
  return (
    <div className='container'>
      <h1>Custom Scroll Indicator</h1>
      <div className='data-container'>
        {data && data.length
          ? data.map((item) => (
              <div key={item.id}>
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
