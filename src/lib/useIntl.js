import {
  useContext,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import { IntlCollectorContext } from './context';

function useIntlCollector() {
  const { formatMessage } = useIntl();
  const { intlCollector } = useContext(IntlCollectorContext);

  const collectFormatMessage = useCallback((descriptor, values) => {
    if (intlCollector && descriptor) {
      intlCollector(descriptor.id);
    }

    return formatMessage(descriptor, values);
  }, [formatMessage, intlCollector]);

  return { formatMessage: collectFormatMessage };
}

export default useIntlCollector;
