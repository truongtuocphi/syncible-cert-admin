'use client';

/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ref, onValue, query, orderByChild, equalTo, get } from 'firebase/database';

import { auth, db, set } from '@/lib/firebase';
import { uploadImageToPinata } from '@/lib/pinata';
import { useRouter } from 'next/navigation';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

if (!headerURL) {
  console.error('NEXT_PUBLIC_HEADER_URL is not defined');
}

const predefinedTemplates = [
  {
    id: 1,
    imageUrl: 'QmUKNhE9wYgq4taG4CZN2gKaWvERgoUQo7Ms9SBhiPuZSy',
    name: 'Certificate 1',
  },
  {
    id: 2,
    imageUrl: 'QmVu93iupu1Bq38y99rKK4vzSKa13VRfbWXiEeuDgeLDRn',
    name: 'Certificate 2',
  },
];

type Folder = {
  id: string;
  name: string;
};

const DefineTemplate = ({ onNext }: { onNext: (data: any) => void }) => {
  const router = useRouter();
  const [authorizingOrgName, setAuthorizingOrgName] = useState('');
  const [headOrgName, setHeadOrgName] = useState('');
  const [headOrgPosition, setHeadOrgPosition] = useState('');
  const [headOrgSignature, setHeadOrgSignature] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [mediaSelected, setMediaSelected] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewSignature, setPreviewSignature] = useState<string | null>(null);
  const [showChooseTemplate, setShowChooseTemplate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [top, setTop] = useState(20);
  const [user, setUser] = useState<User | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('');

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

      const data = {
        templateIpfsHash,
        selectedTemplate,
        description,
        authorizingOrgName,
        headOrgName,
        headOrgPosition,
        signatureIpfsHash,
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
          console.error('Error fetching folders:', error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="flex space-x-6">
      <div className="mx-auto w-[50%] space-y-4 rounded-xl bg-white p-4 text-black">
        <h2 className="text-2xl font-bold">Define Template</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 space-y-4">
            {/* Left Section */}
            <div className="relative w-full">
              <label className="block text-sm font-medium text-gray-700">
                Select Media:
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
            <div>
              <h3 className="text-lg font-semibold">Choose Template:</h3>
              <button
                type="button"
                onClick={() => setShowChooseTemplate(!showChooseTemplate)}
                className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Select template
              </button>
              {showChooseTemplate && (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {predefinedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border p-1 ${
                        selectedTemplate === template.imageUrl
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      }`}
                      onClick={() => handleSelectTemplate(template.imageUrl)}
                    >
                      <img
                        src={`${headerURL}/ipfs/${template.imageUrl}`}
                        alt={template.name}
                        className="h-20 w-full rounded-md object-cover"
                      />
                      <p className="mt-1 text-center text-sm font-semibold text-gray-600">
                        {template.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-3 space-y-4">
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
                Select Folder:
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
      <div className="sticky h-fit w-[50%] rounded-xl bg-white p-4" style={{ top: `${top}px` }}>
        <h2 className="mb-1 text-lg font-bold text-gray-600">Preview</h2>
        <div className="relative h-[360px] w-full overflow-hidden">
          {previewImage || selectedTemplate ? (
            <img
              src={previewImage ? previewImage : `${headerURL}/ipfs/${selectedTemplate}`}
              alt="Certificate Template"
              className="h-full w-full rounded-lg"
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-100">
              <p className="text-sm font-semibold text-gray-600">Preview of your Template</p>
            </div>
          )}

          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            {previewImage || selectedTemplate ? (
              <div className="absolute top-[15%] text-center">
                <h1 className="text-[2vw] font-bold">CHỨNG NHẬN</h1>
                <p className="text-[0.7vw]">{`Số: xxxxx-xxxxx`}</p>
                <h1 className="text-[1.8vw] font-bold">{`Full Name`}</h1>
                <p className="mt-0 text-center text-[1vw]">
                  Đã hoàn thành khóa đào tạo ngắn hạn
                  <br />
                  “ỨNG DỤNG AI TRONG QUẢN LÝ HÀNH CHÍNH”
                </p>
                <span className="mt-2 text-[0.7vw]">xx-xx-xxxx</span>
              </div>
            ) : null}

            <div className="absolute bottom-[10%] left-[7%] flex flex-col items-center">
              {authorizingOrgName && (
                <>
                  {previewSignature && (
                    <img src={`${previewSignature}`} alt="Head Signature" className="w-[4vw]" />
                  )}
                  <div className="text-center">
                    <p className="text-[0.8vw]">{headOrgName}</p>
                    <p className="text-[0.8vw]">{`${headOrgPosition} tổ chức ${authorizingOrgName}`}</p>
                    <p className="text-[0.8vw]">{`Giấy chứng nhận số: xxx-xxx`}</p>
                    <p className="text-[0.8vw]">{`của ${authorizingOrgName}, cấp ngày xx-xx-xxxx`}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefineTemplate;
