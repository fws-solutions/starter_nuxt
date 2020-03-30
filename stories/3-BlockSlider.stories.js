import BlockSlider from '../components/blocks/BlockSlider';
import StoryWrapper from './base/StoryWrapper';

export default {
    title: 'Block: Slider'
};

// Default State
export const StoryBlockSlider = () => ({
    components: {
        StoryWrapper,
        BlockSlider
    },

    data: function() {
        return {
            title: 'Slider'
        };
    },

    template: `
        <StoryWrapper :title="title" :fluid="false">
            <BlockSlider/>
        </StoryWrapper>
    `
});

StoryBlockSlider.story = {
    name: 'Default State'
};
