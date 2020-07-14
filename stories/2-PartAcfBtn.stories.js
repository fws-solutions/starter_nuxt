import PartAcfBtn from '../components/parts/PartAcfBtn';
import StoryWrapper from './config/StoryWrapper';

export default {
    title: 'Part: Acf Btn'
};

// Default State
export const StoryPartAcfBtn = () => ({
    components: {
        StoryWrapper,
        PartAcfBtn
    },

    data: function() {
        return {
            title: 'Acf Btn',
            data: {
                button: {
                    title: 'Next Page',
                    url: '#'
                }
            }
        };
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartAcfBtn :button="data.button"/>
        </StoryWrapper>
    `
});

StoryPartAcfBtn.story = {
    name: 'Default State'
};
