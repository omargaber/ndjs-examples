# FSNDJS Week 6 Exercise

This repository is to be the reference for the FSNDJS Storefront Project mock up.

## Installing the dependencies
At first, you need to install the node packages to start working on your project.

```
npm run install
```

## Understanding the structure of your project.
You need to identify what folders are going to be used for which purpose.


## Running migrations
You need to be able to draw up your migrations to reflect onto your database.
This is an example of a banking service. During the session you are required to create a table for the users.

Run this command to be able to create the migrations files.

```
db-migrate create users-table --sql-file
```

You also need to configure your ```.env``` file so that you're able to apply the migrations to your database. To do so, take the following steps:
- Create a file called ```.env``` in the root directory of the application.
- Copy the content of the ```.env_template``` file to your newly created ```.env``` file.
- Modify the database name and credentials to those of your machine

To run the migrations, execute the following command:

```
db-migrate up
```

Make sure the tables were created on the database you configured in your ```.env``` file by either using ```pgAdmin``` or the psql CLI.



## Creating models and interfacing layer.
- In your models file, create a file for the resource user that you created a table for in your db.
- Create an object with the attributes to match that of the table as shown below. The attributes of that object should match those of your db table. You are free to use whatever attributes you see fit, but you'd want to include attributes to save user credentials.

```typescript

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    balance: number;
    email: string;
    password: string;

}
```
- Create a class that would include the main CRUD operations. This class should make use of the Pool connections that are going to be demonstrated in the session. The CRUD operations should primarily be:
    - index()
    - show()
    - create
    - update()
    - delete()
    
    You could also have an authenticate method in this store to generate a token for the user. Reach out to the SL in case you need aid with this method.
    
    The following is an example of the index route:
    ```typescript
    export class UserStore {
        async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const query = `SELECT * FROM users`
            const result = await conn.query(query)
            conn.release()
            return result.rows
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`)
        }
    }
    }
    ```
- Don't forget to import the bcrypt password salt and pepper so that when you are saving the user password in your db, it won't be plaintext.

- Hint on partial updates: Search the internet for the COALESCE postgres function. This has lower priority


## Creating your handlers
In your handlers folder, create a file for the user routes that would call on the interfacing class and its methods you created for your model. Make sure you are returning a token on the login or create handler.

Make sure you apply a middleware function to verify the authentication token provided on the appropriate routes. A helper middleware function can be found in ```middleware/global.ts```

In your handler file, create a function called ```user_routes``` that takes on the express app as a parameter and use it to register all the created handler endpoints as shown in your classroom. Export that function ```user_routes``` so that you can use it in your ```server.ts``` file.


## Creating tests.
In your testing folder create specs for testing your work. You could maybe check if certain handlers and methods are defined or not. Maybe try sending a request without a token and check if its returned with an 4xx status code.
Few examples that you could take as reference from your lessons is at ```Lesson 3 module 17```

## NPM Scripts
We are going to address the environment differences that could face you when writing the scripts during the session.