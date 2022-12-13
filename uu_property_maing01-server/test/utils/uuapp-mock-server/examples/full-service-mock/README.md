## Mock Service

Here is an example of mock for whole service we want to integrate with (you can imagine uuBt being here).

Basically we prepare all the UseCases of the service, then the service itself and by export we provide it to the rest of the application (read tests).

The UseCase definition is simple, just call `UseCase.post` to mock `POST` UseCase, or `UseCase.get` to mock `GET` UseCase. We create the UseCases with functions to get new instance for each call which allows us to alter behaviour of the UseCases as we need in tests of alternative flows. We can export the _UseCase factories_ together with service to easily construct own UseCase behviour

For alternative flows, we can use just `Service.copy(fullService, alteredUc, anotherAlteredUc)`. This will create new service with all the functionality of the `fullService` but with overriden selected UseCases to handle alternative flows in our application.