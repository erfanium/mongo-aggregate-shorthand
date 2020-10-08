# mongo-aggregate-shorthand
A short-hand system for creating Mongodb aggregates! Great for analytics stuff with Mongodb

## Example
```sh
MATCH examID=1 && sandbox=false && ratio > 10
SORT percent -1
LOOKUP users userID:_id as user
SET user=user[0]
PROJECT percent user ratio
```
equals 
```js
[
      {
         $match: {
            examID: 1,
            sandbox: false,
            ratio: { $gt: 10 }
         },
      },

      {
         $sort: {
            percent: -1,
         },
      },
      {
         $lookup: {
            from: 'users',
            localField: 'userID',
            foreignField: '_id',
            as: 'user',
         },
      },
      {
         $set: {
            user: { $arrayElemAt: ['$user', 0] },
         },
      },
      {
         $project: {
            percent: 1,
            user: 1,
            ratio: 1,
         },
      }
]
```

## Usage: 
clone repo then:
- Install dependencies:
```sh
npm i
```
- To parse from file:
```sh
npm run file example.txt
```

- REPL mode:
```sh
npm run cli
```

## Stage
Implementation, Give us your opinion!
