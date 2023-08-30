import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import Card from 'react-bootstrap/Card';
import './Masjidlist.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Masjidlist() {
    
    const [masjiddata, setMasjiddata] = useState([])
    
        
    
   


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/masjiddata')
            .then((response) => {
                console.log(response);
                setMasjiddata(response.data.Masjid_data)
            })
            .catch((error) => {

            })
    }, [])

  
    
    
   

    const findCountryName = (country_id) => {
        const localdata=(JSON.parse(localStorage.getItem("Referencedata")))
        const currentcountry=localdata.find(p=>p.id == country_id)
        return currentcountry.countryname;
    }
    
    const findStatename =(State_id)=>{
        const statedatas=(JSON.parse(localStorage.getItem("statedata")))
        const currentstate=statedatas.find(S=>S.id == State_id)
        return currentstate.statename;
    }
    
   
    return (
        <>
            {/* <Topbar /> */}
            <h3 className='marginlisthead'>List Of Masjids</h3>
            <div className='containercard'>
                {masjiddata?.map((i) => {
                    
                    return (
                        <Card style={{ width: '21rem' }}>
                            <Card.Body>
                                <Card.Title className='text-center masjidtitle'>{i.name}</Card.Title>
                                <Card.Text className='masjidpara'>
                                    This Masjid is Located at Country  <u> <h5 className='masjidtexts'>{findCountryName(i.country)}</h5> </u> in the state <u><h5 className='masjidtexts'>{findStatename(i.state)}</h5></u> inside the district
                                    <u><h5 className='masjidtexts'>{i.district}</h5></u>This is a beautiful Masjid
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}

            </div>
        </>
    )
}

export default Masjidlist