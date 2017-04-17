exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to an Alexa Skill, this is running on a deployed lambda function", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
            case "getClaims":
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`You have 3 open claims`, true),
                    {}
                  )
                )
                break;
            case "getLatestClaim":
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Your latest claim has been open last month`, true),
                    {}
                  )
                )
                break;

          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}
