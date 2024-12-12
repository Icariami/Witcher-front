import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRelationship = () => {
    const [node1Label, setNode1Label] = useState("");
    const [node1Names, setNode1Names] = useState([]);
    const [node1Name, setNode1Name] = useState("");

    const [node2Label, setNode2Label] = useState("");
    const [node2Names, setNode2Names] = useState([]);
    const [node2Name, setNode2Name] = useState("");

    const [relationshipType, setRelationshipType] = useState("");
    const [customRelationship, setCustomRelationship] = useState("");
    const [response, setResponse] = useState("");

    const availableLabels = ["Character", "Ability", "Monster", "MonsterType", "Group", "Sign"];
    const availableRelationships = [
        "AFFILIATED_WITH",
        "BELONGS_TO",
        "FRIEND",
        "HAS_ABILITY",
        "IMMUNE_TO",
        "PARTNER",
        "PART_OF",
        "STEPDAUGHTER_OF",
        "TRAVEL_COMPANION",
        "TYPE_OF",
        "VULNERABLE_TO",
        "Custom", // Option to add a custom relationship
    ];

    // Fetch names for Node 1 when its label changes
    useEffect(() => {
        if (node1Label) {
            axios
                .get(`https://chmury-back.azurewebsites.net//get_node_names/${node1Label}`)
                .then((res) => setNode1Names(res.data.names))
                .catch((error) => {
                    console.error("Error fetching node 1 names:", error);
                    setNode1Names([]);
                });
        } else {
            setNode1Names([]);
        }
    }, [node1Label]);

    // Fetch names for Node 2 when its label changes
    useEffect(() => {
        if (node2Label) {
            axios
                .get(`https://chmury-back.azurewebsites.net//get_node_names/${node2Label}`)
                .then((res) => setNode2Names(res.data.names))
                .catch((error) => {
                    console.error("Error fetching node 2 names:", error);
                    setNode2Names([]);
                });
        } else {
            setNode2Names([]);
        }
    }, [node2Label]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const relationship = relationshipType === "Custom" ? customRelationship : relationshipType;
            const res = await axios.post("https://chmury-back.azurewebsites.net//add_relationship", {
                node1_label: node1Label,
                node1_properties: { name: node1Name },
                node2_label: node2Label,
                node2_properties: { name: node2Name },
                relationship_type: relationship,
            });
            setResponse(res.data);
        } catch (error) {
            console.error(error);
            setResponse(error.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Add Relationship</h2>
            <form onSubmit={handleSubmit}>
                {/* Node 1 */}
                <div>
                    <label>Source Node Label:</label>
                    <select
                        value={node1Label}
                        onChange={(e) => setNode1Label(e.target.value)}
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
                    <label>Source Node Name:</label>
                    <select
                        value={node1Name}
                        onChange={(e) => setNode1Name(e.target.value)}
                        style={{ margin: "10px", padding: "5px" }}
                        disabled={!node1Names.length}
                    >
                        <option value="" disabled>
                            Choose Name
                        </option>
                        {node1Names.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Node 2 */}
                <div>
                    <label>Target Node Label:</label>
                    <select
                        value={node2Label}
                        onChange={(e) => setNode2Label(e.target.value)}
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
                    <label>Target Node Name:</label>
                    <select
                        value={node2Name}
                        onChange={(e) => setNode2Name(e.target.value)}
                        style={{ margin: "10px", padding: "5px" }}
                        disabled={!node2Names.length}
                    >
                        <option value="" disabled>
                            Choose Name
                        </option>
                        {node2Names.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Relationship */}
                <div>
                    <label>Relationship Type:</label>
                    <select
                        value={relationshipType}
                        onChange={(e) => setRelationshipType(e.target.value)}
                        style={{ margin: "10px", padding: "5px" }}
                    >
                        <option value="" disabled>
                            Choose Relationship
                        </option>
                        {availableRelationships.map((rel) => (
                            <option key={rel} value={rel}>
                                {rel}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Custom Relationship Input */}
                {relationshipType === "Custom" && (
                    <div>
                        <label>Custom Relationship Name:</label>
                        <input
                            type="text"
                            value={customRelationship}
                            onChange={(e) => setCustomRelationship(e.target.value)}
                            style={{ margin: "10px", padding: "5px", width: "300px" }}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={
                        !node1Label || !node1Name || !node2Label || !node2Name || !relationshipType
                    }
                    style={{ margin: "10px", padding: "10px 20px" }}
                >
                    Add Relationship
                </button>
            </form>

            {response && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AddRelationship;
