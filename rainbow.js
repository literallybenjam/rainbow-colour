/* jslint asi:true, browser:true */

var Rainbow = {
    colours: ["cyan", "blue", "purple", "magenta", "red", "yellow", "green", "teal"],
    parse: undefined,
    timeParse: undefined
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

Rainbow.timeParse = function(element) {

    var time_elements = element.getElementsByTagName("TIME");
    var time_element;
    var date;
    for (var i = 0; i < time_elements.length; i++) {

        time_element = time_elements.item(i);

        //  no datetime attribute
        if (!time_element.datetime || time_element.dataset.rainbowSkip !== undefined || time_element.dataset.colour) continue;

        //  YYYY
        if (time_element.datetime.length === 4) time_element.dataset.colour = Rainbow.colours[Number(time_element.datetime) % 8];

        //  YYYY-MM
        else if (time_element.datetime.length === 7) time_element.dataset.colour = [
            "red",           //  january
            "purple",        //  february
            "cyan",          //  march
            "red-light",     //  april
            "green",         //  may
            "magenta-light", //  june
            "magenta",       //  july
            "green-light",   //  august
            "blue",          //  september
            "teal",          //  october
            "yellow",        //  november
            "teal-light"     //  december
        ][Number(time_element.datetime.substr(5,2))];

        //  YYYY-MM-DD and YYYY-MM-DDT…
        else if (time_element.datetime.length >= 10 && time_element.datetime[4] === "-") time_element.dataset.colour = Rainbow.colours[(Date.parse(time_element.datetime.substr(0,10)) / 86400000) % 8];

        //  MM-DD
        else if (time_element.datetime.length === 5 && time_element.datetime[2] === "-") time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-" + time_element.datetime) / 86400000) % 8];

        //  HH:MM
        else if (time_element.datetime.length === 5 && time_element.datetime[2] === ":")  time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-01-01T" + time_element.datetime) / 60000) % 8];

        //  HH:MM:SS
        else if (time_element.datetime.length === 8 && time_element.datetime[2] === ":")  time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-01-01T" + time_element.datetime) / 1000) % 8];

        //  HH:MM:SS.mmm
        else if (time_element.datetime.length === 12 && time_element.datetime[2] === ":")  time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-01-01T" + time_element.datetime)) % 8];

    }
    return element;

}
