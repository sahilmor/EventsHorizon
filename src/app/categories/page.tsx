import React from "react";
import { Card } from "@/components/ui/card";
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
  Flame 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  eventCount: number;
  color: string;
  image: string;
}

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

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Event Categories</h1>
        <p className="text-gray-400">
          Browse events by category to find exactly what you&apos;re looking for
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id}>
            <Card className="p-6 transition-all cursor-pointer h-full border-1 border-gray-800 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 z-0">
                <Image 
                  src={category.image} 
                  alt={category.name}
                  fill
                  className="object-cover brightness-50"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    {category.icon}
                  </div>
                  <span className="text-sm text-gray-300">
                    {category.eventCount} events
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {category.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 