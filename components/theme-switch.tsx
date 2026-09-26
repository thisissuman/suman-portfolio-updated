'use client';
import { useSyncExternalStore } from 'react';
import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

const subscribe = () => () => {};

type ThemeSwitchProps = {
  className?: string;
};

export default function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = mounted ? resolvedTheme : 'dark';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const Icon = currentTheme === 'dark' ? MoonIcon : SunIcon;
  return (
    <button
      type="button"
      className={`theme-switch ${className}`.trim()}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <Icon className="theme-icon" size={21} weight="fill" aria-hidden="true" />
    </button>
  );
}
