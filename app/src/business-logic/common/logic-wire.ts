import { Fish, Pond } from '@actyx/pond';
import { LogicResult, LogicResultUI } from './logic-types';

export const wire = <S, E>(pond: Pond, fish: Fish<S, E>) => <
  R,
  A extends any[]
>(
  logic: (fishState: S, ...arg: A) => LogicResult<E, R>
): ((...arg: A) => Promise<LogicResultUI<R>>) => {
  return (...arg) => {
    let logicResult: LogicResult<E, R>;
    return pond
      .run(fish, (fishState, enqueue) => {
        logicResult = logic(fishState, ...arg);
        if (logicResult.type === 'ok') {
          logicResult.tagsWithEvents.forEach((x) => enqueue(...x));
        }
      })
      .toPromise()
      .then(() =>
        logicResult.type === 'ok'
          ? { type: 'ok', result: logicResult.result }
          : logicResult
      );
  };
};
