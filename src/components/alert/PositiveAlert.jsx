/* eslint-disable react/prop-types */
import AlertBase from "./AlertBase";

function PositiveAlert({ isVisible, setIsVisible, message = "", title = "" }) {
  return (
    <AlertBase visible={isVisible} setVisible={setIsVisible}>
      <h2 className={`font-bold text-2xl mb-5 text-positive`}>{title}</h2>

      <p className="text-gray-400 mb-2">{message?.message}</p>

      {/* Check if reponse has data field */}
      {message?.data && (
        <table className="table-auto border-collapse w-full ">
          <tbody className="p-2 mx-auto text-left">
            {Object.entries(message.data).map(([key, value]) => (
              <tr key={key} className="align-top">
                <td className="px-4 py-2 capitalize">{String(key)}</td>
                <td className="px-4 py-2 break-words">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AlertBase>
  );
}

export default PositiveAlert;
