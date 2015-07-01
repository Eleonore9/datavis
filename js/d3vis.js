var body = d3.select("body");
var graphics = body.append("svg").attr("width", 900).attr("height", 900);

var rectangles = graphics.append("g");
var circles = graphics.append("g");

rectangles.attr("transform", "translate(100, 100)");
circles.attr("transform", "translate(100, 500)");

var barwidth = 50;
var fake_data = [30, 70, 60, 45, 86];
var fill = ["#4E8BBA", "#73B7B7", "#8F73B7", "#E09A55", "#66AF6C"]

var x = 140;
var y = 100;


for(var i = 0; i < fake_data.length; i++){
    rectangles.append("rect")
        .attr("x", i * barwidth)
        .attr("y", y - fake_data[i])
        .attr("height", fake_data[i])
        .attr("width", barwidth)
        .attr("stroke", "grey")
        .attr("fill", fill[i]);
    rectangles.append("text")
        .text(fake_data[i])
        .attr("x", i * barwidth + 15)
        .attr("y", y - fake_data[i] - 15);

}

for(var i = 0; i < fake_data.length; i++){
    circles.append("circle")
        .attr("r", fake_data[i])
        .attr("cx", i * 120)
        .attr("cy", y - fake_data[i] - 120)
        .attr("stroke", "grey")
        .attr("stroke-width", "1px")
        .attr("opacity", "0.7")
        .attr("fill", fill[i]);
    circles.append("text")
        .text(fake_data[i])
        .attr("x", i * 117);
}


