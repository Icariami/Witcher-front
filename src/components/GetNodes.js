import React, { useState } from "react";
import axios from "axios";

const GetNodes = () => {
    const [label, setLabel] = useState("");
    const [nodes, setNodes] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    const availableLabels = ["Character", "Ability", "Monster", "MonsterType", "Group", "Sign"];

    const handleFetchNodes = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/get_nodes/${label}`);
            setNodes(res.data.nodes || []);
            setResponseMessage("");
        } catch (error) {
            console.error("Error fetching nodes:", error);
            setResponseMessage("Failed to fetch nodes.");
            setNodes([]);
        }
    };

    const renderTable = () => {
        if (nodes.length === 0) {
            return <p>No nodes found for label: {label}</p>;
        }

        const thStyle = {
            border: "1px solid black",
            padding: "10px",
            backgroundColor: "#f0f0f0",
        };
        
        const tdStyle = {
            border: "1px solid black",
            padding: "10px",
        };

        switch (label) {
            case "Character":
                return (
                    <table
                        style={{
                            margin: "20px auto",
                            borderCollapse: "collapse",
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        <thead>
                            <tr>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Alias</th>
                            <th style={thStyle}>Birth Year</th>
                            <th style={thStyle}>Nationality</th>
                            <th style={thStyle}>Profession</th>
                            <th style={thStyle}>Race</th>
                            <th style={thStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map((node, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{node.name || "-"}</td>
                                    <td style={tdStyle}>{node.alias || "-"}</td>
                                    <td style={tdStyle}>{node.birth_year || "-"}</td>
                                    <td style={tdStyle}>{node.nationality || "-"}</td>
                                    <td style={tdStyle}>{node.profession || "-"}</td>
                                    <td style={tdStyle}>{node.race || "-"}</td>
                                    <td style={tdStyle}>{node.status || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case "Ability":
            case "Sign":
                return (
                    <table
                        style={{
                            margin: "20px auto",
                            borderCollapse: "collapse",
                            width: "20%",
                            textAlign: "center",
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map((node, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{node.name || "-"}</td>
                                    <td style={tdStyle}>{node.description || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case "Monster":
            case "MonsterType":
            case "Group":
                return (
                    <table
                        style={{
                            margin: "20px auto",
                            borderCollapse: "collapse",
                            width: "10%",
                            textAlign: "center",
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={thStyle}>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map((node, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{node.name || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return <p>No table structure defined for label: {label}</p>;
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

            {responseMessage && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    <h3>{responseMessage}</h3>
                </div>
            )}

            {nodes.length > 0 && renderTable()}
        </div>
    );
};

export default GetNodes;
