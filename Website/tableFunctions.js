function exportFunction(tableId, fn = 'output') {
    var table = TableExport(document.getElementById(tableId), {
	headers: true,
	footers: true,
	formats: ["csv"],
	filename: fn,
	bootstrap: false,
	exportButtons: false,
	position: "bottom",
	ignoreRows: null,
	ignoreCols: null,
	trimWhitespace: true,
	RTL: false,
	sheetname: "id"
    });
    var exportData = table.getExportData();
    console.log(exportData);
    var csvData = exportData.dataTable.csv;
    table.export2file(csvData.data, csvData.mimeType, csvData.filename, csvData.fileExtension, csvData.merges, csvData.RTL, csvData.sheetname);
}

function pullAvgData(tableId) {
    var dataList = [];
    var promises = [];
    db.collection("usersReport").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
	    promises.push(db.collection("usersReport").doc(doc.id).get());

	    data = doc.data();

	    if(typeof data !== 'undefined') {
		dataList.push(data, tableId);
	    }
	});

	Promise.all(promises).then(promises=> {
	    createAvgDataTable(dataList, tableId);
	})
    })
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function createAvgDataTable(collec, tableId) {
    var currDate = new Date("11/10/2019");
    var todayDate = new Date();

    var html = "";
    html += "<table id='dataTable' style='margin-bottom:1cm'>";
    html += "<tr>";
    html += "<th width='28%'>Date</th>";
    html += "<th width='18%'>Average Sitting Time (minutes)</th>";
    html += "<th width='18%'>Average Number of Breaks</th>";
    html += "<th width='18%'>Average Break Length (minutes)</th>";
    html += "<th width='18%'>Average Time Between Breaks (minutes)</th>";
    html += "</tr>";
    
    while(true) {
	var currDateStr = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate();

	var currDateList = [];
	
	for(const entry of collec){
	    if(typeof entry[currDateStr] !== 'undefined') {
		currDateList.push(entry[currDateStr]);
	    }
	}

	if(currDateList.length > 0) {
	    console.log(currDateList);
	    var avgSittingTime = 0;
	    var avgBreakNum = 0;
	    var avgBreakLength = 0;
	    var avgBreakFrequency = 0;
	    for(const entry of currDateList) {
		avgSittingTime += entry[0];
		avgBreakNum += entry[1];
		avgBreakLength += entry[2];
		avgBreakFrequency += entry[3];
	    }
	    avgSittingTime /= currDateList.length;
	    avgBreakNum /= currDateList.length;
	    avgBreakLength /= currDateList.length;
	    avgBreakFrequency /= currDateList.length;

	    html += "<tr>";
	    html += "<td>"+currDateStr+"</td>";
	    html += "<td>"+avgSittingTime.toString().substring(0,7)+"</td>";
	    html += "<td>"+avgBreakNum.toString().substring(0,7)+"</td>";
	    html += "<td>"+avgBreakLength.toString().substring(0,7)+"</td>";
	    html += "<td>"+avgBreakFrequency.toString().substring(0,7)+"</td>";
	    html += "</tr>";
	}



	var todayDateStr = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate();
	
	if(currDateStr === todayDateStr) {
	    break;
	}
	currDate = addDays(currDate, 1);
    }

    html += "</table>";
    html += "<img src='Export.png' onclick=\"exportFunction('dataTable', 'data_output')\" style='cursor:pointer'></img>";

    document.getElementById(tableId).innerHTML = html;
}

function pullUserData(user, tableId) {
    var dataList;
    var promises = [];
    db.collection("usersReport").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
	    promises.push(db.collection("usersReport").doc(doc.id).get());

	    if(doc.id.toString() === user) {
		dataList = doc.data();
	    }
	});

	Promise.all(promises).then(promises=> {
	    createUserDataTable(user, dataList, tableId);
	})
    })
}

function createUserDataTable(user, collec, tableId) {
    var currDate = new Date("11/10/2019");
    var todayDate = new Date();

    var html = "";
    html += "<table id='dataTable' style='margin-bottom:1cm'>";
    html += "<tr>";
    html += "<th width='28%'>Date</th>";
    html += "<th width='18%'>Sitting Time (minutes)</th>";
    html += "<th width='18%'>Number of Breaks</th>";
    html += "<th width='18%'>Break Length (minutes)</th>";
    html += "<th width='18%'>Time Between Breaks (minutes)</th>";
    html += "</tr>";
    
    while(true) {
	var currDateStr = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate();

	//if(typeof collec[currDateStr] !== 'undefined') {
	if(currDateStr in collec) {
	    var entry = collec[currDateStr];
	    html += "<tr>";
	    html += "<td>"+currDateStr+"</td>";
	    html += "<td>"+entry[0].toString().substring(0,7)+"</td>";
	    html += "<td>"+entry[1].toString().substring(0,7)+"</td>";
	    html += "<td>"+entry[2].toString().substring(0,7)+"</td>";
	    html += "<td>"+entry[3].toString().substring(0,7)+"</td>";
	    html += "</tr>";
	}
	
	var todayDateStr = todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate();
	
	if(currDateStr === todayDateStr) {
	    break;
	}
	currDate = addDays(currDate, 1);
    }

    html += "</table>";
    html += "<img src='Export.png' onclick=\"exportFunction('dataTable', 'user_" + user + "_data')\" style='cursor:pointer'></img>";

    document.getElementById(tableId).innerHTML = html;
}
