import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    var questions = [
      {
        question: 'Adjective',
        defaultAnswer: 'amazing',
        userAnswer: '',
        replacement: '{0}'
      },
      {
        question: 'Verb (past tense)',
        defaultAnswer: 'dined',
        userAnswer: '',
        replacement: '{1}'
      },
      {
        question: 'Plural location',
        defaultAnswer: 'restaurants',
        userAnswer: '',
        replacement: '{2}'
      },
      {
        question: 'Plural alcoholic beverage',
        defaultAnswer: 'tequila shots',
        userAnswer: '',
        replacement: '{3}'
      },
      {
        question: 'Plural alcoholic beverage again',
        defaultAnswer: 'tequila shots',
        userAnswer: '',
        replacement: '{4}'
      },
      {
        question: 'Evil creature',
        defaultAnswer: 'dog',
        userAnswer: '',
        replacement: '{5}'
      },
      {
        question: 'Plural noun',
        defaultAnswer: 'tattoos',
        userAnswer: '',
        replacement: '{6}'
      },
      {
        question: 'Catastrophic event',
        defaultAnswer: 'giant meteor crashing into earth',
        userAnswer: '',
        replacement: '{7}'
      }
    ];

    return RSVP.hash({
      questions: questions,
      letterTemplate: `Dear Angela,
      
  These past four years together have truly been the best years of my life. We have gone on many {0} adventures, {1} in the finest of {2}, and spent some of the silliest nights of our lives just the two of us. From the night we met, pounding {3} at Cavanaugh's, to the night we got engaged at Sky Garten and downed even more {4}, our love has grown incredibly strong. We lived through a fire, adopted a {5}, traveled to Europe, and now we are getting married next year at the location of our dreams! We even have matching {6} for Christ's sake! There is nothing that could ever break us apart, except maybe a {7}. So barring that from happening, I look forward to solidifying our commitment to each other that we will always be together in this life and beyond.

All my love forever and ever,
Pat`
    });
  }
});
