import React from 'react'
import Logo from '../../../assets/logo.svg';

export const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <div>
   
      <div class="b-example-divider"></div>
        <div >
        <footer class="py-3 my-4 b-example-divider">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Acceuil</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Nos Services</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Contacts</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">A propos</a></li>
            </ul>
            <p class="text-center text-muted">&copy; { year } SenPharmacie</p>
        </footer>
        </div>
    </div>
  )
}
