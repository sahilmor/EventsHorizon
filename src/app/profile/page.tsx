import React from "react";
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

// Mock user data
const user = {
  id: "user123",
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Event enthusiast and music lover. Always looking for the next great experience!",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
  joinedDate: "January 2023",
  wishlistCount: 12,
  bookedCount: 8
};

// Mock wishlist events
const wishlistEvents = [
  {
    id: "w1",
    title: "Summer Music Festival",
    date: "July 15-17, 2023",
    location: "Central Park, New York",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    price: "$150"
  },
  {
    id: "w2",
    title: "Jazz Night",
    date: "August 5, 2023",
    location: "Blue Note Jazz Club, NYC",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop",
    price: "$75"
  },
  {
    id: "w3",
    title: "Rock Concert",
    date: "September 10, 2023",
    location: "Madison Square Garden, NYC",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop",
    price: "$120"
  }
];

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
  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Card className="bg-black border-none w-full md:w-1/3">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-300">@{user.username}</p>
              <p className="text-gray-300 text-sm mt-2">{user.bio}</p>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" className="bg-red-500 hover:bg-red-600 border-none text-white hover:text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="bg-red-500 hover:bg-red-600 border-none text-white hover:text-white">
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
                <span className="text-gray-300">Joined {user.joinedDate}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <Card className='bg-black border-none cursor-pointer'>
                  <CardHeader className="relative">
                    <Image src={event.image} alt="Event Image" width={100} height={100} className='object-cover' />
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