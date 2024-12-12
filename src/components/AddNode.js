import React, { useState } from "react";
import axios from "axios";

const AddNode = () => {
    const [label, setLabel] = useState("");
    const [formData, setFormData] = useState({});
    const [response, setResponse] = useState("");

    const labels = ["Character", "Ability", "Monster", "Group", "MonsterType", "Sign"];

    const labelAttributes = {
        Character: ["name", "alias", "birth_year", "nationality", "profession", "race", "status"],
        Ability: ["name", "description"],
        Monster: ["name"],
        MonsterType: ["name"],
        Group: ["name"],
        Sign: ["name", "description"],
    };

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
        setFormData({}); // Reset form data when label changes
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation check
        if (!formData.name || formData.name.trim() === "") {
            setResponse("Error: 'name' field cannot be empty!");
            return;
        }

        try {
            const res = await axios.post("https://chmury-back.azurewebsites.net/add_node", {
                label,
                properties: formData,
            });
            setResponse(res.data);
        } catch (error) {
            console.error(error);
            setResponse(error.message);
        }
    };

    // Check if the name field is filled
    const isFormValid = () => {
        return label && formData.name && formData.name.trim() !== "";
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Add Node</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Node Label:</label>
                    <select
                        value={label}
                        onChange={handleLabelChange}
                        style={{ margin: "10px", padding: "5px" }}
                    >
                        <option value="" disabled>
                            Choose Node Label
                        </option>
                        {Object.keys(labelAttributes).map((lbl) => (
                            <option key={lbl} value={lbl}>
                                {lbl}
                            </option>
                        ))}
                    </select>
                </div>
                {label && (
                    <div>
                        {labelAttributes[label].map((attr) => (
                            <div key={attr} style={{ marginBottom: "10px" }}>
                                <label>{attr}:</label>
                                <input
                                    type="text"
                                    name={attr}
                                    value={formData[attr] || ""}
                                    onChange={handleInputChange}
                                    style={{ margin: "10px", padding: "5px", width: "300px" }}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit" disabled={!isFormValid()}>
                    Add Node
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

export default AddNode;
