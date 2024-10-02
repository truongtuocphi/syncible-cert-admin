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

export default function Setting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState('/path/to/default/profile.png');

  const onSubmit = (data: any) => {
    console.log(data);
    // Save user info to Firebase or any backend
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // Preview the uploaded image
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
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-2xl rounded-md bg-white p-4 shadow-md"
              >
                <div className="mb-6 flex items-center space-x-4">
                  <img src={image} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
                  <div>
                    <label htmlFor="profilePic" className="cursor-pointer text-blue-500">
                      Change picture
                    </label>
                    <input
                      type="file"
                      id="profilePic"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => setImage('/path/to/default/profile.png')}
                  >
                    Delete
                  </button>
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
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
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
