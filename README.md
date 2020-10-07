# mongo-aggregate-shorthand
A short-hand tool for creating mongodb aggregates!

## Example
```sh
MATCH examID=1 && sandbox=false
SORT percent -1
LOOKUP users userID:_id as user
SET user=user[0]
PROJECT percent=1 user=1 ratio=1
```
equals 
```js
[
      {
         $match: {
            examID: exam._id,
            sandbox: false
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
      },
   ]
```
