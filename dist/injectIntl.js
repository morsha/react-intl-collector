"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectIntlWithCollector;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactIntl = require("react-intl");

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function injectIntlWithCollector(WrappedComponent) {
  function IntlWrapper(props) {
    const {
      intl
    } = props;
    const {
      formatMessage
    } = intl || {};
    const {
      intlCollector
    } = (0, _react.useContext)(_context.IntlCollectorContext);
    const collectFormatMessage = (0, _react.useCallback)((descriptor, values) => {
      if (intlCollector && descriptor) {
        intlCollector(descriptor.id);
      }

      return formatMessage(descriptor, values);
    }, [formatMessage, intlCollector]);
    const newIntl = (0, _react.useMemo)(() => ({
      formatMessage: collectFormatMessage
    }), [collectFormatMessage]);
    return /*#__PURE__*/_react.default.createElement(WrappedComponent, _extends({}, props, {
      intl: newIntl
    }));
  }

  IntlWrapper.propTypes = {
    intl: _propTypes.default.object.isRequired
  };
  return (0, _reactIntl.injectIntl)(IntlWrapper);
}