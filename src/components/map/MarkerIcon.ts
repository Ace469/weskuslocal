export const createMarkerIcon = ({
  isHovered,
  google,
}: {
  isHovered: boolean;
  google: typeof window.google;
}): google.maps.Icon => {
  const size = isHovered ? 50 : 40;
  
  // Create SVG marker with pin
  const svg = `
    <svg width="${size}" height="${size + (size/2)}" viewBox="0 0 ${size} ${size + (size/2)}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <circle cx="${size/2}" cy="${size/2}" r="${(size/2) - 2}" fill="white" stroke="#4F46E5" stroke-width="2"/>
        <path d="M${size/2} ${size} L${size/4} ${size/1.5} L${size * 0.75} ${size/1.5} Z" fill="#4F46E5"/>
      </g>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;base64,${btoa(svg)}`,
    scaledSize: new google.maps.Size(size, size + (size/2)),
    anchor: new google.maps.Point(size/2, size + (size/2)),
    origin: new google.maps.Point(0, 0),
  };
};