import React, { useState } from "react";
import {
  Calendar,
  FileText,
  Image as ImageIcon,
  MapPin,
  User,
} from "lucide-react";
import { createSite } from "../../services/siteService";

const SiteCreationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    supervisor_id: "",
    status: "active",
    start_date: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key]) data.append(key, formData[key]);
      }

      const result = await createSite(data);
      setSuccess(result.message || "Site created successfully!");

      setFormData({
        name: "",
        location: "",
        supervisor_id: "",
        status: "active",
        start_date: "",
        description: "",
        image: null,
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
            Create New Site
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill out the details below to register a new site
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
          {/* Site Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Site Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter site name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter site location"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* Supervisor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Supervisor ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="supervisor_id"
                value={formData.supervisor_id}
                onChange={handleChange}
                placeholder="Enter supervisor ID"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter site description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              rows="3"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Image
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Site"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SiteCreationForm;
