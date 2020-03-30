<template>
    <div>
        <BlockBanner :data="bannerData"/>
        <BlockBasic :data="basicData"/>
        <BlockSlider :data="sliderData"/>
    </div>
</template>

<script>
    import BlockBanner from '../components/blocks/BlockBanner';
    import BlockBasic from '../components/blocks/BlockBasic';
    import BlockSlider from '../components/blocks/BlockSlider';

    export default {
        components: {
            BlockBanner,
            BlockBasic,
            BlockSlider
        },
        data() {
            return {
                bannerData: {
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
                },
                basicData: {
                    sectionId: 'section-1',
                    content: `
                        <h1>Heading 1</h1>

                        <h2>Paragraphs</h2>

                        <p><strong>Paragraph 1:</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit amet.</p>

                        <p><strong>Paragraph 2:</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit amet. <a href="#">Read more!</a></p>

                        <h3>Blockquote</h3>

                        <blockquote cite="#">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium accusamus unde, necessitatibus quod reprehenderit, soluta quaerat voluptates vel obcaecati aut molestiae in. Illo dolores ut dignissimos? Placeat, laboriosam voluptatum? Exercitationem.
                        </blockquote>

                        <h3>Table</h3>

                        <table>
                            <tbody>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Savings</th>
                                </tr>
                                <tr>
                                    <td>Peter</td>
                                    <td>Griffin</td>
                                    <td>$100</td>
                                </tr>
                                <tr>
                                    <td>Lois</td>
                                    <td>Griffin</td>
                                    <td>$150</td>
                                </tr>
                                <tr>
                                    <td>Joe</td>
                                    <td>Swanson</td>
                                    <td>$300</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>Image</h3>

                        <figure class="wp-caption alignnone">
                            <a href="/__demo/girl.jpg">
                                <img class="wp-image-1 size-full" src="/__demo/girl-md.jpg" alt="">
                            </a>

                            <figcaption class="wp-caption-text">Greatness Awaits!</figcaption>
                        </figure>

                        <h3>Lists</h3>

                        <h4>Unordered list</h4>

                        <ul>
                            <li>Bread</li>
                            <li>Coffee beans</li>
                            <li>Milk</li>
                            <li>Butter</li>
                        </ul>

                        <h4>Ordered list</h4>

                        <ol>
                            <li>Coffee</li>
                            <li>Tea</li>
                            <li>Milk</li>
                        </ol>
                    `
                },
                sliderData: {
                    slides: [
                        '/__demo/slide-1.jpg',
                        '/__demo/slide-2.jpg',
                        '/__demo/slide-3.jpg',
                        '/__demo/slide-4.jpg',
                        '/__demo/slide-5.jpg'
                    ]
                }
            };
        }
    };
</script>

