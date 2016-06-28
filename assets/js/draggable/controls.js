var BOLDGRID = BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};

( function ( $ ) {

	BOLDGRID.EDITOR.Controls = {
		$panel : null,
		$menu : null,
		controls : [],
		$container : null,
		init: function ( $container ) {
			this.$container = $container;

			this.$container.find( 'body' ).css( 'marginTop', '50px' );

			// Init Menu.
			this.$menu = BOLDGRID.EDITOR.Menu.init();

			// Init Panel.
			this.$panel = BOLDGRID.EDITOR.Panel.init();

			this.bindEvents();

			//Create all controls.
			this.setupControls();
		},

		/**
		 * Add a control to the list of controls to be created.
		 */
		registerControl : function ( control ) {
			this.controls.push( control );
		},


		bindEvents : function () {
			this.onEditibleClick();
		},

		onEditibleClick : function () {
			var self = this;
			//TODO this could go into another file.
			this.$container.on( 'click', function ( e ) {
				if ( ! e.boldgrid || ! e.boldgrid.menuItem ) {
					//self.$menu.hide();
				}
			} );

			this.$container.on( 'mouseup', function ( e ) {
				self.$menu.items = [];
			} );

			this.$container.on( 'click', function ( e ) {
				self.$menu.find( 'li' ).hide();

				if ( ! self.$menu.items.length ) {
					self.$menu.hide();
				} else {
					self.$menu.show();
				}

				$.each( self.$menu.items, function () {
					self.$menu.find( '[data-action="menu-' + this + '"]').show();
				} );
			} );
		},

		/**
		 * Setup Controls.
		 */
		setupControls : function () {
			var self = this;
			// Bind each menu control.
			$.each( this.controls, function () {
				self.setupControl( this );
			} );
		},

		setupControl : function ( control ) {
			this.bindControlHandler( control );
			BOLDGRID.EDITOR.Menu.createListItem( control );
		},

		bindControlHandler : function ( control ) {
			var self = this;

			// When the user clicks on an element that has an associated control.
			// Add that control to the list of controls to be made visible.
			this.$container.on( 'click', control.selectors.join(), function ( e ) {
				var $this = $( this );
				self.$menu.targetData = self.$menu.targetData || {};
				self.$menu.targetData[ control.name ] = $this;
				self.$menu.items.push( control.name );
			} );

			// When the user clicks on a menu item, perform the corresponding action.
			this.$menu.on( 'click', '[data-action="menu-' + control.name + '"]', control.onMenuClick );
		}

	};

} )( jQuery )