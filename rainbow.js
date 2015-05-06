/* jslint asi:true, browser:true */

var Rainbow = {
    colours: ["cyan", "blue", "purple", "magenta", "red", "yellow", "green", "teal"],
    parseDocument: undefined,
    parseText: undefined
};

Rainbow.parseText = function(text, starting_index) {
    var span = document.createElement("SPAN");
    span.dataset.colour = "transparent";
    var final_text = "";
    var i;
    var colour_index = 0;
    if (!isNaN(Number(starting_index))) colour_index = Number(starting_index) % 8;
    else if (Rainbow.colours.indexOf(starting_index) !== -1) colour_index = Rainbow.colours.indexOf(starting_index);
    for (i = 0; i < text.length; i++) {
        if (/\s/.test(text[i])) {
            final_text += text[i];
        }
        else {
            final_text += '<span data-colour="' + Rainbow.colours[colour_index++] + '">' + text[i] + "</span>";
            colour_index %= Rainbow.colours.length;
        }
    }
    span.innerHTML = final_text;
    return span;
}

Rainbow.parseDocument = function(document) {
    if (!document) document = window.document;
    var elements = document.querySelectorAll("*[data-rainbow]");
    var i;
    var j;
    for (i = 0; i < elements.length; i++) {
        var children = elements.item(i).childNodes;
        for (j = 0; j < children.length; j++) {
            if (children.item(j).nodeType !== 3) continue;
            elements.item(i).replaceChild(Rainbow.parseText(children.item(j).textContent, elements.item(i).dataset.rainbow), children.item(j));
        }
    }
}
