import React from "react";
import { useState } from "react";




const Profile = () => {
    const [fullname,setFullName] = useState(' ');
    const [gender,setGender] = useState(' ');
    const [language,setLanguage] = useState(' ');
    const [phonenumber,setPhonenumber] = useState(' ');
    const [email,setEmail] = useState(' ');
    const [nickname,setNickname] = useState(' ');
    const [country,setCountry] = useState(' ');
    const [state,setState] = useState('');
    const [district,setDistrict] = useState(' ');
    const [timezone,setTimezone] = useState(' ');

    const [errors,seterrors]= useState({
        fullname:'',
        gender:'',
        language:'',
        phonenumber:'',
        email:'',
        nickname:'',
        country:'',
        state:'',
        district:'',
        timezone:''
    
    })
    

    function handleSubmit(){
            {/* fullname validation errors */}
        if(fullname.trim()===""){
            seterrors((errors) => ({...errors,fullname:" Enter fullname"}))
        }
        else{
            seterrors((errors) => ({...errors,fullname:""}))
        }

        if(phonenumber.trim()===""){
            seterrors((errors) =>({...errors,phonenumber:"Enter phonenumber"}))
        }

        else{
            seterrors((errors) => ({...errors,phonenumber:""}))
        }

        if(email.trim()===""){
            seterrors((errors) =>({...errors,email:"Enter email address"}))
        }

        else{
            seterrors((errors) => ({...errors,email:""}))
        }

        if(nickname.trim()===""){
            seterrors((errors) =>({...errors,nickname:"Enter nickname"}))
        }

        else{
            seterrors((errors) => ({...errors,nickname:""}))
        }

        if(state.trim()===""){
            seterrors((errors) =>({...errors,state:"Enter state"}))
        }

        else{
            seterrors((errors) => ({...errors,state:""}))
        }

        if(district.trim()===""){
            seterrors((errors) =>({...errors,district:"Enter district address"}))
        }
        

        else{
            seterrors((errors) => ({...errors,district:""}))
        }
    }
    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-between mt-2 ">
                <div className="text-black">
                    {/* <img src={require('../assests/images/profile.jfif')}
                     className='rounded-circle' height={90} /> */}
                     <label className="mt-1"><input type="text"
                      className='form-control' placeholder='Name'></input></label>
                </div>

                <div className="mt-3">
                    <button className="btn btn-primary" >Edit</button>
                </div>

            </header>

            <form className="row">
                <div className="col-6">
                    <div className="col-ms-1">
                        <label className=" mt-3">FullName</label>
                        <input type="text" className="form-control"
                         placeholder="Enter FullName" value={fullname}
                         onChange={(e) => {setFullName(e.target.value)}}></input>
                         {errors.fullname&&<span className="text-danger">{errors.fullname}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">Gender</label>
                        <select className="form-select" value={gender}
                         onChange={(e) => {setGender(e.target.value)}}>
                            <option>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>others</option>
                        </select>
                        {errors.gender&&<span className="text-danger">{errors.gender}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">language</label>
                        <select className="form-select" value={language}
                         onChange={(e) => {setLanguage(e.target.value)}}>
                            <option>Select language</option>
                            <option>English</option>
                            <option>Telugu</option>
                            <option>Tamil</option>
                        </select>
                        {errors.language&&<span className="text-danger">{errors.language}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">Phone Number</label>
                        <input type="text" placeholder="123456"
                         className="form-control" value={phonenumber}
                         onChange={(e) => {setPhonenumber(e.target.value)}}></input>
                         {errors.phonenumber&&<span className="text-danger">{errors.phonenumber}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">Email</label>
                        <input type="Email" placeholder="xxxxxx@gmail.com"
                         className="form-control" value={email}
                         onChange={(e) => {setEmail(e.target.value)}}></input>
                         {errors.email&&<span className="text-danger">{errors.email}</span>}
                    </div>

                </div>
                <div className="col-6">
                    <div className="col-ms-1">
                        <label className=" mt-3">NickName</label>
                        <input type="text" placeholder="Enter Nick Name"
                         className="form-control" value={nickname}
                         onChange={(e) => {setNickname(e.target.value)}}></input>
                         {errors.nickname&&<span className="text-danger">{errors.nickname}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">Country</label>
                        <select className="form-select" value={country}
                         onChange={(e) => {setCountry(e.target.value)}}>
                            <option>Select Country</option>
                            <option>India</option>
                            <option>Other</option>
                        </select>
                        {errors.country&&<span className="text-danger">{errors.country}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">State</label>
                        <input type="text" placeholder="Enter state"
                         className="form-control" value={state}
                         onChange={(e) => {setState(e.target.value)}}></input>
                         {errors.state&&<span className="text-danger">{errors.state}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className=" mt-3">District</label>
                        <input type="text" placeholder="Enter district"
                         className="form-control" value={district}
                         onChange={(e) => {setDistrict(e.target.value)}}></input>
                         {errors.district&&<span className="text-danger">{errors.district}</span>}
                    </div>

                    <div className="col-ms-1">
                        <label className="mt-3">Time Zone</label>
                        <select id="timezone" name="timezone" className="form-select" value={timezone} onChange={(e) => {setTimezone(e.target.value)}} >
                            <option value="Pacific/Honolulu">Pacific/Honolulu GMT-10:00</option>
                            <option value="America/Anchorage">America/Anchorage GMT-9:00</option>
                            <option value="America/Los_Angeles">America/Los_Angeles GMT-8:00</option>
                            <option value="America/Boise">America/Boise GMT-7:00</option>
                            <option value="America/Denver">America/Denver GMT-7:00</option>
                            <option value="America/Phoenix">America/Phoenix GMT-7:00</option>
                            <option value="America/Chicago">America/Chicago GMT-6:00</option>
                            <option value="America/Detroit">America/Detroit GMT-5:00</option>
                            <option value="America/New_York">America/New_York GMT-5:00</option>
                        </select>
                        {errors.timezone&&<span className="text-danger">{errors.timezone}</span>}
                    </div>
                </div>

            </form>
            <footer>
                <div className='mt-3'>
                    <button className="btn btn-primary me-3" onClick={handleSubmit}>Save</button>
                    <button className="btn btn-danger" onClick={handleSubmit}>Cancel</button>
                </div>
            </footer>
        </div>
    )
}
export default Profile;