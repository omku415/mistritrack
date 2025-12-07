import React, { useState, useEffect } from "react";
import { User, IdCard, MapPin, Home, FileText } from "lucide-react";
import { createLabour } from "../../services/createLabour";
import { getAllSites } from "../../services/getAllSites";

const CreateLabour = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    address: "",
    site_id: "",  // <-- Correct field for backend
  });

  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load all sites on mount
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await getAllSites();
        setSites(response.sites || []); // <-- Correct extraction
      } catch (err) {
        console.error("Error loading sites:", err);
      }
    };
    fetchSites();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,  // <-- updates site_id correctly
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await createLabour(formData);
      setSuccess(result.message || "Labour added successfully!");

      // reset form
      setFormData({
        name: "",
        aadhaar: "",
        address: "",
        site_id: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Add Labour
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill out the details below to register a new labour worker
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 p-3 rounded-lg text-sm border border-green-200 dark:border-green-800">
            {success}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Labour Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter labour name"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Aadhaar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Aadhaar Number
            </label>
            <div className="relative">
              <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="Enter 12-digit Aadhaar number"
                maxLength={12}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address (optional)
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Site Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Site
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

              <select
                name="site_id"      // <-- Correct key
                value={formData.site_id}  // <-- Correct value
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select a site</option>
                {sites.map((site) => (
                  <option key={site._id} value={site._id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white 
            rounded-lg font-medium focus:outline-none focus:ring-2 
            focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Labour"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLabour;
