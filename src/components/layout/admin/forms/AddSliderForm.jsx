import React, { useState } from "react";
import Progress from "../../../common/Progress";
import { uploadImageToCloudinary } from "../../../../utils/imageUploader";
import Loader from "../../../common/Loader";

const AddSliderForm = ({
  isEditMode,
  closeFormMethod,
  onSubmitMethod,
  formData,
  setFormData,
  fielderrors,
  setFieldErrors,
}) => {
  const [progressbar, setprogressbar] = useState({
    is_show: false,
    percentage: 0,
    text: "",
  });
  const [isUpload, setUpload] = useState(false);

  const handleImage = async (files) => {
    setUpload(true);
    setprogressbar({
      is_show: true,
      text: "Uploading...",
      percentage: 0,
    });

    const file = files[0];
    const uploadedUrl = await uploadImageToCloudinary(file, (percent) => {
      setprogressbar({
        is_show: true,
        percentage: percent - 1,
        text: "Uploading...",
      });
    });

    setprogressbar({
      is_show: true,
      percentage: 100,
      text: "Uploaded!",
    });

    setFormData((prev) => ({
      ...prev,
      image: uploadedUrl,
    }));

    setUpload(false);
    setTimeout(() => {
      setprogressbar({ is_show: false });
    }, 3000);
  };

  return (
    // Backdrop remains black/gray overlay, modal centered
    <div className="admin-form-box">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header - PRESERVED ORIGINAL STYLES */}
          <div className="admin-form-header">
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Update" : "Add New"} Slider
            </h1>
          </div>

          {/* Body - Applied New Design */}
          <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Title */}
            <div>
              <label htmlFor="title" className="admin-form-label">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                // Updated input styling
                className="admin-form-input"
                placeholder="Enter Title"
              />
              {fielderrors.title && (
                <p className="fielderror">Title is Required</p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label htmlFor="subtitle" className="admin-form-label">
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                // Updated input styling
                className="admin-form-input"
                placeholder="Enter Subtitle"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="admin-form-label">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                // Updated textarea styling
                className="admin-form-input"
                placeholder="Enter a brief description for the slider"
              />
              {fielderrors.description && (
                <p className="fielderror">Description is Required</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="admin-form-label">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files)}
                disabled={isUpload}
              />
              <label
                htmlFor="image"
                // Updated upload area style for better visual feedback
                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors p-4 ${
                  isUpload
                    ? "bg-gray-100 border-gray-400"
                    : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-12 h-12 mb-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>

              {progressbar.is_show && (
                <div className="mt-3">
                  <p className="text-end text-sm font-medium text-gray-600">
                    {progressbar.text}
                  </p>
                  <Progress width={progressbar.percentage} />
                </div>
              )}

              {formData.image && (
                // Added border and shadow to preview image
                <div className="w-40 mt-3 p-2 border border-gray-300 rounded-lg shadow-sm">
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Preview:
                  </p>
                  <img
                    src={formData.image}
                    alt="preview"
                    className="rounded w-full h-auto object-cover"
                  />
                </div>
              )}

              {fielderrors.image && (
                <p className="fielderror">Image is required</p>
              )}
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                // Updated checkbox style to match primary color
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="active"
                className="text-sm font-semibold text-gray-700"
              >
                Is Active (Show slider on homepage)
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 items-center pt-4 border-t border-gray-200">
              <button
                onClick={closeFormMethod}
                type="button"
                // Updated secondary button style
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit" // Changed to type="submit" for better form practice, though onClick handles logic
                onClick={onSubmitMethod}
                // Kept original primary button styling
                className="admin-save-btn"
                disabled={isUpload}
              >
                <i className="fas fa-save mr-2"></i>
                {isUpload ? <Loader /> : isEditMode ? "Update " : "Save "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSliderForm;
