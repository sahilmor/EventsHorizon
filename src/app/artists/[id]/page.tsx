import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Music, Users, Facebook, Twitter, Instagram, Globe, Mail, Phone, Clock } from 'lucide-react';
import { notFound } from "next/navigation";

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
    status: 'upcoming' | 'ongoing' | 'past';
    ticketPrice: string;
    description: string;
}

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
        website?: string;
    };
    contactInfo: {
        email?: string;
        phone?: string;
    };
    description: string;
    achievements: string[];
    pastEvents: Event[];
    upcomingEvents: Event[];
    ongoingEvents: Event[];
}

// Define the props interface for the page component
// interface ArtistPageProps {
//   params: {
//     id: string;
//   };
// }

// This is a server component
export default async function ArtistPage() {
    //   const { id } = params;

    // Mock artist data - replace with actual data fetching
    const artist: Artist = {
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
            instagram: "https://www.instagram.com/taylorswift",
            website: "https://www.taylorswift.com"
        },
        contactInfo: {
            email: "contact@taylorswift.com",
            phone: "+1 (555) 123-4567"
        },
        description: "Taylor Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread media coverage and critical praise.",
        achievements: [
            "12 Grammy Awards",
            "1 Emmy Award",
            "40 American Music Awards",
            "29 Billboard Music Awards",
            "3 IFPI Global Recording Artist of the Year awards"
        ],
        pastEvents: [
            {
                id: 1,
                title: "The Eras Tour - Nashville",
                date: "2023-05-05",
                time: "19:00",
                location: "Nissan Stadium, Nashville",
                imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                status: 'past',
                ticketPrice: "$49.99 - $449.99",
                description: "The Eras Tour is the sixth concert tour by American singer-songwriter Taylor Swift."
            }
        ],
        upcomingEvents: [
            {
                id: 2,
                title: "The Eras Tour - London",
                date: "2024-06-15",
                time: "19:00",
                location: "Wembley Stadium, London",
                imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                status: 'upcoming',
                ticketPrice: "£89.99 - £499.99",
                description: "The Eras Tour continues in London with a spectacular show at Wembley Stadium."
            }
        ],
        ongoingEvents: [
            {
                id: 3,
                title: "Midnights Album Release Party",
                date: "2024-03-15",
                time: "20:00",
                location: "Madison Square Garden, NYC",
                imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                status: 'ongoing',
                ticketPrice: "$79.99 - $299.99",
                description: "Celebrate the release of Midnights with an exclusive live performance."
            }
        ]
    };

    // If artist not found, return 404
    if (!artist) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-[#111111] text-white">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
                <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={artist.avatarImg} />
                            <AvatarFallback className="bg-red-500 text-white">{artist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
                            <p className="text-gray-300">@{artist.username}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Artist Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-black border-none">
                        <CardHeader>
                            <CardTitle className="text-white">About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300">{artist.description}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-none">
                        <CardHeader>
                            <CardTitle className="text-white">Quick Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-300">
                                <MapPin className="h-4 w-4 text-red-500" />
                                <span>{artist.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Music className="h-4 w-4 text-red-500" />
                                <div className="flex flex-wrap gap-2">
                                    {artist.genres.map((genre) => (
                                        <Badge key={genre} variant="destructive" className="bg-red-900/30 text-red-400 border-red-800">{genre}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Users className="h-4 w-4 text-red-500" />
                                <span>{artist.followers.toLocaleString()} followers</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-none">
                        <CardHeader>
                            <CardTitle className="text-white">Contact & Social</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {artist.contactInfo.email && (
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Mail className="h-4 w-4 text-red-500" />
                                    <span>{artist.contactInfo.email}</span>
                                </div>
                            )}
                            {artist.contactInfo.phone && (
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Phone className="h-4 w-4 text-red-500" />
                                    <span>{artist.contactInfo.phone}</span>
                                </div>
                            )}
                            <div className="flex gap-4">
                                {artist.socialLinks.facebook && (
                                    <a href={artist.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                )}
                                {artist.socialLinks.twitter && (
                                    <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                                {artist.socialLinks.instagram && (
                                    <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                )}
                                {artist.socialLinks.website && (
                                    <a href={artist.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 transition-colors">
                                        <Globe className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-black border-none">
                        <CardHeader>
                            <CardTitle className="text-white">Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-gray-300">
                                {artist.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Events */}
                <div className="lg:col-span-2">
                    <ArtistEventsTabs
                        upcomingEvents={artist.upcomingEvents}
                        ongoingEvents={artist.ongoingEvents}
                        pastEvents={artist.pastEvents}
                    />
                </div>
            </div>
        </div>
    );
}

// Client component for the tabs
function ArtistEventsTabs({
    upcomingEvents,
    ongoingEvents,
    pastEvents
}: {
    upcomingEvents: Event[],
    ongoingEvents: Event[],
    pastEvents: Event[]
}) {
    return (
        <Tabs defaultValue="ongoing" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black border-none">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">Upcoming Events</TabsTrigger>
                <TabsTrigger value="ongoing" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">Ongoing Events</TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300">Past Events</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </TabsContent>
            <TabsContent value="ongoing" className="space-y-4">
                {ongoingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
                {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </TabsContent>
        </Tabs>
    );
}

// Client component for the event card
const EventCard = ({ event }: { event: Event }) => {
    return (
        <Card className="overflow-hidden bg-black border-none">
            <CardHeader>
                <div className="relative h-48 w-full">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{event.title}</h3>
                <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span>{event.ticketPrice}</span>
                    </div>
                </div>
                <p className="mt-4 text-gray-300">{event.description}</p>
                <Button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white">Get Tickets</Button>
            </CardContent>
        </Card>
    );
};