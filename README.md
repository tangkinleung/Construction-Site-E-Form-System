# SCMS E-Form System Installation Manual

## Introduction
This is an E-From System created by Year 2 Computing Science students from Singapore Institatue of Technology for our Team Project. 
The purpose of creating this E-From system is to replace physical paper forms to streamline the workflow in the construction worksites. This increases operational effciency and reduces storage costs and retrieval time. 

## Integration On Cloud Sever
1. Integration is done with other teams on the Cloud Server
2. Can just proceed to http://159.138.89.74:8000/user/login to login and start!

Else to run our E-From System, please follow steps stated as follows:

## Requirements
1. Install Node.js from the following link: https://nodejs.org/en/
2. Install Visual Studio Code from the following link: https://code.visualstudio.com/
3. Install .Net core 5.0 from the following link: https://dotnet.microsoft.com/en-us/download/dotnet
4. Install postgresSQL from the following link: https://www.postgresql.org/download/
5. Install pgAdmin from the following link: https://www.pgadmin.org/download/pgadmin-4-windows/

### Steps
1. Clone the repository to your local desktop

Frontend
1. Under command prompt key in the following commands:
To open frontend folder
```
cd antd-pro
```
Installation of required package
```
npm install
```
Start the website application
```
npm start
```
### Backend
1. Under command prompt key in the following commands:
To open backend folder
```
cd EFormApi 
```
Install this packages
```
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 5.0.2
dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0.5
dotnet add package Newtonsoft.Json
```
2. Search pgAdmin at the start menu and open the application
3. Add a new server
4. Key in the following details:
![alt text](https://cdn.discordapp.com/attachments/895204534576631869/956514697899814992/unknown.png)
![alt text](https://cdn.discordapp.com/attachments/895204534576631869/956514727180267580/unknown.png)

4. Key the following into the command prompt:
```
dotnet build
dontnet run
```
At the website, you should be able to something like the following: <br>
![alt text](https://cdn.discordapp.com/attachments/895204534576631869/917061721720487976/unknown.png) <br>
Refer to the user manual for more information the details to login, have fun! :)

## Cypress Automated Testing  
1. Under command prompt key in the following commands:
To download Cypress
```
cd antd-pro
```
```
npm install cypress --save-dev
```
2. To start cypress automated testing, key the following into the command prompt:
```
npx cypress open
```
3. Proceed to type in the code for the automated testing!
