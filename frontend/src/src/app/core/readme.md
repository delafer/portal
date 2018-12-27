CoreModule
All services which have to have one and only one instance per application (singleton services) should be implemented here.
Typical example can be authentication service or user service. Let’s look at an example of CoreModule implementation.

The CoreModule takes on the role of the root AppModule , but is not the module which gets bootstrapped by Angular at run-time. 
The CoreModule should contain singleton services (which is usually the case), universal components and other features where 
there’s only once instance per application. To prevent re-importing the core module elsewhere, you should also add a guard 
for it in the core module’ constructor.