import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  // 숫자 네개를 겹치지않고 랜덤하게 뽑는 함수
  const candidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const choosen = candidate.splice(
      Math.floor(Math.random() * (10 - i)),
      1
    )[0];
    array.push(choosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "홈런!!",
          tries: [
            ...prevState.tries,
            { try: this.state.value, result: "홈런!" },
          ],
        };
      });
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀렸잖아! 바보야ㅋㅋㅋㅋ 답은 ${this.state.answer.join(
            ","
          )}였습니다!`,
        });
        alert("게임을 다시 시작합니다!");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: this.state.value,
                result: `${strike} 스트라이크, ${ball} 볼`,
              },
            ],
            value: "",
          };
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <div>시도횟수 : {this.state.tries.length}</div>
          <ul>
            {this.state.tries.map((v, i) => {
              return <Try key={`${i + 1}차 시도 ::  `} tryInfo={v} index={i} />;
            })}
          </ul>
        </form>
      </>
    );
  }
}

// export const hello = 'hello'; // import {hello} : 다수개 가능
export default NumberBaseball; // import NumberBaseball : 단일개 가능
