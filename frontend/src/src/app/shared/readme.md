All the “dumb” components and pipes should be implemented here. These components don’t import and inject services
from core or other features in their constructors. They should receive all data though attributes in the template 
of the component using them. This all sums up to the fact that SharedModule doesn’t have any dependency to the 
rest of our application.

The shared folder will contain the individual features that your app will have. These features will ideally 
be directives or pipes that you will want to reuse on multiple pages.

The SharedModule is where any shared components, pipes/filters and services should go. The SharedModule can 
be imported in any other module when those items will be re-used. The shared module shouldn’t have any 
dependency to the rest of the application and should therefore not rely on any other module.