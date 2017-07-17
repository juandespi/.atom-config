// Node Modules
var args = require('yargs').argv;

// Gulp Modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

// -----------------------------------------------------------------------------
// Tasks
// -----------------------------------------------------------------------------

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Generate CHANGELOG.md updates from git metadata
 */
gulp.task('changelog', function () {
  return gulp
      .src('CHANGELOG.md', {buffer: false})
      .pipe($.conventionalChangelog({
        preset: 'angular'
      }))
      .pipe(gulp.dest('./'));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
    var type = args.type;
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
    } else {
        options.type = type;
    }

    return gulp
        .src('./package.json')
        .pipe($.bump(options))
        .pipe(gulp.dest('./'));
});

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

function log (msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log(msg[item]);
            }
        }
    } else {
        $.util.log(msg);
    }
}
