'use client'
import React, { useState } from 'react';
import { Music, Users, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

// Define artist data structure
interface Artist {
    id: number;
    name: string;
    username: string;
    imageUrl: string;
    avatarImg: string;
    bio: string;
    followers: number;
    events: number;
    genres: string[];
    location: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
    };
}

const ArtistsPage = () => {
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    // Dummy artist data
    const artistsData: Artist[] = [
        {
            id: 1,
            name: "Taylor Swift",
            username: "taylorswift",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            bio: "Singer-songwriter known for her narrative songwriting. Multiple Grammy Award winner.",
            followers: 2500000,
            events: 12,
            genres: ["Pop", "Country", "Indie"],
            location: "Nashville, TN",
            socialLinks: {
                facebook: "https://www.facebook.com/taylorswift",
                twitter: "https://www.twitter.com/taylorswift13",
                instagram: "https://www.instagram.com/taylorswift"
            }
        },
        {
            id: 2,
            name: "Drake",
            username: "champagnepapi",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            bio: "Canadian rapper, singer, songwriter, actor, and entrepreneur. One of the world's best-selling music artists.",
            followers: 3200000,
            events: 8,
            genres: ["Hip Hop", "R&B", "Pop"],
            location: "Toronto, Canada",
            socialLinks: {
                facebook: "https://www.facebook.com/drake",
                twitter: "https://www.twitter.com/drake",
                instagram: "https://www.instagram.com/champagnepapi"
            }
        },
        {
            id: 3,
            name: "Adele",
            username: "adele",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            bio: "English singer-songwriter. Known for her powerful mezzo-soprano voice and emotional ballads.",
            followers: 1800000,
            events: 5,
            genres: ["Pop", "Soul", "Jazz"],
            location: "London, UK",
            socialLinks: {
                facebook: "https://www.facebook.com/adele",
                twitter: "https://www.twitter.com/adele",
                instagram: "https://www.instagram.com/adele"
            }
        },
        {
            id: 4,
            name: "Ed Sheeran",
            username: "teddysphotos",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            bio: "English singer-songwriter, guitarist, and record producer. Known for his acoustic sound and loop pedal performances.",
            followers: 2100000,
            events: 10,
            genres: ["Pop", "Folk", "Acoustic"],
            location: "Suffolk, UK",
            socialLinks: {
                facebook: "https://www.facebook.com/edsheeran",
                twitter: "https://www.twitter.com/edsheeran",
                instagram: "https://www.instagram.com/teddysphotos"
            }
        },
        {
            id: 5,
            name: "Beyoncé",
            username: "beyonce",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            bio: "American singer, songwriter, actress, and businesswoman. Known as 'Queen Bey' and one of the most influential artists of all time.",
            followers: 2800000,
            events: 7,
            genres: ["R&B", "Pop", "Hip Hop"],
            location: "Houston, TX",
            socialLinks: {
                facebook: "https://www.facebook.com/beyonce",
                twitter: "https://www.twitter.com/beyonce",
                instagram: "https://www.instagram.com/beyonce"
            }
        },
        {
            id: 6,
            name: "The Weeknd",
            username: "theweeknd",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            bio: "Canadian singer, songwriter, and record producer. Known for his dark R&B style and distinctive falsetto.",
            followers: 1900000,
            events: 9,
            genres: ["R&B", "Pop", "Hip Hop"],
            location: "Toronto, Canada",
            socialLinks: {
                facebook: "https://www.facebook.com/theweeknd",
                twitter: "https://www.twitter.com/theweeknd",
                instagram: "https://www.instagram.com/theweeknd"
            }
        },
        {
            id: 7,
            name: "Ariana Grande",
            username: "arianagrande",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            bio: "American singer, songwriter, and actress. Known for her four-octave vocal range and signature ponytail.",
            followers: 2200000,
            events: 11,
            genres: ["Pop", "R&B", "Hip Hop"],
            location: "Boca Raton, FL",
            socialLinks: {
                facebook: "https://www.facebook.com/arianagrande",
                twitter: "https://www.twitter.com/arianagrande",
                instagram: "https://www.instagram.com/arianagrande"
            }
        },
    ];

    return (
        <div>
            <div className='py-4 flex items-center justify-between'>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">All Artists</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artistsData.map((artist) => (
                    <Link href={`/artists/${artist.id}`} key={artist.id}>

                        <Card className="bg-black border-none cursor-pointer overflow-hidden hover:shadow-xl transition duration-200">
                            <CardHeader>
                            <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                                <Image 
                                    src={artist.imageUrl} 
                                    alt={`${artist.name} Artist`} 
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg text-white font-bold">{artist.name}</h3>
                                        <p className="text-gray-400">@{artist.username}</p>
                                    </div>
                                    <Avatar>
                                        <AvatarImage src={artist.avatarImg} />
                                        <AvatarFallback>{artist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Music size={16} />
                                        <span>{artist.genres.join(", ")}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <MapPin size={16} />
                                        <span>{artist.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Users size={16} />
                                        <span>{artist.followers.toLocaleString()} followers</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar size={16} />
                                        <span>{artist.events} upcoming events</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ArtistsPage;