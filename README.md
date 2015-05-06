#  RAINBOW  #

A CSS colour palette providing a rainbow of colours

##  BASIC USAGE  ##

To use the colours provided in RAINBOW, set the `data-colour` or the `data-colour-background` attribute on an element to one or more colour-values (explained below).

Setting these attributes on the root element of the page may have a special effect on descendant elements in order to create a clearer and more cohesive style; as such, specifying a `data-colour` and a `data-colour-background` for the root element is highly recommended.
You can use the `data-colour-accent` attribute to set the accent colour of a page; this only has an effect when used on the root element. **This is not yet supported, but coming soon!**

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

##  RAINBOW.js  ##

By including `rainbow.js` in your document, you can use the `Rainbow.parseText(text, starting_index)` and `Rainbow.parseDocument(document)` functions.

###  Rainbow.parseText()  ###

`Rainbow.parseText(text, starting_index)` will return a `<span>` element containing the given `text` in a rainbow, with the first colour defined by `starting_index`.
The value for `starting_index` must a value from the following array:

```js
["cyan", "blue", "purple", "magenta", "red", "yellow", "green", "teal"]
```

(You can alternatively use the numeric index of the desired colour.)
If `starting_index` is not specified or not valid, it will be assumed to be 0.
As an example, `Rainbow.parseText("hi :)", "red");` will return a `<span>` element with the following `outerHTML`:

```html
<span><span data-colour="red">h</span><span data-colour="yellow">i</span> <span data-colour="green">:</span><span data-colour="teal">)</span></span>
```

Note that whitespace is left unmodified.

###  Rainbow.parseDocument()  ###

`Rainbow.parseDocument(document)` parses the given `document` (`window.document` if not specified) by running `Rainbow.parseText()` on the text nodes of every element with the `data-rainbow` attribute set, and replacing them with the result.
The value of `data-rainbow` is used to determine the `starting_index`, above.

## Endmatter:

RAINBOW was coded by [@literallybenjam](https://twitter.com/literallybenjam).
It is licensed under [the Unlicense](http://unlicense.org/UNLICENSE).
