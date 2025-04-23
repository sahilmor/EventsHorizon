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
import { IconBrand4chan, IconHeart, IconList } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  image_url: string;
}

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
  const [wishlistEvents, setWishlistEvents] = useState<Event[]>([]);
  const [bookedEvents, setBookedEvents] = useState<Event[]>([]);
  const [likedEvents, setLikedEvents] = useState<Event[]>([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  const [isLoadingBooked, setIsLoadingBooked] = useState(true);
  const [isLoadingLiked, setIsLoadingLiked] = useState(true);

  useEffect(() => {
    if (user) {
      console.log(user);
      setFullName(user.full_name || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setLocation(user.location || '');
      setBio(user.bio || ''); 
    }
  }, [user]);
  

  useEffect(() => {
    const fetchWishlistEvents = async () => {
      if (user) {
        try {
          setIsLoadingWishlist(true);
          // Get the user's wishlist array from the users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('wishlisted_events')
            .eq('id', user.id)
            .single();

          if (userError) throw userError;

          if (userData?.wishlisted_events?.length > 0) {
            // Fetch the event details for each wishlisted event
            const { data: events, error: eventsError } = await supabase
              .from('events')
              .select('*')
              .in('id', userData.wishlisted_events);

            if (eventsError) throw eventsError;
            setWishlistEvents(events || []);
          } else {
            setWishlistEvents([]);
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        } finally {
          setIsLoadingWishlist(false);
        }
      }
    };

    fetchWishlistEvents();
  }, [user]);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      if (user) {
        try {
          setIsLoadingBooked(true);
          // Get the user's wishlist array from the users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('booked_events')
            .eq('id', user.id)
            .single();

          if (userError) throw userError;

          if (userData?.booked_events?.length > 0) {
            // Fetch the event details for each wishlisted event
            const { data: events, error: eventsError } = await supabase
              .from('events')
              .select('*')
              .in('id', userData.booked_events);

            if (eventsError) throw eventsError;
            setBookedEvents(events || []);
          } else {
            setBookedEvents([]);
          }
        } catch (error) {
          console.error('Error fetching booked events:', error);
        } finally {
          setIsLoadingBooked(false);
        }
      }
    };

    fetchBookedEvents();
  }, [user]);

  useEffect(() => {
    const fetchLikedEvents = async () => {
      if (user) {
        try {
          setIsLoadingLiked(true);
          // Get the user's wishlist array from the users table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('liked_events')
            .eq('id', user.id)
            .single();

          if (userError) throw userError;

          if (userData?.liked_events?.length > 0) {
            // Fetch the event details for each wishlisted event
            const { data: events, error: eventsError } = await supabase
              .from('events')
              .select('*')
              .in('id', userData.liked_events);

            if (eventsError) throw eventsError;
            setLikedEvents(events || []);
          } else {
            setLikedEvents([]);
          }
        } catch (error) {
          console.error('Error fetching liked events:', error);
        } finally {
          setIsLoadingLiked(false);
        }
      }
    };

    fetchLikedEvents();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    
    const success = await updateProfile(
      {
        fullName,
        username,
        phone,
        location,
        bio
      },
      avatarFile
    );
    
    setLoading(false);
    if (success) {
      setIsDialogOpen(false);
      setFullName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setLocation('');
      setBio('');
      setAvatarFile(null);
      toast.success('Profile updated successfully!');
      window.location.reload();
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
                  src={user.avatar_url || '/default-avatar.svg'}
                  alt={user.full_name}
                  width={1000}
                  height={1000}
                />
                <AvatarFallback>
                  {user.full_name
                    ? user.full_name.split(' ').map((n: string) => n[0]).join('')
                    : 'U'}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-white">{user.full_name}</h1>
              <p className="text-gray-300">@{user.username || user.full_name}</p>
              <p className="text-gray-300 text-sm mt-2">{user.bio}</p>
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
                <span className="text-gray-300">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-300">{user.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-gray-300">{user.location}</span>
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
      <Tabs defaultValue={user?.role === 'creator' ? "settings" : "wishlist"} className="w-full">
        <TabsList className="bg-black border-none mb-6">
          {user?.role !== 'creator' && (
            <>
              <TabsTrigger value="wishlist" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
                <IconList className="h-4 w-4 mr-2" />
                Wishlist ({wishlistEvents.length})
              </TabsTrigger>
              <TabsTrigger value="booked" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                Booked Events ({bookedEvents.length})
              </TabsTrigger>
              <TabsTrigger value="liked" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
                <Heart className="h-4 w-4 mr-2" />
                Liked Events ({likedEvents.length})
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="settings" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {user?.role !== 'creator' && (
          <>
            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              {isLoadingWishlist ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : wishlistEvents.length === 0 ? (
                <div className="text-center py-8 w-full">
                  <p className="text-gray-500">No events in your wishlist yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistEvents.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <Card className='bg-black border-none cursor-pointer'>
                        <CardHeader className="relative">
                          <Image src={event.image_url} alt="Event Image" width={100} height={100} className='object-cover brightness-75' />
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
              )}
            </TabsContent>

            {/* Booked Events Tab */}
            <TabsContent value="booked">
              {isLoadingBooked ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : bookedEvents.length === 0 ? (
                <div className="text-center py-8 w-full">
                  <p className="text-gray-500">No events in your booked list yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookedEvents.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <Card className='bg-black border-none cursor-pointer'>
                        <CardHeader className="relative">
                          <Image src={event.image_url} alt="Event Image" width={100} height={100} className='object-cover brightness-75' />
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
              )}
            </TabsContent>

            {/* Liked Events Tab */}
            <TabsContent value="liked">
              {isLoadingLiked ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : likedEvents.length === 0 ? (
                <div className="text-center py-8 w-full">
                  <p className="text-gray-500">No events in your liked list yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedEvents.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <Card className='bg-black border-none cursor-pointer'>
                        <CardHeader className="relative">
                          <Image src={event.image_url} alt="Event Image" width={100} height={100} className='object-cover brightness-75' />
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
              )}
            </TabsContent>
          </>
        )}

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
                
                <Link href="/profile/proffesional-account-setup">
                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg hover:bg-gray-800/50 cursor-pointer">
                  <div className="flex items-center">
                    <IconBrand4chan className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      {user?.role === 'creator' ? (
                        <h3 className="text-white font-medium">Organization / User Account</h3>
                      ) : (
                        <h3 className="text-white font-medium">Organization / Creator Account</h3>
                      )}
                      {user?.role === 'creator' ? (
                        <p className="text-gray-300 text-sm">Manage your organization or creator account</p>
                      ) : (
                        <p className="text-gray-300 text-sm">Manage your organization or user account</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 