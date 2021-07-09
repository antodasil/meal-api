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

    async loadRoutes(app: Express, filePath?: string): Promise<boolean> {

        // Liste des routes
        let routes: Route[] = this.getRoutesFromFile(filePath);
        for(const route of routes) {

            // Si route incomplète, on l'ignore
            if(!route.name || !route.path || !route.controller) {
                console.log('Route ignored: Route ' + route.name ? route.name : route.path + ' incomplete');
                continue;
            }

            // On supprime le '/' de fin s'il y en a un 
            if(route.path.endsWith('/')) {
                route.path = route.path.slice(0, route.path.length-1);
            }

            // On charge le controller
            let module = await import(process.cwd() + '\\out\\controllers\\' + route.controller + '.controller.js');
            let controller: BaseController = module?.controller;

            // Création des routes pour ce controller
            if(!controller) {
                console.log('Route ignored: Controller ' + route.controller + ' not found');
                continue;
            }

            if(controller.get) {
                app.get(route.path + '/:id?', controller.get);
            }
            
            if(controller.post) {
                app.post(route.path, controller.post);
            }
            
            if(controller.put) {
                app.put(route.path + '/:id?', controller.put);
            }
            
            if(controller.patch) {
                app.patch(route.path + '/:id?', controller.patch);
            }
            
            if(controller.delete) {
                app.delete(route.path + '/:id?', controller.delete);
            }
        }
        return true;
    }

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
}