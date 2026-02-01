import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import SummaryCard from "../../components/Cards/SummaryCard.jsx";
import moment from "moment";
import CreateSessionForm from "./CreateSessionForm.jsx";
import Modal from "../../components/Modal.jsx";




const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSession = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);


      setSessions(response.data.data);
    } catch (error) {
      console.error("Error fetching session data", error);
      console.error("Error details:", error.response);
    }
  };
  const deleteSession = async (sessionData) => {};
  useEffect(() => {
    fetchAllSession();
  }, []);

  console.log("sessions:", sessions);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || ""}
              questions={data?.questions?.length || "-"}
              description={data.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl fixed bottom-10 md:bottom-20 right-10 md:right-20 z-50"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add new
        </button>
      </div>

      <Modal
      isOpen ={openCreateModal}
      onClose={()=>{
        setOpenCreateModal(false)
      }}
      hideHeader
      >
        <div>
          <CreateSessionForm/>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
