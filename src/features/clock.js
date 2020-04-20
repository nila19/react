import React, { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const incrementTime = () => setTime(new Date());
    const timer = setInterval(incrementTime, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div>
      <p>Time : {time.toLocaleTimeString()}</p>
    </div>
  );
};
