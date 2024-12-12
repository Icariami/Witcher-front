import React, { useState } from "react";
import axios from "axios";

const GetNodes = () => {
    const [label, setLabel] = useState("");
    const [nodes, setNodes] = useState([]);
    const [response, setResponse] = useState("");

    // List of available labels
    const availableLabels = ["Character", "Ability", "Monster", "MonsterType", "Group", "Sign"];

    const handleFetchNodes = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/get_nodes/${label}`);
            setNodes(res.data.nodes || []); // Set nodes or empty array
            setResponse(""); // Clear error
        } catch (error) {
            console.error("Error fetching nodes:", error);
            setResponse("Failed to fetch nodes");
            setNodes([]); // Clear nodes if there's an error
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Get Nodes by Label</h2>
            <div>
                <label>Node Label:</label>
                <select
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    style={{ margin: "10px", padding: "5px" }}
                >
                    <option value="" disabled>
                        Choose Label
                    </option>
                    {availableLabels.map((lbl) => (
                        <option key={lbl} value={lbl}>
                            {lbl}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleFetchNodes}
                    disabled={!label}
                    style={{ margin: "10px", padding: "10px 20px" }}
                >
                    Fetch Nodes
                </button>
            </div>

            {response && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    <h3>{response}</h3>
                </div>
            )}

            {/* Display raw JSON */}
            {nodes.length > 0 ? (
                <div style={{ marginTop: "20px" }}>
                    <h3>Results for Label: {label}</h3>
                    <pre style={{ textAlign: "left", margin: "0 auto", maxWidth: "80%" }}>
                        {JSON.stringify(nodes, null, 2)}
                    </pre>
                </div>
            ) : (
                label && !response && <p>No nodes found for label: {label}</p>
            )}
        </div>
    );
};

export default GetNodes;
