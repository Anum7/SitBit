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
	    arr = data.dataArr;

	    if(typeof arr !== 'undefined') {
		dataList.push(arr);
	    }
	});

	Promise.all(promises).then(promises=> {
	    createAvgDataTable(dataList, tableId);
	})
    })
}

function createAvgDataTable(collec, tableId) {
    console.log(collec);
    var dateList = new Map();
    for(const entry of collec) {
	if(!(dateList.has(entry[0]))) {
	    var userList = [entry];
	    dateList.set(entry[0], userList);
	} else {
	    /*var userList = dateList.get(entry[0]);
	    userList.push(entry);
	    dateList.set(entry[0], userList);
	    */
	    dateList.get(entry[0]).push(entry);
	}
    }
    console.log(dateList);

    var html = "";
    html += "<table id='dataTable' style='margin-bottom:1cm'>";
    html += "<tr>";
    html += "<th width='28%'>Date</th>";
    html += "<th width='18%'>Average Sitting Time</th>";
    html += "<th width='18%'>Average Break Number</th>";
    html += "<th width='18%'>Average Break Length</th>";
    html += "<th width='18%'>Average Break Frequency</th>";
    html += "</tr>";

    for(const [date, entries] of dateList) {
	var avgSittingTime = 0;
	var avgBreakNum = 0;
	var avgBreakLength = 0;
	var avgBreakFrequency = 0;
	for(const entry of entries) {
	    avgSittingTime += entry[1];
	    avgBreakNum += entry[2];
	    avgBreakLength += entry[3];
	    avgBreakFrequency += entry[4];
	}
	avgSittingTime /= entries.length;
	avgBreakNum /= entries.length;
	avgBreakLength /= entries.length;
	avgBreakFrequency /= entries.length;
	
	html += "<tr>";
	html += "<th>"+date+"</th>";
	html += "<th>"+avgSittingTime.toString().substring(0,6)+"</th>";
	html += "<th>"+avgBreakNum.toString().substring(0,6)+"</th>";
	html += "<th>"+avgBreakLength.toString().substring(0,6)+"</th>";
	html += "<th>"+avgBreakFrequency.toString().substring(0,6)+"</th>";
	html += "</tr>";
    }	
	
    html += "</table>";

    html += "<img src='Export.png' onclick=\"exportFunction('dataTable', 'data_output')\" style='cursor:pointer'></img>";

    document.getElementById(tableId).innerHTML = html;
}
