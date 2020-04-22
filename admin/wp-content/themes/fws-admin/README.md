# FWS Nuxt Admin
*Version: 1.0.0*

> Make Love Not WordPress!

## Installation Instructions
Install Forwardslash CLI globaly.

Install PHP dependencies by running [Composer](https://getcomposer.org/doc/00-intro.md) dependency manager.

    composer install

Install [Advanced Custom Fields](https://www.advancedcustomfields.com/) WordPress plugin as the Starter Theme depends on it. Works better with PRO version.

## Starter Config

Use `.fwsconfig.yml` file to configure top level theme options.

### Global Config

- `theme-name` - set theme full name
- `virtual-host` - set local env url
- `recovery-mode-emails` - set the fatal error handler email address from admin's to our internal
- `prevent-plugin-update` - enable only logged in users with declared email domain to add/update/remove plugins
- `acf-only-local-editing` - enable acf to edit and manage only on local enviorment


    global:
        theme-name: 'FWS Nuxt Admin'
        virtual-host: 'http://starter.local/'
        recovery-mode-emails:
            - 'nick@forwardslashny.com'
            - 'boris@forwardslashny.com'
            - 'petar@forwardslashny.com'
        prevent-plugin-update:
            enable: true
            domain: forwardslashny.com
        acf-only-local-editing:
            enable: true
            allowed-hosts:
                - '.local'
                - 'localhost/'
                - '.lndo.site'

#### Local Virtual Host

Local enviorment and virtual host **must** be named exactly the same as it is defiend in `.fwsconfig.yml` file in the variable `virtual-host`.

    virtual-host: 'http://somedomain.local/'

### ACF Fields Config

More details about `acf-options-page` and `acf-flexible-content` in the **Using Components** section, **Managing Options pages** sub section.

## Media

All images (except logos and icons) should be rendered using declared image size in order to fit the dimensions of a section.

Any image should not be larger then 2300px in width, unless there’s a special need for it. Starter Theme comes with predefined image size 'max-width', which **should always** be used for this purpose.

    add_image_size('max-width', 2300, 9999, false);

All image sizes **should** be declared in **fws/src/Images.php** file.

## Using ACF with Starter Theme

### General setup

With modular template views it is essential that ACF Flexible Content is organized and implemented in a defined manner.

**Moving away from default Flexible Content implementation...**

![](http://internal.forwardslashny.com/wp-content/uploads/2019/09/flex-content-old.png)

**... and make full use of Clone field.**

![](http://internal.forwardslashny.com/wp-content/uploads/2019/09/flex-content-new.png)

**Each Flexible Content block will use Clone field to copy ALL fields from certain field group.**

![](http://internal.forwardslashny.com/wp-content/uploads/2019/09/flex-content-groups.png)

Making those fields a direct sub fields in a Flexible Content layouts.

### Using JSON

The idea behind this approach of modular ACF fields is to take full advantage of ACF [Local JSON](https://www.advancedcustomfields.com/resources/local-json/).

Inspiration for this workflow was drawn from this [post](https://www.awesomeacf.com/how-to-avoid-conflicts-when-using-the-acf-local-json-feature/). Although it has nice ideas it still doesn't resolve the issue when two developers are working on same field groups, in such a scenario **a conflict of JSON files is inevitable**.

Main goal is to **allow multiple developers** to work on field groups simultaneously on local enviroment, with **lowest possible risk** of having conflicts in generated JSON files.

By splitting each Flexible Content block to a separate field group, the workflow is optimized to allow more developers to work in parallel. There is still a risk of creating a conflict if two developers are editing same field group, but in this workflow chances for that are slim.

It is essential to have JSON generating enabled, which is an option set by default.
Another thing to keep in mind, since these fields are being used exclusively for cloning purposes, it is important to set them as **inactive**.

![](http://internal.forwardslashny.com/wp-content/uploads/2020/02/acf-inactive2.png)

In order to optimize the workflow even further, this Starter Theme comes with hook function **that will automatically sync any changes** in field groups registered by new JSON files.

For example:
- Developer A makes changes in field group Banners.
- Developer B pulls changes into his local enviroment. On first dashboard load, the ACF field groups will get synced and updated as the internal script will detect changes in JSON files.

Lastly, it is necessary to **avoid any conflicts** coming from any changes **made directly on development or live server**. To resolve this, Starter Theme actually comes with another hook **which disables** any field group editing on any other enviroment, **forcing developers** to make all changes exclusively on **local enviroment**.

### Naming conventions and categorizing

The workflow above resolves a lot of problems but it does have a **small drawback**, creating each block's fields as a separate field group **will result in too meny groups** in the dashboard.

Furthermore, it is highly recommended to also create **helper groups** of fields that can be cloned in other block's fields.

For example, the Section Title field...

![](http://internal.forwardslashny.com/wp-content/uploads/2019/09/re-acf.png)

... can be reusable across many different field groups.

![](http://internal.forwardslashny.com/wp-content/uploads/2019/09/fc-acf.png)

Considering **helper group** fields together with **block group** fields, the number of groups in the dashboard will tend to get **very long and unorganized**.

To resolve this issue, this theme comes with a Custom Taxonomy **"Categories"** for ACF plugin, which **should** be used in order to group the field groups together.

Aside from using field group categories it is also **required to follow defined naming convention**.

Every field group for **blocks** should be named with a **prefix 'FC'**.
Every field group for **reusable elements** should be named with a **prefix 'RE'**.

![](http://internal.forwardslashny.com/wp-content/uploads/2020/02/acf-categories.png)

With these two conventions, it is visually optimised to distinguish which fields are blocks and which helpers, and it is user friendly to use categories to filter out desired groups.

### Managing Flexible Content field

With everything above fully implemented, tha **last thing** to tackle is **Flexible Content** field and potential conflicts which are still **not covered** by the defined workflow.

Cloning separate field groups into Flexible Content blocks **resolves avoiding JSON conflicts** when multiple developers are working **on a separate components (field groups)**, but it is still **necessary** for each developer **to edit same field group for Flexible Content** and make changes simultaneously and therefore create an inevitable JSON conflict.

**Final step** in this workflow is to actually **avoid creating/editing** any **Flexible Content** group fields from the dashboard and make those changes through `.fwsconfig.yml` file.

Starter Theme comes with more helper functions to enable just that, but it is **important to follow the proper formating** of `.fwsconfig.yml` file.

All values must be written under `acf-flexible-content` with defined **group name** as property name that includes the following sub properties.

**The Starter Theme will automatically load any defined group names, unless the `autoload` property is disabled.**

- `autoload`
    - Set whether or not to autoload this flexible content group.
    - If set to `false`, you'll need to use function directly in code somewhere in order to enable the field group.
    - The function in question is `addNewFlexContentGroup($fc);` that is located in **fws/src/ACF.php**.
- `field-name`
    - Filed name that will show on page.
    - See image **Field Name** bellow.
- `location`
    - `param` Set to what type this field group will be for.
    - `value` Set to what type this field group will equal to.
    - Set location where this field group will load.
    - See image **Field Location** bellow.
    - Some of the possible values:
        - "post_type": "post"
        - "page_template": "default"
        - "taxonomy": "category"
        - "options_page": "fws_starter_s-settings"
    - For more information on avalible values, pleaase refer to [ACF Docs](https://www.advancedcustomfields.com/resources/)
    - **Important Note**: Currently, the conditional logic for `param` and `value` is set to equal (`"operator": "=="`). This is hardcoded withing the theme, in order to expand this option and flexibility of `.fwsconfig.yml`, please reffer to `addNewFlexContentGroup` and `registerFlexContent` methods in *fws/src/ACF.php*.
- `hide-on-screen`
    - Set rules for default meta fields that should be hidden on a page.
    - See image **Field Hidden Stuff** bellow.
    - All possible values:
        - permalink
        - the_content
        - excerpt
        - discussion
        - comments
        - revisions
        - slug
        - author
        - format
        - page_attributes
        - featured_image
        - categories
        - tags
        - send-trackbacks
- `layouts` set flex content layouts/blocks that will show for this group
    - `title` This is the name that will show in flex content dropdown, it can be set arbitrarily.
    - `group_id` This must be set to field group id/key value.
    - See images **Field Layout Title** and **Field Layout Group ID** bellow.

***Field Name***
![](http://internal.forwardslashny.com/wp-content/uploads/2020/04/field-group-title.png)

***Field Location***
![](http://internal.forwardslashny.com/wp-content/uploads/2020/04/field-group-location.png)

***Field Hidden Stuff***
![](http://internal.forwardslashny.com/wp-content/uploads/2020/04/field-group-hide.png)

***Field Layout Title***
![](http://internal.forwardslashny.com/wp-content/uploads/2020/04/field-group-name.png)

***Field Layout Group ID***
![](http://internal.forwardslashny.com/wp-content/uploads/2020/04/filed-group-id.png)

**Example of .fwsconfig.yml**:

    acf-flexible-content:                               # DEFINE ACF FLEXIBLE CONTENT GROUPS AND FIELDS
        default-page-template:                          # define flexible content for default page template
            autoload: true                              # set whether or not to autoload this flexible content group
            field-name: 'Content'                       # filed name that will show on page
            location:                                   # set location where this field group will load
                param: 'page_template'
                value: 'default'
            hide-on-screen: [ 'the_content' ]           # set rules for default meta fields that should be hidden on a page
            layouts:                                    # set flex content layouts/blocks that will show for this group
                -
                    title: 'Banner'
                    group_id: 'group_5d70e7dfa2562'
                -
                    title: 'Basic Block'
                    group_id: 'group_5d70e7ea08bce'
                -
                    title: 'Slider'
                    group_id: 'group_5d70e7f775076'
                -
                    title: 'Vue Block'
                    group_id: 'group_5dcd6b37b67a4'

To sum up, all Flexible Content group fields must be defined as **arrays of an array**.

In the example above, Flexible Content group `default-page-template` is an array value of `acf-flexible-content`.

To register more then one Flexible Content group, it is neccessary to simply add another array into `acf-flexible-content`.

**Example of .fwsconfig.yml** that is showing three Flexible Content groups for different post types:

    acf-flexible-content:
        default-page-template:
            autoload: ...
            field-name: ...
            location: ...
            hide-on-screen: ...
            layouts: ...
        blog-page-template:
            autoload: ...
            ...
        product-page-template:
            autoload: ...
            ...

### Managing Options pages

Having in mind the workflow we have for Flexible Content, it is safe to assume that very similar apporach is used for ACF Options pages, so just like in the examples above it is **important to follow the proper formating** of `.fwsconfig.yml` file.

All values must be written under `acf-options-page`:

- `enable`
    - Set to `true` or `false` in order to enable ACF Options Main page.
    - The name of the Menu Item in the Dashboard will be the of the theme set in `global` property, `theme-name` sub property.
- `subpages`
    - Takes on array of strings, which will be used to create sub pages of ACF Options.
    - See image **Sub pages** bellow.
    - Leave empty array if no sub pages are needed - `subpages: []`.

***Sub pages***

![](http://internal.forwardslashny.com/wp-content/uploads/2020/04/acf-options.png)

**Example of .fwsconfig.yml**

    acf-options-page:
        enable: true
        subpages:
            - 'Mega Menu'
            - 'Shared Sections'

## FWS Engine

FWS Engine is a default part of this Starter Theme to which **the starter relies on heavily**.

See `fws` and `fws/src` for it's structure and features.

### Custom Post Types and Taxonomies

Registrating custom post types and taxonomies must always be done using FWS Engine.

Each custom post type with it's taxonomies must be placed in a single file inside `fws/src` directory.

Always use `CTPName.php` example file located in `__wp_snippets` directory.

Use `$private` array variable to configure names of custom post type and taxonomies.

Example:

    private $params = [
        'postSingularName' => 'Custom Post',
        'postPluralName'   => 'Custom Posts',
        'taxSingularName'  => 'Custom Post Category',
        'taxPluralName'    => 'Custom Post Categories',
    ];

Methods within the CPT class will handle `$params` varibale to pull appropriate names, labels and generate a slug.

Slug and Nice Name are being based on singular name of a custom post type or taxonomy. FWS will replace any space characters for `_` or `-` character and add appropriate prefix when needed.

Slug is used for registrating custom post type or taxonomy under this name, it will use `_` character and a prefix.

Nice Name is used for URL structure, it will use `-` character and will not include a prefix.

Prefixes are defined as follows:
- for post type: `cpt_`
- for taxonomy: `ctax_`

Example:

    private $params = [
        'postSingularName' => 'Book',
        'postPluralName'   => 'Books',
        'taxSingularName'  => 'Book Category',
        'taxPluralName'    => 'Books Categories',
    ];

This will result in custom post type and taxonomy being registrated under the slugs:

    cpt_book
    ctax_book_category

and it will set `rewrite` rules for pretty URLs using Nice Name conversion:

    somedomain.com/book/post-title
    somedomain.com/book-category/category-title

For the rest of a custom post type and taxonomies configuration, see functions:

- `cptInit()`
- `cptInitTax()`

Always make a new function for additional taxonomies for a custom post type.

When in need for a taxonomy that is shared accross multiple post types, create a seperate class file.
