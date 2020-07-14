/**
 * ACF Query Flexible Content
 *
 * @description Collection of query params for Flexible Content fields and groups.
 */

import acfFcBasicBlock from './queryAcfFcBasicBlock';
import acfFcBanner from './queryAcfFcBanner';
import acfFcSlider from './queryAcfFcSlider';

const acfFc = `
    fc_content {
        content {
            ${acfFcBasicBlock}
            ${acfFcBanner}
            ${acfFcSlider}
        }
    }
`;

export default acfFc;
