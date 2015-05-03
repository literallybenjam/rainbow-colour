#  RAINBOW  #

A CSS colour palette providing a rainbow of colours

##  BASIC USAGE  ##

To use the colours provided in RAINBOW, set the `data-colour` attribute on an element to one or more colour-values (explained below).

The `data-colour` attribute normally just changes the text colour, but when applied to the root element it is used to manipulate the overall look of the page. For example, in

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Sample #1</title>
        <link rel="stylesheet" type="text/css" href="rainbow.css">
    </head>
    <body data-colour="dim">
        dim text on the default background
    </body>
</html>
```

the text-color of the page is set to `dim`, but in

```html
<!DOCTYPE html>
<html data-colour="dim">
    <head>
        <title>Sample #2</title>
        <link rel="stylesheet" type="text/css" href="rainbow.css">
    </head>
    <body>
        lighter text on a dim background
    </body>
</html>
```

the background of the page is set to `dim`, and the text-color of the page is a light grey. You can use the `data-colour-accent` attribute to set the accent colour of a page; this only has an effect when used on the root element.

##  COLOUR-VALUES  ##

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
