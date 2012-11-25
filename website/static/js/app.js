define('app', ['jquery', 'underscore', 'Backbone', 'Mustache'], function($, _, Backbone, Mustache) {
  
  	/** Define all libraries we go to use along the frontend.
        That's means, jQuery, Underscore and Backbone. **/

    var BaseView = Backbone.View.extend({

	    	initialize: function (options) {
	    		this.el = options.el;
	    		this.$el = $(this.el);

	    		_.bindAll(this, 'render', 'render_element');

	    		this.template = options.template;
	    		this.parent = options.parent;

	    		this.collection = new Backbone.Collection();
	    		this.collection.url = function () { 
	    			return options.url; 
	    		};

	    		var self = this;
	    		this.collection.fetch({ success: function () { self.render(); } });
	    	},

	    	render: function () {
	    		var self = this;
	    		this.collection.each(function (model) {
    				self.$el.each( function (i, view) {
    					$(view).append(self.render_element(model));
    				});
	    		});

	    		this.trigger('rendered');
	    	},

	    	render_element: function (model) {
	    		return Mustache.render(this.template, model.toJSON());
	    	}
    	}),

    	appView = Backbone.View.extend({

    		exp_template: '<li>' +
    			'<label>{{ date_begin }} - {{ date_end }}</label>' +
	    		'<p class="highlight">{{ company }}</p><p>{{ position }}</p>' +
	    		'<p class="description">{{ description }}</p>' +
	    		'</li>',
	    	skills_template: '<div>' +
	    		'<h3>{{ name }}</h3>' +
	    		'<ul>{{#list}}<li><p class="label">{{ name }}</p>' +
	    		'<p class="blocks {{ value }}"></p>' +
	    		'<p class="value">{{ value }}</p></li>{{/list}}</ul>' +
	    		'</div>',
	    	social_networks_template: '<li class="{{ social_name }}">' +
	    		'<a href="{{ url_base }}{{ username }}" target="_blank">' +
	    		'<span class="icon-{{ social_name }}"></span></a>' +
	    		'</li>',

	  		initialize: function (options) {

	  			this.el = options.el;
	  			this.$el = $(this.el);

	  			this.experience = new BaseView({
	  				el: this.$el.find('ul.experience'),
	  				parent: this,
	  				url: '/experience',
	  				template: this.exp_template
	  			});

	  			this.social_networks = new BaseView({
	  				el: this.$el.find('ul.social-networks'),
	  				parent: this,
	  				url: '/social_networks',
	  				template: this.social_networks_template

	  				/* TODO: behaviour */
	  			});

	  			this.skills = new BaseView({
	  				el: this.$el.find('div.skills'),
	  				parent: this,
	  				url: '/skills',
	  				template: this.skills_template

	  				/* TODO: behaviour */
	  			});
	  		}
  		}),

		app = new appView({ 
			el: $('html'),
		});
});