## Mock AppToken

We can split this into 2 parts - Service and UseCase.

### UseCase

For each UseCase definition, we can check that the UseCase was called with appToken from our application. To do so, simply add `useCase.checkAppToken()` where `useCase` is instance of `UseCase`. You can also provide extra parameters to further validate the token likeso `useCase.checkAppToken("vendor", "app", "subapp", "asid", "awid")`. You can check more on [token validation in docs](https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-2590bf997d264d959b9d6a88ee1d0ff5/book/page?code=uuAppWorkspaceReferenceDocumentation_00).

### Service

You may also need to check that UseCase of your application was called with valid AppToken. To do so, you can initialize keys for AppToken for each of the services. Simply by calling `service.withAppToken()`. 

To actually call UseCase of your application with AppToken, you need to introduce one more module - `Client`. `Client` will _tap into TestHelper_ and by calling `Client.post` and/or `Client.get` you get the same result as by calling `TestHelper.executePostCommand` and/or `TestHelper.executeGetCommand`. To use it with AppToken from your service, create new variable `appClient = Client.signWith(serviceWithAppToken)`. Then you can call the UseCase of your application with `appClient.post("your/useCase", {dto:"in"})`