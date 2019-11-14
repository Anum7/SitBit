function getUserButtons(containerId) {
    var promises = [];
    var html = "";
    db.collection("usersReport").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
	    promises.push(db.collection("usersReport").doc(doc.id).get());

	    data = doc.data();

	    if(typeof data !== 'undefined') {
		html += "<button onclick='pullUserData(\"" + doc.id.toString() + "\", \"tbl\")'> User " + doc.id + "</button>";
	    }
	});

	Promise.all(promises).then(promises=> {
	    console.log(html);
	    document.getElementById(containerId).innerHTML = html;
	})
    })
}
