window.addEventListener("resize", function () {
    var canvas = document.getElementById("litegraph-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

var canvas = document.getElementById("litegraph-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var graph = new LGraph();
var liteGraphCanvas = new LGraphCanvas("#litegraph-canvas", graph);
