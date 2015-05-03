#  RAINBOW  #

A CSS colour palette providing a rainbow of colours

##  BASIC USAGE  ##

To use the colours provided in RAINBOW, set the `data-colour` attribute on an element to one or more colour type-value pairs (explained below).

In addition, you can apply the following rules to the root element of the document to further specify colours (these will be automatically selected based on the `data-colour` of the root element if you don't specify them):

- `data-colour-code` : Sets the colour for the following elements:
    - `<code>`
    - `<pre>`
- `data-colour-heading` : Sets the colour for the following elements:
    - `<caption>`
    - `<h1>`
    - `<h2>`
    - `<h3>`
    - `<h4>`
    - `<h5>`
    - `<h6>`
    - `<heading>`
    - `<th>`
    - `<thead>`
- `data-colour-link` : Sets the link colour (requres `href` attribute to be set)
- `data-colour–link–active` : Sets the link active colour
- `data-colour–link–hover` : Sets the link hover colour
- `data-colour–link–visited` : Sets the link visited colour
- `data-colour-mark` : Sets the `<mark>` colour
- `data-colour-secondary` : Sets the colour for the following elements:
    - `<aside>`
    - `<figcaption>`
    - `<footer>`
    - `<small>`
- `data-colour-strong-accent` : Sets the colour for the following elements:
    - `<dfn>`
    - `<strong>`
- `data-colour-weak-accent` : Sets the colour for the following elements:
    - `<b>`
    - `<cite>`
    - `<em>`
    - `<i>`
    - `<time>`
    - `<u>`

##  TYPE-VALUE PAIRS  ##

The syntax for a type-value pair is as follows:

`COLOUR-TYPE:COLOUR-VALUE`

Multiple type-value pairs can be used at once; these should be separated by whitespace.

###  COLOUR-TYPES  ###

The following colour-types are available:

- `text` : sets `color`
- `background` : sets `background-color`
- `border` : sets `border-color`
- `outline` : sets `outline-color`
- `decoration` : sets `text-decoration-color`
- `emphasis` : sets `text-emphasis-color` (not supported by most browsers)
- `selection-text` : sets `color` when the element is matched by `::selection`
- `selection-background` : sets `background-color` when the element is matched by `::selection`
- `selection-outline` : sets `outline-color` when the element is matched by `::selection`
- `selection-decoration` : sets `text-decoration-color` when the element is matched by `::selection`
- `selection-emphasis` : sets `text-emphasis-color` when the element is matched by `::selection`
- `fill` : sets `fill` (for use with SVG)
- `stroke` : sets `stroke` (for use with SVG)

These may be suffixed with `-before` or `-after` to affect the colour of those pseudo-elements.

###  COLOUR-VALUES  ###

There are eight colour-values available for use in RAINBOW:

`cyan` `blue` `purple` `magenta` `red` `yellow` `green` `teal`

Each colour-value may be suffexed with `-light` or `-dark` to lighten or darken the colour. Other suffixes will not affect the colour.

There are also eight greys in RAINBOW:

`white` `bright` `light` `medium` `regular` `dark`  `dim` `black`

Finally, there are a few extra colour-values which you can use in RAINBOW:

`transparent` `inherit`

These correspond to their values in CSS.

##  CSS TRANSITIONS  ##

You can apply a CSS transition to an element with `data-colour-transition`. This is the default behaviour for links. (Note that this may override transitions set elsewhere!)

Transitions require browser support of the `transition` CSS property.

##  CLASSES  ##

You can use the following classes to mimic the settings for certain elements:

`colour-code` `colour-heading` `colour-link` `colour-mark` `colour-secondary` `colour-strong-accent` `colour-weak-accent`
