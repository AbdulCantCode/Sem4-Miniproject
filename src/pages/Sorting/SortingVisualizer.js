import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(100);

  // Generate random array
  const randomizeArray = () => {
    const newArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
  };

  // Initialize with random array
  useEffect(() => {
    randomizeArray();
  }, []);

  // Render bars
  const renderBars = () => {
    const maxBarHeight = Math.max(...array, 1);
    
    return array.map((value, index) => (
      <div 
        key={index}
        className="bar"
        style={{
          height: `${(value / maxBarHeight) * 100}%`,
          width: `${100 / array.length}%`,
          backgroundColor: getBarColor(value, maxBarHeight)
        }}
      />
    ));
  };

  // Get color gradient based on value
  const getBarColor = (value, max) => {
    const ratio = value / max;
    const hue = (1 - ratio) * 120; // Green (0) to Red (120)
    return `hsl(${hue}, 100%, 50%)`;
  };

  // Sorting algorithms
  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    }
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    }
    setIsSorting(false);
  };

  const handleSort = () => {
    switch(algorithm) {
      case 'bubble':
        bubbleSort();
        break;
      case 'selection':
        selectionSort();
        break;
      default:
        bubbleSort();
    }
  };

  return (
    <div className="sorting-container">
      <h2>Algorithm Visualizer</h2>
      
      <div className="controls">
        <button onClick={randomizeArray} disabled={isSorting}>
          Randomize Array
        </button>
        
        <select 
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          {/* Add more algorithms here */}
        </select>
        
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="10"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            disabled={isSorting}
          />
          <span>{510 - speed}ms</span>
        </div>
        
        <button onClick={handleSort} disabled={isSorting}>
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
      
      <div className="visualization">
        {renderBars()}
      </div>
      
      <div className="algorithm-info">
        <h3>{algorithm === 'bubble' ? 'Bubble Sort' : 'Selection Sort'}</h3>
        <p>
          {algorithm === 'bubble' 
            ? 'Repeatedly swaps adjacent elements if they are in the wrong order'
            : 'Finds the minimum element and swaps it with the first unsorted element'}
        </p>
      </div>
    </div>
  );
}