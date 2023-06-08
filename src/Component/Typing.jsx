import React from 'react'
import { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
const NUM_OF_WORDS = 500;
const SECONDS = 300;

function Typing() {
    const [words, setWords] = useState([]);
    const [countDown, setCountDown] = useState(SECONDS);
    const [currentInput, setCurrentInput] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(-1);
    const [currentChar, setCurrentChar] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [status, setStatus] = useState("waiting");
    const inputRef = useRef(null);
    
    const token = useSelector((state) => {return state.userDetails.token});
    const navigate = useNavigate();
  
    useEffect(() => {
      setWords(generateWords());
    }, []);
  
    useEffect(() => {
      inputRef.current.focus();
    },[status])

    if(!token){
      navigate('/login')
    }
  
    function generateWords() {
      return new Array(NUM_OF_WORDS).fill(null).map(() => randomWords());
    }
  
    function start() {
      
      if(status === 'finished'){
        setWords(generateWords());
        setCurrentWordIndex(0)
        setCorrect(0)
        setIncorrect(0)
        setCurrCharIndex(-1)
        setCurrentChar('')
      }
  
  
      if(status !== 'started'){
        setStatus('started')
        const interval = setInterval(() => {
          setCountDown((pre) => {
            if (pre === 0) {
              clearInterval(interval);
              setStatus('finished');
              setCurrentInput('')
              return SECONDS;
            }else {
              return pre - 1;
            }
          });
        }, 1000);
      }
    }
  
    const handleKeyDown = ({ keyCode, key }) => {
      if (keyCode === 32) {
        checkMatch();
        setCurrentInput("");
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrCharIndex(-1);
      }else if(keyCode === 8){
        setCurrCharIndex(currCharIndex - 1);
        setCurrentChar('')
      } 
      else{
        setCurrCharIndex(currCharIndex + 1);
        setCurrentChar(key)
      }
    };
  
    function checkMatch() {
      const wordToCompare = words[currentWordIndex];
      const doesWordMatch = wordToCompare === currentInput.trim();
      if (doesWordMatch) {
        setCorrect(correct + 1);
      } else {
        setIncorrect(incorrect + 1);
      }
    }

    const selectBox = {
      padding:'5px 10px 5px 10px',
      display:'inline',
      marginLeft:'70px',
      border:'none',
      fontSize:'17px',
      borderRadius:'10px'
    }
  
  
    function getCharClass(wordIdx , charIdx, char){
      if(wordIdx === currentWordIndex && charIdx === currCharIndex && currentChar && status !== 'finished'){
        if(char === currentChar){
          return 'has-background-success';
        }else{
          return 'has-background-danger';
        }
      }
      else if(wordIdx === currentWordIndex && currCharIndex >= words[currentWordIndex].length){
        return 'has-background-danger';
      }else{
        return ''
      }
    }
  
    return (
      <div className="App">
        <h1 className="is-size-2 has-text-centered">Touch Typing</h1>
        <select className='section has-text-centered' style={selectBox} onChange={(e) => setCountDown(e.target.value)} name="selected_time" id="">
          <option className='m-2' value="60">1 min</option>
          <option className='m-2' value="120">2 min</option>
          <option className='m-2' value="300">5 min</option>
          <option className='m-2' value="600">10 min</option>
        </select>
        <div className="section">
          <div className="is-size-1 has-text-centered has-text-primary">
            <h2>{countDown}</h2>
          </div>
        </div>
        <div className="control is-expended section">
          <input
            type="text"
            disabled={status !== "started"}
            onKeyDown={handleKeyDown}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="input"
            ref={inputRef}
            autoFocus
          />
        </div>
        <div className="section">
          <button disabled={!token} onClick={start} className="button is-info is-fullwidth">
            Start
          </button>
        </div>
        {status === "started" && (
          <div className="section ">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  {words.map((word, i) => (
                    <span key={i}>
                      <span>
                        {word.split("").map((char, idx) => (
                          <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                        ))}
                      </span>
                      <span> </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
  
        {status === 'finished' && (
          <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words Per Minute: </p>
              <p className="has-text-primary is-size-1">{correct}</p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              <p className="has-text-infi is-size-1">
                {correct > 0 || incorrect > 0
                  ? Math.round((correct / (correct + incorrect)) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
        )}
      </div>
    );
}

export default Typing