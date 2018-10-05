load_data5 = function() {
    d3.csv("affiliatedata.csv").get(function(error, data){
        if (error) {
            alert("Had an error loading file.");
            console.log(error);
        }
        
        var dataArray = [];
        data.forEach(function(d, i){
            dataArray.push([d.source, d.timestamp, d.user_tag]);                       
        });
        
        var table = d3.select(".table");
        var header = table.append("thead").append("tr");
        header
                .selectAll("th")
                .data(["Source", "Timestamp", "User Tag"])
                .enter()
                .append("th")
                .text(function(d) { return d; });
        
        var tablebody = table.append("tbody");
        rows = tablebody
                .selectAll("tr")
                .data(dataArray)
                .enter()
                .append("tr");
        // We built the rows using the nested array - now each row has its own array.
        
        cells = rows.selectAll("td")
            // each row has data associated; we get it and enter it for the cells.
                .data(function(d) {
                    return d;
                })
                .enter()
                .append("td")
                .text(function(d) {
                    return d;
                });
    });
};
