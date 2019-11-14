function exportFunction(fn = 'output') {
    var table = TableExport(document.getElementById('dataTable'), {
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

function pullData(tableId) {
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
    html += "<th width='18%'>Average Sitting Time</th>";
    html += "<th width='18%'>Average Break Number</th>";
    html += "<th width='18%'>Average Break Length</th>";
    html += "<th width='18%'>Average Break Frequency</th>";
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
	    html += "<th>"+currDateStr+"</th>";
	    html += "<th>"+avgSittingTime.toString().substring(0,6)+"</th>";
	    html += "<th>"+avgBreakNum.toString().substring(0,6)+"</th>";
	    html += "<th>"+avgBreakLength.toString().substring(0,6)+"</th>";
	    html += "<th>"+avgBreakFrequency.toString().substring(0,6)+"</th>";
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
