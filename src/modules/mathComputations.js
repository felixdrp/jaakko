
export default function processMathResults(data,accounts) {

            if( data == null ){
              return
            }

            var results = data.reduce(
              (prev, current) => {
                    let account = accounts[current.accountId]
                    var currentEntry = { account : {email: current.accountId, firstname: account.firstName, surname: account.surname },  mathScore: 0, lastTimeSubmitted: current.endTimestamp }

                    var res = current.surveyData.numbers.reduce(
                        (prev, currentNumbers ) => {
                          if (currentNumbers.solution){
                            if ( (currentNumbers.solution+'').trim() == (currentNumbers.sum+'').trim()){
                              prev.total++;
                              prev.lastTimeSubmitted = currentNumbers.timeSubmitted > prev.lastTimeSubmitted ?  currentNumbers.timeSubmitted : prev.lastTimeSubmitted
                            }
                          }
                          return prev
                      },{total:0,lastTimeSubmitted:0})

                    currentEntry.mathScore = res.total;
                    currentEntry.lastTimeSubmitted = res.lastTimeSubmitted;

                    prev.push(currentEntry)
                    return prev;
              },
              []
            );

           data = results;
            //debugger;

          data.sort(function(a, b){
            return b.mathScore-a.mathScore
          });

          data.map((item,i) => {item.rank = (i+1); item.pay = getPay(i+1);});

          return data;
  }


function getPay(i){
    switch (i) {
      case 1:
        return 5;
      case 2:
        return 2;
      case 3:
        return 1;
      case 4:
        return 0.5;
      case 5:
        return 0;
      default:
        return 0;
    }
  }
