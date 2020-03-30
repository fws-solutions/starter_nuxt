import StoryElementsButtons from './elements/StoryElementsButtons';
import StoryWrapper from './base/StoryWrapper';

export default {
    title: 'Elements'
};

export const Buttons = () => ({
    components: {
        StoryWrapper,
        StoryElementsButtons
    },

    template: `
        <StoryWrapper title="Buttons">
            <StoryElementsButtons/>
        </StoryWrapper>
    `
});
