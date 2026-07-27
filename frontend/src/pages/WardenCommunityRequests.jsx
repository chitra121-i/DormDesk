import { useEffect, useState } from "react";

function WardenCommunityRequests() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [updatingId, setUpdatingId] = useState(null);


    const API =
        "http://localhost/DormDesk/backend/community_requests";


    const loadRequests = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${API}/get_warden_requests.php`
            );

            const data = await response.json();

            if (data.success) {

                setRequests(data.requests);

            }

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadRequests();

    }, []);


    const updateRequest = async (
        requestId,
        status,
        priority
    ) => {

        try {

            setUpdatingId(requestId);

            const response = await fetch(
                `${API}/update_request.php`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        request_id: requestId,

                        status: status,

                        priority: priority

                    })

                }
            );


            const data = await response.json();


            if (data.success) {

                /*
                    Reloading is important because
                    the order can change in the future.
                */

                loadRequests();

            }
            else {

                alert(data.message);

            }

        }
        catch (error) {

            console.log(error);

            alert("Something went wrong");

        }
        finally {

            setUpdatingId(null);

        }

    };


    const deleteRequest = async (requestId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this request?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            const response = await fetch(
                `${API}/delete_request.php`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        request_id: requestId

                    })

                }
            );


            const data = await response.json();


            if (data.success) {

                setRequests(
                    requests.filter(
                        request => request.id !== requestId
                    )
                );

            }
            else {

                alert(data.message);

            }

        }
        catch (error) {

            console.log(error);

        }

    };


    const formatDate = (date) => {

        return new Date(date).toLocaleDateString(
            "en-IN",
            {

                day: "numeric",

                month: "short",

                year: "numeric"

            }
        );

    };


    const getStatusStyle = (status) => {

        if (status === "Resolved") {

            return "bg-green-100 text-green-700";

        }

        return "bg-yellow-100 text-yellow-700";

    };


    const getPriorityStyle = (priority) => {

        if (priority === "High") {

            return "bg-red-100 text-red-700";

        }

        if (priority === "Medium") {

            return "bg-orange-100 text-orange-700";

        }

        return "bg-green-100 text-green-700";

    };


    return (

        <section className="min-h-screen bg-gray-100 p-6">


            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-orange-500">

                        Community Requests

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Requests raised during the current month

                    </p>

                </div>


                <button

                    onClick={loadRequests}

                    className="bg-orange-500 text-white px-5 py-3 rounded-xl hover:bg-orange-600"

                >

                    Refresh

                </button>

            </div>


            {/* SORT INFORMATION */}

            <div className="bg-white rounded-2xl shadow p-5 mb-6">

                <p className="text-gray-600">

                    🔥 Requests are sorted by

                    <span className="font-bold text-orange-500">

                        {" "}most supports

                    </span>

                    {" "}first.

                </p>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="bg-white rounded-3xl p-10 text-center">

                    <p className="text-gray-500">

                        Loading requests...

                    </p>

                </div>

            )}


            {/* EMPTY STATE */}

            {!loading && requests.length === 0 && (

                <div className="bg-white rounded-3xl shadow p-10 text-center">

                    <h2 className="text-2xl font-bold text-gray-700">

                        No Community Requests This Month

                    </h2>


                    <p className="text-gray-500 mt-2">

                        No requests have been raised during the current month.

                    </p>

                </div>

            )}


            {/* REQUESTS */}

            {!loading && requests.length > 0 && (

                <div className="space-y-6">

                    {requests.map((request, index) => (

                        <div

                            key={request.id}

                            className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"

                        >


                            {/* TOP ROW */}

                            <div className="flex justify-between items-start">


                                <div className="flex gap-4">


                                    {/* RANK */}

                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">

                                        <span className="text-orange-600 font-bold text-lg">

                                            #{index + 1}

                                        </span>

                                    </div>


                                    <div>

                                        <h2 className="text-2xl font-bold text-gray-800">

                                            {request.title}

                                        </h2>


                                        <p className="text-sm text-gray-500 mt-1">

                                            Posted by {request.created_by}

                                            {" "}•{" "}

                                            {formatDate(request.created_at)}

                                        </p>

                                    </div>


                                </div>


                                {/* SUPPORT COUNT */}

                                <div className="text-center">

                                    <div className="text-3xl font-bold text-orange-500">

                                        {request.support_count}

                                    </div>


                                    <div className="text-sm text-gray-500">

                                        Supports

                                    </div>

                                </div>


                            </div>


                            {/* DESCRIPTION */}

                            <p className="text-gray-600 mt-6 leading-relaxed">

                                {request.description}

                            </p>


                            {/* TAGS */}

                            <div className="flex flex-wrap gap-3 mt-5">


                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">

                                    {request.category}

                                </span>


                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(request.status)}`}>

                                    {request.status}

                                </span>


                                <span className={`px-3 py-1 rounded-full text-sm ${getPriorityStyle(request.priority)}`}>

                                    Priority: {request.priority}

                                </span>


                            </div>


                            {/* CONTROLS */}

                            <div className="border-t mt-6 pt-5">


                                <div className="flex flex-wrap items-center gap-4">


                                    {/* STATUS */}

                                    <div>

                                        <label className="block text-sm font-medium text-gray-600 mb-1">

                                            Status

                                        </label>


                                        <select

                                            value={request.status}

                                            disabled={updatingId === request.id}

                                            onChange={(e) => {

                                                updateRequest(

                                                    request.id,

                                                    e.target.value,

                                                    request.priority

                                                );

                                            }}

                                            className="border rounded-xl px-4 py-2"

                                        >

                                            <option value="Pending">

                                                Pending

                                            </option>


                                            <option value="Resolved">

                                                Resolved

                                            </option>

                                        </select>

                                    </div>


                                    {/* PRIORITY */}

                                    <div>

                                        <label className="block text-sm font-medium text-gray-600 mb-1">

                                            Priority

                                        </label>


                                        <select

                                            value={request.priority}

                                            disabled={updatingId === request.id}

                                            onChange={(e) => {

                                                updateRequest(

                                                    request.id,

                                                    request.status,

                                                    e.target.value

                                                );

                                            }}

                                            className="border rounded-xl px-4 py-2"

                                        >

                                            <option value="Low">

                                                Low

                                            </option>


                                            <option value="Medium">

                                                Medium

                                            </option>


                                            <option value="High">

                                                High

                                            </option>

                                        </select>

                                    </div>


                                    {/* DELETE */}

                                    <button

                                        onClick={() => deleteRequest(request.id)}

                                        className="ml-auto bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200"

                                    >

                                        Delete

                                    </button>


                                </div>


                            </div>


                            {/* RESOLVED DATE */}

                            {request.status === "Resolved" && request.resolved_at && (

                                <p className="text-sm text-green-600 mt-4">

                                    ✓ Resolved on {formatDate(request.resolved_at)}

                                </p>

                            )}


                        </div>

                    ))}

                </div>

            )}

        </section>

    );

}


export default WardenCommunityRequests;