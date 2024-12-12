// src/components/common/LoadingButton.js
const LoadingButton = ({ isLoading, children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`relative ${className}`}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="w-5 h-5 animate-spin" />
        </div>
      ) : null}
      <span className={isLoading ? "invisible" : ""}>{children}</span>
    </button>
  );
  
  export default LoadingButton;