import * as UI from './ui';
import * as Query from './query';
import * as Board from './board';

/* 黒の手：評価を問い合わせて、盤面更新 */
const doBlackMove = (moves: number[], blackMove: number) => {
  const newMoves = moves.slice().concat([blackMove]);
  query.request(newMoves); // 評価値取得のみ
  ui.enqueue(newMoves, Board.createBoard(newMoves));
};

/* 白の手：評価を問い合わせて、盤面更新 */
const doWhiteMove = (moves: number[], whiteMove: number) => {
  const newMoves = moves.slice().concat([whiteMove]);
  query.request(newMoves); // 評価値取得のみ
  ui.enqueue(newMoves, Board.createBoard(newMoves));
};

/* UI 初期化（黒・白 両方を渡す） */
const ui = UI.init(doBlackMove, doWhiteMove);

/* AIから返ってくる「黒の合法手＋評価値」を受け取る */
const blackMovesListener = (
  moves: number[],
  blackMoves: [number, number][]
) => {
  if (blackMoves[0][0] < 0 && moves[moves.length - 1] < 0) {
    // double pass; game over
    ui.enqueue(moves, Board.createBoard(moves));
    const newMoves = moves.slice().concat([-1]);
    ui.enqueue(newMoves, Board.createBoard(newMoves));
  } else {
    // 評価値付き盤面を表示するだけ
    ui.enqueue(moves, Board.createBlackBoard(moves, blackMoves));
    // ★ ここで doBlackMove は絶対に呼ばない（AIを打たせない）
  }
};

/* 白の手を受け取るリスナー（AI連鎖なし） */
const whiteMoveListener = (moves: number[], whiteMove: number) => {
  const newMoves = moves.slice().concat([whiteMove]);
  ui.enqueue(newMoves, Board.createBoard(newMoves));
};

/* Query 初期化 */
const query = Query.init(blackMovesListener, whiteMoveListener);
