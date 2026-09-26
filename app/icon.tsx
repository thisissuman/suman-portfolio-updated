import { ImageResponse } from 'next/og';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#181b1e',
        color: '#f5d76e',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 48,
        fontWeight: 700,
      }}
    >
      s.
    </div>,
    size,
  );
}
