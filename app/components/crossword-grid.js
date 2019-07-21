import Component from '@ember/component';

export default Component.extend({
  height: 22,
  width: 32,
  currentTally: 0,

  init() {
    this._super(...arguments);
    
    var grid = new Array(this.get('height') * this.get('width')).fill({});
    var totalCorrectLetters = 0;
    var data = this.get('crosswordData')();
    for (var i = 0; i < data.length; i++) {
      var entry = data[i];
      var currPosition = entry.startCoordinate.x + this.get('width') * entry.startCoordinate.y;

      for (var j = 0; j < entry.answerKey.length; j++) {
        if (j === 0) {
          var labelPosition;
          if (entry.orientation === 'vertical') {
            if (entry.startCoordinate.y === 0) {
              labelPosition = currPosition - 1;
            }
            else {
              labelPosition = currPosition - this.get('width');
            }
          }
          else {
            if (entry.startCoordinate.x === 0) {
              labelPosition = currPosition - this.get('width');
            }
            else {
              labelPosition = currPosition - 1;
            }
          }
          
          grid[labelPosition] = {
            label: entry.id,
          };
        }

        if (!grid[currPosition].answer) {
          totalCorrectLetters += 1;
            grid[currPosition] = {
              answer: entry.answerKey[j].toUpperCase(),
              orientation: entry.orientation,
              id: currPosition
            };
        }
        
        if (entry.orientation === 'horizontal') {
          currPosition += 1;
        }
        else {
          currPosition += this.get('width');
        }
      }
    }
    var gridRows = [];
    for (i = 0; i < this.get('height'); i++) {
      gridRows.push(grid.slice(i * this.get('width'), (i + 1) * this.get('width')));
    }
    this.set('gridRows', gridRows);
    this.set('totalCorrectLetters', totalCorrectLetters);
    this.set('acrossQuestions', data.filterBy('orientation', 'horizontal').sortBy('id'));
    this.set('downQuestions', data.filterBy('orientation', 'vertical').sortBy('id'));
  },

  crosswordData() {
    return [
      {
        orientation: 'horizontal',
        startCoordinate: {x:24,y:20},
        question: 'Where most people get matching tattoos, right?',
        answerKey: 'LASVEGAS',
        id: 16
      },
      {
        orientation: 'horizontal',
        startCoordinate: {x:0,y:12},
        question: 'City we want to move to',
        answerKey: 'SANDIEGO',
        id: 11
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:1,y:11},
        question: 'Where we got our baby',
        answerKey: 'PARADISE',
        id: 10
      },
      {
        orientation: 'horizontal',
        startCoordinate: {x:21,y:10},
        question: 'Where we should really buy our first house',
        answerKey: 'JERSEYSHORE',
        id: 9
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:5,y:9},
        question: '2021 vacation location',
        answerKey: 'OUTERBANKS',
        id: 7
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:30,y:3},
        question: 'Number of kids to raise',
        answerKey: 'TWOORTHREE',
        id: 3
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:16,y:6},
        question: 'Number of pets to have',
        answerKey: 'TWO',
        id: 4
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:10,y:9},
        question: 'Fitness goal for the wedding',
        answerKey: 'SIXPACKABS',
        id: 8
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:14,y:13},
        question: 'Best type of food',
        answerKey: 'CHEESE',
        id: 13
      },
      {
        orientation: 'horizontal',
        startCoordinate: {x:14,y:16},
        question: 'Coolest food-based instagram account',
        answerKey: 'EATODYSSEYPHILLY',
        id: 14
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:28,y:0},
        question: 'Most important meal of the day',
        answerKey: 'BOOZYBRUNCH',
        id: 2
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:22,y:6},
        question: 'Best dessert',
        answerKey: 'CREMEBRULEE',
        id: 5
      },
      {
        orientation: 'vertical',
        startCoordinate: {x:25,y:0},
        question: 'Best TV Show of all time',
        answerKey: '90DAYFIANCETHEOTHERWAY',
        id: 1
      },
      {
        orientation: 'horizontal',
        startCoordinate: {x:12,y:13},
        question: 'Favorite sport to play',
        answerKey: 'SOCCER',
        id: 12
      },
      {
        orientation: 'horizontal',
        startCoordinate: {x:15,y:8},
        question: '#1 alternative career option',
        answerKey: 'POTFARMER',
        id: 6
      },
      {
        orientation: 'horizontal',
        startCoordinate: {x:3,y:18},
        question: 'Best haunted house to skip because the line is crazy long',
        answerKey: 'EASTERNSTATEPENITENTIARY',
        id: 15
      }
    ];
  },

  actions: {
    tallyAnswers(tally, index, orientation, newOrientation) {
      if (newOrientation) {
        this.set('nextInputOrientation', orientation);
      }

      var currentTally = this.get('currentTally');
      currentTally = currentTally + tally;
      this.set('currentTally', currentTally);
      this.set('puzzleComplete', currentTally === this.get('totalCorrectLetters'));

      var nextIndex = this.get('nextInputOrientation') === 'horizontal' ? index + 1 : index + this.get('width');
      var nextInput = document.getElementById('gridSquare-' + nextIndex);
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  }
});
