import { ImageResponse } from 'next/og';
export const alt = 'Suman Kumar Maharana — Senior Frontend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#181b1e',
        color: '#f5f5f0',
        padding: '72px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 32 }}>
        suman<span style={{ color: '#f5d76e' }}>.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 70, letterSpacing: '-2px' }}>Thoughtful interfaces.</div>
        <div style={{ fontSize: 70, color: '#abb2b7', letterSpacing: '-2px' }}>
          Built with care.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 24,
          borderTop: '1px solid #45494d',
          paddingTop: 25,
        }}
      >
        <span>Suman Kumar Maharana</span>
        <span style={{ color: '#f5d76e' }}>Senior Frontend Developer</span>
      </div>
    </div>,
    size,
  );
}
