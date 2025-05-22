'use client'

import Link from "next/link";
import { useState, useEffect } from "react"
import CrosswordQuestion from "@/app/src/crossword-question";
import CrosswordGridSquareInfo from "@/app/src/crossword-grid-square-info";
import CrosswordGridSquare from "./crossword-grid-square";

export default function CrosswordGrid() {
  const height: number = 22;
  const width: number = 32;
  const [currentTally, setCurrentTally] = useState(0);
  const [nextInputOrientation, setNextInputOrientation] = useState('vertical');
  const [gridRows, setGridRows] = useState<CrosswordGridSquareInfo[][]>([]);
  const [totalCorrectLetters, setTotalCorrectLetters] = useState(0);
  const [acrossQuestions, setAcrossQuestions] = useState<CrosswordQuestion[]>([]);
  const [downQuestions, setDownQuestions] = useState<CrosswordQuestion[]>([]);
  const [complete, setComplete] = useState(false);

  useEffect(function _init() {
    const grid = new Array<CrosswordGridSquareInfo>(height * width).fill(new CrosswordGridSquareInfo('', '', '', -1));
    let totalCorrectLetters = 0;
    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      let currPosition = entry.startCoordinateX + width * entry.startCoordinateY;

      for (let j = 0; j < entry.answerKey.length; j++) {
        if (j === 0) {
          let labelPosition;
          if (entry.orientation === 'vertical') {
            if (entry.startCoordinateY === 0) {
              labelPosition = currPosition - 1;
            }
            else {
              labelPosition = currPosition - width;
            }
          }
          else {
            if (entry.startCoordinateX === 0) {
              labelPosition = currPosition - width;
            }
            else {
              labelPosition = currPosition - 1;
            }
          }
          
          grid[labelPosition] = new CrosswordGridSquareInfo(entry.id.toString(), '', '', labelPosition);
        }

        if (!grid[currPosition]?.answer) {
          totalCorrectLetters += 1;
          grid[currPosition] = new CrosswordGridSquareInfo('', entry.answerKey[j].toUpperCase(), entry.orientation, currPosition);
        }
        
        if (entry.orientation === 'horizontal') {
          currPosition += 1;
        }
        else {
          currPosition += width;
        }
      }
    }
    for (let i = 0; i < grid.length; i++) {
      const element = grid[i];
      if (element.answer === '' && element.label === '') {
        grid[i] = new CrosswordGridSquareInfo('', '', '', i);
      }
    }
    const gridRows: CrosswordGridSquareInfo[][] = [];
    for (let i = 0; i < height; i++) {
      gridRows.push(grid.slice(i * width, (i + 1) * width));
    }
    setGridRows(gridRows);
    setTotalCorrectLetters(totalCorrectLetters);
    setAcrossQuestions(data.filter(d => d.orientation === 'horizontal').sort((a, b) => a.id - b.id));
    setDownQuestions(data.filter(d => d.orientation === 'vertical').sort((a, b) => a.id - b.id));
  }, []);

  const tallyAnswers = function(tally: number, index: number, orientation: string, newOrientation: string) {
    let nio = nextInputOrientation;
    if (newOrientation) {
      setNextInputOrientation(orientation);
      nio = orientation
    }

    const newTally = currentTally + tally;
    setCurrentTally(newTally);
    setComplete(newTally === totalCorrectLetters);

    const nextIndex = nio === 'horizontal' ? index + 1 : index + width;
    const nextInput = document.getElementById('gridSquare-' + nextIndex);
    if (nextInput) {
      nextInput.focus();
      // nextInput.select();
    }
  };

  const data: CrosswordQuestion[] = [
    {
      orientation: 'horizontal',
      startCoordinateX: 24,
      startCoordinateY: 20,
      question: 'Where most people get matching tattoos, right?',
      answerKey: 'LASVEGAS',
      id: 16
    },
    {
      orientation: 'horizontal',
      startCoordinateX: 0,
      startCoordinateY: 12,
      question: 'City we want to move to',
      answerKey: 'SANDIEGO',
      id: 11
    },
    {
      orientation: 'vertical',
      startCoordinateX: 1,
      startCoordinateY: 11,
      question: 'Where we got our baby',
      answerKey: 'PARADISE',
      id: 10
    },
    {
      orientation: 'horizontal',
      startCoordinateX: 21,
      startCoordinateY: 10,
      question: 'Where we should really buy our first house',
      answerKey: 'JERSEYSHORE',
      id: 9
    },
    {
      orientation: 'vertical',
      startCoordinateX: 5,
      startCoordinateY: 9,
      question: '2021 vacation location',
      answerKey: 'OUTERBANKS',
      id: 7
    },
    {
      orientation: 'vertical',
      startCoordinateX: 30,
      startCoordinateY: 3,
      question: 'Number of kids to raise',
      answerKey: 'TWOORTHREE',
      id: 3
    },
    {
      orientation: 'vertical',
      startCoordinateX: 16,
      startCoordinateY: 6,
      question: 'Number of pets to have',
      answerKey: 'TWO',
      id: 4
    },
    {
      orientation: 'vertical',
      startCoordinateX: 10,
      startCoordinateY: 9,
      question: 'Fitness goal for the wedding',
      answerKey: 'SIXPACKABS',
      id: 8
    },
    {
      orientation: 'vertical',
      startCoordinateX: 14,
      startCoordinateY: 13,
      question: 'Best type of food',
      answerKey: 'CHEESE',
      id: 13
    },
    {
      orientation: 'horizontal',
      startCoordinateX: 14,
      startCoordinateY: 16,
      question: 'Coolest food-based instagram account',
      answerKey: 'EATODYSSEYPHILLY',
      id: 14
    },
    {
      orientation: 'vertical',
      startCoordinateX: 28,
      startCoordinateY: 0,
      question: 'Most important meal of the day',
      answerKey: 'BOOZYBRUNCH',
      id: 2
    },
    {
      orientation: 'vertical',
      startCoordinateX: 22,
      startCoordinateY: 6,
      question: 'Best dessert',
      answerKey: 'CREMEBRULEE',
      id: 5
    },
    {
      orientation: 'vertical',
      startCoordinateX: 25,
      startCoordinateY: 0,
      question: 'Best TV Show of all time',
      answerKey: '90DAYFIANCETHEOTHERWAY',
      id: 1
    },
    {
      orientation: 'horizontal',
      startCoordinateX: 12,
      startCoordinateY: 13,
      question: 'Favorite sport to play',
      answerKey: 'SOCCER',
      id: 12
    },
    {
      orientation: 'horizontal',
      startCoordinateX: 15,
      startCoordinateY: 8,
      question: '#1 alternative career option',
      answerKey: 'POTFARMER',
      id: 6
    },
    {
      orientation: 'horizontal',
      startCoordinateX: 3,
      startCoordinateY: 18,
      question: 'Best haunted house to skip because the line is crazy long',
      answerKey: 'EASTERNSTATEPENITENTIARY',
      id: 15
    }
  ];

  let nextLink = (<></>);
  if (complete) {
    nextLink = (
      <Link href="2019/madlibs-letter">
        <a>COMPLETED! Click here for next!</a>
      </Link>
    )
  }

  const rowElements = gridRows.map((row, i) => {
    return (
      <tr key={'cwrow-' + i}>
        {row.map(info => {
          return <CrosswordGridSquare key={'cwsquare-' + info.id} info={info} tallyAnswers={tallyAnswers} />;
        })}
      </tr>
    );
  });

  return (
    <div className="flex justify-center gap-2">
      <table className="table table-bordered">
        <tbody>
          {rowElements}
        </tbody>
      </table>
      {nextLink}
      <div>
        <div className="text-left">
          <div className="font-bold">Across:</div>
          {acrossQuestions.map((aq, i) => <p key={'aq-' + i}>{aq.id}: {aq.question}</p>)}
        </div>
        <div className="text-left">
          <div className="font-bold">Down:</div>
          {downQuestions.map((dq, i) => <p key={'dq-' + i}>{dq.id}: {dq.question}</p>)}
        </div>
      </div>
    </div>
  );
}
