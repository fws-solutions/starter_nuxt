import PartMediaItem from '../components/parts/PartMediaItem';
import StoryWrapper from './config/StoryWrapper';

export default {
    title: 'Part: Media Item'
};

// Default State
export const StoryPartMediaItem = () => ({
    components: {
        StoryWrapper,
        PartMediaItem
    },

    data: function() {
        return {
            title: 'Media Item',
            data: {
            }
        };
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartMediaItem :data="data"/>
        </StoryWrapper>
    `
});

StoryPartMediaItem.story = {
    name: 'Default State'
};
