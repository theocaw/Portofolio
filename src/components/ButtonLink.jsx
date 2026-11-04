import { Link } from 'react-router-dom';
import './ButtonLink.css';

/**
 * "Page invitation" button from the design: mono label + ↗ arrow.
 * variant: 'primary' (blue fill) | 'secondary' (paper fill, rule border)
 */
export default function ButtonLink({ to, children, variant = 'primary' }) {
  return (
    <Link to={to} className={`button-link button-link--${variant}`}>
      <span className="button-link__label">{children}</span>
      <span className="button-link__arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
