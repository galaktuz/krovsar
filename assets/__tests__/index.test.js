/* global test expect */
import { LOG_URL } from '@root/constants';

test('log url', () => {
    expect(LOG_URL).toBe('https://api-app.sovcombank.ru/log/graphql');
});
