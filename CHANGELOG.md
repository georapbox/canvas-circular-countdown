# CHANGELOG

## v1.7.0 - 2022-08-22

- Add instance methods `setDuration()` and `setElapsedTime()` to update the countdown's duration and elapsed time respectively, at any time, even when time is running. See issue [#26](https://github.com/georapbox/canvas-circular-countdown/issues/26).
- Ensure that if `style()` method is called with options object that includes the `elapsedTime` or `throttle` properties, that they won't override the values set before.
- Update dev dependencies.

## v1.6.0 - 2022-04-22

- Support `elapsedTime` in countdown options. Resolves issue [#21](https://github.com/georapbox/canvas-circular-countdown/issues/21)

## v1.5.0 - 2021-01-21
- Export library in UMD, CommonJS and ESM formats.
- Remove external dependencies.
- Replace Webpack with Rollup to bundle the library. 

## v1.4.1 - 2021-01-19
- Use the minified bundle in `main` field in `package.json`.
- Add a "Usage" section in documentation.
- Documentation minor improvements and fixes.
- Demo page layout and styling updates.

## v1.4.0 - 2021-01-09
- Add `throttle` option to allow canvas drawing and timer's callback throttling.
- Keep dependencies up to date.
## v1.3.1
- `draw` function takes the correct `width` and `height` properties; calculated using the circle radius and not the actual canvas dimensions which can be different on various platforms with different `devicePixelRatio`.

## v1.3.0
- Provide method to allow free drawing on canvas element for even more flexibility or advnaced cases.


## v1.2.0
- Update dependencies to latest versions.
- Update the build process according to the corresponding build tools (Webpack, Babel, etc) update.

## v1.1.1
- Update `npm-run-all` to latest version to protect against `flatmap-stream` malicious dependency (https://github.com/mysticatea/npm-run-all/issues/153)

## v1.1.0
- Support for HiDPI or Retina displays, by detecting [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) so that the drawn canvas does not look blurry.


## v1.0.0
- Initial release
