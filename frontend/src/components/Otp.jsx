import { MuiOtpInput } from "mui-one-time-password-input";
import Timer from "./Timer";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialTime = { minutes: 10, seconds: 0 };

export default function Otp({data, closeModal }) {
  let {id,userId, email} = data
  const [otp, setOtp] = useState("");
  const [timeExpired, setTimeExpired] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
  const [loadingSentOtp, setLoadingSentOtp] = useState(false);
  const navigate = useNavigate();

  
  const handleResendOtp = () => {
    if (!email) return;
  };

  const handleCancel = () => {
    setOtp("");
    closeModal();
  };

  const handleVerifyOtp = async () => {
    if (!email || !otp) return;

    try {
      setLoadingVerifyOtp(true);
      const response = await axios.post("http://localhost:4000/api/v1/user/otp-verify", {
        otp, id, userId
      });
      console.log(response)
      
      if (response.data) {
        navigate("/new-password",{state:{id, userId}});
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoadingVerifyOtp(false);
    }
  };

  return (
    <div>
      {/* heading */}
      <div>
        <h2>Reset Password</h2>
        <p className="text-helper"> an OPT has been sent on email address : {email} </p>
      </div>
      {/* otp box */}
      <MuiOtpInput
        value={otp}
        onChange={(v) => setOtp(v)}
        length={6}
        autoFocus
      />
      {/* expiration time */}
      <div className="mt-3">
        otp expires in :{" "}
        <Timer
          initialTime={initialTime}
          onTimeExpired={setTimeExpired}
          onRestart={handleResendOtp}
        />
      </div>

      {/* errors */}
      {/* otp verification */}
      <div className="text-error">
      </div>
      {/* resend otp*/}
      <div className="text-error">
      </div>

      {/* action buttons */}
      {!(loadingVerifyOtp || loadingSentOtp) && ( 
        <div className="mt-3 d-flex justify-content-around">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleVerifyOtp} disabled={timeExpired || loadingVerifyOtp}>
            verify
          </button>
        </div>
      )}
      {(loadingVerifyOtp || loadingSentOtp) && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border ctext-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
