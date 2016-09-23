export default function processSimilarities(data) {


    data.sort(function(a, b){
        return a.timeSubmitted-b.timeSubmitted
    });

    var simStore = {};

    for ( var e in data ){
      var entry = data[e]
      if ( entry.similarTo.length > 0){
        for ( var s in entry.similarTo){
          var similar = entry.similarTo[s];
          simStore = registerSimilarity(simStore,entry.id,similar)
        }
      } else {
        simStore[entry.id] = [];
      }
    }
    debugger;
    return filterSimilars(data, simStore);
  }

var filterSimilars = (data, simStore) => {
    var keyMappings = [];

    for ( var entryid in simStore ){
      var ids = [entryid]

      for (var o in simStore[entryid] ){
        var option = simStore[entryid][o]
        if ( (option.count/2) > 1 ){  // add those that have been flagged as similar twice or more. Divided by two because a = b as b = a
          ids.push(option.id)
        } else {
          keyMappings.push([option.id])
        }
      }


      keyMappings.push(ids.slice());
      ids = [];
    }

    var repeat = false;
    while (true){
      for ( var k in keyMappings){
        for ( var j in keyMappings){

          if ( k == j){
            continue;
          }
          if( anyCommonId (keyMappings[k], keyMappings[j] ) ){

            var first;
            var second;
            if (j > k){
              second = keyMappings.splice(j,1)[0]
              first  = keyMappings.splice(k,1)[0]
            } else {
              first  = keyMappings.splice(k,1)[0]
              second = keyMappings.splice(j,1)[0]
            }

            var joined = [];

            for ( var e in first ) {
                if ( joined.indexOf(first[e]) < 0){
                  joined.push(first[e]);
                }
            }

            for ( var e in second ) {
                if ( joined.indexOf(second[e]) < 0){
                  joined.push(second[e]);
                }
            }

            keyMappings.push(joined)
            repeat = true;
          }
        }
      }
      if ( repeat ){
        repeat = false;

      } else {
        break;
      }
    }

    var filteredData = [];

    for ( var m in keyMappings){
      var selectedEntry;
      for ( var i in keyMappings[m]){

        if( !selectedEntry ){
          selectedEntry = getEntry(data,keyMappings[m][i]);
        } else {
          if (selectedEntry.timeSubmitted > getEntry(data,keyMappings[m][i]).timeSubmitted ){
            selectedEntry.similarityHide = true;
            filteredData.push(selectedEntry);
            selectedEntry = getEntry(data,keyMappings[m][i]);
          }else {

            getEntry(data,keyMappings[m][i]).similarityHide = true;
            filteredData.push(getEntry(data,keyMappings[m][i]));
          }

        }
      }

      filteredData.push(selectedEntry);
      selectedEntry = null;
    }


    //console.log(JSON.stringify(keyMappings));
    return filteredData;
  }

var anyCommonId = (ids1, ids2 ) =>{
    for ( var i in ids1 ){
      for ( var j in ids2 ){
        if( ids1[i] == ids2[j] ){
          return true;
        }

      }
    }
    return false;
  }

  /**
  * Gets the first entry record that matches entryid. Since multiple definitions for the same entry will be present as it will come replicated from the different users.
  */
var  getEntry = (data,entryid) => {
    for( var e in data){
      var entry  = data[e]

      if ( entry.id == entryid){
        return entry;
      }
    }

    return null; // this should never happen!
  }

var registerSimilarity = (similaritiesStore, entry1, entry2) => {

    var first = entry1 < entry2 ? entry1 : entry2
    var second = entry1 < entry2 ? entry2 : entry1

    if ( !similaritiesStore[first] ){
      similaritiesStore[first] = [{id : second, count : 1}]
    } else {
      var found = false;
      for ( var o in similaritiesStore[first] ){
          var option = similaritiesStore[first][o]
          if( option.id == second ){
              option.count++;
              found = true;
              break;
          }
      }
      if ( !found ){
        similaritiesStore[first].push({id : second, count : 1});
      }

    }

    return similaritiesStore;
  }
