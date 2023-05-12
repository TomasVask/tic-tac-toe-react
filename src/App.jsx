import React from 'react';
import { Routes, Route } from "react-router-dom";
import IntroView from './Components/introview/IntroView';
import Game from "./Components/game/Game";
import PageNotFound from './Components/PageNotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroView />}></Route>
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
};

export default App;