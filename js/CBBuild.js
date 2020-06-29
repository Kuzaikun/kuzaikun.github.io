function contextSessionStoreValidation() {
    // Activate welcome processed for fallback execution
    var welcomeProccessed = true;
    botContext.setBotVariable('welcomeProccessed', welcomeProccessed, true, false);

    // Enabled Context API validation
    var success = botContext.isContextApiEnabled();
    botContext.printDebugMessage("context api enabled: " + success);

    // Retrieving previous skill data if it exists
    var skillname = botContext.getContextDataForUser("skills", "skillname");
    var skillid = botContext.getContextDataForUser("skills", "skillid");
    var previousTimestamp = botContext.getContextDataForUser("skills", "timestamp");
    // var previousTimestamp = 1581829152000;

    botContext.printDebugMessage("previous skillname: " + skillname + " previous skillid: " + skillid + ' timestamp ' + previousTimestamp);

    // Just for testing purposes!
    // var successDelete = botContext.deleteAllContextDataForUser("skills");
    // botContext.printDebugMessage("delete all context data for user scope: " + successDelete);

    // Previous data exists validation
    if (skillname != null && skillid != null && previousTimestamp != null) {
        // Valid period for opened conversation
        var currentTimestamp = new Date();
        var validPeriod = currentTimestamp.getTime() - previousTimestamp;
        var timeDifference = Math.round(validPeriod / (1000 * 60 * 60));
        botContext.printDebugMessage('<<<Diferencia de horas>>>: ' + timeDifference);
        // Valid period: 24 hours
        if (timeDifference <= 24) {
            // Escalation to previous skill
            botContext.setBotVariable('skillname', skillname, true, false);
            botContext.setBotVariable('skillid', skillid, true, false);
            botContext.printDebugMessage('-->With Previous Skill Escalation<--');
            botContext.setTriggerNextMessage('API_Transf_Agent_04');
        } else {
            // Not in the valid period, delete previous data if exists. Routing to the original Welcome dialog
            var successDelete = botContext.deleteAllContextDataForUser("skills");
            botContext.printDebugMessage("delete all context data for user scope: " + successDelete);
            validateHours('BIENVENIDA');
        }
    } else {
        // Without previous data. Routing to the original Welcome dialog
        botContext.printDebugMessage('<<<Sin datos previos de escalación>>>');
        validateHours('BIENVENIDA');
    }
}
