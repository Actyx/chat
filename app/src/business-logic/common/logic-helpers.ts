import { Fish, Pond } from '@actyx/pond';
import { LogicResult } from './logic-types';

export const wire = <S, E>(
  pond: Pond,
  fish: Fish<S, E>,
  logic: (fishState: S) => LogicResult<E>
): Promise<LogicResult<E>> => {
  return new Promise((res, rej) => {
    let result: LogicResult<E>;
    pond
      .run(fish, (fishState, enqueue) => {
        result = logic(fishState);
        if (result.type === 'ok') {
          enqueue(...result.tagsWithEvents[0]);
        }
      })
      .toPromise()
      .then(() => res(result))
      .catch(rej);
  });
};
