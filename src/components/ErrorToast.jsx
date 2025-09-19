import { useEffect, useState } from "react";
import { X } from "lucide-react";

const ErrorToast = ({ message, onRetry, type = "error", onDismiss }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (message && onDismiss && !isPaused) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000); // 5 segundos para erros

      const countdownTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
      };
    }
  }, [message, onDismiss, isPaused]);

  if (!message) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "network":
        return "bg-red-500";
      case "validation":
        return "bg-orange-500";
      case "server":
        return "bg-red-600";
      default:
        return "bg-red-500";
    }
  };

  const getTypeTitle = () => {
    switch (type) {
      case "network":
        return "Connection Error";
      case "validation":
        return "Validation Error";
      case "server":
        return "Server Error";
      default:
        return "Error";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 ${getTypeStyles()} text-white p-4 rounded shadow-lg z-50 max-w-sm relative transition-all duration-200`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-semibold">{getTypeTitle()}</p>
          <p className="text-sm mt-1">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 px-3 py-1 bg-white text-red-600 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>
      {message && onDismiss && (
        <div className="absolute bottom-2 right-2 text-xs opacity-75">
          {isPaused ? "Paused" : `Auto-hide in ${timeLeft}s`}
        </div>
      )}
    </div>
  );
};

export default ErrorToast;
