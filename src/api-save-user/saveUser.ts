export function handler(event, context, callback) {
	try {
		const response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'save user',
			}),
		};
		callback(null, response);
	} catch (err) {
		console.log(err);
		callback(err);
	}
}
