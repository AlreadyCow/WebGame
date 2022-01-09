import React, {Component } from 'react';

// 클래스의 경우
// constructor -> render -> ref -> componentDidMount 
// -> (setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate 
// 부모가 나를 없앴을 때 -> componentWilUnMount -> 소멸
const rspCoords = {
    rock : '0',
    scissor : '-142px',
    paper : '-284px',
};

const scores = {
    scissor : 1,
    rock : 0,
    paper : -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result : '',
        score : 0,
        imgCoord : rspCoords.rock,
    };

    interval;
    componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 함
        this.interval = setInterval(this.changeHand, 100);
    };

    componentDidUpdate() { // 리렌더링 후

    };

    componentWillUnmount() { // 컴포넌트가 제거되기 직전, 여기에 비동기 요청정리를 많이 함
        clearInterval(this.interval);
    };

    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.rock) {
            this.setState({
                imgCoord : rspCoords.scissor,
            });
        } else if (imgCoord === rspCoords.scissor) {
            this.setState({
                imgCoord : rspCoords.paper,
            });
        } else if (imgCoord === rspCoords.paper) {
            this.setState({
                imgCoord : rspCoords.rock,
            });
        }
    };

    onClickBtn = (choice) => (e) => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) { // 비김
            this.setState({
                result : '비겼슈',
            });
        } else if ([-1, 2].includes(diff)) { // 이김
            this.setState((prevState) => {
                return {
                    result : '이겼슈',
                    score : prevState.score + 1,
                };
            });
        } else { // 짐
            this.setState((prevState) => {
                return {
                    result : '졌슈',
                    score : prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    render() {
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}

export default RSP;