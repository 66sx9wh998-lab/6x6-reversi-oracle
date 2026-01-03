import * as UI from './ui';
import * as Query from './query';
import * as Board from './board';

/* 黒の手 */
const doBlackMove = (moves: number[], blackMove: number) => {
  const newMoves = moves.slice().concat([blackMove]);
  query.request(newMoves);
  ui.enqueue(newMoves, Board.createBoard(newMoves));
};

/* 白の手 */
const doWhiteMove = (moves: number[], whiteMove: number) => {
  const newMoves = moves.slice().concat([whiteMove]);
  query.request(newMoves);
  ui.enqueue(newMoves, Board.createBoard(newMoves));
};

/* UI 初期化 */
const ui = UI.init(doBlackMove, doWhiteMove);

/* AI評価値を受け取る */
const blackMovesListener = (
  moves: number[],
  blackMoves: [number, number][]
) => {
  const valuesArray: (number | null)[] = Array(36).fill(null);

  blackMoves.forEach(([move, value]) => {
    if (move >= 0) {
      valuesArray[move] = value;
    }
  });

  ui.updateValues(valuesArray);
  ui.enqueue(moves, Board.createBlackBoard(moves, blackMoves));
};

/* 白の手（連鎖なし） */
const whiteMoveListener = (moves: number[], whiteMove: number) => {
  const newMoves = moves.slice().concat([whiteMove]);
  ui.enqueue(newMoves, Board.createBoard(newMoves));
};

/* Query 初期化 */
const query = Query.init(blackMovesListener, whiteMoveLis

