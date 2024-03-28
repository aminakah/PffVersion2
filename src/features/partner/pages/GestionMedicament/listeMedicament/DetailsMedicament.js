import React from 'react'
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro'
import { Link } from 'react-router-dom'
import { UserService } from '../../../../../services/user.service'

function DetailsMedicament() {
  return (
    <div className="PartnerHomePage container-fluid p-0 m-0">
    <div className='d-flex'>
      <SideNavBarPro />
      <div className='body mx-3 p-4'>
      <div class=" text-start">
            <div class="row">
              <div class="col-sm-4 col-md-2 pt-2 ">
			  <Link to={'/account/partner/' + UserService.getCurrentUser()?.id + '/listMedicament'}>
              <button className='btn btn-success'> <i className='fa fa-arrow-left'></i> Retour</button> </Link>
			  </div>
			  <div className='col-md-6'>
              <h5 className='text-center p-3'>Page details du Medicament :<span className='text-decoration-underline'></span></h5>
			  </div>
           	 
			 
            </div>
          </div>
      </div>
      </div>
      </div>
  )
}

export default DetailsMedicament