const Anipresence = new Presence({
    clientId: "877640464151494676" //The client ID of the Application created at https://discordapp.com/developers/applications
}),
    control = Anipresence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
        //You can use this to get translated strings in their browser language
    }),

/*

function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(myOutsideHe: string | number: string | numberavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/
 template: PresenceData = {
    largeImageKey:
        "icon" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageKey:
        "key" /*The key (file name) of the Small Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageText: "Some hover text", //The text which is displayed when hovering over the small image
    details: "Browsing Page Name", //The upper section of the presence text
    state: "Reading section A", //The lower section of the presence text
    startTimestamp: 1577232000, //The unix epoch timestamp for when to start counting from
    endTimestamp: 1577151472000 //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
}, /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

 browsingStamp = Math.floor(Date.now() / 1000);

Anipresence.on("UpdateData", async () => {

    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
      It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
    const presenceData: PresenceData = {
        largeImageKey:
            "icon"
    };

    if (document.location.hostname === "anistream.de") {
        if (document.location.pathname === "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Startseite";
        } else if (document.location.pathname.includes("/serie/")) {

            /*presenceData.startTimestamp = browsingStamp;*/

            const epNr = document.querySelector(".tab-pane.show.active > .active > .episode");
            epName = document.querySelector(".tab-pane.show.active > .active > .name");


            if (epName && epNr) {
                presenceData.details = epName.innerHTML;
                presenceData.state = epNr.innerHTML;
            } else {
                const title = document.querySelector("h1");
                presenceData.details = title.innerText;
                const staffel = document.querySelector(".nav-link.active");
                presenceData.state = staffel.innerHTML;
            }

        }
    }

    if (presenceData.details === null) {
        //This will fire if you do not set presence details
        Anipresence.setTrayTitle(); //Clears the tray title for mac users
        Anipresence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
        //This will fire if you set presence details
        Anipresence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});