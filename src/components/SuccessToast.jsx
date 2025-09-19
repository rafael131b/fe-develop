const SuccessToast = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
      <p className="font-semibold">Success</p>
      <p>{message}</p>
    </div>
  );
};

export default SuccessToast;
