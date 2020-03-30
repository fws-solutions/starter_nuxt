import StoryBaseEntryContent from './base/StoryBaseEntryContent.vue';
import StoryBasePages from './base/StoryBasePages';
import StoryBaseFonts from './base/StoryBaseFonts';
import StoryWrapper from './base/StoryWrapper';

export default {
    title: 'Base'
};

export const Pages = () => ({
    components: {
        StoryWrapper,
        StoryBasePages
    },
    template: `
        <StoryWrapper title="Pages">
            <StoryBasePages/>
        </StoryWrapper>
    `
});

export const Fonts = () => ({
    components: {
        StoryWrapper,
        StoryBaseFonts
    },
    template: `
        <StoryWrapper title="Fonts">
            <StoryBaseFonts/>
        </StoryWrapper>
    `
});

export const EntryContent = () => ({
    components: {
        StoryWrapper,
        StoryBaseEntryContent
    },
    template: `
        <StoryWrapper title="Entry Content">
            <StoryBaseEntryContent/>
        </StoryWrapper>
    `
});
