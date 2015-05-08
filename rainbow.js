/* jslint asi:true, browser:true */

var Rainbow = {
    colours: ["cyan", "blue", "purple", "magenta", "red", "yellow", "green", "teal"],
    parseDocument: undefined,
    parseText: undefined
};

Rainbow.parse = function(data, starting_index) {

    var colour_index = 0;
    var i;
    var j;
    var r;
    if (!isNaN(Number(starting_index))) colour_index = Number(starting_index) % 8;
    else if (Rainbow.colours.indexOf(starting_index) !== -1) colour_index = Rainbow.colours.indexOf(starting_index);

    switch (typeof data) {

        case "string":
            r = document.createElement("SPAN");
            var final_text = "";
            for (i = 0; i < data.length; i++) {
                if (/\s/.test(data[i])) {
                    final_text += data[i];
                }
                else {
                    final_text += '<span data-colour="' + Rainbow.colours[colour_index++] + '">' + data[i] + "</span>";
                    colour_index %= Rainbow.colours.length;
                }
            }
            r.innerHTML = final_text;
            r.dataset.colour = "transparent";
            break;

        case "undefined":
        case "object":
            if (!data) data = document.body;
            else if (data instanceof Document) data = data.documentElement;
            else if (!(data instanceof Element)) break;
            var elements = data.querySelectorAll("*[data-rainbow]");
            for (i = 0; i < elements.length; i++) {
                var children = elements.item(i).childNodes;
                var element_starting_index = elements.item(i).dataset.rainbow;
                if (element_starting_index === "" || (isNaN(Number(element_starting_index)) && Rainbow.colours.indexOf(starting_index) !== -1)) element_starting_index = colour_index;
                for (j = 0; j < children.length; j++) {
                    if (children.item(j).nodeType !== 3) continue;
                    elements.item(i).replaceChild(Rainbow.parse(children.item(j).textContent, element_starting_index), children.item(j));
                }
            }
            r = data;
            break;

    }

    return r;

}
