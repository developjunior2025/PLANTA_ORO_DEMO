import { Component, type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

/** §8.x.11: un error de un widget falla el widget, no toda la página. */
export class WidgetErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="dash-widget dash-widget--error" role="alert">
        <h4>{this.props.title}</h4>
        <p className="dash-empty">Este widget no pudo mostrarse. El resto del dashboard sigue funcionando.</p>
        <button type="button" className="chip-btn" onClick={() => this.setState({ failed: false })}>
          Reintentar
        </button>
      </section>
    );
  }
}
