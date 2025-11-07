# ReleasePlannerWeb

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Maven Integration

This Angular project is integrated with the Maven build system using the [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin).

### Building with Maven

From the root project directory, run:

```bash
mvn clean install
```

This will:
1. Install Node.js and npm locally (in the `node/` directory)
2. Install npm dependencies
3. Build the Angular application
4. Package the application

The Angular build output will be in `web/dist/release-planner-web/`.

### Maven Build Phases

- **generate-resources**: Installs Node.js, npm, and npm dependencies
- **compile**: Builds the Angular application using `ng build`

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
