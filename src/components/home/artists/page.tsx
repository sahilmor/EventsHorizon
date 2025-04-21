'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

// Define types for our data
interface Artist {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  image?: string;
}

// Dummy data for artists
const dummyArtists: Artist[] = [
  {
    id: "1",
    name: "Taylor Swift",
    username: "taylorswift",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    bio: "Singer-songwriter known for her narrative songwriting. Multiple Grammy Award winner and one of the best-selling music artists of all time.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Drake",
    username: "champagnepapi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    bio: "Canadian rapper, singer, songwriter, actor, and entrepreneur. One of the world's best-selling music artists.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Adele",
    username: "adele",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    bio: "English singer-songwriter. Known for her powerful mezzo-soprano voice and emotional ballads.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Ed Sheeran",
    username: "teddysphotos",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    bio: "English singer-songwriter, guitarist, and record producer. Known for his acoustic sound and loop pedal performances.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Beyoncé",
    username: "beyonce",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    bio: "American singer, songwriter, actress, and businesswoman. Known as 'Queen Bey' and one of the most influential artists of all time.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "The Weeknd",
    username: "theweeknd",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    bio: "Canadian singer, songwriter, and record producer. Known for his dark R&B style and distinctive falsetto.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Ariana Grande",
    username: "arianagrande",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    bio: "American singer, songwriter, and actress. Known for her four-octave vocal range and signature ponytail.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
  }
];

const Artists = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [featuredArtist, setFeaturedArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call with setTimeout
        const fetchArtists = async () => {
            try {
                setLoading(true);
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Use dummy data instead of API call
                const allArtists = dummyArtists;
                
                // Set featured artist (first one in the array)
                if (allArtists.length > 0) {
                    setFeaturedArtist(allArtists[0]);
                }
                
                // Set the remaining artists for the side columns
                setArtists(allArtists.slice(1, 7));
                
            } catch (err) {
                console.error('Error loading artists:', err);
                setError('Failed to load artists. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    // Function to render artist card
    const renderArtistCard = (artist: Artist) => (
        <div key={artist.id} className='flex items-center justify-between bg-black p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
                <div>
                    <Avatar>
                        <AvatarImage src={artist.avatar} alt={artist.name} />
                        <AvatarFallback>{artist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h3 className="text-lg text-white font-bold">{artist.name}</h3>
                    <p className="text-gray-400">@{artist.username}</p>
                </div>
            </div>
            <div>
                <Button>
                    Follow
                </Button>
            </div>
        </div>
    );

    // Function to render loading skeleton
    const renderSkeleton = () => (
        <div className='flex items-center justify-between bg-black p-4 rounded-lg'>
            <div className='flex items-center gap-2'>
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
            <Skeleton className="h-9 w-20" />
        </div>
    );

    // Function to render featured artist card
    const renderFeaturedArtist = () => {
        if (loading) {
            return (
                <Card className='bg-black border-none'>
                    <CardHeader>
                        <Skeleton className="h-48 w-full rounded-md" />
                    </CardHeader>
                    <CardContent className='flex flex-col gap-4 px-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <Skeleton className="h-5 w-32 mb-1" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-9 w-20" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </CardContent>
                </Card>
            );
        }

        if (featuredArtist) {
            return (
                <Card className='bg-black border-none cursor-pointer'>
                    <CardHeader>
                        <Image 
                            src={featuredArtist.image || "https://via.placeholder.com/600x400"} 
                            alt={featuredArtist.name} 
                            width={100} 
                            height={100} 
                            className='object-cover w-full h-48 rounded-md' 
                        />
                    </CardHeader>
                    <CardContent className='flex flex-col gap-4 px-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h3 className="text-lg text-white font-bold">{featuredArtist.name}</h3>
                                <p className="text-gray-400">@{featuredArtist.username}</p>
                            </div>
                            <div>
                                <Button>
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div>
                            <p className='text-gray-400'>{featuredArtist.bio || 'No bio available'}</p>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return null;
    };

    return (
        <div>
            <div className='py-4 flex items-center justify-between'>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">Artists & Organizer</h2>
                <Link href="/artists">
                    <h3 className='text-red-500 cursor-pointer'>See all</h3>
                </Link>
            </div>
            
            {error ? (
                <div className="text-red-500 p-4 bg-red-900/20 rounded-lg">
                    {error}
                </div>
            ) : (
                <div className='grid grid-cols-3 gap-4'>
                    <div className='grid grid-cols-1 grid-rows-3 gap-4'>
                        {loading 
                            ? Array(3).fill(0).map((_, i) => <div key={`left-${i}`}>{renderSkeleton()}</div>)
                            : artists.slice(0, 3).map(artist => renderArtistCard(artist))
                        }
                    </div>

                    <div className='grid grid-cols-1 grid-rows-1'>
                        {renderFeaturedArtist()}
                    </div>

                    <div className='grid grid-cols-1 grid-rows-3 gap-4'>
                        {loading 
                            ? Array(3).fill(0).map((_, i) => <div key={`right-${i}`}>{renderSkeleton()}</div>)
                            : artists.slice(3, 6).map(artist => renderArtistCard(artist))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Artists;