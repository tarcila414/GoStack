import { Request, Response } from "express"
import createUser from "./services/CreateUser"

export  function helloWorldRoute(req: Request, res: Response) {
    const user = createUser({
        name: "Tarcila", 
        email: "tarcila@gmail.com",
        password: "123456", 
        techs: [
            "NodeJs",
            "TypeScript",
            "AngularJs",
            { title: "Java", experience: 2}
        ]
    });

    return res.json({ message: "HELLO"})
}