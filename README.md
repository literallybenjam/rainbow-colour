#  RAINBOW  #

A CSS colour palette providing a rainbow of colours

##  BASIC USAGE  ##

To use the colours provided in RAINBOW, set the `data-colour` or the `data-colour-background` attribute on an element to one or more colour-values (explained below).

Setting these attributes on the root element of the page may have a special effect on descendant elements in order to create a clearer and more cohesive style; as such, specifying a `data-colour` and a `data-colour-background` for the root element is highly recommended.
You can use the `data-colour-accent` attribute to set the accent colour of a page; this only has an effect when used on the root element.

```html
<!DOCTYPE html>
<html data-colour="light" data-colour-background="dim" data-colour-accent="red">
    <head>
        <title>Sample #2</title>
        <link rel="stylesheet" type="text/css" href="rainbow.css">
    </head>
    <body>
        lighter text on a dim background
    </body>
</html>
```

##  COLOUR-VALUES  ##

There are eight colours available for use in RAINBOW:

`cyan` `blue` `purple` `magenta` `red` `yellow` `green` `teal`

Each colour may be suffexed with `-light` or `-dark` to lighten or darken it.
Other suffixes will not affect the colour.

There are also eight greys in RAINBOW:

`white` `bright` `light` `medium` `regular` `dark`  `dim` `black`

Finally, there are a few extra colour-values which you can use in RAINBOW:

`transparent` `inherit`

These correspond to their values in CSS.

##  CSS TRANSITIONS  ##

You can apply a CSS transition to an element with `data-colour-transition`.
This is the default behaviour for links.
(Note that this may override transitions set elsewhere!)

Transitions require browser support of the `transition` CSS property.

##  CLASSES  ##

You can use the following classes to mimic the settings for certain elements:

`colour-accent` `colour-code` `colour-emphasis` `colour-heading` `colour-link` `colour-mark` `color-secondary` `colour-strong`
