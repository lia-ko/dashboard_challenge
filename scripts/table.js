var loadTable = function() {
    d3.csv("affiliatedata.csv").get(function(error, data){
        if (error) {
            console.log("Had an error loading file.");
        }
        
        var dataArray = UtilityModule.formatData(data);
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
