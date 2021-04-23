## About Diaries app

The purpose of this web application is to maintain diaries. It is developed as a practice and example to serveless solutions. The front-end implementation is based on ReactJS, preferring functional components, hooks and a combination of context and useReduce for state management. The back-end is JS in the form of Lambda functions and uses a MongoDB database.

## A short description

Diaries app supports multiple `users` and each one of them creates and maintains multiple `diaries`. A diary contains three types of `entries` (notes, payments, workouts) with more specific data fields per type. Payments are categorized to `genres` and `funds` and also workouts to `genres` and `equips`. All these categorizations are defined and organized dynamically by the user. Finally a series of `reports`, filters, groups and represents in pdf format the diary entries.

## Highlighted front-end features

Auto-scrolling operation. The diary's list of dates expanding and retrieving the corresponding entries whenever user reaches close to the top or the bottom of it.

Cut-Copy-paste icons are available to move or copy an entry to another position of the diary.

Drag-n-drop operation is available to move an entry to another position of the diary.

Customized input components supporting specific forms of data-entry (date, number, email, duration).

Customized drop-down-list component requesting data from back-end and DB dynamically.

Some data validations at the form level for faster performance although full data validations are performed at the back-end level.

Multiple themes feature are supported (Light and Dark).

Multiple language feature are supported (English and Greek).

## Highlighted back-end features

The code checks the received data integrity:

- providing API endpoints based on RESTful principles

- using JWTokens to authenticate and authorize signed in users

- using parsers to confirm the received data structures

- performing validations to secure the db constraints and relations

- responding detailed validation errors to inform and guide the client

## Lambda functions

The code here has the role of the back-end. It supports all the stantard CRUD operations to manipulate data in a MongoDB database, as well as complex queries using the aggregation framework of MongoDB to produce data reports. It provides the following API endpoints

- `.../users [POST]` to create a new user
- `.../users?id=SOMETEXT [PUT]` to update a user
- `.../users?id=SOMETEXT [DELETE]` to delete a user

- `.../signin [POST]` to perform login operation
- `.../settings [PUT]` to update the user's settings
- `.../backup [GET]` to perform backup operation

- `.../diaries [POST]` to create a new diary
- `.../diaries?id=SOMETEXT [PUT]` to update a diary
- `.../diaries?id=SOMETEXT [DELETE]` to delete a diary

- `.../entries [POST]` to create a new entry
- `.../entries?id= [PUT]` to update a entry
- `.../entries?id= [DELETE]` to delete a entry
- `.../entries?diary_id=SOMETEXT&range=YYYYMMDD-YYYYMMDD [GET]` to retrieve data according to a range of dates

- `.../payment_genres [POST]` to create a new payment_genre
- `.../payment_genres?id=SOMETEXT [PUT]` to update a payment_genre
- `.../payment_genres?id=SOMETEXT [DELETE]` to delete a payment_genre
- `.../payment_genres?diary_id=SOMETEXT&name=SOMETEXT [GET]` to retrieve data according to a name substring  

- `.../payment_funds [POST]` to create a new payment_fund
- `.../payment_funds?id=SOMETEXT [PUT]` to update a payment_fund
- `.../payment_funds?id=SOMETEXT [DELETE]` to delete a payment_fund
- `.../payment_funds?diary_id=SOMETEXT&name=SOMETEXT [GET]` to retrieve data according to a name substring

- `.../workout_genres [POST]` to create a new workout_genre
- `.../workout_genres?id=SOMETEXT [PUT]` to update a workout_genre
- `.../workout_genres?id=SOMETEXT [DELETE]` to delete a workout_genre
- `.../workout_genres?diary_id=SOMETEXT&name=SOMETEXT [GET]` to retrieve data according to a name substring

- `.../workout_equips [POST]` to create a new workout_equip
- `.../workout_equips?id=SOMETEXT [PUT]` to update a workout_equip
- `.../workout_equips?id=SOMETEXT [DELETE]` to delete a workout_equip
- `.../workout_equips?diary_id=SOMETEXT&name=SOMETEXT [GET]` to retrieve data according to a name substring

- `.../reports?diary_id=SOMETEXT&type=SOMETEXT&groupBy=SOMETEXT&dateFrom=YYYYMMDD&dateTill=YYYYMMDD&genre_id=SOMETEXT&genre_code=SOMETEXT&fund_id=SOMETEXT&fund_code=SOMETEXT [GET]` to retrieve data according to specified paramaters


Athens 2020-2021, GiannisClipper.