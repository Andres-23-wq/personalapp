const AWS = require('aws-sdk');

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

// Configure AWS region and credentials
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to get an item by key
const getItem = async (partitionKeyValue, sortKeyValue) => {
    const params = {
        TableName: 'perver', // Ensure this matches your DynamoDB table name
        Key: {
            partitionKeyName: personalverwaltung, // Replace with the actual partition key name
            sortKeyName: app, // Replace with the actual sort key name
        },
    };

    console.log('Fetching item with key:', params.Key); // Logging for debugging

    try {
        const result = await dynamoDB.get(params).promise(); // DynamoDB get operation
        console.log('Fetched item:', result.Item); // Log the fetched item
        return result.Item; // Return the fetched item
    } catch (error) {
        console.error('Error fetching item:', error); // Log error details
        throw error; // Re-throw to handle error in calling code
    }
};



// Function to put a new item
const putItem = async (partitionKeyValue, sortKeyValue, otherItemData) => {
    // Ensure the item contains both the partition key and sort key
    const item = {
        partitionKeyName: personalverwaltung, // Replace with the actual partition key name
        sortKeyName: app, // Replace with the actual sort key name
        ...otherItemData, // Include any other data for the item
    };

    const params = {
        TableName: 'perver', // Ensure this matches your DynamoDB table name
        Item: item,
    };

    console.log('Putting item into DynamoDB:', item); // Log the item being added

    try {
        await dynamoDB.put(params).promise(); // Perform the put operation
        console.log('Item put successfully'); // Log successful insertion
    } catch (error) {
        console.error('Error putting item:', error); // Log error details
        throw error; // Re-throw to handle error in calling code
    }
};

// Function to delete an item by key
const deleteItem = async (partitionKeyValue, sortKeyValue) => {
    const params = {
        TableName: 'perver', // Ensure this matches your DynamoDB table name
        Key: {
            partitionKeyName: personalverwaltung, // Replace with the partition key name
            sortKeyName: app, // Replace with the sort key name
        },
    };

    console.log('Deleting item with key:', params.Key); // Log the key being deleted

    try {
        await dynamoDB.delete(params).promise(); // DynamoDB delete operation
        console.log('Item deleted successfully'); // Log successful deletion
    } catch (error) {
        console.error('Error deleting item:', error); // Log error details
        throw error; // Re-throw to handle error in calling code
    }
};


// Function to update an item
const updateItem = async (partitionKeyValue, sortKeyValue, updateExpression, expressionAttributeValues) => {
    const params = {
        TableName: 'perver', // Ensure this matches your DynamoDB table name
        Key: {
            partitionKeyName: personalverwaltung, // Replace with the partition key name
            sortKeyName: app, // Replace with the sort key name
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
    };

    console.log('Updating item with key:', params.Key); // Log the key being updated

    try {
        await dynamoDB.update(params).promise(); // DynamoDB update operation
        console.log('Item updated successfully'); // Log successful update
    } catch (error) {
        console.error('Error updating item:', error); // Log error details
        throw error; // Re-throw to handle error in calling code
    }
};


module.exports = {
    getItem,
    putItem,
    deleteItem,
    updateItem,
};