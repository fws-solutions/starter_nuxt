<template>
    <div>
        <BlockBanner :data="bannerData"/>
        <BlockBasic :data="basicData"/>
    </div>
</template>

<script>
    import BlockBanner from '../components/blocks/BlockBanner';
    import BlockBasic from '../components/blocks/BlockBasic';

    export default {
        components: {
            BlockBanner,
            BlockBasic
        },
        data() {
            return {
                bannerData: {
                    title: 'Banner Title',
                    text: 'Here goes description paragraph',
                    image: {
                        sourceUrlDesk: '/banner.jpg',
                        sourceUrlTab: '/banner-tab.jpg',
                        sourceUrlMob: '/banner-mob.jpg'
                    },
                    scrollTo: {
                        button: 'Scroll To',
                        ID: '#section-1'
                    }
                },
                basicData: {
                    sectionId: 'section-1',
                    content: `
                        <h1>Heading 1</h1>
                        <p><strong>Paragraph text 1.</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget
                            quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit
                            amet.</p>
                        <h2>Heading 2</h2>
                        <p><strong>Paragraph text 2.</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget
                            quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit
                            amet.</p>
                        <blockquote cite="#">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium accusamus unde,
                            necessitatibus quod reprehenderit, soluta quaerat voluptates vel obcaecati aut molestiae in.
                            Illo dolores ut dignissimos? Placeat, laboriosam voluptatum? Exercitationem.
                        </blockquote>
                        <p><strong>Paragraph text 3.</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget
                            quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit
                            amet.</p>

                        <a href="#">Hyperlink</a>

                        <ul>
                            <li>Unorderd list</li>
                            <li>Unorderd list</li>
                        </ul>

                        <ol>
                            <li>Ordered list</li>
                            <li>Ordered list</li>
                        </ol>

                        <figure class="wp-caption alignnone">
                            <a href="/banner.jpg">
                                <img class="wp-image-1 size-full" src="/banner-tab.jpg" alt="">
                            </a>

                            <figcaption class="wp-caption-text">Starter Theme Folder Structure</figcaption>
                        </figure>

                        <table style="width: 100%; border: 1px solid;">
                            <tbody>
                            <tr>
                                <th>Row</th>
                                <th>Row</th>
                            </tr>
                            <tr>
                                <td>Column</td>
                                <td>Column</td>
                            </tr>
                            </tbody>
                        </table>
                    `
                }
            }
        }
    };
</script>

