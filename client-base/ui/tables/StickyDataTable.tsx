import { Text } from 'src/client-base/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/client-base/ui/tables/BaseTable';

type ItemNameSymbol = {
  name: string;
  symbol: string;
};
type StickyDataTableProps<T> = {
  data: T[] | undefined;
  names: ItemNameSymbol[];
  titleFirstColumn?: string;
  renderCell: (item: T, name: ItemNameSymbol) => string | number;
  renderHeader: (item: T) => string | number;
};

export const StickyDataTable = <T,>({
  data,
  names,
  titleFirstColumn,
  renderCell,
  renderHeader,
}: StickyDataTableProps<T>) => {
  const renderHead = () => {
    return data?.map((item, index) => (
      <TableHead className="sticky top-0 p-2 z-10 text-right bg-general-dark" key={`header-${index}`}>
        <Text className="text-brand-primary text-xs font-medium">{renderHeader(item)}</Text>
      </TableHead>
    ));
  };

  const renderRow = () => {
    return names.map((n) => (
      <TableRow className="border-brand-primary/20 " key={n.symbol}>
        <TableCell className="sticky left-0 p-2 z-10 bg-general-dark w-60">
          <Text className="text-brand-primary text-xs font-medium uppercase w-60 block">{n.name}</Text>
        </TableCell>
        {data?.map((item, index) => (
          <TableCell key={`cell-${n.name}-${index}`} className="text-right">
            <Text className="text-general-light text-xs font-medium">{renderCell(item, n)}</Text>
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Table stickyHeader className="caption-[unset] w-auto min-w-full border-collapse table-fixed">
      <TableHeader className="h-[40px] top-0 bg-general-dark">
        <TableRow className="border-brand-primary/20">
          <TableHead className="sticky top-0 left-0 p-2 z-20 bg-general-dark w-60">
            <Text className=" text-xs font-medium w-60">{titleFirstColumn}</Text>
          </TableHead>
          {renderHead()}
        </TableRow>
      </TableHeader>
      <TableBody>{renderRow()}</TableBody>
    </Table>
  );
};
