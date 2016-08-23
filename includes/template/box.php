<script type="text/html" id="tmpl-boldgrid-editor-box">
	<div class='box-design'>
		<div class='title'>
			<h4>Sample Designs</h4>
		</div>
		<div class='presets grid'>
			{{{data.presets}}}
		</div>
		<div class='customize'>
			<div class='back'>
				<a class='panel-button' href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i> Preset Designs</a>
			</div>
			<div class='color-controls section'>
				<h4>Background Color</h4>
				<label for="box-bg-color" class='color-preview'></label>
				<input type="text" data-type="" name='box-bg-color' class='color-control' value=''>
			</div>
			<div class='section' data-tooltip-id='box-padding'>
				<h4>Padding</h4>
				<div class='padding'>
					<p>Horizontal (em)</p>
					<div class="slider"></div>
					<span class='value'></span>
				</div>
				<div class='padding-top'>
					<p>Vertical (em)</>
					<div class="slider"></div>
					<span class='value'></span>
				</div>
			</div>
			<div class='section' data-tooltip-id='box-margin'>
				<h4>Margin</h4>
				<div class='margin'>
					<p>Horizontal (px)</p>
					<div class="slider"></div>
					<span class='value'></span>
				</div>
				<div class='margin-top'>
					<p>Vertical (px)</p>
					<div class="slider"></div>
					<span class='value'></span>
				</div>
			</div>
		</div>
	</div>
</script>