import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddNode from "./components/AddNode";
import AddRelationship from "./components/AddRelationship";
import SearchRelationship from "./components/SearchRelationship";
import GetNodes from "./components/GetNodes";
import FindRelationships from "./components/FindRelationships";
import GraphVisualization from "./components/GraphVisualization";

function App() {
    const [graphData, setGraphData] = useState([]);
    const [showGraph, setShowGraph] = useState(false); // State to control the visibility of the image

    // Image path (ensure the image is placed in the public directory or provide a URL)
    const graphImagePath = "/graph.png"; // Replace with the correct path

    const handleGraphVisualizationClick = () => {
        setShowGraph(true); // Set the state to show the image when button is clicked
    };

    const handleOtherButtonClick = () => {
        setShowGraph(false); // Hide the graph image when any other button is clicked
    };

    return (
        <Router>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Witcher Graph Database</h1>
                <div>
                    <Link to="/add-node">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Add Node</button>
                    </Link>
                    <Link to="/add-relationship">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Add Relationship</button>
                    </Link>
                    <Link to="/search-relationship">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Search Relationship</button>
                    </Link>
                    <Link to="/find-relationships">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Find All Relationships</button>
                    </Link>
                    <Link to="/get-nodes">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Get Nodes</button>
                    </Link>
                    <Link to="/graph-visualization">
                        <button style={{ margin: "10px", padding: "10px 20px" }}>Graph Visualization</button>
                    </Link>
                </div>
            </div>

            <Routes>
                <Route path="/add-node" element={<AddNode />} />
                <Route path="/add-relationship" element={<AddRelationship />} />
                <Route path="/search-relationship" element={<SearchRelationship />} />
                <Route path="/get-nodes" element={<GetNodes />} />
                <Route path="/find-relationships" element={<FindRelationships />} />
                <Route path="/graph-visualization" element={<GraphVisualization />} />
            </Routes>
        </Router>
    );
}

export default App;
