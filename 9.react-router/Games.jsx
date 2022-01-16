import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GameMatcher from "./GameMatcherClass";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Routes>
          {/* <Route path="/" element={<GameMatcher />} />
          <Route path="/game/:name" element={<GameMatcher />} /> */}
          <Route path="*" element={<GameMatcher />} />
          <Route path="/game/*" element={<GameMatcher />}>
            <Route path=":name" element={<GameMatcher />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Games;
