import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleTopicClick = (topic) => {
    navigate(`/topic/${encodeURIComponent(topic)}`);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Which topic do you want to learn?</h1>
        <img
          src="https://wallpapers.com/images/hd/kawaii-dog-900-x-995-wallpaper-eiy14xo8f4isp6ja.jpg"
          alt="Study Buddy"
          className="study-buddy-icon"
        />
      </div>
      <div className="topics">
        <button onClick={() => handleTopicClick("Sorting Algorithms")}>
          Sorting Algorithms
        </button>
        <button onClick={() => handleTopicClick("Shortest Path Algorithms")}>
          Shortest Path Algorithms
        </button>
        <button onClick={() => handleTopicClick("Stacks and Queues")}>
          Stacks & Queues
        </button>
      </div>
    </div>
  );
}
