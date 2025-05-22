'use client'
import { useState } from "react"
import CrosswordGridSquareInfo from "@/app/src/crossword-grid-square-info";

export default function CrosswordGridSquare({info, tallyAnswers}: {info: CrosswordGridSquareInfo, tallyAnswers: Function}) {
  const [userInput, setUserInput] = useState('');
  const [currInputCorrect, setCurrInputCorrect] = useState(false);
  const [newOrientation, setNewOrientation] = useState(false);

  const verifyAnswer = function(input: string) {
    setUserInput(input);
    if (input.length === 0) {
      return;
    }

    if (info.answer.toUpperCase() === input.toUpperCase()) {
      if (currInputCorrect) {
        tallyAnswers(0, info.id, info.orientation, newOrientation);
      }
      else {
        setCurrInputCorrect(true);
        tallyAnswers(1, info.id, info.orientation, newOrientation);
      }
    }
    else {
      if (currInputCorrect) {
        setCurrInputCorrect(false);
        tallyAnswers(-1, info.id, info.orientation, newOrientation);
      }
      else {
        tallyAnswers(0, info.id, info.orientation, newOrientation);
      }
    }
    setNewOrientation(false);
  }

  let answerInput = <></>;
  if (info.answer) {
    answerInput =(
      <input id={'gridSquare-' + info.id}
              type="text"
              className="w-[1.75rem] h-[1.75rem] text-black text-center"
              value={userInput}
              onChange={(e) => {
                verifyAnswer(e.target.value.toUpperCase());
              }}
              onClick={(e) => setNewOrientation(true)}
              size={1}
              maxLength={1}/>
    );
  }

  return (
    <td className="p-0 bg-black text-white">
      {answerInput}
      {info.label}
    </td>
  );
}