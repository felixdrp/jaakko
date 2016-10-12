import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Rater from './rater'

import { connect } from 'react-redux'

import Wait from './wait'

import {
 ActionShop,
 ActionShoppingBasket,
 ActionSpeakerNotesOff,
 ActionSpeakerNotes,
 ActionSpellcheck,
 ActionStars,
 ActionStore,
} from 'material-ui/svg-icons';


var instructionsData = {
   experimentStructure : {
    0 : {
      title : 'Explanation of Experimental Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it. '
              +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – the Task Completion stage, the Similarity stage, and the Favourites stage. The third task has one stage which you complete individually.'
              +'\nTask Completion Stage: You are asked to generate ideas based on the instructions provided. All your entries (i.e. ideas) are shared in the group. At the end of this task/stage your ranking will be.'
              +'\nSimilarities Stage: Your group’s ideas are then sent to another group at random to be ranked and you will receive another group’s entries. You are asked to identify any of that group’s entries you think are similar to each other. '
              +'\nAn example of how similarity can be judged is provided, but it is up to you to decide whether or not entries are similar.'
              +'\nThose entries found to be similar to any already existing entry by at least 2 people in your group will be excluded from the Favourites stage. '
              +'\nFavourites Stage: You are asked to give starts to your 5 favourite entries from the Similarities stage. The person awarded the most stars is judged to have performed the best, and the person whose was given the least stars is judged to have performed the worst.'
              +'\nFinal Task: You are asked to answer a series of questions and you will be given a score based on the number of correct answers. Your rank depends on the number of correct answers. If there are two people with the same score the person with the fastest time will be awarded the higher rank.'
              +'\nTask 1 & 2 = Task Completion, Similarities stage, and Favourites stage'
              +'\nFinal Task = Individual Task Only'
              +'\n\nPay:'
              +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
    },
    1 : {
      title : 'Explanation of Experimental Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it. '
              +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – the Task Completion stage, the Similarity stage, and the Favourites stage. The third task has one stage which you complete individually.'
              +'\nTask Completion Stage: You are asked to generate ideas based on the instructions provided. All your entries (i.e. ideas) are shared in the group identifying you as the creator. At the end of this task/stage your ranking will be.'
              +'\nSimilarities Stage: Your group’s ideas are then sent to another group at random to be ranked and you will receive another group’s entries. You are asked to identify any of that group’s entries you think are similar to each other. '
              +'\nAn example of how similarity can be judged is provided, but it is up to you to decide whether or not entries are similar.'
              +'\nThose entries found to be similar to any already existing entry by at least 2 people in your group will be excluded from the Favourites stage. '
              +'\nFavourites Stage: You are asked to give starts to your 5 favourite entries from the Similarities stage. The person awarded the most stars is judged to have performed the best, and the person whose was given the least stars is judged to have performed the worst.'
              +'\nFinal Task: You are asked to answer a series of questions and you will be given a score based on the number of correct answers. Your rank depends on the number of correct answers. If there are two people with the same score the person with the fastest time will be awarded the higher rank.'
              +'\nTask 1 & 2 = Task Completion, Similarities stage, and Favourites stage'
              +'\nFinal Task = Individual Task Only'
              +'\n\nPay:'
              +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
    },
    2 : {
      title : 'Explanation of Experimental Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it. '
              +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – the Task Completion stage, the Similarity stage, and the Favourites stage. The third task has one stage which you complete individually.'
              +'\nTask Completion Stage: You are asked to generate ideas based on the instructions provided. All your entries (i.e. ideas) are shared in the group. At the end of this task/stage your ranking will be.'
              +'\nSimilarities Stage: Your group’s ideas are then sent to another group at random to be ranked and you will receive another group’s entries. You are asked to identify any of that group’s entries you think are similar to each other. '
              +'\nAn example of how similarity can be judged is provided, but it is up to you to decide whether or not entries are similar.'
              +'\nThose entries found to be similar to any already existing entry by at least 2 people in your group will be excluded from the Favourites stage. '
              +'\nFavourites Stage: You are asked to give starts to your 5 favourite entries from the Similarities stage. The person awarded the most stars is judged to have performed the best, and the person whose was given the least stars is judged to have performed the worst.'
              +'\nFinal Task: You are asked to answer a series of questions and you will be given a score based on the number of correct answers. Your rank depends on the number of correct answers. If there are two people with the same score the person with the fastest time will be awarded the higher rank. Pay is based on the relative performance and is shown below.'
              +'\nTask 1 & 2 = Task Completion, Similarities stage, and Favourites stage'
              +'\nFinal Task = Individual Task Only'
              +'\n\nPay:'
              +'\nHow much you are paid depends on how many “stars” you receive compared to others in your group in the first two tasks; the more you have, the better your chances of earning more money. Your pay depends on your individual performance in each task relative to that of the others in your group, as explained above. The amounts are shown below. The participant who performed the best in a task earns £5 (1) and the participant who performed the worst earns £0 (5). The below amounts are what participants can earn in actual pound sterling (£) for all possible ranks in all three tasks. '
              +'\n'
              +'\n1. £5'
              +'\n2. £2'
              +'\n3. £1'
              +'\n4. £0.5'
              +'\n5. £0'
    },
    3 : {
      title : 'Explanation of Experimental Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it. '
              +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – the Task Completion stage, the Similarity stage, and the Favourites stage. The third task has one stage which you complete individually.'
              +'\nTask Completion Stage: You are asked to generate ideas based on the instructions provided. All your entries (i.e. ideas) are shared in the group identifying you as the creator. At the end of this task/stage your ranking will be.'
              +'\nSimilarities Stage: Your group’s ideas are then sent to another group at random to be ranked and you will receive another group’s entries. You are asked to identify any of that group’s entries you think are similar to each other. '
              +'\nAn example of how similarity can be judged is provided, but it is up to you to decide whether or not entries are similar.'
              +'\nThose entries found to be similar to any already existing entry by at least 2 people in your group will be excluded from the Favourites stage. '
              +'\nFavourites Stage: You are asked to give starts to your 5 favourite entries from the Similarities stage. The person awarded the most stars is judged to have performed the best, and the person whose was given the least stars is judged to have performed the worst.'
              +'\nFinal Task: You are asked to answer a series of questions and you will be given a score based on the number of correct answers. Your rank depends on the number of correct answers. If there are two people with the same score the person with the fastest time will be awarded the higher rank. Pay is based on the relative performance and is shown below.'
              +'\nTask 1 & 2 = Task Completion, Similarities stage, and Favourites stage'
              +'\nFinal Task = Individual Task Only'
              +'\n\nPay:'
              +'\nHow much you are paid depends on how many “stars” you receive compared to others in your group in the first two tasks; the more you have, the better your chances of earning more money. Your pay depends on your individual performance in each task relative to that of the others in your group, as explained above. The amounts are shown below. The participant who performed the best in a task earns £5 (1) and the participant who performed the worst earns £0 (5). The below amounts are what participants can earn in actual pound sterling (£) for all possible ranks in all three tasks. '
              +'\n'
              +'\n1. £5'
              +'\n2. £2'
              +'\n3. £1'
              +'\n4. £0.5'
              +'\n5. £0'
              // +'\nThe way the points are scored depends on whether the game is a group game or an individual game. In the group game the more votes or favourites your entry receives the better you perform. If you have the most total favourites over all of your entries you will be judged to have performed the best out of everyone in the group and receive £5. The final game will be completed individually but your performance will be compared to other participants in your group. Perform better than others in your group and you will be awarded £5 if you perform second best you will be rewarded £2 and so on. Performance more information about how performance will be measured will be told to you before the task begins.'
    },
  },
  alternativeObjectFigural : {
    0: {
      title : 'Line Meanings',
      text : 'The Task:\n\n'
          +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. You will be given 5 minutes to complete the task.'
          +'\n	Example:\n\n'
          +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
          +'\nFigure = Flag '
          +'\nDescription = The line could be a side of a flag.'
          +'\nThe line/figure will not be as simple and so the description will become more important in these cases.'
          +'\nAll of the answers which have been submitted in your group can be seen on the right side of your screen.'
          +'\n\n	Output:\n\n'
          +'\nShow example* (have flag and box example in the group entries bar)'
          +'\nImportant note:\n\n'
          +'\nThere are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
          +'\nPayment\n\n'
          +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
          +'\n\nThe previous example would look like this…'
      },
    1: {
      title : 'Line Meanings',
      text : 'The Task:\n\n'
          +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. You will be given 5 minutes to complete the task.'
          +'\n	Example:\n\n'
          +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
          +'\nFigure = Flag '
          +'\nDescription = The line could be a side of a flag.'
          +'\nThe line/figure will not be as simple and so the description will become more important in these cases.'
          +'\nAll of the answers which have been submitted in your group can be seen on the right side of your screen along with the names of the participants who submitted the expression.'
          +'\n\n	Output:\n\n'
          +'\nShow example* (have flag and box example in the group entries bar)'
          +'\nImportant note:\n\n'
          +'\nThere are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
          +'\nPayment\n\n'
          +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
          +'\n\nThe previous example would look like this…'
      },
      2: {
        title : 'Line Meanings',
        text : 'The Task:\n\n'
            +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. You will be given 5 minutes to complete the task.'
            +'\n	Example:\n\n'
            +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
            +'\nFigure = Flag '
            +'\nDescription = The line could be a side of a flag.'
            +'\nThe line/figure will not be as simple and so the description will become more important in these cases.'
            +'\nAll of the answers which have been submitted in your group can be seen on the right side of your screen'
            +'\n\n	Output:\n\n'
            +'\nShow example* (have flag and box example in the group entries bar)'
            +'\nImportant note:\n\n'
            +'\nThere are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
            +'\nPayment\n\n'
            +'\nHow many stars you receive by members of other groups will determine your ranking and your ranking will determine your performance and how much you earn.'
            +'\na. First Place: Person with the most stars in a group receives £5.'
            +'\nb. Second Place: £2.'
            +'\nc. Third Place: £1.'
            +'\nd. Fourth Place: £0.5'
            +'\ne. Fifth Place: £0'
            +'\n\nThe previous example would look like this…'
        },
        3: {
        title : 'Line Meanings',
        text : 'The Task:\n\n'
            +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. You will be given 5 minutes to complete the task.'
            +'\n	Example:\n\n'
            +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
            +'\nFigure = Flag '
            +'\nDescription = The line could be a side of a flag.'
            +'\nThe line/figure will not be as simple and so the description will become more important in these cases.'
            +'\nAll of the answers which have been submitted in your group can be seen on the right side of your screen along with the names of the participants who submitted the expression.'
            +'\n\n	Output:\n\n'
            +'\nShow example* (have flag and box example in the group entries bar)'
            +'\nImportant note:\n\n'
            +'\nThere are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
            +'\nPayment\n\n'
            +'\nHow many stars you receive by members of other groups will determine your ranking and your ranking will determine your performance and how much you earn.'
            +'\na. First Place: Person with the most stars in a group receives £5.'
            +'\nb. Second Place: £2.'
            +'\nc. Third Place: £1.'
            +'\nd. Fourth Place: £0.5'
            +'\ne. Fifth Place: £0'
            +'\n\nThe previous example would look like this…'
          },

  },

  alternativeObject : {
    0: {
      title : 'Objects Task',
      text : 'The Task:\n\n'
                +'\n	The task is to come up with as many alternative objects for a given object in the time given.'
                +'\nFor example:'
                +'\nIf the object given is a Coat Hanger this is how you would complete the task.'
                +'\n		Completion\n\n'
                +'\n1. First you will enter the name of the object in the “object name” field. For example, the alternative object could be a “back scratcher”. There is no limit to how many entries you can submit.'
                +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be “a tool that can be used to scratch your back.'
                +'\n3. When you are finished you can press the “submit button” to submit the entry.'
                +'\n4. Your name will not be shown next to your entries and you will be able to see the entries of everyone in your group’s at all times during the task.'
                +'\nThe previous example would look like this…'
                +'\nObject name: Back Scratcher'
                +'\nDescription: A tool that can be used to scratch your back.'
                +'\nPayment\n\n'
                +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
                +'\n\nThe previous example would look like this…'
      },
      1: {
        title : 'Objects Task',
        text : 'The Task:\n\n'
                  +'\n	The task is to come up with as many alternative objects for a given object in the time given.'
                  +'\nFor example:'
                  +'\nIf the object given is a Coat Hanger this is how you would complete the task.'
                  +'\n		Completion\n\n'
                  +'\n1. First you will enter the name of the object in the “object name” field. For example, the alternative object could be a “back scratcher”. There is no limit to how many entries you can submit.'
                  +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be “a tool that can be used to scratch your back.'
                  +'\n3. When you are finished you can press the “submit button” to submit the entry.'
                  +'\n4. Your name will be shown next to your entries and you will be able to see the entries of everyone in your group’s at all times during the task.'
                  // +'\n5. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                  +'\nThe previous example would look like this…'
                  +'\nObject name: Back Scratcher'
                  +'\nDescription: A tool that can be used to scratch your back.'
                  +'\nPayment\n\n'
                  +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
                  +'\n\nThe previous example would look like this…'
        },
      2: {
        title : 'Objects Task',
        text : 'The Task:\n\n'
                  +'\n	The task is to come up with as many alternative objects for a given object in the time given.'
                  +'\nFor example:'
                  +'\nIf the object given is a Coat Hanger this is how you would complete the task.'
                  +'\n		Completion\n\n'
                  +'\n1. First you will enter the name of the object in the “object name” field. For example, the alternative object could be a “back scratcher”. There is no limit to how many entries you can submit.'
                  +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be “a tool that can be used to scratch your back.'
                  +'\n3. When you are finished you can press the “submit button” to submit the entry.'
                  +'\n4. Your name will not be shown next to your entries and you will be able to see the entries of everyone in your group’s at all times during the task.'
                  // +'\n5. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                  +'\nThe previous example would look like this…'
                  +'\nObject name: Back Scratcher'
                  +'\nDescription: A tool that can be used to scratch your back.'
                  +'\nPayment\n\n'
                  +'\nThe payment will depend on popularity of submissions i.e. how many favourites your entries received compared to the others in your group.'
                  +'\na. First Place: Person with the most stars in a group receives £5.'
                  +'\nb. Second Place: £2.'
                  +'\nc. Third Place: £1.'
                  +'\nd. Fourth Place: £0.5'
                  +'\ne. Fifth Place: £0'
                  +'\n\nThe previous example would look like this…'
        },
        3: {
          title : 'Objects Task',
          text : 'The Task:\n\n'
                    +'\n	The task is to come up with as many alternative objects for a given object in the time given.'
                    +'\nFor example:'
                    +'\nIf the object given is a Coat Hanger this is how you would complete the task.'
                    +'\n		Completion\n\n'
                    +'\n1. First you will enter the name of the object in the “object name” field. For example, the alternative object could be a “back scratcher”. There is no limit to how many entries you can submit.'
                    +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be “a tool that can be used to scratch your back.'
                    +'\n3. When you are finished you can press the “submit button” to submit the entry.'
                    +'\n4. Your name will be shown next to your entries and you will be able to see the entries of everyone in your group’s at all times during the task.'
                    // +'\n5. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                    +'\nThe previous example would look like this…'
                    +'\nObject name: Back Scratcher'
                    +'\nDescription: A tool that can be used to scratch your back.'
                    +'\nPayment\n\n'
                    +'\nThe payment will depend on popularity of submissions i.e. how many favourites your entries received compared to the others in your group.'
                    +'\na. First Place: Person with the most stars in a group receives £5.'
                    +'\nb. Second Place: £2.'
                    +'\nc. Third Place: £1.'
                    +'\nd. Fourth Place: £0.5'
                    +'\ne. Fifth Place: £0'
                    +'\n\nThe previous example would look like this…'
          },
  },

  similarities : {
    0: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another group’s entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people decide that the same two entries are similar to each other, then the entry that was created second will be disallowed.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nExample:'
                +'\n\nThe following is a guide to how similarities can be judged, but the final decision about what is similar is up to each to judge for themselves.'
                +'\n\nFor example: There are three entries below to the game “come up with alternative object for a coat hanger”'
                +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
                +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
                +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
                +'\n\n(Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.'
                +'\n\nRemember that the entries you are judging are from another group and will not affect your performance in the task.'
                +'\n\nIf two entries are flagged similar then the later entry will be eliminated from the favouriting round.'    },
    1: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another group’s entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people decide that the same two entries are similar to each other, then the entry that was created second will be disallowed.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nExample:'
                +'\n\nThe following is a guide to how similarities can be judged, but the final decision about what is similar is up to each to judge for themselves.'
                +'\n\nFor example: There are three entries below to the game “come up with alternative object for a coat hanger”'
                +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
                +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
                +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
                +'\n\n(Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.'
                +'\n\nRemember that the entries you are judging are from another group and will not affect your performance in the task.'
                +'\n\nIf two entries are flagged similar then the later entry will be eliminated from the favouriting round.'    },
    2: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another group’s entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people decide that the same two entries are similar to each other, then the entry that was created second will be disallowed.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nExample:'
                +'\n\nThe following is a guide to how similarities can be judged, but the final decision about what is similar is up to each to judge for themselves.'
                +'\n\nFor example: There are three entries below to the game “come up with alternative object for a coat hanger”'
                +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
                +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
                +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
                +'\n\n(Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.'
                +'\n\nRemember that the entries you are judging are from another group and will not affect your performance in the task.'
                +'\n\nIf two entries are flagged similar then the later entry will be eliminated from the favouriting round.'
    },
    3: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another group’s entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people decide that the same two entries are similar to each other, then the entry that was created second will be disallowed.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nExample:'
                +'\n\nThe following is a guide to how similarities can be judged, but the final decision about what is similar is up to each to judge for themselves.'
                +'\n\nFor example: There are three entries below to the game “come up with alternative object for a coat hanger”'
                +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
                +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
                +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
                +'\n\n(Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.'
                +'\n\nRemember that the entries you are judging are from another group and will not affect your performance in the task.'
                +'\n\nIf two entries are flagged similar then the later entry will be eliminated from the favouriting round.'
    },
  },
  favourites : {
    0: {
      title : 'Instructions for Favourites rounds',
      text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. You will be completely anonymous when favouring.'
                +'\nEvery group’s entries will be given stars. Based on the total amount of stars an individual receives it will determine where they rank within their group.'
                +'\nYou are asked to rank the 5 favourite entries by giving them stars and no half stars can be given.'
                +'\n1. Favourite entry = 5 Stars'
                +'\n2. Second favourite entry = 4 Stars'
                +'\n3. Third favourite entry = 3 Stars'
                +'\n4. Fourth favourite entry = 2 Stars'
                +'\n5. Fifth favourite entry = 1 Star'
                +'\n\nHere we have an example of what you will see: ',
          },
      1: {
        title : 'Instructions for Favourites rounds',
        text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. You will be completely anonymous when favouring.'
                  +'\nEvery group’s entries will be given stars. Based on the total amount of stars an individual receives it will determine where they rank within their group.'
                  +'\nYou are asked to rank the 5 favourite entries by giving them stars and no half stars can be given.'
                  +'\n1. Favourite entry = 5 Stars'
                  +'\n2. Second favourite entry = 4 Stars'
                  +'\n3. Third favourite entry = 3 Stars'
                  +'\n4. Fourth favourite entry = 2 Stars'
                  +'\n5. Fifth favourite entry = 1 Star'
                  +'\n\nHere we have an example of what you will see: ',
            },
      2: {
      title : 'Instructions for Favourites rounds',
      text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. You will be completely anonymous when favouring.'
                +'\nEvery group’s entries will be given stars. Based on the total amount of stars an individual receives it will determine where they rank within their group.'
                +'\nYou are asked to rank the 5 favourite entries by giving them stars and no half stars can be given.'
                +'\n1. Favourite entry = 5 Stars'
                +'\n2. Second favourite entry = 4 Stars'
                +'\n3. Third favourite entry = 3 Stars'
                +'\n4. Fourth favourite entry = 2 Stars'
                +'\n5. Fifth favourite entry = 1 Star'
                // +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
               +'\n\nHere we have an example of what you will see: ',
            },
      3: {
        title : 'Instructions for Favourites rounds',
        text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. You will be completely anonymous when favouring.'
                  +'\nEvery group’s entries will be given stars. Based on the total amount of stars an individual receives it will determine where they rank within their group.'
                  +'\nYou are asked to rank the 5 favourite entries by giving them stars and no half stars can be given.'
                  +'\n1. Favourite entry = 5 Stars'
                  +'\n2. Second favourite entry = 4 Stars'
                  +'\n3. Third favourite entry = 3 Stars'
                  +'\n4. Fourth favourite entry = 2 Stars'
                  +'\n5. Fifth favourite entry = 1 Star'
              //  +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
                +'\n\nHere we have an example of what you will see: ',
            },
  },
  math : {
    0 : {
      title : 'Math Game Instructions',
      text : 'For this game you will be asked to solve simple addition problems. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible during the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment\n'
              +'\nYour pay will not depend on your performance in this task.',
    },
    1 : {
      title : 'Math Game Instructions',
      text : 'For this game you will be asked to solve simple addition problems. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible during the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment\n'
              +'\nYour pay will not depend on your performance in this task.',
    },
    2 : {
      title : 'Math Game Instructions',
      text : 'For this game you will be asked to solve simple addition problems. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible during the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment\n'
              +'\nYour pay will depend on your performance'
              +'\na. First: £5.'
              +'\nb. Second: £2.'
              +'\nc. Third: £1.'
              +'\nd. Fourth: £0.5'
              +'\ne. Fifth: £0',
    },
    3 : {
      title : 'Math Game Instructions',
      text : 'For this game you will be asked to solve simple addition problems. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible during the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment\n'
              +'\nYour pay will depend on your performance'
              +'\na. First: £5.'
              +'\nb. Second: £2.'
              +'\nc. Third: £1.'
              +'\nd. Fourth: £0.5'
              +'\ne. Fifth: £0',
    },
  },
}


