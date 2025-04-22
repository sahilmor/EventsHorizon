'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  Heart,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit,
  Bell,
  Lock,
  CreditCard,
  LogOut,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { IconHeart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { wishlistService, WishlistEvent } from '@/services/wishlistService';

// Mock booked events
const bookedEvents = [
  {
    id: "b1",
    title: "Pop Stars Live",
    date: "July 20, 2023",
    location: "Barclays Center, Brooklyn",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    price: "$95",
    status: "Upcoming"
  },
  {
    id: "b2",
    title: "Classical Symphony",
    date: "August 15, 2023",
    location: "Carnegie Hall, NYC",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop",
    price: "$85",
    status: "Upcoming"
  },
  {
    id: "b3",
    title: "Tech Conference 2023",
    date: "June 5, 2023",
    location: "Javits Center, NYC",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    price: "$250",
    status: "Past"
  }
];

export default function UserPage() {
  const { user, loading, setLoading, logout, updateProfile } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [wishlistEvents, setWishlistEvents] = useState<WishlistEvent[]>([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata.full_name || '');
      setEmail(user.email || '');
      setPhone(user.user_metadata.phone || '');
      setLocation(user.user_metadata.location || '');
      setBio(user.user_metadata.bio || '');
    }
  }, [user]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const events = await wishlistService.getUserWishlist(user.id);
          setWishlistEvents(events);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        } finally {
          setIsLoadingWishlist(false);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    
    const success = await updateProfile(
      {
        full_name: fullName,
        phone,
        location,
        bio
      },
      avatarFile
    );
    
    setLoading(false);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view your profile.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="bg-black border-none w-full md:w-1/3">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  className="object-cover"
                  src={user.user_metadata.avatar_url || '/default-avatar.svg'}
                  alt={user.user_metadata.full_name}
                  width={1000}
                  height={1000}
                />
                <AvatarFallback>
                  {user.user_metadata.full_name
                    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('')
                    : 'U'}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-white">{user.user_metadata.full_name}</h1>
              <p className="text-gray-300">@{user.user_metadata.full_name}</p>
              <p className="text-gray-300 text-sm mt-2">{user.user_metadata.bio}</p>
              <div className="flex gap-4 mt-4">
                <Button
                  variant="outline"
                  className="bg-red-500 hover:bg-red-600 border-none text-white hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-none w-full md:w-2/3">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-300">{user.user_metadata.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-300">{user.user_metadata.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-300">{user.user_metadata.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-300">Joined : {new Date(user.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="wishlist" className="w-full">
        <TabsList className="bg-black border-none mb-6">
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
            <Heart className="h-4 w-4 mr-2" />
            Wishlist ({user.wishlistCount})
          </TabsTrigger>
          <TabsTrigger value="booked" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            Booked Events ({user.bookedCount})
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        {isLoadingWishlist ?
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
        :
        wishlistEvents.length === 0 ?
        <div className="text-center py-8 w-full">
          <p className="text-gray-500">No events in your wishlist yet.</p>
        </div>
        :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistEvents.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <Card className='bg-black border-none cursor-pointer'>
                  <CardHeader className="relative">
                    <Image src={event.event.image_url} alt="Event Image" width={100} height={100} className='object-cover brightness-75' />
                    <div className="absolute top-2 right-6">
                      <IconHeart className="h-4 w-4 text-red-500" />
                    </div>
                  </CardHeader>
                  <CardContent className='p-4 space-y-4'>
                    <h3 className="text-lg font-semibold text-white mb-1">{event.event.title}</h3>
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-1 text-red-500" />
                      <span>{event.event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-red-500" />
                      <span>{event.event.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-red-500 font-semibold">{event.event.price}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white w-full hover:text-white">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              ))}
          </div>
          }

          {/* <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
                
                {isLoadingWishlist ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : wishlistEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No events in your wishlist yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistEvents.map((wishlistEvent) => (
                      <Card key={wishlistEvent.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <img
                            src={wishlistEvent.event.image_url}
                            alt={wishlistEvent.event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{wishlistEvent.event.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{wishlistEvent.event.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500 text-sm">
                              {new Date(wishlistEvent.event.date).toLocaleDateString()}
                            </span>
                            <span className="text-gray-500 text-sm">{wishlistEvent.event.location}</span>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-lg font-bold">${wishlistEvent.event.price}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => wishlistService.removeFromWishlist(user!.id, wishlistEvent.event_id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove from Wishlist
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </TabsContent>

        {/* Booked Events Tab */}
        <TabsContent value="booked">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookedEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <Card className='bg-black border-none cursor-pointer'>
                  <CardHeader className="relative">
                    <Image src={event.image} alt="Event Image" width={100} height={100} className='object-cover brightness-75' />
                    <div className="absolute top-2 right-6">
                      <IconHeart className="h-4 w-4 text-red-500" />
                    </div>
                  </CardHeader>
                  <CardContent className='p-4 space-y-4'>
                    <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-1 text-red-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-red-500 font-semibold">{event.price}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white w-full hover:text-white">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card className="bg-black border-none">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
              <CardDescription className="text-gray-300">Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild className="w-full">
                    <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h3 className="text-white font-medium">Profile Information</h3>
                          <p className="text-gray-300 text-sm">Update your personal information</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#111111] border-none text-white">
                    <DialogHeader>
                      <DialogTitle>Profile Information</DialogTitle>
                      <DialogDescription>Update your personal information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label>Full Name</Label>
                      <Input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      <Label>Username</Label>
                      <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                      <Label>Email</Label>
                      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <Label>Phone</Label>
                      <Input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      <Label>Location</Label>
                      <Input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                      <Label>Bio</Label>
                      <Textarea className="resize-none" rows={4} placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                      <Label>Avatar</Label>
                      <Input
                        type="file"
                        placeholder="Avatar"
                        className="file:text-white"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAvatarFile(file);
                          }
                        }}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" className="bg-red-500 hover:bg-red-600 border-none text-white hover:text-white" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button variant="default" className="bg-red-500 hover:bg-red-600 border-none text-white hover:text-white" onClick={handleUpdateProfile} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">Notifications</h3>
                      <p className="text-gray-300 text-sm">Manage your notification preferences</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">Security</h3>
                      <p className="text-gray-300 text-sm">Change your password and security settings</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <h3 className="text-white font-medium">Payment Methods</h3>
                      <p className="text-gray-300 text-sm">Manage your payment information</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 