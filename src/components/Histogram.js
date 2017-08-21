var React = require('react');
var d3 = require('d3');
var ReactDOM = require('react-dom');


var Histogram = React.createClass({
    getDefaultProps: function() {
        return {
            width: 370,
            height: 110,
            margin: {top: 10, right: 30, bottom: 0, left: 3},
            buckets: 10
        };
    },

    componentDidMount: function() {
        this.createChart();
    },

    componentDidUpdate: function() {
        console.log('adaptas')
        //if (this.props.data.length) this.updateChart();
    },

    render: function(){
        return (
          <div id="viz" className={this.props.data.length ? '' : 'hidden'}>
            <svg ref="svg"/>
          </div>
        );
    },

    createChart: function() {
        var w = this.props.width,
            h = this.props.height,
            m = this.props.margin;

        this.chart_width = w - m.left - m.right;
        this.chart_height = h - m.top - m.bottom;

        this._setXscale();
        this._binData();
        this._setYscale();

        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("bottom");

        var svg = d3.select(this.refs.svg)
            .attr("class", "histogram")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + m.left + "," + m.top + ")");

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + this.chart_height + ")")
        //     .call(this.xAxis);

        var self = this;

        svg.selectAll(".bar")
            .data(self.data_binned)
            .enter().append("rect")
            .attr("class", "bar")
            .style("background-color", "red")
            .style("margin-top", "0px")
            .attr('x', function(d) { return self.x(d.x); })
            .attr('y', function(d) { return self.y(d.y); })
            .attr("width", self.x(self.data_binned[0].dx) + 1)
            .attr("height", function(d) {
                return self.chart_height - self.y(d.y);
            });
    },

    updateChart: function() {
        this._setXscale();
        this._binData();
        this._setYscale();

        d3.select('.x.axis')
            .transition().duration(300)
            .call(this.xAxis.scale(this.x));

        var g = d3.select(React.findDOMNode(this.refs.svg))
            .select('g');

        var bars = g.selectAll('.bar')
            .data(this.data_binned);

        bars.exit()
            .transition().duration(300)
            .style('fill-opacity', 1e-6)
            .remove();

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", this.y(0))
            .attr("height", this.chart_height - this.y(0));

        var self = this;

        bars.transition().duration(300)
            .attr("x", function(d) { return self.x(d.x); })
            .attr("y", function(d) { return self.y(d.y); })
            .attr("width", self.x(self.data_binned[0].dx) - 1)
            .attr("height", function(d) {
              return self.chart_height - self.y(d.y);
            });
    },

    _binData: function() {
        this.data_binned = d3.layout.histogram()
            .bins(this.x.ticks(this.props.buckets))
            (this.props.data);
    },

    _setXscale: function() {
        this.x = d3.scale.linear()
            .domain([0, Number(d3.max(this.props.data)) + 1])
            .range([0, this.chart_width]);
    },

    _setYscale: function() {
        this.y = d3.scale.linear()
            .domain([0, d3.max(this.data_binned, function(d) { return d.y; })])
            .range([this.chart_height, 0]);
    }
});


module.exports = Histogram;
