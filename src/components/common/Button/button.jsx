import {
  BeatLoader,
  DotLoader,
  FadeLoader,
  HashLoader,
  MoonLoader,
  PulseLoader,
  RingLoader,
} from "react-spinners";
import "./button.css";

const Button = ({ onClick, text, loading = false, disabled, type }) => {
  return (
    <button
      className="submit-btn"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {!loading ? text : <PulseLoader className="submit-spinner-btn" />}
    </button>
  );
};

export default Button;
