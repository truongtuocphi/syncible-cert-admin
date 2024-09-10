'use client';

import React, { useEffect, useState } from 'react';

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
import { IoEyeSharp } from 'react-icons/io5';
import { RiShareBoxLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import CopyButton from '@/components/common/coppyText/CopyButton';
import ContractData from '@/components/pages/admin/ContractData';
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
import { db, ref, get } from '@/lib/firebase';
import truncateAddress from '@/lib/truncateAddress';

export type Collection = {
  id: string;
  displayName: string;
  contractName: string;
  contractSymbol: string;
  interface: string;
  contractAddress: string;
  itemsCount?: number; // Add itemsCount as an optional property
};

const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: 'check',
    header: ({ table }) => (
      <div>
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div>
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
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
  // {
  //   accessorKey: 'contractName',
  //   header: 'Contract Name',
  //   cell: ({ row }) => <div>{row.getValue('contractName')}</div>,
  // },
  {
    accessorKey: 'contractSymbol',
    header: 'Contract Symbol',
    cell: ({ row }) => <div>{row.getValue('contractSymbol')}</div>,
  },
  {
    accessorKey: 'itemsCount',
    header: 'Total Items',
    cell: ({ row }) => {
      let itemsCount = row.getValue('itemsCount');

      if (itemsCount === undefined) {
        const loadingDelay = 1000;
        setTimeout(() => {
          itemsCount = '0';
        }, loadingDelay);
        return 'Loading...';
      }

      return itemsCount || '0';
    },
  },
  {
    accessorKey: 'contractAddress',
    header: 'Contract Address',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {truncateAddress(row.getValue('contractAddress'))}
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={row.getValue('contractAddress')} />
          <Link
            href={`https://polygonscan.com/address/${row.getValue('contractAddress')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiShareBoxLine className="text-blue-500" />
          </Link>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: () => <div className="text-green-600">Active</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Link href={`/admin/collection/collectiondetail/${row.getValue('id')}`}>
          <RiShareBoxLine className="text-blue-500" />
        </Link>
        <Link href={`/admin/collection/contractdetail/${row.getValue('id')}`}>
          <IoEyeSharp className="text-blue-500" />
        </Link>
      </div>
    ),
  },
];

export default function Collection() {
  const { address } = useAccount();
  const [data, setData] = useState<Collection[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, 'collections');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const collections: Collection[] = [];
        snapshot.forEach((childSnapshot: any) => {
          const collection = childSnapshot.val();
          if (collection.address === address) {
            collections.push({
              id: childSnapshot.key || '',
              displayName: collection.displayName,
              contractName: collection.contractName,
              contractSymbol: collection.contractSymbol,
              interface: collection.interface,
              contractAddress: collection.contractAddress,
            });
          }
        });
        setData(collections);
      }
    };

    fetchData();
  }, [address]);

  const handleItemsCountChange = (id: string, count: number) => {
    setData((prevData) =>
      prevData.map((collection) =>
        collection.id === id ? { ...collection, itemsCount: count } : collection
      )
    );
  };

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
        <Link href={'/admin/collection/createcollection'}>
          <ButtonPrimary className="ml-auto">Create Collection</ButtonPrimary>
        </Link>
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
                  <div className="hidden">
                    <ContractData
                      collectionContractAddress={row.getValue('contractAddress')}
                      onItemsCountChange={(count: number) =>
                        handleItemsCountChange(row.getValue('id'), count)
                      }
                    />
                  </div>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results. Please connect your wallet or create a collection to display the
                  results.
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
