import PartLoadingButton from '../components/parts/PartLoadingButton';
import StoryWrapper from './config/StoryWrapper';

export default {
    title: 'Part: Loading Button'
};

// Default State
export const StoryPartLoadingButton = () => ({
    components: {
        StoryWrapper,
        PartLoadingButton
    },

    data: function() {
        return {
            title: 'Loading Button'
        }
    },

    template: `
        <StoryWrapper :title="title" container>
            <PartLoadingButton>Submit</PartLoadingButton>
        </StoryWrapper>
    `
});

StoryPartLoadingButton.story = {
    name: 'Default State'
};

// Loading State
export const StoryPartLoadingButtonPreloading = () => ({
    components: {
        StoryWrapper,
        PartLoadingButton
    },

    data: function() {
        return {
            title: 'Loading Button - Loading State'
        }
    },

    template: `
        <StoryWrapper :title="title" :container="true">
            <PartLoadingButton :preloader="true">Submit</PartLoadingButton>
        </StoryWrapper>
    `
});

StoryPartLoadingButtonPreloading.story = {
    name: 'Loading State'
};
