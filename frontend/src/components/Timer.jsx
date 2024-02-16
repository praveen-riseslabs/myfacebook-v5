import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function Timer({
  initialTime,
  onTimeExpired,
  onRestart = null,
}) {
  const [time, setTime] = useState(initialTime);
  const [isResendReqDisabled, setIsResendReqDisabled] = useState(false);
  const [showResetTimer, setShowResetTimer] = useState(10);

  //handling timer restart
  const handleRestart = () => {
    setTime(initialTime);
    onTimeExpired(false);
    setIsResendReqDisabled(true);
    if (showResetTimer > 0) {
      setShowResetTimer(10);
    }

    //disabeling resent button for 10 seconds
    setTimeout(() => {
      setIsResendReqDisabled(false);
    }, 10000);

    if (onRestart !== null) {
      onRestart();
    }
  };
  
  //decreamenting time on every second
  useEffect(() => {
    let intervalId;
    const updateTimer = () => {
      if (time.minutes <= 0 && time.seconds <= 0) {
        clearInterval(intervalId);
        onTimeExpired(true);
      } else {
        let updatedMinutes = time.minutes;
        let updatedSeconds = time.seconds - 1;

        if (updatedSeconds < 0 && updatedMinutes > 0) {
          updatedMinutes -= 1;
          updatedSeconds = 59;
        }

        setTime({
          minutes: updatedMinutes,
          seconds: updatedSeconds,
        });
      }
    };

    intervalId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [onTimeExpired, time.minutes, time.seconds]);

  return (
    <>
      {time.seconds === -1 ? (
        <span className="ctext-primary fw-bold ">0 : 0</span>
      ) : (
        <span className="ctext-primary fw-bold ">
          {time.minutes} : {time.seconds}
        </span>
      )}
      {onRestart !== null && (
        <Button
          onClick={handleRestart}
          disabled={isResendReqDisabled}
          className="ms-2"
        >
          Resend OTP{" "}
          {showResetTimer > 0 && showResetTimer < 10 && time.minutes === 9 ? showResetTimer : null}
        </Button>
      )}
    </>
  );
}
