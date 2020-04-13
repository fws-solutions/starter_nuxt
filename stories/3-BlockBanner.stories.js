import BlockBanner from '../components/blocks/BlockBanner';
import StoryWrapper from './base/StoryWrapper';

export default {
    title: 'Block: Banner'
};

// Default State
export const StoryBlockBanner = () => ({
    components: {
        StoryWrapper,
        BlockBanner
    },

    data: function() {
        return {
            title: 'Slider',
            data: {
                title: 'Banner Title',
                text: 'Here goes description paragraph',
                image: {
                    sourceUrlDesk: '/__demo/banner.jpg',
                    sourceUrlTab: '/__demo/banner-tab.jpg',
                    sourceUrlMob: '/__demo/banner-mob.jpg'
                },
                scrollTo: {
                    button: 'Scroll To',
                    ID: '#section-1'
                }
            }
        };
    },

    template: `
        <StoryWrapper :title="title" :fluid="true">
            <BlockBanner :data="data"/>
        </StoryWrapper>
    `
});

StoryBlockBanner.story = {
    name: 'Default State'
};
