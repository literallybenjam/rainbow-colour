#  RAINBOW  #

A CSS colour palette providing a rainbow of colours.

##  Basic usage:  ##

To use the colours provided in RAINBOW, set the `data-rainbow-colour` and the `data-rainbow-background` attribute on an element to one or more colour-values (explained below).

In addition, the `data-rainbow-theme` attribute can be used to switch between a `light` and `dark` appearance; by default, the `light` appearance is used.

The `data-rainbow-accent` attribute sets the accent colour of a page; this must be one of the eight primary colours.
If not set, the accent colour will be grey.

`data-rainbow-theme` and `data-rainbow-accent` only have an effect when used on the root element.

```html
<!DOCTYPE html>
<html data-rainbow-theme="light" data-rainbow-accent="red">
    <head>
        <title>Sample #2</title>
        <link rel="stylesheet" type="text/css" href="rainbow.css">
    </head>
    <body>
        lighter text on a dim background
    </body>
</html>
```

##  Colour-values:  ##

There are eight colours available for use in RAINBOW:

`cyan` `blue` `purple` `magenta` `red` `yellow` `green` `teal`

Each colour may be suffexed with `-light` or `-dark` to lighten or darken it.
Other suffixes will not affect the colour.

There are also eight greys in RAINBOW:

`white` `bright` `light` `medium` `regular` `dark`  `dim` `black`

Finally, there are a few extra colour-values which you can use in RAINBOW:

`transparent` `inherit`

These correspond to their values in CSS.

##  CSS transitions:  ##

You can apply a CSS transition to an element with `data-rainbow-transition`.
This is the default behaviour for links.
(Note that this may override transitions set elsewhere!)

Transitions require browser support of the `transition` CSS property.

##  ::before and ::after:  ##

By default, RAINBOW styles ::before and ::after pseudo-elements.
You can disable this with the following CSS code:

```css
*:root:root:root:root *::before, *:root:root:root:root *::after {
    color: inherit;
}
```

(The `*:root:root:root:root` is required to give the code proper specificity.)

##  Classes:  ##

You can use the following classes to mimic the settings for certain elements:

`rainbow-accent` `rainbow-code` `rainbow-emphasis` `rainbow-heading` `rainbow-link` `rainbow-mark` `rainbow-secondary` `rainbow-strong`

##  RAINBOW.js:  ##

By including `rainbow.js` in your document, you can use the `Rainbow.parse(text, starting_index)` and `Rainbow.parse(element, starting_index)` functions.
RAINBOW.js uses `Element.querySelectorAll` for element parsing; this is supported in all modern browsers but may be unavailable in some older ones.

###  Rainbow.ify(text, starting_index)  ###

`Rainbow.ify(text, starting_index)` will return a `<span>` element containing the given `text` in a rainbow, with the first colour defined by `starting_index`.
The value for `text` must be a string.
The value for `starting_index` must a value from the following array:

```js
["cyan", "blue", "purple", "magenta", "red", "yellow", "green", "teal"]
```

(You can alternatively use the numeric index of the desired colour.)
If `starting_index` is not specified or not valid, it will be assumed to be 0.
As an example, `Rainbow.ify("hi :)", "red");` will return a `<span>` element with the following `outerHTML`:

```html
<span data-rainbow-colour="transparent"><span data-rainbow-colour="red">h</span><span data-rainbow-colour="yellow">i</span> <span data-rainbow-colour="green">:</span><span data-rainbow-colour="teal">)</span></span>
```

Note that whitespace is left unmodified.

###  Rainbow.parseRainbows(element)  ###

`Rainbow.parseRainbows(element)` parses the given `element` (`document.body` if not specified) by running `Rainbow.ify(text, starting_index)` on the text nodes of every element with the `data-rainbow` attribute set, and replacing them with the result.
The value of `data-rainbow` is used to determine the `starting_index`, above.

The return value of `Rainbow.parseRainbows()` is the element which was parsed.

Note that `Rainbow.parseRainbows()` will *only* parse text node children of elements with `data-rainbow` set; it will *not* parse element children.
This not only allows for faster parsing, but also prevents parsing the same element multiple times should `Rainbow.parseRainbows()` be called more than once.

The `data-rainbow-skip` attribute can be used to make the parser skip over a given element.

###  Rainbow.parseTimes(element)  ###

`Rainbow.parseTimes(element)` parses the given `element` by finding every `<time datetime>` descendant and assigning a colour based on its date.
It will also parse elements for which the `data-rainbow-datetime` attribute is set; this has preference when set on a `<time>` element.
This is based on a complicated process that depends on the format of the date provided; for example, YYYY-MM assigns colours based on the month, but YYYY-MM-DD assigns colours based on the day.
`Rainbow.parseTimes()` does not assign a colour to `datetime` strings that consist of durations or which are solely time-zone offsets.

The return value of `Rainbow.parseTimes()` is the element which was parsed.

The `data-rainbow-skip` attribute can be used to make the parser skip over a given element.
Similarly, `Rainbow.parseTimes()` will not change the `data-colour` attribute on an element for which it has already been set.

###  Rainbow.parseSites(element)  ###

`Rainbow.parseSites(element)` parses the given `element` by finding every `<a href>` descendant and assigning a colour based on the referent of its `href` attribute.
The following sites are supported:

| site       | colour  |
| :--------- | :-----: |
| youtube    | red     |
| twitter    | cyan    |
| facebook   | blue    |
| tumblr     | blue    |
| deviantart | green   |
| instagram  | blue    |
| vine       | teal    |
| wikipedia  | black   |
| google     | rainbow |
| bitly      | red     |
| itch.io    | red     |
| github     | black   |
| medium     | black   |

The return value of `Rainbow.parseSites()` is the element which was parsed.

You can simulate the appearance of a site by setting the `data-rainbow-site` attribute to one of the above values.
Note that `Rainbow.parseSites()` is not case-sensitive, and subdomains are not checked.
The `data-rainbow-skip` attribute can be used to make the parser skip over a given element.
Similarly, `Rainbow.parseSites()` will not change the `data-colour` attribute on an element for which it has already been set.

###  Rainbow.parseAll(element)  ###

`Rainbow.parseAll(element)` parses the given `element` by running `Rainbow.parseRainbows()`, `Rainbow.parseTimes()`, and `Rainbow.parseSites()` on it.

The return value of `Rainbow.parseAll()` is the element which was parsed.

##  Endmatter:  ##

RAINBOW was coded by [@literallybenjam](https://twitter.com/literallybenjam).
It is licensed under [the Unlicense](http://unlicense.org/UNLICENSE).
