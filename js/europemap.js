/**
 * Created by eleonore on 23/05/15.
 */
var width = 500;
var height = 400;

var graphics = d3.select(".map-europe")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


var color = d3.scale.ordinal()
    .range(["#4E8BBA", "#73B7B7", "#8F73B7", "#7D5D87", "#66AF6C",
        "#2171b5", "#08519c", "#559B7D"]);

d3.json("data/europe.json", loadData);

function loadData(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        //console.log(dataset)
        drawData(dataset);
    }
};

function drawData(dataset) {
    var countries = topojson.feature(dataset,
        dataset.objects.countries).features;

    var mapProjection = d3.geo.albers()
        .center([25, 54])
        .rotate([0, 0]);

    var geoPath = d3.geo.path()
        .projection(mapProjection);

    graphics.selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        .attr("d", geoPath)
        .attr("transform", "translate(100, 50)")
        .style("fill", function(country){
            return color(country.id);
        });
}
