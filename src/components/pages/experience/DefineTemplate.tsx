import { useState } from 'react';

import { uploadImageToPinata } from '@/lib/pinata';

const headerURL = process.env.NEXT_PUBLIC_HEADER_URL;

if (!headerURL) {
  // eslint-disable-next-line no-console
  console.error('NEXT_PUBLIC_HEADER_URL không được định nghĩa');
}

const predefinedTemplates = [
  {
    id: 1,
    imageUrl: 'QmUKNhE9wYgq4taG4CZN2gKaWvERgoUQo7Ms9SBhiPuZSy',
    name: 'Certificate 1',
  },
  {
    id: 2,
    imageUrl: 'QmRGhFiD5btgJn788WqTrtEDPNF6M2SxhMr4irZBVggSXF',
    name: 'Certificate 2',
  },
];

// eslint-disable-next-line no-unused-vars
const DefineTemplate = ({ onNext }: { onNext: (data: any) => void }) => {
  const [template, setTemplate] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [authorizingOrgName, setAuthorizingOrgName] = useState('');
  const [headOrgName, setHeadOrgName] = useState('');
  const [headOrgPosition, setHeadOrgPosition] = useState('');
  const [headOrgSignature, setHeadOrgSignature] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showChooseTemplate, setShowChooseTemplate] = useState(false);
  const [mediaSelected, setMediaSelected] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setHeadOrgSignature(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaSelected) {
      alert('Please select a media file or a template.');
      return;
    }

    setLoading(true); // Set loading to true when the form is submitted

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
      onNext(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', error);
      alert('An error occurred while uploading images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-full space-y-4 rounded-xl bg-white p-4 text-black">
      <h2 className="text-2xl font-bold">Define Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          {/* Left Section */}
          <div className="flex gap-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Select Media:
                <div className="relative">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleTemplateChange}
                    className="mt-1 block h-56 w-full cursor-pointer overflow-hidden border border-dotted border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none"
                    required={!mediaSelected}
                  />
                  {previewImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={previewImage}
                        alt="Selected Media"
                        className="h-56 w-full cursor-pointer rounded-md border border-gray-300 object-cover"
                      />
                    </div>
                  )}
                </div>
                <p className="mt-4">Note: The background color of the certificate is light</p>
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Choose Template:</h3>
              <button
                type="button"
                onClick={() => setShowChooseTemplate(!showChooseTemplate)}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Select template
              </button>
              {showChooseTemplate && (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {predefinedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border p-2 ${
                        selectedTemplate === template.imageUrl
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      }`}
                      onClick={() => handleSelectTemplate(template.imageUrl)}
                    >
                      <img
                        src={`${headerURL}/ipfs/${template.imageUrl}`}
                        alt={template.name}
                        className="h-24 w-full rounded-md object-cover"
                      />
                      <p className="mt-1 text-center">{template.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 space-y-4">
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
                  className="mt-1 block w-full cursor-pointer border border-dotted border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Next'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DefineTemplate;
