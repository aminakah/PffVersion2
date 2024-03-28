import React, { useEffect, useState } from 'react';
import './ClientHomePage.css';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { NavBarTop } from '../../../common/components/NavBarTop/NavBarTop';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import { Footer } from '../../../common/Footer/Footer';
import PharmacieList from '../../../common/components/PharmacieList/PharmacieList';
import NosServices from '../../../common/components/NosServices/NosServices';
import Apropos from '../../../common/components/Apropos/Apropos';
import { ContactUs } from '../../../common/components/ContactUs/ContactUs';

export const ClientHomePage = () => {

	const [pharmacies, setPharmacies] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(JSON.parse(localStorage.getItem('region')));

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const response = await PharmacieService.getListPharmacie();
    //     setPharmacies(response.data.items);
    //     console.log(response.data.items);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // }

    // fetchData();
  }, []);

  

  const handleRegionFilter = (selectedRegion) => {
    const region = JSON.parse(selectedRegion);
    localStorage.setItem('region', selectedRegion)
    setSelectedRegion(region);
     PharmacieService.filtrePharmacieParRegion(region.id)
    .then(response => {
      setPharmacies(response.data.data);
      console.log(response.data.data)

    })
  };

  const handlePharmacieSearch =  (query) =>{
     if(query.length > 1 && query  !== ' '){
      PharmacieService.rechercherPharmacie(query)
      .then(response => {
        setPharmacies(response.data.resultats);
        console.log(response.data.resultats)
      })
     }else{
      PharmacieService.filtrePharmacieParRegion(selectedRegion.id)
      .then(response => {
        setPharmacies(response.data.data);
      })
     }
      
  }

  return (
    <div className="container-fluid p-0 m-0">
		<NavBarTop />
    {/* <LocalisationRecu/> */}
      <HomeCarousel onRegionChange={handleRegionFilter} onSearchChange={handlePharmacieSearch} />
      <PharmacieList pharmacies={pharmacies} />
      <Apropos/>
      <NosServices />

      {/* <ContactUs /> */}
      <Footer />
    </div>
  );
	
}