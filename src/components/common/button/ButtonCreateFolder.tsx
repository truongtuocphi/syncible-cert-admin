import ButtonPrimary from '@/components/common/button/ButtonPrimary';
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
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function ButtonCreateFolder() {
  const [folderName, setFolderName] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false); // Đóng modal sau khi tạo thành công
      alert('Folder created successfully!');
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ButtonPrimary onClick={() => setIsOpen(true)}>Create folder</ButtonPrimary>
      </DialogTrigger>
      <DialogContent className="text-black sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
          <DialogDescription>Create folders for easy management.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
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
          <ButtonPrimary type="button" onClick={handleCreateFolder}>
            Create folder
          </ButtonPrimary>
        </div>
      </DialogContent>
    </Dialog>
  );
}
