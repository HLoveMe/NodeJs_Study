import "reflect-metadata";
import {createExpressServer, useContainer, useExpressServer} from "routing-controllers";
import {Container} from "typedi";

import { IndexPageConteroller } from "./controllers/IndexPageConteroller";

/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container);

const expressApp = createExpressServer({
        controllers: [
            IndexPageConteroller,
        ],
})

/**
 * Start the express app.
 */
expressApp.listen(3000);

console.log("Server is up and running at port 3000");