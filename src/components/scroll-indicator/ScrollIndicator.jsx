import React, { useEffect, useState } from 'react';
import './scrollIndicator.css';

export const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorM, setErrorM] = useState('');
  const [scrollPct, setScrollPct] = useState(0);

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

  function handleScrollPct() {
    const scrolledAmount =
      document.body.scrollTop || document.documentElement.scrollTop;

    const totalScrollheight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPct(Math.round((scrolledAmount / totalScrollheight) * 100));
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPct);
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  if (errorM !== '') {
    return <div>{errorM}</div>;
  }
  if (loading) {
    return <div>Loading ! Please wait</div>;
  }
  return (
    <div className='container'>
      <div className='top-container'>
        <h1>Scrolled: {scrollPct}%</h1>
        <div className='progress-bar'>
          <div
            className='scrolled-progress-bar'
            style={{ width: `${scrollPct}%` }}
          ></div>
        </div>
      </div>

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
