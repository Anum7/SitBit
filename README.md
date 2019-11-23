# SitBit

## Release Notes
This product uses HTML, CSS, Javascript, and Firebase Cloudstore. This is the first release of this product. 

This product is intended to provide a way to track sedentary behavior of employees in a workplace. The product is divided into two main components - the SitBit Tracker and the SitBit Researcher's Website.
### SitBit Tracker
The tracker is intended for employees to track their information. After accessing the tracker, they will enter a user id, and click “submit”. This will activate their session. They will then proceed to record their activity throughout the day, by clicking "Sitting" and "Standing" Buttons, whenever they sit and stand respectively. Each time a button is clicked, the time stamp of this click is recorded and stored in Firebase database under the data for that particular user. When they are done for the day, they will click “End Session”. Clicking this button will allow the calculation of multiple parameters for the day - the amount of time spent sitting, the number of breaks, the average length of breaks, and the break frequency. This calculated data is uploaded to the Firebase under each user. 
### SitBit Researcher's Website
The website is intended for researchers to view sedentary information. They will login to the website with their given credentials, and can then proceed to view data for each individual user, or aggregate average data. They will also be able to export this data as a csv file, for any further manipulation. The data will contain all the calculated parameters as described previously. 

Our product addresses common bugs such as:
login authentication
the user will not be able to access the website without logging in
user input error
the user will not be able to record any conflicting data

##Install Guide  
### Downloads
The application runs as a website app on a desktop - no prior downloading of software/hardware is required. The GitHub repository must be downloaded as a zip file onto the local desktop, and then unzipped.
### SitBit Tracker Users
In order to use the tracker, post-downloading the repository, a user would navigate within the folder to WebApp/SitBit/index.html. Opening this file will redirect a user to the website where they will enter their assigned employee id, and click Submit. This step must be done first. Then, the user can click on "Sitting", when they begin to sit, and "Standing", when they begin to stand. Once a user is done for the day, he/she should close the website. If the user accidentally closes the website before the end of the day, when they reopen the website, they must click "Sitting" first--even if momentarily.
### SitBit Researcher's Website Users
In order to use the tracker, post-downloading the repository, a user would navigate within the folder to WebSite/login.html. Opening this file will redirect a user to the website where they will enter their login information. The login information for a researcher will be given directly to the client.  Other pages in the website will not be accessible, unless the researcher logs in. In order to ensure maximum security, the researcher should log out every time they use the website.
### Firebase
The admin (client) will be given authentication to access Firebase. This is only to be used if certain data absolutely needs to be modified. Only the developers and the client will have access to the Firebase information. Once logged into Firebase, the admin must click "Go to Console", then "SitBit", then "Database". From here the admin can see the users and the userReport and navigate to the specific user that they wish to modify. 
### Troubleshooting
If a user makes an irrevocable mistake in recording their data, they can report this to an admin. This would include entering incorrect employee id, or entering the wrong sitting/standing information. The admin will be able to access the Firebase and modify/delete the tainted data, only if this proves necessary. 
 
