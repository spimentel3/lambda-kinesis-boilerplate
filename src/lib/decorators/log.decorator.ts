import { Context } from 'aws-lambda';

/**
 * This decorators will log the event and the context of the lambda that is being invoked to perform
 * deep inspections of the data being passed to it.
 * @param verbose   If the verbose flag is set this function will output the event and context as well, otherwise just
 *                  the name of the function being ran.
 * @constructor
 */
export function LogLambda(verbose: boolean = false) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {

    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const event = args[0];
      const context: Context = args[1];

      console.log(`Running ${context?.functionName ?? 'NO FUNCTION NAME'}`);
      if (verbose) {
        console.log({
          event,
          context,
        });
      }
      return method.apply(this, args);
    };
    return descriptor;
  };
}
