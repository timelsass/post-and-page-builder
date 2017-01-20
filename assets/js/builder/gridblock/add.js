var BOLDGRID = BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};
BOLDGRID.EDITOR.GRIDBLOCK = BOLDGRID.EDITOR.GRIDBLOCK || {};

/**
 * Handles adding gridblocks.
 */
( function( $ ) {
	'use strict';

	var BG = BOLDGRID.EDITOR,
		self = {

		$window: $( window ),

		init: function() {
			self.setupInsertClick();
		},

		/**
		 * Bind listener for the gridblock button add.
		 *
		 * @since 1.4
		 */
		setupInsertClick: function() {
			$( '.boldgrid-zoomout-section' ).on( 'click', '.add-gridblock', self.onGridblockClick );
		},

		/**
		 * Upon clicking the griblock add button, insert placeholder and replace the placeholder with a gridblock.
		 *
		 * @since 1.4
		 */
		onGridblockClick: function() {
			var $placeHolder,
				$this = $( this ),
				gridblockId = $this.closest( '.gridblock' ).attr( 'data-id' );

			$placeHolder = self.insertPlaceHolder( gridblockId );

			self.replaceGridblock( $placeHolder, gridblockId );
		},

		/**
		 * Replace a placeholder gridblcok with a gridblock from config.
		 *
		 * @since 1.4
		 *
		 * @param  {jQuery} $placeHolder Element created to show loading graphic.
		 * @param  {integer} gridblockId  Index from gridblocks config.
		 */
		replaceGridblock: function( $placeHolder, gridblockId ) {
			var selectedHtml = BG.GRIDBLOCK.Create.getHtml( gridblockId );

			// Insert into page aciton.
			if ( 'string' !== typeof selectedHtml ) {
				selectedHtml.always( function( html ) {

					//Ignore history until always returns.
					self.sendGridblock( html, $placeHolder );
				} );
			} else {
				self.sendGridblock( selectedHtml, $placeHolder );
			}
		},

		/**
		 * Add a placeholder to the top of the page.
		 *
		 * @since 1.4
		 *
		 * @param  {integer} gridblockId Index from gridblocks config.
		 * @return {jQuery}              Element created to show loading graphic.
		 */
		insertPlaceHolder: function( gridblockId ) {
			var $placeHolder = BG.GRIDBLOCK.configs.gridblocks[ gridblockId ].getPreviewPlaceHolder();
			IMHWPB.WP_MCE_Draggable.draggable_instance.$body.prepend( $placeHolder );
			return $placeHolder;
		},

		/**
		 * Send Gridblock to the view
		 *
		 * @since 1.4
		 *
		 * @param  {string} html         Html to insert.
		 * @param  {jQuery} $placeHolder Element created to show loading graphic.
		 */
		sendGridblock: function( html, $placeHolder ) {
			var $inserting = $( html ),
				draggable = IMHWPB.WP_MCE_Draggable.draggable_instance;

			if ( ! $inserting || ! draggable ) {
				send_to_editor( $inserting[0].outerHTML );
			}

			// If current selection is inside of a row, insert above that row. Insert at top of row.
			$placeHolder.replaceWith( $inserting );
			draggable.validate_markup();

			tinymce.activeEditor.fire( 'setContent' );
			tinymce.activeEditor.focus();

			setTimeout( function() {
				BG.CONTROLS.Add.scrollToElement( $inserting, 0 );
			} );
			self.$window.trigger( 'resize' );
		}

	};

	BG.GRIDBLOCK.Add = self;
	$( BG.GRIDBLOCK.Add.init );

} )( jQuery );