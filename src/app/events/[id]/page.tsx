import Image from 'next/image';
import React from 'react';
import { IconCalendar, IconMapPin, IconUsers, IconTicket, IconShare, IconHeart, IconList } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

// interface Params {
//     id: string;
// }

const EventDetails = () => {
  const event = {
    name: "Summer Music Festival 2023",
    date: "July 15-17, 2023",
    time: "3:00 PM - 11:00 PM",
    location: "Central Park, New York City",
    attendees: 2500,
    price: "$99.99",
    description: "Join us for the biggest music festival of the summer! Featuring over 50 artists across 5 stages, food vendors, art installations, and more. Don't miss out on this unforgettable experience.",
    organizer: "Event Horizon Productions",
    category: "Music Festival",
    tags: ["Music", "Festival", "Summer", "Outdoor"],
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Hero Image Section */}
      <div className='relative w-full h-[50vh]'>
        <Image 
          src={event.image}
          alt={event.name} 
          fill
          className='object-cover'
          priority
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center'>
          <h1 className='text-white text-4xl md:text-5xl font-bold mb-2'>{event.name}</h1>
          <div className="flex items-center gap-2 text-white/80">
            <IconCalendar size={18} />
            <span>{event.date}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-black rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-white/80 leading-relaxed">{event.description}</p>
            </section>

            {/* Event Details Section */}
            <section className="bg-black rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <IconCalendar className="text-white/70 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Date & Time</h3>
                    <p className="text-white/70">{event.date} • {event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMapPin className="text-white/70 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-white/70">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconUsers className="text-white/70 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Attendees</h3>
                    <p className="text-white/70">{event.attendees.toLocaleString()} people attending</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconTicket className="text-white/70 mt-1 shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">Price</h3>
                    <p className="text-white/70">{event.price}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Organizer Section */}
            <section className="bg-black rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Organizer</h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">{event.organizer.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">{event.organizer}</h3>
                  <p className="text-white/70">Event Horizon Productions</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Ticket Purchase & Additional Info */}
          <div className="space-y-6">
            {/* Ticket Purchase Card */}
            <div className="bg-black rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Get Tickets</h2>
                <span className="text-xl font-bold">${event.price}</span>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4">
                Purchase Tickets
              </Button>
              <div className="flex justify-between text-sm text-white/70">
                <span>Refundable</span>
                <span>•</span>
                <span>Mobile Ticket</span>
              </div>
            </div>

            {/* Category & Tags */}
            <div className="bg-black rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Category & Tags</h2>
              <div className="mb-4">
                <span className="inline-block bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-sm">
                  {event.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span key={index} className="bg-red-900/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share & Save */}
            <div className="bg-black rounded-xl p-6">
              <div className="flex justify-between">
                <Button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <IconShare size={20} />
                  <span>Share</span>
                </Button>
                <Button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <IconList size={20} />
                  <span>Add to Wishlist</span>
                </Button>
                <Button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <IconHeart size={20} />
                  <span>Like</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;