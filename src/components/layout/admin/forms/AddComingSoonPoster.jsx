import React, { useState } from "react";
import CloseBtn from "../../../common/CloseBtn";
import Progress from "../../../common/Progress";
import { uploadImageToCloudinary } from "../../../../utils/imageUploader";

const AddComingSoonPoster = ({
  isEditMode,
  formData,
  setFormData,
  fielderrors,
  closeFormMethod,
  handleFormMethod,
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
      ...progressbar,
      is_show: true,
      text: "Uploading...",
      percentage: 0,
    });
    const file = files[0];
    const uploadedUrl = await uploadImageToCloudinary(file, (percent) => {
      console.log(percent);
      setprogressbar({
        ...progressbar,
        is_show: true,
        percentage: percent - 1,
        text: "Uploading...",
      });
    });
    setprogressbar({
      ...progressbar,
      is_show: true,
      percentage: 100,
      text: "Uploaded!",
    });

    setFormData((prev) => ({
      ...prev,
      image: uploadedUrl, // store as an array with only 1 file
    }));
    setUpload(false);
    setTimeout(() => {
      setprogressbar({ is_show: false });
    }, 8000);
  };

  return (
    // Backdrop remains black/gray overlay
    <div className="fixed inset-0 bg-black/60  z-[900] overflow-y-auto p-4">
      <div className="container mx-auto max-w-2xl">
        {/* */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* !!! PRESERVED ORIGINAL HEADER STYLES !!! */}
          <div className="bg-accent-foreground p-6 text-white">
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditMode ? "Update" : "Add New"} Poster
                </h1>
                {/* <p class="text-indigo-100 mt-1">
                  Create a category with subcategories
                </p> */}
              </div>
            </div>
          </div>

          {/* */}
          <form className="p-6 space-y-6" id="categoryForm" onSubmit={(e) => e.preventDefault()}>
            {/* */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-tag text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title.trim()}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  // Updated input styling for cleaner look
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter Title"
                />
              </div>

              {fielderrors.title && (
                <p className="text-xs font-medium text-red-700 mt-1">
                  Title is required
                </p>
              )}
            </div>

            {/* */}
            <div>
              <div className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URLs
                  </label>
                  <div id="imagesContainer" className="space-y-3">
                    {/* Removed extra padding block (p-6) from the original JSX */}
                    <div className="relative">
                      <input
                        type="file"
                        id="image"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImage(e.target.files)}
                        disabled={isUpload}
                      />

                      {/* */}
                      <label
                        htmlFor="image"
                        // Updated upload area style for better visual feedback
                        className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors p-4 ${
                          isUpload
                            ? "bg-gray-100 border-gray-400"
                            : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {/* */}
                        <svg
                          className="w-12 h-12 mb-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>

                        {/* */}
                        <p className="mb-1 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                {progressbar.is_show && (
                  <div className="mt-3">
                    <p className="text-end text-base font-medium text-gray-600">
                      {progressbar.text}
                    </p>
                    <Progress width={progressbar.percentage} />
                  </div>
                )}
                
                {formData?.image &&
                  // Added padding and border to the image preview
                  <div className="mt-3 border border-gray-300 rounded-lg p-3 max-w-sm mx-auto">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                    {/* Centered image and made it responsive */}
                    <img src={formData?.image} alt="Poster Preview" className="rounded w-full h-auto object-cover" />
                  </div>
                }

                {fielderrors.image && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Image is Required
                  </p>
                )}
              </div>
            </div>
            
            {/* */}
            <div className="flex items-center space-x-2.5 pt-2">
              <input
                type="checkbox"
                id="active"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive:e.target.checked })
                }
                // Updated checkbox style to match primary color
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="active"
                className="block text-sm font-semibold text-gray-700"
              >
                Is Active
              </label>
            </div>

            {/* */}
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
                onClick={handleFormMethod}
                type="submit"
                // Kept original primary button styling
                className={`px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center font-medium shadow-md shadow-indigo-500/50 ${isUpload ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isUpload}
              >
                <i className="fas fa-save mr-2"></i>
                {
                               isUpload ?<Loader/>:
                               isEditMode ? "Update " : "Save " 
                              } 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddComingSoonPoster;