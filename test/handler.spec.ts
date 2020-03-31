import * as AWSMock from "aws-sdk-mock";
import * as Sinon from "sinon";

// Have to set env vars before importing KinesisConnection
process.env.STAGE = 'local';
process.env.KINESISOUTPUTSTREAM = 'some-kinesis-stream-name';
import { SendToKinesis } from "../src/handler";
// =======================================================

import { IAPIGatewayResponse } from "../src/lib/response";
import { Event } from "./fixture/event";
import { PutRecordInput } from "aws-sdk/clients/kinesis";
import { SinonSpy } from "sinon";

let lastPutRecordParams: PutRecordInput;
let putRecordSpy: SinonSpy;

describe('handler tests', () => {
  beforeEach(() => {
    putRecordSpy = Sinon.spy((params, callback) => {
      lastPutRecordParams = params;
      callback(null, {
        ShardId: "shardId-000000000000",
        SequenceNumber: "49605190803868166675215289934990239453152947060971929602"
      });
    });

    AWSMock.mock('Kinesis', 'putRecord', putRecordSpy);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should place a message in a kinesis stream', async() => {
    const expectedMessage: IAPIGatewayResponse = {
      body: {
        message: "Success",
        ShardInformation: {
          ShardId: "shardId-000000000000",
          SequenceNumber: "49605190803868166675215289934990239453152947060971929602"
        }
      },
      headers: {},
      isBase64Encoded: false,
      statusCode: 200
    };

    const result = await SendToKinesis(Event);
    console.log(lastPutRecordParams);
    expect(result).toEqual(expectedMessage);
  });
});
