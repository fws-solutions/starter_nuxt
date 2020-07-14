/**
 * Page Flexible Content - Box Links
 *
 * @description Define GraphQL query for ACF Flexible Content layout Box Links.
 */
import { acfFlexPrefix } from '../queryAcfUtils';

const acfFcSlider = `
... on ${acfFlexPrefix}Slider {
    fieldGroupName
    slides {
        sourceUrl(size: MAX_WIDTH)
    }
}`;

export default acfFcSlider;
