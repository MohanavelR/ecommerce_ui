import React, { useState } from "react";
import Progress from "../../../common/Progress";
import { uploadImageToCloudinary } from "../../../../utils/imageUploader";

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
    <div className="fixed inset-0 p-5 bg-black/60  z-[900] overflow-y-auto">
      <div className="container  mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-accent-foreground p-6 text-white">
            <h1 className="text-2xl font-bold">
              {isEditMode ? "Update" : "Add New"} Slider
            </h1>
          </div>

          {/* Body */}
          <form className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Title"
              />
              {fielderrors.title && (
                <p className="text-xs font-medium text-red-700">Title is Required</p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label htmlFor="subtitle" className="block text-sm font-semibold text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Subtitle"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Description"
              />
              {fielderrors.description && (
                <p className="text-xs font-medium text-red-700">Description is Required</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files)}
              />
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>

              {progressbar.is_show && (
                <div className="mt-2">
                  <p className="text-end text-sm font-medium text-gray-600">{progressbar.text}</p>
                  <Progress width={progressbar.percentage} />
                </div>
              )}

              {formData.image && (
                <div className="w-40 mt-3">
                  <img src={formData.image} alt="preview" className="rounded" />
                </div>
              )}

              {fielderrors.image && (
                <p className="text-xs font-medium text-red-700 mt-1">Image is required</p>
              )}
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="active" className="text-sm font-semibold text-gray-700">
                Is Active
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={closeFormMethod}
                type="button"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmitMethod}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center"
              >
                <i className="fas fa-save mr-2"></i>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSliderForm;
