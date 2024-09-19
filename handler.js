const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

module.exports.sendMessage = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify(body),
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent to SQS',
        messageId: data.MessageId
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send message to SQS',
      }),
    };
  }
};
