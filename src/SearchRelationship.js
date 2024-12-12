import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchRelationship = () => {
    const [node1Label, setNode1Label] = useState("");
    const [node1Names, setNode1Names] = useState([]);
    const [node1Name, setNode1Name] = useState("");

    const [node2Label, setNode2Label] = useState("");
    const [node2Names, setNode2Names] = useState([]);
    const [node2Name, setNode2Name] = useState("");

    const [relationships, setRelationships] = useState([]);
    const [responseMessage, setResponseMessage] = useState("");

    const availableLabels = ["Character", "Ability", "Monster", "MonsterType", "Group", "Sign"];

    // Fetch names for Node 1 when its label changes
    useEffect(() => {
        if (node1Label) {
            axios
                .get(`http://127.0.0.1:8000/get_node_names/${node1Label}`)
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
                .get(`http://127.0.0.1:8000/get_node_names/${node2Label}`)
                .then((res) => setNode2Names(res.data.names))
                .catch((error) => {
                    console.error("Error fetching node 2 names:", error);
                    setNode2Names([]);
                });
        } else {
            setNode2Names([]);
        }
    }, [node2Label]);

    const handleSearch = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/search_relationships", {
                node1_label: node1Label,
                node1_name: node1Name,
                node2_label: node2Label,
                node2_name: node2Name,
            });

            if (res.data.relationships.length > 0) {
                setRelationships(res.data.relationships);
                setResponseMessage("");
            } else {
                setRelationships([]);
                setResponseMessage("No relationships found between the nodes.");
            }
        } catch (error) {
            console.error("Error searching relationships:", error);
            setResponseMessage("Failed to search relationships.");
            setRelationships([]);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Search Relationship between two nodes</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                }}
            >
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

                <button
                    type="submit"
                    disabled={!node1Label || !node1Name || !node2Label || !node2Name}
                    style={{ margin: "10px", padding: "10px 20px" }}
                >
                    Search Relationships
                </button>
            </form>

            {responseMessage && <div style={{ marginTop: "20px", color: "red" }}>{responseMessage}</div>}

            {relationships.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Relationships Found:</h3>
                    <ul>
                        {relationships.map((rel, index) => (
                            <li key={index}>{rel}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchRelationship;
