import { DynamoDB } from 'aws-sdk';

const CONFIG = {
	maxRetries: 5,
	httpOptions: {
		timeout: 5000,
	},
	region: 'us-east-1',
};

export function createDynamoClient(): DynamoDB.DocumentClient {
	return new DynamoDB.DocumentClient({ ...CONFIG, convertEmptyValues: true });
}

export function getUserById(
	userId: string,
	tableName: string = USER_TABLE_NAME,
	client: DynamoDB.DocumentClient = createDynamoClient()
): Promise<GroupDraft | undefined> {
	const params = {
		TableName: tableName,
		Key: {
			user_id: draftId,
		},
	};

	return client
		.get(params)
		.promise()
		.then(res => res.Item && res.Item)
		.catch(error => {
			log.info('Error in interface-dynamo getUserById', {
				userId,
				tableName,
				error,
			});
			throw error;
		});
}

export function createUser(
	user: Object,
	tableName: string = USER_TABLE_NAME,
	client: DynamoDB.DocumentClient = createDynamoClient()
): Promise<boolean | undefined> {
	const now = Date.now();
	const params = {
		TableName: tableName,
		Item: {
			user,
		},
	};

	return client
		.put(params)
		.promise()
		.then(res => Boolean(res))
		.catch(error => {
			log.info('Error in interface-dynamo createUser', {
				user,
				tableName,
				error,
			});

			throw error;
		});
}
