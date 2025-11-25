import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLinkStats } from "../api";
import { formatDate } from "../utils/date";

const Stats = () => {
  const { code } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getLinkStats(code);
      setData(data);
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="container py-5">
        <h2 className="mb-4 text-center">🔗 TinyURL Statistics</h2>

        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* <!-- Stats Card --> */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Short URL Stats</h5>

                {/* <!-- Short Code --> */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Short Code</label>
                  <div className="form-control">{data?.short}</div>
                </div>

                {/* <!-- Target URL --> */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Target URL</label>
                  <div className="form-control">{data?.real}</div>
                </div>

                {/* <!-- Total Clicks --> */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Total Clicks</label>
                  <div className="form-control">{data?.accessCount}</div>
                </div>

                {/* <!-- Last Clicked Time --> */}
                <div>
                  <label className="form-label fw-bold">Last Clicked</label>
                  <div className="form-control">
                    {data?.lastAccess ? formatDate(data?.lastAccess) : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
