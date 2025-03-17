import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "./ProphetTimeline.module.css";

const ProphetTimeline = () => {
    const graphRef = useRef();
    const [selectedProphet, setSelectedProphet] = useState(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Group descriptions for the legend
    const groupDescriptions = {
        early: "First Prophets",
        middle: "Middle Period Prophets",
        later: "Later Prophets",
        final: "Final Prophet"
    };

    // Prophet information with additional details
    const prophetInfo = {
        adam: "First human and prophet, father of humanity",
        idris: "Known for his wisdom and patience",
        nuh: "Built the Ark to save believers from the flood",
        hud: "Sent to the people of 'Ad",
        saleh: "Sent to the people of Thamud",
        ibrahim: "Father of prophets, known as Abraham",
        lut: "Nephew of Ibrahim, sent to the people of Sodom",
        ismail: "Son of Ibrahim, helped build the Kaaba",
        ishaq: "Son of Ibrahim, known as Isaac",
        yaqub: "Son of Ishaq, known as Jacob",
        yusuf: "Son of Yaqub, known for his beauty and wisdom",
        ayyub: "Known for his patience through trials",
        shuayb: "Sent to the people of Madyan",
        musa: "Received the Torah, known as Moses",
        harun: "Brother of Musa, known as Aaron",
        dhulkifl: "Known for his patience and righteousness",
        dawud: "Received the Zabur (Psalms), known as David",
        sulaiman: "Son of Dawud, known for his wisdom, known as Solomon",
        ilyas: "Sent to the people of Ba'albek, known as Elijah",
        alyasa: "Successor to Ilyas, known as Elisha",
        yunus: "Known for the incident with the whale, known as Jonah",
        zakariya: "Father of Yahya, known as Zechariah",
        yahya: "Son of Zakariya, known as John the Baptist",
        isa: "Born to Maryam (Mary), known as Jesus",
        muhammad: "The final prophet, received the Quran"
    };

    useEffect(() => {
        // Handle window resize
        const handleResize = () => {
            // Calculate the correct dimensions based on the navbar and sidebar
            const topNavHeight = 60;
            const sideNavWidth = window.innerWidth > 768 ? 250 : 0;

            setDimensions({
                width: window.innerWidth - sideNavWidth,
                height: window.innerHeight - topNavHeight
            });
        };

        // Call it once to set initial dimensions
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Clear previous SVG
        d3.select(graphRef.current).selectAll("*").remove();

        const { width, height } = dimensions;
        const margin = { top: 50, right: 100, bottom: 50, left: 100 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const prophetsData = {
            nodes: [
                { id: "adam", label: "Adam (AS)", group: "early" },
                { id: "idris", label: "Idris (AS)", group: "early" },
                { id: "nuh", label: "Nuh (AS)", group: "early" },
                { id: "hud", label: "Hud (AS)", group: "middle" },
                { id: "saleh", label: "Saleh (AS)", group: "middle" },
                { id: "ibrahim", label: "Ibrahim (AS)", group: "middle" },
                { id: "lut", label: "Lut (AS)", group: "middle" },
                { id: "ismail", label: "Ismail (AS)", group: "middle" },
                { id: "ishaq", label: "Ishaq (AS)", group: "middle" },
                { id: "yaqub", label: "Yaqub (AS)", group: "middle" },
                { id: "yusuf", label: "Yusuf (AS)", group: "middle" },
                { id: "ayyub", label: "Ayyub (AS)", group: "later" },
                { id: "shuayb", label: "Shuayb (AS)", group: "later" },
                { id: "musa", label: "Musa (AS)", group: "later" },
                { id: "harun", label: "Harun (AS)", group: "later" },
                { id: "dhulkifl", label: "Dhul-Kifl (AS)", group: "later" },
                { id: "dawud", label: "Dawud (AS)", group: "later" },
                { id: "sulaiman", label: "Sulaiman (AS)", group: "later" },
                { id: "ilyas", label: "Ilyas (AS)", group: "later" },
                { id: "alyasa", label: "Al-Yasa (AS)", group: "later" },
                { id: "yunus", label: "Yunus (AS)", group: "later" },
                { id: "zakariya", label: "Zakariya (AS)", group: "later" },
                { id: "yahya", label: "Yahya (AS)", group: "later" },
                { id: "isa", label: "Isa (AS)", group: "later" },
                { id: "muhammad", label: "Muhammad (SAW)", group: "final" }
            ],
            links: [
                { source: "adam", target: "idris" },
                { source: "idris", target: "nuh" },
                { source: "nuh", target: "hud" },
                { source: "hud", target: "saleh" },
                { source: "saleh", target: "ibrahim" },
                { source: "ibrahim", target: "lut" },
                { source: "ibrahim", target: "ismail" },
                { source: "ibrahim", target: "ishaq" },
                { source: "ishaq", target: "yaqub" },
                { source: "yaqub", target: "yusuf" },
                { source: "yusuf", target: "ayyub" },
                { source: "ibrahim", target: "shuayb" },
                { source: "yaqub", target: "musa" },
                { source: "musa", target: "harun" },
                { source: "musa", target: "dhulkifl" },
                { source: "dhulkifl", target: "dawud" },
                { source: "dawud", target: "sulaiman" },
                { source: "sulaiman", target: "ilyas" },
                { source: "ilyas", target: "alyasa" },
                { source: "alyasa", target: "yunus" },
                { source: "yunus", target: "zakariya" },
                { source: "zakariya", target: "yahya" },
                { source: "zakariya", target: "isa" },
                { source: "ismail", target: "muhammad" },
                { source: "ibrahim", target: "muhammad" },
                { source: "adam", target: "muhammad" }
            ]
        };

        const colors = {
            early: "#D4AF37",
            middle: "#1E8FD5",
            later: "#7E57C2",
            final: "#39A845"
        };

        // Create SVG container
        const svg = d3.select(graphRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Add title
        svg.append("text")
            .attr("class", "timeline-title")
            .attr("x", width / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")
            .attr("font-size", "24px")
            .attr("font-weight", "bold")
            .text("Timeline of Prophets in Islam");

        // Create a container for zoom functionality
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add zoom functionality
        const zoom = d3.zoom()
            .scaleExtent([0.3, 4])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        // Initial zoom to fit content better
        svg.call(zoom.transform, d3.zoomIdentity.translate(innerWidth / 6, innerHeight / 6).scale(0.8));

        // Create force simulation
        const simulation = d3.forceSimulation(prophetsData.nodes)
            .force("link", d3.forceLink(prophetsData.links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2))
            .force("collision", d3.forceCollide().radius(40))
            .force("x", d3.forceX(innerWidth / 2).strength(0.03))
            .force("y", d3.forceY(innerHeight / 2).strength(0.03));

        // Create links
        const link = g.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(prophetsData.links)
            .enter()
            .append("line")
            .attr("stroke", "rgba(255, 255, 255, 0.4)")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", d => {
                // Special connections to Muhammad shown with dashed lines
                if ((d.source.id === "ismail" && d.target.id === "muhammad") ||
                    (d.source.id === "ibrahim" && d.target.id === "muhammad") ||
                    (d.source.id === "adam" && d.target.id === "muhammad")) {
                    return "5,5";
                }
                return null;
            });

        // Create node groups
        const nodeGroup = g.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(prophetsData.nodes)
            .enter()
            .append("g")
            .call(d3.drag()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                }));

        // Add halos/rings around nodes (larger for Muhammad)
        nodeGroup.append("circle")
            .attr("r", d => d.group === "final" ? 22 : d.id === selectedProphet ? 18 : 14)
            .attr("fill", "none")
            .attr("stroke", d => colors[d.group])
            .attr("stroke-width", 2)
            .attr("stroke-opacity", 0.6)
            .attr("class", "halo");

        // Add node circles
        nodeGroup.append("circle")
            .attr("r", d => d.group === "final" ? 16 : d.id === selectedProphet ? 14 : 10)
            .attr("fill", d => colors[d.group])
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1.5)
            .attr("cursor", "pointer")
            .on("mouseover", (event, d) => {
                // Highlight on mouseover
                d3.select(event.target).attr("stroke-width", 3);

                // Show tooltip
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip.html(`
          <strong>${d.label}</strong><br/>
          <span>${prophetInfo[d.id]}</span>
        `)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", (event) => {
                d3.select(event.target).attr("stroke-width", 1.5);
                tooltip.transition().duration(500).style("opacity", 0);
            })
            .on("click", (event, d) => {
                setSelectedProphet(d.id === selectedProphet ? null : d.id);
            });

        // Add node labels
        nodeGroup.append("text")
            .attr("dy", 24)
            .attr("text-anchor", "middle")
            .text(d => d.label)
            .attr("fill", "#ffffff")
            .attr("font-size", d => d.group === "final" ? "16px" : "12px")
            .attr("font-weight", d => d.group === "final" ? "bold" : "normal")
            .attr("pointer-events", "none");

        // Add tooltip
        const tooltip = d3.select(graphRef.current)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("padding", "10px")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("border-radius", "5px")
            .style("color", "white")
            .style("max-width", "200px")
            .style("pointer-events", "none")
            .style("z-index", 10);

        // Add legend
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width - 200}, 80)`);

        const legendItems = Object.entries(colors);

        legendItems.forEach(([group, color], i) => {
            const legendItem = legend.append("g")
                .attr("transform", `translate(0, ${i * 30})`);
        
            legendItem.append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("rx", 7.5)
                .attr("fill", color);
        
            legendItem.append("text")
                .attr("class", "legend-text")
                .attr("x", 25)
                .attr("y", 12.5)
                .attr("fill", "white")
                .attr("font-size", "14px")
                .text(groupDescriptions[group]);
        });
        // Add reset zoom button
        const resetButton = svg.append("g")
            .attr("class", "reset-button")
            .attr("transform", `translate(100, 35)`)
            .attr("cursor", "pointer")
            .on("click", () => {
                svg.transition().duration(750).call(
                    zoom.transform,
                    d3.zoomIdentity.translate(innerWidth / 6, innerHeight / 6).scale(0.8)
                );
                setSelectedProphet(null);
            });

        resetButton.append("rect")
            .attr("width", 100)
            .attr("height", 30)
            .attr("rx", 15)
            .attr("fill", "rgba(255, 255, 255, 0.2)");

        resetButton.append("text")
            .attr("x", 50)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")
            .attr("font-size", "14px")
            .text("Reset View");

        // Update the simulation on tick
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            nodeGroup
                .attr("transform", d => `translate(${d.x}, ${d.y})`);
        });

        // Cleanup function
        return () => {
            simulation.stop();
        };
    }, [dimensions, selectedProphet]);

    return (
        <div
            ref={graphRef}
            className={styles.graphContainer}
        >
        </div>
    );
};

export default ProphetTimeline;