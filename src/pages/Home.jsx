import React from 'react'
// import HeaderPage from '../components/HeaderPage'
import Banner from '../components/Banner'
import Feature from '../components/Feature'
// import Footer from '../components/Footer'
import {features} from '../data/dataFeatures'

export default function Home() {

  return (
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {features.map((item,index) => 
          (<Feature key={`feature-${index}`} img={item.img} alt={item.alt} title={item.title} text={item.text}></Feature>)
          )}
        </section>
      </main>
  )
}
