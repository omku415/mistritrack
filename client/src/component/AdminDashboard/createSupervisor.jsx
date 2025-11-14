import React, { useState } from "react";
import { User, Mail, Lock, MapPin, FileText } from "lucide-react";
import { createSupervisor } from "../../services/createSupervisor";

const AddSupervisorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "supervisor", // fixed role
    assignedSite: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await createSupervisor(formData);
      setSuccess(result.message || "Supervisor added successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "supervisor",
        assignedSite: "",
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
            Add Supervisor
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill out the details below to add a new supervisor
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
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter supervisor email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Assigned Site */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Assigned Site (optional)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="assignedSite"
                value={formData.assignedSite}
                onChange={handleChange}
                placeholder="Enter site ID"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                focus:ring-emerald-500 focus:border-emerald-500"
              />
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
            {loading ? "Adding..." : "Add Supervisor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupervisorForm;
