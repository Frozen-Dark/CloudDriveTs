import { Request, Response } from "express";
import { UserAttributes } from "@models/models";

export interface customRequest extends Request {
	user?: UserAttributes;
}

export interface customResponse extends Response {}
