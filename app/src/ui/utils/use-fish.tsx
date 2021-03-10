import { Fish, Pond } from '@actyx/pond';
import { useEffect, useState } from 'react';

export const useFish = <S, E>(
  pond: Pond,
  fish: Fish<S, E>,
  initialFishState: S
) => {
  const [fishState, setFishState] = useState<S>(initialFishState);

  useEffect(() => {
    const cancelSubscription = pond.observe(fish, setFishState);

    return () => cancelSubscription();
  }, [pond, fish]);

  return fishState;
};
