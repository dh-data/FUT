import { useState, useEffect, useRef } from 'react';

const useTypewriter = (text: string, role: string, speed: number = 20) => {
  const [displayText, setDisplayText] = useState('');
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (role === 'assistant') {
      let index = 0;
      timerRef.current = setInterval(() => {
        setDisplayText(text.slice(0, index));
        index++;
        if (index > text.length) {
          clearInterval(timerRef.current!);
        }
      }, speed);
    } else {
      setDisplayText(text);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, role, speed]);

  return displayText;
};

export default useTypewriter; 