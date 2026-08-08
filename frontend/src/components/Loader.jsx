import "./Loader.css";

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-card">

        <div className="loader-ring">
          <div className="loader-ring-inner"></div>
        </div>

        <h2 className="loader-logo">
          CDLMS
        </h2>

        <p className="loader-loading">
          Loading
          <span></span>
          <span></span>
          <span></span>
        </p>

      </div>
    </div>
  );
}

export default Loader;