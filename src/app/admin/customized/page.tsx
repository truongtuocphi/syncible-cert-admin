/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, onValue, query, orderByChild, equalTo, get } from 'firebase/database';
import { useRouter } from 'next/navigation';

import ButtonCreateFolder from '@/components/common/button/ButtonCreateFolder';
import CertificatePreview from '@/components/pages/admin/CertificatePreview';
import NFTTemplateForm from '@/components/pages/NFTTemplateForm';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { auth, db, set } from '@/lib/firebase';
import { uploadImageToPinata } from '@/lib/pinata';
import { Folder } from '@/types/variable';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL is not defined');
}

const predefinedTemplates = [
  {
    id: 1,
    imageUrl: 'QmbeHMgQXuDCkpPjpQRLb8D4xvFo5cm5QpsPaiZayXri8Y',
    name: 'Certificate 1',
  },
  {
    id: 2,
    imageUrl: 'QmbXHL3ZpZ3xtBD8B3TfaL1Rp6GZrxcaiw1iizPLda4VvW',
    name: 'Certificate 2',
  },
  {
    id: 3,
    imageUrl: 'QmbR2aNgruFrn233dVZaG3pxXGrWoUfyvEtced9mr5bP9Y',
    name: 'Certificate 3',
  },
];

const DefineTemplate = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [authorizingOrgName, setAuthorizingOrgName] = useState('');
  const [headOrgName, setHeadOrgName] = useState('');
  const [headOrgPosition, setHeadOrgPosition] = useState('');
  const [headOrgSignature, setHeadOrgSignature] = useState<File | null>(null);
  const [headLogo, setHeadLogo] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const [mediaSelected, setMediaSelected] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewSignature, setPreviewSignature] = useState<string | null>(null);
  const [previewHeadLogo, setPreviewHeadLogo] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [top, setTop] = useState(20);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setTemplate(file);
      setSelectedTemplate(null);
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setMediaSelected(true);
    }
  };

  const handleSelectTemplate = (templateURL: string) => {
    setSelectedTemplate(templateURL);
    setTemplate(null);
    setPreviewImage(null);
    setMediaSelected(true);
  };

  const handleHeadOrgSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setHeadOrgSignature(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewSignature(fileUrl);
    }
  };

  const handleHeadLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setHeadLogo(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewHeadLogo(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaSelected) {
      alert('Please select a media file or a template.');
      return;
    }

    setLoading(true);

    try {
      const templateIpfsHash = template ? await uploadImageToPinata(template) : null;
      const signatureIpfsHash = headOrgSignature
        ? await uploadImageToPinata(headOrgSignature)
        : null;
      const headLogoIpfsHash = headLogo ? await uploadImageToPinata(headLogo) : null;

      const data = {
        name,
        templateIpfsHash,
        selectedTemplate,
        description,
        authorizingOrgName,
        headOrgName,
        headOrgPosition,
        signatureIpfsHash,
        headLogoIpfsHash,
      };

      if (selectedFolder) {
        const folderRef = ref(db, `folders/${selectedFolder}/data_define`);

        // Đọc dữ liệu hiện tại từ Firebase
        const snapshot = await get(folderRef);
        let currentData = snapshot.val() || [];

        // Nếu currentData là một đối tượng thì chuyển nó thành mảng
        if (typeof currentData === 'object' && !Array.isArray(currentData)) {
          currentData = [currentData];
        }

        // Thêm dữ liệu mới vào mảng
        currentData.push(data);

        // Cập nhật dữ liệu vào Firebase
        await set(folderRef, currentData);
      }
      alert('Created successfully');

      router.push(`/admin/filestorage/${selectedFolder}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
      alert('An error occurred while uploading images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY > 5 ? 100 : 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
            const folderList: Folder[] = Object.entries(data).map(([id, folderData]) => ({
              id,
              name: (folderData as { name: string }).name,
            }));
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

  return (
    <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-7">
      <div className="col-span-3 mx-auto w-full space-y-4 rounded-xl bg-white p-4 text-black">
        <h2 className="text-2xl font-bold">Define Template</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Left Section */}
            <div className="relative w-full">
              <label className="block text-sm font-medium text-gray-700">
                Select Media
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleTemplateChange}
                    className="mt-1 block h-48 w-full cursor-pointer overflow-hidden rounded-md border border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
                    required={!mediaSelected}
                  />
                  {previewImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={previewImage}
                        alt="Selected Media"
                        className="h-48 w-full cursor-pointer rounded-md border border-gray-300 object-cover"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-4 text-xs">
                  Note: The background color of the certificate is light
                </p>
              </label>
            </div>
            <div className="block h-full w-full text-sm font-medium text-gray-700">
              Choose Template
              <div className="flex h-2/3 w-full items-center justify-center">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button className="rounded-full bg-blue-500 text-white">Open Template</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-5xl text-gray-600">
                      <DrawerHeader>
                        <DrawerTitle>Choose Template</DrawerTitle>
                      </DrawerHeader>
                      <div className="mt-2 grid grid-cols-5 gap-4 px-4">
                        {predefinedTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`h-32 w-full cursor-pointer rounded-lg border p-1 ${
                              selectedTemplate === template.imageUrl
                                ? 'border-blue-500'
                                : 'border-gray-300'
                            }`}
                            onClick={() => handleSelectTemplate(template.imageUrl)}
                          >
                            <img
                              src={`${headerURL}/ipfs/${template.imageUrl}`}
                              alt={template.name}
                              className="h-full w-full rounded-md object-fill"
                            />
                            <p className="mt-2 text-center text-sm font-semibold text-gray-600">
                              {template.name}
                            </p>
                          </div>
                        ))}
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button className="mt-4 bg-blue-500 text-white">Submit</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Folder:
                <p className="my-1 text-xs text-gray-500">
                  If you do not have a folder, you can click Create folder to create one.
                </p>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a folder</option>
                    {folders.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                  <ButtonCreateFolder />
                </div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name Template:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Authorizing Organization Name:
                <input
                  type="text"
                  value={authorizingOrgName}
                  onChange={(e) => setAuthorizingOrgName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Head of Organization Name:
                <input
                  type="text"
                  value={headOrgName}
                  onChange={(e) => setHeadOrgName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Head of Organization Position:
                <input
                  type="text"
                  value={headOrgPosition}
                  onChange={(e) => setHeadOrgPosition(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Head of Organization Signature:
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleHeadOrgSignatureChange}
                  required
                  className="mt-1 block w-full cursor-pointer rounded-md border border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                organization&apos;s symbol:
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleHeadLogoChange}
                  required
                  className="mt-1 block w-full cursor-pointer rounded-md border border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  maxLength={40}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview */}
      <div className="col-span-4 flex w-full flex-col items-center justify-between gap-4">
        {headerURL && (
          <div className="sticky h-fit w-full rounded-xl bg-white p-4" style={{ top: `${top}px` }}>
            <h2 className="text-lg font-bold text-gray-600">Preview</h2>
            <div className="h-[170px] sm:h-[270px] lg:h-[420px] 2xl:h-[500px]">
              <CertificatePreview
                headerURL={headerURL}
                description={description}
                previewImage={previewImage}
                selectedTemplate={selectedTemplate}
                previewHeadLogo={previewHeadLogo}
                authorizingOrgName={authorizingOrgName}
                headOrgPosition={headOrgPosition}
                headOrgName={headOrgName}
                previewSignature={previewSignature}
              />
            </div>
          </div>
        )}
        <NFTTemplateForm />
      </div>
    </div>
  );
};

export default DefineTemplate;
