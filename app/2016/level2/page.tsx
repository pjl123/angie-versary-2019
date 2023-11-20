'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Level2() {
  const router = useRouter();
  const [quizComplete, setQuizComplete] = useState(false);
  const [inputs, setInputs] = useState(Array(10).fill(''));
  const [inputClasses, setInputClasses] = useState(Array(10).fill(''));
  const answers = [
    "heather",
    "cheesesteak",
    "zee bar",
    "alize",
    "cheesy bread",
    "miami",
    "card suits",
    "50 cent",
    "couples massage",
    "e"
  ];

  const _setQuestionInput = function(i: number, input: string) {
    const newInputs = [...inputs];
    newInputs[i] = input;
    setInputs(newInputs);
  }

  const _validateForm = function() {
    if (quizComplete){
      router.push('prize')
      return;
    }
      
    let valid = true;
    const newClasses = [];
    for (let i = 0; i < inputs.length; i++){
      const correct = inputs[i].toLowerCase().indexOf(answers[i]) >= 0;
      if (correct) {
        newClasses.push('bg-green-600 text-stone-50');
      }                        
      else {
        newClasses.push('bg-red-600 text-stone-50');
      }
      valid = valid && correct;
    }
    setInputClasses(newClasses);
    if (valid){
      setQuizComplete(true);
    }
  }

  return (
    <div className="bg-[floralwhite] h-screen">
      <div className="pt-6 flex flex-col items-center gap-y-4">
        <div className="text-3xl">Happy Angie-versary!!</div>
        <div className="text-xl">Level 2: Test Your Compatibility and Win Big!</div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <label htmlFor="question1">1) Who is the best Rock of Love contestant?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[0]} value={inputs[0]} onChange={(e) => _setQuestionInput(0, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question2">2) What is the best food to eat after going to Cavanaugh's?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[1]} value={inputs[1]} onChange={(e) => _setQuestionInput(1, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question3">3) Where is the best place to buy a bottle of water at 3 AM?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[2]} value={inputs[2]} onChange={(e) => _setQuestionInput(2, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question4">4) What is the best restaurant ever?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[3]} value={inputs[3]} onChange={(e) => _setQuestionInput(3, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question5">5) When you stay in on the weekend, what is the best food to order at night?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[4]} value={inputs[4]} onChange={(e) => _setQuestionInput(4, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question6">6) What city has the best brunch spot in the USA?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[5]} value={inputs[5]} onChange={(e) => _setQuestionInput(5, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question7">7) If you had to get a couples tattoo, what would it be?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[6]} value={inputs[6]} onChange={(e) => _setQuestionInput(6, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question8">8) If you could meet a celebrity on your second date with someone, who would it be?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[7]} value={inputs[7]} onChange={(e) => _setQuestionInput(7, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question9">9) Fill in the blank: The best Valentine's Day gift I ever got was a ______ _______?</label>
              </td>
              <td>
                <input type="text" className={inputClasses[8]} value={inputs[8]} onChange={(e) => _setQuestionInput(8, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="question10">10) Multiple Choice: My ideal boyfriend is _________.</label>
              </td>
              <td>
                <input type="text" className={inputClasses[9]} value={inputs[9]} onChange={(e) => _setQuestionInput(9, e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>a) attractive</li>
                  <li>b) funny</li>
                  <li>c) nerdy</li>
                  <li>d) romantic</li>
                  <li>e) all of the above</li>
                </ul>
              </td>
              <td>
                <button className="bg-[papayawhip] px-6 py-4" onClick={() => _validateForm()}>{quizComplete ? 'Click for prize!' : 'Check Your Answers'}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}