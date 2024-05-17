import express, { Request, Response, Express } from "express";
import cors from "cors";
import HttpServer from "../../adapters/HttpServer";

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export class ExpressAdapter implements HttpServer {
	app: Express;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(cors())
	}

	register(method: HttpMethod, url: string, callback: Function): void {
		this.app[method](url.replace(/\{|\}/g, ""), async (req: Request, res: Response) => {
			try {
				const output = await callback(req.params, req.body, req.query);
				if (output.statusCode) {
					res.status(output.statusCode);
				}
				res.json(output.body);
			} catch (error: any) {
				res.status(error.statusCode || 500).json({
					message: error.message || "Internal Server Error",
				});
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
