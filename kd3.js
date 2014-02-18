/**
 * Created by shelbysturgis on 2/13/14.
 */

var kd3 = window.kd3 || {};

kd3.version = '0.1.0';

window.kd3 = kd3;

kd3.namespace = function (ns_string) {
  "use strict";

  var parts = ns_string.split('.'),
      parent = kd3,
      i;

  // strip redundant leading global
  if (parts[0] === "kd3") {
    parts = parts.slice(1);
  }

  for (i = 0; i < parts.length; i += 1) {
    // create a property if it doesn't exist
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
};
kd3.area = function () {
  "use strict";

  var margin = {top: 20, right: 20, bottom: 20, left: 50},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      interpolate = "linear",
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),
      area = d3.svg.area().x(X).y1(Y),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      xScale
        .domain(d3.extent(data, function(d) { return d[0]; }))
        .range([0, width - margin.left - margin.right]);

      yScale
        .domain([0, d3.max(data, function(d) { return d[1]; })])
        .range([height - margin.top - margin.bottom, 0]);

      area.interpolate(interpolate);
      line.interpolate(interpolate);

      var svg = d3.select(this).selectAll("svg").data([data]);

      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "area");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      svg.attr("width", width)
        .attr("height", height);

      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      g.select(".area")
        .attr("d", area)
        .attr("d", area.y0(yScale.range()[0]));

      g.select(".line")
        .attr("d", line);

      g.select(".x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);

      g.select(".y.axis")
        .call(yAxis);

    });
  }

  function X(d) {
    return xScale(d[0]);
  }

  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) { return margin; }
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) { return width; }
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) { return height; }
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) { return xValue; }
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) { return yValue; }
    yValue = _;
    return chart;
  };

  chart.interpolate = function(_) {
    if (!arguments.length) { return interpolate; }
    interpolate = _;
    return chart;
  };

  return chart;
};
kd3.dendrogram = function () {
  "use strict";

  var width = ,
      height = ,
      color = d3.scale.category20(),
      cluster = d3.layour.cluster().size([height, width - 200]),
      diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; }),
      nodes, links, link, node;

  function chart(selection) {
    selection.each(function(data) {
      var svg = d3.select(this).append("svg").data(data);

      svg.attr("width", width)
        .attr("height", height);

      var g = svg.append("g")
        .attr("transform", "translate(120,0)");

      var nodes = cluster.nodes(data),
          links = cluster.links(nodes);

      svg.selectAll(".node")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

      var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + d.y + ", " + d.x + ")";
        });

      node.append("circle"0)
    });
  }

  svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(120,0)");

  nodes = cluster.nodes(root);
  links = cluster.links(nodes);

  link = svg.selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

  node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  node.append("circle")
    .attr("r", 4.5) // why 4.5?
    .style("fill", function (d, i) {
      return d.children ? "#ffffff" : color(i); // come back to this
    })
    .style("stroke", function (d, i) {
      return d.children ? "#4682B4" : color(i); // come back to this
    });

  node.append("text")
    .attr("dx", function (d) { return d.children ? -8 : 8; })
    .attr("dy", 3)
    .style("text-anchor", function (d) { return d.children ? "end" : "strict"; })
    .text(function (d) { return d.children ? d.key : d.key + ": " + d.doc_count; }); // needs to be generic here

  d3.select(self.frameElement).style("height", height + "px");

  return svg;
};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.heatmap = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.histogram = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.horizon = function (args) {
  "use strict";

};
kd3.line = function () {
  "use strict";

  var margin = {top: 20, right: 20, bottom: 20, left: 50},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      interpolate = "linear",
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      xScale
        .domain(d3.extent(data, function(d) { return d[0]; }))
        .range([0, width - margin.left - margin.right]);

      yScale
        .domain([0, d3.max(data, function(d) { return d[1]; })])
        .range([height - margin.top - margin.bottom, 0]);

      line.interpolate(interpolate);

      var svg = d3.select(this).selectAll("svg").data([data]);

      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      svg.attr("width", width)
        .attr("height", height);

      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      g.select(".line")
        .attr("d", line);

      g.select(".x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis);

      g.select(".y.axis")
        .call(yAxis);

    });
  }

  function X(d) {
    return xScale(d[0]);
  }

  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) { return margin; }
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) { return width; }
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) { return height; }
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) { return xValue; }
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) { return yValue; }
    yValue = _;
    return chart;
  };

  chart.interpolate = function (_) {
    if (!arguments.length) { return interpolate; }
    interpolate = _;
    return chart;
  };

  return chart;
};
/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.map = function (args) {
  "use strict";

};
kd3.pie = function () {
  "use strict";

  var width = 500,
    height = 500,
    radius = Math.min(width, height)/ 2,
    sort = null,
    label = function(d) { return d[0]; },
    value = function(d) { return d[1]; }, // ?
    outerRadius = 60,
    innerRadius = 120,
    color = d3.scale.category10(),
    arc = d3.svg.arc(),
    pie = d3.layout.pie();

  function chart(selection) {
    selection.each(function(data) {

      data = data.map(function(d, i) {
        return [label.call(data, d, i), value.call(data, d, i)];
      });

      arc
        .outerRadius(radius - outerRadius)
        .innerRadius(innerRadius);

      pie
        .sort(sort)
        .value(function(d) { return d[1]; });

      var svg = d3.select(this).append("svg");

      svg
        .attr("width", width)
        .attr("height", height);

      var gEnter = svg.append("g")
        .attr("transform", "translate(" + width/2 + ", " + height/2 + ")");

      var g = gEnter.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
          return color(d.data[0]);
        });

      g.append("text")
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .text(function(d) { console.log(d); return d.data[0]; });
    });
  }

  chart.width = function(_) {
    if (!arguments.length) { return width; }
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) { return height; }
    height = _;
    return chart;
  };

  chart.radius = function(_) {
    if (!arguments.length) { return radius; }
    radius = _;
    return chart;
  };

  chart.sort = function(_) {
    if (!arguments.length) { return sort; }
    sort = _;
    return chart;
  };

  chart.label = function(_) {
    if (!arguments.length) { return label; }
    label = _;
    return chart;
  };

  chart.value = function(_) {
    if (!arguments.length) { return value; }
    value = _;
    return chart;
  };

  chart.outerRadius = function(_) {
    if (!arguments.length) { return outerRadius; }
    outerRadius = _;
    return chart;
  };

  chart.innerRadius = function(_) {
    if (!arguments.length) { return innerRadius; }
    innerRadius = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) { return color; }
    color = _;
    return chart;
  };

  return chart;
};
/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.scatterplot = function (args) {
  "use strict";

};
 kd3.sparkline = function () {
  "use strict";

  var margin = {top: 20, right: 20, bottom: 20, left: 50},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      interpolate = "linear",
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      xScale
        .domain(d3.extent(data, function(d) { return d[0]; }))
        .range([0, width - margin.left - margin.right]);

      yScale
        .domain([0, d3.max(data, function(d) { return d[1]; })])
        .range([height - margin.top - margin.bottom, 0]);

      line.interpolate(interpolate);

      var svg = d3.select(this).selectAll("svg").data([data]);

      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "sparkline");

      svg.attr("width", width)
        .attr("height", height);

      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      g.select(".line")
        .attr("d", line);
    });
  }

  function X(d) {
    return xScale(d[0]);
  }

  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) { return margin; }
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) { return width; }
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) { return height; }
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) { return xValue; }
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) { return yValue; }
    yValue = _;
    return chart;
  };

  chart.interpolate = function (_) {
    if (!arguments.length) { return interpolate; }
    interpolate = _;
    return chart;
  };

  return chart;
};
/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.spiderChart = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */

kd3.sunburst = function (args) {
  "use strict";

};/**
 * Created by shelbysturgis on 2/13/14.
 */
/**
 *
 * Created by shelbysturgis on 2/13/14.
 */

kd3.treemap = function (args) {
  "use strict";

};
