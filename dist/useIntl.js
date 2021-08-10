"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactIntl = require("react-intl");

var _context = require("./context");

function useIntlCollector() {
  const {
    formatMessage
  } = (0, _reactIntl.useIntl)();
  const {
    intlCollector
  } = (0, _react.useContext)(_context.IntlCollectorContext);
  const collectFormatMessage = (0, _react.useCallback)((descriptor, values) => {
    if (intlCollector && descriptor) {
      intlCollector(descriptor.id);
    }

    return formatMessage(descriptor, values);
  }, [formatMessage, intlCollector]);
  return {
    formatMessage: collectFormatMessage
  };
}

var _default = useIntlCollector;
exports.default = _default;