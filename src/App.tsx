import React from 'react';
import logo from './logo.svg';
import './App.css';
import Synth from './synth/Synth';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Routes
} from "react-router-dom";
import Manual from './manual/Manual';


function App() {
  return (
    
      <div className="">
        {/* <div className="m-2">
          <p className='font-semibold'>INF 190 - Progress Report (Akshay Kshipra)</p>
          <p>This project is a web-based digital synthesizer consisting of multiple components with routing functionality</p> 
          <p className='font-semibold mt-2'>Current Progress</p> 
          <p>I will discuss the progress going from top to bottom.</p>
          <p>
            Currently there is an oscillator with the ability to set the waveform, adjust gain, and modify its octave. 
          </p>
          <p>
            To the right of this is the Reverb for the oscillator. This is the most recent addition so work is still needed there. 
            When enabled, the impulse response is simply randomized impulse repsonse that lasts for 2 seconds.  
          </p>
          <p>
            Below that is the ADSR for the Oscillator. Enabling it will allow you to adjust the ADSR and you are able to see how the envelope changes.
          </p>
          <p>
            Under the ADSR is the piano. The user is able to play notes by pressing keys on their computer keyboard. The piano keyboard
            will indicate which keys are currently being played.
          </p>
          <p>Below the ADSR is the Frequency Graph where you can see visuals of what is being played.</p>
          <p>Below the Frequency Graph is the Oscilloscope where you can see another set of visuals.</p>
          <p className='font-semibold mt-2'>Future Goals</p> 
          <p>
            The biggest hurdle right now is funding an easy way to manage the routing of different components.
            My next task is to create filters for the Oscillator. In the future I hope to be able to get to modulation,
            so being able to get this dynamic routing working will be a goal of mine. I also hope to get distortion working,
            but since this project is so modular, i will do as much as time allows. 
          </p>
          <p>
            I also have spent no time into the design of the UI, so some time will be spent on that, but near the end of the project.
          </p>
        </div> */}
        
        <div className='flex'>
          <div className='p-2'>
            <a href='https://github.com/akins1/web-daw' target="_blank" className='font-semibold text-blue-600 hover:underline'>
              Github
            </a>
          </div>
          <div className='p-2'>
            <a href='/' className='font-semibold text-blue-600 hover:underline'>
              Synth
            </a>
          </div>
          <div className='p-2'>
            <a href='/manual' className='font-semibold text-blue-600 hover:underline'>
              Manual
            </a>
          </div>
          <div className='p-2'>
            <a className='font-semibold text-black-600 cursor-normal'>
              INF 190 - Akshay Kshipra
            </a>
          </div>
        </div>
        <Router>
          <Routes >
            
              <Route path='/' element={<Synth />}>
                
              </Route>
              <Route path='/manual' element={<Manual />}>
              </Route>
            
          </Routes>
        </Router>
      </div>
    
  );
}

export default App;