class Instructions extends Component {

  constructor(props) {
    super(props);
     this.state = {groupType: 0,isSubmitted: false};

     console.log("INSTRUCTIONS: "+props.payload)
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps vienen pa ca")
    console.log(nextProps)
    this.setState({
      groupType: nextProps.groupType,
    });

  }

  componentWillUnmount(){
    this.setState({isSubmitted: false});
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  getTaskExample = (tasktype) => {
        switch(tasktype){
          case 'alternativeObject':
           return <div style={{marginTop:20}}>
               <Card>
               <CardText>
                   Title: <TextField id={'dummy'} value='Reset button pressing tool' style={{marginLeft:10,
                   }} /><br/>
                   Description: <TextField
                                 id={'dummy2'}
                                 multiLine={true}
                                 rows={1}
                                 rowsMax={10}
                                 value='A tool that can be used to press reset buttons which cannot be pressed with your fingers.'
                                 style={{ marginLeft:20, width: '80%',
                      }} />
               </CardText>
              </Card>
           </div>
          case 'alternativeObjectFigural':
            return <div style={{marginTop:20}}>
                <Card>
                <CardText>
                    Title: <TextField id={'dummy'} value='Flag' style={{marginLeft:10,
                    }} /><br/>
                    Description: <TextField
                                  id={'dummy2'}
                                  multiLine={true}
                                  rows={1}
                                  rowsMax={10}
                                  value='The line could be a side of a flag.'
                                  style={{ marginLeft:20, width: '80%',
                       }} />
                </CardText>
               </Card>
            </div>
          case 'similarities':
            return <div> <div style={{padding:5,display:'flex'}}>

                          <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                            <CardText style={{padding:8}}>
                              0.
                            </CardText>
                          </Card>

                          <Card>
                            <CardHeader style={{padding:8}}>
                              Reset button pressing tool
                            </CardHeader>
                            <CardText style={{padding:8}}>
                              A tool that can be used to press reset buttons which cannot be pressed with your fingers
                            </CardText>
                          </Card>

                          <Card>
                            <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                              Similar to:
                            </CardText>
                          </Card>

                          <Card>
                            <CardText style={{padding:8}}>
                            <SelectField value={-1} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                                  <MenuItem value={0} primaryText={0} />
                                  <MenuItem  value={1} primaryText={1} />
                                  <MenuItem  value={2} primaryText={2} />
                             </SelectField>
                            </CardText>
                    </Card>
                    </div>

                    <div style={{padding:5,display:'flex'}}>
                    <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                      <CardText style={{padding:8}}>
                        1.
                      </CardText>
                    </Card>

                    <Card>
                      <CardHeader style={{padding:8}}>
                        Reset button pressing tool
                      </CardHeader>
                      <CardText style={{padding:8}}>
                        A tool that can be used to press reset buttons which cannot be pressed with your fingers
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                        Similar to:
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8}}>
                      <SelectField value={-1} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                            <MenuItem value={0} primaryText={0} />
                            <MenuItem  value={1} primaryText={1} />
                            <MenuItem  value={2} primaryText={2} />
                       </SelectField>
                      </CardText>
              </Card>
              </div>
              </div>
          case 'favourites':
            return <div style={{marginTop:20,display:'flex'}}>
                      <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                        <CardText style={{padding:8}}>
                          {1+'.'}
                        </CardText>
                      </Card>

                      <Card style={{width:460}}>
                        <CardHeader style={{padding:8}}>
                            Reset button pressing tool
                        </CardHeader>
                        <CardText style={{padding:8}}>
                          A tool that can be used to press reset buttons which cannot be pressed with your fingers
                        </CardText>
                      </Card>

                      <Card>
                          <CardText style={{padding:20}}>
                            <Rater entryIndex={0} currentRating={3} raterCallback={ () => {alert('This is how you assign a rating')}} />
                          </CardText>
                      </Card>
                  </div>
          case 'math':
              return <div style={{marginTop:20}}>
                  <Card>
                  <CardText>
                    <div>56+73+5+10+11 =
                      <TextField
                        id={'dummy'}
                        style={{
                          paddingLeft: 10,
                          marginRight: 20,
                          }}
                          value={155}
                      />
                    </div>
                  </CardText>
                 </Card>
              </div>
          default:
            return <div></div>

    }
  }


  gatherData = () => {
      if ( !this.state.isSubmitted ){
        this.props.submit( this.state )
        this.setState({isSubmitted: true});
      }
    }


