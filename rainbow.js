/* jslint asi:true, browser:true */

var Rainbow = {
    colours: ["cyan", "blue", "purple", "magenta", "red", "yellow", "green", "teal"],
    parseRainbows: undefined,
    parseSites: undefined,
    parseTimes: undefined
};

Rainbow.ify = function(text, starting_index) {

    var colour_index = 0;
    var i;
    var element;
    if (!isNaN(Number(starting_index))) colour_index = Number(starting_index) % 8;
    else if (Rainbow.colours.indexOf(starting_index) !== -1) colour_index = Rainbow.colours.indexOf(starting_index);

    element = document.createElement("SPAN");
    var final_text = "";
    for (i = 0; i < text.length; i++) {
        if (/\s/.test(text[i])) {
            final_text += text[i];
        }
        else {
            final_text += '<span data-colour="' + Rainbow.colours[colour_index++] + '">' + text[i] + "</span>";
            colour_index %= Rainbow.colours.length;
        }
    }
    element.innerHTML = final_text;
    element.dataset.colour = "transparent";

    return element;

}

Rainbow.parseRainbows = function(element) {
    var i;
    var j;
    if (!element) element = document.body;
    else if (element instanceof Document) element = element.documentElement;
    else if (!(element instanceof Element) || element.hasAttribute("data-rainbow-skip")) return;
    var elements = element.querySelectorAll("*[data-rainbow]");
    for (i = 0; i < elements.length; i++) {
        var children = elements.item(i).childNodes;
        for (j = 0; j < children.length; j++) {
            if (children.item(j).nodeType !== 3) continue;
            elements.item(i).replaceChild(Rainbow.ify(children.item(j).textContent, elements.item(i).dataset.rainbow), children.item(j));
        }
    }
    return element;
}

Rainbow.parseTimes = function(element) {

    var time_elements = element.getElementsByTagName("TIME");
    var time_element;
    var date;
    for (var i = 0; i < time_elements.length; i++) {

        time_element = time_elements.item(i);

        //  no dateTime attribute
        if (!time_element.dateTime || time_element.hasAttribute("data-rainbow-skip") || time_element.dataset.colour !== undefined) continue;

        //  YYYY
        if (time_element.dateTime.length === 4) time_element.dataset.colour = Rainbow.colours[Number(time_element.dateTime) % 8];

        //  YYYY-MM
        else if (time_element.dateTime.length === 7) time_element.dataset.colour = [
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
        ][Number(time_element.dateTime.substr(5,2))];

        //  YYYY-MM-DD and YYYY-MM-DDT…
        else if (time_element.dateTime.length >= 10 && time_element.dateTime[4] === "-") time_element.dataset.colour = Rainbow.colours[(Date.parse(time_element.dateTime.substr(0,10)) / 86400000) % 8];

        //  MM-DD
        else if (time_element.dateTime.length === 5 && time_element.dateTime[2] === "-") time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-" + time_element.dateTime) / 86400000) % 8];

        //  HH:MM
        else if (time_element.dateTime.length === 5 && time_element.dateTime[2] === ":")  time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-01-01T" + time_element.dateTime) / 60000) % 8];

        //  HH:MM:SS
        else if (time_element.dateTime.length === 8 && time_element.dateTime[2] === ":")  time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-01-01T" + time_element.dateTime) / 1000) % 8];

        //  HH:MM:SS.mmm
        else if (time_element.dateTime.length === 12 && time_element.dateTime[2] === ":")  time_element.dataset.colour = Rainbow.colours[(Date.parse("1970-01-01T" + time_element.dateTime)) % 8];

    }
    return element;

}

Rainbow.parseSites = function(element) {

    var i;
    var elements = element.querySelectorAll("a[href], *[data-rainbow-site]");
    var search_criteria;

    for (i = 0; i < elements.length; i++) {

        if (elements.item(i).dataset.colour !== undefined) continue;
        if (elements.item(i).dataset.site !== undefined) search_criteria = elements.item(i).dataset.site;
        else if (elements.item(i).tagName.toUpperCase() === "A") search_criteria = elements.item(i).hostname
        else continue;

        if (search_criteria.lastIndexOf(".", search_criteria.lastIndexOf(".") - 1)) search_criteria = search_criteria.substr(search_criteria.lastIndexOf(".", search_criteria.lastIndexOf(".") - 1) + 1);

        switch (search_criteria.toLowerCase()) {

            case "youtube":
            case "youtube.com":
            case "youtu.be":
                elements.item(i).dataset.colour = "red";
                break;

            case "twitter":
            case "twitter.com":
            case "t.co":
                elements.item(i).dataset.colour = "cyan";
                break;

            case "facebook":
            case "façbook":
            case "facebook.com":
                elements.item(i).dataset.colour = "blue";
                break;

            case "tumblr":
            case "tumblr.com":
                elements.item(i).dataset.colour = "blue";
                break;

            case "deviantart":
            case "da":
            case "deviantart.com":
            case "fav.me":
                elements.item(i).dataset.colour = "green";
                break;

            case "instagram":
            case "instgrm":
            case "instagram.com":
                elements.item(i).dataset.colour = "blue";
                break;

            case "vine":
            case "vine.co":
                elements.item(i).dataset.colour = "teal";
                break;

            case "wikipedia":
            case "wikipedia.org":
                elements.item(i).dataset.colour = "white";
                break;

            case "google":
            case "google.com":
            case "goo.gl":
                elements.item(i).dataset.rainbow = "blue";
                break;

            case "bitly":
            case "bit.ly":
                elements.item(i).dataset.rainbow = "red";
                break;

        }


    }

    return element;

}

Rainbow.parseAll = function(element) {
    return Rainbow.parseRainbows(Rainbow.parseSites(Rainbow.parseTimes(element)));
}
