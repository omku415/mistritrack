import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getSupervisorDashboard } from "../../services/supervisorDash";

const SupervisorDashboard = () => {
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const result = await getSupervisorDashboard(); 

        console.log("Dashboard API response:", result);

        setSite(result.site);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSite();
  }, []);

  if (loading)
    return <div className="text-white p-6 text-xl">Loading...</div>;

  if (!site)
    return (
      <div className="text-white p-6 text-xl">
        You are not assigned to any site.
      </div>
    );

  return (
    <div className="flex justify-center p-6">
      <div className="card w-96 bg-emerald-700 text-white shadow-xl">
        {site.image && (
          <figure>
            <img src={site.image} alt="Site" />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{site.name}</h2>
          <p>Location: {site.location}</p>
          <p>Status: {site.status}</p>
          <p>{site.description}</p>

          <div className="card-actions justify-center mt-4">
            <a
              href="/supervisor/add-labour"
              className="btn bg-white text-emerald-700"
            >
              Add Labour
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
