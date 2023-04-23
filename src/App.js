import React from 'react';
import { Routes, Route } from "react-router-dom";
import IntroView from './Components/IntroView';
import Board from "./Components/Game";
import PageNotFound from './Components/PageNotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroView />}></Route>
      <Route path="/game" element={<Board />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}