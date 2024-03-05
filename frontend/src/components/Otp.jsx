import { MuiOtpInput } from "mui-one-time-password-input";
import Timer from "./Timer";
import { useCallback, useEffect, useState } from "react";

// import { sendPasswordResetOtp, verifyPasswordResetOtp } from "../store";
// import { useThunk } from "../hooks/useThunk";

import { useNavigate } from "react-router-dom";

const initialTime = { minutes: 10, seconds: 0 };

export default function Otp({ email, closeModal }) {
  const [otp, setOtp] = useState("");
  const [timeExpired, setTimeExpired] = useState(false);

  const navigate = useNavigate();

  //handling resend otp
  const handleResendOtp = () => {
    if (!email) return;
  };

  //handling cancel verification
  const handleCancel = () => {
    setOtp("");
    closeModal();
  };

  //handling verify otp
  // const handleVerifyOtp = useCallback(() => {
  //   if (!email || otp.length < 6) return;
  //   const data = { otp, userId: resetPassword.userId, id: resetPassword.id };
  // }, [email, otp, resetPassword.userId, resetPassword.id]);

  //navigating after otp is verified
  // useEffect(() => {
  //   if (isVerifyOtpRan) {
  //     navigate("/new-password", {
  //       replace: true,
  //       state: {
  //         userId: resetPassword.userId,
  //         id: resetPassword.id,
  //       },
  //     });
  //   }
  // }, [isVerifyOtpRan, navigate, resetPassword.userId, resetPassword.id]);

  return (
    <div>
      {/* heading */}
      <div>
        <h2>Reset Password</h2>
        <p className="text-helper">
          an OPT has been sent on email address : {email}
        </p>
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
      {"loadingVerifyOtp" || "loadingSentOtp" ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border ctext-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mt-3 d-flex justify-content-around">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={()=>""}
            disabled={timeExpired }
          >
            verify
          </button>
        </div>
      )}
    </div>
  );
}
