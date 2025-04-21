'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const AllTrendingEvents = () => {
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
        {
            id: 6,
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
        {
            id: 7,
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
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">All Trending Events</h2>
            </div>
            <div className="grid grid-cols-5 grid-rows-1 gap-4">
                {cardsData.map((card) => (
                    <Link href={`/trendingevents/${card.id}`}>
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
                </Link>
                ))}
            </div>
        </div>
    );
}

export default AllTrendingEvents;