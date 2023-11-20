'use client'

import Link from "next/link";
import { useState } from "react"

export default function CrosswordGrid() {
  const [complete, setComplete] = useState(false);

  let nextLink = (<></>);
  if (complete) {
    nextLink = (
      <div className="row">
        <div className="col-xs-4 offset-1">
          <Link href="2019/madlibs-letter">
            <a>COMPLETED! Click here for next!</a>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-xs-10 offset-1">
        <table className="table table-bordered">
          <tbody>
            {/* {{ #each gridRows as | gridRow |}}
            <tr>
              {{ #each gridRow as | gridSquare |}}
              {{ crossword- grid - square squareInfo=gridSquare tallyAnswers="tallyAnswers"}}
              {{/ each}}
            </tr>
            {{/ each}} */}
          </tbody>
        </table>
      </div>
      {nextLink}
      <div className="row" >
        <div className="col-xs-4 offset-1">
          <p>Across:</p>
          {/* {{#each acrossQuestions as |question|}}
                <p>{{question.id}}: {{question.question}}</p>
                {{/each}} */}
        </div>
        <div className="col-xs-4 offset-1">
          <p>Down:</p>
          {/* {{#each downQuestions as |question|}}
                <p>{{question.id}}: {{question.question}}</p>
                {{/each}} */}
        </div>
      </div>
    </div>
  );
}