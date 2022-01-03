import React, { Component, useState, useRef, useEffect, useMemo } from "react";
import Ball from "./Ball";

function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // 복잡한 함수 결과값을 기억함 - 성능 문제 해결에 도움
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setwinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]); // 일반 값을 기억함

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setwinBalls((prevState) => [...prevState, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  // 2번째 인자, 빈 배열이면 componentDidMount와 동일한 역할
  // 2번째 인자, 배열에 요소가 있으면 componentDidMount랑 componentDidupdate 둘 다 수행

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers()); // 당첨 숫자들
    setwinBalls([]);
    setBonus(null); // 보너스공
    setRedo(false);
    timeouts.current = [];
  };

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
