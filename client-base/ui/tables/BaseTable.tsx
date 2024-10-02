import * as React from 'react';
import { twm } from 'src/client-base/utils/twm';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
  stickyHeader?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, stickyHeader, ...props }, ref) => (
    <div className={twm('relative w-full', !stickyHeader && 'overflow-auto', wrapperClassName)}>
      <table ref={ref} className={twm('w-full caption-bottom', className)} {...props} />
    </div>
  ),
);

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={twm('[&_tr]:border-b', className)} {...props} />,
);

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={twm('[&_tr:last-child]:border-0', className)} {...props} />
  ),
);

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={twm('border-t bg-muted/50 [&>tr]:last:border-b-0', className)} {...props} />
  ),
);

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={twm('border-b border-b-table-divider transition-colors data-[state=selected]:bg-muted', className)}
      {...props}
    />
  ),
);

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={twm('px-2 text-left align-middle', className)} {...props} />
  ),
);

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={twm('p-2 align-middle', className)} {...props} />,
);

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => <caption ref={ref} className={twm('mt-4', className)} {...props} />,
);

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
