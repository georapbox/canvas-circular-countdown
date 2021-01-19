# CHANGELOG

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
