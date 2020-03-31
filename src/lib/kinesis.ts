import { region, writeStreamName } from './config';
import { AWSError, Kinesis } from 'aws-sdk';
import { PutRecordInput } from 'aws-sdk/clients/kinesis';
import { PromiseResult } from 'aws-sdk/lib/request';

const AWS = require('aws-sdk');

export class KinesisConnection {

  public PartitionKey: string = 'default';
  private kinesis: Kinesis;

  constructor() {
    this.kinesis = new AWS.Kinesis({
      apiVersion: '2013-12-02',
      region: region
    });
  }

  public Save(data: object | string): Promise<PromiseResult<Kinesis.PutRecordOutput, AWSError>> {
    const params: PutRecordInput = {
      Data: (typeof data === 'object')? JSON.stringify(data) : data,
      PartitionKey: this.PartitionKey,
      StreamName: writeStreamName
    };

    return this.kinesis.putRecord(params).promise();
  }
}
