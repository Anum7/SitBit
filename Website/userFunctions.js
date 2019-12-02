function getUserButtons(containerId) {
    var promises = [];
    var html = "";

    db.collection("usersReport").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
	    promises.push(db.collection("usersReport").doc(doc.id).get());

	    data = doc.data();

	    if(typeof data !== 'undefined') {
		html += "<li><a href=\"#\" onclick='pullUserData(\"" + doc.id.toString() + "\", \"tbl\")'> User " + doc.id + "</a></li>";
	    }
	});

	Promise.all(promises).then(promises=> {
	    document.getElementById(containerId).innerHTML += html;
	})
    })
}

function filterUsers() {
    var search_text = document.getElementById("searchBar").value.toUpperCase();
    var entries = document.getElementById("users_list").getElementsByTagName("li");

    for(const entry of entries) {
	var text = entry.getElementsByTagName("a")[0].innerText;
	if(text.toUpperCase().includes(search_text)) {
	    entry.style.display = "";
	} else {
	    entry.style.display = "none";
	}
    }
}
