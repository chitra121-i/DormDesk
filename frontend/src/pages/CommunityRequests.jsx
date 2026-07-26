import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function CommunityRequests() {

    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("Mess");

    const [requests, setRequests] = useState([]);


    const student =
        JSON.parse(localStorage.getItem("student")) || {};



    const loadRequests = () => {

        fetch(
            "http://localhost/DormDesk/backend/community_requests/get_requests.php"
        )

        .then(res => res.json())

        .then(data => {

            if(data.success){

                setRequests(data.requests);

            }

        })

        .catch(err => console.log(err));

    };



    useEffect(() => {

        loadRequests();

    }, []);



    const handleSubmit = async () => {

        if(!title || !description){

            alert("Please fill all fields");

            return;

        }


        try{

            const response = await fetch(
                "http://localhost/DormDesk/backend/community_requests/add_request.php",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({

                        title,
                        description,
                        category,
                        created_by: student.id

                    })

                }
            );


            const data = await response.json();


            if(data.success){

                alert("Request submitted");

                setTitle("");

                setDescription("");

                setCategory("Mess");

                setShowForm(false);

                loadRequests();

            }


        }
        catch(error){

            console.log(error);

        }


    };
const handleSupport = async (requestId) => {


    try{


        const response = await fetch(
            "http://localhost/DormDesk/backend/community_requests/support_request.php",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    request_id: requestId,

                    student_id: student.id

                })

            }
        );


        const data = await response.json();


        alert(data.message);


        if(data.success){

            loadRequests();

        }


    }
    catch(error){

        console.log(error);

    }


};


    return (

        <section className="min-h-screen bg-gray-100 p-6">


            <h1 className="text-4xl font-bold text-orange-500">
                Community Requests
            </h1>


            <button
                onClick={() => setShowForm(true)}
                className="mt-6 bg-orange-500 text-white px-5 py-3 rounded-xl"
            >
                + Create Request
            </button>

            {showForm && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


    <div className="bg-white rounded-3xl p-8 w-full max-w-lg">


        <h2 className="text-2xl font-bold mb-6">
            Create Community Request
        </h2>


        <input

            type="text"

            placeholder="Request title"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            className="w-full border rounded-xl p-3 mb-4"

        />


        <textarea

            placeholder="Describe your issue"

            value={description}

            onChange={(e)=>setDescription(e.target.value)}

            className="w-full border rounded-xl p-3 mb-4"

            rows="5"

        />


        <select

            value={category}

            onChange={(e)=>setCategory(e.target.value)}

            className="w-full border rounded-xl p-3 mb-6"

        >

            <option>Mess</option>

            <option>Hostel Facilities</option>

            <option>Internet</option>

            <option>Security</option>

            <option>Cleanliness</option>

            <option>Others</option>


        </select>



        <div className="flex justify-end gap-3">


            <button

                onClick={()=>setShowForm(false)}

                className="border px-5 py-2 rounded-xl"

            >

                Cancel

            </button>



            <button

                onClick={handleSubmit}

                className="bg-orange-500 text-white px-5 py-2 rounded-xl"

            >

                Submit

            </button>


        </div>


    </div>


</div>

)}
{/* REQUEST LIST */}

<div className="mt-10 space-y-5">


{
requests.length === 0 ? (

    <div className="bg-white rounded-3xl shadow p-8 text-center">

        <h2 className="text-xl font-semibold text-gray-700">
            No Community Requests Yet
        </h2>

        <p className="text-gray-500 mt-2">
            Be the first student to raise a hostel concern.
        </p>

    </div>


) : (


requests.map((request)=>(


<div
    key={request.id}
    className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"
>


    {/* TOP SECTION */}

    <div className="flex justify-between items-start">


        <div>


            <h2 className="text-xl font-bold text-gray-800">
                {request.title}
            </h2>


            <p className="text-sm text-gray-500 mt-1">
                Posted by {request.created_by}
            </p>


        </div>



        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            {request.status}
        </span>


    </div>




    {/* DESCRIPTION */}

    <p className="text-gray-600 mt-4">
        {request.description}
    </p>




    {/* DETAILS */}

    <div className="flex flex-wrap gap-3 mt-5">


        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">

            {request.category}

        </span>



        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">

            Priority: {request.priority}

        </span>



        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

            ❤️ {request.support_count} Supports

        </span>


    </div>



    {/* SUPPORT BUTTON */}

    <div className="flex justify-end mt-5">


       <button

onClick={() => handleSupport(request.id)}

className="bg-orange-500 text-white px-5 py-2 rounded-xl hover:bg-orange-600"

>

❤️ Support

</button>


    </div>



</div>


))


)

}


</div>

        </section>

    );


}


export default CommunityRequests;