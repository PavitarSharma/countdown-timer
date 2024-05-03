import styles from "./TimerDisplay.module.css";

const TimerDisplay = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={styles.timer_display}>
      <div className={styles.timer_box}>
        <span>{days}</span>
        <span>Days</span>
      </div>
      <div className={styles.timer_box}>
        <span>{hours}</span>
        <span>Hours</span>
      </div>
      <div className={styles.timer_box}>
        <span>{minutes}</span>
        <span>Minutes</span>
      </div>
      <div className={styles.timer_box}>
        <span>{seconds}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};

export default TimerDisplay;
