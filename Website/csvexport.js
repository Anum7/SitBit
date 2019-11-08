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
/*
<script>
      function exportFunction() {
	  var table = TableExport(document.getElementById('tblData'), {
	      headers: true,
	      footers: true,
	      formats: ["csv"],
	      filename: 'output',
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
	  var csvData = exportData.tblData.csv;
	  table.export2file(csvData.data, csvData.mimeType, csvData.filename, csvData.fileExtension, csvData.merges, csvData.RTL, csvData.sheetname);
      }
    </script>*/
