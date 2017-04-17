let helloAlexaResponseFunction = (intent, session, response) => {
	response.tell(SPEECH_OUT);
}
GreaterService.prototype.eventHandlers.onLaunch = helloAlexaResponseFunction;
GreaterService.prototype.intentHandlers = {
	"HelloAlexaIntent": helloAlexaResponseFunction
}