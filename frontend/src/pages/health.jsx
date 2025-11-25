import React, { useEffect, useState } from "react";
import { healthCheck } from "../api";

const Health = () => {
  const [status, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await healthCheck();
      setData(data);
    };

    fetchStats();
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Health Check</h3>

        {status ? (
          <div className="alert alert-success text-center">
            ✔ Server is healthy
          </div>
        ) : (
          <div className="alert alert-danger text-center">
            ✖ Server is NOT healthy
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;
