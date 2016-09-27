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
      title : 'Explanation of Experimental Structure (No Pay No Attribution)',
      text : 'The experiment will consist of three games. The first two games are idea generation games and will be completed in groups of 5 people. These games will have 3 stages: First there is the Game stage then the Similarity stage, and finally the Favourites stage.'
            +'\nThe format of the first two games is as follows: \n\n'
            +'\nGame 1 & 2 = Completion round, Similarities round, and Favourites round'
            +'\nCompletion Round: First you will be asked to complete the game itself. Though you will be in a group of 5, you will be working on your own to complete the game. You will be asked to generate ideas based on the instructions given to you. All your entries (i.e. ideas) will be shown to the group during the round, and your ranking will be shown at the end of Game 1.'
            +'\nSimilarities Round: Group entries from the Completion Round will be randomly sent to other groups. You will read all of the group’s entries and name any that you think are similar to each other. '
            +'\nAn example of how similarity can be judged will be given, but it is up to each judge to decide whether entries are similar.'
            +'\nIf any entries are found to be similar by at least 2 people in the group then the entry that was entered last will be excluded from the Favourites Round. Thus the original entry will be the only one to advance to the Favourites Round. Remember, only look for similar entries from the list given to you, without taking into account entries from your own group.'
            +'\nThe same rule will apply to your entries from the Completion round. If your entry is seen to be similar to another already existing entry then it will then be excluded from the Favourites.'
            +'\nFavourites Round: You will vote for the favourite entries from the Similarities round. The person whose work was favorited the most is judged to have performed the best, and the person whose was favorited the least is judged to perform the worst.  Players will not be paid based on their performance. The other group will not know how you voted or which entries were thought to be similar and by whom. This means your actions in the first two rounds will have no effect on how others view or favourite your entries in both Games 1&2. '
            +'\nFinal Game: The Final game will be completed individually. No one will be able to see other group members’ entries. '
    },
    1 : {
      title : 'Explanation of Experimental Structure (No Pay and Attribution)',
      text : 'The experiment will consist of three games. The first two games are idea generation games and will be completed in groups of 5 people. These games will have 3 stages: First there is the Game stage then the Similarity stage, and finally the Favourites stage.'
              +'\nYour pay will depend on your performance compared to others in your group.  Your pay will depend on how many “Favourites” you receive compared to others in your group.'
              +'\nThe format of the first two games is as follows: \n\n'
              +'\nGame 1 & 2 = Completion round, Similarities round, and Favourites round'
              +'\nGame 3 = Completion round'
              +'\nCompletion Round: First you will be asked to complete the game itself. Though you will be in a group of 5, you will be working on your own to complete the game. You will be asked to generate ideas based on the instructions given to you. All your entries (i.e. ideas) will be shown to the group during the round with your name next to each of your entries, and a ranking including every participants rank and name will be shown at the end of Game each game.'
              +'\nSimilarities Round: Group entries from the Completion Round will be randomly sent to other groups. You will read all of the group’s entries and name any that you think are similar to each other.'
              +'\nAn example of how similarity can be judged will be given, but it is up to each judge to decide whether entries are similar.'
              +'\nIf any entries are found to be similar by at least 2 people in the group then the entry that was entered last will be excluded from the Favourites Round. Thus the original entry will be the only one to advance to the Favourites Round. Remember, only look for similar entries from the list given to you, without taking into account entries from your own group.'
              +'\nThe same rule will apply to your entries from the Completion round. If your entry is seen to be similar to another already existing entry then it will then be excluded from the Favourites.'
              +'\nFavourites Round: You will vote for the favourite entries from the Similarities round. The person whose work was favorited the most is judged to have performed the best, and the person whose was favorited the least is judged to perform the worst.  Players will not be paid based on their performance. The other group will not know how you voted or which entries were thought to be similar and by whom. This means your actions in the first two rounds will have no effect on how others view or favourite your entries in both Games 1&2.'
              +'\nFinal Game: The Final game will be completed individually. No one will be able to see other group members’ entries.'
    },
    2 : {
      title : 'Explanation of Experimental Structure (Pay and No Attribution)',
      text : 'The experiment will consist of three games. The first two games are idea generation games and will be completed in groups of 5 people. These games will have 3 stages: First there is the Game stage then the Similarity stage, and finally the Favourites stage.'
              +'\nYour pay will depend on your performance compared to others in your group.  Your pay will depend on how many “Favourites” you receive compared to others in your group. The more favourites you have the better your chances of earning more money.'
              +'\nThe format of the first two games is as follows: \n'
              +'\nGame 1 & 2 = Completion round, Similarities round, and Favourites round'
              +'\nGame 3 = Completion round'
              +'\nCompletion Round: First you will be asked to complete the game itself. Though you will be in a group of 5, you will be working on your own to complete the game. You will be asked to generate ideas based on the instructions given to you. All your entries (i.e. ideas) will be shown to the group during the round, and your ranking will be shown at the end of Game 1.'
              +'\nSimilarities Round: Group entries from the Completion Round will be randomly sent to other groups. You will read all of the group’s entries and highlight any that you think are similar to each other. '
              +'\nAn example of how similarity can be judged will be given, but it is up to each judge to decide whether entries are similar.'
              +'\nIf any entries are found to be similar by at least 2 people in the group then the entry that was entered last will be excluded from the Favourites Round. Thus the original entry will be the only one to advance to the Favourites Round. Remember, only look for similar entries from the list given to you, without taking into account entries from your own group.'
              +'\nThe same rule will apply to your entries from the Completion round. If your entry is seen to be similar to another already existing entry then it will then be excluded from the Favourites.'
              +'\nFavourites Round: You will vote for the favourite entries from the Similarities round. The person whose work was favorited the most is judged to have performed the best, and the person whose was favorited the least is judged to perform the worst.  All players will be paid based on their performance. That is, how many favourites they receive relative to others in their group. This means if you are the best in your group you will be paid the most, and the second most favorited the second most etc. The other group will not know how you voted or which entries were thought to be similar and by whom. This means your actions in the first two rounds will have no effect on how others view or favourite your entries in both Games 1&2. '
              +'\nFinal Game: The Final game will be completed individually. No one will be able to see other group members’ entries. '
              +'\nPay:'
              +'\nYour pay is dependent on your performance in the game relative to the performance of others in the group (i.e. if you perform the best you receive the highest reward and so on). The payments are as shown below, from the participant who has the most favourites or scored the most points (1) to the participant who has the fewest favourites or scored the fewest points (5). This is true for all three games. Which means, you have the possibility of earning a maximum of £15 (£5+£5+£5) in addition to the £3 for completing the experiment (max £18 total).'
              +'\nThe below amounts are what participants will be earning in actual pound sterling (£). Below is the reward structure for each game. The best performing participant in each group within a game will earn £5 and the second best £2 etc. \n'
              +'\n1. £5'
              +'\n2. £2'
              +'\n3. £1'
              +'\n4. £0.5'
              +'\n5. £0'
              +'\nThe way the points are scored depends on whether the game is a group game or an individual game. In the group game the more votes or favourites your entry receives the better you perform. If you have the most total favourites over all of your entries you will be judged to have performed the best out of everyone in the group and receive £5. The final game will be completed individually but your performance will be compared to other participants in your group. Perform better than others in your group and you will be awarded £5 if you perform second best you will be rewarded £2 and so on. Performance more information about how performance will be measured will be told to you before the task begins.  '
    },
    3 : {
      title : 'Explanation of Experimental Structure (Pay and Attribution)',
      text : 'The experiment will consist of three games. The first two games are idea generation games and will be completed in groups of 5 people. These games will have 3 stages: First there is the Game stage then the Similarity stage, and finally the Favourites stage.'
              +'\nYour pay will depend on your performance compared to others in your group.  Your pay will depend on how many “Favourites” you receive compared to others in your group. The more favourites you have the better your chances of earning more money.'
              +'\nThe format of the first two games is as follows: '
              +'\nGame 1 & 2 = Completion round, Similarities round, and Favourites round'
              +'\nGame 3 = Completion round'
              +'\nCompletion Round: First you will be asked to complete the game itself. Though you will be in a group of 5, you will be working on your own to complete the game. You will be asked to generate ideas based on the instructions given to you. All your entries (i.e. ideas) will be shown to the group during the round with your name next to each of your entries, and a ranking including every participants rank and name will be shown at the end of Game each game.'
              +'\nSimilarities Round: Group entries from the Completion Round will be randomly sent to other groups. You will read all of the group’s entries and name any that you think are similar to each other. '
              +'\nAn example of how similarity can be judged will be given, but it is up to each judge to decide whether entries are similar.'
              +'\nIf any entries are found to be similar by at least 2 people in the group then the entry that was entered last will be excluded from the Favourites Round. Thus the original entry will be the only one to advance to the Favourites Round. Remember, only look for similar entries from the list given to you, without taking into account entries from your own group.'
              +'\nThe same rule will apply to your entries from the Completion round. If your entry is seen to be similar to another already existing entry then it will then be excluded from the Favourites.'
              +'\nFavourites Round: You will vote for the favourite entries from the Similarities round. The person whose work was favorited the most is judged to have performed the best, and the person whose was favorited the least is judged to perform the worst.  All players will be paid based on their performance. That is, how many favourites they receive relative to others in their group. This means if you are the best in your group you will be paid the most, and the second most favorited the second most etc. The other group will not know how you voted or which entries were thought to be similar and by whom. This means your actions in the first two rounds will have no effect on how others view or favourite your entries in both Games 1&2. '
              +'\nFinal Game: The Final game will be completed individually. No one will be able to see other group members’ entries. '+( true ? 'puta' : 'cerda')
              +'\nPay:'
              +'\nYour pay is dependent on your performance in the game relative to the performance of others in the group (i.e. if you perform the best you receive the highest reward and so on). The payments are as shown below, from the participant who has the most favourites or scored the most points (1) to the participant who has the fewest favourites or scored the fewest points (5). This is true for all three games. Which means, you have the possibility of earning a maximum of £15 (£5+£5+£5) in addition to the £3 for completing the experiment (max £18 total).'
              +'\n'
              +'\n1. £5'
              +'\n2. £2'
              +'\n3. £1'
              +'\n4. £0.5'
              +'\n5. £0'
              +'\nThe way the points are scored depends on whether the game is a group game or an individual game. In the group game the more votes or favourites your entry receives the better you perform. If you have the most total favourites over all of your entries you will be judged to have performed the best out of everyone in the group and receive £5. The final game will be completed individually but your performance will be compared to other participants in your group. Perform better than others in your group and you will be awarded £5 if you perform second best you will be rewarded £2 and so on. Performance more information about how performance will be measured will be told to you before the task begins.'
    },
  },
  alternativeObjectFigural : {
    0: {
    title : 'Line Meanings',
    text : 'The game:\n\n'
          +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of.'
          +'\n	Example:\n\n'
          +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
          +'\nFigure = Flag '
          +'\nDescription = The line could be a side of a flag.'
          +'\nOr '
          +'\nFigure = Box'
          +'\nDescription = The line could be a side of a box'
          +'\n	It should be mentioned that the line will not be as simple and so the description will become more important in these cases.'
          +'\n	Output:\n\n'
          +'\nThis would be seen by others in the following way. '
          +'\nFigure: Flag  '
          +'\nDescription: The line could be a side of a flag.'
          +'\nSo the others in your group see the name of your entry, the figure, and the description of the figure. The judges will be different in every game.'
          +'\nImportant note:\n\n'
          +'\n	There are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
          +'\n	Completion of the Game '
          +'\n1. You will be shown a line and asked to name something it reminds you of.'
          +'\n2. All of the answers which have been submitted in your group can be seen on the right side of your screen, no names of the participants who submitted the expression will be shown, thus the game is completely anonymous.'
          +'\n3. The above will be called the “game round” and it will be 7 minutes long and only be done once.'
          +'\nPayment\n\n'
          +'\nYour pay will not depend on your performance in the game.'
      },
    1: {
    title : 'Line Meanings',
    text : 'The game:\n\n'
          +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. An example line will be shown with the opportunity to practice before we start the game.'
          +'\n	Example:\n\n'
          +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
          +'\nFigure = Flag '
          +'\nDescription = The line could be a side of a flag.'
          +'\nOr '
          +'\nFigure = Box'
          +'\nDescription = The line could be a side of a box'
          +'\n	It should be mentioned that the line will not be as simple and so the description will become more important in these cases.'
          +'\n	Output:\n\n'
          +'\nThis would be seen by others in the following way. '
          +'\nFigure: Flag  '
          +'\nDescription: The line could be a side of a flag.'
          +'\nSo the others in your group see the name of your entry, the figure, and the description of the figure. The judges will be different in every game.'
          +'\nImportant note:\n\n'
          +'\n	There are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
          +'\n	Completion of the Game '
          +'\n1. You will be shown a line and asked to name something it reminds you of.'
          +'\n2. All of the answers which have been submitted in your group can be seen on the right side of your screen along with the names of the participants who submitted the expression will be shown.'
          +'\n3. The above will be called the “game round” and it will be 7 minutes long and only be done once.'
          +'\nPayment\n\n'
          +'\nYour pay will not depend on your performance in the game.'
      },
      2: {
      title : 'Line Meanings',
      text : 'The game:\n\n'
            +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. An example line will be shown with the opportunity to practice before we start the game.'
            +'\n	Example:\n\n'
            +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
            +'\nFigure = Flag '
            +'\nDescription = The line could be a side of a flag.'
            +'\nOr '
            +'\nFigure = Box'
            +'\nDescription = The line could be a side of a box'
            +'\n	It should be mentioned that the line will not be as simple and so the description will become more important in these cases.'
            +'\n	Output:\n\n'
            +'\nThis would be seen by others in the following way. '
            +'\nFigure: Flag  '
            +'\nDescription: The line could be a side of a flag.'
            +'\nSo the others in your group work see your name, the figure, and the description of the figure. '
            +'\nImportant note:\n\n'
            +'\n	There are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
            +'\n	Completion of the Game '
            +'\n1. You will be shown a line and asked to name something it reminds you of.'
            +'\n2. All of the answers which have been submitted in your group can be seen on the right side of your screen, no names of the participants who submitted the expression will be shown, thus the game is completely anonymous.'
            +'\n3. The above will be called the “game round” and it will be 7 minutes long and only be done once.'
            +'\nPayment\n\n'
            +'\nThe payment will depend on popularity of submissions i.e. how many favourites your entries received compared to the others in your group.'
            +'\na. First Place: Most total favourites by a single person in a group receives £5.'
            +'\nb. Second Place: Second in most total favourites by a single person in a group receives £2.'
            +'\nc. Third Place: Third in most total favourites by a single person in a group receives £1.'
            +'\nd. Fourth Place: Fourth in most total favourites by a single person in a group receives £0.5'
            +'\ne. Fifth Place: Fifth in most total favourites by a single person in a group receives £0'
            +'\n\nThe previous example would look like this…'
        },
        3: {
        title : 'Line Meanings',
        text : 'The game:\n\n'
            +'\nThere will be a line shown at the start. Based on this line you will be asked to come up with as many things the line reminds you of. An example line will be shown with the opportunity to practice before we start the game.'
            +'\n	Example:\n\n'
            +'\nIf the line give is a horizontal line, such as, “__________” (simply a horizontal line) then an example of a submission is…\n'
            +'\nFigure = Flag '
            +'\nDescription = The line could be a side of a flag.'
            +'\nOr '
            +'\nFigure = Box'
            +'\nDescription = The line could be a side of a box'
            +'\n	It should be mentioned that the line will not be as simple and so the description will become more important in these cases.'
            +'\n	Output:\n\n'
            +'\nThis would be seen by others in the following way. '
            +'\nFigure: Flag  '
            +'\nDescription: The line could be a side of a flag.'
            +'\nSo the others in your group work see your name, the figure, and the description of the figure. '
            +'\nImportant note:\n\n'
            +'\n	There are no restrictions on what the line can and can’t be a part of but what figure the line is a part of must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
            +'\n	Completion of the Game '
            +'\n1. You will be shown a line and asked to name something it reminds you of.'
            +'\n2. All of the answers which have been submitted in your group can be seen on the right side of your screen along with the names of the participants who submitted the expression will be shown.'
            +'\n3. The above will be called the “game round” and it will be 7 minutes long and only be done once.'
            +'\nPayment\n\n'
            +'\nThe payment will depend on popularity of submissions i.e. how many favourites your entries received compared to the others in your group.'
            +'\na. First Place: Most total favourites by a single person in a group receives £5.'
            +'\nb. Second Place: Second in most total favourites by a single person in a group receives £2.'
            +'\nc. Third Place: Third in most total favourites by a single person in a group receives £1.'
            +'\nd. Fourth Place: Fourth in most total favourites by a single person in a group receives £0.5'
            +'\ne. Fifth Place: Fifth in most total favourites by a single person in a group receives £0'
            +'\n\nThe previous example would look like this…'
          },

  },

  alternativeObject : {
    0: {
      title : 'Instructions for Alternative Objects Task',
      text : 'The Game:\n\n'
                +'\n	The game is to come up with as many alternative objects for a given object.'
                +'\nFor example:'
                +'\nIf the object given is a paper clip this is how you would complete the game.'
                +'\n		Step-By-Step\n\n'
                +'\n1. First you would enter the name of the object in the “object name” field. For example, the alternative object could be a “reset button pressing tool”. '
                +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, a tool that can be used to press reset buttons which can be pressed with your fingers.'
                +'\n3. When you are finished you can press the “submit button” to submit the entry. '
                +'\n4. Your name will not be shown next to your entries so the entries submitted will be anonymous.'
                +'\nThe previous example would look like this…'
                +'\nObject name: Reset button pressing tool'
                +'\nDescription: A tool that can be used to press reset buttons which cannot be pressed with your fingers.'
                +'\n1. This process can be repeated which means that multiple objects/entries can be submitted. You will be able to submit your own entry while also being able to see the entries of your group member simultaneously. The name of the author will be shown next to the submission.'
                +'\n2. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                +'\n3. The above will be called the game round and it will be 7 minutes long.'
                +'\nPayment\n\n'
                +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
                +'\n\nThe previous example would look like this…'
      },
      1: {
        title : 'Instructions for Alternative Objects Task',
        text : 'The Game:\n\n'
                  +'\n	The game is to come up with as many alternative objects for a given object.'
                  +'\nFor example:'
                  +'\nIf the object given is a paper clip this is how you would complete the game.'
                  +'\n		Step-By-Step\n\n'
                  +'\n1. First you would enter the name of the object in the “object name” field. For example, the alternative object could be a “reset button pressing tool”. '
                  +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, a tool that can be used to press reset buttons which can be pressed with your fingers.'
                  +'\n3. When you are finished you can press the “submit button” to submit the entry. '
                  +'\n4. Your name will be shown next to your entries and so each entry will have a known author. '
                  +'\nThe previous example would look like this…'
                  +'\nObject name: Reset button pressing tool'
                  +'\nDescription: A tool that can be used to press reset buttons which cannot be pressed with your fingers.'
                  +'\n1. This process can be repeated which means that multiple objects/entries can be submitted. You will be able to submit your own entry while also being able to see the entries of your group member simultaneously. The name of the author will be shown next to the submission.'
                  +'\n2. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                  +'\n3. The above will be called the game round and it will be 7 minutes long.'
                  +'\nPayment\n\n'
                  +'\nYour pay will not depend on your performance in this game. You will be paid a fixed sum at the end of the experiment.'
                  +'\n\nThe previous example would look like this…'
        },
      2: {
        title : 'Instructions for Alternative Objects Task',
        text : 'The Game:\n\n'
                  +'\n	The game is to come up with as many alternative objects for a given object.'
                  +'\nFor example:'
                  +'\nIf the object given is a paper clip this is how you would complete the game.'
                  +'\n		Step-By-Step\n\n'
                  +'\n1. First you would enter the name of the object in the “object name” field. For example, the alternative object could be a “reset button pressing tool”. '
                  +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, a tool that can be used to press reset buttons which can be pressed with your fingers.'
                  +'\n3. When you are finished you can press the “submit button” to submit the entry. '
                  +'\n4. Your name will not be shown next to your entries so the entries submitted will be anonymous.'
                  +'\nThe previous example would look like this…'
                  +'\nObject name: Reset button pressing tool'
                  +'\nDescription: A tool that can be used to press reset buttons which cannot be pressed with your fingers.'
                  +'\n1. This process can be repeated which means that multiple objects/entries can be submitted. You will be able to submit your own entry while also being able to see the entries of your group member simultaneously. The name of the author will be shown next to the submission.'
                  +'\n2. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                  +'\n3. The above will be called the game round and it will be 7 minutes long.'
                  +'\nPayment\n\n'
                  +'\nThe payment will depend on popularity of submissions i.e. how many favourites your entries received compared to the others in your group.'
                  +'\na. First Place: Most total favourites by a single person in a group receives £5.'
                  +'\nb. Second Place: Second in most total favourites by a single person in a group receives £2.'
                  +'\nc. Third Place: Third in most total favourites by a single person in a group receives £1.'
                  +'\nd. Fourth Place: Fourth in most total favourites by a single person in a group receives £0.5'
                  +'\ne. Fifth Place: Fifth in most total favourites by a single person in a group receives £0'
                  +'\n\nThe previous example would look like this…'
        },
        3: {
          title : 'Instructions for Alternative Objects Task',
          text : 'The Game:\n\n'
                    +'\n	The game is to come up with as many alternative objects for a given object.'
                    +'\nFor example:'
                    +'\nIf the object given is a paper clip this is how you would complete the game.'
                    +'\n		Step-By-Step\n\n'
                    +'\n1. First you would enter the name of the object in the “object name” field. For example, the alternative object could be a “reset button pressing tool”. '
                    +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, a tool that can be used to press reset buttons which can be pressed with your fingers.'
                    +'\n3. When you are finished you can press the “submit button” to submit the entry. '
                    +'\n4. Your name will be shown next to your entries and so each entry will have a known author. '
                    +'\nThe previous example would look like this…'
                    +'\nObject name: Reset button pressing tool'
                    +'\nDescription: A tool that can be used to press reset buttons which cannot be pressed with your fingers.'
                    +'\n1. This process can be repeated which means that multiple objects/entries can be submitted. You will be able to submit your own entry while also being able to see the entries of your group member simultaneously. The name of the author will be shown next to the submission.'
                    +'\n2. All of the entries which have been submitted in your group can be seen on your screen and the participant’s name who submitted the entry will be shown.'
                    +'\n3. The above will be called the game round and it will be 7 minutes long.'
                    +'\nPayment\n\n'
                    +'\nThe payment will depend on popularity of submissions i.e. how many favourites your entries received compared to the others in your group.'
                    +'\na. First Place: Most total favourites by a single person in a group receives £5.'
                    +'\nb. Second Place: Second in most total favourites by a single person in a group receives £2.'
                    +'\nc. Third Place: Third in most total favourites by a single person in a group receives £1.'
                    +'\nd. Fourth Place: Fourth in most total favourites by a single person in a group receives £0.5'
                    +'\ne. Fifth Place: Fifth in most total favourites by a single person in a group receives £0'
                    +'\n\nThe previous example would look like this…'
          },
  },

  similarities : {
    0: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another groups entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people deem the same two entries to be similar to an already existing entry then the entry that was given after the original entry will not be taken into account in the favouriting round. This means that if the entry is disqualified from the favouriting round it cannot be favourited and so will not count toward your earnings.  That is to say that if an answer is deemed to be similar to another existing answer, by two or more people, then the answer that was given after the original will not appear in the favourites round  and so not be taken into account when determining payoffs. Thus no money can be made on ideas which have been seen similar to existing ideas by two or more people. The maximum number of similar ideas to be submitted is 3, so if there are more than 3 ideas which you view as similar ideas then you are asked to prioritise which ideas are more similar than the others.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nRemember that the answers are from another group and will not affect your performance in the task. If two entries are flagged similar then the later entry will be eliminated from the favouriting round.	'
                +'\n\nThe following shows an example of how the different entries will show in the interface. Each row represents each of the entries. On each row, from left to right, each entry has a number, a title and description, and the numbers of the questions it is similar to.',
    },
    1: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another groups entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people deem the same two entries to be similar to an already existing entry then the entry that was given after the original entry will not be taken into account in the favouriting round. This means that if the entry is disqualified from the favouriting round it cannot be favourited and so will not count toward your earnings.  That is to say that if an answer is deemed to be similar to another existing answer, by two or more people, then the answer that was given after the original will not appear in the favourites round  and so not be taken into account when determining payoffs. Thus no money can be made on ideas which have been seen similar to existing ideas by two or more people. The maximum number of similar ideas to be submitted is 3, so if there are more than 3 ideas which you view as similar ideas then you are asked to prioritise which ideas are more similar than the others.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nRemember that the answers are from another group and will not affect your performance in the task. If two entries are flagged similar then the later entry will be eliminated from the favouriting round.	'
                +'\n\nThe following shows an example of how the different entries will show in the interface. Each row represents each of the entries. On each row, from left to right, each entry has a number, a title and description, and the numbers of the questions it is similar to.',
    },
    2: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another groups entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people deem the same two entries to be similar to an already existing entry then the entry that was given after the original entry will not be taken into account in the favouriting round. This means that if the entry is disqualified from the favouriting round it cannot be favourited and so will not count toward your earnings.  That is to say that if an answer is deemed to be similar to another existing answer, by two or more people, then the answer that was given after the original will not appear in the favourites round  and so not be taken into account when determining payoffs. Thus no money can be made on ideas which have been seen similar to existing ideas by two or more people. The maximum number of similar ideas to be submitted is 3, so if there are more than 3 ideas which you view as similar ideas then you are asked to prioritise which ideas are more similar than the others.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nRemember that the answers are from another group and will not affect your performance in the task. If two entries are flagged similar then the later entry will be eliminated from the favouriting round.	'
                +'\n\nThe following shows an example of how the different entries will show in the interface. Each row represents each of the entries. On each row, from left to right, each entry has a number, a title and description, and the numbers of the questions it is similar to.',
    },
    3: {
      title : 'Instructions for Similarity rounds',
      text : 'How you judge another groups entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
              	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people deem the same two entries to be similar to an already existing entry then the entry that was given after the original entry will not be taken into account in the favouriting round. This means that if the entry is disqualified from the favouriting round it cannot be favourited and so will not count toward your earnings.  That is to say that if an answer is deemed to be similar to another existing answer, by two or more people, then the answer that was given after the original will not appear in the favourites round  and so not be taken into account when determining payoffs. Thus no money can be made on ideas which have been seen similar to existing ideas by two or more people. The maximum number of similar ideas to be submitted is 3, so if there are more than 3 ideas which you view as similar ideas then you are asked to prioritise which ideas are more similar than the others.'
                +'\nSome guidelines for what might be “similar” '
                +'\n1. If the entry is not original and is largely expressed in an existing entry.'
                +'\n2. If the entry is an exact copy of an existing entry '
                +'\n\nRemember that the answers are from another group and will not affect your performance in the task. If two entries are flagged similar then the later entry will be eliminated from the favouriting round.	'
                +'\n\nThe following shows an example of how the different entries will show in the interface. Each row represents each of the entries. On each row, from left to right, each entry has a number, a title and description, and the numbers of the questions it is similar to.',
    },
  },
  favourites : {
    0: {
    title : 'Instructions for Favourites rounds',
    text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. How you individually favourite the entries will not be known by the members of the group you are favouriting or even the members of your group. Thus you will be completely anonymous when favouriting.'
            	+'\nEvery groups entries will be favorited and based on the total amount of favourites an individual receives it will determine where they rank within their group and so how much they will be paid. '
              +'\nYou are asked to rank the 5 favourite entries by giving your favourite 5 stars, second favourite 4 starts, etc. thus..'
              +'\n1. First place = 5 Stars'
              +'\n2. Second place = 4 Stars'
              +'\n3. Third place = 3 Stars'
              +'\n4. Fourth place = 2 Stars'
              +'\n5. Fifth place = 1 Star'
              +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
              +'\n\nThe previous example would look like this…',
          },
      1: {
      title : 'Instructions for Favourites rounds',
      text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. How you individually favourite the entries will not be known by the members of the group you are favouriting or even the members of your group. Thus you will be completely anonymous when favouriting.'
                +'\nEvery groups entries will be favorited and based on the total amount of favourites an individual receives it will determine where they rank within their group and so how much they will be paid. '
                +'\nYou are asked to rank the 5 favourite entries by giving your favourite 5 stars, second favourite 4 starts, etc. thus..'
                +'\n1. First place = 5 Stars'
                +'\n2. Second place = 4 Stars'
                +'\n3. Third place = 3 Stars'
                +'\n4. Fourth place = 2 Stars'
                +'\n5. Fifth place = 1 Star'
                +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
                +'\n\nThe previous example would look like this…',
            },
      2: {
      title : 'Instructions for Favourites rounds',
      text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. How you individually favourite the entries will not be known by the members of the group you are favouriting or even the members of your group. Thus you will be completely anonymous when favouriting.'
                +'\nEvery groups entries will be favorited and based on the total amount of favourites an individual receives it will determine where they rank within their group and so how much they will be paid. '
                +'\nYou are asked to rank the 5 favourite entries by giving your favourite 5 stars, second favourite 4 starts, etc. thus..'
                +'\n1. First place = 5 Stars'
                +'\n2. Second place = 4 Stars'
                +'\n3. Third place = 3 Stars'
                +'\n4. Fourth place = 2 Stars'
                +'\n5. Fifth place = 1 Star'
                +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
                +'\n\nThe previous example would look like this…',
            },
      3: {
      title : 'Instructions for Favourites rounds',
      text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. How you individually favourite the entries will not be known by the members of the group you are favouriting or even the members of your group. Thus you will be completely anonymous when favouriting.'
                +'\nEvery groups entries will be favorited and based on the total amount of favourites an individual receives it will determine where they rank within their group and so how much they will be paid. '
                +'\nYou are asked to rank the 5 favourite entries by giving your favourite 5 stars, second favourite 4 starts, etc. thus..'
                +'\n1. First place = 5 Stars'
                +'\n2. Second place = 4 Stars'
                +'\n3. Third place = 3 Stars'
                +'\n4. Fourth place = 2 Stars'
                +'\n5. Fifth place = 1 Star'
                +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
                +'\n\nThe previous example would look like this…',
            },
  },
  math : {
    0 : {
      title : 'Math Game Instructions & Practice Questions',
      text : 'For this game you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\nYour score will only be shown to you and you will not be told the score of other participants.'
              +'\nThe game will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment'
              +'\nYour pay will not depend on your performance in this task.',
    },
    1 : {
      title : 'Math Game Instructions & Practice Questions',
      text : 'For this game you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\nYour name will appear on a ranking of everyone’s performance in the group everyone will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers). The exact score of the participant in your group will be shown also.'
              +'\nThe game will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment'
              +'\nYour pay will not depend on your performance in this task.',
    },
    2 : {
      title : 'Math Game Instructions & Practice Questions',
      text : 'For this game you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\nYour score will only be shown to you and you will not be told the score of other participants.'
              +'\nThe game will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment\n'
              +'\nThe payment will depend on your performance relative to others in you r group. The payment structure is as follows.'
              +'\na. First: the individual with the most correct answers or with the quickest time will receive £5.'
              +'\nb. Second: most correct answers or the second quickest time will receive £2.'
              +'\nc. Third: most correct answers or the second third time will receive £1.'
              +'\nd. Fourth: most popular submission or fourth best performer in the math game will receive £0.5'
              +'\ne. Fifth: most popular submission or fifth best performer in the math game will receive £0',
    },
    3 : {
      title : 'Math Game Instructions & Practice Questions',
      text : 'For this game you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the game is over.'
              +'\nYour name will appear on a ranking of everyone’s performance in the group everyone will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers). The exact score of the participant in your group will be shown also.'
              +'\nThe game will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.'
              +'\n5+43+89+93+4 = 			Correct = 234 '
              +'\n63+7+83+23+14 = 			Correct = 187'
              +'\n35+7+26+73+64 = 			Correct = 215'
              +'\n25+17+7+82+35 = 			Correct = 166'
              +'\nPayment\n'
              +'\nThe payment will depend on your performance relative to others in your group. The payment structure is as follows.'
              +'\na. First: the individual with the most correct answers or with the quickest time will receive £5.'
              +'\nb. Second: most correct answers or the second quickest time will receive £2.'
              +'\nc. Third: most correct answers or the second third time will receive £1.'
              +'\nd. Fourth: most popular submission or fourth best performer in the math game will receive £0.5'
              +'\ne. Fifth: most popular submission or fifth best performer in the math game will receive £0',
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
    let tasktype = this.props.type || '';
    let groupType =  this.props.groupType || '';


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
    type : state.task.payload.taskType,
    groupType : state.task.payload.groupType,
  }
}

export default connect(mapStateToProps)(Instructions)
