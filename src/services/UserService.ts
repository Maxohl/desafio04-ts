export interface User{
    name: string
    email: string
}

const db = [
    {
        name: "Max",
        email: "maxohl@dio.com"
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email:string) => {
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log('DB Atualizado ', this.db)
    }

    deleteUser = (email: string) => {
        const initialLength = this.db.length;
        this.db = this.db.filter(user => user.email !== email);

        if (this.db.length === initialLength) {
            throw new Error('Usuário não encontrado');
        }
        console.log('DB Atualizado após exclusão', this.db);
    };

    getAllUsers = () => {
        return this.db
    }
}