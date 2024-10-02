import { twm } from 'src/client-base/utils/twm';

interface Props {
  className?: string;
  pathClassName?: string;
  color?: string;
}

export function CheckMark({ className, pathClassName }: Props) {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={twm('stroke-form-button-bg', pathClassName)}
        d="M8.16671 0.75L3.12504 5.79167L0.833374 3.5"
        strokeWidth="1.14583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
