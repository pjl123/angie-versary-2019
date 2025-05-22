export default class CrosswordQuestion {
  orientation: string;
  startCoordinateX: number;
  startCoordinateY: number;
  question: string;
  answerKey: string;
  id: number

  constructor(orientation: string, startCoordinateX: number, startCoordinateY: number, question: string, answerKey: string, id: number) {
    this.orientation = orientation;
    this.startCoordinateX = startCoordinateX;
    this.startCoordinateY = startCoordinateY;
    this.question = question;
    this.answerKey = answerKey;
    this.id = id;
  }
}