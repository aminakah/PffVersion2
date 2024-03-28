import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import carousel1 from '../../../../assets/images/jumbo2.png';
import carousel2 from '../../../../assets/images/jumbo1.png';
import carousel3 from '../../../../assets/images/carousel3.png';
import { PharmacieService } from '../../../../services/pharmacie.service';
import "./HomeCaroussol.css"

const HomeCarousel = ({ onRegionChange, onSearchChange }) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    PharmacieService.getListRegion()
      .then(response => {
        setRegions(response.data);
        console.log(response.data);
      })
  }, []);



  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={4000}
      >
        
          <div class=" hero col-12 px-4 py-5">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div class=" col-8 col-lg-6">
                <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Trouvez pharmacie près de vous</h1>
                <p class="lead">
                  Il est facile de trouver une pharmacie proche de chez vous. En un seul clic.</p>
                
              </div>
              <div class="col-4 col-sm-8 col-lg-6">
                <img class="d-block mx-lg-auto img-fluid" width="500" height="500" loading="lazy" src={carousel2} alt='carousel 2' />
              </div>
            </div>
          </div>
          <div class=" hero col-12 px-4 py-5">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div class="col-lg-6">
                <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Pré-commandez vos médicaments par message à votre pharmacie</h1>
                <p class="lead">Préparez votre ordonnance en avance par message à votre pharmacieAccédez en temps réel aux stocks de médicaments dans les pharmacies à proximitéAccédez en temps réel aux stocks de médicaments dans les pharmacies à proximitéAccédez en temps réel aux stocks de médicaments dans les pharmacies à proximité</p>
                
              </div>
              <div class="col-6 col-sm-8 col-lg-6">
                <img class="d-block mx-lg-auto img-fluid" width="700" height="500" loading="lazy" src={carousel2} alt='carousel 2' />
              </div>
            </div>
          </div>
          <div class=" hero col-12 px-4 py-5">
              <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-6 col-sm-8 col-lg-6">
                  <img class="d-block mx-lg-auto img-fluid" width="300" height="100" loading="lazy" src={carousel2} alt='carousel 2' />
                </div>
                <div class="col-lg-6">
                  <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Information sur la disponibilité des médicaments.</h1>
                  <p class="lead">Accédez en temps réel aux stocks de médicaments dans les pharmacies à proximitéAccédez en temps réel aux stocks de médicaments dans les pharmacies à proximitéAccédez en temps réel aux stocks de médicaments dans les pharmacies à proximité</p>
                </div>
              </div>
          </div>
      </Carousel>
      <hr class="featurette-divider mt-0"></hr>
      <div className='d-flex justify-content-between align-items-center bg-light p-2' style={{ position: 'absolute', bottom: '30px',  marginLeft: 620, marginRight:0, width: '150px', borderRadius: '20px' }}>
        <div>
        <select style={{border:'none', height:'40px', outline:'none', width:'130px', backgroundColor:'transparent'}} onChange={(event) => onRegionChange(event.target.value)}>
                    <option>tout</option>
                    {regions.map(region => 
                    <option key={region.id}  value={JSON.stringify(region)}>{region.nom}</option>)}
                  </select>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center  p-2' style={{ position: 'absolute', bottom: '30px',  marginLeft: 300, marginRight: 0, width: '450px', height:"100",   }}>
       <div><h5 className='text-black'>Rechercher ou filtrer par region</h5></div>
      </div>
      <div className='d-flex justify-content-between align-items-center  bg-light  p-2' style={{ position: 'absolute', bottom: '30px',  marginLeft: 820, marginRight: 0, width: '300px', height:"100", borderRadius: '20px' }}>
        <div >
          <input style={{ border: 'none', height: '40px', outline: 'none', width: '250px', backgroundColor: 'transparent' }} type='search' placeholder='Rechercher une pharmacie' onChange={(event) => onSearchChange(event.target.value)} />
        </div>
        <div>
          <i className='fa fa-search text-muted'></i>
        </div>

      </div>
      

    </div>
  )
}

export default HomeCarousel