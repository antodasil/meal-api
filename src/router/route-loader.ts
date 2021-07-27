import { Router } from "express-serve-static-core";
import express from "express";
import fs from "fs";
import path from "path";
import { BaseController } from "../controllers/base.controller";

interface Route {
  name: string;
  path: string;
  controller: string;
}

class RouteLoaderError extends Error {
  name = "RouteLoaderError";
}

export class RouteLoader {
  /** Charge les routes depuis un fichier */
  async getRouter(filePath?: string): Promise<Router> {
    const router = express.Router();

    // Liste des routes
    let routes: Route[] = this.getRoutesFromFile(filePath);
    for (const route of routes) {
      // Si route incomplète, on l'ignore
      if (!route.name || !route.path || !route.controller) {
        console.log(
          "Route ignored: Route " + route.name
            ? route.name
            : route.path + " incomplete"
        );
        continue;
      }

      // On récupère le controller
      let controller: BaseController = await this.loadRouteController(route);

      // Création des routes pour ce controller
      if (!controller) {
        console.log(
          "Route ignored: Controller " + route.controller + " not found"
        );
        continue;
      }
      this.createRoutesFromController(router, route.path, controller);
    }

    return router;
  }

  /** Obtient la liste des routes décritent dans le fichier donné */
  private getRoutesFromFile(
    filePath: string = "./config/routes.json"
  ): Route[] {
    let routes: Route[];

    try {
      let rawRoutes = fs.readFileSync(path.resolve(process.cwd(), filePath), {
        encoding: "utf8",
      });
      routes = JSON.parse(rawRoutes).routes;
    } catch (error) {
      if (error instanceof Error) {
        throw new RouteLoaderError(error.message);
      }
      throw new RouteLoaderError(error);
    }

    if (!routes) {
      throw new RouteLoaderError("No route in file");
    }

    return routes;
  }

  /** initialise le controller de la route */
  private async loadRouteController(route: Route): Promise<any> {
    // On charge le controller
    let module = await import(
      path.resolve(
        process.cwd(),
        "./out/controllers/" + route.controller + ".controller.js"
      )
    );
    return module?.controller;
  }

  /** Créé les routes pour chaque méthode du controller */
  private createRoutesFromController(
    router: Router,
    url: string,
    controller: BaseController
  ): void {
    // On supprime le '/' de fin s'il y en a un
    if (url.endsWith("/")) {
      url = url.slice(0, url.length - 1);
    }

    if (controller.get) {
      router.get(url + "/:id?", controller.get.bind(controller));
    }

    if (controller.post) {
      router.post(url, controller.post.bind(controller));
    }

    if (controller.put) {
      router.put(url + "/:id?", controller.put.bind(controller));
    }

    if (controller.patch) {
      router.patch(url + "/:id?", controller.patch.bind(controller));
    }

    if (controller.delete) {
      router.delete(url + "/:id?", controller.delete);
    }
  }
}
