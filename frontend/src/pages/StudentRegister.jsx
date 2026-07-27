import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        course: "",
        year: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(formData.password !== formData.confirmPassword){

            alert("Passwords do not match.");
            return;

        }

        try{

            const response = await fetch(
                "http://localhost/DormDesk/backend/students/register_student.php",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if(data.success){

                alert("Registration Successful.\nPlease wait for Warden Approval.");

                navigate("/student-login");

            }
            else{

                alert(data.message);

            }

        }
        catch(err){

            console.log(err);
            alert("Server Error");

        }

    };

    return (

        <section className="min-h-screen flex items-center justify-center bg-orange-50">

            <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">

                <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
                    Student Registration
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="gender"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>

                    <input
                        type="text"
                        name="course"
                        placeholder="Course"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        className="w-full border rounded-xl p-3"
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600"
                    >
                        Register
                    </button>

                </form>

            </div>

        </section>

    );

}

export default StudentRegister;