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

export type Collection = {
  id: string;
  displayName: string;
  contractName: string;
  contractSymbol: string;
  interface: string;
  contractAddress: string;
  itemsCount?: number;
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
    header: 'table.id',
    cell: ({ row }) => <div>{row.index + 1}</div>,
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
      <div className="flex items-center gap-2">
        {truncateAddress(row.getValue('contractAddress'))}
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
            });
          }
        });
        setData(collections);
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
    },
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

      alert('Tất cả đã được xóa thành công.');
    } catch (error) {
      alert('Đã xảy ra lỗi khi xóa dữ liệu.');
      // eslint-disable-next-line no-console
      console.error('Error deleting selected rows:', error);
    }
  };

  return (
    <>
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
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="font-bold text-black">
                      {header.isPlaceholder
                        ? null
                        : t(flexRender(header.column.columnDef.header, header.getContext())) !=
                            'Dapp.Management.[object Object]'
                          ? t(flexRender(header.column.columnDef.header, header.getContext()))
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      {/* {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())} */}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white hover:bg-white">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-gray-600">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <td className="hidden">
                      <ContractData
                        collectionContractAddress={row.getValue('contractAddress')}
                        onItemsCountChange={(count: number) =>
                          handleItemsCountChange(row.getValue('id'), count)
                        }
                      />
                    </td>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48 text-center">
                    {!address
                      ? 'Vui lòng kết nối ví để hiện thị kết quả'
                      : 'Hãy tạo một mục quản lý để hiện thị kết quả'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Kế tiếp
          </Button>
        </div>
      </div>
    </>
  );
}
