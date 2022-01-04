import React, {
  Component,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

// Hooks사용시 순서 매우 중요 (조건문 내에는 절대 사용 불가. 함수, 반복문 내에는 사용 권장하지 않음)
// Hooks는 무조건 최상위! 라고 생각하기(순서가 확실한 경우에만 내부에서 선언가능(ex>useStae등..))
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
  // 두번째 요소가 바뀌기전까지는 이전값을 기억 (useMemo : 두번째 인자가 바뀌기 전까지 리턴값을 기억)
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // 복잡한 함수 결과값을 기억함 - 성능 문제 해결에 도움
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setwinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]); // 일반 값을 기억함

  // useEffect(() => {
  //     // ajax : 실행하고싶은 소스를 작성
  // }, [바뀌는값]); // compenentDidMount > componentDidUpdate 순서로 사용

  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //     // ajax : componentDidUpdate 실행하고싶은 소스를 작성
  //   }
  // }, [바뀌는값]); // componentDidUpdate만 사용, compenentDidMount는 X

  useEffect(() => {
    // 두번째 인자가 바뀔때 내부를 실행함.
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

  // Hooks는 함수 생성이 매번 이루어지지만.. useCallback을 이용하면 해당 함수를 새로 생성하지 않고, 기억하고있는 함수를 반환
  // useCallback사용시 이용되는 state는 반드시 useCallback의 두번째인자에 넣어주어야 변경된 값을 기억함(안쓰면 첫번째 값을 계속 기억함..)
  // 자식 컴포넌트에 props로 함수를 전달할 때는 필수로 useCallback 사용해야함!!!
  // useCallback : 두번째인자가 바뀔때까지 함수를 기억
  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers()); // 당첨 숫자들
    setwinBalls([]);
    setBonus(null); // 보너스공
    setRedo(false);
    timeouts.current = [];
  }, []);

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
