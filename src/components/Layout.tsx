import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="page-shell">
      <header className="brand-bar" aria-label="AcmeTravel">
        <a className="brand-mark" href="/AcmeShare/flights/lisbon-weekend/">
          <span className="brand-mark__icon" aria-hidden="true">
            A
          </span>
          <span>AcmeTravel</span>
        </a>
        <span className="prototype-pill">Prototype</span>
      </header>
      <main>{children}</main>
    </div>
  );
}
