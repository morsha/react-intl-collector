/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useMemo,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { IntlCollectorContext } from './context';

export default function injectIntlWithCollector(WrappedComponent) {
  function IntlWrapper(props) {
    const {
      intl,
    } = props;

    const {
      formatMessage,
    } = intl || {};

    const { intlCollector } = useContext(IntlCollectorContext);

    const collectFormatMessage = useCallback((descriptor, values) => {
      if (intlCollector && descriptor) {
        intlCollector(descriptor.id);
      }

      return formatMessage(descriptor, values);
    }, [formatMessage, intlCollector]);

    const newIntl = useMemo(() => ({
      formatMessage: collectFormatMessage,
    }), [collectFormatMessage]);

    return (
      <WrappedComponent
        {...props}
        intl={newIntl}
      />
    );
  }

  IntlWrapper.propTypes = {
    intl: PropTypes.object.isRequired,
  };

  return injectIntl(IntlWrapper);
}
