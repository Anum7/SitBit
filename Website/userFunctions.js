function getUserButtons(containerId) {
    var promises = [];
    var html = "";
    db.collection("usersReport").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
	    promises.push(db.collection("usersReport").doc(doc.id).get());

	    data = doc.data();

	    if(typeof data !== 'undefined') {
		html += "<button onclick='goToUserDataScreen(" + doc.id + ")'> User " + doc.id + "</button>";
	    }
	});

	Promise.all(promises).then(promises=> {
	    document.getElementById(containerId).innerHTML = html;
	})
    })
}

function goToUserDataScreen(user) {
    console.log(user);
    document.cookie = "user = " + user;
    window.location.href = "userData.html";
}
