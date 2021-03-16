import { Fish, Pond } from '@actyx/pond';
import { LogicResult, LogicResultUI } from './logic-types';

export const wire = <S, E, R>(pond: Pond) => (fish: Fish<S, E>) => (
  logic: (fishState: S) => LogicResult<E, R>
): (() => Promise<LogicResultUI<R>>) => {
  return () => {
    let logicResult: LogicResult<E, R>;
    return pond
      .run(fish, (fishState, enqueue) => {
        logicResult = logic(fishState);
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

// FIXME remove and use wire instead everywhere
export const _wire = <S, E, R>(
  pond: Pond,
  fish: Fish<S, E>,
  logic: (fishState: S) => LogicResult<E, R>
): Promise<LogicResultUI<R>> => {
  let logicResult: LogicResult<E, R>;
  return pond
    .run(fish, (fishState, enqueue) => {
      logicResult = logic(fishState);
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
