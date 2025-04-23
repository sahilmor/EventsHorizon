'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, UserCircle2, Mail, Phone, MapPin, Globe, Image as ImageIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useUser } from "@/context/UserContext";
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const RegisterPage = () => {
  const router = useRouter();
  const { user, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState('creator');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleCreatorRegister = async () => {
    if (!user) return;

    setIsSubmitting(true);
    
    const success = await updateProfile(
      {
        fullName,
        username,
        phone,
        location,
        bio,
        role: 'creator'
      },
      avatarFile
    );

    setIsSubmitting(false);

    if (success) {
      toast.success('Profile updated successfully!');
      router.push('/profile');
    }
  };

  const handleUserRegister = async () => {
    if (!user) return;

    setIsSubmitting(true);
    
    const success = await updateProfile(
      {
        fullName,
        username,
        phone,
        location,
        bio,
        role: 'user'
      },
      avatarFile
    );

    
    if (success) {
      setIsSubmitting(false);
      setFullName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setLocation('');
      setBio('');
      setAvatarFile(null);
      toast.success('Profile updated successfully!');
      router.push('/profile');
      window.location.reload();
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-black border-none max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">Register as a Creator or Organization</CardTitle>
          <CardDescription className="text-gray-400 text-center">Choose your account type and fill in the details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="creator" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-black border-none mb-6 grid w-full grid-cols-2">
              <TabsTrigger 
                value="creator" 
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300"
              >
                <UserCircle2 className="h-4 w-4 mr-2" />
                {user?.role === 'creator' ? 'User' : 'Creator Account'}
              </TabsTrigger>
              <TabsTrigger 
                value="organization" 
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Organization Account
              </TabsTrigger>
            </TabsList>

            {/* Creator Registration Form */}
            <TabsContent value="creator">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Full Name</Label>
                    <Input 
                      type="text" 
                      name="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-gray-900 border-gray-800 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Username</Label>
                    <Input 
                      type="text" 
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      className="bg-gray-900 border-gray-800 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Email</Label>
                    <Input 
                      type="email" 
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="bg-gray-900 border-gray-800 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Phone</Label>
                    <Input 
                      type="tel" 
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="bg-gray-900 border-gray-800 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Location</Label>
                  <Input 
                    type="text" 
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location"
                    className="bg-gray-900 border-gray-800 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Bio</Label>
                  <Textarea 
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    className="bg-gray-900 border-gray-800 text-white resize-none"
                    rows={4}
                    required
                  />
                </div>  

                <div className="space-y-2">
                  <Label className="text-white">Profile Picture</Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-800 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG or JPEG</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAvatarFile(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  disabled={isSubmitting}
                  onClick={user?.role === 'creator' ? handleUserRegister : handleCreatorRegister}
                >
                  {isSubmitting ? 'Registering...' : user?.role === 'creator' ? 'Register as User' : 'Register as Creator'}
                </Button>
              </div>
            </TabsContent>

            {/* Organization Registration Form */}
            <TabsContent value="organization">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Organization Name</Label>
                    <Input 
                      type="text" 
                      placeholder="Enter organization name"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Website</Label>
                    <Input 
                      type="url" 
                      placeholder="Enter organization website"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Email</Label>
                    <Input 
                      type="email" 
                      placeholder="Enter organization email"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Phone</Label>
                    <Input 
                      type="tel" 
                      placeholder="Enter organization phone"
                      className="bg-gray-900 border-gray-800 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Address</Label>
                  <Input 
                    type="text" 
                    placeholder="Enter organization address"
                    className="bg-gray-900 border-gray-800 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea 
                    placeholder="Tell us about your organization"
                    className="bg-gray-900 border-gray-800 text-white resize-none"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Organization Logo</Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-800 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG or JPEG</p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Register as Organization
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;