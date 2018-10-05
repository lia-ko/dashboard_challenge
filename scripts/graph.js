d3.csv("affiliatedata.csv").get(function(error, data){
    //checking if there is an error reading the file
    if (error) {
        alert("Had an error loading file.");
        console.log(error);
    }
    

    //////Preliminary data processing --------------------------
    var dataArray = UtilityModule.formatData(data);

    //process timestamps
    var ts = UtilityModule.parseTimestamps(data);
    var days = ts.days;
    var hours = ts.hours;
    
    /////Drawing Charts ----------------------------
    //user counts based on tags
    var tags_info = _.groupBy(data, function(b) { return b.user_tag})
    var tagCounts = UtilityModule.getDictLen(tags_info);
    new Chart(document.getElementById("bar-chart-horizontal"), {
        type: 'horizontalBar',
        data: {
            labels: tagCounts.keys,
            datasets: [{
                label: "User Tags",
                backgroundColor: ["#D80032", "#BFC0C0", "#EDF2F4", "#8D99AE","#4F5D75","#8D99AE","#EF233C","#2D3142", "#EF8354"],
                data: tagCounts.values
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Volume of Sources'
            }
        }
    });

    //source counts distribution
    var origin_sources = _.groupBy(data, function(b) { return b.source})
    var sourceCounts = UtilityModule.getDictLen(origin_sources);
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
            labels: sourceCounts.keys,
            datasets: [{
                label: "Sources",
                backgroundColor: ["#2B2D42","#8D99AE","#EDF2F4"],
                data: sourceCounts.values
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Source of the visit'
            }
        }
    });
    
    //traffic volume by day of the week
    var day_week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var trafficDoW = UtilityModule.getDictLenGeneric(days);
    trafficDoW.keys = trafficDoW.keys.map(function(day){
        return day_week[+day];
    });
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: trafficDoW.keys,
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#FFB4A2","#E5989B","#B5838D","#6D6875"],
                data: trafficDoW.values
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Traffic on Days of the Week'
            }
        }
    });
    
    //traffic volume by hours of the day
    var trafficByHours = UtilityModule.getDictLenGeneric(hours);
    new Chart(document.getElementById("line-chart"), {
        type: 'line',
            data: {
                labels: trafficByHours.keys,
                datasets: [{ 
                    data: trafficByHours.values,
                    label: "Visits",
                    borderColor: "#6D6875",
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Hours that get the most activity'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }   
                    }]
                }
            }
    });

});