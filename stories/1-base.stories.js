import StoryBaseEntryContent from './base/StoryBaseEntryContent.vue';
import StoryBaseFonts from './base/StoryBaseFonts';
import StoryWrapper from './config/StoryWrapper';
import StoryElementsButtons from './base/StoryElementsButtons';

export default {
    title: 'Base'
};

export const Typography = () => ({
    components: {
        StoryWrapper,
        StoryBaseFonts,
        StoryBaseEntryContent
    },
    template: `
        <StoryWrapper title="Entry Content" :container="true" noLabels>
            <StoryBaseFonts/>
            <StoryBaseEntryContent/>
        </StoryWrapper>
    `
});

export const Buttons = () => ({
    components: {
        StoryWrapper,
        StoryElementsButtons
    },

    template: `
        <StoryWrapper title="Buttons" :container="true" noLabels>
            <StoryElementsButtons/>
        </StoryWrapper>
    `
});
