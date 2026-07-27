import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useEffect, useState } from "react";

function NoticesPage() {

  const [notices, setNotices] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");


  const loadNotices = async () => {

    try {

      const response = await fetch(
        "http://localhost/DormDesk/backend/notices/get_notices.php"
      );

      const data = await response.json();

      if(data.success){

        setNotices(data.notices);

      }

    } catch(error){

      console.log(error);

    }

  };

  useEffect(() => {

    loadNotices();

  }, []);

  const publishNotice = async () => {

    if(!title || !description){

      alert("Fill all fields");

      return;

    }

    try{

      const response = await fetch(
        "http://localhost/DormDesk/backend/notices/add_notice.php",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            title,
            description

          })
        }
      );

      const data =
        await response.json();

      alert(data.message);

      if(data.success){

        setTitle("");
        setDescription("");

        loadNotices();

      }

    }catch(error){

      console.log(error);

    }

  };

  const deleteNotice = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete Notice?"
      );

    if(!confirmDelete) return;

    try{

      const response = await fetch(
        "http://localhost/DormDesk/backend/notices/delete_notice.php",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            id
          })
        }
      );

      const data =
        await response.json();

      alert(data.message);

      if(data.success){

        loadNotices();

      }

    }catch(error){

      console.log(error);

    }

  };

  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8 space-y-8">

          {/* Publish Notice */}

          <div className="bg-white rounded-3xl p-6 shadow">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Publish Notice
              </h2>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-medium">
                Warden Portal
              </span>

            </div>

            <input
              type="text"
              placeholder="Notice Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="border p-3 rounded-xl w-full mb-4"
            />

            <textarea
              placeholder="Notice Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="border p-3 rounded-xl w-full h-40 resize-none"
            />

            <button
              onClick={publishNotice}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition"
            >
              Publish Notice
            </button>

          </div>

          {/* Active Notices */}

          <div>

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold">
                Active Notices
              </h2>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-medium">
                {notices.length} Active
              </span>

            </div>

            <div className="space-y-5">

              {notices.map((notice) => (

                <div
                  key={notice.id}
                  className="bg-white rounded-3xl shadow p-6"
                >

                  <div className="flex justify-between items-start mb-4">

                    <h3 className="text-xl font-bold text-orange-500">
                      {notice.title}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {new Date(
                        notice.created_at
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <p className="text-gray-700 leading-relaxed mb-5">
                    {notice.description}
                  </p>

                  <div className="flex justify-end">

                    <button
                      onClick={() =>
                        deleteNotice(notice.id)
                      }
                      className="border border-red-500 text-red-500 px-5 py-2 rounded-xl hover:bg-red-50 transition"
                    >
                      Delete Notice
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NoticesPage;