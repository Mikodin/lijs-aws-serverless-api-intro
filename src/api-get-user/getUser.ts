import { APIGatewayEventRequestContext } from 'aws-lambda';
const { getUserById } = require('./interfaceDynamo');

interface ApiGatewayEvent {
	pathParameters: {
		user_id: string;
	};
}

function handler(
	event: ApiGatewayEvent,
	context: APIGatewayEventRequestContext,
	callback
) {
	try {
		const userId = event.pathParameters.user_id;
		getUserById(userId)
			.then(res => {
				console.log(res);

				const response = {
					statusCode: 200,
					body: JSON.stringify({
						user_id: userId,
						user: res,
					}),
				};

				callback(null, response);
			})
			.catch(err => {
				console.log(err);
				callback(err);
			});
	} catch (err) {
		console.log(err);
		callback(err);
	}
}

module.exports = {
	handler,
};
