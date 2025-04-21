'use client'
import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UpcomingEvents = () => {
    const [selectedCard, setSelectedCard] = useState<{
        id: number;
        name: string;
        username: string;
        imageUrl: string;
        avatarImg: string;
        venue: string;
        date: string;
        time: string;
        price: number;
        facebookUrl: string;
        twitterUrl: string;
        instagramUrl: string;
    } | null>(null);

    const cardsData = [
        {
            id: 1,
            name: "John Doe",
            username: "johndoe",
            imageUrl: "https://via.placeholder.com/600x400",
            avatarImg: "https://via.placeholder.com/100",
            venue: "Central Park",
            date: "2022-09-01",
            time: "12:00 PM",
            price: 100,
            facebookUrl: "https://www.facebook.com",
            twitterUrl: "https://www.twitter.com",
            instagramUrl: "https://www.instagram.com",
        },
        {
            id: 2,
            name: "Jane Smith",
            username: "janesmith",
            imageUrl: "https://via.placeholder.com/600x400",
            avatarImg: "https://via.placeholder.com/100",
            venue: "Times Square",
            date: "2022-09-02",
            time: "1:00 PM",
            price: 200,
            facebookUrl: "https://www.facebook.com",
            twitterUrl: "https://www.twitter.com",
            instagramUrl: "https://www.instagram.com",
        },
        {
            id: 3,
            name: "Alice Johnson",
            username: "alicej",
            imageUrl: "https://via.placeholder.com/600x400",
            avatarImg: "https://via.placeholder.com/100",
            venue: "Brooklyn Bridge",
            date: "2022-09-03",
            time: "2:00 PM",
            price: 300,
            facebookUrl: "https://www.facebook.com",
            twitterUrl: "https://www.twitter.com",
            instagramUrl: "https://www.instagram.com",

        },
        {
            id: 4,
            name: "Bob Williams",
            username: "bobw",
            imageUrl: "https://via.placeholder.com/600x400",
            avatarImg: "https://via.placeholder.com/100",
            venue: "Empire State Building",
            date: "2022-09-04",
            time: "3:00 PM",
            price: 400,
            facebookUrl: "https://www.facebook.com",
            twitterUrl: "https://www.twitter.com",
            instagramUrl: "https://www.instagram.com",
        },
        {
            id: 5,
            name: "Charlie Brown",
            username: "charlieb",
            imageUrl: "https://via.placeholder.com/600x400",
            avatarImg: "https://via.placeholder.com/100",
            venue: "Statue of Liberty",
            date: "2022-09-05",
            time: "4:00 PM",
            price: 500,
            facebookUrl: "https://www.facebook.com",
            twitterUrl: "https://www.twitter.com",
            instagramUrl: "https://www.instagram.com",
        },
    ];

    return (
        <div>
            <div className='py-4 flex items-center justify-between'>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">Upcoming Events</h2>
                <Link href="/upcomingevents">
                    <h3 className='text-red-500 cursor-pointer'>See all</h3>
                </Link>
            </div>
            <div className="grid grid-cols-5 grid-rows-1 gap-4">
                {cardsData.map((card) => (
                    <Sheet key={card.id} >
                        <SheetTrigger asChild>
                            <Card className='bg-black border-none cursor-pointer' onClick={() => setSelectedCard(card)}>
                                <CardHeader>
                                    <Image src={card.imageUrl} alt="Event Image" width={100} height={100} className='object-cover' />
                                </CardHeader>
                                <CardContent className='flex items-center justify-between px-4'>
                                    <div>
                                        <h3 className="text-lg text-white font-bold">{card.name}</h3>
                                        <p className="text-gray-400">@{card.username}</p>
                                    </div>
                                    <div>
                                        <Avatar>
                                            <AvatarImage src={card.avatarImg} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </CardContent>
                            </Card>
                        </SheetTrigger>
                        <SheetContent className='bg-black border-none p-2'>
                            <SheetHeader>
                                <SheetTitle className='text-white text-3xl'>{selectedCard?.name}</SheetTitle>
                                <SheetDescription>
                                    <Image src={selectedCard?.imageUrl || ''} alt="Event Image" width={300} height={200} className='object-cover mt-6' />
                                    <div className='mt-6 w-full'>
                                        <h1>Venue</h1>
                                        <p className='text-white'>{selectedCard?.venue}</p>
                                    </div>
                                    <div className='flex gap-4 mt-6 items-start justify-between w-3/4'>
                                        <div>
                                            <h1>Date</h1>
                                            <p className='text-white'>{selectedCard?.date}</p>
                                            <p className='text-white'>{selectedCard?.time}</p>
                                        </div>
                                        <div>
                                            <h1>Price</h1>
                                            <p className='text-white'>${selectedCard?.price}</p>
                                        </div>
                                    </div>
                                    <div className='w-full mt-6'>
                                        <Button className='bg-red-500 text-white mt-6 hover:bg-red-600 w-full cursor-pointer'>
                                            Buy Tickets
                                        </Button>
                                    </div>
                                    <div className='mt-6'>
                                        <h1>Organizers</h1>
                                        <p className='text-white'>@{selectedCard?.username}</p>
                                    </div>
                                    <div className='mt-6'>
                                        <h1>Share</h1>
                                        <div className='flex gap-4 items-center text-white mt-2'>
                                        <a href={selectedCard?.facebookUrl}>
                                            <Facebook size={24} />
                                        </a>
                                        <a href={selectedCard?.twitterUrl}>
                                            <Twitter size={24} />
                                        </a>
                                        <a href={selectedCard?.instagramUrl}>
                                            <Instagram size={24} />
                                        </a>
                                        </div>
                                    </div>
                                    <div className='mt-12 text-center'>
                                        <Link href={`/upcomingevents/${selectedCard?.id}`}>
                                        <h1 className='text-white/50 text-sm cursor-pointer hover:text-white transition-all duration-300'>View Event</h1>
                                        </Link>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                ))}
            </div>
        </div>
    );
}

export default UpcomingEvents;