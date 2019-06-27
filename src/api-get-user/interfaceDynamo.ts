const { DynamoDB } = require('aws-sdk');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;

const CONFIG = {
	maxRetries: 5,
	httpOptions: {
		timeout: 5000,
	},
	region: 'us-east-1',
};

const client = new DynamoDB.DocumentClient({
	...CONFIG,
	convertEmptyValues: true,
});

function getUserById(
	userId: string,
	tableName: string = USER_TABLE_NAME
): Promise<object | undefined> {
	const params = {
		TableName: tableName,
		Key: {
			user_id: userId,
		},
	};

	return client
		.get(params)
		.promise()
		.then(res => res.Item && res.Item)
		.catch(error => {
			console.error(error);
			throw error;
		});
}

module.exports = { getUserById };
