import StoryBaseEntryContent from './base/StoryBaseEntryContent.vue';
import StoryBaseFonts from './base/StoryBaseFonts';
import StoryWrapper from './config/StoryWrapper';
import StoryBaseButtons from './base/StoryBaseButtons';
import StoryBaseIcons from './base/StoryBaseIcons';
import StoryBaseColors from './base/StoryBaseColors';

export default {
    title: 'Base'
};

export const Colors = () => ({
    components: {
        StoryWrapper,
        StoryBaseColors
    },

    template: `
        <StoryWrapper title="Colors" :container="true" noLabels>
            <StoryBaseColors/>
        </StoryWrapper>
    `
});

export const Icons = () => ({
    components: {
        StoryWrapper,
        StoryBaseIcons
    },

    template: `
        <StoryWrapper title="Icons" :container="true" noLabels>
            <StoryBaseIcons/>
        </StoryWrapper>
    `
});

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
        StoryBaseButtons
    },

    template: `
        <StoryWrapper title="Buttons" :container="true" noLabels>
            <StoryBaseButtons/>
        </StoryWrapper>
    `
});
