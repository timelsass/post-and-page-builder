/**
 * Automatically Copies Deps from Framework:
 * FontAwesome
 * jquery-stellar
 * components.css
 * bootstrap.min.css
 * font-family-controls.min.css
 */

var gulp = require( 'gulp' ),
	cssnano = require( 'gulp-cssnano' ),
	rename = require( 'gulp-rename' ),
	sass = require( 'gulp-sass' ),
	debug = require( 'gulp-debug' ),
	uglify = require( 'gulp-uglify' ),
	concat = require( 'gulp-concat' ),
	sequence = require( 'run-sequence' ),
	del = require( 'del' ),
	fs = require( 'fs' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	server = require( 'karma' ).Server,
	gutil = require( 'gutil' ),
	pump = require( 'pump' );

// Configs.
var config = {
	src: './',
	dist: './',
	fontDest: './assets/fonts',
	buildDest: './build',
	cssDest: './assets/css',
	jsDest: './assets/js',
	jsonDir: './assets/json',
	buildIgnoredFiles: [
		'./**/*',
		'!*.yml',
		'!.htaccess',
		'!./.*rc',
		'!./node_modules',
		'!./node_modules/**',
		'!./yarn.lock',
		'!./gulpfile.js',
		'!./bin',
		'!./bin/**',
		'!README.md',
		'!./tools',
		'!./tools/**/*',
		'!./tests',
		'!./tests/**/*',
		'!./package.json',
		'!karma.conf.js',
		'!webpack.config.js',
		'!./build',
		'!./build/**',
		'!phpunit.xml'
	]
};

gulp.task( 'clean', function() {
	return del( config.buildDest, { force: true } );
} );

gulp.task( 'js-unit-tests', function( done ) {
	return new server(
		{
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		},
		done
	).start();
} );

gulp.task( 'pre-deploy', function() {
	return gulp.src( config.buildIgnoredFiles ).pipe( gulp.dest( config.buildDest ) );
} );

// Compile sass files.
gulp.task( 'sass', function() {
	gulp
		.src( [
			config.dist + '/assets/scss/**/*.scss',
			'!' + config.src + 'assets/scss/color-palette-scss/**/*'
		] )
		.pipe(
			sass( {
				includePaths: [ config.dist + 'assets/scss/' ]
			} ).on( 'error', sass.logError )
		)
		.pipe( sass.sync().on( 'error', sass.logError ) )
		.pipe(
			autoprefixer( {
				browsers: [ '> 1%', 'Last 2 versions' ],
				cascade: false
			} )
		)
		.pipe( gulp.dest( config.dist + '/assets/css' ) )
		.pipe(
			cssnano( {
				discardComments: { removeAll: true },
				zindex: false
			} )
		)
		.pipe( rename( { suffix: '.min' } ) )
		.pipe( gulp.dest( config.dist + '/assets/css' ) );
} );

gulp.task( 'merge-webpack', function() {
	gulp
		.src( [
			config.dist + '/assets/css/editor.min.css',
			config.dist + '/assets/css/bundle.min.css'
		] )
		.pipe(
			autoprefixer( {
				browsers: [ '> 5%' ],
				cascade: false
			} )
		)
		.pipe( concat( 'editor.min.css' ) )
		.pipe( gulp.dest( config.dist + '/assets/css/' ) );
} );

gulp.task( 'jsmin-media', function( cb ) {
	pump(
		[
			gulp.src( [
				'!' + config.src + 'assets/js/media/**/*.min.js',
				config.src + 'assets/js/media/**/*.js'
			] ),
			uglify(),
			rename( {
				suffix: '.min'
			} ),
			gulp.dest( config.dist + 'assets/js/media' )
		],
		cb
	);
} );

gulp.task( 'jsmin-editor', function( cb ) {
	pump(
		[
			gulp.src( [
				'!' + config.src + 'assets/js/editor/**/*.min.js',
				config.src + 'assets/js/editor/**/*.js'
			] ),
			uglify(),
			rename( {
				suffix: '.min'
			} ),
			gulp.dest( config.dist + 'assets/js/editor' )
		],
		cb
	);
} );

gulp.task( 'build', function( cb ) {
	sequence( [ 'sass', 'jsmin-editor', 'jsmin-media' ], cb );
} );

gulp.task( 'deploy', function( cb ) {
	sequence( 'clean', 'pre-deploy', cb );
} );

gulp.task( 'watch', function() {
	gulp.watch( config.src + 'assets/scss/**/*', [ 'sass' ] );
} );

gulp.task( 'test-watch', function( done ) {
	new server(
		{
			configFile: __dirname + '/karma.conf.js'
		},
		done
	).start();
} );
