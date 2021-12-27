import React, { Component, useState } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네개를 겹치지않고 랜덤하게 뽑는 함수
    const candidate = [0,1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const choosen = candidate.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
        array.push(choosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!!');
            setTries((prevTries) => {
                return [...prevTries, {try:value, result : '홈런!'}]
            });
            alert('게임을 다시 시작합니당!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10번 넘게 틀렸잖아! 바보야ㅋㅋㅋㅋ 답은 ${answer.join(',')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => [...prevTries, {try : value, result : `${strike} 스트라이크, ${ball} 볼`}]);
                setValue('');
            } 
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
                <div>시도횟수 : {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 ::  `} tryInfo={v} index={i}/>
                        );
                    })}
                </ul>
            </form>
        </>
    );
}

// export const hello = 'hello'; // import {hello} : 다수개 가능
export default NumberBaseball; // import NumberBaseball : 단일개 가능