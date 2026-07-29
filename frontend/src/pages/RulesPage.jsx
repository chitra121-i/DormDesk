import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { useEffect, useState } from "react";

function RulesPage() {

  const [rules, setRules] = useState([]);

  const [newRule, setNewRule] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editingText, setEditingText] = useState("");

  const [loading, setLoading] = useState(true);


  const API =
    "http://localhost/DormDesk/backend/rules";


  const loadRules = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API}/get_rules.php`
      );

      const data = await response.json();

      if (data.success) {

        setRules(data.rules);

      }

    }
    catch (error) {

      console.log("Error loading rules:", error);

    }
    finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadRules();

  }, []);


  const addRule = async () => {

    if (!newRule.trim()) {

      alert("Please enter a rule.");

      return;

    }


    try {

      const response = await fetch(
        `${API}/add_rule.php`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            rule_text: newRule

          })

        }
      );


      const data = await response.json();


      alert(data.message);


      if (data.success) {

        setNewRule("");

        loadRules();

      }

    }
    catch (error) {

      console.log("Error adding rule:", error);

    }

  };


  const startEditing = (rule) => {

    setEditingId(rule.id);

    setEditingText(rule.rule_text);

  };


  const cancelEditing = () => {

    setEditingId(null);

    setEditingText("");

  };


  const updateRule = async (id) => {

    if (!editingText.trim()) {

      alert("Rule cannot be empty.");

      return;

    }


    try {

      const response = await fetch(
        `${API}/update_rule.php`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            id: id,

            rule_text: editingText

          })

        }
      );


      const data = await response.json();


      alert(data.message);


      if (data.success) {

        setEditingId(null);

        setEditingText("");

        loadRules();

      }

    }
    catch (error) {

      console.log("Error updating rule:", error);

    }

  };


  const deleteRule = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this rule?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      const response = await fetch(
        `${API}/delete_rule.php`,
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            id: id

          })

        }
      );


      const data = await response.json();


      alert(data.message);


      if (data.success) {

        loadRules();

      }

    }
    catch (error) {

      console.log("Error deleting rule:", error);

    }

  };


  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />


      <div className="flex-1">

        <Topbar />


        <div className="p-8 space-y-8">


          {/* HEADER */}

          <div>

            <h1 className="text-3xl font-bold text-gray-800">

              Hostel Rules

            </h1>


            <p className="text-gray-500 mt-2">

              Add, edit, or remove rules visible to all students.

            </p>

          </div>


          {/* ADD RULE */}

          <div className="bg-white rounded-3xl p-6 shadow">

            <h2 className="text-2xl font-bold mb-5">

              Add New Rule

            </h2>


            <div className="flex gap-4">

              <input

                type="text"

                value={newRule}

                onChange={(e) =>
                  setNewRule(e.target.value)
                }

                placeholder="Enter hostel rule"

                className="border p-3 rounded-xl flex-1"

                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    addRule();

                  }

                }}

              />


              <button

                onClick={addRule}

                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"

              >

                Add Rule

              </button>

            </div>

          </div>


          {/* RULES */}

          <div>

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold">

                Current Hostel Rules

              </h2>


              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-medium">

                {rules.length} Rules

              </span>

            </div>


            {loading ? (

              <div className="bg-white rounded-3xl p-8 text-center">

                Loading rules...

              </div>

            ) : rules.length === 0 ? (

              <div className="bg-white rounded-3xl p-8 text-center">

                No rules have been added yet.

              </div>

            ) : (

              <div className="space-y-4">

                {rules.map((rule, index) => (

                  <div

                    key={rule.id}

                    className="bg-white rounded-3xl shadow p-6"

                  >

                    {editingId === rule.id ? (

                      <div className="flex gap-4">

                        <input

                          type="text"

                          value={editingText}

                          onChange={(e) =>
                            setEditingText(e.target.value)
                          }

                          className="border p-3 rounded-xl flex-1"

                        />


                        <button

                          onClick={() =>
                            updateRule(rule.id)
                          }

                          className="bg-green-500 text-white px-5 py-2 rounded-xl"

                        >

                          Save

                        </button>


                        <button

                          onClick={cancelEditing}

                          className="border border-gray-400 px-5 py-2 rounded-xl"

                        >

                          Cancel

                        </button>

                      </div>

                    ) : (

                      <div className="flex items-center justify-between gap-5">

                        <div className="flex items-center gap-4">

                          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">

                            {index + 1}

                          </div>


                          <p className="text-gray-700">

                            {rule.rule_text}

                          </p>

                        </div>


                        <div className="flex gap-3">

                          <button

                            onClick={() =>
                              startEditing(rule)
                            }

                            className="border border-orange-500 text-orange-500 px-4 py-2 rounded-xl hover:bg-orange-50"

                          >

                            Edit

                          </button>


                          <button

                            onClick={() =>
                              deleteRule(rule.id)
                            }

                            className="border border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-50"

                          >

                            Delete

                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default RulesPage;