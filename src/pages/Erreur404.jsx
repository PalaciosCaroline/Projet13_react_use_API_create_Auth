import { NavLink } from 'react-router-dom'

export default function Erreur404() {
  return (
    <main className='erreur_main'>
      <h1 className='erreur_h1'>404</h1>
      <h2 className='erreur_h2'>
        Oups ! La page que <br/>
        vous demandez n'existe pas.
      </h2>
      <NavLink className='erreur_link' to="/">
        Retourner sur la page d'accueil
      </NavLink>
    </main>
  )
}

