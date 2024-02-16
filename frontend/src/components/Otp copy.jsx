import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetOtp, verifyPasswordResetOtp } from "../store";
import { useThunk } from "../hooks/useThunk";
import { MuiOtpInput } from "mui-one-time-password-input";

const initialTime = { minutes: 10, seconds: 0 };

export default function Otp({ email, closeModal }) {
  const [otp, setOtp] = useState("");
  const [isResendReqDisabled, setIsResendReqDisabled] = useState(true);
  const navigate = useNavigate();
  const [time, setTime] = useState(initialTime);
  const [timeExpired, setTimeExpired] = useState(false);
  const { resetPassword } = useSelector((state) => state.user);

  const [doSendOtp, loadingSentOtp, errorLoadingSentOtp, ,] =
    useThunk(sendPasswordResetOtp);

  const [
    doVerifyOtp,
    loadingVerifyOtp,
    errorLoadingVerifyOtp,
    ,
    isVerifyOtpRan,
  ] = useThunk(verifyPasswordResetOtp);

  //handling verify otp
  const handleVerifyOtp = () => {
    if (!timeExpired || !resetPassword?.userId || !resetPassword?.id) return;
    if (!email) return;
    const data = { otp, userId: resetPassword.userId, id: resetPassword.id };
    doVerifyOtp(data, { duration: 4 });
  };

  //handling resend otp
  const handleResendOtp = () => {
    if (!email) return;
    setIsResendReqDisabled(true);
    setTime(initialTime);
    setTimeout(() => {
      setIsResendReqDisabled(false);
    }, 10000);
    setTimeExpired(false);
    doSendOtp(email);
  };

  //handling cancel verification
  const handleCancel = () => {
    setOtp("");
    closeModal();
  };

  //navigating after otp is verified
  useEffect(() => {
    if (isVerifyOtpRan) {
      navigate("/new-password", {
        replace: true,
        state: {
          userId: resetPassword.userId,
          id: resetPassword.id,
        },
      });
    }
  }, [isVerifyOtpRan, navigate, resetPassword.userId, resetPassword.id]);

  //disabeling the resend button
  useEffect(() => {
    if (time.minutes === 9 && time.seconds === 0) {
      setIsResendReqDisabled(false);
    }
  }, [time.minutes, time.seconds]);

  // decreamenting the time
  const startTimer = useCallback(() => {
    let timeRemaining = 10 * 60 * 1000;

    function updateTimer() {
      const min = Math.floor(timeRemaining / (60 * 1000));
      const sec = Math.floor((timeRemaining % (60 * 1000)) / 1000);

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        setTimeExpired(true);
      } else {
        timeRemaining -= 10 * 1000;
      }

      setTime({ minutes: min, seconds: sec });
    }

    const timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    startTimer();
  }, [startTimer]);
  
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
        onComplete={handleVerifyOtp}
        autoFocus
      />
      {/* expiration time */}
      <div className="mt-3">
        otp expires in :{" "}
        <span className="ctext-primary fw-bold ">
          {time.minutes}:{time.seconds}
        </span>
      </div>

      {/* errors */}
      {/* otp verification */}
      <div className="text-error">
        {errorLoadingVerifyOtp && errorLoadingVerifyOtp}
      </div>
      {/* otp resend */}
      <div className="text-error">
        {errorLoadingSentOtp && errorLoadingSentOtp}
      </div>

      {/* action buttons */}
      {loadingVerifyOtp ? (
        <div className="spinner-border ctext-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="mt-3 d-flex justify-content-around">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleVerifyOtp}>
            verify
          </button>
        </div>
      )}

      {loadingSentOtp ? (
        <div className="spinner-border ctext-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="mt-3 d-flex justify-content-center">
          <button
            className="btn"
            onClick={handleResendOtp}
            disabled={isResendReqDisabled || loadingSentOtp}
          >
            Re-send OTP
          </button>
        </div>
      )}
    </div>
  );
}
