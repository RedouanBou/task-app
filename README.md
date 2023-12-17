# Task App

Dit repository bevat een Angular-project dat lokaal kan worden ontwikkeld met de hulp van JSON Server. JSON Server is een eenvoudige REST API-server die wordt gebruikt om een tijdelijke backend voor ontwikkelingsdoeleinden te simuleren.

## Vereisten

Zorg ervoor dat je de volgende software geïnstalleerd hebt:

- [Node.js](https://nodejs.org/) (LTS-versie wordt aanbevolen)
- [Angular CLI](https://angular.io/cli) (geïnstalleerd met `npm install -g @angular/cli`)
- [JSON Server](https://github.com/typicode/json-server) (geïnstalleerd met `npm install -g json-server`)

## Aan de slag

1. **Kloon dit repository:**

    ```bash
    git clone https://github.com/RedouanBou/task-app.git
    cd task-app
    ```

2. **Installeer afhankelijkheden:**

    ```bash
    npm install
    ```

3. **Start JSON Server:**

    ```bash
    json-server --watch db.json --port 3000
    ```

    Hierbij is `db.json` het bestand dat de gegevens voor de REST API bevat.

4. **Start de Angular-applicatie:**

    Open een nieuw terminalvenster en voer het volgende uit:

    ```bash
    ng serve
    ```

5. **Bekijk de applicatie:**

    Open je webbrowser en navigeer naar [http://localhost:4200/](http://localhost:4200/) om de Angular-app te bekijken.