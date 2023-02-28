import React from 'react'
import Banner from '../components/Banner'
import FeatureUser from '../components/FeatureUser'
import {features} from '../data/dataFeatures'

export default function Home() {
  document.title = 'Argent Bank - Home Page'

  return (
    <main className='main main_home'>
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((item,index) => 
        (<FeatureUser key={`feature-${index}`} img={item.img} alt={item.alt} title={item.title} text={item.text}></FeatureUser>)
        )}
      </section>
    </main>
  )
}
