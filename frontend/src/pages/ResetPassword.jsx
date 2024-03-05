import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalNonClosable from "../components/Modal";
import Otp from "../components/Otp";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSentOtp, setLoadingSentOtp] = useState(false); 
  const navigate = useNavigate();
  const [data,setData]= useState({})


  const sendOTP = async () => {
    try {
      setLoadingSentOtp(true); 
      let res = await axios.post("http://localhost:4000/api/v1/user/password-recovery", { email }); 
      setIsModalOpen(true);
      setData(res.data)
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoadingSentOtp(false); 
    }
  };

    const handleSendOTP = () => {
      if (!email) return;
      sendOTP(); // Call sendOTP function
    };
 
    const handleCancel = () => {
      setEmail("");
      navigate(-1);
    };


  return (
    <>
      <div className="d-flex justify-content-center h-100 cbg-secondary container-fluid">
        <div
          className="cbg-white p-4 col-sm-8 col-md-6 col-lg-4 col-10 position-absolute translate-middle start-50 top-50 rounded-4"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", }}
        >
          <div>
            <h2>Reset Password</h2>
            <p className="text-helper"> An OPT will be sent to the entered email address </p>
          </div>

          {/* email */}
          <div>
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
            <div className="text-error">
            </div>
          </div>

          {/* action buttons */}
          <div className="mt-5 d-flex justify-content-around">
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            {loadingSentOtp ? (
              <div className="spinner-border ctext-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleSendOTP} >
                Send OTP
              </button>
            )}
          </div>
        </div>
      </div>
      <ModalNonClosable open={isModalOpen}>
      <Otp data={{ email, id: data.id, userId: data.userId }}  closeModal={() => setIsModalOpen(false)} /> {/* Pass function to close modal */}
      </ModalNonClosable>
    </>
  );
}
