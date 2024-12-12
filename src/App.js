import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddNode from "./components/AddNode";
import AddRelationship from "./components/AddRelationship";
import SearchRelationship from "./components/SearchRelationship";
import GetNodes from "./components/GetNodes";
import FindRelationships from "./components/FindRelationships";


function App() {
    const [graphData, setGraphData] = useState([]);
    
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
                    
                </div>
            </div>

            <Routes>
                <Route path="/add-node" element={<AddNode />} />
                <Route path="/add-relationship" element={<AddRelationship />} />
                <Route path="/search-relationship" element={<SearchRelationship />} />
                <Route path="/get-nodes" element={<GetNodes />} />
                <Route path="/find-relationships" element={<FindRelationships />} />
                
            </Routes>
        </Router>
    );
}

export default App;
