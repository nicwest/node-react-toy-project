import express, {Express, Request, Response} from "express";
import cors from "cors";
import {nanoid} from 'nanoid'
import {z} from "zod";


const app: Express = express();
app.use(express.json());
app.use(cors())

const port = 4000;

const MemberCreateSchema = z.object({
    name: z.string()
})

type MemberCreate = z.infer<typeof MemberCreateSchema>;

const MessageCreateSchema = z.object({
    member: z.string(),
    message: z.string(),
})

type MessageCreate = z.infer<typeof MessageCreateSchema>;

type Member = {
    id: string;
    name: string;
}

type Message = {
    id: string;
    member: string;
    timestamp: number;
    message: string;
}

const members: Member[] = [];
const messages: Message[] = [];

function now(): number {
    return Math.floor(new Date().getTime() / 1000)
}

app.get("/members", (req: Request, res: Response) => {
    res.send(members);
})

app.post("/members", (req: Request, res: Response) => {
    let data: MemberCreate;
    try {
        data = MemberCreateSchema.parse(req.body);
    } catch (err) {
        res.status(422).send({errors: err});
        return
    }

    if (members.some((m) => data.name.toLowerCase() == m.name.toLowerCase())) {
        res.status(409).send({errors: [{code: "name already exists", message: "there is already a member with this name"}]})
        return 
    }

    let member: Member = {...data, id: nanoid()};
    members.push(member);
    res.status(201).send(member);
})

app.get("/messages", (req: Request, res: Response) => {
    if (req.query.after) {
        let after: number = Number(req.query.after);
        if (!after) {
            res.status(422).send({errors: [{code: "invalid after parameter", message: "after query parameter is not a number"}]})
            return
        }
        res.send(messages.filter((msg) => msg.timestamp > after)) 
        return
    }
    res.send(messages);
})

app.post("/messages", (req: Request, res: Response) => {
    let data: MessageCreate;
    try {
        data = MessageCreateSchema.parse(req.body);
    } catch (err) {
        res.status(422).send({errors: err})
        return
    }

    if(!members.some(m => (data.member === m.id))) {
        res.status(422).send({errors: [{code: "invalid member id", message: `no member found with the id "${data.member}"`}]})
        return
    }

    let message: Message = {...data, id: nanoid(), timestamp: now()}
    messages.push(message)
    res.status(201).send(message)
    return

})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});
