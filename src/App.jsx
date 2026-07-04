import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import './LoveLetter.css'
import './BookCanvas.css'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import LoveLetter from './pages/LoveLetter'
import Test from './pages/Test'
import OpeningAnimation from './components/OpeningAnimation'
import birthdayMusic from './music/Mystery of Love - Sufjan Stevens subtitulado al español - itspandasfirst (128k).mp3'

const App = () => {

  const MyRoute = createHashRouter(createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='love-Letter' element={<LoveLetter />}></Route>
        <Route path='test' element={<Test />}></Route>
      </Route>
    </Route>
  ))


  // ------------------Cake loader 
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false); // New state for animation
  const [transitionReady, setTransitionReady] = useState(false);
  const [started, setStarted] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    if (!started) return;

    const timers = [];

    const handlePageLoad = () => {
      timers.push(setTimeout(() => setTransitionReady(true), 7800));
      timers.push(setTimeout(() => setShowContent(true), 8000));
      timers.push(setTimeout(() => setAnimateOut(true), 8400));
      timers.push(setTimeout(() => setLoading(false), 9800));
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", handlePageLoad);
    };
  }, [started]);

  useEffect(() => {
    const audio = new Audio(birthdayMusic);
    audio.loop = true;
    audio.preload = 'auto';
    musicRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleStartExperience = async () => {
    try {
      await musicRef.current?.play();
    } catch (error) {
      console.warn('Music playback could not start:', error);
    }

    setStarted(true);
  };

  if (!started) {
    return (
      <div className="app-shell">
        <div className="start-screen">
          <button className="start-screen__button" onClick={handleStartExperience}>
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-content">
        {
          loading && <OpeningAnimation animateOut={animateOut} transitionReady={transitionReady}/>
        }
        {
          showContent && <RouterProvider router={MyRoute} />
        }
      </div>
    </div>
  )
}

export default App
