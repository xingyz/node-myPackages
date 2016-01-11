# node-myPackages
A small web app and Rest API when I learnt express.js and mongodb. I chose mongodb and mongoose because JSON based database is easier to work 
with javascript, and the package information requires more flexibility in the schema.

To view all packages in JSON: /api/kuaidi<br>
To view all students in JSON: /api/student<br>
To create a new package in API : POST /api/kuaidi<br>
To create a new student in API : POST /api/student<br>
To update an existing package: PUT /api/kuaidi/:id<br>
To view an existing package: /api/kuaidi/:id<br>

<b>more work to be done</b>:<br>
secure app with user authentication and secure api with web tokens<br>
consider using Redis to store tokens for scalability issues.

Home:
![alt tag](https://raw.githubusercontent.com/xingyz/node-myPackages/master/images/overview.png)
Details:
![alt tag](https://raw.githubusercontent.com/xingyz/node-myPackages/master/images/details.png)



