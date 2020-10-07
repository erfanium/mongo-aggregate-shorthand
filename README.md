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
            examID: exam._id,
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

## Stage
Idea, Give us your opinion!
