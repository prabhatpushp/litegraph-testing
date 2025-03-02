function MyCustomNode() {
    this.addInput("x", "number");
    this.addInput("y", "number");
    this.addOutput("o1", "number");
    this.addOutput("o2", "number");
    this.properties = { x: 1.0, y: 1.0, formula: "x+y" };
    this.code_widget = this.addWidget("text", "F(x,y)", this.properties.formula, function (v, canvas, node) {
        node.properties.formula = v;
    });
    this.addWidget("toggle", "allow", LiteGraph.allow_scripts, function (v) {
        LiteGraph.allow_scripts = v;
    });
    this._func = null;
}

MyCustomNode.title = "Formula";
MyCustomNode.desc = "Compute formula";
MyCustomNode.size = [160, 100];

MyCustomNode.prototype.onExecute = function () {
    if (!LiteGraph.allow_scripts) {
        return;
    }

    var x = this.getInputData(0);
    var y = this.getInputData(1);
    if (x != null) {
        this.properties["x"] = x;
    } else {
        x = this.properties["x"];
    }

    if (y != null) {
        this.properties["y"] = y;
    } else {
        y = this.properties["y"];
    }

    var f = this.properties["formula"];

    var value;
    try {
        if (!this._func || this._func_code != this.properties.formula) {
            this._func = new Function("x", "y", "TIME", "return " + this.properties.formula);
            this._func_code = this.properties.formula;
        }
        value = this._func(x, y, this.graph.globaltime);
        this.boxcolor = null;
    } catch (err) {
        this.boxcolor = "red";
    }
    this.setOutputData(0, value);
};

MyCustomNode.prototype.getTitle = function () {
    return this._func_code || "Formula";
};

MyCustomNode.prototype.onDrawBackground = function () {
    var f = this.properties["formula"];
    if (this.outputs && this.outputs.length) {
        this.outputs[0].label = f;
    }
};

LiteGraph.registerNodeType("custom/math", MyCustomNode);
