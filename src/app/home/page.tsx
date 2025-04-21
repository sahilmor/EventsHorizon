import React from 'react'
import TrendingEvents from '@/components/home/trendingevents/page'
import UpcomingEvents from '@/components/home/upcomingevents/page'
import Artists from '@/components/home/artists/page'
const Home = () => {
  return (
    <div className='space-y-4'>
        <TrendingEvents />
        <Artists />
        <UpcomingEvents />
    </div>
  )
}

export default Home