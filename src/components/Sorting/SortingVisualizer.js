import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SortingVisualizer.css';

export default function SortingVisualizer() {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Algorithm Data
  const algorithmData = {
    bubble: {
      name: "Bubble Sort",
      pseudoCode: `function bubbleSort(array) {
  let n = array.length;
  let swapped;
  
  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      if (array[i-1] > array[i]) {
        [array[i-1], array[i]] = [array[i], array[i-1]];
        swapped = true;
      }
    }
    n--;
  } while (swapped);
}`,
      description: "Bubble Sort works by repeatedly swapping adjacent elements if they're in the wrong order.",
      useCases: [
        "🛒 E-commerce price filters",
        "🎮 Game leaderboards"
      ]
    },
    quick: {
      name: "Quick Sort",
      pseudoCode: `function quickSort(array, left, right) {
  if (left < right) {
    const pivotIndex = partition(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }
}`,
      description: "Quick Sort is a 'divide and conquer' algorithm that picks a 'pivot' element.",
      useCases: [
        "💻 Programming language built-ins",
        "🔍 Database indexing"
      ]
    },
    insertion: {
      name: "Insertion Sort",
      pseudoCode: `function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
}`,
      description: "Insertion Sort builds the final sorted array one item at a time.",
      useCases: [
        "📱 Mobile apps",
        "📊 Live data streams"
      ]
    },
    selection: {
      name: "Selection Sort",
      pseudoCode: `function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
}`,
      description: "Selection Sort repeatedly finds the minimum element and puts it at the beginning.",
      useCases: [
        "🔌 Embedded systems",
        "💾 Flash memory"
      ]
    }
  };

  // Initialize array
  useEffect(() => {
    randomizeArray();
  }, []);

  const randomizeArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(newArray);
    setSortedIndices([]);
  };

  const selectAlgorithm = (algorithm) => {
    if (isSorting) return;
    setSelectedAlgorithm(algorithm);
  };

  const updateAlgorithmInfo = () => {
    if (!selectedAlgorithm) return;
    return (
      <div className="info-card">
        <h2>{algorithmData[selectedAlgorithm].name}</h2>
        <p>{algorithmData[selectedAlgorithm].description}</p>
        
        <h3>📌 Real-World Uses</h3>
        {algorithmData[selectedAlgorithm].useCases.map((useCase, index) => (
          <div key={index} className="use-case">{useCase}</div>
        ))}
        
        <h3>👨‍💻 How It Works</h3>
        <div className="pseudo-code">{algorithmData[selectedAlgorithm].pseudoCode}</div>
      </div>
    );
  };

  // Sorting algorithms
  const bubbleSort = async () => {
    let n = array.length;
    let swapped;
    let tempArray = [...array];
    
    do {
      swapped = false;
      for (let i = 1; i < n; i++) {
        setHighlightIndices([i-1, i]);
        await sleep(300);
        
        if (tempArray[i-1] > tempArray[i]) {
          [tempArray[i-1], tempArray[i]] = [tempArray[i], tempArray[i-1]];
          swapped = true;
          setArray([...tempArray]);
          await sleep(300);
        }
      }
      n--;
      setSortedIndices(prev => [...prev, n]);
    } while (swapped);
  };

  // Other sorting algorithms would be implemented similarly...

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const visualizeSort = async () => {
    if (isSorting || !selectedAlgorithm) return;
    setIsSorting(true);
    
    switch(selectedAlgorithm) {
      case "bubble": await bubbleSort(); break;
      // Implement other cases similarly
      default: break;
    }
    
    setIsSorting(false);
  };

  return (
    <div className="sorting-visualizer-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to App
      </button>
      
      <h1>Sorting Algorithm Visualizer</h1>
      
      <div className="algorithm-options">
        <button 
          className={`btn ${selectedAlgorithm === 'bubble' ? 'active' : ''}`}
          onClick={() => selectAlgorithm('bubble')}
          disabled={isSorting}
        >
          Bubble Sort
        </button>
        <button 
          className={`btn ${selectedAlgorithm === 'quick' ? 'active' : ''}`}
          onClick={() => selectAlgorithm('quick')}
          disabled={isSorting}
        >
          Quick Sort
        </button>
        <button 
          className={`btn ${selectedAlgorithm === 'insertion' ? 'active' : ''}`}
          onClick={() => selectAlgorithm('insertion')}
          disabled={isSorting}
        >
          Insertion Sort
        </button>
        <button 
          className={`btn ${selectedAlgorithm === 'selection' ? 'active' : ''}`}
          onClick={() => selectAlgorithm('selection')}
          disabled={isSorting}
        >
          Selection Sort
        </button>
      </div>
      
      <div className="container">
        <div>
          <div className="visualization">
            {array.map((value, index) => {
              const isComparing = highlightIndices.includes(index);
              const isSorted = sortedIndices.includes(index);
              let barClass = "bar";
              if (isComparing) barClass += " comparing";
              if (isSorted) barClass += " sorted";
              
              return (
                <div 
                  key={index}
                  className={barClass}
                  style={{ height: `${value}%` }}
                />
              );
            })}
          </div>
          
          <div className="controls">
            <button 
              className="btn primary"
              onClick={randomizeArray}
              disabled={isSorting}
            >
              🎲 Randomize Array
            </button>
            <button 
              className="btn primary"
              onClick={visualizeSort}
              disabled={isSorting || !selectedAlgorithm}
            >
              ▶️ Visualize
            </button>
          </div>
        </div>
        
        {selectedAlgorithm && updateAlgorithmInfo()}
      </div>
    </div>
  );
}