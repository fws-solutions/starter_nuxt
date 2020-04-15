<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <StorySubWrapper title="Special Titles">
                    <span class="page-title">This is Page Title</span>
                    <span class="section-title">This is Section Title</span>
                </StorySubWrapper>

                <StorySubWrapper title="Entry Content: Headings">
                    <div class="entry-content">
                        <h1>Heading 1</h1>
                        <h2>Heading 2</h2>
                        <h3>Heading 3</h3>
                        <h4>Heading 4</h4>
                        <h5>Heading 5</h5>
                        <h6>Heading 1</h6>
                    </div>
                </StorySubWrapper>
            </div>

            <div class="col-md-6">
                <StorySubWrapper title="Entry Content: Elements">
                    <div class="entry-content">
                        <h1>Heading 1</h1>

                        <h2>Paragraphs</h2>

                        <p><strong>Paragraph 1:</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit amet.</p>

                        <p><strong>Paragraph 2:</strong> Donec sed odio dui. Cras justo odio, dapibus ac facilisis in. Egestas eget quam. Maecenas faucibus mollis interdum maecenas faucibus. Cras mattis consectetur purus sit amet. <a href="#">Read more!</a></p>

                        <h3>Blockquote</h3>

                        <blockquote cite="#">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium accusamus unde, necessitatibus quod reprehenderit, soluta quaerat voluptates vel obcaecati aut molestiae in. Illo dolores ut dignissimos? Placeat, laboriosam voluptatum? Exercitationem.
                        </blockquote>

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

                        <h3>Image</h3>

                        <figure class="wp-caption alignnone">
                            <a href="/__demo/girl.jpg">
                                <img class="wp-image-1 size-full" src="/__demo/girl-md.jpg" alt="">
                            </a>

                            <figcaption class="wp-caption-text">Greatness Awaits!</figcaption>
                        </figure>

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
                    </div>
                </StorySubWrapper>
            </div>
        </div>
    </div>
</template>

<script>
    import StorySubWrapper from '../config/StorySubWrapper';

    export default {
        components: {
            StorySubWrapper
        }
    }
</script>
