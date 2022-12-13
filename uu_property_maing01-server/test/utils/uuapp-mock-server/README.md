# uuapp-mock-server
Implementation of mock server to test integration of uuApps

## What is this for?

When your application integrates with another application (service) you do not want to call the service during tests. Your tests should be fast so you can execute them with every change in your code. The longer the test takes the less you want to execute it ... the more problems you are fixing once you actually execute it.

This suppose to mock the external services you integrate with to provide your app with expected responses without need to actually call the live service. You are not limited by your internet connection and/or load of the live service. The responses are almost instant which help to speed up the tests.

## What is in?

The package consists of few modules

### Server

Basic functionality that starts and stops web server to simulate service of your choice. `Server` module provides `start` and `stop` interface methods.

### Service

Defines new service running in started server. Every service runs in separated namespace - you can define as many services as you need while none of them interfere with each other. Services can even use own AppToken so you can sign calls of your application with genuine AppToken to check full implementation while doing no step backs.

Service is defined by name and its UseCases (endpoints). You can define multiple services with same name if you need to. `Service` provides you with `create` and `copy` interface. Instance of Service then provides `getGateway`, `getUc`, `addUc`, `hasAppToken`, `withAppToken`, `getProduct` and `getAwid`. More description later on ;)

### UseCase

By now we have Server running, service ready (you can think of it more like a namespace) but we still have to define behaviour of the services. Here comes the `UseCase` module. Basically it defines endpoint address, HTTP method (`POST` and `GET` available) and the response when it is called. For use with uuApps, it also provides you with possibility to validate input data with validation schemas and ensure that it was called with valid AppToken. `UseCase` provides `get` and `post` interface to define `GET` and `POST` UseCase respectivly. Instance of UseCase can be fine tuned with `withValidationSchema`, `checkAppToken`, `returns`, `returnsCallback` and `throws` to simulate error.

### Client

Last part is more like a helper. `Client` module provides interface to execute "application-in-test" commands with AppToken as original implementation from `TestHelper` wont let you. 

## Interface Description

TBD