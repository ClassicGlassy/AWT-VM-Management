/* eslint-disable react/prop-types */
import AlertBase from "./AlertBase";

function NegativeAlert({ isVisible, setIsVisible, message, title }) {
  return (
    <AlertBase visible={isVisible} setVisible={setIsVisible}>
      <h2 className={`font-bold text-2xl mb-5 text-negative`}>{title}</h2>

      {/* Check if message is an object */}
      {message instanceof Object ? (
        <>
          <p className="text-gray-400 mb-2">{message.message}</p>
          <table className="table-auto border-collapse w-full ">
            <tbody className="p-2 mx-auto text-left">
              {Object.entries(message.data).map(([key, value]) => (
                <tr key={key} className="align-top">
                  <td className="px-4 py-2 capitalize">{key.toString()}</td>
                  <td className="px-4 py-2 break-words">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>{message}</p> // If message is not an object, just render it as a string
      )}
    </AlertBase>
  );
}

export default NegativeAlert;
