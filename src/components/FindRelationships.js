import React, { useState, useEffect } from "react";
import axios from "axios";

const FindRelationships = () => {
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeNames, setNodeNames] = useState([]);
    const [nodeName, setNodeName] = useState("");

    const [relationships, setRelationships] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    const availableLabels = ["Character", "Ability", "Monster", "MonsterType", "Group", "Sign"];

    // Fetch names for the selected label
    useEffect(() => {
        if (nodeLabel) {
            axios
                .get(`http://127.0.0.1:8000/get_node_names/${nodeLabel}`)
                .then((res) => setNodeNames(res.data.names))
                .catch((error) => {
                    console.error("Error fetching node names:", error);
                    setNodeNames([]);
                });
        } else {
            setNodeNames([]);
        }
    }, [nodeLabel]);

    const handleSearch = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/get_outgoing_relationships", {
                node_label: nodeLabel,
                node_name: nodeName,
            });

            if (res.data.relationships.length > 0) {
                setRelationships(res.data.relationships);
                setResponseMessage("");
            } else {
                setRelationships([]);
                setResponseMessage("No outgoing relationships found for the node.");
            }
        } catch (error) {
            console.error("Error fetching outgoing relationships:", error);
            setResponseMessage("Failed to fetch relationships.");
            setRelationships([]);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Find all outgoing relationships of a node</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
                <div>
                    <label>Node Label:</label>
                    <select
                        value={nodeLabel}
                        onChange={(e) => setNodeLabel(e.target.value)}
                        style={{ margin: "10px", padding: "5px" }}
                    >
                        <option value="" disabled>
                            Choose Label
                        </option>
                        {availableLabels.map((label) => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <label>Node Name:</label>
                    <select
                        value={nodeName}
                        onChange={(e) => setNodeName(e.target.value)}
                        style={{ margin: "10px", padding: "5px" }}
                        disabled={!nodeNames.length}
                    >
                        <option value="" disabled>
                            Choose Name
                        </option>
                        {nodeNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={!nodeLabel || !nodeName}
                    style={{ margin: "10px", padding: "10px 20px" }}
                >
                    Find Relationships
                </button>
            </form>

            {responseMessage && <div style={{ marginTop: "20px", color: "red" }}>{responseMessage}</div>}

            {relationships.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Outgoing Relationships:</h3>
                    <table
                        style={{
                            margin: "0 auto",
                            borderCollapse: "collapse",
                            width: "20%",
                            textAlign: "center",
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        border: "1px solid black",
                                        padding: "10px",
                                        backgroundColor: "#f0f0f0",
                                    }}
                                >
                                    Relationship
                                </th>
                                
                                <th
                                    style={{
                                        border: "1px solid black",
                                        padding: "10px",
                                        backgroundColor: "#f0f0f0",
                                    }}
                                >
                                    Connected Node (Name)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {relationships.map((rel, index) => (
                                <tr key={index}>
                                    <td style={{ border: "1px solid black", padding: "10px" }}>
                                        {rel.relationship}
                                    </td>
                                    
                                    <td style={{ border: "1px solid black", padding: "10px" }}>
                                        {rel.connected_node.name || "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FindRelationships;
