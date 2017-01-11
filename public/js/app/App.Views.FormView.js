;(function() {	
	"use strict";
	owid.namespace("App.Views.FormView");
	
	var	AvailableEntitiesCollection = App.Collections.AvailableEntitiesCollection,
		SearchDataCollection = App.Collections.SearchDataCollection,
		BasicTabView = App.Views.Form.BasicTabView,
		DataTabView = App.Views.Form.DataTabView,
		AxisTabView = App.Views.Form.AxisTabView,
		StylingTabView = App.Views.Form.StylingTabView,
		ExportTabView = App.Views.Form.ExportTabView,
		MapTabView = App.Views.Form.MapTabView,
		SaveButtonsView = App.Views.Form.SaveButtons;

	App.Views.FormView = owid.View.extend({
		el: "#form-view",
		events: {
			"click .form-collapse-btn": "onFormCollapse",
		},

		initialize: function() {
			this.dispatcher = _.clone(Backbone.Events);
			
			var formConfig = App.ChartModel.get("form-config");

			//create related models, either empty (when creating new chart), or prefilled from db (when editing existing chart)
			if (formConfig && formConfig["entities-collection"]) {
				App.AvailableEntitiesCollection = new AvailableEntitiesCollection(formConfig["entities-collection"]);
			} else {
				App.AvailableEntitiesCollection = new AvailableEntitiesCollection();
			}

			//create search collection
			App.SearchDataCollection = new SearchDataCollection();
			
			this.render();
		},

		render: function() {
			//create subviews
			this.basicTabView = this.addChild(BasicTabView, { dispatcher: this.dispatcher });
			this.dataTabView = this.addChild(DataTabView, { dispatcher: this.dispatcher });
			this.axisTabView = this.addChild(AxisTabView, { dispatcher: this.dispatcher });
			this.stylingTabView = this.addChild(StylingTabView, { dispatcher: this.dispatcher });
			this.exportTabView = this.addChild(ExportTabView, { dispatcher: this.dispatcher });
			this.mapTabView = this.addChild(MapTabView, { dispatcher: this.dispatcher });
			this.saveButtons = this.addChild(SaveButtonsView, { dispatcher: this.dispatcher });

			if (chart.model.get('chart-type') == App.ChartType.ScatterPlot)
	            this.scatterConfig = owid.config.scatter(chart).update({ formNode: d3.select('#form-view').node() });
	       	else if (this.scatterConfig)
	       		this.scatterConfig.clean();

			$('.nav-tabs').stickyTabs();
		},

		onFormCollapse: function(ev) {
			ev.preventDefault();
			var $parent = this.$el.parent();
			$parent.toggleClass("form-panel-collapsed");			
			//trigger re-rendering of chart
			App.ChartModel.trigger( "change" );
			//also triger custom event so that map can resize
			App.ChartModel.trigger( "resize" );
		},
	});
})();