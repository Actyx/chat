import { Fish, Pond } from '@actyx/pond';
import { LogicResult } from './logic-types';

export const wire = <S, E>(
  pond: Pond,
  fish: Fish<S, E>,
  logic: (fishState: S) => LogicResult<E>
): Promise<LogicResult<E>> => {
  let result: LogicResult<E>;
  return pond
    .run(fish, (fishState, enqueue) => {
      result = logic(fishState);
      if (result.type === 'ok') {
        enqueue(...result.tagsWithEvents[0]);
      }
    })
    .toPromise()
    .then(() => result);
};
