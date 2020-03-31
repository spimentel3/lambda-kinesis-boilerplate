import { GatewayResponse, IAPIGatewayResponse } from './lib/response';
import { LogLambda } from './lib/decorators/log.decorator';
import { KinesisConnection } from './lib/kinesis';

class Handler {

  private static instance: Handler;

  /**
   * This will receive an event object and post it to a kinesis stream specified by the environment variables
   * @param event   an object that will be placed in the
   * @constructor
   */
  @LogLambda()
  public async SendToKinesis(event: any): Promise<IAPIGatewayResponse> {
    const connection: KinesisConnection = new KinesisConnection();

    let result;
    try {
      result = await connection.Save(event);
    } catch (e) {
      console.error(e);
      return GatewayResponse(
        {
          message: 'Failure',
          Error: e
        },
        500);
    }

    return GatewayResponse({
      message: 'Success',
      ShardInformation: result
    });
  }

  public static getInstance(): Handler {
    if (!Handler.instance) {
      Handler.instance = new Handler();
    }
    return Handler.instance;
  }
}

const handler: Handler = Handler.getInstance();

export const SendToKinesis = handler.SendToKinesis.bind(handler);
