import React from 'react';
import './NavBarTop.css';

import Logo from '../../../../assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import RecherchePharmacie from '../Recherche/RecherchePharmacie';

export const NavBarTop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Utilisez une méthode ou une propriété pour vérifier si l'utilisateur est connecté
  const isUserAuthenticated = AuthService.isAuthenticated();

  // Gère l'événement de déconnexion
  const handleDeconnexion = () => {
    AuthService.logout(navigate);
  };

  return (
    <header class="p-3  border-bottom">
      <div class="ms-5 ">
        <div class=" d-flex flex-wrap align-items-center justify-content-center justify-content-lg-center">
          <img src={Logo} alt='SenPharma' height={60} className='mb-3' />


          <ul class="nav col-12 col-lg-auto me-lg-auto mx-5 mb-2 justify-content-center mb-md-0">
            <li className={location.pathname === '/' ? 'link-active ms-3' : 'nav-item ms-3'} onClick={() => navigate('/')}>Acceuil</li>
            <li className={location.pathname === '/pharmacieEngarde' ? 'link-active ms-3' : 'nav-item ms-3'} onClick={() => navigate('/pharmacieEngarde')}>Pharmacies de Garde</li>
            <li className={location.pathname === '/Contact' ? 'link-active ms-3' : 'nav-item ms-3'} onClick={() => navigate('/Contact')}>Contact</li>
            {/* <li className={location.pathname === '/Service' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/Services')}>Services</li> */}

          </ul>

          <RecherchePharmacie></RecherchePharmacie>
          {/* <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search"></input>
          </form> */}
{isUserAuthenticated ?(
          <div class="dropdown text-end mx-5">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"></img>
            </a>
            

             
              <ul class="dropdown-menu text-small shadow ">
                <li className='class="dropdown-item m-2' onClick={() => UserService.goToAccount(navigate)}>Mon espace</li>
                <li className='class="dropdown-item m-2' onClick={handleDeconnexion}>Deconnexion</li>
              </ul>
              </div>
            ) : (
             
                <button className=' btn btn-outline-success' onClick={() => navigate('/auth/login')}>Se connecter</button>
                
            
            )}

          
        </div>
      </div>
    </header>

    // <div className="container-fluid px-4 py-2 m-0 bg-white">
    //   <div className='d-flex justify-content-between align-items-center'>
    //      {isUserAuthenticated ?(
    //        <div className='nav-bar d-flex align-items-end'>
    //        <img src={Logo} alt='SenPharma' height={60} className='mb-3' />
    //        <ul className='d-flex list-unstyled '>
    //          <li className={location.pathname === '/' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/')}>Acceuil</li>
    //          <li className={location.pathname === '/pharmacieEngarde' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/pharmacieEngarde')}>Pharmacies de Garde</li>
    //          <li className={location.pathname === '/Contact' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/Contact')}>Contact</li>
    //          {/* <li className={location.pathname === '/Service' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/Services')}>Services</li> */}
    //          <li className='nav-item ms-2' onClick={() => UserService.goToAccount(navigate)}>Compte</li>
    //        </ul>
    //      </div>

    //      ):
    //      (
    //       <div className='nav-bar d-flex align-items-end'>
    //       <img src={Logo} alt='SenPharma' height={60} className='mb-3' />
    //       <ul className='d-flex list-unstyled ms-4'>
    //         <li className={location.pathname === '/' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/')}>Acceuil</li>
    //         <li className={location.pathname === '/pharmacieEngarde' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/pharmacieEngarde')}>Pharmacies de Garde</li>
    //         <li className={location.pathname === '/Contact' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/Contact')}>Contact</li>
    //         {/* <li className={location.pathname === '/Service' ? 'link-active ms-3': 'nav-item ms-3'} onClick={() => navigate('/Services')}>Services</li> */}
    //         {/* <li className='nav-item ms-2' onClick={() => UserService.goToAccount(navigate)}>Compte</li> */}
    //       </ul>
    //        786pl
    //     </div>
    //      )}




    //     <div class="dropdown text-end">
    //       <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    //         <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"></img>
    //       </a>
    //       <ul class="dropdown-menu text-small">

    //         {isUserAuthenticated ? (
    //         <button className='btn btn-outline-danger dropdown-item ' onClick={handleDeconnexion}>
    //           Déconnexion
    //         </button>

    //       ) : (
    //         <div>
    //           <button className='btn btn-success dropdown-item ' onClick={() => navigate('/auth/login')}>
    //           Se connecter
    //         </button>
    //         <button className='btn btn-success dropdown-item' onClick={() => navigate('/auth/register')}>
    //           S'inscrire
    //         </button>
    //         </div>



    //       )}
    //       </ul>

    //     </div>
    //   </div>
    // </div>
  );
}
