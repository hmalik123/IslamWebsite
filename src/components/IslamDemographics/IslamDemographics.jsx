import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import styles from './IslamDemographics.module.css';

const IslamDemographics = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const containerRef = useRef();
  const zoomRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch world map data
      const response = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
      const worldData = await response.json();
      const countries = feature(worldData, worldData.objects.countries).features;

      // Muslim population data (approximate percentages)
      const muslimData = {
        // Muslim majority countries (>50%)
        'Afghanistan': { percentage: 99.7, population: '38 million', category: 'majority' },
        'Albania': { percentage: 58.8, population: '1.7 million', category: 'majority' },
        'Algeria': { percentage: 99.0, population: '43 million', category: 'majority' },
        'Azerbaijan': { percentage: 96.9, population: '9.9 million', category: 'majority' },
        'Bahrain': { percentage: 70.3, population: '1 million', category: 'majority' },
        'Bangladesh': { percentage: 90.4, population: '156 million', category: 'majority' },
        'Brunei': { percentage: 78.8, population: '340,000', category: 'majority' },
        'Burkina Faso': { percentage: 63.2, population: '13 million', category: 'majority' },
        'Chad': { percentage: 55.3, population: '8.7 million', category: 'majority' },
        'Comoros': { percentage: 98.3, population: '850,000', category: 'majority' },
        'Djibouti': { percentage: 94.0, population: '940,000', category: 'majority' },
        'Egypt': { percentage: 90.0, population: '90 million', category: 'majority' },
        'Gambia': { percentage: 95.7, population: '2.3 million', category: 'majority' },
        'Guinea': { percentage: 89.1, population: '11 million', category: 'majority' },
        'Indonesia': { percentage: 87.2, population: '231 million', category: 'majority' },
        'Iran': { percentage: 99.4, population: '83 million', category: 'majority' },
        'Iraq': { percentage: 95.7, population: '38 million', category: 'majority' },
        'Jordan': { percentage: 97.2, population: '10 million', category: 'majority' },
        'Kazakhstan': { percentage: 70.2, population: '13 million', category: 'majority' },
        'Kosovo': { percentage: 95.6, population: '1.7 million', category: 'majority' },
        'Kuwait': { percentage: 74.6, population: '3.1 million', category: 'majority' },
        'Kyrgyzstan': { percentage: 88.8, population: '5.7 million', category: 'majority' },
        'Lebanon': { percentage: 61.3, population: '4.2 million', category: 'majority' },
        'Libya': { percentage: 96.6, population: '6.7 million', category: 'majority' },
        'Malaysia': { percentage: 61.3, population: '19.5 million', category: 'majority' },
        'Maldives': { percentage: 100.0, population: '540,000', category: 'majority' },
        'Mali': { percentage: 95.0, population: '19 million', category: 'majority' },
        'Mauritania': { percentage: 99.9, population: '4.5 million', category: 'majority' },
        'Morocco': { percentage: 99.0, population: '35 million', category: 'majority' },
        'Niger': { percentage: 99.3, population: '23.8 million', category: 'majority' },
        'Nigeria': { percentage: 53.5, population: '107 million', category: 'majority' },
        'Oman': { percentage: 85.9, population: '4.3 million', category: 'majority' },
        'Pakistan': { percentage: 96.5, population: '220 million', category: 'majority' },
        'Palestine': { percentage: 97.5, population: '4.9 million', category: 'majority' },
        'Qatar': { percentage: 67.7, population: '1.9 million', category: 'majority' },
        'Saudi Arabia': { percentage: 93.0, population: '32 million', category: 'majority' },
        'Senegal': { percentage: 96.1, population: '15.5 million', category: 'majority' },
        'Sierra Leone': { percentage: 78.6, population: '6.3 million', category: 'majority' },
        'Somalia': { percentage: 99.8, population: '15.8 million', category: 'majority' },
        'Sudan': { percentage: 97.0, population: '42.5 million', category: 'majority' },
        'Syria': { percentage: 87.0, population: '14.8 million', category: 'majority' },
        'Tajikistan': { percentage: 96.7, population: '9.2 million', category: 'majority' },
        'Tunisia': { percentage: 99.1, population: '11.7 million', category: 'majority' },
        'Turkey': { percentage: 99.8, population: '83.6 million', category: 'majority' },
        'Turkmenistan': { percentage: 93.0, population: '5.6 million', category: 'majority' },
        'United Arab Emirates': { percentage: 76.0, population: '7.5 million', category: 'majority' },
        'Uzbekistan': { percentage: 96.3, population: '32.4 million', category: 'majority' },
        'Yemen': { percentage: 99.2, population: '29.8 million', category: 'majority' },
        
        // Significant Muslim minority (10-50%)
        'Bosnia and Herzegovina': { percentage: 50.7, population: '1.7 million', category: 'significant' },
        'Benin': { percentage: 27.7, population: '3.3 million', category: 'significant' },
        'Bulgaria': { percentage: 10.0, population: '700,000', category: 'significant' },
        'Cameroon': { percentage: 24.0, population: '6 million', category: 'significant' },
        'Central African Republic': { percentage: 15.0, population: '750,000', category: 'significant' },
        'Côte d\'Ivoire (Ivory Coast)': { percentage: 42.9, population: '10.7 million', category: 'significant' },
        'Cyprus': { percentage: 25.3, population: '300,000', category: 'significant' },
        'Ethiopia': { percentage: 33.9, population: '38.4 million', category: 'significant' },
        'Eritrea': { percentage: 36.6, population: '1.2 million', category: 'significant' },
        'Ghana': { percentage: 18.0, population: '5.6 million', category: 'significant' },
        'Guinea-Bissau': { percentage: 45.1, population: '880,000', category: 'significant' },
        'India': { percentage: 14.2, population: '195 million', category: 'significant' },
        'Israel': { percentage: 17.8, population: '1.5 million', category: 'significant' },
        'Kenya': { percentage: 11.2, population: '5.7 million', category: 'significant' },
        'Macedonia': { percentage: 33.3, population: '700,000', category: 'significant' },
        'Malawi': { percentage: 12.8, population: '2.4 million', category: 'significant' },
        'Montenegro': { percentage: 19.1, population: '118,000', category: 'significant' },
        'Mozambique': { percentage: 18.9, population: '5.9 million', category: 'significant' },
        'Russia': { percentage: 10.0, population: '14.5 million', category: 'significant' },
        'Singapore': { percentage: 14.3, population: '840,000', category: 'significant' },
        'Tanzania': { percentage: 35.0, population: '20.3 million', category: 'significant' },
        'Thailand': { percentage: 10.0, population: '7 million', category: 'significant' },
        'Uganda': { percentage: 12.0, population: '5.5 million', category: 'significant' },
        
        // Other countries with notable Muslim populations (<10%)
        'United States': { percentage: 1.1, population: '3.5 million', category: 'notable' },
        'China': { percentage: 2.0, population: '28 million', category: 'notable' },
        'France': { percentage: 8.8, population: '5.7 million', category: 'notable' },
        'Germany': { percentage: 6.1, population: '5 million', category: 'notable' },
        'United Kingdom': { percentage: 6.3, population: '4.2 million', category: 'notable' },
        'Canada': { percentage: 3.2, population: '1.2 million', category: 'notable' }
      };

      // Associate country data with their names - expanded to include all country codes
      const countryNames = {
        // Previous mapping
        4: 'Afghanistan', 8: 'Albania', 12: 'Algeria', 31: 'Azerbaijan', 32: 'Argentina', 36: 'Australia', 
        40: 'Austria', 48: 'Bahrain', 50: 'Bangladesh', 56: 'Belgium', 70: 'Bosnia and Herzegovina', 
        76: 'Brazil', 96: 'Brunei', 100: 'Bulgaria', 104: 'Myanmar', 108: 'Burundi', 
        112: 'Belarus', 116: 'Cambodia', 120: 'Cameroon', 124: 'Canada', 
        140: 'Central African Republic', 144: 'Sri Lanka', 148: 'Chad', 152: 'Chile', 
        156: 'China', 170: 'Colombia', 174: 'Comoros', 178: 'Congo', 180: 'DR Congo', 
        188: 'Costa Rica', 384: 'Côte d\'Ivoire (Ivory Coast)', 191: 'Croatia', 192: 'Cuba', 
        196: 'Cyprus', 203: 'Czech Republic', 208: 'Denmark', 214: 'Dominican Republic', 
        218: 'Ecuador', 818: 'Egypt', 222: 'El Salvador', 226: 'Equatorial Guinea', 
        231: 'Ethiopia', 232: 'Eritrea', 233: 'Estonia', 242: 'Fiji', 246: 'Finland', 
        250: 'France', 266: 'Gabon', 268: 'Georgia', 270: 'Gambia', 276: 'Germany', 
        288: 'Ghana', 300: 'Greece', 320: 'Guatemala', 324: 'Guinea', 328: 'Guyana', 
        332: 'Haiti', 340: 'Honduras', 348: 'Hungary', 352: 'Iceland', 356: 'India', 
        360: 'Indonesia', 364: 'Iran', 368: 'Iraq', 372: 'Ireland', 376: 'Israel', 
        380: 'Italy', 388: 'Jamaica', 392: 'Japan', 400: 'Jordan', 398: 'Kazakhstan', 
        404: 'Kenya', 408: 'North Korea', 410: 'South Korea', 414: 'Kuwait', 417: 'Kyrgyzstan', 
        418: 'Laos', 422: 'Lebanon', 426: 'Lesotho', 428: 'Latvia', 430: 'Liberia', 
        434: 'Libya', 440: 'Lithuania', 442: 'Luxembourg', 450: 'Madagascar', 454: 'Malawi', 
        458: 'Malaysia', 462: 'Maldives', 466: 'Mali', 470: 'Malta', 478: 'Mauritania', 
        480: 'Mauritius', 484: 'Mexico', 498: 'Moldova', 496: 'Mongolia', 499: 'Montenegro', 
        504: 'Morocco', 508: 'Mozambique', 512: 'Oman', 516: 'Namibia', 524: 'Nepal', 
        528: 'Netherlands', 554: 'New Zealand', 558: 'Nicaragua', 562: 'Niger', 566: 'Nigeria', 
        578: 'Norway', 586: 'Pakistan', 591: 'Panama', 598: 'Papua New Guinea', 600: 'Paraguay', 
        604: 'Peru', 608: 'Philippines', 616: 'Poland', 620: 'Portugal', 634: 'Qatar', 
        642: 'Romania', 643: 'Russia', 646: 'Rwanda', 682: 'Saudi Arabia', 686: 'Senegal', 
        688: 'Serbia', 694: 'Sierra Leone', 703: 'Slovakia', 704: 'Vietnam', 705: 'Slovenia', 
        706: 'Somalia', 710: 'South Africa', 724: 'Spain', 729: 'Sudan', 740: 'Suriname', 
        752: 'Sweden', 756: 'Switzerland', 760: 'Syria', 762: 'Tajikistan', 764: 'Thailand', 
        768: 'Togo', 780: 'Trinidad and Tobago', 788: 'Tunisia', 792: 'Turkey', 795: 'Turkmenistan', 
        800: 'Uganda', 804: 'Ukraine', 784: 'United Arab Emirates', 826: 'United Kingdom', 
        834: 'Tanzania', 840: 'United States', 858: 'Uruguay', 860: 'Uzbekistan', 862: 'Venezuela', 
        887: 'Yemen', 894: 'Zambia', 716: 'Zimbabwe'
      };

      // Setup map dimensions
      const width = 1500;
      const height = 800;

      // Clear previous SVG if any
      d3.select(svgRef.current).selectAll("*").remove();

      // Create SVG and set dimensions
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);
        
      // Create a group for map content that will be transformed by zoom
      const g = svg.append('g');

      // Create tooltip
      const tooltip = d3.select(tooltipRef.current)
        .attr('class', styles.tooltip)
        .style('opacity', 0)
        .style('position', 'fixed')
        .style('pointer-events', 'none') // Make tooltip non-interactive
        .style('background-color', 'white')
        .style('border', '1px solid black')
        .style('border-radius', '5px')
        .style('padding', '8px')
        .style('z-index', 1000);

      // Create a projection
      const projection = d3.geoNaturalEarth1()
        .scale(240)
        .translate([width / 2, height / 2]);

      // Create path generator
      const path = d3.geoPath().projection(projection);

      // Setup zoom behavior - store in ref
      const zoomBehavior = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
          // Adjust stroke width based on zoom level to keep it visually consistent
          g.selectAll('path')
            .style('stroke-width', 0.5 / event.transform.k + 'px');
        });
      
      // Apply zoom to SVG
      svg.call(zoomBehavior);
      zoomRef.current = zoomBehavior; // Store in ref instead of state

      // Draw countries
      g.selectAll('path')
        .data(countries)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', d => {
          const countryName = countryNames[d.id];
          if (countryName && muslimData[countryName]) {
            const category = muslimData[countryName].category;
            if (category === 'majority') return '#008000'; // Green
            if (category === 'significant') return '#0066cc'; // Blue
            if (category === 'notable') return '#800080'; // Purple
            return '#ff0000'; // Default gray
          }
          return '#ff0000'; // Light gray for non-Muslim countries (changed from red)
        })
        .style('stroke', '#fff')
        .style('stroke-width', '0.5px')
        .on('mouseover', (event, d) => {
          // Hide any existing tooltips first
          tooltip.transition().duration(0).style('opacity', 0);
          
          // Hover effect
          d3.select(event.currentTarget)
            .style('fill-opacity', 0.8)
            .style('cursor', 'pointer')
            .style('stroke', '#000')
            .style('stroke-width', '1px');
            
          const countryName = countryNames[d.id];
          // Always show a tooltip with available information
          let tooltipContent = '';
          
          if (countryName) {
            if (muslimData[countryName]) {
              const data = muslimData[countryName];
              tooltipContent = `
                <strong>${countryName}</strong><br/>
                Muslim population: ${data.percentage}%<br/>
                Approx. ${data.population}
              `;
            } else {
              tooltipContent = `
                <strong>${countryName}</strong><br/>
                Muslim population: < 1%
              `;
            }
          } else {
            // For unknown countries
            tooltipContent = `<strong>Country data unavailable</strong>`;
          }
          
          tooltip.html(tooltipContent)
            .style('left', (event.clientX + 10) + 'px')
            .style('top', (event.clientY - 28) + 'px')
            .transition()
            .duration(200)
            .style('opacity', 0.9);
        })
        .on('mousemove', (event) => {
          // Update tooltip position on mouse move
          tooltip
            .style('left', (event.clientX + 10) + 'px')
            .style('top', (event.clientY - 28) + 'px');
        })
        .on('mouseout', (event) => {
          // Reset hover effect
          const d = d3.select(event.currentTarget).datum();
          const countryName = countryNames[d.id];
          
          let fillColor = '#ff0000'; // Default light gray for <1%
          if (countryName && muslimData[countryName]) {
            const category = muslimData[countryName].category;
            if (category === 'majority') fillColor = '#008000'; // Green
            if (category === 'significant') fillColor = '#0066cc'; // Blue
            if (category === 'notable') fillColor = '#800080'; // Purple
          }
          
          d3.select(event.currentTarget)
            .style('fill', fillColor)
            .style('fill-opacity', 1)
            .style('stroke', '#fff')
            .style('stroke-width', '0.5px');
            
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });

      // Add legend - Moved to top left with more space for map visibility
      const legend = svg.append('g')
        .attr('transform', 'translate(20, 20)') // Move to very top left
        .style('pointer-events', 'none');

      // Legend entries with updated colors
      const legendData = [
        { color: '#008000', label: 'Muslim Majority (>50%)' },
        { color: '#0066cc', label: 'Significant Muslim Population (10-50%)' },
        { color: '#800080', label: 'Notable Muslim Population (<10%)' },
        { color: '#ff0000', label: 'Less than 1%' },
      ];

      // Legend background - Made more compact
      legend.append('rect')
        .attr('x', -10)
        .attr('y', -10)
        .attr('width', 300)
        .attr('height', 95) // Reduced height
        .style('fill', 'rgba(255, 255, 255, 0.8)') // More transparent
        .style('rx', '5')
        .style('ry', '5')
        .style('stroke', '#333')
        .style('stroke-width', '1px');

      // Legend title
      legend.append('text')
        .attr('x', 0)
        .attr('y', 5) // Adjusted position
        .style('font-weight', 'bold')
        .style('font-size', '14px') // Smaller text
        .text('Muslim Population');

      // Draw legend with inline styles - More compact
      legendData.forEach((item, i) => {
        // Color box
        legend.append('rect')
          .attr('x', 0)
          .attr('y', i * 18 + 10) // Reduced spacing between items
          .attr('width', 12) // Smaller color box
          .attr('height', 12) // Smaller color box
          .style('fill', item.color)
          .style('stroke', '#000')
          .style('stroke-width', '0.5px');

        // Label
        legend.append('text')
          .attr('x', 18) // Adjusted position
          .attr('y', i * 18 + 20) // Reduced spacing between items
          .style('font-size', '12px') // Smaller text
          .text(item.label);
      });
      
      // Add reset view button - Small text link at the bottom
      svg.append('text')
        .attr('x', 20)
        .attr('y', height - 20)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .style('fill', 'white')
        .style('cursor', 'pointer')
        .text('Reset View')
        .on('click', () => {
          if (zoomRef.current) {
            svg.transition().duration(300).call(zoomRef.current.transform, d3.zoomIdentity);
          }
        });
    };

    fetchData();

    // Cleanup
    return () => {
      if (zoomRef.current) {
        d3.select(svgRef.current).on('.zoom', null);
      }
    };
  }, []);

  return (
    <div className={styles.DemographicsContainer} ref={containerRef}>
      <h2 className={styles.title}>Global Muslim Population Distribution</h2>
      <div className={styles.mapContainer}>
        <svg ref={svgRef} className={styles.mapSvg}></svg>
        <div ref={tooltipRef}></div>
      </div>
      <div className={styles.instructions}>
        Use mouse wheel to zoom in/out. Click and drag to pan. Click "Reset View" in the bottom left to return to the starting view.
      </div>
    </div>
  );
};

export default IslamDemographics;