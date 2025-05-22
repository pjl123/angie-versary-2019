export default class CrosswordGridSquareInfo {
    label: string;
    answer: string;
    orientation: string;
    id: number;
  
    constructor(label: string, answer: string, orientation: string, id: number) {
      this.label = label;
      this.answer = answer;
      this.orientation = orientation;
      this.id = id;
    }
}