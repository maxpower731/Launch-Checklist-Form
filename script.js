// Write your JavaScript code here!
window.onload = function(){
   let launchAPI = "https://handlers.education.launchcode.org/static/planets.json";
   fetch(launchAPI).then(function(response){
      response.json().then(function(destinations){
         const missionTarget = document.getElementById("missionTarget");
         const planet = Math.floor(Math.random() * destinations.length); //Randomly select destination each time page loads
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${destinations[planet].name}</li>
               <li>Diameter: ${destinations[planet].diameter}</li>
               <li>Star: ${destinations[planet].star}</li>
               <li>Distance from Earth: ${destinations[planet].distance}</li>
               <li>Number of Moons: ${destinations[planet].moons}</li>
            </ol>
            <img src="${destinations[planet].image}">`;
      });
   });

   let launchForm = document.getElementById("launchForm");
   launchForm.addEventListener("submit", function(event){
      event.preventDefault();
      const textBoxes = document.querySelectorAll("input");
      const pilotName = document.getElementsByName("pilotName")[0]["value"];
      const copilotName = document.getElementsByName("copilotName")[0]["value"];
      const fuelLevel = document.getElementsByName("fuelLevel")[0]["value"];
      const cargoMass = document.getElementsByName("cargoMass")[0]["value"];
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let alertsArr = [];
      let readyStatus = true;

      //Checks if all text boxes have been filled and alerts if any missing
      for (let input of textBoxes) {
         if(input["value"] === "") {
            alertsArr.push("Must enter all information in text boxes to continue.");
            break;
         };
      };

      //Validate inputs (Regex would be the right way to do this...but this works for now)
      if (!isNaN(Number(pilotName)) && pilotName !== "") {
         alertsArr.push("Pilot name must be a string.");
      };

      if (!isNaN(Number(copilotName)) && copilotName !== "") {
         alertsArr.push("Co-pilot name must be a string.");
      };

      if (isNaN(Number(fuelLevel))) {
         alertsArr.push("Fuel Level must be a numeric value.");
      };

      if (isNaN(Number(cargoMass))) {
         alertsArr.push("Cargo Mass must be a numeric value.");
      };

      //Update pilot and co-pilot name in faultyItems element
      pilotStatus.innerHTML = `Pilot ${pilotName} Ready`;
      copilotStatus.innerHTML = `Co-pilot ${copilotName} Ready`;

      //Check fuel level
      if (fuelLevel < 10000) {
         fuelStatus.innerHTML = "Not enough fuel for the journey";
         readyStatus = false;
      } else {
         fuelStatus.innerHTML = "Fuel level high enough for launch";
      };

      //Check cargo mass
      if (cargoMass > 10000) {
         cargoStatus.innerHTML = "Too much mass for the shuttle to take off";
         readyStatus = false;
      } else {
         cargoStatus.innerHTML = "Cargo mass low enough for launch"
      };

      //Check for alerts and display checklist
      if(alertsArr.length === 0) {
         if (!readyStatus) {
            faultyItems.style.visibility = "visible";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
         } else {
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
            faultyItems.style.visibility = "hidden";
            launchForm.style.display = "none"; //Added this to make the form disappear... seemed fun
         };
      } else {
         alertsArr[0] = "- " + alertsArr[0];
         alert(alertsArr.join("\n- "));
      };
   });
};
