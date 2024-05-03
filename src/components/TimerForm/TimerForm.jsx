import { useEffect, useRef, useState } from "react";
import styles from "./TimerForm.module.css";

const TimerForm = ({ setTime, setMessage }) => {
  const [dateTime, setDateTime] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [countdown, setCountdown] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const countdownIntervalRef = useRef(null);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const startTimer = (event) => {
    event.preventDefault();
    setMessage("")

    const selectedTime = new Date(dateTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = selectedTime - currentTime;

    if (timeDifference < 0) {
        setMessage("Selected time is in the past");
      return;
    }

    const maxCountdownTime = 99 * 24 * 60 * 60 * 1000; // 99 days in milliseconds
    if (timeDifference > maxCountdownTime) {
        setMessage("Selected time is more than 100 days");
      return;
    }

    clearInterval(countdownIntervalRef.current);
    setCountdown(timeDifference);
    setTimeLeft(timeDifference);

    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft < 0) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);
  };

  const clearTimer = (event) => {
    event.preventDefault();
    clearInterval(countdownIntervalRef.current);
    setCountdown(null);
    setTimeLeft(null);
    setDateTime("");
    setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    if (timeLeft !== null) {
      const formatTime = () => {
        if (timeLeft <= 0) {
            setMessage("The countdown is over! What's next on your adventure?");
          return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return setTime({ days, hours, minutes, seconds });
      };

      formatTime();
    }
  }, [timeLeft, setTime, setMessage]);

  useEffect(() => {
    return () => {
      clearInterval(countdownIntervalRef.current);
    };
  }, []);

  return (
    <form className={styles.timer_form}>
      <input
        type="datetime-local"
        id="dateTime"
        value={dateTime}
        onChange={handleChange}
        className={styles.timer_input}
        // max={
        //   new Date(new Date().getTime() + 99 * 24 * 60 * 60 * 1000)
        //     .toISOString()
        //     .split(".")[0]
        // }
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {timeLeft < 1 ? (
          <button onClick={startTimer} className={styles.timer_btn}>
            Start Timer
          </button>
        ) : (
          <button onClick={clearTimer} className={styles.timer_btn}>
            Clear Timer
          </button>
        )}
      </div>
    </form>
  );
};

export default TimerForm;
