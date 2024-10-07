'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BiImageAdd } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { LocaleSelect } from '@/components/common/switcher/LocaleSwitcher';
import IconETH from '@/components/icons/ETHIcon';
import CopyButton from '@/components/common/coppyText/CopyButton';
import {
  auth,
  db,
  set,
  ref,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  provider,
  browserSessionPersistence,
  onAuthStateChanged,
  get,
} from '@/lib/firebase';
import convertToVietnamTime from '@/utils/convertToVietnamTime';

export default function Setting() {
  const { address, isConnected } = useAccount();

  const [image, setImage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Lấy người dùng hiện tại từ auth
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser); // Lưu thông tin người dùng vào state

      // Lấy dữ liệu từ Realtime Database bằng user UID
      const userRef = ref(db, 'users/' + currentUser.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val()); // Lưu thông tin người dùng từ DB vào state
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <>
      <div className="mb-4 text-2xl font-bold text-gray-800">Settings</div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-4/12 grid-cols-2 rounded-3xl bg-gray-200 ">
          <TabsTrigger value="profile" className="rounded-2xl">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-2xl">
            Account
          </TabsTrigger>
        </TabsList>
        {/* Edit profile */}
        <TabsContent value="profile">
          <Card className="rounded-2xl p-6">
            <CardContent className="space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <div className="block w-1/2 font-bold text-gray-700">Profile picture</div>
                  <div className="mb-6 flex w-1/2 items-center justify-start space-x-4">
                    {image ? (
                      <img
                        src={image}
                        alt="Profile"
                        className="h-32 w-32 rounded-full border-2 border-white object-cover shadow-lg"
                      />
                    ) : (
                      <div className="relative h-32 w-32 rounded-full border-4 border-white bg-[#FAFAFA] shadow-lg">
                        <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 flex-col items-center gap-2 text-gray-300">
                          <FaUser className="text-4xl text-gray-500 2xl:text-3xl" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="my-8 w-full border-[0.5px] border-gray-50"></div>

                <div className="space-y-4">
                  {userData?.name ? (
                    <div className="flex items-center justify-between">
                      <div className="block w-1/2 font-bold text-gray-700">Name</div>
                      <div className="w-1/2">
                        <input
                          type="text"
                          placeholder={'Name'}
                          disabled
                          value={userData?.name}
                          className="mt-1 block w-full rounded-2xl px-6 py-4 sm:text-base"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between">
                    <div className="block w-1/2 font-bold text-gray-700">Email</div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        placeholder={'Email'}
                        disabled
                        value={userData?.email}
                        className="mt-1 block w-full rounded-2xl px-6 py-4 sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="my-8 w-full border-[0.5px] border-gray-50"></div>

                <div className="flex items-center justify-between">
                  <div className="block w-1/2 font-bold text-gray-700">Language</div>
                  <div className="w-1/2">
                    <LocaleSelect />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Account */}
        <TabsContent value="account">
          <Card className="rounded-2xl p-6">
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="font-bold text-gray-700">Chain</div>
                  <div className="flex items-center gap-2">
                    <IconETH width="24px" height="24px" />
                    <div className="text-gray-400">Ethereum</div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="font-bold text-gray-700">Create Date</div>
                  <div className="text-gray-400">{convertToVietnamTime(userData?.createdAt)}</div>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="font-bold text-gray-700">Wallet Address</div>
                  {isConnected && address ? (
                    <div className="flex items-center gap-2">
                      {address.slice(0, 10)}...{address.slice(-5)}
                      <CopyButton textToCopy={address || ''} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">Connect Wallet</div>
                  )}
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <div className="font-bold text-gray-700">Subscription Plan</div>
                  <div className="w-fit rounded-2xl bg-gray-200 px-3 py-1 text-gray-400">Trial</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
