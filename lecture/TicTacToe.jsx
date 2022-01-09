import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

// 정의하려던 state들을 나열
const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1 - 1],
};

// action명은 주로 대문자로 사용
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

// reducer안에서 state를 어떻게 바꿀지를 적어줌
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      // return state.winner = action.winner; // 이렇게 하면 안됨..
      return { ...state, winner: action.winner }; // ...state를 통해 객체를 얕은 복사 후 변경함
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // 불변성을 유지하기위해 객체를 얕은 복사 하는데.. immer라는 라이브러리로 가독성을 해결할 수 있음
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1 - 1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  // state가 많아지면 관리가 힘든데 useReducer를 사용해서 한개의 state로 정리가능..
  //redux의개념을 react가 도입하며 만들어진 개념 :useReducer
  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("O");
  // const [tableData, setTableData] = useState([
  //   ["", "", ""],
  //   ["", "", ""],
  //   ["", "", ""],
  // ]);

  // reducer, initialState, 지연초기화(거의사용안함)
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  const onClickTable = useCallback(() => {
    // 해당 action을 해석해서 state를 바꿔주는 역할을 하는것 : reducer
    // dispatch 실행때마다 상단에 정의한 reducer가 실행됨..
    dispatch({ type: SET_WINNER, winner: "" });
  }, []);

  // state가 비동기로 변할때 처리할 경우 무조건 useEffect를 사용한다고 봐라? 7-4강 초반부 다시 확인
  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    // 가로
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    // 세로
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    // 대각선
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    //역대각선
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }

    if (win) {
      // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all = ture : 무승부
      tableData.forEach((row) => {
        // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });

        if (all) {
          dispatch({ type: RESET_GAME });
        } else {
          dispatch({ type: CHANGE_TURN });
        }
      });
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacToe;
