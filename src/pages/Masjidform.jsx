import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Masjidform.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../components/Topbar';
function Masjidform() {

    const[datas,setData]=useState([])
    const[country,setCountry]=useState([])
    const[state,setState]=useState([])
    const[district,setDistrict]=useState([])
    const[states,setStates]=useState([])

    const[districts,setDistricts]=useState([])
    const[senddata,setSenddata]=useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/alldata')
        .then((res)=>{
            console.log(res);
            setData(res.data)
            setCountry(res.data.countries)
            setState(res.data.states)
            setDistrict(res.data.districts)
            console.log(datas);
            console.log(country);
            console.log(state);
            console.log(district);
        })
        .catch((error)=>{
            console.error('An error occurred:', error);
        })
            
        
    },[])
    

    

    const handlestate=(event)=>{
        
        const filteredstates=state.filter(state=>state.countrycode == event.target.value)
        setStates(filteredstates)

    
      
    }
   
    
    const handledistrict=(e)=>{
        const filtereddistricts=district.filter(district=>district.state_code == e.target.value)
        setDistricts(filtereddistricts)
        console.log(e.target.value);
       
    }
    console.log(districts);


    const change = (e) => {
        const { name, value } = e.target
        setSenddata({ ...senddata, [name]: value })
    }
    console.log(senddata);

    const handlesubmit=(e)=>{
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/api/masjidregister',senddata).then((res)=>{
            console.log(res);

            const notify = () => {
                toast("wooooow");};
            console.log(notify);
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
        .catch((error)=>{
            console.error('An error occurred:', error);
        })
    }

  return (

    <>
    {/* <Topbar/> */}
    <Container fluid className='cont'>
      <Row>
        <Col className='MasjidHeading' ><h1 className='masjidheading'>Masjid Registration</h1></Col>
       
      </Row>
      <div className='Hr'>
      <hr className='Hrline'></hr>
      </div>
      <Row>
      <ToastContainer/>
      <Col className='Masjidform'>
      <form className='formss' onSubmit={handlesubmit} >
        <div className='tablerow'>
            <div className='tablecells labels'><label >Country</label></div>
            <div className='masjidinput'>
            <select  className='tablecells sellect '  onClick={handlestate} onChange={change} name='country' >
            <option  >Select Country</option>
            {country ?.map((i)=>{
                return(
                <option  key={i.id} value={i.id} >{i.countryname}</option>
                )
            })}
            </select>
            </div>
        </div>
        


        <div className='tablerow'>
            <div className='tablecells labels'><label>State</label></div>
            <div className='masjidinput'>
            <select className='tablecells sellect ' onClick={handledistrict} name='state' onChange={change}>
                <option>Select State</option>
                {states ?.map((state)=>{
                return(
                <option value={state.id} >{state.statename}</option>
                )
            })}
                
            </select>
            </div>
        </div>



        <div className='tablerow'>
            <div className='tablecells labels'><label>District</label></div>
            <div className='masjidinput'>
            <select className='tablecells sellect ' onChange={change} name='district' >
                <option >select District</option>

                {districts ?.map((dis)=>{
                return(
                <option value={dis.districtname} >{dis.districtname}</option>
                )
            })}
                
            </select>
            </div>
        </div>

        <div className='tablerow'>
            <div className='tablecells labels'><label>Name</label></div>
            <div className='tablecells masjidinput'><input type='text' className='inputbox' name='name' onChange={change} required></input></div>
        </div>

       
        
        <div className='tablerow'>
            <div className='tablecells labels'><label >Alias Name</label></div>
            <div className='tablecells masjidinput'><textarea rows = "4" cols = "29" name = "aliasname"  className='description' onChange={change} required></textarea></div>
        </div>


        <div className='tablerow'>
            <div className='tablecells labels'><label>Adress</label></div>
            <div className='tablecells masjidinput'><textarea rows = "4" cols = "29" className='description'  name='address' onChange={change} required></textarea></div>
        </div>
        <div className='formbutton'>
        <button type='submit'>Submit</button>
        </div>
      </form>
      
      
      </Col>
      </Row>
    </Container>
    </>
  )
}


export default Masjidform