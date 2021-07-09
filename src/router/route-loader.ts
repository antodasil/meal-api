import { Express } from 'express-serve-static-core';
import fs from 'fs';
import { BaseController } from '../controllers/base.controller';

interface Route {
    name: string;
    path: string;
    controller: string;
}

class RouteLoaderError extends Error {
    name = 'RouteLoaderError';
}

export class RouteLoader {

    /** Charge les routes depuis un fichier */
    async loadRoutes(app: Express, filePath?: string): Promise<boolean> {

        // Liste des routes
        let routes: Route[] = this.getRoutesFromFile(filePath);
        for(const route of routes) {

            // Si route incomplète, on l'ignore
            if(!route.name || !route.path || !route.controller) {
                console.log('Route ignored: Route ' + route.name ? route.name : route.path + ' incomplete');
                continue;
            }

            // On récupère le controller
            let controller: BaseController = await this.loadRouteController(route);

            // Création des routes pour ce controller
            if(!controller) {
                console.log('Route ignored: Controller ' + route.controller + ' not found');
                continue;
            }
            this.createRoutesFromController(app, route.path, controller);
        }
        return true;
    }

    /** Obtient la liste des routes décritent dans le fichier donné */
    private getRoutesFromFile(filePath: string = '\\config\\routes.json'): Route[] {
        let routes: Route[];

        try {
            let rawRoutes = fs.readFileSync(process.cwd() + filePath, {encoding: 'utf8'});
            routes = JSON.parse(rawRoutes).routes;
        } catch(error) {
            if(error instanceof Error) {
                throw new RouteLoaderError(error.message);
            }
            throw new RouteLoaderError(error);
        }
        
        if(!routes) {
            throw new RouteLoaderError('No route in file');
        }

        return routes;
    }

    /** initialise le controller de la route */
    private async loadRouteController(route: Route): Promise<any> {

        // On charge le controller
        let module = await import(process.cwd() + '\\out\\controllers\\' + route.controller + '.controller.js');
        return module?.controller;
    }

    /** Créé les routes pour chaque méthode du controller */
    private createRoutesFromController(app: Express, path: string, controller: BaseController): void {

        // On supprime le '/' de fin s'il y en a un 
        if(path.endsWith('/')) {
            path = path.slice(0, path.length-1);
        }

        if(controller.get) {
            app.get(path + '/:id?', controller.get);
        }
        
        if(controller.post) {
            app.post(path, controller.post);
        }
        
        if(controller.put) {
            app.put(path + '/:id?', controller.put);
        }
        
        if(controller.patch) {
            app.patch(path + '/:id?', controller.patch);
        }
        
        if(controller.delete) {
            app.delete(path + '/:id?', controller.delete);
        }
    }
}