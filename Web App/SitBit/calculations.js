         //disable buttons not in use
         
         // current user ID
         var idBox;
         
         //get current timestamp (to add for shorter standing arrays - NEED TO FIX TO MAKE SURE THAT WE ARE ADDING AN AGREED UPON "LAST TIME" - 5:00 for example)
         var time = new Date()
         var date = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
         var currTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
         var lastTime = (date + " " + currTime).split(" ");
         
         // End Session
         function startSession() {
          if (document.getElementById("idBox").value == "") {
            window.alert("Please enter a valid Employee ID.");
          } else {
            window.alert("You may now begin recording your data.");
            document.getElementById("idBox").disabled = true;
            document.getElementById("sitting").disabled = false;
            document.getElementById("endSession").disabled = false;
          }
         }

         // create reference to firebase, pull current data and display
         function loadDatabase() {
           db.collection("usersReport").get().then(function(querySnapshot) {
             querySnapshot.forEach(function(doc) {
               db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("sitting").get().then(function(sittingDoc) {
                  db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("standing").get().then(function(standingDoc) {
         
                     console.log(sitting);
                     console.log(standing);
                     sitting = sittingDoc.data().data;
                     standing = standingDoc.data().data;
                     console.log("---");
                     console.log(sitting);
         
                     var sittingArr = [];
                     for (var key in sitting) {
                         var value = sitting[key];
                         console.log(value);
                         var x = value.split(" ");
                         sittingArr.push(x);
                     }
         
                     console.log("sitting");
                     console.log(sittingArr);
         
                     var standingArr = [];
                     for (var key in standing) {
                         var value = standing[key];
                         var x = value.split(" ");
                         standingArr.push(x);
                     }
         
                     //everytime database loads, for each user, do calculations
         
                     // if standing is less (they forgot to push once, assuming only ONCE)
                     while (standingArr.length < sittingArr.length) {
                         standingArr.push(lastTime);
                         // need to push a new time each time
                     }
         
         
                     var sittingTime = 0
                     var standSec = 0;
                     var breakTime = 0;
                     var startTime = 0;
                     var endTime = 0;
                     var breakNum = sittingArr.length - 1;
         
         
                     for (var i = 0; i < sittingArr.length; i++) {
                         var sit = sittingArr[i][1];
                         var sitTime = sit.split(":")
                         var stand = standingArr[i][1];
                         var standTime = stand.split(":")
         
                         var sitSec = (parseInt(sitTime[0]) * 3600) + parseInt(sitTime[1] * 60) + parseInt(sitTime[2]);
         
                         if (i > 0) {
                             breakTime += sitSec - standSec;
                         }
         
                         var standSec = (parseInt(standTime[0]) * 3600) + parseInt(standTime[1] * 60) + parseInt(standTime[2]);
         
                         if (i == 0) {
                             startTime = sitSec;
                         }
         
                         if (i == sittingArr.length - 1) {
                             endTime = standSec;
                         }
         
                         sittingTime += standSec - sitSec;
                     }
         
                     // total sedentary time
                     console.log("sitting time: " + sittingTime);
         
                     //number of breaks
                     console.log("break number: " + breakNum);
         
                     //average break length
                     var avgBreakLen = (breakTime / breakNum);
                     console.log("break length: " + avgBreakLen);
         
                     //break frequency
                     var freq = (endTime - startTime) / (breakNum + 1);
                     console.log("break frequency: " + freq);
         
                     var dataArr = [];
                     dataArr.push(sittingTime);
                     dataArr.push(breakNum);
                     dataArr.push(avgBreakLen);
                     dataArr.push(freq);
         
                     console.log("FINAL: " + dataArr);
                     db.collection("usersReport").doc(document.getElementById("idBox").value).update({
                        [date]: dataArr
                     });
         
                  });
               });
         
             });
           });
           window.alert("We have recorded your sedentary time for today. You may now close the window.");
         };
         
         
         // add current user info to firebase (sitting)
         function sitting() {
             document.getElementById("sitting").disabled = true;
             document.getElementById("sitting").style.border = "thick solid #e35954"; //red
             document.getElementById("standing").disabled = false;
             document.getElementById("standing").style.border = "10px solid #1c8adb"; //original blue
             //get current time
             var time = new Date()
             var date = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
             var currTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
             var currDate = date + " " + currTime;
         
         
             db.collection("users").doc(document.getElementById("idBox").value).get().then(function(data) {
               if (data.exists) {
                 // See if the sitting and standing documents for curr date exist
                  db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("sitting").get().then(function(data) {
                                   console.log("!0");
         
                   if (data.exists) {
                     console.log("!1");
                     db.collection("users")
                       .doc(document.getElementById("idBox").value)
                       .collection(date)
                       .doc("sitting")
                       .update({
                         data: firebase.firestore.FieldValue.arrayUnion(date + " " + currTime)
                       });
                   } else {
                     //creating a doc under the date collection
                     db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("sitting").set({
                       data: [currDate]
                     });
                     db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("standing").set({
                       data: []
                     });
                   }
                  });
         
               } else {
                 var name = "test";
                 db.collection("users").doc(document.getElementById("idBox").value).set({
                   name: "test"
                 });
                 db.collection("usersReport").doc(document.getElementById("idBox").value).set({
                   name: "test"
                 });
                 sitting();
               }
             });
         };
         
         // add current user info to firebase (sitting)
         function standing() {
         
             document.getElementById("standing").disabled = true;
             document.getElementById("standing").style.border = "thick solid #e35954"; //red
             document.getElementById("sitting").disabled = false;
             document.getElementById("sitting").style.border = "10px solid #1c8adb"; //original blue
             //get current time
             var time = new Date()
             var date = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
             var currTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
             var currDate = date + " " + currTime;
         
         
             db.collection("users").doc(document.getElementById("idBox").value).get().then(function(data) {
               if (data.exists) {
                 // See if the sitting and standing documents for curr date exist
                  db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("sitting").get().then(function(data) {
                                   console.log("!0");
         
                   if (data.exists) {
                     console.log("!1");
                     db.collection("users")
                       .doc(document.getElementById("idBox").value)
                       .collection(date)
                       .doc("standing")
                       .update({
                         data: firebase.firestore.FieldValue.arrayUnion(date + " " + currTime)
                       });
                   } else {
                     //creating a doc under the date collection
                     db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("sitting").set({
                       data: []
                     });
                     db.collection("users").doc(document.getElementById("idBox").value).collection(date).doc("standing").set({
                       data: [currDate]
                     });
                   }
                  });
         
               } 
             });
         };