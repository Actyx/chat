const logger = (type: 'business-logic') => (prefix: string) => (err: any) => {
  // TODO use actyx console service
  const isJestTesting = process.env.NODE_ENV === 'test';
  if (!isJestTesting) {
    console.error(err);
  }
};

export const logBugBl = logger('business-logic')('bug');
