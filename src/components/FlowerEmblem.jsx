/* Crisp, mature botanical SVG emblems of 6 Swiss Alpine wildflowers */
export default function FlowerEmblem({ species = 'edelweiss', size = 64, className = '' }) {
  const configs = {
    edelweiss: {
      petals: 10,
      outer: '#ffffff',
      outerStroke: '#c9d9cf',
      inner: '#f3f7ee',
      core: '#eab338',
      leaf: '#3b8c63',
    },
    rose: {
      petals: 9,
      outer: '#e66380',
      outerStroke: '#c23f5d',
      inner: '#f9bcc9',
      core: '#f4c85b',
      leaf: '#2d7a53',
    },
    buttercup: {
      petals: 7,
      outer: '#f4be37',
      outerStroke: '#d6971c',
      inner: '#fce08b',
      core: '#b86814',
      leaf: '#3e8f61',
    },
    gentian: {
      petals: 6,
      outer: '#4a90d6',
      outerStroke: '#2e6bb0',
      inner: '#9bcaf7',
      core: '#f4d36a',
      leaf: '#2f7a5a',
    },
    lavender: {
      petals: 8,
      outer: '#8d7ae0',
      outerStroke: '#6b56c2',
      inner: '#cbbef7',
      core: '#f2cb66',
      leaf: '#4d926d',
    },
    poppy: {
      petals: 6,
      outer: '#e85d52',
      outerStroke: '#c43b31',
      inner: '#f8a59e',
      core: '#2b2421',
      leaf: '#337d57',
    },
  };

  const c = configs[species] || configs.edelweiss;
  const angles = Array.from({ length: c.petals }, (_, i) => (360 / c.petals) * i);
  const innerAngles = Array.from({ length: Math.max(5, c.petals - 2) }, (_, i) => (360 / Math.max(5, c.petals - 2)) * i + 22);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      {/* 3 subtle botanical leaves behind bloom */}
      {[30, 150, 270].map((deg) => (
        <ellipse
          key={`l-${deg}`}
          cx="60"
          cy="22"
          rx="9"
          ry="20"
          fill={c.leaf}
          opacity="0.72"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}

      {/* Outer petals */}
      {angles.map((deg) => (
        <path
          key={`o-${deg}`}
          d="M 60 60 C 46 42, 47 16, 60 12 C 73 16, 74 42, 60 60 Z"
          fill={c.outer}
          stroke={c.outerStroke}
          strokeWidth="1.2"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}

      {/* Inner layered petals */}
      {innerAngles.map((deg) => (
        <path
          key={`i-${deg}`}
          d="M 60 60 C 51 48, 52 29, 60 26 C 68 29, 69 48, 60 60 Z"
          fill={c.inner}
          opacity="0.92"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}

      {/* Golden stamen core */}
      <circle cx="60" cy="60" r="11" fill={c.core} />
      <circle cx="57" cy="57" r="3.5" fill="rgba(255,255,255,0.48)" />
    </svg>
  );
}
