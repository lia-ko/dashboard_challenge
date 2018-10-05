//Utility Functions
var UtilityModule = (function(window, undefined) {
    
    //formatting dictionary data into 2 sync arrays
    var getDictLen = function(dict) {
        var dictKeys = [];
        var dictValues = [];
       for (var dkey in dict){
            dictKeys.push(dkey);
            dictValues.push(dict[dkey].length);
        }
        return {keys: dictKeys, values: dictValues};
    };
    
    var getDictLenGeneric = function(dict) {
        var temp = _.groupBy(dict, function(b) {return b});
        return getDictLen(temp);
    }
    
    //converting string to Date for available format "YYYY-MM-DD HH:mm:ss"
    var toDate = function(strDate) {
        return new Date(Date.parse(strDate.replace(" ", "T") + ".000"));
    }
    
    //get days and hours from timestamps
    var parseTimestamps = function(data) {
        var days = [];
        var hours =[];
        
        var timestamp_info = _.groupBy(data,function(b) {return b.timestamp});
        for(var ts in timestamp_info) {
            var dt = toDate(ts);
            days.push(dt.getDay());
            hours.push(dt.getHours());
        }
        
        return {days: days, hours: hours};
    }
    
    //formatting data into three columns array of arrays
    var formatData = function(data) {
        var result = [];
        data.forEach(function(d, i){
            result.push([d.source, d.timestamp, d.user_tag]);                       
        });
    
        return result;
    }

    return {
        getDictLen: getDictLen,
        getDictLenGeneric: getDictLenGeneric,
        toDate: toDate,
        parseTimestamps: parseTimestamps,
        formatData: formatData,
    };
})(window);

