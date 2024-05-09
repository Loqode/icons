window.function = async function(name, style, color, bgcolor, scale) {
  // Get values or set defaults
  name = name.value || "image"; // Default icon name if none provided (without style suffix)
  style = style.value || "regular"; // Default style if none provided
  color = color.value || "black"; // Default icon color if none provided
  bgcolor = bgcolor.value || "white"; // Default background color if none provided
  scale = scale.value || "64%"; // Default scale as 64% if none provided

  // Determine the file name based on the style
  let filename = style === "regular" ? name : `${name}-${style}`;

  // Construct the URL to the SVG file
  let svgUrl = `https://loqode.github.io/icons/assets/${style}/${filename}.svg`;

  try {
    // Fetch the SVG file from the URL
    const response = await fetch(svgUrl);
    let svgContent = await response.text();

    // Modify SVG content: set fill color, background color, and scale
    svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
    svgContent = svgContent.replace('<svg ', `<svg style="background-color:${bgcolor}; transform: scale(${scale}); transform-origin: center;" `);

    // Encode the modified SVG to a Data URL
    let svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
    return svgDataUrl;
  } catch (error) {
    console.error('Failed to fetch or process the SVG:', error);
    return ""; // Return empty on error
  }
}
