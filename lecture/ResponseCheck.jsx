import React, { Component, useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = (e) => {
        e.preventDefault();
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금이야!');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2-3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('저런저런 미세스 성급! 초록색일때 클릭하세욤');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세욥!');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            });
        }
    };

    const onReset = (e) => {
        setResult([]);
    };

    const renderAverage = (e) => {
        return result.length === 0 
            ? null 
            : <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {(() => {
                if (result.length === 0) {
                    return null;
                } else {
                    return <>
                        <div>평균 시간 : {result.reduce((a, c) => a + c)  / result.length}ms</div>
                        <button onClick={onReset}>리셋</button>
                    </>
                }
            }) ()}
            {renderAverage()}
        </>
    )
};

export default ResponseCheck;