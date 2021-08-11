import * as jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import { User } from "../model/dao";

export function generateToken(user: User): Promise<string | undefined> {
  return new Promise(async (resolve, reject) => {
    const payload = {
      uuid: user.uuid,
      pseudo: user.pseudo,
      mail: user.mail,
    };

    jwt.sign(
      payload,
      await getPrivateKey(),
      {
        algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm,
        issuer: process.env.JWT_ISSUER,
        jwtid: uuid(),
        expiresIn: process.env.JWT_EXPIRATION,
      },
      (error, encoded) => {
        if (error) reject(error);
        resolve(encoded);
      }
    );
  });
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, getPublicKey(), {
    algorithms: [process.env.JWT_ALGORITHM as jwt.Algorithm],
    issuer: process.env.JWT_ISSUER,
  });
}

async function getPrivateKey(): Promise<string> {
  return loadKey("./config/id_rsa_priv");
}

function getPublicKey(): string {
  return loadKeySync("./config/id_rsa_pub");
}

async function loadKey(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    return fs.readFile(
      path.resolve(process.cwd(), filepath),
      {
        encoding: "utf8",
      },
      (error, data) => {
        if (error) reject(error);
        resolve(data);
      }
    );
  });
}

function loadKeySync(filepath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), filepath), {
    encoding: "utf8",
  });
}
