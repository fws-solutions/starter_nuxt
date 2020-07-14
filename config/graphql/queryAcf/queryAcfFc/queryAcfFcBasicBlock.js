/**
 * Page Flexible Content - Basic Block
 *
 * @description Define GraphQL query for ACF Flexible Content layout Basic Block.
 */

import { acfFlexPrefix } from '../queryAcfUtils';

const acfFcBasicBlock = `
... on ${acfFlexPrefix}BasicBlock {
    fieldGroupName
    sectionId
    content
}`;

export default acfFcBasicBlock;
