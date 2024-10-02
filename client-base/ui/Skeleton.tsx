import { twm } from 'src/client-base/utils/twm';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={twm('animate-pulse rounded-md bg-neutral/5', className)} {...props} />;
}

export { Skeleton };
