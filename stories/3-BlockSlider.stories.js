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
            title: 'Slider',
            data: {
                slides: [
                    '/__demo/slide-1.jpg',
                    '/__demo/slide-2.jpg',
                    '/__demo/slide-3.jpg',
                    '/__demo/slide-4.jpg',
                    '/__demo/slide-5.jpg'
                ]
            }
        };
    },

    template: `
        <StoryWrapper :title="title" :fluid="true">
            <BlockSlider :data="data"/>
        </StoryWrapper>
    `
});

StoryBlockSlider.story = {
    name: 'Default State'
};
