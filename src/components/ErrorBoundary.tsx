import React from 'react';

class ErrorBoundary extends React.Component<{ fallback: React.FC<{ error: Error }>, children: React.ReactNode }> {
  state: {hasError: boolean, cause?: Error };
  constructor(props: { fallback: React.FC<{ error: Error }>, children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  componentDidCatch() { // error, errorInfo
    return;
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, cause: error };
  }
  
  render() {
    if (this.state.hasError && this.state.cause) {
      // You can render any custom fallback UI
      const Fallback = this.props.fallback;
      return <Fallback error={this.state.cause} />;
    }
  
    return this.props.children;
  }
}

export default ErrorBoundary;