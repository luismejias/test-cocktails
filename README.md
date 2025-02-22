# TestCocktails

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.2.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


# Architecture
src/
├─ core/            # Core services and modules
├─ features/        # Feature-specific modules and components
├─ shared/          # Shared components, pipes, and utilities
└─ app.module.ts    # Main module



# Benefits of This Architecture

✅ **Modularity:** Clear separation between `core/`, `features/`, and `shared/` directories.  
✅ **Standalone Components:** Enhances performance and simplifies imports.  
✅ **State Management:** Utilizes NgRx to maintain state .  
✅ **Service Best Practices:** The `cocktail.service.ts` encapsulates API calls effectively.  
✅ **Accessibility & UX:** Leverages Angular Material for a polished user interface.  
✅ **Testing:** Simplifies dependency injection and mocking with Jest.  

---

## 🚀 How to Get Started

**Clone the Repository:**  
git clone https://github.com/luismejias/test-cocktails.git

**Chown directory:** 
cd test-cocktails

**Install Dependencies:**
npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# test-cocktails
