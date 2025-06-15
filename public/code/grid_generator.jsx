// === CONFIGURABLE SETTINGS ===
var artboardWidth = 24 * 72; // inches to points
var artboardHeight = 12 * 72;
var centerX = artboardWidth * 0.25; // Left side (25%)
var centerY = artboardHeight / 2;

var ringCount = 4;
var baseSegments = 2;
var ringSpacing = 72;
var dotRadius = 4; // radius of the small circles

// === SCRIPT ===
var doc = app.activeDocument;
var layer = doc.activeLayer;

var segments = baseSegments;
for (var ring = 1; ring <= ringCount; ring++) {
    segments *= 2;
    var radius = ring * ringSpacing;

    // Draw circle
    var circle = layer.pathItems.ellipse(centerY + radius, centerX - radius, radius * 2, radius * 2);
    circle.stroked = true;
    circle.filled = false;

    var innerRadius = (ring - 1) * ringSpacing;
    var outerRadius = ring * ringSpacing;

    for (var i = 0; i < segments; i++) {
        var angle = (360 / segments) * i;
        var radians = angle * Math.PI / 180;

        var startX = Math.round((centerX + innerRadius * Math.cos(radians)) * 1000) / 1000;
        var startY = Math.round((centerY + innerRadius * Math.sin(radians)) * 1000) / 1000;

        var endX = Math.round((centerX + (outerRadius + 0.5) * Math.cos(radians)) * 1000) / 1000;
        var endY = Math.round((centerY + (outerRadius + 0.5) * Math.sin(radians)) * 1000) / 1000;

        // var line = layer.pathItems.add();
        // line.setEntirePath([[startX, startY], [endX, endY]]);
        // line.stroked = true;
        // line.filled = false;

        // === Draw Dot at top-left corner of wedge ===
        var nextAngle = (360 / segments) * (i + 1);
        var midAngle = (angle + nextAngle) / 2;
        var midRadians = midAngle * Math.PI / 180;
        var dotDist = innerRadius + (ringSpacing * 0.25); // near the top-left edge of wedge

        var dotX = centerX + dotDist * Math.cos(midRadians);
        var dotY = centerY + dotDist * Math.sin(midRadians);

        var dot = layer.pathItems.ellipse(dotY + dotRadius, dotX - dotRadius, dotRadius * 2, dotRadius * 2);
        dot.stroked = false;
        dot.filled = true;
        dot.fillColor = makeGray(0); // black dot
    }
}

// === Helper ===
function makeGray(value) {
    var gray = new GrayColor();
    gray.gray = value; // 0 = black, 100 = white
    return gray;
}
