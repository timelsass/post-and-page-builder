<div class="zoom-navbar zoom-navbar-top">
	<div class="history-controls">
		<button class='undo-link' type="button"><i class="mce-ico mce-i-undo"></i></button>
		<button class='redo-link' type="button"><i class="mce-ico mce-i-redo"></i></button>
	</div>
	<div class="bg-zoom-controls">
		<a class="exit-row-dragging">Exit GridBlock Dragging</a>
	</div>
	<div class="loading-remote">
		<div class="enabled bg-editor-loading absolute"></div>
		<span>Loading GridBlocks</span>
	</div>
	<div class="bg-close-zoom-view"></div>
</div>
<div class="boldgrid-zoomout-section zoom-gridblocks-section">
	<div class="gridblocks">
	</div>
</div>

<script type="text/html" id="tmpl-boldgrid-editor-gridblock">
<div class="gridblock" data-id="{{data.id}}" data-styles="0" data-gridblock="0">
	<i class="fa fa-arrows" aria-hidden="true"></i>
	<div class='gridblock-html'>{{{data.html}}}</div>
	<div class="add-gridblock"></div>
</div>
</script>

<script type="text/html" id="tmpl-boldgrid-editor-gridblock-loading">
	<div class="loading-gridblock">
		<div>Installing Gridblock</div>
		<div class="enabled bg-editor-loading absolute"></div></div>
</script>

<script type="text/html" id="tmpl-gridblock-iframe-styles">
<style>
body, html {
	margin: 0 !important;
	padding: 0 !important;
}

.centered-section > .row:only-of-type,
.centered-section > .boldgrid-section:only-of-type {
	position: absolute;
	top: 50%;
	width: 100%;
	transform: translateY(-50%);
}
</style>
</script>
