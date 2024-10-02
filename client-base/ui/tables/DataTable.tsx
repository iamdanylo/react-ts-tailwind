import { Text } from '../Text';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './BaseTable';
import { twm } from 'src/client-base/utils/twm';

export type TableColumn<T> = {
  header: string;
  render: (row: T) => React.ReactNode;
  cellClass?: string;
  cellClassText?: string;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  rowClick?: (data: T) => void;
  className?: string;
  stickyHeader?: boolean;
  getRowClassName?: (data: T) => string;
};

const DataTable = <T,>({
  columns,
  data,
  rowClick,
  className,
  stickyHeader = false,
  getRowClassName,
}: TableProps<T>): JSX.Element => {
  const isColumnEmpty = columns.every((col) => !col.header);

  return (
    <Table stickyHeader={stickyHeader} className={twm('relative', className)}>
      {!isColumnEmpty && (
        <TableHeader className={twm('bg-general-dark', stickyHeader && 'sticky top-0 z-10')}>
          {columns.map((col, index) => (
            <TableHead key={index}>
              <Text className="text-brand-primary text-xs font-medium">{col.header}</Text>
            </TableHead>
          ))}
        </TableHeader>
      )}
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={twm('border-brand-primary/20', getRowClassName?.(item))}
            onClick={rowClick ? () => rowClick(item) : undefined}
          >
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex} className={`text-sm font-normal ${col.cellClass}`}>
                <Text className={`text-sm font-normal ${col?.cellClassText}`}>
                  {col.render ? col.render(item) : null}
                </Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
