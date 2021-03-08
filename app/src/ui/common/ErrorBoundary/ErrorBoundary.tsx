import React, { ReactNode, ErrorInfo } from 'react';

export type ErrorBoundaryProps = Readonly<{
  children: ReactNode;
  testError?: boolean;
}>;

type State = Readonly<{
  hasError: boolean;
}>;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: Boolean(props.testError) };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex space-x-2 p-1 bg-white rounded">
          <div>😔</div>
          <div>Something went wrong.</div>
        </div>
      );
    }

    return this.props.children;
  }
}
