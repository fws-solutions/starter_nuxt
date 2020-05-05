# FWS Starter Nuxt
*Version: 1.0.1*

> Make Love Not WordPress!

## Installation Instructions
Install Forwardslash CLI globaly.

This only needs to be done once per machine, so if you installed it previously, skip this step.

Although, keep in mind for most recent version of it: [forwardslash-cli](https://www.npmjs.com/package/forwardslash-cli).

    npm i forwardslash-cli -g

Install JS dependencies by running [Node.js](https://nodejs.org/en/) package manager.

    npm install

## CLI
For the full list of all commands, execute `fws --help`.

    fws --help

### Building Files

To create server-side static version files, execute `fws generate` command.

    fws generate

To create production version files, execute `fws build` command.

    fws build

*Please note that build tasks will NOT handle SVG icons.*


### Starting Dev Mode

To start *watch mode* and *local server*, execute `fws dev` command.

    fws dev
    
### Starting Storybook

To start **storybook**, execute `fws storybook` command.

    fws storybook

## Working with Components

### Creating Files

There are four types of template views:
- Blocks
- Main
- Parts

To create a new Vue component, execute `fws creates files` command and pass `--block` or `--part` with an argument.

    fws create-file component-name --block
    fws create-file part-name --part

Alternatively, it is possible and **recommended** to use short aliases.

    fws cf component-name -b
    fws cf part-name -p

Note that in this case the option argument is passed with one '-' instead of two '--'.

This command will create new module file in appropriate directory `components/blocks` or `components/parts`:
* .vue

#### Naming Conventions

Naming convention for Vue files should be as follows:
- each component should be named using PascalCase format,
- each block component should have a prefix 'Block',
- each part component should have a prefix 'Part'.

It is essential to keep in mind these rules when creating the files manually.

When using `create-file` or `cf` command, these rules will be applied automatically.

    Example:
    fws create-file team --block

    or short:
    fws cf team -b

    Will create:
    components/blocks/BlockTeam.vue

### SVG Icons

To generate SVG icons, execute `fws icons` task.

    fws icons

This command will optimize all SVG files in `assets/svg` directory.

Import SvgIcon.vue file like any other component from `components/base/SvgIcon/SvgIcon.vue`.

Use component as shown in this example:

 `<SvgIcon class="banner__caption-icon" iconName="ico-dog"/>`.

The attribute `iconName` is required, pass the name of the svg file from `assets/svg`.

Additionally you can set any other standard HTML attributes, like `class`.

    Example:
    <SvgIcon class="banner__caption-icon" iconName="ico-dog"/>

    Will render:
    <span class="banner__caption-icon svg-icon">
        <svg>...</svg>
    </span>

## Media

Any media files that will be static should be placed in **static** directory.

Any media files that are used in frontend phase only should be placed in **__demo** folder with **subfolders** for each page inside **static** directory.

Any image should not be larger then 2300px in width, unless there’s a special need for it. Starter Theme comes with predefined image size 'max-width', which **should always** be used for this purpose.

    add_image_size('max-width', 2300, 9999, false);

All image sizes **should** be delared in `fws/src/Images.php` file.

## SCSS
All Components styles should be written in corresponding `.vue` file.

All Vue Components styles should be written in `.vue` files.

All global styles should be written in `assets/css` directories.
