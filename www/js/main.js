var app = {
	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},
	showLogin: function(){
		this.showAlert('Login View Button Triggered','Info');
	},
	showDashboard: function(){
		$('.dynamic-body').html(this.dashboardTpl());
	},
	showSetting: function(){
		$('.dynamic-body').html(this.settingTpl());
	},
	renderHomeView: function() {
		$('.dynamic-body').html(this.loginTpl());
	},
    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
		var self = this;
		this.store = new MemoryStore(function(){
			self.renderHomeView();
		});
        this.loginTpl = Handlebars.compile($("#login-tpl").html());
        this.dashboardTpl = Handlebars.compile($("#dashboard-tpl").html());
        this.settingTpl = Handlebars.compile($("#setting-tpl").html());
		$('#show-dashboard').on('click', $.proxy(this.showDashboard, this));
		$('#show-setting').on('click', $.proxy(this.showSetting, this));
		$('#show-login').on('click', $.proxy(this.renderHomeView, this));
		//$('.search-key').on('keyup', $.proxy(this.findByName, this));
        //$('.login-view-btn').on('click', $.proxy(this.showLogin, this));
    }

};

app.initialize();