/* eslint-disable react/prop-types */
import AlertBase from "./AlertBase";

function InfoAlert({ isVisible, setIsVisible, message, title }) {
  return (
    <AlertBase visible={isVisible} setVisible={setIsVisible}>
      <h2 className={`font-bold text-2xl mb-3 text-black`}>{title}</h2>
      <p className="text-center">{message}</p>
    </AlertBase>
  );
}

export default InfoAlert;
