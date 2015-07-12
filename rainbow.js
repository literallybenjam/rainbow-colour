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

    element = document.createElement("span");
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
    element.dataset.rainbowColour = "transparent";

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

    var time_elements = element.querySelectorAll("time[datetime], *[data-rainbow-datetime]");
    var time_element;
    var datetime;
    for (var i = 0; i < time_elements.length; i++) {

        time_element = time_elements.item(i);
        if (time_element.dataset && time_element.dataset.rainbowDatetime) datetime = time_element.dataset.rainbowDatetime;
        else if (time_element.dateTime) datetime = time_element.dateTime;

        //  no dateTime attribute
        if (!datetime || time_element.hasAttribute("data-rainbow-skip") || time_element.dataset.rainbowColour !== undefined) continue;

        //  YYYY
        if (datetime.length === 4) time_element.dataset.rainbowColour = Rainbow.colours[Number(time_element.dateTime) % 8];

        //  YYYY-MM
        else if (datetime.length === 7) time_element.dataset.rainbowColour = [
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
        ][Number(datetime.substr(5,2))];

        //  YYYY-MM-DD and YYYY-MM-DDT…
        else if (datetime.length >= 10 && datetime[4] === "-") time_element.dataset.rainbowColour = Rainbow.colours[(Date.parse(datetime.substr(0,10)) / 86400000) % 8];

        //  MM-DD
        else if (datetime.length === 5 && datetime[2] === "-") time_element.dataset.rainbowColour = Rainbow.colours[(Date.parse("1970-" + datetime) / 86400000) % 8];

        //  HH:MM
        else if (datetime.length === 5 && datetime[2] === ":")  time_element.dataset.rainbowColour = Rainbow.colours[(Date.parse("1970-01-01T" + datetime) / 60000) % 8];

        //  HH:MM:SS
        else if (datetime.length === 8 && datetime[2] === ":")  time_element.dataset.rainbowColour = Rainbow.colours[(Date.parse("1970-01-01T" + datetime) / 1000) % 8];

        //  HH:MM:SS.mmm
        else if (datetime.length === 12 && datetime[2] === ":")  time_element.dataset.rainbowColour = Rainbow.colours[(Date.parse("1970-01-01T" + datetime)) % 8];

    }
    return element;

}

Rainbow.parseSites = function(element) {

    var i;
    var elements = element.querySelectorAll("a[href], *[data-rainbow-site]");
    var search_criteria;

    for (i = 0; i < elements.length; i++) {

        if (elements.item(i).dataset.rainbowColour !== undefined) continue;
        if (elements.item(i).dataset.rainbowSite !== undefined) search_criteria = elements.item(i).dataset.rainbowSite;
        else if (elements.item(i).tagName.toUpperCase() === "A") search_criteria = elements.item(i).hostname
        else continue;

        if (search_criteria.lastIndexOf(".", search_criteria.lastIndexOf(".") - 1)) search_criteria = search_criteria.substr(search_criteria.lastIndexOf(".", search_criteria.lastIndexOf(".") - 1) + 1);

        switch (search_criteria.toLowerCase()) {

            case "youtube":
            case "youtube.com":
            case "youtu.be":
                elements.item(i).dataset.rainbowColour = "red";
                break;

            case "twitter":
            case "twitter.com":
            case "t.co":
                elements.item(i).dataset.rainbowColour = "cyan";
                break;

            case "facebook":
            case "façbook":
            case "facebook.com":
                elements.item(i).dataset.rainbowColour = "blue";
                break;

            case "tumblr":
            case "tumblr.com":
                elements.item(i).dataset.rainbowColour = "blue";
                break;

            case "deviantart":
            case "da":
            case "deviantart.com":
            case "fav.me":
                elements.item(i).dataset.rainbowColour = "green";
                break;

            case "instagram":
            case "instgrm":
            case "instagram.com":
                elements.item(i).dataset.rainbowColour = "blue";
                break;

            case "vine":
            case "vine.co":
                elements.item(i).dataset.rainbowColour = "teal";
                break;

            case "wikipedia":
            case "wikipedia.org":
                elements.item(i).dataset.rainbowColour = "white";
                break;

            case "itch":
            case "itch.io":
                elements.item(i).dataset.rainbowColour = "red";
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
