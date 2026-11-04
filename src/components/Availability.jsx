import dotBlue from '../assets/availability-dot-blue.svg';
import dotLime from '../assets/availability-dot-lime.svg';
import './Availability.css';

/**
 * Small status line with a coloured dot, e.g. "OPEN TO INTERNSHIP OPPORTUNITIES".
 * tone="blue" uses the 7px blue dot (light backgrounds),
 * tone="lime" uses the 6px lime dot (dark backgrounds).
 */
export default function Availability({ children, tone = 'blue' }) {
  const isLime = tone === 'lime';
  return (
    <p className={`availability availability--${tone}`}>
      <img
        src={isLime ? dotLime : dotBlue}
        width={isLime ? 6 : 7}
        height={isLime ? 6 : 7}
        alt=""
        aria-hidden="true"
      />
      <span>{children}</span>
    </p>
  );
}
