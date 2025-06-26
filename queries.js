// Basic CRUD operations - Question 1
db.books.find({ genre: "Fiction" });

db.books.find({ published_year: { $gt: 2010 } });

db.books.find({ author: "George Orwell" });

db.books.updateOne(
  { title: "Dune" },
  { $set: { price: 17.99 } }
);

db.books.deleteOne({ title: "The Alchemist" });


// Advanced queries - Question 2
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    title: 1,
    author: 1,
    price: 1,
    _id: 0
  }
);


db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: 1 });


db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 });


db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(0).limit(5);

db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(5).limit(5);

skip((pageNumber - 1) * pageSize).limit(pageSize)


// Aggregation pipeline - Question 3
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      genre: "$_id",
      averagePrice: { $round: ["$averagePrice", 2] },
      count: 1,
      _id: 0
    }
  },
  { $sort: { averagePrice: -1 } } // optional: sort by average price descending
]);


db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  }
]);


db.books.aggregate([
  {
    $addFields: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      bookCount: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: "$_id",
      bookCount: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
]);



// Indexing - Question 4 
db.books.createIndex({ title: 1 });


db.books.createIndex({ author: 1, published_year: -1 });


