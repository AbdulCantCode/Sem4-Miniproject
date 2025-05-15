import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Buddy.css';

export default function Buddy() {
  const [emoji, setEmoji] = useState('🐶');
  const location = useLocation();

  // Auto-activate when not on homepage
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(location.pathname !== '/');
  }, [location]);

  return (
    <div className={`buddy ${isActive ? 'active' : ''}`}>
      <div className="buddy-emoji">{emoji}</div>
      <select 
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        className="emoji-selector"
      >
        <option value="🐶">Dog</option>
        <option value="🐱">Cat</option>
        <option value="🐉">Dragon</option>
      </select>
    </div>
  );
}