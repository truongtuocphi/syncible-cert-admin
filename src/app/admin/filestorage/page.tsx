'use client';

import { useEffect, useState } from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, set, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { FcOpenedFolder } from 'react-icons/fc';
import { HiTemplate } from 'react-icons/hi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, db } from '@/lib/firebase';
import Link from 'next/link';

export default function FileStorage() {
  const [inputValue, setInputValue] = useState('');
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const foldersRef = ref(db, 'folders');
      const userFoldersQuery = query(foldersRef, orderByChild('createdBy'), equalTo(user.uid));

      const unsubscribe = onValue(
        userFoldersQuery,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const folderList = Object.values(data);
            setFolders(folderList);
          } else {
            setFolders([]);
          }
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.error('Error fetching folders:', error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim() === '' || !user) return;

    try {
      const timestamp = Date.now();
      const customId = `${folderName}_${timestamp}`;
      const folderRef = ref(db, `folders/${customId}`);

      await set(folderRef, {
        id: customId,
        name: folderName,
        createdAt: timestamp,
        createdBy: user.uid,
      });

      setFolderName('');
      alert('Folder created successfully!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating folder:', error);
      alert('Failed to create folder.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Command className="w-2/5 rounded-xl border-[0.5px] border-gray-300">
          <CommandInput
            placeholder="Type a command or search..."
            value={inputValue}
            onValueChange={(value: string) => setInputValue(value)}
            className="rounded-full"
          />
          <CommandList>
            {inputValue ? <CommandEmpty>No results found.</CommandEmpty> : null}
          </CommandList>
        </Command>

        {user && (
          <Dialog>
            <DialogTrigger asChild>
              <ButtonPrimary>Create folder</ButtonPrimary>
            </DialogTrigger>
            <DialogContent className="text-black sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create folder</DialogTitle>
                <DialogDescription>Create folders for easy management.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateFolder} className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="folderName" className="sr-only">
                    Folder Name
                  </Label>
                  <Input
                    id="folderName"
                    placeholder="Name folder"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    required
                  />
                </div>
                <ButtonPrimary type="submit">Create folder</ButtonPrimary>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="mt-8">
        {folders.length > 0 ? (
          <ul className="grid w-full grid-cols-6">
            {folders.map((folder) => (
              <Link href={`/admin/filestorage/${folder.id}`} key={folder.id}>
                <li className="flex cursor-pointer flex-col items-center">
                  <FcOpenedFolder className="text-8xl" />
                  <span className="text-xl font-bold text-gray-500">{folder.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <HiTemplate className="text-7xl text-gray-500" />
              <div className="text-lg font-semibold text-gray-500">No Items</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
