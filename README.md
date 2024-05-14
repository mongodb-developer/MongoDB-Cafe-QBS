# MongoDB-cafe-QBS web app
Please note: This is the web app version developed using the Realm Web & Atlas Device Sync (Preview)

# Description:
This web app share the same theme with MongoCoffeeMenu. The app was built based on Realm Web(https://www.npmjs.com/package/realm-web) and Atlas Device Sync (Web SDK Preview)(https://www.mongodb.com/docs/realm/web/sync/#get-started-with-realm-web---atlas-device-sync--preview-).
The app works as a very simple coffee conusmption calculator that allows the user to select what coffee they had during the day. The major difference between this web app and MongoCoffeeMenu is that this app takes advantage of Device sync(Flexible sync) and syncs total coffee consumption with the backend automatically. The user no longer need a button to manually trigger data sync. 
![](https://github.com/mongodb-developer/MongoDB-Cafe-QBS/blob/main/Screenshot%202024-05-14%20at%2016.32.46.png)

## Components:
1. Realm Web v2.0.0 [https://www.npmjs.com/package/realm-web]
2. MongoDB Device Sync for Web SDK [https://www.mongodb.com/docs/realm/web/sync/].
3. MongoDB Atlas. *For this example app, I am using a M0 free tier cluster. To get a free cluster please visit https://www.mongodb.com/cloud/atlas/register.

## Useful commands:
1. npm install: After downloading the app please use this command in terminal to install the necessary dependencies.
2. npm start: Use this command to start the web app

## Use cases:
- Quickly preview how does Device Sync works using this easy to setup demo app therefore anonymous login method is used here to simplify the app's structure.
- Reproduce Web SDK sync related issues. 
