import BlockSlider from '../components/blocks/BlockSlider';
import StoryWrapper from './config/StoryWrapper';

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
                    {
                        sourceUrl: '/__demo/slide-1.jpg'
                    },
                    {
                        sourceUrl: '/__demo/slide-2.jpg'
                    },
                    {
                        sourceUrl: '/__demo/slide-3.jpg'
                    },
                    {
                        sourceUrl: '/__demo/slide-4.jpg'
                    },
                    {
                        sourceUrl: '/__demo/slide-5.jpg'
                    }
                ]
            }
        };
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockSlider :data="data"/>
        </StoryWrapper>
    `
});

StoryBlockSlider.story = {
    name: 'Default State'
};
