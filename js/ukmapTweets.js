var width = 1000;
var height = 900;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

var mapProjection = d3.geo.albers()
    .center([2, 56])
    .rotate([0, 0, 0])
    .scale([4000]);

d3.json("data/europe.json", loadData);

function loadData(error, dataset) {
	if (error) {
		console.log(error);
	}
	else {
		//console.log(dataset)
		drawData(dataset);
	}
}

var zoomed = false;
function zoom(region) {
    var z = 3;
    console.log("Clicked on ", region.properties.name);
    var x, y;
    if(!zoomed) {
        var mouse = d3.mouse(this);
        x = mouse[0];
        y = mouse[1];
        z = 3;
        zoomed = true;
    } else {
        x = width / 2;
        y = height / 2;
        z =1;
        zoomed = false;
    }
    graphics.attr("transform",
    "translate(" + width / 4 + "," + height / 4 + ")" +
    "scale(" + z + ")" +
    "translate(" + -width / 4 + "," + -height / 4 + ")");
}

function drawData(dataset) {
    var subunits = topojson.feature(dataset, dataset.objects.subunits)
        .features;

    var ukSubunits = subunits.filter(function(subunit) {
        return subunit.properties.part_of == "GBR";
    });

    var path = d3.geo.path()
        .projection(mapProjection);

    var color = d3.scale.ordinal()
        .domain(["ENG", "SCT", "WLS", "NIR"])
        .range(["#dcd", "#ddc", "#cdd", "#cdc"]);

    graphics.selectAll("path")
        .data(ukSubunits)
        .enter()
        .append("path")
        .attr("d", path)
        //.attr("transform", "translate(80, 10)")
        .style("fill", function(subunit){
            return color(subunit.id);
        });

    graphics.selectAll("path")
        .on("click", zoom);

}

function loadUserData(error, dataset){
    if (error) {
        console.log(error);
    } else {
        console.log(dataset);
        drawUserData(dataset);
    }
}
function mapUser(user){
    return "translate(" + mapProjection(user.geo) + ")";
}

function getLatitude(usertweet) {
    var lat = usertweet.geo.coordinates[1];
    return lat
}
function getLongitude(tweet) {
    var long = tweet.geo.coordinates[0];
    return long
}

function getCoord(dataset) {
    for(var i = 0; i < dataset.nodes.length; i++) {
        var user = dataset.nodes[i];
        var coordinates = [d3.mean(user.tweets, getLatitude),
        d3.mean(user.tweets, getLongitude)];
        user.geo = coordinates;
    }
}

function drawUserData(dataset) {
    getCoord(dataset);
    graphics.selectAll(".tweet")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("class", "tweet")
        .attr("r", 2.5)
        .style("fill", "#800014")
        .attr("transform", mapUser);
    graphics.selectAll(".link")
        .data(dataset.links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "#A38989")
        .attr("opacity", "0.3")
        .attr("x1", function(link) {
            return mapProjection(dataset.nodes[link.source].geo)[0];
        })
        .attr("y1", function(link) {
            return mapProjection(dataset.nodes[link.source].geo)[1];
        })
        .attr("x2", function(link) {
            return mapProjection(dataset.nodes[link.target].geo)[0];
        })
        .attr("y2", function(link) {
            return mapProjection(dataset.nodes[link.target].geo)[1];
        });
}
d3.json("data/usersGraph.json", loadUserData);