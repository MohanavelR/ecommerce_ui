import React, { useContext, useState } from "react";
import Loader from "../../components/common/Loader";
import { MessageContext } from "../../context/context";
import { useDispatch, useSelector } from "react-redux";
import { deepcopyObj } from "../../utils/deepCopyObj";
import { bannerFormData } from "../../utils/formDataObj";
import { bannerError } from "../../utils/errorObj";
import AddComingSoonPoster from "../../components/layout/admin/forms/AddComingSoonPoster";
import {
  useCreateComingSoon,
  useDeleteComingSoon,
  useGetAllComingSoon,
  useUpdateComingSoon,
} from "../../store/admin/comingsoonSlice";
import ComingSoonPosterTable from "../../components/layout/admin/tables/ComingSoonPosterTable";
import BannerTable from "../../components/layout/admin/tables/BannerTable";
import AddBannerForm from "../../components/layout/admin/forms/AddBannerForm";
import {
  useCreateBanner,
  useDeleteBanner,
  useGetAllBanners,
  useUpdateBanner,
} from "../../store/admin/adbanner";

const AdminAd_Banner = () => {
  const { banners, isLoading } = useSelector((state) => state.banner);
  const [formData, setFormData] = useState(deepcopyObj(bannerFormData));
  const [openForm, setOpenForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { messageContextState, setMessageContextState } =
    useContext(MessageContext);
  const [fielderrors, setFieldErrors] = useState(deepcopyObj(bannerError));
  const dispatch = useDispatch();
  function openFormMethod() {
    setOpenForm(!openForm);
  }
  function closeFormMethod() {
    setOpenForm(!openForm);
    setFormData(deepcopyObj(bannerFormData));
    setIsEditMode(false);
  }

  function setIsEditModeMethod(data) {
    setFormData(data);
    setIsEditMode(true);
    setOpenForm(!openForm);
  }

  async function handleFormMethod(e) {
    e.preventDefault();
    let hasError = false;
    const localError = deepcopyObj(bannerError);
    if (formData.title === "") {
      localError.title = true;
      hasError = true;
    }
    if (formData.image === "") {
      hasError = true;
      localError.image = true;
    }
    setFieldErrors(deepcopyObj(localError));
    if (!hasError) {
      dispatch(
        isEditMode
          ? useUpdateBanner({ id: formData._id, formData })
          : useCreateBanner(formData)
      ).then((res) => {
        if (res.payload?.success) {
          closeFormMethod();
          dispatch(useGetAllBanners());
          setFormData(deepcopyObj(bannerFormData));
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: true,
          });
        } else {
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: false,
          });
        }
      });
    } else {
      setTimeout(() => {
        setFieldErrors(deepcopyObj(bannerError));
      }, 3000);
    }
  }

  async function handleDeleteBanner(id) {
    if (confirm("Are sure to Delete?")) {
      dispatch(useDeleteBanner(id)).then((res) => {
        if (res.payload?.success) {
          dispatch(useGetAllBanners());
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: true,
          });
        } else {
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: false,
          });
        }
      });
    }
  }

  return (
    <div>
      {openForm && (
        <AddBannerForm
          isEditMode={isEditMode}
          setFormData={setFormData}
          closeFormMethod={closeFormMethod}
          handleFormMethod={handleFormMethod}
          fielderrors={fielderrors}
          formData={formData}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="max-w-7xl mx-auto ">
            {/* <!-- Header Section --> */}
            <div className="admin-header-box">
              <h1 className="admin-heading">Manage Banners</h1>

              {/* <!-- Add Category Button --> */}
              <button onClick={openFormMethod} className="admin-add-btn">
                <i className="fas fa-plus mr-2"></i>
                Add Poster
              </button>
            </div>
          </div>
          <BannerTable
            banners={banners}
            handleDeleteBanner={handleDeleteBanner}
            setIsEditModeMethod={setIsEditModeMethod}
          />
        </div>
      )}
    </div>
  );
};

export default AdminAd_Banner;
