'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
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
import { FaImage } from 'react-icons/fa';

export default function Setting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState('');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); 
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold text-gray-800">Settings</div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-4/12 grid-cols-3 rounded-3xl bg-gray-200 ">
          <TabsTrigger value="profile" className="rounded-2xl">
            Edit profile
          </TabsTrigger>
          <TabsTrigger value="account" className="rounded-2xl">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="rounded-2xl">
            Password
          </TabsTrigger>
        </TabsList>
        {/* Edit profile */}
        <TabsContent value="profile">
          <Card className="rounded-2xl p-6">
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                          <FaImage className="text-2xl text-gray-500 2xl:text-3xl" />
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="hidden"
                        id="file-upload"
                      />
                      <div className="flex items-center gap-4">
                        <label
                          htmlFor="file-upload"
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-500 hover:bg-gray-100"
                        >
                          <BiImageAdd className="text-2xl text-black" />
                          Change picture
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">First Name</label>
                  <input
                    {...register('firstName', { required: true })}
                    className={`mt-1 w-full border p-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="First Name"
                  />
                  {errors.firstName && <span className="text-red-500">First Name is required</span>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    {...register('lastName', { required: true })}
                    className={`mt-1 w-full border p-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && <span className="text-red-500">Last Name is required</span>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Institution Name</label>
                  <input
                    {...register('institution', { required: true })}
                    className={`mt-1 w-full border p-2 ${errors.institution ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="Institution Name"
                  />
                  {errors.institution && (
                    <span className="text-red-500">Institution Name is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email format',
                      },
                    })}
                    className={`mt-1 w-full border p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                    placeholder="Email"
                    disabled
                  />
                  {/* {errors.email && <span className="text-red-500">{errors.email.message}</span>} */}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Language</label>
                  <select
                    {...register('language', { required: true })}
                    className={`mt-1 w-full border p-2 ${errors.language ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  >
                    <option value="English">English</option>
                    <option value="Vietnamese">Vietnamese</option>
                    {/* Add more languages */}
                  </select>
                  {errors.language && (
                    <span className="text-red-500">Language selection is required</span>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-purple-600 px-6 py-2 text-white hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Account */}
        <TabsContent value="account">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {/* Password */}
        <TabsContent value="password">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
