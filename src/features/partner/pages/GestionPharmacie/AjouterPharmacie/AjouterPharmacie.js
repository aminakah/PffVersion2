import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './AjouterPharmacie.css';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../../services/user.service';
import { ProprietaireService } from '../../../../../services/propretaire.service';
import Swal from 'sweetalert2';
import { PharmacieService } from '../../../../../services/pharmacie.service';
import { RegionService } from '../../../../../services/region.service';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function AjouterPharmacie() {
  const navigate = useNavigate();
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm();

  const [quartiers, setQuarties] = useState([]);
  const [regions, setRegions] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [address, setAddress] = useState('');


  
	const handleChange = (address) => {
	  setAddress(address);
	};
  
	const handleSelect = async (address) => {
	  try {
		const results = await geocodeByAddress(address);
		const latLng  = await getLatLng(results[0]);
		setValue('latitude', latLng.lat);
		setValue('longitude',latLng.lng);
    setValue('adresse', address);
		setAddress(address);
	  } catch (error) {
		console.error('Error:', error);
	  }
	};


  useEffect(() => {
    PharmacieService.getListRegion()
    .then(response => {
      console.log(response)
      setRegions(response?.data)
    })
  },[])


  const onSubmit = (data) => {
  
    ProprietaireService.ajouterPharmacie(data).then((response) => {
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Pharmacie ajoutée avec succès!',
      }).then(() => {
        navigate(`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`);
      });
      

      setError(response.data.errorsList)
      if(response.data.error===true){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue, veuillez réessayer!',
        });
      }
      console.log(errors.nom);
    }).catch((errors) => {
      console.error(errors);
      // setError();
    });

  };


  const loadDepartment =  (idRegion) =>{
    RegionService.getListDepartements(idRegion)
    .then(response => {
      setDepartements(response.data);
      console.log(response?.data)
    })
  }

  const loadQuartier = (idDepartement) => {
    RegionService.getListQuartier(idDepartement)
    .then(response => {
      setQuarties(response?.data)
      setQuarties(response?.data)
    })
  }

  return (
    <div className="AdminHomePage container-fluid p-0 m-0 ">
      <div className="d-flex">
        <SideNavBarPro />
        <div className="body m-2 p-2 ">
          <div className="ms-5  p-3 d-flex justify-content-center px-5">
            {/* <h2 className='text-success text-decoration-underline'>Ajouter une pharmacie</h2> */}
            {/* <Link to={`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`}>
              <button className="btn btn-outline-dark">Voir la liste</button>
            </Link> */}
          </div>
          <div className="container border rounded p-2">
          <h2 className='text-success mx-5  pt-3 text-decoration-underline'>Ajouter une pharmacie</h2>

            <div className=" px-5 pt-2 LoginForm">
              <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Nom pharmacie</label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("nom",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.nom && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Adresse de la pharmacie </label>
                      <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                    searchOptions={{
                    componentRestrictions: { country: ['SN']},
                    }}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                      {...getInputProps({
                        placeholder: 'Adresse de localisation...',
                        className: 'form-control w-100',
                      })}
                      />
                      <div className='sug'>
                      {loading ? <div >Loading...</div> : null}

                      {suggestions.map((suggestion) => {
                        const style = {
                        backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px',
                        };

                        return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                          style,
                          })}
                        >
                         <div className='color'>
                            <ul> <i className='fa fa-map-marker m-0 px-2'></i>
                           {suggestion.description}</ul>
                          </div>
                        </div>
									);
								})}
								</div>
							</div>
							)}
							</PlacesAutocomplete>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Numéro de téléphone de la pharmacie</label>
                      <input
                       maxLength={9}
                       minLength={9}
                        className="form-control w-100"
                        type="tel"
                        {...register("telephone",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.telephone && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Numéro de fax de la pharmacie</label>
                      <input
                       maxLength={9}
                       minLength={9}
                        className="form-control w-100"
                        type="tel"
                        {...register("fax",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.fax && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Séléctionner une région</label>
                      <select className='form-control w-100' 
                        onChange={e => loadDepartment(e.target.value)}
                       >
                        <option selected value={''} disabled>Choisir une région</option>
                        {regions.map( (r) => <option key={r.id} value={r.id}>{r.nom}</option>)}
                      </select>
                      {errors.region && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>

                   {/* Ajoutez ici les champs manquants de votre formulaire */}
                   <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Sélectionner un département</label>
                      <select className='form-control w-100'
                       onChange={e => loadQuartier(e.target.value)}
                       >
                        <option selected value={''} disabled>Choisir un département</option>
                        {departements.map( (d) => <option key={d.id} value={d.id}>{d.nom}</option>)}
                      </select>
                      {errors.quartier_id && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-6">
                      <label className="form-label">Quartier</label>
                      <select className='form-control w-100' {...register('quartier_id',{ required: 'Veillez renseigner votre nom' })} >
                        <option selected value={''} disabled>Choisir un quartier</option>
                        {quartiers.map( (q) => <option key={q.id} value={q.id}>{q.nom}</option>)}
                      </select>
                      {errors.quartier_id && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Image de la pharmacie</label>
                      <input
                        className="form-control w-100"
                        type="file"
                        {...register('photo',{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.photo && <span className="text-danger"> Champ obligatoire</span>}
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <input className="btn btn-success valider p-2 w-10" type="submit" value="Valider" />
                  <Link to={`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`}>
                    <button className="btn btn-danger w-40 mx-2 px-5 p-2">Annuler </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterPharmacie;