//'_marker'
  render() {
    if ( JSON.stringify(this.props.type) == "{}" ) {
      return <span></span>
    }

    const { textColor } = this.context.muiTheme.palette;

    if (
      [0,1,2,3].includes(this.props.groupType) == false ||
      typeof this.props.type != 'string'
    ) {
      return <span></span>
    }

    let groupType =  this.props.groupType
    let tasktype = this.props.type

    let possibleTasks = ['favourites','math','similarities','alternativeObject','alternativeObjectFigural','experimentStructure']
    console.log("TASK TYPE: "+tasktype)
    if ( possibleTasks.indexOf(tasktype) < 0 ){
      return <div></div>
    }

    let title = instructionsData[tasktype][groupType].title;
    let text = instructionsData[tasktype][groupType].text;
    let example = this.getTaskExample(tasktype);



    return (
      <div>
      {
        // <h1>{message}</h1>
        // <Wait melacome={<ActionShop />} /><ActionStore /> <ActionShop />
        // <div> {this.props.firstName} {v} {this.mlk()}</div>
      }


          <Card
            style={{
              padding: 30,
              margin: '2% 15% 15%',
              minWidth: 900,
              maxWidth: 1200,
            }}
          >
            <CardHeader
              title={title}
              titleStyle={{
                fontSize: 24,
                color: textColor,
              }}
            />
            <CardText
              style={{
                paddingTop: 0,
              }}
              >

              {text.split('\n').map( (item,i) => <div key={i} style={{marginBottom:10}}>{item}</div>)}

              {example}
              <br />

              <FlatButton
                id="ready"
                backgroundColor='green'
                style={{color: 'white',}}
                  onClick= { this.gatherData }
              >
                I'm ready
              </FlatButton>

            </CardText>

          </Card>

      </div>
    )
  }
}

Instructions.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    type : state.task.payload != undefined? state.task.payload.taskType: null,
    groupType : state.task.payload != undefined? state.task.payload.groupType: null,
  }
}

export default connect(mapStateToProps)(Instructions)
