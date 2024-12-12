import React, { useEffect } from "react";
import cytoscape from "cytoscape";

const GraphVisualization = ({ graphData }) => {
    console.log("DEBUG: Graph Data in GraphVisualization:", graphData); // Log the data

    // Only initialize Cytoscape if graphData is available
    useEffect(() => {
        if (graphData && graphData.length > 0) {
            const cy = cytoscape({
                container: document.getElementById("cy"), // Div ID to render Cytoscape
                elements: graphData, // Pass graph data as elements
                style: [
                    {
                        selector: "node",
                        style: {
                            "background-color": "#6FB1FC",
                            label: "data(label)", // Display node labels
                        },
                    },
                    {
                        selector: "edge",
                        style: {
                            width: 2,
                            "line-color": "#ccc",
                            "target-arrow-color": "#ccc",
                            "target-arrow-shape": "triangle",
                            "curve-style": "bezier",
                            label: "data(type)", // Display relationship type
                        },
                    },
                ],
                layout: {
                    name: "cose", // Layout algorithm (adjustable)
                },
            });

            return () => cy.destroy(); // Clean up Cytoscape instance on component unmount
        }
    }, [graphData]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {graphData && graphData.length > 0 ? (
                // Render Cytoscape when graphData is available
                <div id="cy" style={{ width: "800px", height: "600px", border: "1px solid black" }} />
            ) : (
                // Render image when graphData is not available
                <div>
                    <h2>Graph Visualization</h2>
                    <img
                        src="/graph.png" // The image path in the public directory
                        alt="Graph Visualization"
                        style={{ width: "1712px", height: "1396px", border: "1px solid black" }}
                    />
                </div>
            )}
        </div>
    );
};

export default GraphVisualization;
