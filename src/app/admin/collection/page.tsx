'use client';

import React from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { FaCopy } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { RiShareBoxLine } from 'react-icons/ri';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import truncateAddress from '@/lib/truncateAddress';

export type Collection = {
  id: string;
  displayName: string;
  contractName: string;
  contractSymbol: string;
  totalItems: number;
  totalOwners: number;
  interface: string;
  contractAddress: string;
  status: string;
};

const data: Collection[] = [
  {
    id: '1',
    displayName: 'CryptoPunks',
    contractName: 'PunksContract',
    contractSymbol: 'PUNK',
    totalItems: 10000,
    totalOwners: 3000,
    interface: 'ERC721',
    contractAddress: '0x123456789abcdef',
    status: 'Active',
  },
  {
    id: '2',
    displayName: 'Bored Ape Yacht Club',
    contractName: 'BAYCContract',
    contractSymbol: 'BAYC',
    totalItems: 10000,
    totalOwners: 5000,
    interface: 'ERC721',
    contractAddress: '0xabcdef123456789',
    status: 'Active',
  },
  {
    id: '3',
    displayName: 'Art Blocks',
    contractName: 'ArtBlocksContract',
    contractSymbol: 'ARTB',
    totalItems: 15000,
    totalOwners: 8000,
    interface: 'ERC721',
    contractAddress: '0x987654321fedcba',
    status: 'Inactive',
  },
  // Add more collections as needed
];

const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: 'id',
    header: 'No',
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: 'displayName',
    header: 'Display Name',
    cell: ({ row }) => <div>{row.getValue('displayName')}</div>,
  },
  {
    accessorKey: 'contractName',
    header: 'Contract Name',
    cell: ({ row }) => <div>{row.getValue('contractName')}</div>,
  },
  {
    accessorKey: 'contractSymbol',
    header: 'Contract Symbol',
    cell: ({ row }) => <div>{row.getValue('contractSymbol')}</div>,
  },
  {
    accessorKey: 'totalItems',
    header: 'Total Items',
    cell: ({ row }) => <div>{row.getValue('totalItems')}</div>,
  },
  {
    accessorKey: 'interface',
    header: 'Interface',
    cell: ({ row }) => <div>{row.getValue('interface')}</div>,
  },
  {
    accessorKey: 'contractAddress',
    header: 'Contract Address',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {truncateAddress(row.getValue('contractAddress'))}
        <div className="flex items-center gap-2">
          <FaCopy className="text-blue-500" />
          <RiShareBoxLine className="text-blue-500" />
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className={row.getValue('status') === 'Active' ? 'text-green-600' : 'text-red-600'}>
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Link href={`/admin/collection/${row.getValue('id')}`}>
          <RiShareBoxLine className="text-blue-500" />
        </Link>
        <Link href={`/admin/collection/${row.getValue('id')}`}>
          <IoEyeSharp className="text-blue-500" />
        </Link>
      </div>
    ),
  },
];

export default function Collection() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<Collection>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between space-x-4 py-4">
        <Input
          placeholder="Search by name, symbol, contract address"
          value={(table.getColumn('displayName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('displayName')?.setFilterValue(event.target.value)}
          className="w-80 rounded-lg"
        />
        {/* <Button variant="outline">
          Select type <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button> */}
        <ButtonPrimary className="ml-auto">Create Collection</ButtonPrimary>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader className="bg-[#E6E7F4]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
