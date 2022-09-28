import Countdown from "react-countdown";

// Random component
const Completionist = () => (
  <span class="text-danger">
    <strong>Bidding Over</strong>
  </span>
);

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <>
      <span
        className={
          hours === 0 && minutes === 0 ? "text-warning" : "text-success"
        }
      >
        <strong>
          {hours}:{minutes}:{seconds}
        </strong>
      </span>
      </>
    );
  }
};

export default function Timer(props) {
  return (
    <Countdown date={Date.now() + props.minutes * 60000} renderer={renderer} />
  );
}
