import React, { useState } from "react";
import CloseBtn from "../../../common/CloseBtn";
import Progress from "../../../common/Progress";
import { uploadImageToCloudinary } from "../../../../utils/imageUploader";

const AddBannerForm = ({
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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[900] overflow-y-auto">
      <div class="container mx-auto px-4 max-w-2xl">
        {/* <!-- Form Header --> */}
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-accent-foreground p-6 text-white">
            <div class="flex items-center">
              {/* <div class="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg mr-4">
                        <i class="fas fa-folder-plus text-2xl"></i>
                    </div> */}
              <div>
                <h1 class="text-2xl font-bold">
                  {isEditMode ? "Update" : "Add New"} Poster
                </h1>
                {/* <p class="text-indigo-100 mt-1">
                  Create a category with subcategories
                </p> */}
              </div>
            </div>
          </div>

          {/* <!-- Form Body --> */}
          <form class="p-6 space-y-6" id="categoryForm">
            {/* <!-- Category Name --> */}
            <div>
              <label
                for="title"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                Title <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fas fa-tag text-gray-400"></i>
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title.trim()}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter Title"
                />
              </div>

              {fielderrors.title && (
                <p className="text-xs font-medium text-red-700">
                  Category name is required
                </p>
              )}
            </div>

            <div>
              <div className="mt-4">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Image URLs
                  </label>
                  <div id="imagesContainer" class="space-y-3">
                    <div class=" mx-auto p-6">
                      <div class="relative">
                        <input
                          type="file"
                          id="image"
                          class="hidden"
                          accept="image/*"
                          onChange={(e) => handleImage(e.target.files)}
                        />

                        {/* <!-- Upload Trigger --> */}
                        <label
                          for="image"
                          class="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          {/* <!-- Upload Icon --> */}
                          <svg
                            class="w-12 h-12 mb-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>

                          {/* <!-- Upload Text --> */}
                          <p class="mb-2 text-sm text-gray-500">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p class="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <button type="button" id="addImage" class="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add another image
                        </button> */}
                </div>
                {progressbar.is_show && (
                  <div>
                    <p className="text-end text-base font-medium text-gray-600">
                      {progressbar.text}
                    </p>
                    <Progress width={progressbar.percentage} />
                  </div>
                )}
                {
                  formData?.image &&
              <div className="w-50 mt-3">
                <img src={formData?.image} alt="" className="rounded " />
              </div>
                }

                {fielderrors.image && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Image is Required
                  </p>
                )}
              </div>
            </div>
  <div className="flex space-x-2.5">
             
              <div class="relative">

                <input
                  type="checkbox"
                  id="active"
                  name="title"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive:e.target.checked })
                  }
                  class=" w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg  transition-all duration-200"
                  
                />
              </div>
 <label
                for="active"
                class="block text-sm font-semibold text-gray-700 mb-2"
              >
                IsActive
              </label>
             
            </div>

            <div></div>
            {/* <!-- Form Actions --> */}
            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={closeFormMethod}
                type="button"
                class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleFormMethod}
                type=""
                class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-save mr-2"></i>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBannerForm;
