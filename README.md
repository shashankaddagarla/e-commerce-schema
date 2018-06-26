# e-commerce-schema
for a simple assignment, might clean up later


Assignment: Create data schemas for an Amazon-like site with data models for user, product, seller etc... in MongoDB
    - All these models should be related (ie., User.cart has array of products.)
    - Schema should be designed focusing on optimising speed of retrieving documents from different data models
    - Keep in mind they should be scalable

This doesn't really make that much sense, given that one of the salient features of noSQL databases is that they are schema-free, which is suitable to an Amazon-like site with potentially different schemas for different types of products (for example, a book will have a number of pages attribute, whereas a laptop will not.) Nonetheless, mongoose provides schema-based object modeling for node.js, so I will implement mongoDB "schemas" using mongoose.

This code requires that mongoose be installed on your app, which I prefer to be generated via express generator. node.js must also be installed. It also expects a local instance of mongoDB running, called "test"

To install, simply do ```$ npm install -S mongoose```.
