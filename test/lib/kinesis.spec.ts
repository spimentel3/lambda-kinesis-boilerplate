import * as AWSMock from "aws-sdk-mock";
import * as Sinon from "sinon";

// Have to set env vars before importing KinesisConnection
process.env.STAGE = 'local';
process.env.KINESISOUTPUTSTREAM = 'some-kinesis-stream-name';
import { KinesisConnection } from "../../src/lib/kinesis";
// =======================================================
import { SinonSpy } from "sinon";
import { PutRecordInput } from "aws-sdk/clients/kinesis";

let lastPutRecordParams: PutRecordInput;
let putRecordSpy: SinonSpy;

describe('Kinesis Test Suite', function () {
  beforeEach(() => {
    putRecordSpy = Sinon.spy((params, callback) => {
      lastPutRecordParams = params;
      callback(null, { status: 'delivered' });
    });

    AWSMock.mock('Kinesis', 'putRecord', putRecordSpy);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  describe('save', () => {
    it('should save to kinesis', async () => {
      const connection: KinesisConnection = new KinesisConnection();

      const payload = "Hello World";
      const response = await connection.Save(payload);

      expect(putRecordSpy.calledOnce).toBeTruthy();
      expect(response).toEqual({status: 'delivered'});
      expect(lastPutRecordParams).toEqual({
        Data: 'Hello World',
        PartitionKey: 'default',
        StreamName: 'some-kinesis-stream-name'
      })
    });
  });
});
