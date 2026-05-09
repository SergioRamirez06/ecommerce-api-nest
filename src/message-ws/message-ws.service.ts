import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnetedClients {
    [id: string]: {
        socket: Socket
        user: User
    }
}


@Injectable()
export class MessageWsService {

    private connetedClients: ConnetedClients[] = [];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


    async registerClient( client: Socket, userId: string ) {

        const user = await this.userRepository.findOneBy({ id: userId })
        if( !user ) throw new Error ('User not found');
        if( !user.isActive ) throw new Error ('User not active');

        this.checkUserConnection( user)

        this.connetedClients[client.id] = {
            socket: client,
            user: user
        }
    }

    removeClient( clientID: string ) {
        delete this.connetedClients[clientID]
    }

    getCountClient(): string[] {
        return Object.keys( this.connetedClients )
    }

    getUserFullName( socketId: string ) {
        return this.connetedClients[socketId].user.fullName
    }

    private checkUserConnection( user: User ) {

        for( const clientId of Object.keys( this.connetedClients ) ) {
            const connectedClient = this.connetedClients[clientId]

            if( connectedClient.user.id === user.id ) {
                connectedClient.socket.disconnect();
                break;
            }
        }
        
    }


}
