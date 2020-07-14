import BlockBanner from '../components/blocks/BlockBanner';
import StoryWrapper from './config/StoryWrapper';

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
                sectionTitle: 'Banner Title',
                subtitle: 'Here goes description paragraph',
                desktopImage: {
                    sourceUrl: '/__demo/banner-dog-desk.jpg'
                },
                tabletImage: {
                    sourceUrl: '/__demo/banner-dog-tab.jpg'
                },
                mobileImage: {
                    sourceUrl: '/__demo/banner-dog-mob.jpg'
                },
                button: {
                    title: 'Next Page',
                    url: '#'
                },
                scrollTo: {
                    title: 'Scroll To',
                    id: 'section-1'
                }
            }
        };
    },

    template: `
        <StoryWrapper :title="title" :container="false">
            <BlockBanner :data="data"/>
        </StoryWrapper>
    `
});

StoryBlockBanner.story = {
    name: 'Default State'
};
