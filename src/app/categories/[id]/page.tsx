import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Calendar, 
  PartyPopper, 
  Theater, 
  Film, 
  Mic2, 
  Trophy, 
  Users, 
  Heart, 
  Star, 
  Sparkles, 
  Flame,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define interfaces for our data
interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  eventCount: number;
  color: string;
  image: string;
}

interface Event {
  id: string;
  title: string;
  username: string;
  date: string;
  time: string;
  location: string;
  image: string;
  price: string;
  description: string;
}

interface EventsByCategory {
  [key: string]: Event[];
}

// Define the category data (same as in the main categories page)
const categories: Category[] = [
  {
    id: "music",
    name: "Music",
    description: "Live concerts, festivals, and musical performances",
    icon: <Music className="h-6 w-6" />,
    eventCount: 156,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "concerts",
    name: "Concerts",
    description: "Major concert events and performances",
    icon: <Mic2 className="h-6 w-6" />,
    eventCount: 89,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "festivals",
    name: "Festivals",
    description: "Cultural and music festivals",
    icon: <PartyPopper className="h-6 w-6" />,
    eventCount: 45,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "theater",
    name: "Theater",
    description: "Plays, musicals, and theatrical performances",
    icon: <Theater className="h-6 w-6" />,
    eventCount: 67,
    color: "bg-red-500/10 text-white",
    image: "https://images.unsplash.com/photo-1507924538823-ede4a872b5f4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "movies",
    name: "Movies",
    description: "Film screenings and premieres",
    icon: <Film className="h-6 w-6" />,
    eventCount: 34,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Sports events and competitions",
    icon: <Trophy className="h-6 w-6" />,
    eventCount: 78,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "networking",
    name: "Networking",
    description: "Business and social networking events",
    icon: <Users className="h-6 w-6" />,
    eventCount: 92,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "charity",
    name: "Charity",
    description: "Fundraising and charitable events",
    icon: <Heart className="h-6 w-6" />,
    eventCount: 23,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "awards",
    name: "Awards",
    description: "Award ceremonies and recognition events",
    icon: <Star className="h-6 w-6" />,
    eventCount: 15,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "exhibitions",
    name: "Exhibitions",
    description: "Art and cultural exhibitions",
    icon: <Sparkles className="h-6 w-6" />,
    eventCount: 41,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01988d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "conferences",
    name: "Conferences",
    description: "Professional and academic conferences",
    icon: <Calendar className="h-6 w-6" />,
    eventCount: 56,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "trending",
    name: "Trending",
    description: "Popular and trending events",
    icon: <Flame className="h-6 w-6" />,
    eventCount: 112,
    color: "text-white",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
  }
];

// Mock events data for each category
const eventsByCategory: EventsByCategory = {
  music: [
    {
      id: "m1",
      title: "Summer Music Festival",
      date: "July 15-17, 2023",
      time: "3:00 PM - 11:00 PM",
      location: "Central Park, New York",
      username: "John Doe",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
      price: "$150",
      description: "A three-day music festival featuring top artists from around the world."
    },
    {
      id: "m2",
      title: "Jazz Night",
      date: "August 5, 2023",
      time: "8:00 PM - 11:00 PM",
      location: "Blue Note Jazz Club, NYC",
      username: "John Doe",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop",
      price: "$75",
      description: "An evening of smooth jazz with renowned musicians."
    },
    {
      id: "m3",
      title: "Rock Concert",
      date: "September 10, 2023",
      time: "7:00 PM - 10:00 PM",
      location: "Madison Square Garden, NYC",
      username: "John Doe",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070&auto=format&fit=crop",
      price: "$120",
      description: "A night of rock music with legendary bands."
    }
  ],
  concerts: [
    {
      id: "c1",
      title: "Pop Stars Live",
      date: "July 20, 2023",
      time: "7:30 PM - 10:30 PM",
      location: "Barclays Center, Brooklyn",
      username: "John Doe",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
      price: "$95",
      description: "A concert featuring the biggest pop stars of the year."
    },
    {
      id: "c2",
      title: "Classical Symphony",
      date: "August 15, 2023",
      time: "8:00 PM - 10:00 PM",
      location: "Carnegie Hall, NYC",
      username: "John Doe",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop",
      price: "$85",
      description: "An evening of classical music performed by the city's finest orchestra."
    }
  ],
  // Add more events for other categories as needed
  // For simplicity, we'll use the same events for all categories in this example
};

// Generate events for all categories
Object.keys(eventsByCategory).forEach(categoryId => {
  if (categoryId !== "music" && categoryId !== "concerts") {
    eventsByCategory[categoryId] = eventsByCategory.music;
  }
});

// interface CategoryPageProps {
//   params: {
//     id: string;
//   };
// }

export default async function CategoryPage() {
//   const { id } = params;
  
  // Find the category data
  const category = categories.find(cat => cat.id === "music");
  
  // If category not found, return 404
  if (!category) {
    notFound();
  }
  
  // Get events for this category
  const events = eventsByCategory["music"] || [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${category.color}`}>
            {category.icon}
          </div>
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
        </div>
        
        <p className="text-gray-400 max-w-2xl">
          {category.description}
        </p>
      </div>
      
      {/* Category Banner */}
      <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-8">
        <Image 
          src={category.image} 
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{category.eventCount} Events</h2>
            <p className="text-gray-300">Discover and book {category.name.toLowerCase()} events near you</p>
          </div>
        </div>
      </div>
      
      {/* Events List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: Event) => (
            <Link href={`/events/${event.id}`}>
            <Card className='bg-black border-none cursor-pointer'>
            <CardHeader>
                <Image src={event.image} alt="Event Image" width={100} height={100} className='object-cover' />
            </CardHeader>
            <CardContent className='flex items-center justify-between px-4'>
                <div>
                    <h3 className="text-lg text-white font-bold">{event.title}</h3>
                    <p className="text-gray-400">@{event.username}</p>
                </div>
                <div>
                    <Avatar>
                        <AvatarImage src={event.image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>
        </Card>
        </Link>
          ))}
        </div>
      </div>
      
      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 rounded-full bg-gray-800/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
          <p className="text-gray-400 mb-6">There are no upcoming events in this category at the moment.</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Browse All Events
          </Button>
        </div>
      )}
    </div>
  );
}
