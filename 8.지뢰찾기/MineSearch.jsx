import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const reducer = (state, action) => {};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default MineSearch;
