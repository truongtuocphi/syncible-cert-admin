import { useState } from 'react';

// import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Papa from 'papaparse';
import { decodeEventLog, parseGwei } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { AddCircleIcon, LoadingIcon, TrashIcon } from '@/assets/icons';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { viemClient } from '@/config';
import { certificateNFTContractConfig } from '@/config/contract';
import { storage } from '@/lib/firebase';

const MintPage = () => {
  const { address } = useAccount();

  const [openModelImportCSV, setOpenModelImportCSV] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>([
    { id: '', name: '', owner: '' }, // Example initial data structure
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const { writeContractAsync: sendToken } = useWriteContract();

  const handleInputChange = (index: number, event: any) => {
    const values = [...formData];
    values[index][event.target.name] = event.target.value;
    setFormData(values);
  };

  const handleAddFields = () => {
    setFormData([...formData, { id: '', name: '', owner: '' }]);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...formData];
    values.splice(index, 1);
    setFormData(values);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setFormData(results.data);
          setOpenModelImportCSV(false);
          event.target.files = null;
        },
        error: () => {
          alert('Error parsing CSV:');
        },
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setLoading(true);

    try {
      const publicLinks = [];
      for (const [_index, item] of formData.entries()) {
        const metadata = {
          name: `ABAII_Certificate_${item.id}`,
          description: `Certificate ID: ${item.id}`,
          external_url:
            'https://firebasestorage.googleapis.com/v0/b/basal-nft.appspot.com/o/abaii.jpg?alt=media&token=c05e4021-b094-40d9-9e53-fe267274bdc3',
          image:
            'https://firebasestorage.googleapis.com/v0/b/basal-nft.appspot.com/o/abaii.jpg?alt=media&token=c05e4021-b094-40d9-9e53-fe267274bdc3',
          attributes: [
            {
              trait_type: 'Name',
              value: item.name,
            },
          ],
        };
        const fileRef = ref(storage, `basalNFT/${item.id}.json`);
        await uploadString(fileRef, JSON.stringify(metadata));
        const publicLink = await getDownloadURL(fileRef);
        publicLinks.push(publicLink);
      }

      sendToken({
        ...certificateNFTContractConfig,
        functionName: 'mintBulk',
        args: [
          formData.map((item: any) => (!!item && item.owner.length > 0 ? item.owner : address)),
          formData.map((item: any) => item.name),
          formData.map((item: any) => item.id),
          publicLinks,
        ],
      })
        .then((txHash: `0x${string}`) => {
          viemClient
            .waitForTransactionReceipt({ hash: txHash })
            .then(async (tx) => {
              if (tx.status === 'success' && tx.logs.length > 1) {
                setLoading(false);
                // const data = decodeEventLog({
                //   abi: certificateNFTContractConfig.abi,
                //   data: tx.logs[1].data,
                //   topics: tx.logs[1].topics,
                // });
              } else {
                setLoading(false);
                throw new Error('Transaction failed');
              }
            })
            .catch((e) => {
              setLoading(false);
              console.log(e);
              alert('Error minting NFT');
            });
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
          alert('Error minting NFT');
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="text-4xl font-semibold">Create certificates</div>

        <div className="flex items-center justify-end gap-4">
          <Dialog open={openModelImportCSV} onOpenChange={setOpenModelImportCSV}>
            <DialogTrigger asChild>
              <Button variant="secondary">Import CSV</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import CSV</DialogTitle>
              </DialogHeader>
              <div>
                <Input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={handleAddFields}
            className="items-center gap-2 rounded-lg"
          >
            <AddCircleIcon />
            Add
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.map((input: any, index: number) => (
          <div key={index} className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              name="id"
              value={input.id}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="ID"
              className="sm:basis-1/3"
              required
            />
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Fullname"
              required
            />
            <div className="flex gap-4 sm:basis-2/3">
              <Input
                type="text"
                name="owner"
                value={input.owner}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Owner"
              />
              <Button
                variant="ghost"
                onClick={() => handleRemoveFields(index)}
                className="rounded-lg p-2 text-red-500 hover:text-red-500"
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <ButtonPrimary type="submit" disabled={loading} className="rounded-lg">
            {loading ? <LoadingIcon /> : 'Mint NFT'}
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default MintPage;
