'use client';

import React, { useEffect, useMemo, useState } from 'react';

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
import { BiCollection, BiPlusCircle, BiSearch } from 'react-icons/bi';
import { LuEye } from 'react-icons/lu';
import { RiShareBoxLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import CopyButton from '@/components/common/coppyText/CopyButton';
import Loading from '@/components/common/loading/Loading';
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
import { deleteDataById } from '@/utils/deleteDataFirebase';
import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import { useTranslations } from 'next-intl';
import { CaretSortIcon } from '@radix-ui/react-icons';
import convertToVietnamTime from '@/utils/convertToVietnamTime';

export type Collection = {
  id?: string;
  displayName: string;
  contractName: string;
  contractSymbol: string;
  interface: string;
  contractAddress: string;
  itemsCount?: number;
  createdAt?: string;
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
    accessorKey: 'idTable',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => {
            column.toggleSorting();
          }}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue('idTable')}</div>;
    },
  },
  {
    accessorKey: 'id',
    header: () => null,
    cell: ({ row }) => {
      return <div className="hidden">{row.getValue('id')}</div>;
    },
  },
  {
    accessorKey: 'displayName',
    header: 'table.name',
    cell: ({ row }) => <div>{row.getValue('displayName')}</div>,
  },
  {
    accessorKey: 'contractSymbol',
    header: 'table.symbol',
    cell: ({ row }) => <div>{row.getValue('contractSymbol')}</div>,
  },
  {
    accessorKey: 'itemsCount',
    header: 'table.quantily',
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
    header: 'table.contract',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.getValue('contractAddress') ? truncateAddress(row.getValue('contractAddress')) : null}
        <div className="flex items-center gap-2">
          <CopyButton textToCopy={row.getValue('contractAddress')} />
          <Link
            href={`https://polygonscan.com/address/${row.getValue('contractAddress')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiShareBoxLine className="text-lg text-black" />
          </Link>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'table.createdAt',
    cell: ({ row }) => <div>{convertToVietnamTime(row.getValue('createdAt'))}</div>,
  },
  {
    accessorKey: 'status',
    header: 'table.status',
    cell: () => (
      <div className="w-fit rounded-full bg-green-500 p-2 text-center text-white">Verified</div>
    ),
  },
  {
    id: 'actions',
    header: 'table.operetion',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Link href={`/admin/collection/collectiondetail/${row.getValue('id')}`}>
          <BiCollection className="text-lg text-black" />
        </Link>
        <Link href={`/admin/collection/contractdetail/${row.getValue('id')}`}>
          <LuEye className="text-lg text-black" />
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const t = useTranslations('Dapp.Management');

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
              createdAt: collection.createdAt || ' ',
            });
          }
        });

        collections.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });

        const indexedCollections = collections.map((collection, index) => ({
          ...collection,
          idTable: (collections.length - index).toString(),
        }));

        console.log('indexedCollections', indexedCollections);

        setData(indexedCollections);
      }
      setIsLoading(false);
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
      pagination,
    },
    pageCount: Math.ceil(data.length / 10),
  });

  const selectedRowCount = useMemo(() => Object.keys(rowSelection).length, [rowSelection]);

  const handleDelete = async () => {
    const dataSelect = Object.values(data);
    const selectedIds = Object.keys(rowSelection);
    const selectedData: any[] = [];

    selectedIds.forEach((item: any) => {
      const index = Number(item);
      if (dataSelect[index]) {
        selectedData.push(dataSelect[index]);
      }
    });

    try {
      await Promise.all(selectedData.map((data) => deleteDataById('collections', data.id)));

      setRowSelection({});

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

      alert(`${t('alert_1')}`);
    } catch (error) {
      alert(`${t('alert_2')}`);
      console.error('Error deleting selected rows:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < table.getFilteredRowModel().rows.length - 1) {
      table.nextPage();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      table.previousPage();
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <Breadcrumb />
      <div className="mt-4 flex items-center justify-between space-x-4 py-4">
        <div className="flex items-center rounded-2xl border-[1px] border-gray-200 bg-white px-4 py-1">
          <BiSearch className="text-xl text-gray-500" />
          <Input
            placeholder={`${t('placeholder')}`}
            value={(table.getColumn('displayName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('displayName')?.setFilterValue(event.target.value)}
            className="w-80 border-none bg-transparent outline-none"
          />
        </div>
        {selectedRowCount > 0 ? (
          <ButtonPrimary onClick={handleDelete} className="bg-red-500">
            {t('buttonDelete')} ({selectedRowCount})
          </ButtonPrimary>
        ) : (
          <Link href={'/admin/collection/createcollection'}>
            <ButtonPrimary className="ml-auto flex items-center gap-2 border-[1px] border-gray-200 bg-transparent font-bold text-gray-600 hover:bg-secondPrimaryHover">
              <BiPlusCircle className="text-2xl" />
              {t('button')}
            </ButtonPrimary>
          </Link>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border">
        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-ellipsis whitespace-nowrap px-2 font-bold text-black"
                      >
                        {header.isPlaceholder
                          ? null
                          : t(flexRender(header.column.columnDef.header, header.getContext())) !=
                              'Dapp.Management.[object Object]'
                            ? t(flexRender(header.column.columnDef.header, header.getContext()))
                            : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="bg-white hover:bg-white">
                {table.getRowModel().rows.length >= 1 && address ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() ? 'selected' : undefined}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="p-2 text-gray-600">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                      <td className="hidden">
                        <ContractData
                          collectionContractAddress={row.getValue('contractAddress')}
                          onItemsCountChange={(count) =>
                            handleItemsCountChange(row.getValue('id'), count)
                          }
                        />
                      </td>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-48 text-center">
                      {!address ? t('table.noti_1') : t('table.noti_2')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {t('page')} {currentPage + 1} {t('of')}{' '}
          {Math.ceil(table.getFilteredRowModel().rows.length / 10)}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            {t('table.buttonNext')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={table.getFilteredRowModel().rows.length <= 10}
          >
            {t('table.buttonPrevious')}
          </Button>
        </div>
      </div>
    </div>
  );
}
