# Astrolabs NodeJS Project

The node_modules folder is not included in this project folder. You must run
the following code to download the node_modules folder into your working
directory:

```
npm init
```

Once this is done, run the following commands to start the database and server.
Note: For mongoDB, make sure to cd to the directory where the db folder was created.

```
mongod --dbpath /location-of-db-folder
```

```
npm start
```

The server should run at this point and a connection will be open at http://localhost:3000/